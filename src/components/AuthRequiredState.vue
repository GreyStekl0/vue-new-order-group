<script setup>
import { useOpenLoginModal } from '@/composables/useLoginModalChannel'

defineOptions({
  name: 'AuthRequiredState',
})

const { openLoginModal } = useOpenLoginModal()
</script>

<template>
  <section class="auth-required-state">
    <div class="auth-required-state__body">
      <div class="auth-required-state__icon-stack">
        <span class="auth-required-state__pulse" />
        <span class="auth-required-state__ring" />
        <i class="pi pi-lock auth-required-state__icon" />
      </div>

      <h3 class="auth-required-state__title">Доступ ограничен</h3>
      <p class="auth-required-state__description">
        Для просмотра регионов войдите в аккаунт с правами доступа.
      </p>

      <button type="button" class="auth-required-state__login-button" @click="openLoginModal">
        Войти в аккаунт
      </button>
    </div>

    <footer class="auth-required-state__footer">
      <span class="auth-required-state__meta">
        Auth:
        <strong class="auth-required-state__meta-strong">Required</strong>
      </span>
      <span class="auth-required-state__meta">
        Access:
        <strong class="auth-required-state__meta-strong">Restricted</strong>
      </span>
    </footer>
  </section>
</template>

<style scoped>
.auth-required-state {
  width: 100%;
  border: 1px solid var(--nog-border);
  border-radius: var(--nog-radius-surface);
  background: var(--nog-surface);
  box-shadow: var(--nog-shadow-card-soft);
}

.auth-required-state__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--nog-space-empty-body-y) var(--nog-space-empty-body-x);
}

.auth-required-state__icon-stack {
  position: relative;
  width: var(--nog-size-empty-icon-stack);
  height: var(--nog-size-empty-icon-stack);
  margin-bottom: var(--nog-space-empty-icon-offset);
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-required-state__pulse,
.auth-required-state__ring {
  position: absolute;
  border-radius: 50%;
}

.auth-required-state__pulse {
  width: var(--nog-size-empty-pulse);
  height: var(--nog-size-empty-pulse);
  background: var(--nog-accent);
  opacity: 0.2;
  animation: auth-required-state-ping var(--nog-duration-ping) cubic-bezier(0, 0, 0.2, 1) infinite;
}

.auth-required-state__ring {
  width: var(--nog-size-empty-ring);
  height: var(--nog-size-empty-ring);
  border: 1px solid var(--nog-border);
  background: var(--nog-surface-soft);
}

.auth-required-state__icon {
  position: relative;
  z-index: 1;
  color: var(--nog-accent);
  font-size: var(--nog-font-size-empty-icon) !important;
  line-height: 1;
}

.auth-required-state__title {
  margin: 0;
  color: var(--nog-text-strong);
  font-size: var(--nog-font-size-empty-title);
  font-weight: var(--nog-font-weight-bold);
  letter-spacing: var(--nog-letter-spacing-normal);
}

.auth-required-state__description {
  max-width: var(--nog-size-empty-description-max-width);
  margin: var(--nog-space-empty-description-offset) 0 0;
  color: var(--nog-text-copy);
  font-size: var(--nog-font-size-empty-description);
  line-height: var(--nog-line-height-relaxed);
}

.auth-required-state__login-button {
  margin-top: var(--nog-space-home-lead-offset);
  border: 1px solid var(--nog-accent);
  border-radius: var(--nog-radius-pill);
  background: var(--nog-accent);
  color: var(--nog-surface);
  padding: var(--nog-space-button-y) var(--nog-space-button-x);
  font-size: var(--nog-font-size-button);
  font-weight: var(--nog-font-weight-semibold);
  cursor: pointer;
  transition:
    background-color var(--nog-duration-fast) ease,
    border-color var(--nog-duration-fast) ease;
}

.auth-required-state__login-button:hover {
  border-color: var(--nog-accent-strong);
  background: var(--nog-accent-strong);
}

.auth-required-state__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--nog-space-empty-footer-row-gap) var(--nog-space-empty-footer-column-gap);
  border-top: 1px solid var(--nog-border);
  border-bottom-left-radius: var(--nog-radius-surface);
  border-bottom-right-radius: var(--nog-radius-surface);
  background: var(--nog-accent-strong);
  color: var(--nog-surface);
  padding: var(--nog-space-empty-footer-y) var(--nog-space-empty-footer-x);
  font-size: var(--nog-font-size-empty-footer);
  font-weight: var(--nog-font-weight-medium);
  text-transform: uppercase;
  letter-spacing: var(--nog-letter-spacing-wide);
}

.auth-required-state__meta {
  font-family: var(--nog-font-family-mono), monospace;
}

.auth-required-state__meta-strong {
  color: var(--nog-color-success);
  font-weight: var(--nog-font-weight-semibold);
}

@keyframes auth-required-state-ping {
  75%,
  100% {
    transform: scale(1.9);
    opacity: 0;
  }
}

@media (max-width: 640px) {
  .auth-required-state__body {
    padding-inline: var(--nog-space-empty-body-x-sm);
  }

  .auth-required-state__title {
    font-size: var(--nog-font-size-empty-title-sm);
  }

  .auth-required-state__description {
    font-size: var(--nog-font-size-empty-description-sm);
  }

  .auth-required-state__footer {
    font-size: var(--nog-font-size-empty-footer-sm);
  }
}
</style>
