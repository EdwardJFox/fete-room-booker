import { ParsedUrlQuery } from "querystring";

interface MetaQuery extends ParsedUrlQuery {
  search?: string;
  page?: string;
}

export const buildMeta = (query: MetaQuery, perPage: number, total: number) => ({
  search: query?.search || "",
  pagination: {
    perPage,
    page: query?.page ? parseInt(query.page as string) : 1,
    total,
    numberOfPages: Math.ceil(total / perPage),
  }
});