import type {Page} from "@/common/domain/Page.ts";
import type {User} from "@/common/domain/User.ts";
import type {UserFilter} from "@/common/domain/UserFilter.ts";

export interface UserRepo {
  getCurrentUser(): Promise<User>;
  getUsers(filter: UserFilter): Promise<Page<User>>;
}