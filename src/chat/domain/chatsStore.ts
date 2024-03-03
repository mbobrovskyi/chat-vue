import {ref} from "vue";
import {defineStore} from "pinia";
import {chatContext} from "../infrastructure/context.ts";
import {useNotifyStore} from "@/common/domain/notifyStore.ts";
import type {ChatService} from "./ChatService.ts";
import type {Page} from "@/common/domain/Page.ts";
import type {Chat} from "./Chat.ts";
import {Message, MessageStatus} from "@/chat/domain/Message.ts";


export const useChatsStore = defineStore("chats", () => {
  const chatService = chatContext.get<ChatService>("ChatService");

  let createMessageSubId = -1;
  let updateMessagesStatusSubId = -1;

  const notifyStore = useNotifyStore();

  const isLoading = ref<boolean>(false);
  const search = ref('');
  const chats = ref<Page<Chat>>({items: [], count: 0});

  function subscribeCreateMessage(): void {
    createMessageSubId = chatService.subscribeCreateMessage(onCreateMessage);
  }

  async function onCreateMessage(newMessage: Message): Promise<void> {
    const index = chats.value.items.findIndex((chat) => chat.id === newMessage.chatId);
    if (index === -1 && !isLoading.value) {
      await getChats();
    }
    chats.value.items[index].lastMessage = newMessage;
    sortChats();
  }

  function subscribeUpdateMessagesStatus(): void {
    updateMessagesStatusSubId = chatService.subscribeUpdateMessagesStatus(onUpdateMessagesStatus);
  }

  async function onUpdateMessagesStatus(status: MessageStatus, messageIds: number[]): Promise<void> {
    chats.value.items.forEach((chat) => {
      if (!chat.lastMessage) {
        return;
      }

      if (messageIds.includes(chat.lastMessage.id)) {
        chat.lastMessage.status = status;
      }
    });
  }

  async function getChats(): Promise<void> {
    try {
      isLoading.value = true;
      chats.value = await chatService.getChats({
        search: search.value,
      });
      const chatIds = chats.value.items.map((chat) => chat.id);
      chatService.subscribeChats(chatIds);
    } catch (err: any) {
      notifyStore.axiosError(err);
    } finally {
      isLoading.value = false;
    }
  }

  function sortChats(): void {
    chats.value.items = chats.value.items.sort((a, b) => {
      const createdAtA = a.lastMessage?.createdAt || '';
      const createdAtB = b.lastMessage?.createdAt || '';

      if (createdAtA > createdAtB) {
        return -1;
      } else if (createdAtA > createdAtB) {
        if (a.updatedAt > b.updatedAt) {
          return -1
        } else if (a.updatedAt === b.updatedAt) {
          return 0;
        }
      }

      return 1;
    });
  }

  function clear(): void {
    chatService.unsubscribe(createMessageSubId);
    chatService.unsubscribe(updateMessagesStatusSubId);
    chatService.unsubscribeChats();
    isLoading.value = false;
    search.value = "";
    chats.value.items = [];
    chats.value.count = 0;
  }

  return {
    isLoading,
    search,
    chats,
    subscribeCreateMessage,
    subscribeUpdateMessagesStatus,
    getChats,
    clear,
  }
});