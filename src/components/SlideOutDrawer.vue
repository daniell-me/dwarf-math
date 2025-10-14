<template>
  <div class="drawer-content" :class="{ 'is-open': isOpen }">
    <div class="drawer-header">
      <h2>{{ title }}</h2>
      <button @click="$emit('close')" class="close-button">×</button>
    </div>
    <div class="drawer-body">
      <slot></slot>
    </div>
  </div>
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
.drawer-content {
  background: var(--color-background-soft);
  width: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 2px solid var(--color-border);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: width 0.3s ease;
  flex-shrink: 0;
}

.drawer-content.is-open {
  width: 280px;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-background-soft);
  min-width: 280px;
}

.drawer-header h2 {
  margin: 0;
  font-size: 1.1rem;
  white-space: nowrap;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.75rem;
  line-height: 1;
  cursor: pointer;
  color: var(--color-text);
  padding: 0;
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.close-button:hover {
  color: var(--color-heading);
}

.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 0.75rem 1rem;
  min-width: 280px;
}
</style>
