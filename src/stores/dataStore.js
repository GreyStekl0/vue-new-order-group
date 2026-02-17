import { defineStore } from 'pinia'
import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const resources = {
  candidates: {
    listEndpoint: '/candidate',
    totalEndpoint: '/candidates_total',
    listKey: 'candidates',
    totalKey: 'candidates_total',
  },
  regions: {
    listEndpoint: '/region',
    totalEndpoint: '/regions_total',
    listKey: 'regions',
    totalKey: 'regions_total',
  },
  pollingStations: {
    listEndpoint: '/pollingstation',
    totalEndpoint: '/pollingstations_total',
    listKey: 'pollingStations',
    totalKey: 'pollingStations_total',
  },
}

function getErrorMessage(error) {
  if (error?.response?.data?.message) {
    return error.response.data.message
  }

  if (error?.message) {
    return error.message
  }

  return 'Request failed'
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
  }),
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

    async fetchResourceList(resourceName, page = 0, perpage = 5) {
      this.clearError()
      const resource = this.getResourceConfig(resourceName)
      this.loading = true

      try {
        const response = await axios.get(`${backendUrl}${resource.listEndpoint}`, {
          params: {
            page,
            perpage,
          },
        })

        this[resource.listKey] = response.data
      } catch (error) {
        this.errorMessage = getErrorMessage(error)
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    async fetchResourceTotal(resourceName) {
      this.clearError()
      const resource = this.getResourceConfig(resourceName)
      this.loading = true

      try {
        const response = await axios.get(`${backendUrl}${resource.totalEndpoint}`)
        this[resource.totalKey] = response.data
      } catch (error) {
        this.errorMessage = getErrorMessage(error)
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    get_candidates(page = 0, perpage = 5) {
      return this.fetchResourceList('candidates', page, perpage)
    },

    get_candidates_total() {
      return this.fetchResourceTotal('candidates')
    },

    get_regions(page = 0, perpage = 5) {
      return this.fetchResourceList('regions', page, perpage)
    },

    get_regions_total() {
      return this.fetchResourceTotal('regions')
    },

    get_polling_stations(page = 0, perpage = 5) {
      return this.fetchResourceList('pollingStations', page, perpage)
    },

    get_polling_stations_total() {
      return this.fetchResourceTotal('pollingStations')
    },
  },
})
