import { recordEvent } from "./tracking";

export const shareTime = (puzzleId: string, time: string) => {
  recordEvent("ss_facebook_share_click", {
    puzzleId,
    solveTime: time,
  });
  (window as any).FB.ui(
    {
      method: "share",
      href: window.location.href,
      quote: `I cracked puzzle #${puzzleId} in ${time} on Subsolver! Can you beat it?`,
    },
    function (response: any) {}
  );
};

export const cameFromFacebook = () => {
  return document.referrer?.indexOf("facebook") >= 0;
};
