<script>
import Region from '@/components/Region.vue'
import EmptyState from '@/components/EmptyState.vue'
import AuthRequiredState from '@/components/AuthRequiredState.vue'
import { useAuthStore } from '@/stores/authStore'
import { useDataStore } from '@/stores/dataStore'

export default {
  name: 'RegionPageView',
  components: {
    Region,
    EmptyState,
    AuthRequiredState,
  },
  data() {
    return {
      authStore: useAuthStore(),
      dataStore: useDataStore(),
      isRegionLoading: false,
    }
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated
    },
    isAuthPending() {
      return Boolean(this.authStore.token) && !this.authStore.isAuthenticated
    },
    hasRegions() {
      return this.dataStore.get_resource_list('regions').length > 0
    },
    showGuestState() {
      return !this.isAuthPending && !this.isAuthenticated
    },
    showRegionTable() {
      return this.isAuthenticated && this.hasRegions
    },
    showEmptyState() {
      return this.isAuthenticated && !this.isRegionLoading && !this.hasRegions
    },
  },
  mounted() {
    if (this.isAuthenticated) {
      this.loadRegions()
    }
  },
  watch: {
    isAuthenticated(value) {
      if (value) {
        this.loadRegions()
      }
    },
  },
  methods: {
    async loadRegions() {
      this.isRegionLoading = true

      try {
        await this.dataStore.get_resource('regions', 1, 5)
      } finally {
        this.isRegionLoading = false
      }
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

    <AuthRequiredState v-if="showGuestState" class="region-view__state" />

    <Region v-else-if="showRegionTable" class="region-view__content" />

    <EmptyState
      v-else-if="showEmptyState"
      class="region-view__state"
      icon="pi pi-map"
      title="Регионы не найдены"
      description="Сервер не вернул ни одной записи. Добавьте регионы в систему и повторите запрос."
    />

    <p v-else class="region-view__loading">Синхронизация данных...</p>
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

.region-view__state {
  margin-top: var(--nog-space-empty-offset);
}

.region-view__loading {
  margin-top: var(--nog-space-region-grid-offset);
  color: var(--nog-text-subtle);
}
</style>
