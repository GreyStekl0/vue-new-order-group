import { defineStore } from 'pinia'
import { ref } from 'vue'
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

function createAuthActions({ user, token, isAuthenticated, errorMessage }) {
  function clearError() {
    errorMessage.value = ''
  }

  function setSession(nextToken, nextUser = null) {
    token.value = nextToken
    user.value = nextUser
    isAuthenticated.value = Boolean(nextToken)

    if (nextToken) {
      localStorage.setItem('token', nextToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  function clearSession() {
    setSession(null, null)
  }

  async function login(credentials) {
    clearError()

    try {
      const response = await axios.post(`${backendUrl}/login`, credentials)
      setSession(response.data.token, response.data.user || null)
    } catch (error) {
      clearSession()
      errorMessage.value = getErrorMessage(error)
    }
  }

  async function getUser() {
    clearError()

    if (!token.value) {
      clearSession()
      return
    }

    try {
      const response = await axios.get(`${backendUrl}/user`, buildAuthHeaders(token.value))
      user.value = response.data
      isAuthenticated.value = true
    } catch (error) {
      clearSession()
      errorMessage.value = getErrorMessage(error)
    }
  }

  async function logout() {
    clearError()

    if (!token.value) {
      clearSession()
      return
    }

    try {
      await axios.post(`${backendUrl}/logout`, null, buildAuthHeaders(token.value))
    } catch (error) {
      errorMessage.value = getErrorMessage(error)
    } finally {
      clearSession()
    }
  }

  return {
    clearError,
    login,
    getUser,
    logout,
  }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const isAuthenticated = ref(false)
  const errorMessage = ref('')

  const actions = createAuthActions({
    user,
    token,
    isAuthenticated,
    errorMessage,
  })

  return {
    user,
    token,
    isAuthenticated,
    errorMessage,
    ...actions,
  }
})
