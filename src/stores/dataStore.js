import { defineStore } from 'pinia'
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
    totalKey: 'candidates_total',
    paginationKey: 'candidates',
  },
  regions: {
    listEndpoint: '/regions',
    listKey: 'regions',
    totalKey: 'regions_total',
    paginationKey: 'regions',
  },
  pollingStations: {
    listEndpoint: '/polling-stations',
    listKey: 'pollingStations',
    totalKey: 'pollingStations_total',
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

export const useDataStore = defineStore('data', {
  state: () => ({
    candidates: [],
    candidates_total: null,
    regions: [],
    regions_total: null,
    pollingStations: [],
    pollingStations_total: null,
    loading: false,
    errorMessage: '',
    pagination: {
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
    },
  }),
  getters: {
    get_resource_list(state) {
      return (resourceName) => {
        const resource = resources[resourceName]

        if (!resource) {
          return []
        }

        return state[resource.listKey]
      }
    },
    get_resource_total(state) {
      return (resourceName) => {
        const resource = resources[resourceName]

        if (!resource) {
          return null
        }

        return state[resource.totalKey]
      }
    },
    get_resource_pagination(state) {
      return (resourceName) => state.pagination[resourceName] || null
    },
  },
  actions: {
    clearError() {
      this.errorMessage = ''
    },

    getResourceConfig(resourceName) {
      const resource = resources[resourceName]

      if (!resource) {
        throw new Error(`Unknown resource: ${resourceName}`)
      }

      return resource
    },

    applyResourceResponse(resourceName, payload) {
      const resource = this.getResourceConfig(resourceName)
      const normalized = normalizePaginatedResponse(payload)

      this[resource.listKey] = normalized.list
      this[resource.totalKey] = normalized.pagination.total
      this.pagination[resource.paginationKey] = normalized.pagination
    },

    async fetchResourceList(resourceName, page = MIN_PAGE, perpage = DEFAULT_PERPAGE) {
      this.clearError()
      const resource = this.getResourceConfig(resourceName)
      const authStore = useAuthStore()
      const paginationParams = normalizePaginationParams(page, perpage)

      this.loading = true

      try {
        const response = await axios.get(`${backendUrl}${resource.listEndpoint}`, {
          ...buildAuthHeaders(authStore.token),
          params: paginationParams,
        })

        this.applyResourceResponse(resourceName, response.data)
      } catch (error) {
        this.errorMessage = getErrorMessage(error)
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    get_resource(resourceName, page = MIN_PAGE, perpage = DEFAULT_PERPAGE) {
      return this.fetchResourceList(resourceName, page, perpage)
    },

    get_candidates(page = MIN_PAGE, perpage = DEFAULT_PERPAGE) {
      return this.get_resource('candidates', page, perpage)
    },

    get_regions(page = MIN_PAGE, perpage = DEFAULT_PERPAGE) {
      return this.get_resource('regions', page, perpage)
    },

    get_polling_stations(page = MIN_PAGE, perpage = DEFAULT_PERPAGE) {
      return this.get_resource('pollingStations', page, perpage)
    },
  },
})
