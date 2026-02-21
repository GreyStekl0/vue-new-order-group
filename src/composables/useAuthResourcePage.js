import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useAuthStore } from '@/stores/authStore'
import { useDataStore } from '@/stores/dataStore'

const DEFAULT_PAGE = 1
const DEFAULT_PERPAGE = 5

export function useAuthResourcePage(resourceName, options = {}) {
  const page = options.page ?? DEFAULT_PAGE
  const perpage = options.perpage ?? DEFAULT_PERPAGE

  const authStore = useAuthStore()
  const dataStore = useDataStore()
  const { isAuthenticated, token } = storeToRefs(authStore)

  const isLoading = ref(false)
  const hasResources = computed(() => dataStore.get_resource_list(resourceName).length > 0)
  const isAuthPending = computed(() => Boolean(token.value) && !isAuthenticated.value)
  const showGuestState = computed(() => !isAuthPending.value && !isAuthenticated.value)
  const showResourceState = computed(() => isAuthenticated.value && hasResources.value)
  const showEmptyState = computed(
    () => isAuthenticated.value && !isLoading.value && !hasResources.value,
  )

  async function load() {
    isLoading.value = true

    try {
      await dataStore.get_resource(resourceName, page, perpage)
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
