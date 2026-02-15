<script>
export default {
  name: 'HomePageView',
}
</script>

<template>
  <section class="view-home">
    <p class="view-badge"><i class="pi pi-shield" /> new order group</p>

    <h2>
      Когда штурм <span class="accent">запрещён</span>, остаётся демократия
    </h2>

    <p class="lead">
      В золотые времена города брались силой, страхом и обманом. Власть доставалась самым
      могущественным. Теперь правила изменились: выборы, комиссии, отчёты и бесконечные формальности.
      В таких условиях нужна система, которая работает точнее и тише.
    </p>

    <hr class="divider" />

    <h3>new order group - ваше решение в эпоху процедур</h3>

    <p class="copy">
      new order group помогает сохранять влияние в среде, где каждый шаг требует легитимного вида и
      дисциплины исполнения. Мы берём на себя сложные этапы подготовки, координации и контроля
      кампаний, чтобы вы не тратили ресурсы на рутину.
    </p>

    <p class="copy">
      Наша модель работы учитывает риски и ограничения современного процесса принятия решений.
      Команда выстраивает комплексный сценарий действий: от базовой подготовки до финальной фиксации
      результата, с минимальным шумом и предсказуемым итогом.
    </p>

    <p class="copy">
      После авторизации вы сможете посмотреть примеры завершённых кампаний и текущих операций. Даже
      ограниченного объёма информации достаточно, чтобы оценить подход и понять, как new order group
      масштабирует управляемый результат.
    </p>

  </section>
</template>

<style scoped>
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
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.view-home h2 {
  margin: 0.85rem 0 0;
  font-size: clamp(1.6rem, 3vw, 2.5rem);
  line-height: 1.15;
}

.accent {
  color: #174735;
}

.lead {
  margin-top: 0.9rem;
  color: #3e524b;
  font-size: 1.03rem;
}

.divider {
  margin: 1.15rem 0;
  border: 0;
  border-top: 3px solid #174735;
  opacity: 0.7;
}

.view-home h3 {
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.25;
}

.copy {
  margin-top: 0.8rem;
  color: #455952;
}
</style>
