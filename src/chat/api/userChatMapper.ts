import type {UserChatDto} from "./UserChatDto.ts";
import type {UserChat} from "../domain/UserChat.ts";
import {userFromDto} from "../../common/api/userMapper.ts";

export const userChatFromDto = (input: UserChatDto): UserChat => {
  return {
    userId: input.userId,
    chatId: input.chatId,
    user: input.user ? userFromDto(input.user) : undefined,
  }
};