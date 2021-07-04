export function recordEvent(
  name: string,
  eventParameters: { [key: string]: string } = {}
) {
  const gtag = (window as any).gtag;
  try {
    gtag("event", name, eventParameters);
  } catch (e) {
    console.error("Couldn't send gtag event!");
  }
}
