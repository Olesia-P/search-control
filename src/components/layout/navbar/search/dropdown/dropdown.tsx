/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import css from "./dropdown.module.css";
import { Input } from "../input/input";
import List from "../list/list";
import { IoIosStar } from "react-icons/io";
import { fuseSearch } from "../../../../../utils/fuse-search";
import { Coins } from "../../../../../types/types";

type SearchDropdownProps = {
  coins: Coins;
  favorites: Coins;
};

export const SearchDropdown = ({ coins, favorites }: SearchDropdownProps) => {
  const [query, setQuery] = useState("");
  const [filteredAllData, setFilteredAllData] = useState<Coins>(coins);
  const [filteredFavData, setFilteredFavData] = useState<Coins>([]);
  const [selectedTab, setSelectedTab] = useState("all-coins");

  const allSearchresults = fuseSearch(coins, query);
  const favSearchresults = fuseSearch(favorites, query);

  useEffect(() => {
    setFilteredAllData(allSearchresults);
    setFilteredFavData(favSearchresults);
  }, [coins, favorites, query]);

  useEffect(() => {
    if (selectedTab === "favorites") {
      setQuery("");
    }
  }, [selectedTab]);

  return (
    <div className={css.container}>
      <Input query={query} setQuery={setQuery} />
      <div className={css.headersWrap}>
        <h3
          className={css.favorites}
          onClick={() => setSelectedTab("favorites")}
        >
          <i className={css.icon}>
            <IoIosStar />
          </i>
          FAVORITES
        </h3>
        <h3
          className={css.allCoins}
          onClick={() => setSelectedTab("all-coins")}
        >
          ALL COINS
        </h3>
      </div>
      {selectedTab === "all-coins" && (
        <List
          rowHeight={36}
          totalItems={filteredAllData.length}
          containerHeight="350px"
          items={filteredAllData}
          visibleItemsLength={9}
        />
      )}
      {selectedTab === "favorites" && (
        <List
          rowHeight={36}
          totalItems={filteredFavData.length}
          containerHeight="350px"
          items={filteredFavData}
          visibleItemsLength={9}
        />
      )}
    </div>
  );
};
