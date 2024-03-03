import {userContext} from "../infrastructure/context.ts";
import {UserRepo} from "./UserRepo.ts";
import {User} from "@/common/domain/User.ts";

export class UserService {
  private userRepo: UserRepo;

  constructor() {
    this.userRepo = userContext.get<UserRepo>("UserRepo");
  }

  async getCurrentUser(): Promise<User> {
    return await this.userRepo.getCurrentUser();
  }

}