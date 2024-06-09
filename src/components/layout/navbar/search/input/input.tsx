import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import css from "./input.module.css";

type InputProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const Input = ({ query, setQuery }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const cleanInput = () => {
    setQuery("");
  };

  return (
    <div className={css.inputWrap}>
      <i className={`${css.icon} ${isFocused && css.focusedIcon}`}>
        <IoIosSearch />
      </i>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={css.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoFocus
      />
      {query.length >= 1 && (
        <img
          src="/cancel.png"
          alt="cross-icon"
          className={css.cross}
          onClick={() => cleanInput()}
        />
      )}
    </div>
  );
};
