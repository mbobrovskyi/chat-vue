import {UserRepo} from "../domain/UserRepo.ts";
import {BaseRepo} from "../../common/api/BaseRepo.ts";
import {userFromDto} from "../../common/api/userMapper.ts";
import {UserFilter} from "../../common/domain/UserFilter.ts";
import {Page} from ".../../common/domain/Page.ts";
import {User} from "../../common/domain/User.ts";
import {UserDto} from "../../common/api/UserDto.ts";
import {paramsSerializer} from "../../common/api/paramsSerializer.ts";

const baseUrl = "/users";

export class UserRepoImpl extends BaseRepo implements UserRepo {
  constructor() {
    super();
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.inst.get<UserDto>(`${baseUrl}/current`);
    return userFromDto(response.data);
  }

  async getUsers(filter: UserFilter): Promise<Page<User>> {
    if (!filter.sort) {
      filter.sort = "updatedAt,desc";
    }

    if (filter.isArchived === undefined) {
      filter.isArchived = false;
    }
    const result = await this.inst.get<Page<UserDto>>(baseUrl, {
      params: filter,
      paramsSerializer,
    });

    return {
      items: result.data.items.map(userFromDto),
      count: result.data.count,
    };
  }
}