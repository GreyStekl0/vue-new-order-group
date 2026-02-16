<script>
import Menubar from 'primevue/menubar'
import PrimeDialog from 'primevue/dialog'
import PrimeButton from 'primevue/button'

import AuthLoginForm from '@/components/AuthLoginForm.vue'
import { useAuthStore } from '@/stores/authStore'

const MENUBAR_PT = Object.freeze({
  rootList: {
    class: 'gap-[0.4rem]',
  },
  end: {
    class: 'max-[760px]:mt-2 max-[760px]:w-full',
  },
})

const LOGIN_DIALOG_PT = Object.freeze({
  header: {
    class: 'px-[1.2rem] pt-4 pb-[0.35rem]',
  },
  content: {
    class: 'px-[1.2rem] pt-[0.6rem] pb-[1.2rem]',
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
      pendingRedirect: '',
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
  <div
    class="min-h-screen bg-[radial-gradient(100%_200%_at_100%_0%,var(--nog-bg-gradient-top)_0%,transparent_45%),linear-gradient(180deg,var(--nog-bg-gradient-bottom)_0%,var(--nog-bg)_100%)] p-[clamp(1rem,2vw,2rem)] text-(--nog-text)"
  >
    <header class="mx-auto max-w-[1240px]">
      <div class="mb-4">
        <p
          class="inline-flex items-center gap-[0.45rem] rounded-full bg-(--nog-accent) px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-(--nog-surface)"
        >
          <i class="pi pi-shield" />
          new order group
        </p>
      </div>

      <Menubar
        :model="menuItems"
        :pt="menubarPt"
        class="!rounded-[0.95rem] !border !border-(--nog-border) !bg-(--nog-surface) !px-[0.65rem] !py-[0.45rem] !shadow-[0_12px_26px_rgba(16,36,29,0.08)]"
      >
        <template #item="{ item }">
          <router-link v-if="item.route" v-slot="routerProps" :to="item.route" custom>
            <a
              :href="routerProps.href"
              :class="[
                'inline-flex items-center gap-[0.45rem] rounded-[0.65rem] px-3 py-[0.52rem] font-semibold text-(--nog-text) no-underline transition-all duration-200 hover:bg-(--nog-hover-surface) hover:text-(--nog-accent)',
                routerProps.isActive
                  ? '!bg-(--nog-accent) !text-(--nog-surface) hover:!bg-(--nog-accent-strong) hover:!text-(--nog-surface)'
                  : '',
              ]"
              @click="routerProps.navigate"
            >
              <i v-if="item.icon" :class="[item.icon, 'text-[0.9rem]']" />
              <span>{{ item.label }}</span>
            </a>
          </router-link>

          <a
            v-else
            :href="item.url"
            :target="item.target"
            class="inline-flex items-center gap-[0.45rem] rounded-[0.65rem] px-3 py-[0.52rem] font-semibold text-(--nog-text) no-underline transition-all duration-200 hover:bg-(--nog-hover-surface) hover:text-(--nog-accent)"
          >
            <i v-if="item.icon" :class="[item.icon, 'text-[0.9rem]']" />
            <span>{{ item.label }}</span>
          </a>
        </template>

        <template #end>
          <div class="inline-flex items-center gap-[0.55rem] max-[760px]:w-full max-[760px]:justify-between">
            <p
              class="m-0 inline-flex items-center gap-2 rounded-full border border-(--nog-border) px-3 py-[0.35rem] text-[0.78rem] font-semibold text-(--nog-text-subtle)"
              :class="
                isAuthenticated
                  ? 'border-(--nog-online-border) bg-(--nog-accent-soft) text-(--nog-accent)'
                  : ''
              "
            >
              <i :class="isAuthenticated ? 'pi pi-user' : 'pi pi-user-minus'" />
              <span>{{ isAuthenticated ? accountTitle : 'Гость' }}</span>
            </p>

            <PrimeButton
              v-if="!isAuthenticated"
              label="Войти"
              icon="pi pi-sign-in"
              size="small"
              class="!rounded-full !border !border-(--nog-accent) !bg-(--nog-accent) !px-[0.8rem] !py-[0.42rem] hover:!border-(--nog-accent-strong) hover:!bg-(--nog-accent-strong)"
              @click="openLoginModal"
            />

            <PrimeButton
              v-else
              label="Выйти"
              icon="pi pi-sign-out"
              text
              size="small"
              class="!rounded-full !px-[0.8rem] !py-[0.42rem] !text-(--nog-accent)"
              @click="logout"
            />
          </div>
        </template>
      </Menubar>
    </header>

    <main class="mx-auto mt-4 max-w-[1240px]">
      <section
        class="min-h-[500px] rounded-2xl border border-(--nog-border) bg-(--nog-surface) p-[clamp(1rem,2vw,1.75rem)] shadow-[0_18px_34px_rgba(16,36,29,0.08)]"
      >
        <router-view v-slot="{ Component }">
          <transition
            mode="out-in"
            enter-active-class="transition-opacity duration-200 ease-[ease]"
            leave-active-class="transition-opacity duration-200 ease-[ease]"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
          >
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
      :pt="loginDialogPt"
      @hide="onLoginModalHide"
    >
      <AuthLoginForm @success="onLoginSuccess" />
    </PrimeDialog>
  </div>
</template>
