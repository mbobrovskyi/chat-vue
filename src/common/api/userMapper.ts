import {UserDto} from "./UserDto.ts";
import {User} from "../domain/User.ts";
import {Role} from "../domain/Role.ts";

export function userFromDto(input: UserDto): User {
  return {
    id: input.id,
    email: input.email,
    username: input.username,
    role: input.role ? input.role as Role : undefined,
    firstName: input.firstName,
    lastName: input.lastName,
    aboutMe: input.aboutMe,
    image: input.image,
    createdAt: input.createdAt ? new Date(input.createdAt): undefined,
    updatedAt: input.updatedAt ? new Date(input.updatedAt): undefined,
  };
}

export function userToDto(input: User): UserDto {
  return {
    id: input.id,
    email: input.email,
    username: input.username,
    role: input.role ? input.role as number : undefined,
    firstName: input.firstName,
    lastName: input.lastName,
    aboutMe: input.aboutMe,
    image: input.image,
    createdAt: input.createdAt?.toISOString(),
    updatedAt: input.updatedAt?.toISOString(),
  };
}