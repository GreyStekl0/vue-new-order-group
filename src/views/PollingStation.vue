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
      <h2><i class="pi pi-building-columns" /> Участки для голосования</h2>
      <p>Раздел готов к отображению данных. Сейчас backend возвращает пустой набор участков.</p>
    </header>

    <div v-if="hasPollingStations" class="status-board">
      <article v-for="station in pollingStations" :key="station.id" class="tile">
        <h3>{{ station.name }}</h3>
        <p>{{ station.status }}</p>
      </article>
    </div>

    <div v-else class="empty-state">
      <i class="pi pi-folder-open empty-icon" />
      <h3>Участки пока не получены</h3>
      <p>После синхронизации с сервером здесь появится список участков и их текущие статусы.</p>
      <div class="empty-meta">
        <span><i class="pi pi-database" /> Источник: API</span>
        <span><i class="pi pi-filter-slash" /> Результат: 0 записей</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page-head p {
  margin-top: 0.75rem;
  color: #41554e;
}

.view-polling h2 {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin: 0;
  font-size: 1.5rem;
}

.status-board {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}

.tile {
  border: 1px solid #d5e1db;
  border-radius: 0.8rem;
  background: #ffffff;
  padding: 0.85rem;
}

.tile h3 {
  margin: 0;
  font-size: 1rem;
  color: #173f31;
}

.tile p {
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: #536760;
}

.empty-state {
  margin-top: 1rem;
  border: 1px dashed #b8ccc3;
  border-radius: 0.95rem;
  padding: 1.2rem;
  text-align: center;
  background: #f8fcfa;
}

.empty-icon {
  font-size: 1.6rem;
  color: #235c46;
}

.empty-state h3 {
  margin: 0.6rem 0 0;
  color: #173f31;
  font-size: 1.1rem;
}

.empty-state p {
  margin: 0.55rem auto 0;
  max-width: 52ch;
  color: #4c6159;
}

.empty-meta {
  display: flex;
  justify-content: center;
  gap: 0.9rem;
  margin-top: 0.85rem;
  color: #5b6f67;
  font-size: 0.84rem;
}

.empty-meta span {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

@media (max-width: 960px) {
  .status-board {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 680px) {
  .empty-meta {
    flex-direction: column;
    align-items: center;
    gap: 0.45rem;
  }
}
</style>
