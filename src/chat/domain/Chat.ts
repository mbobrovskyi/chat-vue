import {getUserFullName, User} from "../../common/domain/User.ts";
import {Message} from "./Message.ts";
import {Image} from "../../common/domain/Image.ts";
import {UserChat} from "./UserChat.ts";

export enum ChatType {
  Direct = 1,
  Group,
}

export type Chat = {
  id: number;
  name?: string;
  type: ChatType;
  image?: Image;
  lastMessage?: Message;
  userChats: UserChat[];
  createdBy: number;
  creator?: User;
  createdAt: Date;
  updatedAt: Date;
};

export function getChatName(chat: Chat): string {
  if (chat.name) {
    return chat.name;
  }

  const interlocutors = chat.userChats.filter((userChat) => {
    return userChat.chatId !== chat.createdBy;
  });

  if (!interlocutors.length) {
    return "";
  }

  if (chat.type === ChatType.Direct) {
    return getUserFullName(interlocutors[0].user);
  } else if (chat.type === ChatType.Group) {
    return interlocutors.reduce((names: string[], userChat) => {
      names.push(getUserFullName(userChat.user));
      return names;
    }, []).join(", ");
  }

  return "";
}

