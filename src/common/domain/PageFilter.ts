import {Pagination} from "./Paginations.ts";
import {SearchFilter} from "./SearchFilter.ts";

export type PageFilter = Pagination & SearchFilter & {
  sort?: string;
  column?: string[];
};