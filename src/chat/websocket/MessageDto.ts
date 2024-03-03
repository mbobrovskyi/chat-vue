import type {UserDto} from "@/common/api/UserDto.ts";

export type MessageDto = {
  uuid?: string;
  id: number;
  text: string;
  status: number;
  chatId: number;
  createdBy: number;
  creator?: UserDto;
  createdAt: string;
  updatedAt: string;
};

export type CreateMessageDto = {
  uuid?: string;
  text: string;
};

export type UpdateMessageDto = {
  id?: number;
  text: string;
};