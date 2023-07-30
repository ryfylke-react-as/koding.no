import { ScrollHandler } from "@ryfylke-react/scroll-handler";
import { get } from "http";
import React from "react";
import { useMediaQuery } from "./useMediaQuery";

export function useScrollPercentBetween(opts: {
  after: number | React.MutableRefObject<HTMLElement>;
  before: number | React.MutableRefObject<HTMLElement>;
  target?: HTMLElement;
  getScrollTop?: () => number;
}): number {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );
  const [scroll, setScroll] = React.useState(0);

  React.useEffect(() => {
    const getScrollTop = () =>
      document.documentElement.scrollTop;
    const after =
      typeof opts.after === "number"
        ? opts.after
        : opts.after.current;
    const before =
      typeof opts.before === "number"
        ? opts.before
        : opts.before.current;
    const handler = new ScrollHandler({
      target: opts.target,
      getScrollTop: opts.getScrollTop ?? getScrollTop,
    }).between(after, before, (_, { getPercent }) => {
      setScroll(getPercent());
    });

    if (!prefersReducedMotion) {
      handler.enable();
    }

    return () => {
      handler.disable();
    };
  }, [prefersReducedMotion]);

  return scroll;
}
