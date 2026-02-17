import { defineStore } from 'pinia'
import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL

function buildAuthHeaders(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

function getErrorMessage(error) {
  if (error?.response?.data?.message) {
    return String(error.response.data.message)
  }

  if (error?.message) {
    return String(error.message)
  }

  return 'Request failed'
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    errorMessage: '',
  }),
  actions: {
    clearError() {
      this.errorMessage = ''
    },
    setSession(token, user = null) {
      this.token = token
      this.user = user
      this.isAuthenticated = Boolean(token)

      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }
    },
    clearSession() {
      this.setSession(null, null)
    },
    async login(credentials) {
      this.clearError()

      try {
        const response = await axios.post(`${backendUrl}/login`, credentials)
        this.setSession(response.data.token, response.data.user || null)
      } catch (error) {
        this.clearSession()
        this.errorMessage = getErrorMessage(error)
      }
    },
    async getUser() {
      this.clearError()

      if (!this.token) {
        this.clearSession()
        return
      }

      try {
        const response = await axios.get(`${backendUrl}/user`, buildAuthHeaders(this.token))
        this.user = response.data
        this.isAuthenticated = true
      } catch (error) {
        this.clearSession()
        this.errorMessage = getErrorMessage(error)
      }
    },
    async logout() {
      this.clearError()

      if (!this.token) {
        this.clearSession()
        return
      }

      try {
        await axios.post(`${backendUrl}/logout`, null, buildAuthHeaders(this.token))
      } catch (error) {
        this.errorMessage = getErrorMessage(error)
      } finally {
        this.clearSession()
      }
    },
  },
})
