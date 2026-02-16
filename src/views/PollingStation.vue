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
  <section>
    <header>
      <h2 class="m-0 flex items-center gap-[0.55rem] text-2xl">
        <i class="pi pi-building-columns" />
        Участки для голосования
      </h2>
    </header>

    <div v-if="hasPollingStations" class="mt-4 grid grid-cols-3 gap-3 max-[960px]:grid-cols-1">
      <article
        v-for="station in pollingStations"
        :key="station.id"
        class="rounded-[0.8rem] border border-(--nog-border-soft-strong) bg-(--nog-surface) p-[0.85rem]"
      >
        <h3 class="m-0 text-base text-(--nog-text-strong)">{{ station.name }}</h3>
        <p class="mt-2 text-[0.9rem] text-(--nog-text-copy-soft)">{{ station.status }}</p>
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
