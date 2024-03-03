import type {WebSocketConnector} from "@/infrastructure/websocket/WebSocketConnector.ts";
import type {Message} from "@/chat/domain/Message.ts";
import type {
  CreateMessageSubscriptionFunc,
  UpdateMessagesStatusSubscriptionFunc,
} from "@/chat/domain/subscriptionFunctions.ts";
import {MessageStatus} from "@/chat/domain/Message.ts";

export interface ChatWebSocketRepo extends WebSocketConnector {
  subscribeChats(chatIds: number[]): void;
  unsubscribeChats(): void;
  setCurrentChat(chatId: number): void;
  unsetCurrentChat(): void;
  createMessage(message: Message): void;
  editMessage(message: Message): void;
  deleteMessage(messageId: number): void;
  updateMessagesStatus(status: MessageStatus, messageIds: number[]): void;

  subscribeCreateMessage(func: CreateMessageSubscriptionFunc): number;
  subscribeUpdateMessagesStatus(func: UpdateMessagesStatusSubscriptionFunc): number;
}