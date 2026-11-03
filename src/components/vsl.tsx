import Image from "next/image";
import media from "@/lib/media.json";
import { Film, ArrowUpLeft } from "lucide-react";

/** A missing video is an honest poster, never a simulated playable control. */
export function VSL() {
  const source = process.env.NEXT_PUBLIC_VSL_URL?.trim() || media.vsl;
  let embed: string | null = null;
  let direct: string | null = null;
  if (source) {
    try {
      const url = new URL(source);
      if (url.protocol === "https:") {
        const host = url.hostname.replace(/^www\./, "");
        if (host === "youtube.com" || host === "youtu.be") {
          const id =
            host === "youtu.be"
              ? url.pathname.slice(1)
              : url.searchParams.get("v") || url.pathname.split("/embed/")[1];
          if (id && /^[\w-]{11}$/.test(id))
            embed = `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
        } else if (host === "vimeo.com") {
          const id = url.pathname.split("/").filter(Boolean).pop();
          if (id && /^\d+$/.test(id))
            embed = `https://player.vimeo.com/video/${id}?dnt=1`;
        } else if (/\.(mp4|webm)$/i.test(url.pathname)) direct = url.href;
      }
    } catch {
      /* Invalid configuration keeps the honest unavailable state. */
    }
  }
  return (
    <div
      className="vsl-frame"
      id="program-video"
      aria-label="الفيديو التعريفي بالبرنامج"
    >
      <div className="vsl-screen">
        {embed ? (
          <iframe
            src={embed}
            title="الفيديو التعريفي بنظام نمو المطاعم والمقاهي"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : direct ? (
          <video
            controls
            playsInline
            preload="metadata"
            poster="/images/riyadh-dining.webp"
            aria-label="الفيديو التعريفي بنظام نمو المطاعم والمقاهي"
          >
            <source src={direct} />
            {process.env.NEXT_PUBLIC_VSL_CAPTIONS_URL && (
              <track
                kind="captions"
                src={process.env.NEXT_PUBLIC_VSL_CAPTIONS_URL}
                srcLang="ar"
                label="العربية"
              />
            )}
            متصفحك لا يدعم تشغيل الفيديو.
          </video>
        ) : (
          <>
            <Image
              src="/images/riyadh-dining.webp"
              alt="مساحة مطعم بإطلالة على الرياض"
              fill
              priority
              sizes="(max-width: 700px) 100vw, 1040px"
              className="vsl-poster"
            />
            <div className="vsl-shade" />
            <div className="vsl-poster-top">
              <span>منهجية النمو المستدام</span>
              <span>الرياض · المطاعم والمقاهي</span>
            </div>
            <div className="vsl-unavailable">
              <span className="vsl-film">
                <Film size={29} strokeWidth={1} />
              </span>
              <span className="vsl-eyebrow">الفيديو التعريفي بالبرنامج</span>
              <p>
                من فرص متفرقة…
                <br />
                <strong>إلى نظام نمو متكامل.</strong>
              </p>
              <span className="vsl-coming">سيضاف فيديو البرنامج هنا قريبا</span>
            </div>
            <span className="vsl-photo-caption">
              صورة توضيحية للقطاع، وليست لأحد عملاء البرنامج
            </span>
          </>
        )}
      </div>
      {source && <a className="vsl-external-link" href={source} target="_blank" rel="noopener noreferrer">شاهد الفيديو في نافذة جديدة <ArrowUpLeft size={15} /></a>}
      <div className="vsl-footer">
        <span>
          <span className="vsl-gold-dot" />
          أربعة محركات للنمو. خطة واحدة لمدة 90 يوما.
        </span>
        <a href="#audit">
          ابدأ بتقييم مشروعك <ArrowUpLeft size={15} />
        </a>
      </div>
    </div>
  );
}
