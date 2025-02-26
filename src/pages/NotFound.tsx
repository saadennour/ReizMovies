import React from "react";
import { Link } from "react-router";

export const NotFound = () => {
  return (
    <div className="bg-white text-black dark:bg-black dark:text-white h-screen flex flex-col items-center justify-center gap-8 lg:gap-12">
      <p className="text-4xl lg:text-5xl text-green font-semibold">
        404 Not Found
      </p>
      <div className="flex flex-col items-center gap-4 px-3 lg:text-lg">
        <p className="text-center">
          The requested URL was not found on the server.
        </p>
        <p className="text-center">
          If you entered the URL manually please check your spelling and try
          again.
        </p>
      </div>
      <Link
        to={"/"}
        className="rounded-lg bg-green hover:opacity-90 max-md:text-sm px-6 py-2 md:px-8 md:py-3"
      >
        Back To Home
      </Link>
    </div>
  );
};
