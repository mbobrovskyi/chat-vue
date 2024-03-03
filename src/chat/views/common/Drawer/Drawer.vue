<script setup lang="ts">
import Header from "./Header/Header.vue";
import Search from "./Search/Search.vue";
import ChatList from "./ChatList/ChatList.vue";
</script>

<template>
  <div class="drawer">
    <Header class="drawer__header" @closeDrawer="$emit('closeDrawer')" />
    <Search class="drawer__search" />
    <ChatList class="drawer__chat-list" />
  </div>
</template>

<style lang="scss">
.drawer {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>