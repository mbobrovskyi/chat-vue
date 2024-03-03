<script lang="ts" setup>
import { QSpinner } from "quasar";

defineProps<{
  size?: QSpinner["size"];
}>();
</script>

<template>
  <q-spinner :size="size" class="spinner" />
</template>

<style lang="scss" scoped>
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
