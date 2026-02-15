<script>
export default {
  name: 'HomePageView',
}
</script>

<template>
  <section class="view-home">
    <h1>Не захватывайте трон. Пусть они сами вас туда посадят</h1>

    <p class="lead">
      Времена лазерных пушек и гигантских роботов ушли в прошлое. Сегодня миром правят рейтинги,
      бюллетени и общественное мнение. New Order Group превращает вашу жажду господства в легитимный
      политический мандат.
    </p>

    <hr class="divider" />

    <h2>New Order Group — ваш оператор управляемой демократии.</h2>

    <p class="copy">
      Герои могут остановить армию клонов, но они бессильны против грамотно составленного протокола
      избирательной комиссии. Мы предлагаем комплексные решения для современных антагонистов: от
      дискредитации оппонентов до «корректировки» финальных протоколов. Мы не нарушаем правила — мы
      пишем их заново под вашу диктовку.
    </p>

    <h3>Ключевые преимущества</h3>

    <ul class="feature-list nog-list-reset">
      <li class="feature-item">
        <i class="pi pi-user feature-icon" aria-hidden="true" />
        <p class="feature-copy">
          <span class="feature-title">Адаптация имиджа:</span>
          Превращаем «Безумного Ученого» в «Технократа-визионера».
        </p>
      </li>
      <li class="feature-item">
        <i class="pi pi-users feature-icon" aria-hidden="true" />
        <p class="feature-copy">
          <span class="feature-title">Работа с электоратом:</span>
          Подкуп, запугивание и нейролингвистическое программирование в промышленных масштабах.
        </p>
      </li>
      <li class="feature-item">
        <i class="pi pi-check-circle feature-icon" aria-hidden="true" />
        <p class="feature-copy">
          <span class="feature-title">Гарантия результата:</span>
          Если вы не выиграете выборы, мы устроим переворот бесплатно.
        </p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.view-home h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.15;
  text-wrap: balance;
}

.lead {
  margin-top: 1.5rem;
  color: var(--nog-text-lead);
  font-size: 1.25rem;
}

.divider {
  margin: 2rem 0;
  border: 0;
  border-top: 3px solid var(--nog-accent);
  opacity: 0.7;
}

.view-home h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.4;
  color: var(--nog-accent);
}

.copy {
  margin-top: 0.8rem;
  color: var(--nog-text-copy);
  font-size: 1.1rem;
}

.view-home h3 {
  margin: 1.35rem 0 0;
  font-size: 1.15rem;
  line-height: 1.25;
}

.feature-list {
  margin: 0.75rem 0 0;
  color: var(--nog-text-copy);
}

.feature-list li + li {
  margin-top: 1.1rem;
}

.feature-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.feature-icon {
  color: var(--nog-accent);
  font-size: 1.05rem;
}

.feature-copy {
  margin: 0;
  line-height: 1.5;
}

.feature-title {
  font-weight: 700;
  color: var(--nog-text-strong);
}
</style>
