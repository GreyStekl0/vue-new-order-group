import { computed, ref } from 'vue'

import { useDataStore } from '@/stores/dataStore'

const DEFAULT_ROWS_PER_PAGE = 5
const DEFAULT_ROWS_OPTIONS = Object.freeze([2, 5, 10])

export function useResourceTable(
  resourceName,
  {
    initialRows = DEFAULT_ROWS_PER_PAGE,
    rowsPerPageOptions = DEFAULT_ROWS_OPTIONS,
  } = {},
) {
  const dataStore = useDataStore()

  const perPage = ref(initialRows)
  const offset = ref(0)

  const rows = computed(() => dataStore.getResourceList(resourceName))
  const totalRecords = computed(() => dataStore.pagination?.[resourceName]?.total || 0)

  function onPageChange(event) {
    offset.value = event.first
    perPage.value = event.rows

    const page = (event.page ?? offset.value / perPage.value) + 1
    void dataStore.getResource(resourceName, page, perPage.value)
  }

  return {
    dataStore,
    perPage,
    offset,
    rowsPerPageOptions,
    rows,
    totalRecords,
    onPageChange,
  }
}
