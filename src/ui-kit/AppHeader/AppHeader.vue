<script setup lang="ts">
</script>

<template>
  <q-toolbar class="app-header">
    <q-btn
      round
      flat
      icon="keyboard_arrow_left"
      class="app-header__drawer-open"
      @click="$emit('openDrawer')"
    />
    <slot></slot>
  </q-toolbar>
</template>

<style lang="scss" scoped>
.app-header {
  background-color: #eeeeee;
  color: #000000;
}

@media (min-width: 691px) {
  .app-header {
    &__drawer-open {
      display: none;
    }
  }
}
</style>