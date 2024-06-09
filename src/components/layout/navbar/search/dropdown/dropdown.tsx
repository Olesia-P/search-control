/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import css from "./dropdown.module.css";
import { Input } from "../input/input";
import List from "../list/list";
import { IoIosStar } from "react-icons/io";
import { fuseSearch } from "../../../../../utils/fuse-search";
import { Coins } from "../../../../../types/types";
import ReactDom from "react-dom";

type SearchDropdownProps = {
  coins: Coins;
  favorites: Coins;
  isOpen: boolean;
  innerRef: React.MutableRefObject<HTMLDivElement | null>;
};

export const SearchDropdown = ({
  coins,
  favorites,
  isOpen,
  innerRef,
}: SearchDropdownProps) => {
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
    setQuery("");
  }, [selectedTab]);

  const portalElement = document.getElementById("portal");

  if (!isOpen) return null;

  return portalElement
    ? ReactDom.createPortal(
        <div className={css.container} ref={innerRef}>
          <Input query={query} setQuery={setQuery} />
          <div className={css.headersWrap}>
            <h3
              className={`${css.favorites} ${
                selectedTab === "favorites" && css.chosenTab
              }`}
              onClick={() => setSelectedTab("favorites")}
            >
              <i className={css.icon}>
                <IoIosStar />
              </i>
              FAVORITES
            </h3>
            <h3
              className={`${css.allCoins} ${
                selectedTab === "all-coins" && css.chosenTab
              }`}
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
              visibleItemsLength={30}
              query={query}
            />
          )}
          {selectedTab === "favorites" && (
            <List
              rowHeight={36}
              totalItems={filteredFavData.length}
              containerHeight="350px"
              items={filteredFavData}
              visibleItemsLength={30}
              query={query}
            />
          )}
        </div>,
        portalElement
      )
    : null;
};
