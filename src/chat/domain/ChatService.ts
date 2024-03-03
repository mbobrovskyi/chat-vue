import {chatContext} from "../infrastructure/context.ts";

import type {ChatRepo} from "./ChatRepo.ts";
import type {ChatWebSocketRepo} from "@/chat/domain/ChatWebSocketRepo.ts";
import type {Page} from "@/common/domain/Page.ts";
import type {Chat} from "./Chat.ts";
import type {Message} from "./Message.ts";
import type {MessageFilter} from "./MessageFilter.ts";
import type {ChatFilter} from "./ChatFilter.ts";
import type {
  ReconnectSubscriptionFunc,
  CreateMessageSubscriptionFunc,
} from "@/chat/domain/subscriptionFunctions.ts";
import {MessageStatus} from "./Message.ts";
import {UpdateMessagesStatusSubscriptionFunc} from "@/chat/domain/subscriptionFunctions.ts";

export class ChatService {
  private chatRepo: ChatRepo;
  private chatWebSocketRepo: ChatWebSocketRepo;


  constructor() {
    this.chatRepo = chatContext.get<ChatRepo>("ChatRepo");
    this.chatWebSocketRepo = chatContext.get<ChatWebSocketRepo>("ChatWebSocketRepo");
  }

  async getChats(filter?: ChatFilter): Promise<Page<Chat>> {
    return await this.chatRepo.getChats(filter);
  }

  async getChat(id: number): Promise<Chat> {
    return await this.chatRepo.getChat(id);
  }

  async getChatMessages(chatId: number, filter?: MessageFilter): Promise<Page<Message>> {
    return await this.chatRepo.getChatMessages(chatId, filter);
  }

  connect(): void {
    this.chatWebSocketRepo.connect();
  }

  disconnect(): void {
    this.chatWebSocketRepo.disconnect();
  }

  unsubscribe(id: number): void {
    this.chatWebSocketRepo.unsubscribe(id);
  }

  subscribeChats(chatIds: number[]): void {
    this.chatWebSocketRepo.subscribeChats(chatIds);
  }

  unsubscribeChats(): void {
    this.chatWebSocketRepo.unsubscribeChats();
  }

  setCurrentChat(chatId: number): void {
    this.chatWebSocketRepo.setCurrentChat(chatId);
  }

  unsetCurrentChat(): void {
    this.chatWebSocketRepo.unsetCurrentChat();
  }

  createMessage(message: Message): void {
    this.chatWebSocketRepo.createMessage(message);
  }

  editMessage(message: Message): void {
    this.chatWebSocketRepo.editMessage(message);
  }

  deleteMessage(messageId: number): void {
    this.chatWebSocketRepo.deleteMessage(messageId);
  }

  updateMessagesStatus(status: MessageStatus, messageIds: number[]): void {
    this.chatWebSocketRepo.updateMessagesStatus(status, messageIds)
  }



  subscribeReconnect(func: ReconnectSubscriptionFunc): number {
    return this.chatWebSocketRepo.subscribeReconnect(func);
  }

  subscribeCreateMessage(func: CreateMessageSubscriptionFunc): number {
    return this.chatWebSocketRepo.subscribeCreateMessage(func);
  }

  subscribeUpdateMessagesStatus(func: UpdateMessagesStatusSubscriptionFunc): number {
    return this.chatWebSocketRepo.subscribeUpdateMessagesStatus(func);
  }
}