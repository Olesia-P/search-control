import React, { createContext, useState } from "react";
import { Coins } from "../../../../../types/types";

type ContextType = {
  coins: Coins;
  setCoins: React.Dispatch<React.SetStateAction<Coins>>;
};

type MyContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContext = createContext<ContextType>({
  coins: [],
  setCoins: () => {},
});

export const SearchContextProvider = ({ children }: MyContextProviderProps) => {
  const [coins, setCoins] = useState<Coins>([]);

  return (
    <SearchContext.Provider value={{ coins, setCoins }}>
      {children}
    </SearchContext.Provider>
  );
};
