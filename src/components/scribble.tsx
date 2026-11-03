import type { ReactNode } from "react";

export function Scribble({ children, color = "green" }: { children: ReactNode; color?: "red" | "green" }) {
  return <span className={`scribble scribble-${color}`}>
    <span>{children}</span>
    <svg viewBox="0 0 300 90" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M201 12 C146 1 39 9 13 34 C-15 62 47 83 143 82 C232 82 290 67 291 43 C292 20 236 7 170 6" />
      <path className="scribble-echo" d="M206 15 C146 5 43 12 17 36 C-7 60 48 79 143 79 C229 80 285 65 287 44" />
    </svg>
  </span>;
}
