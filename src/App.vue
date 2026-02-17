<script>
import Menubar from 'primevue/menubar'
import PrimeDialog from 'primevue/dialog'
import PrimeButton from 'primevue/button'

import AuthLoginForm from '@/components/AuthLoginForm.vue'
import { useAuthStore } from '@/stores/authStore'

const MENUBAR_PT = Object.freeze({
  rootList: {
    class: 'app-menubar-list',
  },
  end: {
    class: 'app-menubar-end-slot',
  },
})

const LOGIN_DIALOG_PT = Object.freeze({
  header: {
    class: 'app-login-dialog-header',
  },
  content: {
    class: 'app-login-dialog-content',
  },
})

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
      menubarPt: MENUBAR_PT,
      loginDialogPt: LOGIN_DIALOG_PT,
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
      return this.user?.name || 'Аккаунт'
    },
  },
  methods: {
    async logout() {
      await this.authStore.logout()
    },
    openLoginModal() {
      this.authStore.clearError()
      this.showLoginModal = true
    },
    onLoginSuccess() {
      this.showLoginModal = false
      this.authStore.clearError()
    },
    onLoginModalHide() {
      this.authStore.clearError()
    },
    handleExternalLoginOpen() {
      this.openLoginModal()
    },
  },
  mounted() {
    if (this.authStore.token) {
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
  <div class="app-shell">
    <header class="app-header">
      <div class="app-brand-wrap">
        <p class="app-brand-badge">
          <i class="pi pi-shield" />
          new order group
        </p>
      </div>

      <Menubar :model="menuItems" :pt="menubarPt" class="app-menubar">
        <template #item="{ item }">
          <router-link v-slot="routerProps" :to="item.route" custom>
            <a
              :href="routerProps.href"
              :class="[
                'app-nav-link',
                routerProps.isActive ? 'app-nav-link--active' : '',
              ]"
              @click="routerProps.navigate"
            >
              <i v-if="item.icon" :class="[item.icon, 'app-nav-icon']" />
              <span>{{ item.label }}</span>
            </a>
          </router-link>
        </template>

        <template #end>
          <div class="app-menubar-end-wrap">
            <p class="app-user-pill" :class="isAuthenticated ? 'app-user-pill--online' : ''">
              <i :class="isAuthenticated ? 'pi pi-user' : 'pi pi-user-minus'" />
              <span>{{ isAuthenticated ? accountTitle : 'Гость' }}</span>
            </p>

            <PrimeButton
              v-if="!isAuthenticated"
              label="Войти"
              icon="pi pi-sign-in"
              size="small"
              class="app-login-button"
              @click="openLoginModal"
            />

            <PrimeButton
              v-else
              label="Выйти"
              icon="pi pi-sign-out"
              text
              size="small"
              class="app-logout-button"
              @click="logout"
            />
          </div>
        </template>
      </Menubar>
    </header>

    <main class="app-main">
      <section class="app-content-surface">
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
      class="app-login-dialog"
      :pt="loginDialogPt"
      @hide="onLoginModalHide"
    >
      <AuthLoginForm @success="onLoginSuccess" />
    </PrimeDialog>
  </div>
</template>

<style scoped>
.app-shell {
  --app-shell-background:
    radial-gradient(100% 200% at 100% 0%, var(--nog-bg-gradient-top) 0%, transparent 45%),
    linear-gradient(180deg, var(--nog-bg-gradient-bottom) 0%, var(--nog-bg) 100%);
  min-height: 100vh;
  color: var(--nog-text);
  padding: var(--nog-space-shell-padding);
  background: var(--app-shell-background);
}

.app-header,
.app-main {
  width: min(100%, 77.5rem);
  margin-inline: auto;
}

.app-main {
  margin-top: var(--nog-space-main-offset);
}

.app-brand-wrap {
  margin-bottom: var(--nog-space-brand-offset);
}

.app-brand-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--nog-space-inline-gap-sm);
  margin: 0;
  padding: var(--nog-space-brand-badge-y) var(--nog-space-brand-badge-x);
  border-radius: var(--nog-radius-pill);
  background: var(--nog-accent);
  color: var(--nog-surface);
  font-size: var(--nog-font-size-2xs);
  font-weight: var(--nog-font-weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--nog-letter-spacing-tight);
}

