"use client";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Expand, MessageSquareQuote, X } from "lucide-react";
import { useDialog } from "@/lib/use-dialog";

const reviews = [
  { src: "/images/testimonials/review-1.webp", w: 818, h: 384, name: "Dr.Saeed" },
  { src: "/images/testimonials/review-2.webp", w: 818, h: 566, name: "أبو إبراهيم" },
  { src: "/images/testimonials/review-3.webp", w: 817, h: 505, name: "Ahmed Abdellahi" },
  { src: "/images/testimonials/review-4.webp", w: 817, h: 322, name: "Saeedonly" },
  { src: "/images/testimonials/review-5.webp", w: 815, h: 384, name: "najdan.sa" },
  { src: "/images/testimonials/review-6.webp", w: 815, h: 393, name: "مراحل الديكور" },
  { src: "/images/testimonials/review-7.webp", w: 828, h: 452, name: "صالح مستور" },
  { src: "/images/testimonials/review-8.webp", w: 817, h: 380, name: "Mohammed" },
  { src: "/images/testimonials/review-9.webp", w: 797, h: 484, name: "zuhairart" },
];

const alt = (name: string) => `تعليق ${name} على الأستاذ عمر العسبلي`;

type Preview = { index: number; left: number };

export function Testimonials() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  useDialog(open !== null, close);

  // Desktop only: show the full review image floating above the hovered card.
  const showPreview = (index: number, card: HTMLElement) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const w = wrap.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    const width = Math.min(520, w.width - 32);
    const center = c.left - w.left + c.width / 2;
    const left = Math.max(16, Math.min(w.width - width - 16, center - width / 2));
    setPreview({ index, left });
  };

  const card = (r: (typeof reviews)[number], i: number, clone: boolean) => (
    <li className="review-slide" key={`${clone ? "b" : "a"}-${r.src}`} aria-hidden={clone || undefined}>
      <button
        type="button"
        className="review-card review-card-button"
        tabIndex={clone ? -1 : 0}
        onMouseEnter={(e) => showPreview(i, e.currentTarget)}
        onMouseLeave={() => setPreview(null)}
        onFocus={(e) => showPreview(i, e.currentTarget)}
        onBlur={() => setPreview(null)}
        onClick={() => { setPreview(null); setOpen(i); }}
        aria-label={`عرض ${alt(r.name)} كاملا`}
      >
        <span className="review-card-image">
          <Image src={r.src} alt={clone ? "" : alt(r.name)} width={r.w} height={r.h} sizes="320px" />
        </span>
        <span className="review-card-caption">
          <span className="review-card-dot" />
          {r.name}
          <Expand size={14} className="review-card-expand" aria-hidden="true" />
        </span>
      </button>
    </li>
  );

  const current = open !== null ? reviews[open] : null;
  const hovered = preview ? reviews[preview.index] : null;

  return (
    <section className="section testimonials-section reviews-section" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="section-intro centered">
          <span className="reviews-kicker"><MessageSquareQuote size={17} />تعليقات حقيقية من أصحاب المشاريع</span>
          <h2 id="testimonials-heading">ماذا يقول عملاؤنا؟</h2>
          <p>كلمات نعتز بها من أصحاب مطاعم ومقاهٍ ومشاريع استفادوا من الاستشارة والتوجيه.</p>
        </div>
      </div>
      <div className="reviews-marquee-wrap" ref={wrapRef}>
        <div className={`reviews-marquee${preview ? " is-paused" : ""}`}>
          <ul className="reviews-track">
            {reviews.map((r, i) => card(r, i, false))}
            {reviews.map((r, i) => card(r, i, true))}
          </ul>
        </div>
        {hovered && preview && (
          <div className="review-hover-preview" style={{ left: preview.left }} aria-hidden="true">
            <Image src={hovered.src} alt="" width={hovered.w} height={hovered.h} sizes="520px" />
            <span><span className="review-card-dot" />{hovered.name}</span>
          </div>
        )}
      </div>
      <p className="reviews-hint">اضغط على أي تعليق لعرضه كاملا</p>
      {current && (
        <div className="review-lightbox" role="dialog" aria-modal="true" aria-label={alt(current.name)} onClick={close}>
          <figure onClick={(e) => e.stopPropagation()}>
            <button type="button" className="review-lightbox-close" onClick={close} aria-label="إغلاق" autoFocus>
              <X size={20} />
            </button>
            <Image src={current.src} alt={alt(current.name)} width={current.w} height={current.h} sizes="(max-width:700px) 94vw, 760px" />
            <figcaption><span className="review-card-dot" />{current.name}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
