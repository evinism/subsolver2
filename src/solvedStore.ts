const KEY = "solvedPuzzles";

export const setSolved = (id: string) => {
  const arr: string[] = JSON.parse(localStorage.getItem(KEY) || "[]");
  arr.push(id);
  localStorage.setItem(KEY, JSON.stringify(arr));
};

export const getAllSolved = (): string[] => {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
};
