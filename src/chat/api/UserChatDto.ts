import type {UserDto} from "@/common/api/UserDto.ts";

export type UserChatDto = {
  userId: number;
  chatId: number;
  user?: UserDto;
};