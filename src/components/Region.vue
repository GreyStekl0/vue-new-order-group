<template>
  <div class="region-table">
    <DataTable
      class="region-table__datatable"
      :value="rows"
      :lazy="true"
      :loading="dataStore.loading"
      :paginator="true"
      :rows="perPage"
      :rowsPerPageOptions="rowsPerPageOptions"
      :totalRecords="totalRecords"
      @page="onPageChange"
      responsive-layout="scroll"
      :first="offset"
    >
      <template #paginatorend>
        <Button
          label="Добавить регион"
          icon="pi pi-plus"
          size="small"
          @click="goToCreateRegion"
        />
      </template>

      <Column field="id" header="№" />
      <Column
        header="Изображение"
        headerClass="region-table__image-column-header"
        bodyClass="region-table__image-column-body"
      >
        <template #body="{ data }">
          <div class="region-table__image-cell">
            <img
              v-if="hasRegionImage(data)"
              :src="getRegionImageUrlByRow(data)"
              :alt="getRegionImageAlt(data)"
              class="region-table__image"
              loading="lazy"
              @error="onImageError(data)"
            >
            <span v-else class="region-table__image-fallback" aria-hidden="true">
              <i class="pi pi-image" />
            </span>
          </div>
        </template>
      </Column>
      <Column field="name" header="Наименование региона" />
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useResourceTable } from '@/composables/useResourceTable'

defineOptions({
  name: 'RegionTable',
})

const router = useRouter()
const { dataStore, perPage, offset, rowsPerPageOptions, rows, totalRecords, onPageChange } =
  useResourceTable('regions')
const failedImageKeys = ref(new Set())

const backendOrigin = (() => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  if (!backendUrl) {
    return ''
  }

  try {
    return new URL(backendUrl).origin
  } catch {
    return ''
  }
})()

function goToCreateRegion() {
  router.push('/createRegion')
}

function getImageKey(region) {
  return String(region?.id ?? region?.['picture_url'] ?? '').trim()
}

function hasRegionImage(region) {
  const imagePath = String(region?.['picture_url'] ?? '').trim()
  if (!imagePath) {
    return false
  }

  const key = getImageKey(region)
  return key ? !failedImageKeys.value.has(key) : true
}

function onImageError(region) {
  const key = getImageKey(region)
  if (!key || failedImageKeys.value.has(key)) {
    return
  }

  const nextFailedImageKeys = new Set(failedImageKeys.value)
  nextFailedImageKeys.add(key)
  failedImageKeys.value = nextFailedImageKeys
}

function getRegionImageUrl(imagePath) {
  const rawPath = String(imagePath ?? '').trim()
  if (!rawPath) {
    return ''
  }

  if (/^https?:\/\//i.test(rawPath) || rawPath.startsWith('data:')) {
    return rawPath
  }

  const normalizedPath = rawPath.startsWith('/') ? rawPath : `/${rawPath}`
  return backendOrigin ? `${backendOrigin}${normalizedPath}` : normalizedPath
}

function getRegionImageUrlByRow(region) {
  return getRegionImageUrl(region?.['picture_url'])
}

function getRegionImageAlt(region) {
  const regionName = String(region?.name ?? '').trim()
  return regionName ? `Изображение региона ${regionName}` : 'Изображение региона'
}
</script>

<style scoped>
.region-table {
  margin-top: var(--nog-space-region-grid-offset);
}

.region-table :deep(.p-datatable) {
  border: 1px solid var(--nog-border);
  border-radius: var(--nog-radius-surface);
  background: var(--nog-surface);
  box-shadow: var(--nog-shadow-card-soft);
  overflow: hidden;
}

.region-table :deep(.p-datatable-table-container) {
  background: var(--nog-surface);
}

.region-table :deep(.p-datatable-thead > tr > th) {
  border: 0;
  border-bottom: 1px solid var(--nog-border);
  background: var(--nog-accent-surface);
  color: var(--nog-text-strong);
  font-size: var(--nog-font-size-sm);
  font-weight: var(--nog-font-weight-semibold);
  letter-spacing: var(--nog-letter-spacing-tight);
  text-transform: uppercase;
  padding: 0.9rem 1rem;
}

.region-table :deep(.p-datatable-tbody > tr) {
  transition: background-color var(--nog-duration-fast) ease;
}

.region-table :deep(.p-datatable-tbody > tr > td) {
  border: 0;
  border-bottom: 1px solid var(--nog-border-soft);
  padding: 0.9rem 1rem;
  color: var(--nog-text-copy);
  font-size: var(--nog-font-size-base);
}

.region-table :deep(.p-datatable-tbody > tr:hover) {
  background: var(--nog-hover-surface);
}

.region-table :deep(.p-datatable-tbody > tr:last-child > td) {
  border-bottom: 0;
}

.region-table :deep(.p-column-title) {
  color: var(--nog-text-strong);
}

.region-table :deep(.region-table__image-column-header),
.region-table :deep(.region-table__image-column-body) {
  width: 7rem;
  text-align: center;
}

.region-table__image-cell {
  display: flex;
  justify-content: center;
}

.region-table__image,
.region-table__image-fallback {
  width: 2.9rem;
  height: 2.9rem;
  border-radius: 0.65rem;
}

.region-table__image {
  display: block;
  object-fit: cover;
  border: 1px solid var(--nog-border-soft);
  background: var(--nog-surface-soft);
}

.region-table__image-fallback {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--nog-border-soft);
  background: var(--nog-accent-surface);
  color: var(--nog-text-subtle);
}

.region-table :deep(.p-paginator) {
  border: 0;
  border-top: 1px solid var(--nog-border);
  background: var(--nog-surface-soft);
  padding: 0.6rem 0.8rem;
  position: relative;
  justify-content: center;
}

.region-table :deep(.p-paginator-content-end) {
  position: absolute;
  right: 0.8rem;
}

.region-table :deep(.p-paginator .p-paginator-page),
.region-table :deep(.p-paginator .p-paginator-next),
.region-table :deep(.p-paginator .p-paginator-prev),
.region-table :deep(.p-paginator .p-paginator-first),
.region-table :deep(.p-paginator .p-paginator-last) {
  color: var(--nog-text-subtle);
}

.region-table :deep(.p-paginator .p-paginator-page.p-paginator-page-selected) {
  background: var(--nog-accent);
  color: var(--nog-surface);
}

.region-table :deep(.p-paginator .p-dropdown),
.region-table :deep(.p-paginator .p-select) {
  border-color: var(--nog-border-soft);
  background: var(--nog-surface);
}

.region-table :deep(.p-datatable-loading-overlay) {
  background: rgba(248, 251, 249, 0.75);
}
</style>
