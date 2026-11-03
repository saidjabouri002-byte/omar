"use client";
import Image from "next/image";
import {
  ArrowUpLeft,
  Coffee,
  Users,
  ReceiptText,
  Repeat2,
  TrendingUp,
  MapPin,
  Heart,
  Sparkles,
} from "lucide-react";
export function GrowthIllustration() {
  return (
    <div
      className="growth-art"
      role="img"
      aria-label="رسم توضيحي: جذب العملاء ورفع قيمة الطلب وتكرار الزيارات تدعم ربحية المطعم"
    >
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <span className="art-spark spark-a">✦</span>
      <span className="art-spark spark-b">✧</span>
      <div className="art-label">
        <span className="live-dot" /> كل فرصة صغيرة… تصنع فرقا
      </div>
      <svg
        className="art-connectors"
        viewBox="0 0 600 590"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M100 145C55 260 150 290 235 300M470 170C550 260 480 330 395 340M160 450C220 540 420 510 460 420"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 7"
        />
        <path
          d="m227 289 11 12-17 6m180 24-10 10 14 6"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <div className="floating-note acquisition">
        <div className="note-icon">
          <Users size={21} />
        </div>
        <div>
          <small>الركيزة الأولى</small>
          <strong>عملاء جدد</strong>
        </div>
        <span className="note-arrow">
          <ArrowUpLeft size={18} />
        </span>
      </div>
      <div className="storefront">
        <div className="store-roof">
          <span>مـشـروعـك</span>
          <Coffee size={24} />
        </div>
        <div className="awning">
          {Array.from({ length: 7 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
        <div className="store-body">
          <div className="shop-window">
            <span>أهلا بك</span>
            <div className="window-line" />
            <Coffee size={36} strokeWidth={1} />
            <div className="window-line" />
          </div>
          <div className="shop-door">
            <span />
            <i />
          </div>
        </div>
        <div className="store-step" />
        <div className="store-plant">
          <i />
          <b />
          <b />
        </div>
      </div>
      <div className="receipt">
        <div className="receipt-head">
          <ReceiptText size={18} />
          <span>قيمة كل طلب</span>
        </div>
        <span className="receipt-line" />
        <span className="receipt-line short" />
        <div className="receipt-combo">
          <Coffee size={22} />
          <span>+</span>
          <svg width="25" height="23" viewBox="0 0 30 25" fill="none">
            <path
              d="M3 20 15 3l12 17H3Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="M8 14h14M11 9h8" stroke="currentColor" />
          </svg>
        </div>
        <div className="receipt-total">
          قيمة أفضل <ArrowUpLeft size={17} />
        </div>
      </div>
      <div className="loyalty">
        <div className="loyalty-head">
          <Heart size={17} />
          <small>زيارة أولى. علاقة تدوم.</small>
        </div>
        <div className="stamps">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className={i < 4 ? "filled" : ""}>
              <Coffee size={14} />
            </span>
          ))}
        </div>
        <strong>
          عميل يعود إليك <Repeat2 size={18} />
        </strong>
      </div>
      <div className="profit-note">
        <TrendingUp size={20} />
        <span>نمو أذكى. ربحية أفضل.</span>
      </div>
      <span className="art-caption">
        تصور توضيحي لنظام النمو — وليس نتائج فعلية
      </span>
    </div>
  );
}
export function PillarVisual({ index }: { index: number }) {
  const illustratedPillars = [
    {
      src: "/images/acquisition-channels-transparent.webp",
      alt: "قنوات جذب العملاء: البحث المحلي، المحتوى، التوصيات، الشراكات والإعلانات تتكامل لجذب العملاء إلى المطعم",
      caption: "مصادر متنوعة. فرص أكثر.",
    },
    {
      src: "/images/order-value-transparent.webp",
      alt: "رفع متوسط قيمة الطلب عبر تطوير القائمة، الباقات، البيع الإضافي وتوصيات الفريق مع مراعاة الربحية",
      caption: "كل طلب يحمل فرصة.",
    },
  ];
  const illustration = illustratedPillars[index];
  if (illustration)
    return (
      <figure className="pillar-image-visual">
        <Image
          src={illustration.src}
          width={1400}
          height={933}
          alt={illustration.alt}
          sizes="(max-width:700px) 100vw, (max-width:1000px) 90vw, 700px"
        />
        <figcaption>{illustration.caption}</figcaption>
      </figure>
    );
  const Icons = [MapPin, ReceiptText, Repeat2, TrendingUp];
  const Icon = Icons[index];
  return (
    <div className={`pillar-art pillar-art-${index}`} aria-hidden="true">
      <div className="pillar-orbit" />
      <span className="pillar-mini mini-one">
        {index === 0 ? (
          <Users />
        ) : index === 1 ? (
          <Coffee />
        ) : index === 2 ? (
          <Heart />
        ) : (
          <ReceiptText />
        )}
      </span>
      <div className="pillar-main">
        <Icon size={54} strokeWidth={1.1} />
      </div>
      <span className="pillar-mini mini-two">
        {index === 0 ? (
          <MapPin />
        ) : index === 1 ? (
          <Sparkles />
        ) : index === 2 ? (
          <Coffee />
        ) : (
          <TrendingUp />
        )}
      </span>
      <div className="pillar-visual-label">
        {
          [
            "مصادر متنوعة. فرص أكثر.",
            "كل طلب يحمل فرصة.",
            "الزيارة التالية تبدأ اليوم.",
            "المبيعات بداية. الربحية هدف.",
          ][index]
        }
      </div>
    </div>
  );
}
