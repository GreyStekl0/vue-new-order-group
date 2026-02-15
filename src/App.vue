<script>
import Menubar from 'primevue/menubar'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import PrimeButton from 'primevue/button'

import { useAuthStore } from '@/stores/authStore'

export default {
  components: {
    Menubar,
    InputText,
    Password,
    PrimeButton,
  },
  data() {
    return {
      email: '',
      password: '',
      authStore: useAuthStore(),
      menuItems: [
        {
          label: 'Главная',
          icon: 'pi pi-home',
          route: '/',
        },
        {
          label: 'Регионы',
          icon: 'pi pi-map-marker',
          route: '/region',
        },
        {
          label: 'Участки',
          icon: 'pi pi-building-columns',
          route: '/pollingstation',
        },
      ],
    }
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated
    },
    user() {
      return this.authStore.user
    },
    authError() {
      return this.authStore.errorMessage
    },
  },
  methods: {
    logout() {
      this.authStore.logout()
    },
    login() {
      this.authStore.login({ email: this.email, password: this.password })
    },
  },
  mounted() {
    const token = localStorage.getItem('token')
    if (token) {
      this.authStore.isAuthenticated = true
      this.authStore.getUser()
    }
  },
}
</script>

<template>
  <div class="nog-shell">
    <header class="nog-header">
      <div class="nog-title">
        <p class="title-badge"><i class="pi pi-shield" /> new order group</p>
        <h1>new order group</h1>
        <p class="title-copy">Control Layer Interface</p>
      </div>

      <Menubar :model="menuItems" class="nog-menubar">
        <template #item="{ item, props }">
          <router-link v-if="item.route" v-slot="routerProps" :to="item.route" custom>
            <a
              :href="routerProps.href"
              v-bind="props.action"
              :class="['menu-link', { 'menu-link-active': routerProps.isActive }]"
              @click="routerProps.navigate"
              @keydown.enter.space="routerProps.navigate"
            >
              <i v-if="item.icon" :class="[item.icon, 'menu-icon']" />
              <span>{{ item.label }}</span>
            </a>
          </router-link>

          <a v-else :href="item.url" :target="item.target" v-bind="props.action" class="menu-link">
            <i v-if="item.icon" :class="[item.icon, 'menu-icon']" />
            <span>{{ item.label }}</span>
          </a>
        </template>

        <template #end>
          <p class="menu-state" :class="{ 'menu-state-online': isAuthenticated }">
            <i :class="isAuthenticated ? 'pi pi-lock-open' : 'pi pi-lock'" />
            <span>{{ isAuthenticated ? 'Authorized' : 'Guest mode' }}</span>
          </p>
        </template>
      </Menubar>
    </header>

    <main class="nog-main">
      <section class="content-panel">
        <router-view v-slot="{ Component }">
          <transition name="route-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </section>

      <aside class="auth-panel">
        <div v-if="isAuthenticated" class="auth-card">
          <h2><i class="pi pi-user" /> Активная сессия</h2>
          <p class="auth-line">
            <span>Пользователь:</span>
            <strong>{{ user ? user.name : 'Operator' }}</strong>
          </p>
          <p class="auth-line">
            <span>Статус:</span>
            <strong class="status-online">Online</strong>
          </p>
          <PrimeButton label="Выйти" icon="pi pi-sign-out" class="auth-submit" @click="logout" />
        </div>

        <form v-else class="auth-card" @submit.prevent="login">
          <h2><i class="pi pi-sign-in" /> Войти в систему</h2>
          <p class="auth-caption">Уровень доступа для операторов New Order Group</p>

          <label class="auth-label" for="email">Email</label>
          <InputText
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            class="auth-input"
            placeholder="name@neworder.group"
            required
          />

          <label class="auth-label" for="password">Password</label>
          <Password
            id="password"
            v-model="password"
            inputClass="auth-input"
            class="auth-password"
            autocomplete="current-password"
            :feedback="false"
            toggleMask
            required
          />

          <PrimeButton label="Войти" icon="pi pi-sign-in" type="submit" class="auth-submit" />
          <p v-if="authError" class="auth-error">{{ authError }}</p>
        </form>
      </aside>
    </main>
  </div>
</template>

