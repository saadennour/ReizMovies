import { useState } from "react";
import { IMovies } from "../pages/Home";

export function usePagination(movies: IMovies[]) {
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + 8;
  const currentItems = movies.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(movies.length / 8);

  const handlePageClick = (e: any) => {
    const newOffset = (e.selected * 8) % movies.length;
    setItemOffset(newOffset);
    setSelectedPage(e.selected);
  };

  const resetPagination = () => {
    setItemOffset(0);
    setSelectedPage(0);
  };

  return {
    currentItems,
    handlePageClick,
    resetPagination,
    pageCount,
    selectedPage,
  };
}
