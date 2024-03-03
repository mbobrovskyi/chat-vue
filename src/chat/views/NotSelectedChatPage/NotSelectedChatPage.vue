<script setup lang="ts">
import {ref} from 'vue';

import MessengerLayout from "@/layouts/MessengerLayout.vue";
import AppHeader from "@/ui-kit/AppHeader/AppHeader.vue"
import Drawer from "../common/Drawer/Drawer.vue";

const isDrawerOpen = ref(false);
</script>

<template>
  <MessengerLayout v-model:is-drawer-open="isDrawerOpen">
    <template #header>
      <AppHeader class="not-selected-chat-page__header" @openDrawer="isDrawerOpen = true" />
    </template>

    <template #drawer>
      <Drawer @closeDrawer="isDrawerOpen = false" />
    </template>

    <q-page class="not-selected-chat-page">
      <div class="not-selected-chat-page__message">Select a chat to start messaging</div>
    </q-page>
  </MessengerLayout>
</template>

<style lang="scss" scoped>
.not-selected-chat-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  &__message {
    border-radius: 50px;
    background-color: #eeeeee;
    padding: 5px 14px;
  }
}

@media (min-width: 691px) {
  .not-selected-chat-page {
    &__header {
      display: none;
    }
  }
}
</style>