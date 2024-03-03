import type {SignUpEntityDto} from "@/user/api/SignUpEntityDto.ts";
import type {SignUpEntity} from "@/user/domain/SignUpEntity.ts";

export const signUpEntityToDto = (signUp: SignUpEntity): SignUpEntityDto  => {
  return {
    email: signUp.email,
    username: signUp.username,
    firstName: signUp.firstName,
    lastName: signUp.lastName,
    password: signUp.password,
  }
};