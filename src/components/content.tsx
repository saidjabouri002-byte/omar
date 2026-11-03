import { Fragment } from "react";
import { ArrowUpLeft, Check, X } from "lucide-react";
export function Inline({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/(\*\*.*?\*\*|\*[^*]+\*)/g)
        .map((v, i) =>
          v.startsWith("**") ? (
            <strong key={i}>{v.slice(2, -2)}</strong>
          ) : v.startsWith("*") ? (
            <em key={i}>{v.slice(1, -1)}</em>
          ) : (
            <Fragment key={i}>{v}</Fragment>
          ),
        )}
    </>
  );
}
export function CTA({
  children = "اكتشف فرص نمو مشروعك مجانا",
  light = false,
}: {
  children?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <a
      className={`button ${light ? "button-light" : ""} ${children === "اكتشف فرص نمو مشروعك مجانا" ? "button-whatsapp-green" : ""}`}
      href="#audit"
    >
      <span>{children}</span>
      <ArrowUpLeft size={20} />
    </a>
  );
}
export function Copy({
  text,
  omitTitle = false,
  cardTitle = false,
  negative = false,
}: {
  text: string;
  omitTitle?: boolean;
  cardTitle?: boolean;
  negative?: boolean;
}) {
  const ListIcon = negative ? X : Check;
  const blocks = text.trim().split(/\n\s*\n/);
  return (
    <div className="copy">
      {blocks.map((block, i) => {
        if (omitTitle && i === 0 && block.startsWith("#")) return null;
        if (/^\*\*\[.*\]\*\*$/.test(block))
          return <CTA key={i}>{block.slice(3, -3)}</CTA>;
        if (block.startsWith("- ") || /^\d+\. /.test(block))
          return (
            <ul key={i}>
              {block.split("\n").map((l, j) => (
                <li key={j}>
                  <ListIcon size={15} />
                  <span>
                    <Inline text={l.replace(/^(?:- |\d+\. )/, "")} />
                  </span>
                </li>
              ))}
            </ul>
          );
        if (
          cardTitle &&
          i === 0 &&
          block.startsWith("**") &&
          block.endsWith("**")
        )
          return (
            <h3 key={i}>
              <Inline text={block.slice(2, -2)} />
            </h3>
          );
        if (block.startsWith("#")) {
          const level = block.match(/^#+/)![0].length;
          const t = block.replace(/^#+ /, "");
          return level <= 2 ? (
            <h3 key={i}>
              <Inline text={t} />
            </h3>
          ) : (
            <h4 key={i}>
              <Inline text={t} />
            </h4>
          );
        }
        return (
          <p
            key={i}
            className={block.startsWith("[") ? "placeholder-copy" : undefined}
          >
            <Inline text={block} />
          </p>
        );
      })}
    </div>
  );
}
export function Eyebrow({
  children,
  number,
}: {
  children: React.ReactNode;
  number?: string;
}) {
  return (
    <div className="eyebrow">
      {number && <span className="eyebrow-number">{number}</span>}
      <span>{children}</span>
    </div>
  );
}
