export function shuffleArray<T>(sourceArray: T[]): T[] {
  const array = sourceArray.slice();
  for (let i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function choose<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function unique<T>(arr: T[]): T[] {
  function onlyUnique(value: T, index: number, self: T[]) {
    return self.indexOf(value) === index;
  }
  return arr.filter(onlyUnique);
}

export function isTouchscreen(): boolean {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
}

export function hrTime(millis: number): string {
  const seconds = millis / 1000;
  const levels: [number, string][] = [
    [Math.floor(seconds / 31536000), "y"],
    [Math.floor((seconds % 31536000) / 86400), "d"],
    [Math.floor(((seconds % 31536000) % 86400) / 3600), "h"],
    [Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), "m"],
    [(((seconds % 31536000) % 86400) % 3600) % 60, "s"],
  ];

  let returntext = "";

  for (var i = 0, max = levels.length; i < max; i++) {
    if (levels[i][0] === 0) continue;
    const num = levels[i][0];
    const numText = i !== levels.length - 1 ? num.toString() : num.toFixed(2);
    returntext += " " + numText + levels[i][1];
  }
  return returntext.trim();
}

// Encode string to base64, supporting UTF characters
export function encodeBase64(value: string) {
  const binArray = Array.from(new TextEncoder().encode(value));
  const binString = String.fromCodePoint(...binArray);
  return btoa(binString);
}

// Decode string from base64, supporting UTF characters
export function decodeBase64(base64: string) {
  const binString = atob(base64);
  const binArray = Uint8Array.from(binString, (m) => m.codePointAt(0)!);
  return new TextDecoder().decode(binArray);
}
