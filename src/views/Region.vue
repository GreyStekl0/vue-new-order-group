<script>
import Region from '@/components/Region.vue'

export default {
  name: 'RegionPageView',
  components: {
    Region,
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

    <Region class="region-view__content" />
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

.region-view__content {
  display: block;
}
</style>
