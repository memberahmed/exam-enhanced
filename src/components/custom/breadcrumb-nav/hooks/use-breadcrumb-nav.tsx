"use client";

import { usePathname } from "@/i18n/navigation";
import { useQuery } from "@tanstack/react-query";

export default function useBreadcrumbData() {
  //  Navigation
  const pathname = usePathname();

  // Segements of pathname
  const pathSegments = pathname.split("/").filter(Boolean);

  // Extract examId from URL
  const examIndex = pathSegments.indexOf("exams");
  const examId = examIndex !== -1 && pathSegments[examIndex + 1] ? pathSegments[examIndex + 1] : null;

  const {
    error,
    isPending,
    data: exam,
  } = useQuery({
    queryKey: ["exam", examId],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/exams/${examId}`);
      const payload: ApiResponse<SingleExamResponse> = await res.json();

      if ("code" in payload) {
        throw new Error(payload.message || "Failed to fetch exam");
      }

      return payload;
    },
    // Only run query if examId exists
    enabled: !!examId,
    // Cache for 60 minutes
    staleTime: 60 * 60 * 1000,
  });

  return {
    error,
    isPending,
    exam,
    pathSegments,
  };
}
