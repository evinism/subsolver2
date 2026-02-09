import { alphabet, frequencyOrder } from "../constants";

interface MappingOptions {
  hideSpaces?: boolean;
  showPunctuation?: boolean;
  keepCapitals?: boolean;
}

const _normalizeText = (
  inText: string,
  {
    hideSpaces = false,
    showPunctuation = false,
    keepCapitals = false,
  }: MappingOptions
) => {
  let text = inText;
  if (!keepCapitals) {
    text = text.toLowerCase();
  }
  text = text.replace(/[\s]+/g, " ");
  if (!showPunctuation) {
    text = text.replace(/[-…—]/g, " ");
  }
  if (!showPunctuation) {
    const rejectionRegex = hideSpaces ? /[^a-zA-Z]/g : /[^a-zA-Z ]/g;
    text = text.replace(rejectionRegex, "");
  }
  return text;
};

export const applyMapping = (
  text: string,
  mapping: string,
  mappingOptions: MappingOptions = {}
) =>
  _normalizeText(text, mappingOptions)
    .split("")
    .map((letter) => {
      // For both capital and lowercase letters
      const fullMapping = mapping + mapping.toUpperCase();
      const fullAlphabet = alphabet + alphabet.toUpperCase();
      const idx = fullAlphabet.indexOf(letter);
      if (idx === -1) {
        return letter;
      } else {
        return fullMapping[fullAlphabet.indexOf(letter)];
      }
    })
    .join("");

export const swapLetters = (mapping: string, a: string, b: string) => {
  const newMapping = mapping.split("");
  const aPos = newMapping.indexOf(a);
  const bPos = newMapping.indexOf(b);
  const temp = newMapping[aPos];
  newMapping[aPos] = newMapping[bPos];
  newMapping[bPos] = temp;
  return newMapping.join("");
};

const _getLetterCounts = (normalizedText: string) => {
  const counts = Object.fromEntries(
    alphabet.split("").map((letter) => [letter, 0])
  );
  for (let i = 0; i < normalizedText.length; i++) {
    counts[normalizedText[i]]++;
  }
  return counts;
};

export const findInitialMapping = (
  text: string,
  presolveLetters: string = "",
) => {
  const normalized = _normalizeText(text, { hideSpaces: true });
  const presolveSet = new Set(presolveLetters.split(""));
  const letterCountsObj = _getLetterCounts(normalized);
  const frequencyOrderArr = frequencyOrder
    .split("")
    .filter((letter) => !presolveSet.has(letter));
  const initialReplacementOrder =
    frequencyOrderArr.filter((letter) => letterCountsObj[letter] > 0).join("") +
    frequencyOrderArr
      .filter((letter) => letterCountsObj[letter] === 0)
      .join("");

  const letterCounts = Object.entries(letterCountsObj).filter(
    ([letter]) => !presolveSet.has(letter),
  );
  letterCounts.sort((a, b) => b[1] - a[1]);
  const mappingEntries = letterCounts
    .map(([letter], index) => [initialReplacementOrder[index], letter])
    .concat(presolveLetters.split("").map((letter) => [letter, letter]));
  mappingEntries.sort(([a], [b]) => a.localeCompare(b));
  const finalMapping = mappingEntries.map(([_, letter]) => letter).join("");
  return finalMapping;
};
