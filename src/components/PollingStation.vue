<template>
  <div class="polling-station-table">
    <DataTable
      class="polling-station-table__datatable"
      :value="pollingStations"
      :lazy="true"
      :loading="dataStore.loading"
      :paginator="true"
      :rows="perpage"
      :rowsPerPageOptions="[2, 5, 10]"
      :totalRecords="pollingStations_total"
      @page="onPageChange"
      responsive-layout="scroll"
      :first="offset"
    >
      <Column field="id" header="№" />
      <Column field="stage_number" header="Номер участка" />
      <Column field="number_of_voters" header="Избиратели" />
    </DataTable>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useDataStore } from '@/stores/dataStore'

export default {
  name: 'PollingStationTable',
  components: { DataTable, Column },
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    pollingStations() {
      return this.dataStore.pollingStations
    },
    pollingStations_total() {
      return this.dataStore.pollingStations_total
    },
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first
      this.perpage = event.rows
      this.dataStore.get_polling_stations(this.offset / this.perpage, this.perpage)
    },
  },
}
</script>

<style scoped>
.polling-station-table {
  margin-top: var(--nog-space-polling-grid-offset);
}

.polling-station-table :deep(.p-datatable) {
  border: 1px solid var(--nog-border);
  border-radius: var(--nog-radius-surface);
  background: var(--nog-surface);
  box-shadow: var(--nog-shadow-card-soft);
  overflow: hidden;
}

.polling-station-table :deep(.p-datatable-table-container) {
  background: var(--nog-surface);
}

.polling-station-table :deep(.p-datatable-thead > tr > th) {
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

.polling-station-table :deep(.p-datatable-tbody > tr) {
  transition: background-color var(--nog-duration-fast) ease;
}

.polling-station-table :deep(.p-datatable-tbody > tr > td) {
  border: 0;
  border-bottom: 1px solid var(--nog-border-soft);
  padding: 0.9rem 1rem;
  color: var(--nog-text-copy);
  font-size: var(--nog-font-size-base);
}

.polling-station-table :deep(.p-datatable-tbody > tr:hover) {
  background: var(--nog-hover-surface);
}

.polling-station-table :deep(.p-datatable-tbody > tr:last-child > td) {
  border-bottom: 0;
}

.polling-station-table :deep(.p-column-title) {
  color: var(--nog-text-strong);
}

.polling-station-table :deep(.p-paginator) {
  border: 0;
  border-top: 1px solid var(--nog-border);
  background: var(--nog-surface-soft);
  padding: 0.6rem 0.8rem;
}

.polling-station-table :deep(.p-paginator .p-paginator-page),
.polling-station-table :deep(.p-paginator .p-paginator-next),
.polling-station-table :deep(.p-paginator .p-paginator-prev),
.polling-station-table :deep(.p-paginator .p-paginator-first),
.polling-station-table :deep(.p-paginator .p-paginator-last) {
  color: var(--nog-text-subtle);
}

.polling-station-table :deep(.p-paginator .p-paginator-page.p-paginator-page-selected) {
  background: var(--nog-accent);
  color: var(--nog-surface);
}

.polling-station-table :deep(.p-paginator .p-dropdown),
.polling-station-table :deep(.p-paginator .p-select) {
  border-color: var(--nog-border-soft);
  background: var(--nog-surface);
}

.polling-station-table :deep(.p-datatable-loading-overlay) {
  background: rgba(248, 251, 249, 0.75);
}
</style>
