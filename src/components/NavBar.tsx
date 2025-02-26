import React from "react";
import { Link, useLocation } from "react-router";
import { Switch } from "./Switch";

export const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center">
        <Link to={"/"}>
          <img
            src="/ReizWhite.png"
            alt="Reiz Logo"
            height={100}
            width={100}
            className="dark:invert"
          />
        </Link>
        <Switch />
      </div>
      <ul className="flex items-center gap-4 text-black dark:text-white text-sm">
        <li
          className={`${
            location.pathname === "/" ? "text-green underline" : ""
          } hover:underline cursor-pointer`}
        >
          <Link to="/">HOME</Link>
        </li>
        <li
          className={`${
            location.pathname === "/favorites" ? "text-green underline" : ""
          } hover:underline cursor-pointer`}
        >
          <Link to="/favorites">FAVORITES</Link>
        </li>
      </ul>
    </nav>
  );
};
