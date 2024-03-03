<script setup lang="ts">
import {useAuthStore} from "@/common/domain/authStore.js";
import AppSpinner from "@/ui-kit/AppSpinner/AppSpinner.vue";
import {onUnmounted} from "vue";

const authStore = useAuthStore();

onUnmounted(() => {
  authStore.resetStore();
});
</script>

<template>
  <div class="main-layout">
    <AppSpinner v-if="authStore.isFirstLoading" size="5em" />
    <router-view v-else-if="authStore.user" />
  </div>
</template>

<style lang="scss">
.main-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}
</style>