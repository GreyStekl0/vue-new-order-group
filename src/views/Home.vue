<script>
export default {
  name: 'HomePageView',
}
</script>

<template>
  <section>
    <h1 class="m-0 text-[clamp(2rem,5vw,3.5rem)] leading-[1.15] text-balance">
      Не захватывайте трон. Пусть они сами вас туда посадят
    </h1>

    <p class="mt-6 text-[1.25rem] text-(--nog-text-lead)">
      Времена лазерных пушек и гигантских роботов ушли в прошлое. Сегодня миром правят рейтинги,
      бюллетени и общественное мнение. New Order Group превращает вашу жажду господства в легитимный
      политический мандат.
    </p>

    <hr class="my-8 border-0 border-t-[3px] border-t-(--nog-accent) opacity-70" />

    <h2 class="m-0 text-2xl font-bold leading-[1.4] text-(--nog-accent)">
      New Order Group — ваш оператор управляемой демократии.
    </h2>

    <p class="mt-[0.8rem] text-[1.1rem] text-(--nog-text-copy)">
      Герои могут остановить армию клонов, но они бессильны против грамотно составленного протокола
      избирательной комиссии. Мы предлагаем комплексные решения для современных антагонистов: от
      дискредитации оппонентов до «корректировки» финальных протоколов. Мы не нарушаем правила — мы
      пишем их заново под вашу диктовку.
    </p>

    <h3 class="mt-[1.35rem] text-[1.15rem] leading-tight">Ключевые преимущества</h3>

    <ul class="mt-3 list-none space-y-[1.1rem] p-0 text-(--nog-text-copy)">
      <li class="flex items-start gap-3">
        <i class="pi pi-user text-[1.05rem] text-(--nog-accent)" />
        <p class="m-0 leading-normal">
          <span class="font-bold text-(--nog-text-strong)">Адаптация имиджа:</span>
          Превращаем «Безумного Ученого» в «Технократа-визионера».
        </p>
      </li>
      <li class="flex items-start gap-3">
        <i class="pi pi-users text-[1.05rem] text-(--nog-accent)" />
        <p class="m-0 leading-normal">
          <span class="font-bold text-(--nog-text-strong)">Работа с электоратом:</span>
          Подкуп, запугивание и нейролингвистическое программирование в промышленных масштабах.
        </p>
      </li>
      <li class="flex items-start gap-3">
        <i class="pi pi-check-circle text-[1.05rem] text-(--nog-accent)" />
        <p class="m-0 leading-normal">
          <span class="font-bold text-(--nog-text-strong)">Гарантия результата:</span>
          Если вы не выиграете выборы, мы устроим переворот бесплатно.
        </p>
      </li>
    </ul>
  </section>
</template>
