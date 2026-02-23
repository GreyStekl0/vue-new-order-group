import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useAuthStore } from '@/stores/authStore'
import { useDataStore } from '@/stores/dataStore'

const DEFAULT_PAGE = 1
const DEFAULT_PER_PAGE = 5

export function useAuthResourcePage(resourceName, options = {}) {
  const page = options.page ?? DEFAULT_PAGE
  const perPage = options.perPage ?? options.perpage ?? DEFAULT_PER_PAGE

  const authStore = useAuthStore()
  const dataStore = useDataStore()
  const { isAuthenticated, token } = storeToRefs(authStore)

  const isLoading = ref(false)
  const hasResources = computed(() => dataStore.getResourceList(resourceName).length > 0)
  const isAuthPending = computed(() => Boolean(token.value) && !isAuthenticated.value)
  const showGuestState = computed(() => !isAuthPending.value && !isAuthenticated.value)
  const showResourceState = computed(() => isAuthenticated.value && hasResources.value)
  const showEmptyState = computed(
    () => isAuthenticated.value && !isLoading.value && !hasResources.value,
  )

  async function load() {
    isLoading.value = true

    try {
      await dataStore.getResource(resourceName, page, perPage)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    if (isAuthenticated.value) {
      void load()
    }
  })

  watch(isAuthenticated, (value) => {
    if (value) {
      void load()
    }
  })

  return {
    isLoading,
    hasResources,
    isAuthenticated,
    isAuthPending,
    showGuestState,
    showResourceState,
    showEmptyState,
  }
}
