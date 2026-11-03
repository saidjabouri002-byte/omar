"use client";
import { useState } from "react";
import { Play } from "lucide-react";

/** Shows YouTube's thumbnail until the visitor presses play, so the heavy player only loads on demand. */
export function YouTubeFacade({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  if (playing)
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  return (
    <button className="vsl-facade" type="button" onClick={() => setPlaying(true)} aria-label={`تشغيل: ${title}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- remote thumbnail; next/image is unoptimized in static export */}
      <img
        src={`https://i.ytimg.com/vi_webp/${id}/sddefault.webp`}
        srcSet={`https://i.ytimg.com/vi_webp/${id}/sddefault.webp 640w, https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp 1280w`}
        sizes="(max-width: 700px) 100vw, 1040px"
        alt=""
        decoding="async"
      />
      <span className="vsl-facade-play" aria-hidden="true"><Play size={30} fill="currentColor" /></span>
    </button>
  );
}
