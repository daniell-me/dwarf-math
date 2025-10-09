<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import MetaUpgradesPanel from './components/MetaUpgradesPanel.vue'

const showMetaUpgrades = ref(false)
</script>

<template>
  <div class="app-container">
    <button @click="showMetaUpgrades = true" class="meta-upgrades-button">
      Meta Upgrades
    </button>
    <RouterView />
    <MetaUpgradesPanel v-if="showMetaUpgrades" @close="showMetaUpgrades = false" />
  </div>
</template>

<style>
/* Color palette */
:root {
  --vt-c-white: #ffffff;
  --vt-c-white-soft: #f8f8f8;
  --vt-c-white-mute: #f2f2f2;

  --vt-c-black: #181818;
  --vt-c-black-soft: #222222;
  --vt-c-black-mute: #282828;

  --vt-c-indigo: #2c3e50;

  /* Rarity colors */
  --rarity-common: #cccccc;
  --rarity-uncommon: #76cd00;
  --rarity-rare: #29d9dc;
  --rarity-epic: #b360d4;
  --rarity-legendary: #ff5600;

  --vt-c-divider-light-1: rgba(60, 60, 60, 0.29);
  --vt-c-divider-light-2: rgba(60, 60, 60, 0.12);
  --vt-c-divider-dark-1: rgba(84, 84, 84, 0.65);
  --vt-c-divider-dark-2: rgba(84, 84, 84, 0.48);

  --vt-c-text-light-1: var(--vt-c-indigo);
  --vt-c-text-light-2: rgba(60, 60, 60, 0.66);
  --vt-c-text-dark-1: var(--vt-c-white);
  --vt-c-text-dark-2: rgba(235, 235, 235, 0.64);
}

/* Semantic color variables for this project */
:root {
  --color-background: var(--vt-c-white);
  --color-background-soft: var(--vt-c-white-soft);
  --color-background-mute: var(--vt-c-white-mute);

  --color-border: var(--vt-c-divider-light-2);
  --color-border-hover: var(--vt-c-divider-light-1);

  --color-heading: var(--vt-c-text-light-1);
  --color-text: var(--vt-c-text-light-1);
  --color-text-muted: var(--vt-c-text-light-2);

  --section-gap: 160px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--vt-c-black);
    --color-background-soft: var(--vt-c-black-soft);
    --color-background-mute: var(--vt-c-black-mute);

    --color-border: var(--vt-c-divider-dark-2);
    --color-border-hover: var(--vt-c-divider-dark-1);

    --color-heading: var(--vt-c-text-dark-1);
    --color-text: var(--vt-c-text-dark-2);
    --color-text-muted: var(--vt-c-text-dark-2);
  }
}

/* Base styles */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  font-weight: normal;
}

body {
  min-height: 100vh;
  color: var(--color-text);
  background: var(--color-background);
  transition:
    color 0.5s,
    background-color 0.5s;
  line-height: 1.6;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* App container styles */
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  padding: 3px;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  #app {
    padding: 0 2rem;
  }
}

/* App container */
.app-container {
  position: relative;
}

/* Meta Upgrades Button */
.meta-upgrades-button {
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 0.75rem 1.5rem;
  background: var(--color-background-soft);
  border: 2px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  color: var(--color-text);
  z-index: 100;
  transition: all 0.2s;
}

.meta-upgrades-button:hover {
  background: var(--color-background-mute);
  border-color: var(--color-border-hover);
  transform: translateY(-2px);
}

.vt-c-green {
  color: hsla(160, 100%, 37%, 1);
}
</style>
