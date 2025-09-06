export default function DiplomaCardSkeleton() {
  return (
    <div className="relative w-full animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-[3/4] w-full bg-gray-200 rounded-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
      </div>

      {/* Text Overlay Skeleton */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] h-[70px] flex items-center justify-start bg-gray-300/50 backdrop-blur-[6px] px-4 py-[7.5px]">
        <div className="h-6 bg-gray-400 rounded w-3/4 animate-pulse"></div>
      </div>
    </div>
  );
}
