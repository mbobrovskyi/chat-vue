import {UserDto} from "@/common/api/UserDto.ts";

export type MessageDto = {
  id: number;
  text: string;
  status: number;
  chatId: number;
  createdBy: number;
  creator?: UserDto;
  createdAt: string;
  updatedAt: string;
};