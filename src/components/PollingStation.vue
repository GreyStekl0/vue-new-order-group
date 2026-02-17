<script>
import { useDataStore } from '@/stores/dataStore'

export default {
  name: 'PollingStationGrid',
  data() {
    return {
      dataStore: useDataStore(),
    }
  },
  computed: {
    pollingStations() {
      return this.dataStore.pollingStations
    },
  },
  methods: {
    resolveTitle(station) {
      if (station?.name) {
        return station.name
      }

      if (station?.['stage_number']) {
        return `Участок №${station['stage_number']}`
      }

      return 'Участок'
    },
    resolveStatus(station) {
      if (station?.status) {
        return station.status
      }

      if (typeof station?.['number_of_voters'] === 'number') {
        return `Избирателей: ${station['number_of_voters']}`
      }

      return 'Данные уточняются'
    },
  },
}
</script>

<template>
  <div class="polling-station-grid">
    <article v-for="station in pollingStations" :key="station.id" class="polling-station-grid__card">
      <h3 class="polling-station-grid__name">{{ resolveTitle(station) }}</h3>
      <p class="polling-station-grid__status">{{ resolveStatus(station) }}</p>
    </article>
  </div>
</template>

<style scoped>
.polling-station-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--nog-space-polling-grid-gap);
  margin-top: var(--nog-space-polling-grid-offset);
}

.polling-station-grid__card {
  border: 1px solid var(--nog-border-soft-strong);
  border-radius: var(--nog-radius-card);
  background: var(--nog-surface);
  padding: var(--nog-space-polling-card-padding);
}

.polling-station-grid__name {
  margin: 0;
  color: var(--nog-text-strong);
  font-size: var(--nog-font-size-base);
}

.polling-station-grid__status {
  margin: var(--nog-space-polling-status-offset) 0 0;
  color: var(--nog-text-copy-soft);
  font-size: var(--nog-font-size-sm);
}

@media (max-width: 960px) {
  .polling-station-grid {
    grid-template-columns: 1fr;
  }
}
</style>
