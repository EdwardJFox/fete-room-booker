import { useRouter } from "next/router";
import { buildURL } from "services/buildURL";
import { IndexMeta } from "types/meta";

export const useIndexMeta = (url: string, meta: IndexMeta) => {
  const router = useRouter();
  const handlePageChange = (page: number) => {
    router.replace(buildURL(url, { page: page.toString(), search: meta.search}));
  };

  const handleSearchChange = (search: string) => {
    router.replace(buildURL(url, { page: "1", search }));
  }

  return {
    handlePageChange,
    handleSearchChange,
  }
}