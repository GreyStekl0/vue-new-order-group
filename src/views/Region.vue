<script>
export default {
  name: 'RegionPageView',
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
      <h2><i class="pi pi-map" /> Регионы</h2>
      <p>Раздел подключён к модели данных. Сейчас список регионов пуст.</p>
    </header>

    <div v-if="hasRegions" class="list-wrap">
      <article v-for="region in regions" :key="region.id" class="region-row">
        <strong>{{ region.name }}</strong>
      </article>
    </div>

    <div v-else class="empty-state">
      <i class="pi pi-inbox empty-icon" />
      <h3>Пока нет регионов</h3>
      <p>
        Как только backend передаст данные, список появится здесь автоматически без изменения
        интерфейса.
      </p>
      <div class="empty-meta">
        <span><i class="pi pi-database" /> Источник: API</span>
        <span><i class="pi pi-sync" /> Состояние: пустой ответ</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page-head p {
  margin-top: 0.7rem;
  color: #41554e;
}

.view-region h2 {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin: 0;
  font-size: 1.5rem;
}

.list-wrap {
  margin-top: 1.1rem;
  display: grid;
  gap: 0.7rem;
}

.region-row {
  border: 1px solid #d7e3dd;
  border-radius: 0.8rem;
  background: #f9fcfa;
  padding: 0.75rem 0.9rem;
}

.region-row strong {
  color: #173f31;
}

.empty-state {
  margin-top: 1rem;
  border: 1px dashed #b8ccc3;
  border-radius: 0.95rem;
  padding: 1.2rem;
  text-align: center;
  background: #f8fcfa;
}

.empty-icon {
  font-size: 1.6rem;
  color: #235c46;
}

.empty-state h3 {
  margin: 0.6rem 0 0;
  color: #173f31;
  font-size: 1.1rem;
}

.empty-state p {
  margin: 0.55rem auto 0;
  max-width: 52ch;
  color: #4c6159;
}

.empty-meta {
  display: flex;
  justify-content: center;
  gap: 0.9rem;
  margin-top: 0.85rem;
  color: #5b6f67;
  font-size: 0.84rem;
}

.empty-meta span {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

@media (max-width: 680px) {
  .empty-meta {
    flex-direction: column;
    align-items: center;
    gap: 0.45rem;
  }
}
</style>
