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

  const perpage = ref(initialRows)
  const offset = ref(0)

  const rows = computed(() => dataStore.get_resource_list(resourceName))
  const totalRecords = computed(() => dataStore.pagination?.[resourceName]?.total || 0)

  function onPageChange(event) {
    offset.value = event.first
    perpage.value = event.rows

    const page = (event.page ?? offset.value / perpage.value) + 1
    void dataStore.get_resource(resourceName, page, perpage.value)
  }

  return {
    dataStore,
    perpage,
    offset,
    rowsPerPageOptions,
    rows,
    totalRecords,
    onPageChange,
  }
}
