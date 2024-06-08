/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import css from "./search.module.css";
import { SearchDropdown } from "./dropdown/dropdown";
import { SearchContext } from "./search-context/search-context";
import useClickOutsideClose from "../../../../custom-hooks/useClickOutsideClose";
import { Coins } from "../../../../types/types";
import { IoIosSearch } from "react-icons/io";

export const Search = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [favorites, setFavorites] = useState<Coins>([]);
  const { coins, setCoins } = useContext(SearchContext);
  const handleSearchButtonClick = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/coins.json");
        const jsonData = await response.json();
        const sortedData = jsonData.sort((a: string, b: string) =>
          a.localeCompare(b)
        );
        const dataWithFavField = sortedData.map((item: string) => ({
          name: item,
          isFavorite: false,
        }));

        setCoins(dataWithFavField);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const favoritesArray = coins.filter((item) => item.isFavorite);
    setFavorites(favoritesArray);
  }, [coins]);

  const searchRef = useClickOutsideClose(setIsDropdownOpen, isDropdownOpen);

  return (
    <div className={css.container} ref={searchRef}>
      <div
        className={`${css.searchButton} ${isDropdownOpen ? css.clicked : ""}`}
        onClick={() => handleSearchButtonClick()}
      >
        <i className={css.icon}>
          <IoIosSearch />
        </i>
        SEARCH
      </div>
      {isDropdownOpen && <SearchDropdown coins={coins} favorites={favorites} />}
    </div>
  );
};
