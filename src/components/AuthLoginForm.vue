<script>
import InputText from 'primevue/inputtext'

import { useAuthStore } from '@/stores/authStore'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default {
  name: 'AuthLoginForm',
  components: {
    InputText,
  },
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      submitting: false,
      submitAttempted: false,
      touched: {
        email: false,
        password: false,
      },
      authStore: useAuthStore(),
    }
  },
  computed: {
    serverError() {
      return this.authStore.errorMessage || ''
    },
    emailError() {
      if (this.submitAttempted) {
        if (!this.email) {
          return 'Введите email'
        }

        if (!EMAIL_PATTERN.test(this.email)) {
          return 'Введите корректный email'
        }
      }

      if (this.serverError && /email|почт/i.test(this.serverError)) {
        return this.serverError
      }

      return ''
    },
    passwordError() {
      if (this.touched.password && !this.password) {
        return 'Введите пароль'
      }

      if (this.serverError && !/email|почт/i.test(this.serverError)) {
        return this.serverError
      }

      return ''
    },
  },
  methods: {
    clearServerError() {
      if (this.authStore.errorMessage) {
        this.authStore.errorMessage = ''
      }
    },
    onEmailInput() {
      this.touched.email = true
      this.clearServerError()
    },
    onPasswordInput() {
      this.touched.password = true
      this.clearServerError()
    },
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    hasClientErrors() {
      return Boolean(this.emailError || this.passwordError)
    },
    async submit() {
      this.submitAttempted = true
      this.touched.email = true
      this.touched.password = true

      if (this.hasClientErrors()) {
        return
      }

      this.submitting = true
      try {
        await this.authStore.login({
          email: this.email,
          password: this.password,
        })
      } finally {
        this.submitting = false
      }

      if (this.authStore.isAuthenticated) {
        this.submitAttempted = false
        this.password = ''
        this.$emit('success')
      }
    },
  },
}
</script>

<template>
  <form novalidate @submit.prevent="submit">
    <p class="mb-[0.8rem] mt-0 text-[0.9rem] text-(--nog-text-subtle)">
      Введите данные аккаунта new order group
    </p>

    <label
      class="mb-[0.35rem] block text-[0.8rem] font-bold uppercase tracking-[0.08em] text-(--nog-text-subtle)"
      for="login-email"
    >
      Email
    </label>
    <InputText
      id="login-email"
      v-model.trim="email"
      type="email"
      autocomplete="username"
      class="!w-full !rounded-[0.72rem] !border !border-(--nog-form-input-border) !bg-(--nog-surface) !px-3 !py-[0.62rem] !font-semibold !text-(--nog-text) !shadow-[inset_0_0_0_1px_var(--nog-form-input-border-soft)] focus:!border-(--nog-form-input-focus) focus:!shadow-[inset_0_0_0_1px_var(--nog-form-input-focus),0_0_0_0.2rem_rgba(23,71,53,0.15)]"
      :invalid="Boolean(emailError)"
      placeholder="name@neworder.group"
      @input="onEmailInput"
    />
    <p
      v-if="emailError"
      class="mt-[0.35rem] rounded-[0.6rem] border border-(--nog-danger-border) bg-(--nog-danger-surface) px-2 py-[0.35rem] text-[0.82rem] text-(--nog-danger-text)"
    >
      {{ emailError }}
    </p>

    <label
      class="mb-[0.35rem] mt-3 block text-[0.8rem] font-bold uppercase tracking-[0.08em] text-(--nog-text-subtle)"
      for="login-password"
    >
      Пароль
    </label>
    <div class="relative">
      <InputText
        id="login-password"
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        autocomplete="current-password"
        class="!w-full !rounded-[0.72rem] !border !border-(--nog-form-input-border) !bg-(--nog-surface) !px-3 !py-[0.62rem] !pr-10 !font-semibold !text-(--nog-text) !shadow-[inset_0_0_0_1px_var(--nog-form-input-border-soft)] focus:!border-(--nog-form-input-focus) focus:!shadow-[inset_0_0_0_1px_var(--nog-form-input-focus),0_0_0_0.2rem_rgba(23,71,53,0.15)]"
        :invalid="Boolean(passwordError)"
        @input="onPasswordInput"
      />
      <button
        type="button"
        class="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer rounded-lg border-0 bg-transparent p-[0.35rem] text-(--nog-text-subtle) transition-colors hover:bg-(--nog-form-hover-surface) hover:text-(--nog-accent)"
        @click="togglePassword"
      >
        <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" />
      </button>
    </div>
    <p
      v-if="passwordError"
      class="mt-[0.35rem] rounded-[0.6rem] border border-(--nog-danger-border) bg-(--nog-danger-surface) px-2 py-[0.35rem] text-[0.82rem] text-(--nog-danger-text)"
    >
      {{ passwordError }}
    </p>

    <button
      type="submit"
      class="mt-[0.95rem] inline-flex w-full cursor-pointer items-center justify-center gap-[0.45rem] rounded-[0.72rem] border border-(--nog-accent) bg-(--nog-accent) px-[0.9rem] py-[0.7rem] text-[0.95rem] font-bold text-(--nog-surface) transition-colors hover:border-(--nog-accent-strong) hover:bg-(--nog-accent-strong) disabled:cursor-not-allowed disabled:opacity-80"
      :disabled="submitting"
    >
      <i v-if="submitting" class="pi pi-spinner pi-spin" />
      <i v-else class="pi pi-sign-in" />
      <span>{{ submitting ? 'Вход...' : 'Войти' }}</span>
    </button>
  </form>
</template>
