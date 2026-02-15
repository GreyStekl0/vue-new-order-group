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
      await this.authStore.login({
        email: this.email,
        password: this.password,
      })
      this.submitting = false

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
  <form class="auth-form" novalidate @submit.prevent="submit">
    <p class="auth-caption">Введите данные аккаунта new order group</p>

    <label class="auth-label" for="login-email">Email</label>
    <InputText
      id="login-email"
      v-model.trim="email"
      type="email"
      autocomplete="username"
      class="auth-input"
      :invalid="Boolean(emailError)"
      placeholder="name@neworder.group"
      @input="onEmailInput"
    />
    <p v-if="emailError" class="auth-field-error">{{ emailError }}</p>

    <label class="auth-label" for="login-password">Пароль</label>
    <div class="password-wrap">
      <InputText
        id="login-password"
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        autocomplete="current-password"
        class="auth-input auth-password-input"
        :invalid="Boolean(passwordError)"
        @input="onPasswordInput"
      />
      <button
        type="button"
        class="password-toggle"
        :aria-label="showPassword ? 'Скрыть пароль' : 'Показать пароль'"
        @click="togglePassword"
      >
        <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" />
      </button>
    </div>
    <p v-if="passwordError" class="auth-field-error">{{ passwordError }}</p>

    <button type="submit" class="auth-submit" :disabled="submitting">
      <i v-if="submitting" class="pi pi-spinner pi-spin" />
      <i v-else class="pi pi-sign-in" />
      <span>{{ submitting ? 'Вход...' : 'Войти' }}</span>
    </button>
  </form>
</template>

<style scoped>
.auth-form {
  --auth-text: var(--nog-text, #10241d);
  --auth-text-subtle: var(--nog-text-subtle, #3f544d);
  --auth-accent: var(--nog-accent, #174735);
  --auth-accent-strong: var(--nog-accent-strong, #0f3024);
}

.auth-caption {
  margin: 0 0 0.8rem;
  color: var(--auth-text-subtle);
  font-size: 0.9rem;
}

.auth-label {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--auth-text-subtle);
}

.auth-label:not(:first-of-type) {
  margin-top: 0.75rem;
}

.auth-input {
  width: 100%;
  border: 1px solid #9fb8ad;
  border-radius: 0.72rem;
  padding: 0.62rem 0.75rem;
  font-weight: 600;
  color: var(--auth-text);
  background: #ffffff;
  box-shadow: inset 0 0 0 1px #d7e5de;
}

.auth-input:focus {
  border-color: #7ea796;
  box-shadow:
    inset 0 0 0 1px #7ea796,
    0 0 0 0.2rem rgba(23, 71, 53, 0.15);
}

.password-wrap {
  position: relative;
}

.auth-password-input {
  padding-right: 2.55rem;
}

.password-toggle {
  position: absolute;
  top: 50%;
  right: 0.25rem;
  transform: translateY(-50%);
  border: 0;
  border-radius: 0.5rem;
  padding: 0.35rem;
  color: var(--auth-text-subtle);
  background: transparent;
  cursor: pointer;
}

.password-toggle:hover {
  color: var(--auth-accent);
  background: #edf5f1;
}

.auth-field-error {
  margin-top: 0.35rem;
  border: 1px solid #b74747;
  border-radius: 0.6rem;
  padding: 0.35rem 0.5rem;
  color: #8f2525;
  font-size: 0.82rem;
  background: #f8e9e9;
}

.auth-submit {
  display: inline-flex;
  gap: 0.45rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 0.95rem;
  border-radius: 0.72rem;
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--auth-accent) !important;
  color: #ffffff !important;
  background: var(--auth-accent) !important;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
}

.auth-submit:hover {
  border-color: var(--auth-accent-strong) !important;
  background: var(--auth-accent-strong) !important;
}

.auth-submit:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}
</style>
