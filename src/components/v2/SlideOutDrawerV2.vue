<template>
  <Transition name="drawer">
    <div v-if="isOpen" class="drawer-overlay" @click.self="$emit('close')">
      <div class="drawer-content">
        <div class="drawer-header">
          <h2>{{ title }}</h2>
          <button @click="$emit('close')" class="close-button">×</button>
        </div>
        <div class="drawer-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean
  title: string
}

defineProps<Props>()

defineEmits<{
  close: []
}>()
</script>

<style scoped>
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
}

.drawer-content {
  background: var(--color-background-soft);
  width: 400px;
  max-width: 90vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 2px solid var(--color-border);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-background-soft);
}

.drawer-header h2 {
  margin: 0;
  font-size: 1.2rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  color: var(--color-text);
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  color: var(--color-heading);
}

.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.5rem;
}

/* Slide animation */
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-enter-active .drawer-content,
.drawer-leave-active .drawer-content {
  transition: transform 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .drawer-content {
  transform: translateX(-100%);
}

.drawer-leave-to .drawer-content {
  transform: translateX(-100%);
}
</style>
