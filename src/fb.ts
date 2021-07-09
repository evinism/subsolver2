export const shareTime = (puzzleId: string, time: string) => {
  (window as any).FB.ui(
    {
      method: "share",
      href: window.location.href.replace(/#.*/, "") + `#puzzle:${puzzleId}`,
      quote: `I cracked puzzle #${puzzleId} in ${time} on Subsolver! Can you beat it?`,
    },
    function (response: any) {}
  );
};

export const cameFromFacebook = () => {
  return document.referrer?.indexOf("facebook") >= 0;
};
