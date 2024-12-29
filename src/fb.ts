import { recordEvent } from "./tracking";

export const shareTime = (puzzleId: string, time: string) => {
  recordEvent("ss_facebook_share_click", {
    puzzleId: puzzleId || "custom",
    solveTime: time,
  });
  (window as any).FB.ui(
    {
      method: "share",
      href: window.location.href,
      quote: `I cracked ${puzzleId ? `puzzle #${puzzleId}` : "custom puzzle"} in ${time} on Subsolver! Can you beat it?`,
    },
    function (response: any) {}
  );
};

export const cameFromFacebook = () => {
  return document.referrer?.indexOf("facebook") >= 0;
};
