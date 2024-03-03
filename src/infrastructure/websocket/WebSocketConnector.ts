import type {
  SubscriptionFunc,
  ReconnectSubscriptionFunc,
} from "@/infrastructure/websocket/WebSocketConnectorImpl.ts";

export interface WebSocketConnector {
  connect(): void;
  disconnect(): void;

  sendMessage(type: number, data?: any): void;

  subscribeReconnect(func: ReconnectSubscriptionFunc): number;

  subscribe(eventType: number, func: SubscriptionFunc): number;
  unsubscribe(id: number): void;
}