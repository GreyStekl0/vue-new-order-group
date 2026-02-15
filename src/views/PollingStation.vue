<script>
import EmptyState from '@/components/EmptyState.vue'

export default {
  name: 'PollingStationPageView',
  components: {
    EmptyState,
  },
  data() {
    return {
      pollingStations: [],
    }
  },
  computed: {
    hasPollingStations() {
      return this.pollingStations.length > 0
    },
  },
}
</script>

<template>
  <section class="view-polling">
    <header class="page-head">
      <h2 class="nog-section-heading">
        <i class="pi pi-building-columns" /> Участки для голосования
      </h2>
    </header>

    <div v-if="hasPollingStations" class="status-board">
      <article v-for="station in pollingStations" :key="station.id" class="tile nog-data-card">
        <h3 class="nog-data-card-title">{{ station.name }}</h3>
        <p class="nog-data-card-copy">{{ station.status }}</p>
      </article>
    </div>

    <EmptyState
      v-else
      class="mt-8"
      icon="pi pi-folder-open"
      title="Сектор не инициализирован"
      description="Полевые агенты еще не передали данные с мест. Не предпринимайте активных действий до полной синхронизации протоколов."
    />
  </section>
</template>

<style scoped>
.status-board {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}

.tile {
  --nog-card-border-color: var(--nog-border-soft-strong);
  --nog-card-bg: var(--nog-surface);
  --nog-card-padding: 0.85rem;
}

.tile .nog-data-card-title {
  font-size: 1rem;
}

@media (max-width: 960px) {
  .status-board {
    grid-template-columns: 1fr;
  }
}
</style>
