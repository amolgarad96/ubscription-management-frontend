import { Skeleton } from "../loading/Skeleton";

export function SubscriptionCardSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4 shadow-sm"
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <Skeleton className="h-4 w-40 mb-2" />
              <Skeleton className="h-3 w-28" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>

          {/* Line items */}
          <div className="flex flex-col gap-2">
            {[...Array(2)].map((_, j) => (
              <div key={j} className="flex justify-between">
                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>

          {/* Billing info */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-28" />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-3">
            <Skeleton className="h-8 w-20 rounded-md" />
            <Skeleton className="h-8 w-24 rounded-md" />
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}