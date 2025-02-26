import { useEffect, useState, useMemo } from "react";
import { GenreFilter } from "../components/GenreFilter";
import { SortFilter } from "../components/SortFilter";
import { StatusFilter } from "../components/StatusFilter";
import { Card } from "../components/Card";
import ReactPaginate from "react-paginate";
import { usePagination } from "../hooks/usePagination";
import { useMovieStore } from "../utils/store";

export interface IMovies {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string;
  schedule: {
    time: string;
    days: string[];
  };
  rating: {
    average: number;
  };
  network: {
    officialSite: string;
  };
  image: {
    medium: string;
    original: string;
  };
  summary: string;
}

export const Home = () => {
  const [sort, setSort] = useState("No sort");
  const [genres, setGenres] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("All");
  const { movies, getMovies } = useMovieStore();

  useEffect(() => {
    getMovies();
  }, []);

  const filteredMovies = useMemo(() => {
    switch (sort) {
      case "Name ascending":
        movies.sort((a, b) => {
          const movie1 = a.name.toUpperCase();
          const movie2 = b.name.toUpperCase();
          if (movie1 > movie2) return 1;
          return -1;
        });
        break;
      case "Name descending":
        movies.sort((a, b) => {
          const movie1 = a.name.toUpperCase();
          const movie2 = b.name.toUpperCase();
          if (movie1 < movie2) return 1;
          return -1;
        });
        break;
      case "Premiered ascending":
        movies.sort((a, b) => {
          const movie1 = a.premiered;
          const movie2 = b.premiered;
          if (movie1 > movie2) return 1;
          return -1;
        });
        break;
      case "Premiered descending":
        movies.sort((a, b) => {
          const movie1 = a.premiered;
          const movie2 = b.premiered;
          if (movie1 < movie2) return 1;
          return -1;
        });
        break;
      default:
        movies.sort((a, b) => {
          const movie1 = a.rating.average;
          const movie2 = b.rating.average;
          if (movie1 < movie2) return 1;
          return -1;
        });
    }
    return movies.filter((movie) => {
      const matchesGenre =
        genres.length === 0 ||
        movie.genres.some((genre) => genres.includes(genre));

      const matchesStatus =
        status === "All" || status === "" || status === movie.status;

      return matchesGenre && matchesStatus;
    });
  }, [movies, genres, status, sort]);

  const {
    currentItems,
    handlePageClick,
    resetPagination,
    pageCount,
    selectedPage,
  } = usePagination(filteredMovies);

  useEffect(() => {
    resetPagination();
  }, [filteredMovies]);

  return (
    <div className="flex-1 flex flex-col gap-5 items-center justify-between">
      <div className="flex self-start max-md:flex-col gap-2">
        <SortFilter
          name={sort}
          options={[
            "No sort",
            "Name ascending",
            "Name descending",
            "Premiered ascending",
            "Premiered descending",
          ]}
          setValue={setSort}
        />
        <GenreFilter
          name={`Genres filter ${
            genres.length > 0 ? `(${genres.length})` : ""
          }`}
          options={[
            "Action",
            "Crime",
            "Science-Fiction",
            "Drama",
            "Thriller",
            "Espionage",
            "Music",
            "Romance",
          ]}
          values={genres}
          setValues={setGenres}
        />
        <StatusFilter
          options={["All", "Ended", "Running", "To Be Determined"]}
          values={status}
          setValues={setStatus}
        />
      </div>
      {currentItems && currentItems.length === 0 && (
        <div className="w-full flex-1 flex items-center justify-center">
          <p className="text-3xl lg:text-4xl text-center">
            Ooops ... There is nothing here ! Try adjusting your filters.
          </p>
        </div>
      )}
      {currentItems && currentItems.length > 0 && (
        <div className="w-full flex flex-wrap justify-between py-5 gap-3 xl:gap-5">
          {currentItems.map((movie) => (
            <div key={movie.id} className="max-md:w-full w-[47%]">
              <Card movie={movie} />
            </div>
          ))}
        </div>
      )}
      <ReactPaginate
        breakLabel="..."
        nextClassName="hidden"
        previousClassName="hidden"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        className="mt-auto flex flex-wrap items-center justify-center gap-1"
        pageClassName="rounded-lg p-2 w-10 flex items-center bg-slate dark:bg-black200 justify-center"
        activeClassName="!bg-green"
        forcePage={selectedPage}
      />
    </div>
  );
};
