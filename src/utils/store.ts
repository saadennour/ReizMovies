import { create } from "zustand";
import { IMovies } from "../pages/Home";
import axios from "axios";

type MovieStore = {
  movies: IMovies[];
  favoriteMovies: IMovies[];
  getMovies: () => Promise<void>;
  save: (movie: IMovies) => void;
  unsave: (movie: IMovies) => void;
};

export const useMovieStore = create<MovieStore>((set) => {
  const storedMovies = JSON.parse(localStorage.getItem("favorites") || "[]");
  return {
    movies: [],
    favoriteMovies: storedMovies,
    getMovies: async () => {
      try {
        const res = await axios.get("https://api.tvmaze.com/shows");
        set({
          movies: res.data,
        });
      } catch (error) {
        console.log(error);
      }
    },
    save: (movie: IMovies) =>
      set((state) => {
        const updatedMovies = [...state.favoriteMovies, movie];
        localStorage.setItem("favorites", JSON.stringify(updatedMovies));
        return { favoriteMovies: updatedMovies };
      }),
    unsave: (movie: IMovies) =>
      set((state) => {
        const updatedMovies = state.favoriteMovies.filter(
          (mv) => mv.id !== movie.id
        );
        localStorage.setItem("favorites", JSON.stringify(updatedMovies));
        return { favoriteMovies: updatedMovies };
      }),
  };
});
