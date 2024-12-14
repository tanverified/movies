import React from "react";

export const MovieCardSkeleton = () => {
  return (
    <div
      data-testid="movie-skeleton"
      className="group relative rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 ease-out cursor-pointer"
    >
      <div className="relative aspect-[2/3] w-full">
        {/* Base skeleton background */}
        <div className="absolute inset-0 bg-gray-700 animate-pulse" />

        {/* Gradient overlay matching the hover effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
          <div className="absolute bottom-0 p-4 w-full">
            {/* Title skeleton */}
            <div className="h-7 bg-gray-500/50 rounded w-3/4 mb-2" />

            {/* Overview skeleton - two lines */}
            <div className="space-y-2 mb-2">
              <div className="h-4 bg-gray-500/50 rounded w-full" />
              <div className="h-4 bg-gray-500/50 rounded w-5/6" />
            </div>

            {/* Rating and year skeleton */}
            <div className="flex items-center gap-2">
              <div className="h-4 bg-gray-500/50 rounded w-12" />
              <div className="h-4 bg-gray-500/50 rounded w-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieCardSkeleton;
