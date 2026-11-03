import Image from "next/image";
import { Film } from "lucide-react";

const previews = [1, 2, 3, 4];
export function Testimonials() {
  return (
    <section className="section testimonials-section" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="section-intro centered">
          <h2 id="testimonials-heading">ماذا يقول عملاؤنا؟</h2>
          <p>نماذج توضيحية لعرض الفيديوهات — ستضاف شهادات العملاء قريبًا.</p>
        </div>
        <div className="testimonials-grid">
          {previews.map((number) => (
            <figure className="testimonial-reel testimonial-template" key={number}>
              <div className="testimonial-video">
                <Image src={`/images/testimonial-previews/preview-${number}.webp`} alt={`صورة توضيحية لتصميم الفيديو ${number}، وليست فيديو قابلا للتشغيل`} fill sizes="(max-width:700px) 90vw, (max-width:1100px) 45vw, 25vw" />
                <span className="testimonial-template-badge">نموذج توضيحي</span>
                <div className="testimonial-template-gradient" aria-hidden="true" />
              </div>
              <figcaption className="testimonial-template-caption"><span className="testimonial-template-icon"><Film size={20} /></span><div><strong>تجارب تستحق أن تُروى</strong><span>الفيديو سيضاف قريبًا</span></div><span className="testimonial-template-index" aria-hidden="true">0{number}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
