import {AuthRepo} from "../domain/AuthRepo.ts";
import {BaseRepo} from "@/common/api/BaseRepo.ts";
import type {Token} from "../domain/Token.ts";
import type {TokenDto} from "./TokenDto.ts";
import type {SignUpEntity} from "@/user/domain/SignUpEntity.ts";
import {tokenFromDto} from "./tokenMapper.ts";
import {signUpEntityToDto} from "@/user/api/signUpMapper.ts";

const baseUrl = "/auth";

export class AuthRepoImpl extends BaseRepo implements AuthRepo {
  constructor() {
    super();
  }

  async signIn(username: string, password: string): Promise<Token> {
    const response = await this.inst.post<TokenDto>(`${baseUrl}/sign-in`, {
      username,
      password,
    });
    return tokenFromDto(response.data);
  }

  async signUp(signUpEntity: SignUpEntity): Promise<Token> {
    const response = await this.inst.post<TokenDto>(
      `${baseUrl}/sign-up`,
      signUpEntityToDto(signUpEntity),
    );
    return tokenFromDto(response.data);
  }

  async signOut(): Promise<void> {
    return await this.inst.post(`${baseUrl}/sign-out`);
  }
}