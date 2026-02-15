<script>
export default {
  name: 'PollingStationPageView',
}
</script>

<template>
  <section class="view-polling">
    <h2><i class="pi pi-building-columns" /> Участки для голосования</h2>
    <p>
      Экран зарезервирован для карточек участков и оперативной статистики после подключения
      бэкенда.
    </p>

    <div class="status-board">
      <article class="tile">
        <h3>Polling Slot 01</h3>
        <p>Статус: готов к синхронизации</p>
      </article>
      <article class="tile">
        <h3>Polling Slot 02</h3>
        <p>Статус: готов к синхронизации</p>
      </article>
      <article class="tile">
        <h3>Polling Slot 03</h3>
        <p>Статус: готов к синхронизации</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.view-polling h2 {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin: 0;
  font-size: 1.5rem;
}

.view-polling p {
  margin-top: 0.75rem;
  color: #41554e;
}

.status-board {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}

.tile {
  border: 1px solid #d5e1db;
  border-radius: 0.8rem;
  background: #ffffff;
  padding: 0.85rem;
}

.tile h3 {
  margin: 0;
  font-size: 1rem;
  color: #173f31;
}

.tile p {
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: #536760;
}

@media (max-width: 960px) {
  .status-board {
    grid-template-columns: 1fr;
  }
}
</style>
