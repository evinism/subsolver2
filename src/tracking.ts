export function ga(...args: any[]) {
  const windowGa = (window as any).ga;
  if (windowGa) {
    windowGa(...args);
  }
}
