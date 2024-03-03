import type {Token} from "./Token.ts";
import type {SignUpEntity} from "@/user/domain/SignUpEntity.ts";

export interface AuthRepo {
  signIn(username: string, password: string): Promise<Token>;
  signUp(signUpEntity: SignUpEntity): Promise<Token>;
  signOut(): Promise<void>;
}