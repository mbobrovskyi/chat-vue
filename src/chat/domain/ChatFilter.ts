import type {PageFilter} from "@/common/domain/PageFilter.ts";

export type ChatFilter =  PageFilter & {
  ids?: number[];
  types?: number[];
  createdByIds?: number[];
};
