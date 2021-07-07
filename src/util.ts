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
    navigator.msMaxTouchPoints > 0
  );
}

export function hrTime(millis: number): string {
  const seconds = millis / 1000;
  var levels: [number, string][] = [
    [Math.floor(seconds / 31536000), "y"],
    [Math.floor((seconds % 31536000) / 86400), "d"],
    [Math.floor(((seconds % 31536000) % 86400) / 3600), "h"],
    [Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), "m"],
    [(((seconds % 31536000) % 86400) % 3600) % 60, "s"],
  ];
  var returntext = "";

  for (var i = 0, max = levels.length; i < max; i++) {
    if (levels[i][0] === 0) continue;
    returntext += " " + levels[i][0] + levels[i][1];
  }
  return returntext.trim();
}
