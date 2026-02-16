<script>
import InputText from 'primevue/inputtext'

import { useAuthStore } from '@/stores/authStore'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EMAIL_SERVER_ERROR_PATTERN = /email|почт/i
const PASSWORD_SERVER_ERROR_PATTERN = /password|парол/i
const EMAIL_FORMAT_ERROR_DEBOUNCE_MS = 450

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
      emailFormatErrorReady: true,
      emailFormatErrorTimeoutId: null,
      authStore: useAuthStore(),
    }
  },
  beforeUnmount() {
    this.clearEmailFormatErrorTimer()
  },
  computed: {
    serverError() {
      return this.authStore.errorMessage ? String(this.authStore.errorMessage).trim() : ''
    },
    emailFieldServerError() {
      return EMAIL_SERVER_ERROR_PATTERN.test(this.serverError) ? this.serverError : ''
    },
    passwordFieldServerError() {
      return PASSWORD_SERVER_ERROR_PATTERN.test(this.serverError) ? this.serverError : ''
    },
    generalServerError() {
      if (!this.serverError) {
        return ''
      }

      if (this.emailFieldServerError || this.passwordFieldServerError) {
        return ''
      }

      return this.serverError
    },
    emailError() {
      if (!this.email) {
        return this.submitAttempted ? 'Введите email' : ''
      }

      if (!EMAIL_PATTERN.test(this.email)) {
        if (!this.emailFormatErrorReady) {
          return ''
        }

        return 'Введите корректный email'
      }

      if (this.emailFieldServerError) {
        return this.emailFieldServerError
      }

      return ''
    },
    passwordError() {
      if (!this.submitAttempted) {
        return ''
      }

      if (!this.password) {
        return 'Введите пароль'
      }

      if (this.passwordFieldServerError) {
        return this.passwordFieldServerError
      }

      return ''
    },
    generalError() {
      if (this.generalServerError) {
        return this.generalServerError
      }

      return ''
    },
  },
  methods: {
    clearEmailFormatErrorTimer() {
      if (this.emailFormatErrorTimeoutId !== null) {
        clearTimeout(this.emailFormatErrorTimeoutId)
        this.emailFormatErrorTimeoutId = null
      }
    },
    clearServerError() {
      if (this.authStore.errorMessage) {
        this.authStore.errorMessage = ''
      }
    },
    onEmailInput() {
      this.clearServerError()

      if (!this.email || EMAIL_PATTERN.test(this.email)) {
        this.emailFormatErrorReady = true
        this.clearEmailFormatErrorTimer()
        return
      }

      this.emailFormatErrorReady = false
      this.clearEmailFormatErrorTimer()
      this.emailFormatErrorTimeoutId = setTimeout(() => {
        this.emailFormatErrorReady = true
        this.emailFormatErrorTimeoutId = null
      }, EMAIL_FORMAT_ERROR_DEBOUNCE_MS)
    },
    onPasswordInput() {
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
      this.emailFormatErrorReady = true
      this.clearEmailFormatErrorTimer()

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
  <form class="auth-login-form" novalidate @submit.prevent="submit">
    <p class="auth-login-form__intro">
      Введите данные аккаунта new order group
    </p>
    <p v-if="generalError" class="auth-login-form__alert auth-login-form__alert--general">
      {{ generalError }}
    </p>

    <label class="auth-login-form__label" for="login-email">
      Email
    </label>
    <InputText
      id="login-email"
      v-model.trim="email"
      type="email"
      autocomplete="username"
      class="auth-login-form__input"
      :invalid="Boolean(emailError)"
      placeholder="name@neworder.group"
      @input="onEmailInput"
    />
    <p v-if="emailError" class="auth-login-form__alert">
      {{ emailError }}
    </p>

    <label class="auth-login-form__label auth-login-form__label--password" for="login-password">
      Пароль
    </label>
    <div class="auth-login-form__password-wrap">
      <InputText
        id="login-password"
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        autocomplete="current-password"
        class="auth-login-form__input auth-login-form__input--password"
        :invalid="Boolean(passwordError)"
        @input="onPasswordInput"
      />
      <button
        type="button"
        class="auth-login-form__password-toggle"
        @click="togglePassword"
      >
        <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" />
      </button>
    </div>
    <p v-if="passwordError" class="auth-login-form__alert">
      {{ passwordError }}
    </p>

    <button
      type="submit"
      class="auth-login-form__submit"
      :disabled="submitting"
    >
      <i v-if="submitting" class="pi pi-spinner pi-spin" />
      <i v-else class="pi pi-sign-in" />
      <span>{{ submitting ? 'Вход...' : 'Войти' }}</span>
    </button>
  </form>
</template>

<style scoped>
.auth-login-form {
  display: flex;
  flex-direction: column;
}

.auth-login-form__intro {
  margin: 0 0 var(--nog-space-login-intro-offset);
  color: var(--nog-text-subtle);
  font-size: var(--nog-font-size-login-intro);
}

.auth-login-form__label {
  display: block;
  margin-bottom: var(--nog-space-login-label-offset);
  color: var(--nog-text-subtle);
  font-size: var(--nog-font-size-login-label);
  font-weight: var(--nog-font-weight-bold);
  letter-spacing: var(--nog-letter-spacing-tight);
  text-transform: uppercase;
}

.auth-login-form__label--password {
  margin-top: var(--nog-space-login-password-label-offset);
}

.auth-login-form__input {
  width: 100% !important;
  border: 1px solid var(--nog-form-input-border) !important;
  border-radius: var(--nog-radius-input) !important;
  background: var(--nog-surface) !important;
  color: var(--nog-text) !important;
  font-weight: var(--nog-font-weight-semibold) !important;
  padding: var(--nog-space-login-input-y) var(--nog-space-login-input-x) !important;
  box-shadow: inset 0 0 0 1px var(--nog-form-input-border-soft) !important;
}

.auth-login-form__input:focus {
  border-color: var(--nog-form-input-focus) !important;
  box-shadow:
    inset 0 0 0 1px var(--nog-form-input-focus),
    0 0 0 var(--nog-focus-ring-width) var(--nog-focus-ring-soft) !important;
}

.auth-login-form__input--password {
  padding-right: var(--nog-space-login-input-password-right) !important;
}

.auth-login-form__password-wrap {
  position: relative;
}

.auth-login-form__password-toggle {
  position: absolute;
  top: 50%;
  right: var(--nog-space-login-password-toggle-right);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--nog-space-login-password-toggle-padding);
  border: 0;
  border-radius: var(--nog-radius-control);
  background: transparent;
  color: var(--nog-text-subtle);
  cursor: pointer;
  transform: translateY(-50%);
  transition:
    color var(--nog-duration-fast) ease,
    background-color var(--nog-duration-fast) ease;
}

.auth-login-form__password-toggle:hover {
  background: var(--nog-form-hover-surface);
  color: var(--nog-accent);
}

.auth-login-form__alert {
  margin: var(--nog-space-login-alert-offset) 0 0;
  border: 1px solid var(--nog-danger-border);
  border-radius: var(--nog-radius-alert);
  background: var(--nog-danger-surface);
  color: var(--nog-danger-text);
  padding: var(--nog-space-login-alert-y) var(--nog-space-login-alert-x);
  font-size: var(--nog-font-size-login-alert);
}

.auth-login-form__alert--general {
  margin-bottom: var(--nog-space-login-general-alert-offset);
}

.auth-login-form__submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--nog-space-inline-gap-sm);
  width: 100%;
  margin-top: var(--nog-space-login-submit-offset);
  border: 1px solid var(--nog-accent);
  border-radius: var(--nog-radius-input);
  background: var(--nog-accent);
  color: var(--nog-surface);
  font-size: var(--nog-font-size-button);
  font-weight: var(--nog-font-weight-bold);
  padding: var(--nog-space-login-submit-y) var(--nog-space-login-submit-x);
  cursor: pointer;
  transition:
    border-color var(--nog-duration-fast) ease,
    background-color var(--nog-duration-fast) ease,
    opacity var(--nog-duration-fast) ease;
}

.auth-login-form__submit:hover {
  border-color: var(--nog-accent-strong);
  background: var(--nog-accent-strong);
}

.auth-login-form__submit:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}
</style>
