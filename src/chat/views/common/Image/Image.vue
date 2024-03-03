<script lang="ts" setup>
defineProps<{
  url?: string;
  letters?: string;
}>();
</script>

<template>
  <q-avatar class="chat-image">
    <img v-if="url" :src="url">
    <span v-else>{{ letters }}</span>
  </q-avatar>
</template>

<style lang="scss" scoped>
.chat-image {
  background-color: #009688;
  color: #FFFFFF;
}
</style>
