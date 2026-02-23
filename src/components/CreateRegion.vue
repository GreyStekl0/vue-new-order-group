<template>
  <section>
    <div class="flex justify-center">
      <form class="w-1/2 p-6" @submit.prevent="createRegion">
        <h2 class="text-2xl mb-4 text-center text-gray-600">
          Добавление региона
        </h2>

        <div class="flex flex-col">
          <InputText
            v-model="regionName"
            type="text"
            placeholder="Введите наименование региона"
          />
        </div>

        <div class="mb-4 mt-4">
          <label
            for="region-image"
            class="block text-md font-medium text-gray-500 border border-gray-300 rounded-md p-2"
          >
            <span :class="fileIconClass" class="mx-3"></span>{{ fileLabel }}
          </label>

          <input
            :key="fileInputKey"
            id="region-image"
            type="file"
            hidden
            name="image"
            required
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            @change="onImageChange"
          >
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
  </section>
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
const regionImage = ref(null)
const fileInputKey = ref(0)
const fileLabel = ref('Выбрать изображение')

const trimmedRegionName = computed(() => String(regionName.value).trim())
const fileIconClass = computed(() => (regionImage.value ? 'pi pi-file' : 'pi pi-upload'))
const isSubmitDisabled = computed(
  () => dataStore.loading || !trimmedRegionName.value || !regionImage.value
)

function onImageChange(event) {
  const file = event.target.files?.[0] ?? null
  regionImage.value = file
  fileLabel.value = file ? file.name : 'Выбрать изображение'
}

async function createRegion() {
  if (isSubmitDisabled.value) {
    return
  }

  try {
    const formData = new FormData()
    formData.append('name', trimmedRegionName.value)
    formData.append('image', regionImage.value)

    await dataStore.createResource('regions', formData, { refresh: true })

    toast.add({
      severity: 'success',
      summary: 'Данные успешно добавлены',
      detail: 'Регион создан',
      life: 4000,
    })

    regionName.value = ''
    regionImage.value = null
    fileLabel.value = 'Выбрать изображение'
    fileInputKey.value += 1
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
