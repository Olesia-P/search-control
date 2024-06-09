import { useContext, useEffect, useRef, useState } from "react";
import css from "./list.module.css";
import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { SearchContext } from "../search-context/search-context";
import { Coins } from "../../../../../types/types";

type SearchListProps = {
  rowHeight: number;
  items: Coins;
  visibleItemsLength: number;
  containerHeight: string;
  totalItems: number;
  query: string;
};

const List = ({
  rowHeight,
  totalItems,
  items,
  visibleItemsLength,
  query,
}: SearchListProps) => {
  const totalHeight = rowHeight * totalItems;
  const [scrollTop, setScrollTop] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const startNodeElem = Math.floor(scrollTop / rowHeight);
  const visibleItems = items?.slice(
    startNodeElem,
    startNodeElem + visibleItemsLength
  );

  const offsetY = startNodeElem * rowHeight;

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    setScrollTop(e?.currentTarget?.scrollTop);
  };

  const { setCoins } = useContext(SearchContext);
  const handleFavUpdate = (name: string) => {
    setCoins((prevState) =>
      prevState.map((item) =>
        item.name === name ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [items]);

  return (
    <div className={css.container} onScroll={handleScroll} ref={listRef}>
      <div style={{ height: totalHeight }}>
        <ul
          className={css.listWrap}
          style={{ transform: `translateY(${offsetY}px)` }}
        >
          {visibleItems?.map((item) => (
            <li
              key={item.name}
              style={{ height: rowHeight }}
              className={css.item}
              onClick={() => handleFavUpdate(item.name)}
            >
              {item.isFavorite && (
                <i className={css.icon}>
                  <IoIosStar />
                </i>
              )}
              {!item.isFavorite && (
                <i className={css.icon}>
                  <IoIosStarOutline />
                </i>
              )}

              {item.name}
            </li>
          ))}

          {items.length === 0 && query && (
            <li className={css.emptyListMessage}>No search results found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default List;
