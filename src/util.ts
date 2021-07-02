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
