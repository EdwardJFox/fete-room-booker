import { useRouter } from "next/router";
import { buildURL } from "services/buildUrl";
import { IndexMeta } from "types/meta";

export const useIndexMeta = (url: string, meta: IndexMeta) => {
  const router = useRouter();
  const handlePageChange = (page: number) => {
    router.replace(buildURL(url, { page: page.toString(), search: meta.search}));
  };

  const handleSearchChange = (search: string) => {
    router.replace(buildURL(url, { page: meta.pagination.page.toString(), search }));
  }

  return {
    handlePageChange,
    handleSearchChange,
  }
}