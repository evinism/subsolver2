import {alphabet, frequencyOrder} from './constants';

const _normalizeText = (text: string) => text.toLowerCase().replace(/[^a-z]/g, '')

export const applyMapping = (text: string, mapping: string) =>
  _normalizeText(text)
    .split('')
    .map(letter => mapping[alphabet.indexOf(letter)])
    .join('');

export const swapLetters = (mapping: string, a: string, b: string) => {
  const newMapping = mapping.split('');
  const aPos = newMapping.indexOf(a);
  const bPos = newMapping.indexOf(b);
  const temp = newMapping[aPos];
  newMapping[aPos] = newMapping[bPos];
  newMapping[bPos] = temp;
  return (newMapping.join(''));
}

const _getLetterCounts = (normalizedText: string) => {
  const counts = Object.fromEntries(alphabet.split('').map(letter => [letter, 0]))
  for (let i = 0; i < normalizedText.length; i++){
    counts[normalizedText[i]]++;
  }
  return counts;
}

export const findInitialMapping = (text: string) => {
  const normalized = _normalizeText(text);
  const letterCounts = Object.entries(_getLetterCounts(normalized));
  letterCounts.sort((a, b) => b[1] - a[1]);
  const mappingEntries = letterCounts.map(
    ([letter], index) => [frequencyOrder[index], letter]);
  mappingEntries.sort(([a], [b]) => a.localeCompare(b));
  const finalMapping = mappingEntries.map(([_, letter]) => letter).join('');
  return finalMapping;
}