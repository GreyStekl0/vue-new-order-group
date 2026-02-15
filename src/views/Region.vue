<script>
export default {
  name: 'RegionPageView',
}
</script>

<template>
  <section class="view-region">
    <h2><i class="pi pi-map" /> Регионы</h2>
    <p>Раздел подготовлен для загрузки регионов с сервера. Структура страницы уже готова.</p>

    <div class="placeholder-list">
      <div class="placeholder-item">
        <span>Region Slot A</span>
        <small>ожидает данные API</small>
      </div>
      <div class="placeholder-item">
        <span>Region Slot B</span>
        <small>ожидает данные API</small>
      </div>
      <div class="placeholder-item">
        <span>Region Slot C</span>
        <small>ожидает данные API</small>
      </div>
    </div>
  </section>
</template>

<style scoped>
.view-region h2 {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin: 0;
  font-size: 1.5rem;
}

.view-region p {
  margin-top: 0.7rem;
  color: #41554e;
}

.placeholder-list {
  margin-top: 1rem;
  display: grid;
  gap: 0.7rem;
}

.placeholder-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid #d7e3dd;
  border-radius: 0.8rem;
  background: #f9fcfa;
  padding: 0.75rem 0.9rem;
}

.placeholder-item span {
  font-weight: 700;
  color: #173f31;
}

.placeholder-item small {
  color: #63756f;
}
</style>
