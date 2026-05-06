import { Skeleton } from "../loading/Skeleton";

export function DashboardSkeleton() {
  return (
    <div>
      <Skeleton className="h-8 w-48 mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow"
          >
            <Skeleton className="h-4 w-20 mb-4" />
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}