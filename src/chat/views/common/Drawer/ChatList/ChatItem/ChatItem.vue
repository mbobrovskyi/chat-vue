<script lang="ts" setup>
import {formatDate} from "@/chat/domain/formatDate.ts";
import type {Chat} from "@/chat/domain/Chat.js";
import {MessageStatus} from "@/chat/domain/Message.js";
import {getChatName} from "@/chat/domain/Chat.js";
import {useAuthStore} from "@/common/domain/authStore.js";

import Image from "@/chat/views/common/Image/Image.vue";

defineProps<{
  chat: Chat;
  active?: boolean;
  clickable?: boolean;
}>();

const authStore = useAuthStore();

</script>

<template>
  <q-item
    class="chat-item"
    active-class="chat-item__active"
    :active="active"
    :clickable="clickable"
    v-ripple
  >
    <q-item-section avatar>
      <Image :url="chat.image.url" :letters="getChatName(chat)[0]" />
    </q-item-section>

    <q-item-section top>
      <q-item-label lines="1">
        <span class="chat-item__name">{{ getChatName(chat) }}</span>
        <span>&nbsp;</span>
        <span v-if="chat.lastMessage && authStore.user && chat.lastMessage.createdBy !== authStore.user.id">
          <q-icon name="check" v-if="chat.lastMessage?.status === MessageStatus.UNREAD" />
          <q-icon color="primary" name="done" v-if="chat.lastMessage?.status === MessageStatus.SENT" />
          <q-icon color="primary" name="done_all" v-if="chat.lastMessage?.status === MessageStatus.READ" />
        </span>
      </q-item-label>
      <q-item-label lines="1" caption>{{ chat.lastMessage?.text || 'No message' }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-item-label caption>
        <div v-if="chat.lastMessage">{{ formatDate(chat.lastMessage.createdAt) }}</div>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<style lang="scss" scoped>
.chat-item {
  max-width: 299px;
}
</style>
