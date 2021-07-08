export const shareTime = (puzzleId: string, time: string) => {
  (window as any).FB.ui(
    {
      method: "share",
      href: window.location.href.replace(/#.*/, "") + `#puzzle:${puzzleId}`,
      quote: `I got a time of ${time} on Subsolver!`,
    },
    function (response: any) {}
  );
};

export const cameFromFacebook = () => {
  return !!((window as any).features || {}).fb;
};
