import {User} from "@/common/domain/User.ts";

export enum MessageStatus {
  DRAFT = 1,
  UNREAD = 2,
  READ = 3,
}

export type Message = {
  uuid: string;
  id?: number;
  text: string;
  status: MessageStatus;
  chatId: number;
  createdBy: number;
  creator?: User;
  createdAt: Date;
  updatedAt: Date;
}