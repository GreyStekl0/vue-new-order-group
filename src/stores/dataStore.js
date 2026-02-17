import { defineStore } from 'pinia'
import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const useDataStore = defineStore('data', {
  state: () => ({
    candidates: [],
    candidates_total: null,
    items: [],
    errorMessage: '',
  }),
  actions: {
    async get_candidates(page = 0, perpage = 5) {
      this.errorMessage = ''

      try {
        const response = await axios.get(backendUrl + '/candidate', {
          params: {
            page: page,
            perpage: perpage,
          },
        })

        this.candidates = response.data
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message
          console.log(error)
        } else if (error.request) {
          this.errorMessage = error.message
          console.log(error)
        } else {
          console.log(error)
        }
      }
    },

    async get_candidates_total() {
      this.errorMessage = ''

      try {
        const response = await axios.get(backendUrl + '/candidates_total')
        this.candidates_total = response.data
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message
          console.log(error)
        } else if (error.request) {
          this.errorMessage = error.message
          console.log(error)
        } else {
          console.log(error)
        }
      }
    },
  },
})
