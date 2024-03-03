import {Token} from "@/common/domain/Token.ts";
import {TokenDto} from "./TokenDto.ts";
import {userFromDto} from "@/common/api/userMapper.ts";

export function tokenFromDto(input: TokenDto): Token {
  return {
    token: input.token,
    expIn: input.expIn,
    expTime: new Date(input.expTime),
    user: input.user ? userFromDto(input.user) : input.user,
  };
}