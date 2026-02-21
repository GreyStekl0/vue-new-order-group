<script setup>
import AuthRequiredState from '@/components/AuthRequiredState.vue'
import EmptyState from '@/components/EmptyState.vue'
import PollingStation from '@/components/PollingStation.vue'
import { useAuthResourcePage } from '@/composables/useAuthResourcePage'

defineOptions({
  name: 'PollingStationPageView',
})

const { showGuestState, showResourceState: showPollingStationGrid, showEmptyState } =
  useAuthResourcePage('pollingStations')
</script>

<template>
  <section class="polling-station-view">
    <header class="polling-station-view__header">
      <h2 class="polling-station-view__title">
        <i class="pi pi-building-columns polling-station-view__title-icon" />
        Участки для голосования
      </h2>
    </header>

    <AuthRequiredState v-if="showGuestState" class="polling-station-view__state" />

    <PollingStation v-else-if="showPollingStationGrid" class="polling-station-view__content" />

    <EmptyState
      v-else-if="showEmptyState"
      class="polling-station-view__state"
      icon="pi pi-folder-open"
      title="Сектор не инициализирован"
      description="Полевые агенты еще не передали данные с мест. Не предпринимайте активных действий до полной синхронизации протоколов."
    />

    <p v-else class="polling-station-view__loading">Синхронизация данных...</p>
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

.polling-station-view__content {
  display: block;
}

.polling-station-view__state {
  margin-top: var(--nog-space-empty-offset);
}

.polling-station-view__loading {
  margin-top: var(--nog-space-polling-grid-offset);
  color: var(--nog-text-subtle);
}
</style>
