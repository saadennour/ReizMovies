import { IMovies } from "../pages/Home";

export const isFavorite = (movie: IMovies) => {
  const favoriteMovies = JSON.parse(localStorage.getItem("favorites") || "[]");

  return favoriteMovies.find((mv: IMovies) => mv.id === movie.id);
};
