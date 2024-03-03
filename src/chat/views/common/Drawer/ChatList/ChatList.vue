<script lang="ts" setup>
import {useRouter} from "vue-router";
import {useChatsStore} from "@/chat/domain/chatsStore.ts";
import {useChatStore} from "@/chat/domain/chatStore.ts";

import ChatItem from "./ChatItem/ChatItem.vue";

const router = useRouter();
const chatStore = useChatStore();
const chatsStore = useChatsStore();

function selectChat(id: number) {
  router.push({name: "chat", params: {id}});
  chatStore.getChat(id);
}
</script>

<template>
  <div class="chat-list">
    <q-list>
      <ChatItem
        v-for="chat in chatsStore.chats.items"
        :key="chat.id"
        clickable
        :chat="chat"
        :active="chatStore.chat?.id === chat.id"
        @click="selectChat(chat.id)"
      />
    </q-list>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/abstracts/scrollbar";

.chat-list {
  @include scrollbar;

  background-color: #FFFFFF;
  display: flex;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
