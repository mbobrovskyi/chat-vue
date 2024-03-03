import {AuthRepo} from "./AuthRepo.ts";
import {authContext} from "../infrastructure/context.ts";
import {Token} from "./Token.ts";
import {SignUpEntity} from "@/user/domain/SignUpEntity.ts";

export class AuthService {
  private authRepo: AuthRepo;

  constructor() {
    this.authRepo = authContext.get<AuthRepo>("AuthRepo");
  }

  async signIn(username: string, password: string): Promise<Token> {
    return await this.authRepo.signIn(username, password);
  }

  async signUp(signUpEntity: SignUpEntity): Promise<Token> {
    return await this.authRepo.signUp(signUpEntity);
  }

  async signOut(): Promise<void> {
    await this.authRepo.signOut();
  }

}