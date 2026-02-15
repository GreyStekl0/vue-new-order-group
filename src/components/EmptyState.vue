<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: 'pi pi-info-circle',
  },
})
</script>

<template>
  <section
    class="w-full rounded-2xl border border-(--nog-border) bg-(--nog-surface) shadow-sm"
  >
    <div class="flex flex-col items-center px-6 py-16 text-center sm:px-10">
      <div class="relative mb-8 flex h-32 w-32 items-center justify-center">
        <span
          class="absolute h-24 w-24 rounded-full bg-(--nog-accent) opacity-20 animate-ping"
          aria-hidden="true"
        />
        <span
          class="absolute h-28 w-28 rounded-full border border-(--nog-border) bg-(--nog-surface-soft)"
          aria-hidden="true"
        />
        <i :class="[props.icon, 'relative z-10 text-5xl! leading-none text-(--nog-accent)']" />
      </div>

      <h3 class="text-3xl font-bold tracking-tight text-(--nog-text-strong) sm:text-4xl">
        {{ props.title }}
      </h3>

      <p
        v-if="props.description"
        class="mt-4 max-w-3xl text-lg leading-relaxed text-(--nog-text-copy) sm:text-xl"
      >
        {{ props.description }}
      </p>
    </div>

    <footer
      class="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 rounded-b-2xl border-t border-(--nog-border) bg-(--nog-accent-strong) px-6 py-4 text-xs font-medium uppercase tracking-[0.2em] text-(--nog-surface) sm:text-sm"
    >
      <span class="font-mono">
        Connection:
        <strong class="font-semibold text-emerald-500">Secure</strong>
      </span>
      <span class="font-mono">
        Protocol:
        <strong class="font-semibold text-(--nog-surface)">Silent</strong>
      </span>
      <span class="font-mono">
        Status:
        <strong class="font-semibold text-emerald-500">Standby</strong>
      </span>
    </footer>
  </section>
</template>
