import {Role} from "./Role.ts";
import {Image} from "./Image.ts";

export type User = {
  id: number;
  email?: string;
  username: string;
  role?: Role;
  firstName: string;
  lastName: string;
  aboutMe?: string;
  image?: Image;
  createdAt?: Date;
  updatedAt?: Date;
};

export function getUserFullName(user?: User): string {
  if (!user) {
    return "Deleted";
  }

  return `${user.firstName} ${user.lastName}`;
}