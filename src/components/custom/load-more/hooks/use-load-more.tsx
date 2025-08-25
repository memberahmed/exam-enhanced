import DiplomaCard from "@/app/[locale]/(home)/_components/diplomas-card";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useLoadMore() {
  const { data, isPending, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["diplomas"],
    queryFn: async ({ pageParam }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/subjects?page=${pageParam}`);
      const payload: ApiResponse<PaginatedResponse<DiplomasResponse>> = await res.json();
      if ("code" in payload) {
        throw new Error(payload.message);
      }
      return {
        myData: payload.subjects.map((subject, index) => (
          <DiplomaCard index={index} diploma={subject} key={subject._id} />
        )),
        metadata: payload.metadata,
      };
    },
    initialPageParam: 2,
    getNextPageParam: (lastPage) => {
      if (lastPage.metadata.currentPage === lastPage.metadata.numberOfPages) return undefined;

      return lastPage.metadata.currentPage + 1;
    },
  });

  const diplomas = data?.pages.flatMap((page) => page.myData) ?? [];

  return { diplomas, isPending, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage };
}
