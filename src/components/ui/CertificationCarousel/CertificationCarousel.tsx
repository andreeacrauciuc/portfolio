import { useRef, useState, type PointerEvent } from "react";
import type { Certification } from "@/types/content";
import styles from "./CertificationCarousel.module.scss";

interface CertificationCarouselProps {
  items: readonly Certification[];
}

const SWIPE_THRESHOLD = 48;

export function CertificationCarousel({ items }: CertificationCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const startX = useRef<number | null>(null);

  if (items.length === 0) return null;

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + items.length) % items.length);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const distance = event.clientX - startX.current;
    startX.current = null;
    if (Math.abs(distance) >= SWIPE_THRESHOLD) move(distance < 0 ? 1 : -1);
  };

  return (
    <div className={styles.carousel} aria-label="Courses and certifications">
      <div
        className={styles.viewport}
        onPointerDown={(event) => {
          startX.current = event.clientX;
        }}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          startX.current = null;
        }}
      >
        <div
          className={styles.track}
          style={{ transform: `translateX(-${String(activeIndex * 100)}%)` }}
        >
          {items.map((item) => (
            <div className={styles.slide} key={item.id}>
              <article className={styles.card}>
                <div className={styles.content}>
                  <div className={styles.date}>{item.completedAt}</div>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.provider}>{item.provider}</p>
                  <p className={styles.description}>{item.description}</p>
                </div>
                <div className={styles.controls}>
                  <div className={styles.counter} aria-live="polite">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(items.length).padStart(2, "0")}
                  </div>
                  <div className={styles.buttons}>
                    <button
                      className={styles.button}
                      type="button"
                      onClick={() => {
                        move(-1);
                      }}
                      aria-label="Previous course"
                    >
                      ←
                    </button>
                    <button
                      className={styles.button}
                      type="button"
                      onClick={() => {
                        move(1);
                      }}
                      aria-label="Next course"
                    >
                      →
                    </button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
