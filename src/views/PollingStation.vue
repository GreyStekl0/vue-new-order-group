<script>
export default {
  name: 'PollingStationPageView',
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
      <h2 class="nog-section-heading"><i class="pi pi-building-columns" /> Участки для голосования</h2>
      <p class="nog-section-description">
        Раздел готов к отображению данных. Сейчас backend возвращает пустой набор участков.
      </p>
    </header>

    <div v-if="hasPollingStations" class="status-board">
      <article v-for="station in pollingStations" :key="station.id" class="tile nog-data-card">
        <h3 class="nog-data-card-title">{{ station.name }}</h3>
        <p class="nog-data-card-copy">{{ station.status }}</p>
      </article>
    </div>

    <div v-else class="nog-empty-state">
      <i class="pi pi-folder-open nog-empty-icon" />
      <h3 class="nog-empty-title">Участки пока не получены</h3>
      <p class="nog-empty-copy">
        После синхронизации с сервером здесь появится список участков и их текущие статусы.
      </p>
      <div class="nog-empty-meta">
        <span class="nog-empty-meta-item"><i class="pi pi-database" /> Источник: API</span>
        <span class="nog-empty-meta-item"><i class="pi pi-filter-slash" /> Результат: 0 записей</span>
      </div>
    </div>
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
