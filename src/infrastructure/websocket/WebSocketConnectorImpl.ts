import ReconnectingWebSocket from "reconnecting-websocket";
import {TOKEN_LOCAL_STORAGE_KEY} from "@/infrastructure/constants/localStorage.ts";
import type {Token} from "@/common/domain/Token.ts";

type Event = { type: number; data?: any };

export type ReconnectSubscriptionFunc = () => void;
export type SubscriptionFunc = (data?: any) => void;

export class WebSocketConnectorImpl {
  protected lastSubscriptionId: number = 0;

  protected reconnectSubscriptions: { [key: string]: ReconnectSubscriptionFunc } = {};
  protected eventTypeSubscriptions: { [key: string]: { [key: string]: SubscriptionFunc } } = {};

  protected rws?: ReconnectingWebSocket;
  protected wsURL?: string;

  protected init(wsURL: string): void {
    this.wsURL = wsURL;
  }

  public connect(): void {
    const tokenJSON = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
    const token = tokenJSON ? JSON.parse(tokenJSON) as Token : null;

    if (!token) {
      return;
    }

    this.rws = new ReconnectingWebSocket(`${this.wsURL}?token=${token.token}`);
    this.rws.onopen = () => {
      console.log("opened ws connection");
    }

    this.rws.onmessage = (e) => {
      console.log("got event: ", e.data);

      const event = JSON.parse(e.data) as Event;

      const subscriptions = this.eventTypeSubscriptions[event.type];
      if (!subscriptions) {
        return;
      }

      Object.values(subscriptions)?.forEach((func) => {
        func(event.data);
      });
    }

    this.rws.onclose = () => {
      console.log("closed ws connection");
    }
  }

  public disconnect(): void {
    this.rws?.close();
    this.reconnectSubscriptions = {};
    this.eventTypeSubscriptions = {};
    this.rws = undefined;
  }

  public sendMessage(type: number, data?: any): void {
    this.rws?.send(JSON.stringify({ type, data }));
  }

  public subscribeReconnect(func: ReconnectSubscriptionFunc): number {
    this.reconnectSubscriptions[++this.lastSubscriptionId] = func;
    return this.lastSubscriptionId;
  }

  public subscribe(eventType: number, func: SubscriptionFunc): number {
    if (!this.eventTypeSubscriptions[eventType]) {
      this.eventTypeSubscriptions[eventType] = {};
    }
    this.eventTypeSubscriptions[eventType][++this.lastSubscriptionId] = func;
    return this.lastSubscriptionId;
  }

  public unsubscribe(id: number): void {
    if (id <= 0) {
      return;
    }

    delete this.reconnectSubscriptions[id];

    Object.values(this.eventTypeSubscriptions).forEach((subscriptions) => {
      delete subscriptions[id];
    });
  }
}
