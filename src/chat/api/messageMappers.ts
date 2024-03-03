import { uid } from "quasar";
import type {MessageDto} from "./MessageDto.ts";
import type {Message} from "../domain/Message.ts";
import {userFromDto} from "@/common/api/userMapper.ts";

export const messageFromDto = (input: MessageDto): Message => {
  return {
    uuid: uid(),
    id: input.id,
    text: input.text,
    status: input.status,
    chatId: input.chatId,
    createdBy: input.createdBy,
    creator: input.creator ? userFromDto(input.creator) : undefined,
    createdAt: new Date(input.createdAt),
    updatedAt: new Date(input.updatedAt),
  };
}