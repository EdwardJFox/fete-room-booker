export type SearchMeta = {
  search: string;
}

export type PaginationMeta = {
  perPage: number;
  page: number;
  total: number;
  numberOfPages: number;
}

export type IndexMeta = SearchMeta & {
  pagination: PaginationMeta;
}