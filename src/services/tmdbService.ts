import axios, { AxiosInstance } from "axios";
import { MovieResponse } from "@/types/movie";
import { FilterOptions } from "@/types/filters";
interface MovieParams {
  page: number;
  query: string;
  include_adult: boolean;
  include_video: boolean;
  language: string;
  sort_by?: string;
  with_genres?: number;
  primary_release_year?: number;
  "vote_average.gte"?: number;
  "vote_average.lte"?: number;
  "vote_count.gte"?: number;
}

// Create a singleton instance
const createTMDBClient = (): AxiosInstance => {
  const baseURL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  if (!baseURL || !apiKey) {
    throw new Error("TMDB configuration missing");
  }

  return axios.create({
    baseURL,
    params: { api_key: apiKey },
    timeout: 10000, // 10 seconds timeout
  });
};

// Singleton instance
const tmdbClient = createTMDBClient();

// Helper to build params
const buildMovieParams = (
  page: number,
  searchQuery: string,
  filters?: FilterOptions
) => {
  const params: MovieParams = {
    page,
    query: searchQuery,
    include_adult: false,
    include_video: false,
    language: "en-US",
  };

  if (!filters) return params;

  const { sortBy, sortDirection, genre, year, minRating } = filters;

  if (sortBy) {
    params.sort_by = `${sortBy}.${sortDirection}`;
  }

  if (genre) {
    params.with_genres = genre;
  }

  if (year) {
    params.primary_release_year = year;
  }

  if (typeof minRating === "number" && minRating > 0) {
    params["vote_average.gte"] = minRating;
    params["vote_average.lte"] = 10;
    params["vote_count.gte"] = 100;
  }

  return params;
};

export const fetchMovies = async (
  page = 1,
  searchQuery = "",
  filters?: FilterOptions
): Promise<MovieResponse> => {
  try {
    const endpoint = searchQuery ? "/search/movie" : "/discover/movie";
    const params = buildMovieParams(page, searchQuery, filters);

    const response = await tmdbClient.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchGenres = async () => {
  try {
    const response = await tmdbClient.get("/genre/movie/list");
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};
