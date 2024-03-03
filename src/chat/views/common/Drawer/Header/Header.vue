<script lang="ts" setup>
import {useAuthStore} from "@/common/domain/authStore.ts";

import AppLogo from "@/ui-kit/AppLogo/AppLogo.vue";

const authStore = useAuthStore();
</script>

<template>
  <q-toolbar class="drawer-header">
    <AppLogo />
    <q-space />
    <q-btn round flat icon="message" />
    <q-btn round flat icon="more_vert">
      <q-menu auto-close :offset="[110, 8]">
        <q-list style="min-width: 150px">
          <q-item clickable>
            <q-item-section>New group</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>Profile</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>Archived</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>Favorites</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>Settings</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section @click="authStore.signOut">Sign Out</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <q-btn
      round
      flat
      icon="close"
      class="drawer-header__drawer-close"
      @click="$emit('closeDrawer')"
    />
  </q-toolbar>
</template>

<style lang="scss" scoped>
.drawer-header {
  background-color: #eeeeee;
}

@media (min-width: 691px) {
  .drawer-header {
    &__drawer-close {
      display: none;
    }
  }
}
</style>
