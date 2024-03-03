import type {ReconnectSubscriptionFunc} from "@/infrastructure/websocket/WebSocketConnectorImpl.ts";
import type {Message} from "@/chat/domain/Message.ts";
import {MessageStatus} from "@/chat/domain/Message.ts";

export type { ReconnectSubscriptionFunc };

export type CreateMessageSubscriptionFunc = (message: Message) => void;
export type UpdateMessagesStatusSubscriptionFunc = (status: MessageStatus, messageIds: number[]) => void;