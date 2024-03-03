import type {Chat} from "../domain/Chat.ts";
import type {ChatDto} from "./ChatDto.ts";
import {userFromDto} from "@/common/api/userMapper.ts";
import {userChatFromDto} from "./userChatMapper.ts";

export const chatFromDto = (input: ChatDto): Chat => {
  return {
    id: input.id,
    name: input.name,
    type: input.type,
    image: input.image,
    lastMessage: input.lastMessage ? input.lastMessage : undefined,
    userChats: input.userChats ? input.userChats.map(userChatFromDto) : [],
    createdBy: input.createdBy,
    creator: input.creator ? userFromDto(input.creator) : undefined,
    createdAt: input.createdAt,
    updatedAt: input.updatedAt,
  };
};