.app-menubar {
  border: 1px solid var(--nog-border) !important;
  border-radius: var(--nog-radius-menubar) !important;
  background: var(--nog-surface) !important;
  padding: var(--nog-space-menubar-padding-y) var(--nog-space-menubar-padding-x) !important;
  box-shadow: var(--nog-shadow-menubar) !important;
}

.app-nav-link {
  display: inline-flex;
  align-items: center;
  gap: var(--nog-space-inline-gap-sm);
  border-radius: var(--nog-radius-nav-link);
  padding: var(--nog-space-nav-link-y) var(--nog-space-nav-link-x);
  color: var(--nog-text);
  font-weight: var(--nog-font-weight-semibold);
  text-decoration: none;
  transition:
    color var(--nog-duration-fast) ease,
    background-color var(--nog-duration-fast) ease;
}

.app-nav-link:hover {
  background: var(--nog-hover-surface);
  color: var(--nog-accent);
}

.app-nav-link--active {
  background: var(--nog-accent) !important;
  color: var(--nog-surface) !important;
}

.app-nav-link--active:hover {
  background: var(--nog-accent-strong) !important;
  color: var(--nog-surface) !important;
}

.app-nav-icon {
  font-size: var(--nog-font-size-sm);
}

.app-menubar-end-wrap {
  display: inline-flex;
  align-items: center;
  gap: var(--nog-space-inline-gap-md);
}

.app-user-pill {
  display: inline-flex;
  align-items: center;
  gap: var(--nog-space-inline-gap-xs);
  margin: 0;
  padding: var(--nog-space-user-pill-y) var(--nog-space-user-pill-x);
  border: 1px solid var(--nog-border) !important;
  border-radius: var(--nog-radius-pill);
  color: var(--nog-text-subtle);
  font-size: var(--nog-font-size-user-pill);
  font-weight: var(--nog-font-weight-semibold);
}

.app-user-pill--online {
  border-color: var(--nog-online-border) !important;
  background: var(--nog-accent-soft);
  color: var(--nog-accent);
}

.app-login-button {
  border: 1px solid var(--nog-accent) !important;
  border-radius: var(--nog-radius-pill) !important;
  background: var(--nog-accent) !important;
  padding: var(--nog-space-button-y) var(--nog-space-button-x) !important;
}

.app-login-button:hover {
  border-color: var(--nog-accent-strong) !important;
  background: var(--nog-accent-strong) !important;
}

.app-logout-button {
  border-radius: var(--nog-radius-pill) !important;
  color: var(--nog-accent) !important;
  padding: var(--nog-space-button-y) var(--nog-space-button-x) !important;
}

.app-content-surface {
  border: 1px solid var(--nog-border);
  border-radius: var(--nog-radius-surface);
  background: var(--nog-surface);
  padding: var(--nog-space-content-padding);
  box-shadow: var(--nog-shadow-surface);
}

.route-fade-enter-active,
.route-fade-leave-active {
  transition: opacity var(--nog-duration-fast) ease;
}

.route-fade-enter-from,
.route-fade-leave-to {
  opacity: 0;
}

:deep(.app-menubar-list) {
  gap: var(--nog-space-menubar-list-gap);
}

:deep(.app-menubar-end-slot) {
  width: auto;
}

:deep(.app-login-dialog) {
  width: min(92vw, 28rem);
}

:deep(.app-login-dialog-header) {
  padding: var(--nog-space-dialog-header-top) var(--nog-space-dialog-header-x)
    var(--nog-space-dialog-header-bottom);
}

:deep(.app-login-dialog-content) {
  padding: var(--nog-space-dialog-content-top) var(--nog-space-dialog-content-x)
    var(--nog-space-dialog-content-bottom);
}

@media (max-width: 760px) {
  .app-menubar-end-wrap {
    justify-content: space-between;
    width: 100%;
  }

  :deep(.app-menubar-end-slot) {
    width: 100%;
    margin-top: var(--nog-space-menubar-end-offset);
  }
}
</style>
