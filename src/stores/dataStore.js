import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axios from 'axios'

import { useAuthStore } from '@/stores/authStore'

const backendUrl = import.meta.env.VITE_BACKEND_URL
const DEFAULT_PAGE = 1
const DEFAULT_PERPAGE = 5

const resources = {
  candidates: '/candidates',
  regions: '/regions',
  pollingStations: '/polling-stations',
}

function createPaginationState() {
  return {
    page: DEFAULT_PAGE,
    perpage: DEFAULT_PERPAGE,
    total: 0,
    last_page: DEFAULT_PAGE,
  }
}

function toPagination(payload) {
  return {
    page: payload['current_page'],
    perpage: payload['per_page'],
    total: payload['total'],
    last_page: payload['last_page'],
  }
}

export const useDataStore = defineStore('data', () => {
  const loading = ref(false)
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

  function get_resource_list(resourceName) {
    return lists[resourceName] ?? []
  }

  async function get_resource(resourceName, page = DEFAULT_PAGE, perpage = DEFAULT_PERPAGE) {
    const endpoint = resources[resourceName]
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
          perpage,
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

  return {
    loading,
    pagination,
    get_resource,
    get_resource_list,
  }
})
