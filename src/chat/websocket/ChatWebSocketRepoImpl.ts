import {WebSocketConnectorImpl} from "@/infrastructure/websocket/WebSocketConnectorImpl.ts";
import {ChatWebSocketRepo} from "@/chat/domain/ChatWebSocketRepo.ts";
import {EventType} from "@/chat/websocket/EventType.ts";
import type {Message} from "@/chat/domain/Message.ts";
import type {
  CreateMessageSubscriptionFunc,
  UpdateMessagesStatusSubscriptionFunc
} from "@/chat/domain/subscriptionFunctions.ts";
import {
  messageFromDto,
  messageToCreateDto,
  messageToUpdateDto,
} from "@/chat/websocket/messageMappers.ts";
import {MessageStatus} from "@/chat/domain/Message.ts";

export const WS_URL = import.meta.env.VITE_WS_URL;

export class ChatWebSocketRepoImpl extends WebSocketConnectorImpl implements ChatWebSocketRepo {
  constructor() {
    super();
    this.init(WS_URL);
  }

  subscribeChats(chatIds: number[]): void {
    this.sendMessage(EventType.SubscribeChats, chatIds);
  }

  unsubscribeChats(): void {
    this.sendMessage(EventType.UnsubscribeChats);
  }

  setCurrentChat(chatId: number): void {
    this.sendMessage(EventType.SetCurrentChat, chatId);
  }

  unsetCurrentChat(): void {
    this.sendMessage(EventType.UnsetCurrentChat);
  }

  createMessage(message: Message): void {
    this.sendMessage(EventType.CreateMessage, messageToCreateDto(message));
  }

  editMessage(message: Message): void {
    this.sendMessage(EventType.EditMessage, messageToUpdateDto(message));
  }

  deleteMessage(messageId: number): void {
    this.sendMessage(EventType.DeleteMessage, messageId);
  }

  updateMessagesStatus(status: MessageStatus, messageIds: number[]): void {
    this.sendMessage(EventType.SentMessages, { status, messageIds });
  }



  subscribeCreateMessage(func: CreateMessageSubscriptionFunc): number {
    return this.subscribe(EventType.CreateMessage, (data?: any) => {
      func(messageFromDto(data));
    });
  }

  subscribeUpdateMessagesStatus(func: UpdateMessagesStatusSubscriptionFunc): number {
    return this.subscribe(EventType.SentMessages, (data?: any) => {
      func(data.status as MessageStatus, data.messageIds as number[]);
    });
  }

}