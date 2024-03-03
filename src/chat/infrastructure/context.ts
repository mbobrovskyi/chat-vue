import { Context, createContext } from "@/infrastructure/context";

import {ChatRepoImpl} from "../api/ChatRepoImpl.ts";
import {ChatService} from "../domain/ChatService.ts";
import {ChatWebSocketRepoImpl} from "@/chat/websocket/ChatWebSocketRepoImpl.ts";

export let chatContext: Context;

export function initChatContext() {
  chatContext = createContext("chat");
  chatContext.registry(ChatRepoImpl, "ChatRepo");
  chatContext.registry(ChatWebSocketRepoImpl, "ChatWebSocketRepo");
  chatContext.registry(ChatService, "ChatService");
}
