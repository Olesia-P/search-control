import Fuse from "fuse.js";
import { Coins } from "../types/types";

export const fuseSearch = (list: Coins, query: string) => {
  const fuse = new Fuse(list, {
    keys: ["name"],
    includeMatches: true,
  });

  const searchResults = query
    ? fuse.search(query).map(({ item }) => item)
    : list;

  return searchResults;
};
