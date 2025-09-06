import { Timer } from "lucide-react";

export function ExamCardSkeleton() {
  return (
    <div className="flex justify-between items-center h-16 md:h-20 bg-slate-50 md:p-4 animate-pulse">
      {/* Title and questions skeleton */}
      <div className="space-y-2">
        {/* Title skeleton */}
        <div className="h-4 md:h-6 bg-slate-200 rounded w-32 md:w-48"></div>

        {/* Questions number skeleton */}
        <div className="h-3 md:h-4 bg-slate-200 rounded w-24 md:w-32"></div>
      </div>

      {/* Duration skeleton */}
      <div className="flex gap-x-1.5 items-center">
        {/* Timer icon - using muted color */}
        <Timer className="text-slate-300 w-4 h-4" />

        {/* Duration text skeleton */}
        <div className="h-3 md:h-4 bg-slate-200 rounded w-16 md:w-20"></div>
      </div>
    </div>
  );
}
