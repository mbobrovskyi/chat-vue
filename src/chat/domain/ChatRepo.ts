import type {Page} from "../../common/domain/Page.ts";
import type {Chat} from "./Chat.ts";
import type {Message} from "./Message.ts";
import type {MessageFilter} from "./MessageFilter.ts";
import type {ChatFilter} from "./ChatFilter.ts";

export interface ChatRepo {
  getChats(filter?: ChatFilter): Promise<Page<Chat>>;
  getChat(id: number): Promise<Chat>;
  getChatMessages(chatId: number, filter?: MessageFilter): Promise<Page<Message>>;
}