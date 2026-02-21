import { inject, provide } from 'vue'

const OPEN_LOGIN_MODAL_KEY = Symbol('open-login-modal')

export function provideLoginModalChannel(openLoginModal) {
  provide(OPEN_LOGIN_MODAL_KEY, openLoginModal)
}

export function useOpenLoginModal() {
  const openLoginModal = inject(OPEN_LOGIN_MODAL_KEY, null)

  function open() {
    if (typeof openLoginModal === 'function') {
      openLoginModal()
    }
  }

  return {
    openLoginModal: open,
  }
}
