import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axios from 'axios'

import { useAuthStore } from '@/stores/authStore'

const backendUrl = import.meta.env.VITE_BACKEND_URL
const DEFAULT_PAGE = 1
const DEFAULT_PERPAGE = 5

const resourceEndpoints = {
  candidates: '/candidates',
  regions: '/regions',
  pollingStations: '/polling-stations',
}

function createPaginationState() {
  return {
    page: DEFAULT_PAGE,
    perPage: DEFAULT_PERPAGE,
    total: 0,
    lastPage: DEFAULT_PAGE,
  }
}

function toPagination(payload) {
  return {
    page: payload['current_page'],
    perPage: payload['per_page'],
    total: payload['total'],
    lastPage: payload['last_page'],
  }
}

export const useDataStore = defineStore('data', () => {
  const loading = ref(false)
  const resources = reactive({})
  const errorCode = ref(null)
  const errorMessage = ref('')
  const lists = reactive({
    candidates: [],
    regions: [],
    pollingStations: [],
  })
  const pagination = reactive({
    candidates: createPaginationState(),
    regions: createPaginationState(),
    pollingStations: createPaginationState(),
  })

  function getResourceList(resourceName) {
    return lists[resourceName] ?? []
  }

  async function getResource(resourceName, page = DEFAULT_PAGE, perPage = DEFAULT_PERPAGE) {
    const endpoint = resourceEndpoints[resourceName]
    if (!endpoint) {
      return
    }

    const authStore = useAuthStore()
    loading.value = true

    try {
      const response = await axios.get(`${backendUrl}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        params: {
          page,
          perpage: perPage,
        },
      })

      lists[resourceName] = response.data.data
      pagination[resourceName] = toPagination(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  async function createResource(
    resourceName,
    payload,
    { refresh = true, page = DEFAULT_PAGE, perPage = DEFAULT_PERPAGE } = {}
  ) {
    const endpoint = resourceEndpoints[resourceName]
    if (!endpoint) {
      return null
    }

    const authStore = useAuthStore()
    loading.value = true

    try {
      const response = await axios.post(`${backendUrl}${endpoint}`, payload, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })

      if (refresh) {
        await getResource(resourceName, page, perPage)
      }

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message ?? error.message
        throw new Error(message)
      }

      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    resources,
    errorCode,
    errorMessage,
    pagination,
    createResource,
    getResource,
    getResourceList,
  }
})
