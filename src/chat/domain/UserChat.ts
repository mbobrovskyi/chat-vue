import type {User} from "@/common/domain/User.ts";

export type UserChat = {
  userId: number;
  chatId: number;
  user?: User;
};