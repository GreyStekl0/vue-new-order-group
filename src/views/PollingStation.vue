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
  <section class="polling-station-view">
    <header class="polling-station-view__header">
      <h2 class="polling-station-view__title">
        <i class="pi pi-building-columns polling-station-view__title-icon" />
        Участки для голосования
      </h2>
    </header>

    <div v-if="hasPollingStations" class="polling-station-view__grid">
      <article v-for="station in pollingStations" :key="station.id" class="polling-station-view__card">
        <h3 class="polling-station-view__name">{{ station.name }}</h3>
        <p class="polling-station-view__status">{{ station.status }}</p>
      </article>
    </div>

    <EmptyState
      v-else
      class="polling-station-view__empty"
      icon="pi pi-folder-open"
      title="Сектор не инициализирован"
      description="Полевые агенты еще не передали данные с мест. Не предпринимайте активных действий до полной синхронизации протоколов."
    />
  </section>
</template>

<style scoped>
.polling-station-view__title {
  display: flex;
  align-items: center;
  gap: var(--nog-space-inline-gap-md);
  margin: 0;
  font-size: var(--nog-font-size-section-title);
}

.polling-station-view__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--nog-space-polling-grid-gap);
  margin-top: var(--nog-space-polling-grid-offset);
}

.polling-station-view__card {
  border: 1px solid var(--nog-border-soft-strong);
  border-radius: var(--nog-radius-card);
  background: var(--nog-surface);
  padding: var(--nog-space-polling-card-padding);
}

.polling-station-view__name {
  margin: 0;
  color: var(--nog-text-strong);
  font-size: var(--nog-font-size-base);
}

.polling-station-view__status {
  margin: var(--nog-space-polling-status-offset) 0 0;
  color: var(--nog-text-copy-soft);
  font-size: var(--nog-font-size-sm);
}

.polling-station-view__empty {
  margin-top: var(--nog-space-empty-offset);
}

@media (max-width: 960px) {
  .polling-station-view__grid {
    grid-template-columns: 1fr;
  }
}
</style>
