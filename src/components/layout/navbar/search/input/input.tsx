import React from "react";
import { IoIosSearch } from "react-icons/io";
import css from "./input.module.css";

type InputProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const Input = ({ query, setQuery }: InputProps) => {
  const cleanInput = () => {
    setQuery("");
  };

  return (
    <div className={css.inputWrap}>
      <i className={css.icon}>
        <IoIosSearch />
      </i>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={css.input}
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
