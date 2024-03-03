import {PageFilter} from "@/common/domain/PageFilter.ts";
import {Role} from "./Role.ts";

export type UserFilter = PageFilter & {
  ids?: string[];
  emails?: string[];
  userNames?: string[];
  roles?: Role[];
};
