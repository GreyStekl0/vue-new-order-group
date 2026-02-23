<template>
  <div class="flex justify-center">
    <form class="w-1/2 p-6" @submit.prevent="createRegion">
      <h2 class="text-2xl mb-4 text-center" style="color: dimgrey">
        Добавление региона
      </h2>

      <div class="flex flex-col">
        <InputText
          v-model="regionName"
          type="text"
          placeholder="Введите наименование региона"
        />
      </div>

      <div class="flex flex-col mt-6">
        <Button
          type="submit"
          label="Создать"
          :disabled="isSubmitDisabled"
          :loading="dataStore.loading"
        />
      </div>
    </form>
  </div>

  <Toast position="bottom-right" />
</template>

<script setup>
import { computed, ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { useDataStore } from '@/stores/dataStore.js'

const dataStore = useDataStore()
const toast = useToast()

const regionName = ref('')
const trimmedRegionName = computed(() => String(regionName.value).trim())
const isSubmitDisabled = computed(() => dataStore.loading || !trimmedRegionName.value)

async function createRegion() {
  if (isSubmitDisabled.value) {
    return
  }

  try {
    await dataStore.createResource('regions', { name: trimmedRegionName.value }, { refresh: true })

    toast.add({
      severity: 'success',
      summary: 'Данные успешно добавлены',
      detail: 'Регион создан',
      life: 4000,
    })

    regionName.value = ''
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка добавления данных',
      detail: error instanceof Error ? error.message : 'Не удалось создать регион',
      life: 4000,
    })
  }
}
</script>

<style scoped></style>
