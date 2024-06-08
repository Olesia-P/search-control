import React from "react";
import css from "./navbar.module.css";
import { Search } from "./search/search";
import { SearchContextProvider } from "../navbar/search/search-context/search-context";

export const Navbar = () => {
  return (
    <div className={css.container}>
      <SearchContextProvider>
        <Search />
      </SearchContextProvider>
    </div>
  );
};
