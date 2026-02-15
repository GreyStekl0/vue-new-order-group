<script>
export default {
  name: 'HomePageView',
}
</script>

<template>
  <section class="view-home">
    <p class="view-badge"><i class="pi pi-compass" /> Strategic Overview</p>
    <h2>Центр управления New Order Group</h2>
    <p class="lead">
      Навигация и рабочие зоны готовы к подключению серверных данных. Интерфейс построен как
      единая контрольная панель в стиле Black Hat Organization.
    </p>

    <div class="grid">
      <article class="card">
        <h3><i class="pi pi-map-marker" /> Регионы</h3>
        <p>Управление региональными направлениями и географией операций.</p>
      </article>

      <article class="card">
        <h3><i class="pi pi-building-columns" /> Участки</h3>
        <p>Контроль статусов участков и синхронизация результатов по маршрутам.</p>
      </article>

      <article class="card muted">
        <h3><i class="pi pi-database" /> Интеграции</h3>
        <p>Данные будут заполняться API-слоем после подключения бэкенда.</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.view-home h2 {
  margin: 0.75rem 0 0;
  font-size: clamp(1.45rem, 2.4vw, 2rem);
  line-height: 1.2;
}

.view-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.78rem;
  font-weight: 700;
  color: #174735;
  background: #e7f2ec;
}

.lead {
  margin-top: 0.75rem;
  color: #3e524b;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 1.1rem;
}

.card {
  border: 1px solid #d6e2dc;
  border-radius: 0.85rem;
  background: #ffffff;
  padding: 0.95rem;
}

.card h3 {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0;
  font-size: 1rem;
}

.card p {
  margin: 0.6rem 0 0;
  color: #445851;
  font-size: 0.92rem;
}

.muted {
  background: #f4f8f6;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
