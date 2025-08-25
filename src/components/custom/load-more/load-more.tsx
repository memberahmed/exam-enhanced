"use client";

import { useInView } from "react-intersection-observer";
import Spinner from "@/components/comman/sppiner";
import useLoadMore from "./hooks/use-load-more";
import FeedbackError from "@/components/comman/feedback-error";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

export default function LoadMore() {
  //  Translation
  const t = useTranslations();

  // Hooks
  // Infinite scorll hook
  const { diplomas, isPending, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useLoadMore();

  // Inview hooks
  const { ref, inView } = useInView();

  // Effects
  useEffect(() => {
    // If load more in view and there are more page
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 xl:grid-cols-3">{diplomas}</div>
      {/* First fectching loading */}
      {isLoading && <p className="text-center p-4 ">Calling Diplomas</p>}

      {/* Error */}
      {error && <FeedbackError error={error.message || "Something went wrong Please try agian later"} />}

      {/* Getting next page loader */}
      <div ref={ref} className="flex justify-center p-4">
        {(isPending || isFetchingNextPage) && (
          <span className="flex items-center justify-center p-4 ">
            <Spinner />
          </span>
        )}
      </div>

      {/* Bottom  */}
      <p className="text-center p-2.5 flex-col flex items-center justify-center space-y-2 font-GeistMono text-base tracking-none leading-full text-custom-gray-600">
        {!hasNextPage ? (
          t("the-end")
        ) : (
          <>
            {t.rich("scroll-to-view-more", {
              span: () => <ChevronDown />,
            })}
          </>
        )}{" "}
      </p>
    </div>
  );
}
