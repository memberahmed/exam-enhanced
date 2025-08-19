import { Skeleton } from "@/components/ui/skeleton";
import { MoveRight } from "lucide-react";

export default function PasswordFormSkeleton() {
  return (
    <div className="w-full mx-auto sm:w-3/4 bg-white rounded-lg p-6 space-y-6">
      {/* Header section */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Form fields */}
      <div className="space-y-4">
        {/* New Password field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Confirm Password field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Submit button */}
      <Skeleton className="h-11 w-full rounded-md" />
    </div>
  );
}
