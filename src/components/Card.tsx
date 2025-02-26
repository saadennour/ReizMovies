import React, { useState } from "react";
import { IMovies } from "../pages/Home";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { parseHtmlToText } from "../utils/parseHtmlToText";
import { useMovieStore } from "../utils/store";
import "../styles/Card.css";
import { useNavigate } from "react-router";

interface CardProps {
  movie: IMovies;
}

export const Card: React.FC<CardProps> = ({ movie }) => {
  const navigate = useNavigate();
  const save = useMovieStore((state) => state.save);
  const unsave = useMovieStore((state) => state.unsave);
  const movies = useMovieStore((state) => state.favoriteMovies);
  const [favorite, setFavorite] = useState(() =>
    movies.some((mv) => mv.id === movie.id)
  );

  const handleClick = (movie: IMovies) => {
    setFavorite((prev) => {
      const newFav = !prev;
      newFav ? save(movie) : unsave(movie);
      return newFav;
    });
  };

  return (
    <div
      onClick={() => navigate(`/overview/${movie.id}`)}
      className="cursor-pointer bg-transparent shadow flex md:h-52 xl:h-96 overflow-hidden gap-3 hover:p-2 transition hover:scale-[102%] hover:delay-300"
    >
      <div className="md:w-1/3">
        <img
          src={movie.image.medium}
          alt={movie.name}
          className="w-full h-full rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-between w-2/3">
        <div className="flex flex-col md:gap-1 gap-2">
          <div className="flex items-center justify-between pr-2">
            <p className="mt-2 md:text-lg lg:text-xl font-bold">{movie.name}</p>
            <FaRegHeart
              size={20}
              color={`${favorite ? "#15b58e" : "#D7D7D7"}`}
              className="cursor-pointer max-md:scale-90"
              onClick={(e: any) => {
                e.stopPropagation();
                handleClick(movie);
              }}
            />
          </div>
          <p className="truncate text-wrap max-md:text-xs max-xl:text-sm card pr-2">
            {parseHtmlToText(movie.summary)}
          </p>
        </div>
        <div className="flex max-lg:flex-col lg:justify-between gap-2">
          <div className="flex items-center gap-1 font-semibold">
            <FaStar color="gold" />
            {movie.rating.average}
          </div>
          <div className="flex items-center text-xs pr-2">
            <p className="text-gray-500">{movie.genres.join(", ")},</p>
          </div>
        </div>
      </div>
    </div>
  );
};
