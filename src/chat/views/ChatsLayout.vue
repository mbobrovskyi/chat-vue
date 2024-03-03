<script setup lang="ts">
import {onMounted, onUnmounted} from 'vue';
import {chatContext} from "@/chat/infrastructure/context.ts";
import {ChatService} from "@/chat/domain/ChatService.ts";
import {useChatsStore} from "@/chat/domain/chatsStore.ts";

const chatService = chatContext.get<ChatService>("ChatService");

const chatsStore = useChatsStore();

onMounted(async () => {
  chatService.connect();
  chatsStore.subscribeCreateMessage();
  chatsStore.subscribeUpdateMessagesStatus();
  await chatsStore.getChats();
});

onUnmounted(() => {
  chatsStore.clear();
  chatService.disconnect();
});
</script>

<template>
  <router-view />
</template>

<style lang="scss" scoped>
</style>