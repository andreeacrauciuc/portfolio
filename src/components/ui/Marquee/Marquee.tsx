import type { CSSProperties } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/cn";
import type { Technology } from "@/types/content";
import styles from "./Marquee.module.css";

interface MarqueeProps {
  items: readonly Technology[];
  /** Accessible name of the readable list. */
  label: string;
}

interface LogoListProps {
  items: readonly Technology[];
  label?: string;
}

function getItemStyle(index: number, color?: string): CSSProperties {
  return { "--index": index, "--logo-color": color } as CSSProperties;
}

function LogoList({ items, label }: LogoListProps) {
  const isDuplicate = label === undefined;
  return (
    <ul
      className={cn(styles.list, isDuplicate && styles.duplicate)}
      aria-label={label}
      aria-hidden={isDuplicate || undefined}
    >
      {items.map(({ name, icon: Icon, color }, index) => (
        <li key={name} className={styles.item} style={getItemStyle(index, color)}>
          <span className={styles.bob}>
            <Icon className={styles.logo} role="img" title={name} aria-label={name} />
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Marquee({ items, label }: MarqueeProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={cn(styles.marquee, isInView && styles.visible)}>
      <div className={styles.track}>
        <LogoList items={items} label={label} />
        <LogoList items={items} />
      </div>
    </div>
  );
}
