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
  <section>
    <header>
      <h2 class="m-0 flex items-center gap-[0.55rem] text-2xl">
        <i class="pi pi-map" />
        Регионы
      </h2>
    </header>

    <div v-if="hasRegions" class="mt-[1.1rem] grid gap-[0.7rem]">
      <article
        v-for="region in regions"
        :key="region.id"
        class="rounded-[0.8rem] border border-(--nog-border-soft) bg-(--nog-accent-surface) px-[0.9rem] py-3"
      >
        <strong class="text-(--nog-text-strong)">{{ region.name }}</strong>
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
