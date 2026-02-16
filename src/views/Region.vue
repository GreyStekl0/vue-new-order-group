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
  <section class="region-view">
    <header class="region-view__header">
      <h2 class="region-view__title">
        <i class="pi pi-map region-view__title-icon" />
        Регионы
      </h2>
    </header>

    <div v-if="hasRegions" class="region-view__grid">
      <article v-for="region in regions" :key="region.id" class="region-view__card">
        <strong class="region-view__name">{{ region.name }}</strong>
      </article>
    </div>

    <EmptyState
      v-else
      class="region-view__empty"
      icon="pi pi-inbox"
      title="Глобальная карта чиста"
      description="Центр управления ожидает подтверждения новых целей. Модуль геополитического влияния находится в режиме пассивного мониторинга."
    />
  </section>
</template>

<style scoped>
.region-view__title {
  display: flex;
  align-items: center;
  gap: var(--nog-space-inline-gap-md);
  margin: 0;
  font-size: var(--nog-font-size-section-title);
}

.region-view__grid {
  display: grid;
  gap: var(--nog-space-region-grid-gap);
  margin-top: var(--nog-space-region-grid-offset);
}

.region-view__card {
  border: 1px solid var(--nog-border-soft);
  border-radius: var(--nog-radius-card);
  background: var(--nog-accent-surface);
  padding: var(--nog-space-region-card-y) var(--nog-space-region-card-x);
}

.region-view__name {
  color: var(--nog-text-strong);
}

.region-view__empty {
  margin-top: var(--nog-space-empty-offset);
}
</style>
