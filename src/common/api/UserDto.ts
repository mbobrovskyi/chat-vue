import {Image} from "../domain/Image.ts";

export type UserDto = {
  id: number;
  email?: string;
  username: string;
  role?: number;
  firstName: string;
  lastName: string;
  aboutMe?: string;
  image?: Image;
  createdAt?: string;
  updatedAt?: string;
};
