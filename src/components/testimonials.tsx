import Image from "next/image";
import { MessageSquareQuote } from "lucide-react";

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

export function Testimonials() {
  return (
    <section className="section testimonials-section reviews-section" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="section-intro centered">
          <span className="reviews-kicker"><MessageSquareQuote size={17} />تعليقات حقيقية من أصحاب المشاريع</span>
          <h2 id="testimonials-heading">ماذا يقول عملاؤنا؟</h2>
          <p>كلمات نعتز بها من أصحاب مطاعم ومقاهٍ ومشاريع استفادوا من الاستشارة والتوجيه.</p>
        </div>
        <div className="reviews-wall">
          {reviews.map((r) => (
            <figure className="review-card" key={r.src}>
              <Image
                src={r.src}
                alt={`تعليق ${r.name} على الأستاذ عمر العسبلي`}
                width={r.w}
                height={r.h}
                sizes="(max-width:700px) 92vw, (max-width:1100px) 45vw, 360px"
              />
              <figcaption><span className="review-card-dot" />{r.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
