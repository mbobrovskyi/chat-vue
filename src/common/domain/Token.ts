import type {User} from "@/common/domain/User.ts";

export type Token = {
  token: string;
  expIn: number;
  expTime: Date;
  user?: User;
};