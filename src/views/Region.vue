<script>
export default {
  name: 'RegionPageView',
  data() {
    return {
      regions: [],
    }
  },
  computed: {
    hasRegions() {
      return this.regions.length > 0
    },
  },
}
</script>

<template>
  <section class="view-region">
    <header class="page-head">
      <h2 class="nog-section-heading"><i class="pi pi-map" /> Регионы</h2>
      <p class="nog-section-description">Раздел подключён к модели данных. Сейчас список регионов пуст.</p>
    </header>

    <div v-if="hasRegions" class="list-wrap">
      <article v-for="region in regions" :key="region.id" class="region-row nog-data-card">
        <strong class="nog-data-card-title">{{ region.name }}</strong>
      </article>
    </div>

    <div v-else class="nog-empty-state">
      <i class="pi pi-inbox nog-empty-icon" />
      <h3 class="nog-empty-title">Пока нет регионов</h3>
      <p class="nog-empty-copy">
        Как только backend передаст данные, список появится здесь автоматически без изменения
        интерфейса.
      </p>
      <div class="nog-empty-meta">
        <span class="nog-empty-meta-item"><i class="pi pi-database" /> Источник: API</span>
        <span class="nog-empty-meta-item"><i class="pi pi-sync" /> Состояние: пустой ответ</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list-wrap {
  margin-top: 1.1rem;
  display: grid;
  gap: 0.7rem;
}

.region-row {
  --nog-card-border-color: var(--nog-border-soft);
  --nog-card-bg: var(--nog-accent-surface);
  --nog-card-padding: 0.75rem 0.9rem;
}
</style>
