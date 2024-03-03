import type {UserDto} from "@/common/api/UserDto.ts";

export type TokenDto = {
  token: string;
  expIn: number;
  expTime: string;
  user?: UserDto;
};