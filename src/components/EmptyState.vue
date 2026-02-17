<script>
export default {
  name: 'EmptyState',
  props: {
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
  },
}
</script>

<template>
  <section class="empty-state">
    <div class="empty-state__body">
      <div class="empty-state__icon-stack">
        <span class="empty-state__pulse" />
        <span class="empty-state__ring" />
        <i :class="[icon, 'empty-state__icon']" />
      </div>

      <h3 class="empty-state__title">
        {{ title }}
      </h3>

      <p v-if="description" class="empty-state__description">
        {{ description }}
      </p>
    </div>

    <footer class="empty-state__footer">
      <span class="empty-state__meta">
        Connection:
        <strong class="empty-state__meta-strong empty-state__meta-strong--success">Secure</strong>
      </span>
      <span class="empty-state__meta">
        Protocol:
        <strong class="empty-state__meta-strong empty-state__meta-strong--surface">Silent</strong>
      </span>
      <span class="empty-state__meta">
        Status:
        <strong class="empty-state__meta-strong empty-state__meta-strong--success">Standby</strong>
      </span>
    </footer>
  </section>
</template>

<style scoped>
.empty-state {
  width: 100%;
  border: 1px solid var(--nog-border);
  border-radius: var(--nog-radius-surface);
  background: var(--nog-surface);
  box-shadow: var(--nog-shadow-card-soft);
}

.empty-state__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--nog-space-empty-body-y) var(--nog-space-empty-body-x);
}

.empty-state__icon-stack {
  position: relative;
  width: var(--nog-size-empty-icon-stack);
  height: var(--nog-size-empty-icon-stack);
  margin-bottom: var(--nog-space-empty-icon-offset);
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state__pulse,
.empty-state__ring {
  position: absolute;
  border-radius: 50%;
}

.empty-state__pulse {
  width: var(--nog-size-empty-pulse);
  height: var(--nog-size-empty-pulse);
  background: var(--nog-accent);
  opacity: 0.2;
  animation: empty-state-ping var(--nog-duration-ping) cubic-bezier(0, 0, 0.2, 1) infinite;
}

.empty-state__ring {
  width: var(--nog-size-empty-ring);
  height: var(--nog-size-empty-ring);
  border: 1px solid var(--nog-border);
  background: var(--nog-surface-soft);
}

.empty-state__icon {
  position: relative;
  z-index: 1;
  color: var(--nog-accent);
  font-size: var(--nog-font-size-empty-icon) !important;
  line-height: 1;
}

.empty-state__title {
  margin: 0;
  color: var(--nog-text-strong);
  font-size: var(--nog-font-size-empty-title);
  font-weight: var(--nog-font-weight-bold);
  letter-spacing: var(--nog-letter-spacing-normal);
}

.empty-state__description {
  max-width: var(--nog-size-empty-description-max-width);
  margin: var(--nog-space-empty-description-offset) 0 0;
  color: var(--nog-text-copy);
  font-size: var(--nog-font-size-empty-description);
  line-height: var(--nog-line-height-relaxed);
}

.empty-state__footer {
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

.empty-state__meta {
  font-family: var(--nog-font-family-mono), monospace;
}

.empty-state__meta-strong {
  font-weight: var(--nog-font-weight-semibold);
}

.empty-state__meta-strong--success {
  color: var(--nog-color-success);
}

.empty-state__meta-strong--surface {
  color: var(--nog-surface);
}

@keyframes empty-state-ping {
  75%,
  100% {
    transform: scale(1.9);
    opacity: 0;
  }
}

@media (max-width: 640px) {
  .empty-state__body {
    padding-inline: var(--nog-space-empty-body-x-sm);
  }

  .empty-state__title {
    font-size: var(--nog-font-size-empty-title-sm);
  }

  .empty-state__description {
    font-size: var(--nog-font-size-empty-description-sm);
  }

  .empty-state__footer {
    font-size: var(--nog-font-size-empty-footer-sm);
  }
}
</style>
