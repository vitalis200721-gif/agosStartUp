export function CardSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card p-5 animate-pulse">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-agos-surface rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-agos-surface rounded w-3/4" />
              <div className="h-3 bg-agos-surface rounded w-1/2" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-agos-surface rounded" />
            <div className="h-3 bg-agos-surface rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ListSkeleton({ rows = 4 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-agos-border animate-pulse">
          <div className="w-8 h-8 bg-agos-surface rounded-full" />
          <div className="flex-1 space-y-1">
            <div className="h-3 bg-agos-surface rounded w-1/3" />
            <div className="h-2 bg-agos-surface rounded w-1/5" />
          </div>
          <div className="h-4 bg-agos-surface rounded w-16" />
        </div>
      ))}
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="card p-5 animate-pulse">
          <div className="h-3 bg-agos-surface rounded w-20 mb-3" />
          <div className="h-6 bg-agos-surface rounded w-24 mb-2" />
          <div className="h-2 bg-agos-surface rounded w-full" />
        </div>
      ))}
    </div>
  );
}
