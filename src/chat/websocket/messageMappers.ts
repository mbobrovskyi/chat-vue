import {uid} from "quasar";
import type {CreateMessageDto, MessageDto, UpdateMessageDto} from "./MessageDto.ts";
import type {Message} from "../domain/Message.ts";
import {userFromDto} from "@/common/api/userMapper.ts";

export const messageFromDto = (dto: MessageDto): Message => {
  return {
    uuid: dto.uuid ? dto.uuid : uid(),
    id: dto.id,
    text: dto.text,
    status: dto.status,
    chatId: dto.chatId,
    createdBy: dto.createdBy,
    creator: dto.creator ? userFromDto(dto.creator) : undefined,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
  };
}

export const messageToCreateDto = (message: Message): CreateMessageDto  => {
  return {
    uuid: message.uuid ? message.uuid : uid(),
    text: message.text,
  };
}

export const messageToUpdateDto = (message: Message): UpdateMessageDto  => {
  return {
    id: message.id,
    text: message.text,
  };
}