<style scoped>
.nog-shell {
  --nog-bg: #f3f7f4;
  --nog-surface: #ffffff;
  --nog-surface-soft: #f8fbf9;
  --nog-text: #10241d;
  --nog-text-subtle: #3f544d;
  --nog-border: #d4e3dc;
  --nog-accent: #174735;
  --nog-accent-strong: #0f3024;
  min-height: 100vh;
  padding: clamp(1rem, 2vw, 2rem);
  color: var(--nog-text);
  background:
    radial-gradient(100% 200% at 100% 0%, #e6f2ec 0%, transparent 45%),
    linear-gradient(180deg, #f8fcfa 0%, var(--nog-bg) 100%);
}

.nog-header {
  max-width: 1240px;
  margin: 0 auto;
}

.nog-title {
  margin-bottom: 1rem;
}

.title-badge {
  display: inline-flex;
  gap: 0.45rem;
  align-items: center;
  border-radius: 9999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--nog-surface);
  background: var(--nog-accent);
}

.nog-title h1 {
  margin: 0.7rem 0 0;
  font-family: 'Aldrich', 'Bahnschrift', 'Segoe UI', sans-serif;
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.05;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.title-copy {
  margin-top: 0.45rem;
  color: var(--nog-text-subtle);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.8rem;
}

:deep(.nog-menubar.p-menubar) {
  border: 1px solid var(--nog-border);
  border-radius: 0.95rem;
  background: var(--nog-surface);
  padding: 0.45rem 0.65rem;
  box-shadow: 0 12px 26px rgba(16, 36, 29, 0.08);
}

:deep(.nog-menubar .p-menubar-root-list) {
  gap: 0.4rem;
}

.menu-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border-radius: 0.65rem;
  padding: 0.52rem 0.75rem;
  color: var(--nog-text);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
}

.menu-link:hover {
  color: var(--nog-accent);
  background: #ecf4f0;
}

.menu-link-active {
  color: var(--nog-surface);
  background: var(--nog-accent);
}

.menu-link-active:hover {
  background: var(--nog-accent-strong);
  color: var(--nog-surface);
}

.menu-icon {
  font-size: 0.9rem;
}

.menu-state {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  border: 1px solid var(--nog-border);
  border-radius: 9999px;
  padding: 0.35rem 0.75rem;
  color: var(--nog-text-subtle);
  font-size: 0.78rem;
  font-weight: 600;
}

.menu-state-online {
  border-color: #afc8be;
  color: var(--nog-accent);
  background: #edf6f2;
}

.nog-main {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 340px);
  gap: 1rem;
  max-width: 1240px;
  margin: 1rem auto 0;
}

.content-panel {
  border: 1px solid var(--nog-border);
  border-radius: 1rem;
  background: var(--nog-surface);
  box-shadow: 0 18px 34px rgba(16, 36, 29, 0.08);
  padding: clamp(1rem, 2vw, 1.75rem);
  min-height: 500px;
}

.auth-panel {
  position: sticky;
  top: 1rem;
  height: fit-content;
}

.auth-card {
  border: 1px solid var(--nog-border);
  border-radius: 1rem;
  background: var(--nog-surface-soft);
  padding: 1rem;
  box-shadow: 0 12px 24px rgba(16, 36, 29, 0.08);
}

.auth-card h2 {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
}

.auth-caption {
  margin: 0.4rem 0 1rem;
  color: var(--nog-text-subtle);
  font-size: 0.88rem;
}

.auth-label {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--nog-text-subtle);
}

.auth-label:not(:first-of-type) {
  margin-top: 0.9rem;
}

.auth-password {
  width: 100%;
}

:deep(.auth-input.p-inputtext),
:deep(.auth-password .p-inputtext) {
  width: 100%;
  border: 1px solid var(--nog-border);
  color: var(--nog-text);
  background: var(--nog-surface);
}

:deep(.auth-input.p-inputtext:enabled:focus),
:deep(.auth-password .p-inputtext:enabled:focus) {
  border-color: #7ea796;
  box-shadow: 0 0 0 0.2rem rgba(23, 71, 53, 0.15);
}

:deep(.auth-password.p-password) {
  width: 100%;
}

:deep(.auth-submit.p-button) {
  width: 100%;
  margin-top: 1rem;
  border: 1px solid var(--nog-accent);
  background: var(--nog-accent);
}

:deep(.auth-submit.p-button:hover) {
  border-color: var(--nog-accent-strong);
  background: var(--nog-accent-strong);
}

.auth-line {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  margin: 0.75rem 0;
  color: var(--nog-text-subtle);
  font-size: 0.92rem;
}

.status-online {
  color: var(--nog-accent);
}

.auth-error {
  margin-top: 0.75rem;
  border: 1px solid #b74747;
  border-radius: 0.7rem;
  padding: 0.45rem 0.6rem;
  color: #8f2525;
  font-size: 0.84rem;
  background: #f8e9e9;
}

.route-fade-enter-active,
.route-fade-leave-active {
  transition: opacity 0.2s ease;
}

.route-fade-enter-from,
.route-fade-leave-to {
  opacity: 0;
}

@media (max-width: 1024px) {
  .nog-main {
    grid-template-columns: 1fr;
  }

  .auth-panel {
    position: static;
  }
}

@media (max-width: 760px) {
  :deep(.nog-menubar .p-menubar-end) {
    margin-top: 0.5rem;
  }

  .menu-state {
    width: 100%;
    justify-content: center;
  }
}
</style>
