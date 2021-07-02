import { unique } from "./util";

const KEY = "solvedPuzzles";

export const setSolved = (id: string) => {
  const arr: string[] = unique(JSON.parse(localStorage.getItem(KEY) || "[]"));
  arr.push(id);
  localStorage.setItem(KEY, JSON.stringify(unique(arr)));
};

export const getAllSolved = (): string[] => {
  return unique(JSON.parse(localStorage.getItem(KEY) || "[]"));
};
