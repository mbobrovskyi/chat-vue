import {Image} from "@/common/domain/Image.ts";
import {UserDto} from "@/common/api/UserDto.ts";
import {MessageDto} from "./MessageDto.ts";

export type ChatDto = {
  id: number;
  name?: string;
  type?: string;
  image?: Image;
  lastMessage?: MessageDto;
  users: UserDto[];
  createdBy: number;
  creator?: UserDto;
  createdAt: string;
  updatedAt: string;
};