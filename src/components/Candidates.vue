<template>
  <DataTable
    :value="candidates"
    :lazy="true"
    :loading="dataStore.Loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords="candidates_total"
    @page="onPageChange"
    responsive-layout="scroll"
    :laading="true"
    :first="offset"
  >
    <Column field="id" header="№" />
    <Column field="name" header="Наименование категории" />
  </DataTable>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useDataStore } from '@/stores/dataStore'

export default {
  name: 'candidates',
  components: { DataTable, Column },
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    candidates() {
      return this.dataStore.candidates
    },
    candidates_total() {
      return this.dataStore.candidates_total
    },
  },
  mounted() {
    console.log('candidates component MOUNTED!')
    this.dataStore.get_candidates()
    this.dataStore.get_candidates_total()
    console.log('candidates=', this.candidates)
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first
      this.perpage = event.rows
      this.dataStore.get_candidates(this.offset / this.perpage, this.perpage)
    },
  },
}
</script>

<style scoped></style>
