import React from "react";
import { Movie } from "@/types/movie";
import Image from "next/image";
import { FiStar } from "react-icons/fi";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/No-Image-Placeholder.png";

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "bg-green-500";
    if (rating >= 6) return "bg-yellow-500";
    return "bg-red-500";
  };

  const voteAverage = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";
  const overview = movie.overview || "No description available.";
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Unknown";

  return (
    <div className="group relative rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 ease-out cursor-pointer">
      <div className="relative aspect-[2/3] w-full">
        <Image
          src={imageUrl}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-2 right-2">
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full ${getRatingColor(
                movie.vote_average
              )} text-white font-semibold text-sm shadow-lg backdrop-blur-sm`}
            >
              <FiStar className="stroke-2" />
              {voteAverage}
            </div>
          </div>
          <div className="absolute bottom-0 p-4 w-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            <h3 className="font-bold text-lg mb-2 text-white">{movie.title}</h3>
            <p className="text-gray-200 text-sm line-clamp-2 mb-2">
              {overview}
            </p>
            <span className="text-gray-300 text-sm">{releaseYear}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
