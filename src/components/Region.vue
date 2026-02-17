<template>
  <div class="region-table">
    <DataTable
      class="region-table__datatable"
      :value="rows"
      :lazy="true"
      :loading="dataStore.loading"
      :paginator="true"
      :rows="perpage"
      :rowsPerPageOptions="[2, 5, 10]"
      :totalRecords="totalRecords"
      @page="onPageChange"
      responsive-layout="scroll"
      :first="offset"
    >
      <Column field="id" header="№" />
      <Column field="name" header="Наименование региона" />
    </DataTable>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useDataStore } from '@/stores/dataStore'

export default {
  name: 'RegionTable',
  components: { DataTable, Column },
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    rows() {
      return this.dataStore.get_resource_list('regions')
    },
    totalRecords() {
      return this.dataStore.get_resource_total('regions') || 0
    },
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first
      this.perpage = event.rows
      const page = (event.page ?? this.offset / this.perpage) + 1
      this.dataStore.get_resource('regions', page, this.perpage)
    },
  },
}
</script>

<style scoped>
.region-table {
  margin-top: var(--nog-space-region-grid-offset);
}

.region-table :deep(.p-datatable) {
  border: 1px solid var(--nog-border);
  border-radius: var(--nog-radius-surface);
  background: var(--nog-surface);
  box-shadow: var(--nog-shadow-card-soft);
  overflow: hidden;
}

.region-table :deep(.p-datatable-table-container) {
  background: var(--nog-surface);
}

.region-table :deep(.p-datatable-thead > tr > th) {
  border: 0;
  border-bottom: 1px solid var(--nog-border);
  background: var(--nog-accent-surface);
  color: var(--nog-text-strong);
  font-size: var(--nog-font-size-sm);
  font-weight: var(--nog-font-weight-semibold);
  letter-spacing: var(--nog-letter-spacing-tight);
  text-transform: uppercase;
  padding: 0.9rem 1rem;
}

.region-table :deep(.p-datatable-tbody > tr) {
  transition: background-color var(--nog-duration-fast) ease;
}

.region-table :deep(.p-datatable-tbody > tr > td) {
  border: 0;
  border-bottom: 1px solid var(--nog-border-soft);
  padding: 0.9rem 1rem;
  color: var(--nog-text-copy);
  font-size: var(--nog-font-size-base);
}

.region-table :deep(.p-datatable-tbody > tr:hover) {
  background: var(--nog-hover-surface);
}

.region-table :deep(.p-datatable-tbody > tr:last-child > td) {
  border-bottom: 0;
}

.region-table :deep(.p-column-title) {
  color: var(--nog-text-strong);
}

.region-table :deep(.p-paginator) {
  border: 0;
  border-top: 1px solid var(--nog-border);
  background: var(--nog-surface-soft);
  padding: 0.6rem 0.8rem;
}

.region-table :deep(.p-paginator .p-paginator-page),
.region-table :deep(.p-paginator .p-paginator-next),
.region-table :deep(.p-paginator .p-paginator-prev),
.region-table :deep(.p-paginator .p-paginator-first),
.region-table :deep(.p-paginator .p-paginator-last) {
  color: var(--nog-text-subtle);
}

.region-table :deep(.p-paginator .p-paginator-page.p-paginator-page-selected) {
  background: var(--nog-accent);
  color: var(--nog-surface);
}

.region-table :deep(.p-paginator .p-dropdown),
.region-table :deep(.p-paginator .p-select) {
  border-color: var(--nog-border-soft);
  background: var(--nog-surface);
}

.region-table :deep(.p-datatable-loading-overlay) {
  background: rgba(248, 251, 249, 0.75);
}
</style>
