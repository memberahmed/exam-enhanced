import DiplomaCard from "@/app/[locale]/(home)/_components/diplomas-card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export default function useLoadMore() {
  const { data, isPending, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["diplomas"],

    queryFn: async ({ pageParam }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/subjects?page=${pageParam}`);

      if (res.status === 401) {
        toast.error("Token is invalid , logout of your account");

        setTimeout(async () => {
          await signOut({ redirect: false });
          window.location.replace("/login");
        }, 2000);
      }

      const payload: ApiResponse<PaginatedResponse<DiplomasResponse>> = await res.json();

      if ("code" in payload) {
        throw new Error(payload.message);
      }
      return {
        subjects: payload.subjects.map((subject, index) => (
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

  const diplomas = data?.pages.flatMap((page) => page.subjects) ?? [];

  return { diplomas, isPending, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage };
}
