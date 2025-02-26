import React, { useEffect } from "react";
import { Card } from "../components/Card";
import { useMovieStore } from "../utils/store";

export const Favorites = () => {
  const favoriteMovies = useMovieStore((state) => state.favoriteMovies);

  return (
    <div className="flex-1 flex flex-col gap-5 items-center justify-between">
      <div className="w-full flex flex-wrap justify-between py-5 gap-3 xl:gap-5">
        {favoriteMovies &&
          favoriteMovies.map((movie) => (
            <div key={movie.id} className="w-full md:w-[47%]">
              <Card movie={movie} />
            </div>
          ))}
      </div>
    </div>
  );
};
