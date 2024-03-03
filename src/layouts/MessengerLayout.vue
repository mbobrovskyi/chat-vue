<script lang="ts" setup>
defineProps<{
  isDrawerOpen: boolean;
}>();
</script>

<template>
  <q-layout view="lHh Lpr lFf" class="messenger-layout shadow-3" container>
    <q-header elevated>
      <slot name="header" />
    </q-header>

    <q-drawer
      class="messenger-layout__drawer"
      :model-value="isDrawerOpen"
      show-if-above
      bordered
      :width="300"
      :breakpoint="690"
      @update:model-value="(val) => $emit('update:is-drawer-open', val)"
    >
      <slot name="drawer" />
    </q-drawer>

    <q-page-container class="messenger-layout__page-container">
      <slot />
    </q-page-container>

    <q-footer>
      <slot name="footer" />
    </q-footer>
  </q-layout>
</template>

<style lang="scss" scoped>
.messenger-layout {
  border-radius: 3px;
  overflow: hidden;
  height: 100vh;
  max-height: calc(100vh - 50px);
  width: calc(100% - 50px);
  max-width: 950px;
  z-index: 4000;

  &__page-container {
    background-color: #f5f5f5;
  }
}

@media (max-width: 850px) {
  .messenger-layout {
    max-height: 100vh;
    width: 100%;
    border: 0;
  }
}
</style>
