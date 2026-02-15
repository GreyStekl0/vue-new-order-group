<script>
import EmptyState from '@/components/EmptyState.vue'

export default {
  name: 'RegionPageView',
  components: {
    EmptyState,
  },
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
    </header>

    <div v-if="hasRegions" class="list-wrap">
      <article v-for="region in regions" :key="region.id" class="region-row nog-data-card">
        <strong class="nog-data-card-title">{{ region.name }}</strong>
      </article>
    </div>

    <EmptyState
      v-else
      class="mt-8"
      icon="pi pi-inbox"
      title="Глобальная карта чиста"
      description="Центр управления ожидает подтверждения новых целей. Модуль геополитического влияния находится в режиме пассивного мониторинга."
    />
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
