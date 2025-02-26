import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieStore } from "../utils/store";
import { IMovies } from "./Home";
import { parseHtmlToText } from "../utils/parseHtmlToText";
import { isFavorite } from "../utils/isFavorite";

export const Overview = () => {
  const { overviewId } = useParams();
  const { movies, getMovies, save, unsave } = useMovieStore();
  const [movie, setMovie] = useState<IMovies>();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (movies.length === 0) {
      getMovies();
    }
  }, [movies, getMovies]);

  useEffect(() => {
    if (overviewId && movies.length > 0) {
      const newMovie = movies.find((show) => show.id === Number(overviewId));
      setMovie(newMovie);
    }
  }, [overviewId, movies]);

  useEffect(() => {
    if (movie) setFavorite(isFavorite(movie));
  }, [movie]);

  const handleFavoriteClick = () => {
    if (!favorite && movie) {
      save(movie);
      setFavorite(true);
    } else if (favorite && movie) {
      unsave(movie);
      setFavorite(false);
    }
  };
  return (
    <>
      {movie && (
        <div className="flex max-md:flex-col gap-5">
          <div className="max-md:w-full md:w-1/2 xl:w-2/5">
            <img
              src={movie.image.original}
              alt={movie.name}
              className="w-full"
            />
          </div>
          <div className="md:w-1/2 xl:w-3/5 flex flex-col gap-7">
            <div className="flex flex-col">
              <p className="font-bold text-xl xl:text-3xl">{movie.name}</p>
              <p
                className="underline text-green cursor-pointer"
                onClick={handleFavoriteClick}
              >
                {favorite ? "FAVORITE" : "ADD TO FAVORITE"}
              </p>
            </div>
            <p>{parseHtmlToText(movie?.summary)}</p>
            <div className="mt-auto flex flex-col">
              <p>Premiered: {movie.premiered}</p>
              <p>Ended: {movie.ended}</p>
              <p>Average runtime {movie.runtime}</p>
              <p>Show status: {movie.status}</p>
              <p>Language: {movie.language}</p>
              <p>Average rating: {movie.rating.average}</p>
              <p>
                official site:{" "}
                <span className="underline text-green cursor-pointer">
                  <a href={movie.url}>Go to official site</a>
                </span>
              </p>
              <p>genres: {movie.genres.join(" ")}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
