import {paramsSerializer} from "@/common/api/paramsSerializer.ts";
import {BaseRepo} from "@/common/api/BaseRepo.ts";
import {ChatRepo} from "../domain/ChatRepo.ts";

import type {Page} from "@/common/domain/Page.ts";
import type {Chat} from "../domain/Chat.ts";
import type {ChatDto} from "./ChatDto.ts";
import type {ChatFilter} from "../domain/ChatFilter.ts";
import type {Message} from "../domain/Message.ts";
import type {MessageDto} from "./MessageDto.ts";
import type {MessageFilter} from "../domain/MessageFilter.ts";

import {messageFromDto} from "./messageMappers.ts";
import {chatFromDto} from "./chatMapper.ts";

const baseUrl = "/chats";

export class ChatRepoImpl extends BaseRepo implements ChatRepo {
  constructor() {
    super();
  }

  async getChats(filter?: ChatFilter): Promise<Page<Chat>> {
    const response = await this.inst.get<Page<ChatDto>>(`${baseUrl}`, {
      params: filter,
      paramsSerializer,
    });
    return {
      items: response.data?.items ? response.data.items.map(chatFromDto) : [],
      count: response.data?.count || 0,
    };
  }

  async getChat(id: number): Promise<Chat> {
    const response = await this.inst.get<ChatDto>(`${baseUrl}/${id}`);
    return chatFromDto(response.data);
  }

  async getChatMessages(chatId: number, filter?: MessageFilter): Promise<Page<Message>> {
    if (!filter) {
      filter = {};
    }

    if (!filter.sort) {
      filter.sort = "updatedAt,desc";
    }

    const response = await this.inst.get<Page<MessageDto>>(
      `${baseUrl}/${chatId}/messages`,
      {
        params: filter,
        paramsSerializer,
      }
    );
    return {
      items: response.data?.items ? response.data.items.map(messageFromDto) : [],
      count: response.data?.count || 0,
    };
  }
}
