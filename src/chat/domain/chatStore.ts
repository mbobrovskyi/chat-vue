import {ref} from "vue";
import {defineStore} from "pinia";
import { uid } from "quasar"
import {chatContext} from "../infrastructure/context.ts";
import type {Page} from "@/common/domain/Page.ts";
import type {Chat} from "./Chat.ts";
import type {Message} from "./Message.ts";
import {MessageStatus} from "./Message.ts";
import {ChatService} from "./ChatService.ts";
import {useNotifyStore} from "@/common/domain/notifyStore.ts";
import {useAuthStore} from "@/common/domain/authStore.ts";

const limit = 25;

export const useChatStore = defineStore("chat", () => {
  const chatService = chatContext.get<ChatService>("ChatService");

  const authStore = useAuthStore();
  const notifyStore = useNotifyStore();

  const isLoadingChat = ref<boolean>(false);
  const isLoadingMessages = ref<boolean>(false);
  const chat = ref<Chat | undefined>();
  const messages = ref<Page<Message>>({ items: [], count: 0 });

  async function getChat(id: number): Promise<void> {
    try {
      isLoadingChat.value = true;
      messages.value.items = [];
      messages.value.count = 0;
      chat.value = await chatService.getChat(id);
      isLoadingChat.value = false;
      chatService.setCurrentChat(chat.value.id);
    } catch(err: any) {
      notifyStore.axiosError(err);
    } finally {
      isLoadingChat.value = false;
    }
  }

  async function getMessages(): Promise<void> {
    try {
      if (!chat.value?.id) {
        return;
      }

      isLoadingMessages.value = true;
      const newMessages = await chatService.getChatMessages(chat.value?.id, {
        limit,
        offset: messages.value.items.length,
      });
      messages.value.items.unshift(...(newMessages.items.reverse()));
      messages.value.count = newMessages.count;
    } catch(err: any) {
      notifyStore.axiosError(err);
    } finally {
      isLoadingMessages.value = false;
    }
  }

  async function sendMessage(text: string): Promise<void> {
    const message: Message = {
      uuid: uid(),
      text: text,
      status: MessageStatus.DRAFT,
      chatId: chat.value.id,
      createdBy: authStore.user.id,
      creator: authStore.user,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    messages.value.items.push(message);
    chatService.createMessage(message);
  }

  async function editMessage(message: Message): Promise<void> {
    const index = messages.value.items.findIndex((message) => message.id);
    if (index === -1) {
      return;
    }

    message.status = MessageStatus.DRAFT;
    messages.value[index] = message;

    chatService.editMessage(message)
  }

  async function deleteMessage(messageId: number): Promise<void> {
    chatService.deleteMessage(messageId);
  }

  function clear() {
    chatService.unsetCurrentChat();
    isLoadingChat.value = false;
    isLoadingMessages.value = false;
    chat.value = undefined;
    messages.value.items = [];
    messages.value.count = 0;
  }

  return {
    chat,
    messages,
    isLoadingChat,
    getChat,
    getMessages,
    sendMessage,
    editMessage,
    deleteMessage,
    clear,
  };
});