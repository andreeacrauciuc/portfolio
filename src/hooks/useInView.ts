import { useEffect, useRef, useState, type RefObject } from "react";
import { IN_VIEW_THRESHOLD } from "@/lib/constants";

interface InViewResult<T extends Element> {
  ref: RefObject<T>;
  /** Latches to true the first time the element enters the viewport. */
  isInView: boolean;
}

export function useInView<T extends Element>(
  threshold = IN_VIEW_THRESHOLD,
): InViewResult<T> {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, isInView };
}
