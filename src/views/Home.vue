<script>
export default {
  name: 'HomePageView',
}
</script>

<template>
  <section class="home-view">
    <h1 class="home-view__title">
      Не захватывайте трон. Пусть они сами вас туда посадят
    </h1>

    <p class="home-view__lead">
      Времена лазерных пушек и гигантских роботов ушли в прошлое. Сегодня миром правят рейтинги,
      бюллетени и общественное мнение. New Order Group превращает вашу жажду господства в легитимный
      политический мандат.
    </p>

    <hr class="home-view__separator" />

    <h2 class="home-view__subtitle">
      New Order Group — ваш оператор управляемой демократии.
    </h2>

    <p class="home-view__copy">
      Герои могут остановить армию клонов, но они бессильны против грамотно составленного протокола
      избирательной комиссии. Мы предлагаем комплексные решения для современных антагонистов: от
      дискредитации оппонентов до «корректировки» финальных протоколов. Мы не нарушаем правила — мы
      пишем их заново под вашу диктовку.
    </p>

    <h3 class="home-view__benefits-title">Ключевые преимущества</h3>

    <ul class="home-view__benefits-list">
      <li class="home-view__benefit-item">
        <i class="pi pi-user home-view__benefit-icon" />
        <p class="home-view__benefit-text">
          <span class="home-view__benefit-label">Адаптация имиджа:</span>
          Превращаем «Безумного Ученого» в «Технократа-визионера».
        </p>
      </li>
      <li class="home-view__benefit-item">
        <i class="pi pi-users home-view__benefit-icon" />
        <p class="home-view__benefit-text">
          <span class="home-view__benefit-label">Работа с электоратом:</span>
          Подкуп, запугивание и нейролингвистическое программирование в промышленных масштабах.
        </p>
      </li>
      <li class="home-view__benefit-item">
        <i class="pi pi-check-circle home-view__benefit-icon" />
        <p class="home-view__benefit-text">
          <span class="home-view__benefit-label">Гарантия результата:</span>
          Если вы не выиграете выборы, мы устроим переворот бесплатно.
        </p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.home-view__title {
  margin: 0;
  font-size: var(--nog-font-size-home-title);
  line-height: var(--nog-line-height-home-title);
  text-wrap: balance;
}

.home-view__lead {
  margin-top: var(--nog-space-home-lead-offset);
  margin-bottom: 0;
  color: var(--nog-text-lead);
  font-size: var(--nog-font-size-home-lead);
}

.home-view__separator {
  margin: var(--nog-space-home-separator-offset) 0;
  border: 0;
  border-top: var(--nog-border-width-strong) solid var(--nog-accent);
  opacity: 0.7;
}

.home-view__subtitle {
  margin: 0;
  color: var(--nog-accent);
  font-size: var(--nog-font-size-home-subtitle);
  font-weight: var(--nog-font-weight-bold);
  line-height: var(--nog-line-height-comfortable);
}

.home-view__copy {
  margin-top: var(--nog-space-home-copy-offset);
  margin-bottom: 0;
  color: var(--nog-text-copy);
  font-size: var(--nog-font-size-home-copy);
}

.home-view__benefits-title {
  margin-top: var(--nog-space-home-benefits-title-offset);
  margin-bottom: 0;
  font-size: var(--nog-font-size-home-benefits-title);
  line-height: var(--nog-line-height-tight);
}

.home-view__benefits-list {
  margin: var(--nog-space-home-benefits-list-offset) 0 0;
  padding: 0;
  list-style: none;
  color: var(--nog-text-copy);
  display: grid;
  gap: var(--nog-space-home-benefits-item-gap);
}

.home-view__benefit-item {
  display: flex;
  align-items: flex-start;
  gap: var(--nog-space-inline-gap-base);
}

.home-view__benefit-icon {
  color: var(--nog-accent);
  font-size: var(--nog-font-size-home-benefit-icon);
}

.home-view__benefit-text {
  margin: 0;
  line-height: var(--nog-line-height-normal);
}

.home-view__benefit-label {
  color: var(--nog-text-strong);
  font-weight: var(--nog-font-weight-bold);
}
</style>
