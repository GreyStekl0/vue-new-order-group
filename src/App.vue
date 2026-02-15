<script>
import Menubar from 'primevue/menubar'
import PrimeDialog from 'primevue/dialog'
import PrimeButton from 'primevue/button'

import AuthLoginForm from '@/components/AuthLoginForm.vue'
import { useAuthStore } from '@/stores/authStore'

export default {
  components: {
    Menubar,
    PrimeDialog,
    PrimeButton,
    AuthLoginForm,
  },
  data() {
    return {
      authStore: useAuthStore(),
      showLoginModal: false,
      pendingRedirect: '',
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
    accountTitle() {
      return this.user && this.user.name ? this.user.name : 'Аккаунт'
    },
  },
  methods: {
    async logout() {
      await this.authStore.logout()
    },
    openLoginModal() {
      this.pendingRedirect = this.$route.fullPath
      this.authStore.errorMessage = ''
      this.showLoginModal = true
    },
    onLoginSuccess() {
      this.showLoginModal = false
      const redirectTarget = this.pendingRedirect || this.$route.fullPath

      this.pendingRedirect = ''
      this.authStore.errorMessage = ''

      if (this.$route.fullPath !== redirectTarget) {
        this.$router.replace(redirectTarget)
      }
    },
    onLoginModalHide() {
      this.authStore.errorMessage = ''
    },
    handleExternalLoginOpen() {
      this.openLoginModal()
    },
  },
  mounted() {
    const token = localStorage.getItem('token')
    if (token) {
      this.authStore.isAuthenticated = true
      this.authStore.getUser()
    }

    window.addEventListener('open-login-modal', this.handleExternalLoginOpen)
  },
  beforeUnmount() {
    window.removeEventListener('open-login-modal', this.handleExternalLoginOpen)
  },
}
</script>

<template>
  <div class="nog-shell">
    <header class="nog-header">
      <div class="nog-title">
        <p class="title-badge"><i class="pi pi-shield" /> new order group</p>
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
          <div class="menu-auth-controls">
            <p class="menu-state" :class="{ 'menu-state-online': isAuthenticated }">
              <i :class="isAuthenticated ? 'pi pi-user' : 'pi pi-user-minus'" />
              <span>{{ isAuthenticated ? accountTitle : 'Гость' }}</span>
            </p>

            <PrimeButton
              v-if="!isAuthenticated"
              label="Войти"
              icon="pi pi-sign-in"
              size="small"
              class="menu-inline-action"
              @click="openLoginModal"
            />

            <PrimeButton
              v-else
              label="Выйти"
              icon="pi pi-sign-out"
              text
              size="small"
              class="menu-inline-action menu-inline-action-logout"
              @click="logout"
            />
          </div>
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
    </main>

    <PrimeDialog
      v-model:visible="showLoginModal"
      modal
      header="Войти"
      :draggable="false"
      :style="{ width: 'min(92vw, 28rem)' }"
      class="auth-dialog"
      @hide="onLoginModalHide"
    >
      <AuthLoginForm @success="onLoginSuccess" />
    </PrimeDialog>
  </div>
</template>

<style scoped>
.nog-shell {
  min-height: 100vh;
  padding: clamp(1rem, 2vw, 2rem);
  color: var(--nog-text);
  background:
    radial-gradient(100% 200% at 100% 0%, var(--nog-bg-gradient-top) 0%, transparent 45%),
    linear-gradient(180deg, var(--nog-bg-gradient-bottom) 0%, var(--nog-bg) 100%);
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
  background: var(--nog-hover-surface);
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

.menu-auth-controls {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
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
  border-color: var(--nog-online-border);
  color: var(--nog-accent);
  background: var(--nog-accent-soft);
}

:deep(.menu-inline-action.p-button) {
  border-radius: 9999px;
  padding: 0.42rem 0.8rem;
}

:deep(.menu-inline-action.p-button:not(.p-button-text)) {
  border: 1px solid var(--nog-accent);
  background: var(--nog-accent);
}

:deep(.menu-inline-action.p-button:not(.p-button-text):hover) {
  border-color: var(--nog-accent-strong);
  background: var(--nog-accent-strong);
}

:deep(.menu-inline-action-logout.p-button.p-button-text) {
  color: var(--nog-accent);
}

.nog-main {
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

:deep(.auth-dialog .p-dialog-header) {
  padding: 1rem 1.2rem 0.35rem;
}

:deep(.auth-dialog .p-dialog-content) {
  padding: 0.6rem 1.2rem 1.2rem;
}

.route-fade-enter-active,
.route-fade-leave-active {
  transition: opacity 0.2s ease;
}

.route-fade-enter-from,
.route-fade-leave-to {
  opacity: 0;
}

@media (max-width: 760px) {
  :deep(.nog-menubar .p-menubar-end) {
    margin-top: 0.5rem;
    width: 100%;
  }

  .menu-auth-controls {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
