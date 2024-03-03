<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from "vue";
import { debounce } from "quasar"
import {chatContext} from "@/chat/infrastructure/context.ts";
import type {ChatService} from "@/chat/domain/ChatService.ts";
import type {Message} from "@/chat/domain/Message.ts";
import {MessageStatus} from "@/chat/domain/Message.ts";
import {useChatStore} from "@/chat/domain/chatStore.ts";
import {useAuthStore} from "@/common/domain/authStore.js";
import {getUserFullName} from "@/common/domain/User.ts";
import {formatDate} from "@/chat/domain/formatDate.ts";
import AppMessage from "@/chat/views/SelectedChatPage/MessageList/AppMessage.vue";

const chatService = chatContext.get<ChatService>("ChatService");

const authStore = useAuthStore();
const chatStore = useChatStore();

let createMessageSubId = -1;
let updateMessagesStatusSubId = -1;

const chatMessagesRef = ref<HTMLDivElement>();
const pendingUnreadMessageIDs = new Map<number, boolean>();

const unreadMessages = computed<Map<number, number>>(() => {
  const map = new Map<number, number>();
  chatStore.messages.items.forEach((message, index) => {
    if (message.createdBy !== authStore.user.id && message.status === MessageStatus.UNREAD) {
      map.set(message.id, index);
    }
  });
  return map;
});

function onLoad(index: number, done: (done: boolean) => void) {
  console.log(`Loading ${index}...`);
  chatStore.getMessages().then(() => {
    done(chatStore.messages.count <= chatStore.messages.items.length);
  });
}

function onIntersection(entry: any): boolean {
  if (entry.isIntersecting === true) {
    const messageId = Number(entry.target.dataset.id);
    const index = unreadMessages.value.get(messageId);
    if (index === undefined) {
      return;
    }
    pendingUnreadMessageIDs.set(messageId, true);
    chatStore.messages.items[index].status = MessageStatus.READ;
    console.log('execute updateMessagesStatus');
    debouncedUpdateMessagesStatus();
  }
  return true;
}

const debouncedUpdateMessagesStatus = debounce(updateMessagesStatus, 500);

function updateMessagesStatus() {
  chatService.updateMessagesStatus(MessageStatus.READ, Array.from(pendingUnreadMessageIDs.keys()))
}

function onCreateMessage(newMessage: Message) {
  if (newMessage.chatId !== chatStore.chat.id) {
    return;
  }

  const index = chatStore.messages.items
    .findIndex((message: Message) => message.uuid === newMessage.uuid);

  if (index === -1) {
    chatStore.messages.items.push(newMessage);
  } else {
    chatStore.messages.items[index] = newMessage;
  }

  if (chatMessagesRef.value) {
    chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight;
  }
}

function onUpdateMessagesStatus(status: MessageStatus, messageIds: number[]) {
  chatStore.messages.items.forEach((message, index) => {
    if (!message.id) {
      return;
    }

    if (messageIds.includes(message.id)) {
      chatStore.messages.items[index].status = status;
    }
  });
}

onMounted(() => {
  createMessageSubId = chatService.subscribeCreateMessage(onCreateMessage);
  updateMessagesStatusSubId = chatService.subscribeUpdateMessagesStatus(onUpdateMessagesStatus);
});

onUnmounted(() => {
  chatService.unsubscribe(createMessageSubId);
  chatService.unsubscribe(updateMessagesStatusSubId);
})
</script>

<template>
  <div ref="chatMessagesRef" class="chat-messages">
    <q-infinite-scroll @load="onLoad" reverse :scroll-target="chatMessagesRef">
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner size="2em" />
        </div>
      </template>

      <div
        v-for="message in chatStore.messages.items"
        :key="message.uuid"
        v-intersection="onIntersection"
        :data-id="message.id"
      >
        <AppMessage :message="message" />
      </div>
    </q-infinite-scroll>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/abstracts/scrollbar";

.chat-messages {
  @include scrollbar;

  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  max-height: 100%;
  width: 100%;
  overflow: auto;
}
</style>