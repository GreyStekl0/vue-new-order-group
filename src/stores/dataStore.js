import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

import { useAuthStore } from '@/stores/authStore'

const backendUrl = import.meta.env.VITE_BACKEND_URL
const MIN_PAGE = 1
const DEFAULT_PERPAGE = 5
const MIN_PERPAGE = 1
const MAX_PERPAGE = 100

const resources = {
  candidates: {
    listEndpoint: '/candidates',
    listKey: 'candidates',
    paginationKey: 'candidates',
  },
  regions: {
    listEndpoint: '/regions',
    listKey: 'regions',
    paginationKey: 'regions',
  },
  pollingStations: {
    listEndpoint: '/polling-stations',
    listKey: 'pollingStations',
    paginationKey: 'pollingStations',
  },
}

function getErrorMessage(error) {
  const validationErrors = error?.response?.data?.errors

  if (validationErrors && typeof validationErrors === 'object') {
    const firstValidationEntry = Object.values(validationErrors).find(
      (entry) => Array.isArray(entry) && entry.length > 0,
    )

    if (firstValidationEntry?.[0]) {
      return firstValidationEntry[0]
    }
  }

  if (error?.response?.data?.message) {
    return error.response.data.message
  }

  if (error?.message) {
    return error.message
  }

  return 'Request failed'
}

function buildAuthHeaders(token) {
  if (!token) {
    return {}
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

function parseInteger(value, fallback) {
  const parsedValue = Number.parseInt(value, 10)

  if (!Number.isFinite(parsedValue)) {
    return fallback
  }

  return parsedValue
}

function normalizePaginationParams(page = MIN_PAGE, perpage = DEFAULT_PERPAGE) {
  const normalizedPage = Math.max(MIN_PAGE, parseInteger(page, MIN_PAGE))
  const normalizedPerpage = Math.min(
    MAX_PERPAGE,
    Math.max(MIN_PERPAGE, parseInteger(perpage, DEFAULT_PERPAGE)),
  )

  return {
    page: normalizedPage,
    perpage: normalizedPerpage,
  }
}

function normalizePaginatedResponse(payload) {
  const { data, total, current_page, per_page, last_page } = payload

  return {
    list: data,
    pagination: {
      page: current_page,
      perpage: per_page,
      total,
      last_page,
    },
  }
}

export const useDataStore = defineStore('data', () => {
  const candidates = ref([])
  const regions = ref([])
  const pollingStations = ref([])
  const loading = ref(false)
  const errorMessage = ref('')
  const pagination = ref({
    candidates: {
      page: MIN_PAGE,
      perpage: DEFAULT_PERPAGE,
      total: 0,
      last_page: MIN_PAGE,
    },
    regions: {
      page: MIN_PAGE,
      perpage: DEFAULT_PERPAGE,
      total: 0,
      last_page: MIN_PAGE,
    },
    pollingStations: {
      page: MIN_PAGE,
      perpage: DEFAULT_PERPAGE,
      total: 0,
      last_page: MIN_PAGE,
    },
  })

  const resourceLists = {
    candidates,
    regions,
    pollingStations,
  }

  function get_resource_list(resourceName) {
    const resource = resources[resourceName]

    if (!resource) {
      return []
    }

    return resourceLists[resource.listKey]?.value ?? []
  }

  function clearError() {
    errorMessage.value = ''
  }

  function getResourceConfig(resourceName) {
    const resource = resources[resourceName]

    if (!resource) {
      throw new Error(`Unknown resource: ${resourceName}`)
    }

    return resource
  }

  function applyResourceResponse(resourceName, payload) {
    const resource = getResourceConfig(resourceName)
    const normalized = normalizePaginatedResponse(payload)

    resourceLists[resource.listKey].value = normalized.list
    pagination.value[resource.paginationKey] = normalized.pagination
  }

  async function fetchResourceList(resourceName, page = MIN_PAGE, perpage = DEFAULT_PERPAGE) {
    clearError()
    const resource = getResourceConfig(resourceName)
    const authStore = useAuthStore()
    const paginationParams = normalizePaginationParams(page, perpage)

    loading.value = true

    try {
      const response = await axios.get(`${backendUrl}${resource.listEndpoint}`, {
        ...buildAuthHeaders(authStore.token),
        params: paginationParams,
      })

      applyResourceResponse(resourceName, response.data)
    } catch (error) {
      errorMessage.value = getErrorMessage(error)
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  function get_resource(resourceName, page = MIN_PAGE, perpage = DEFAULT_PERPAGE) {
    return fetchResourceList(resourceName, page, perpage)
  }

  return {
    loading,
    pagination,
    get_resource,
    get_resource_list,
  }
})
