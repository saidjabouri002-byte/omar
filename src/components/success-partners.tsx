"use client";
import { type CSSProperties } from "react";
import Image from "next/image";
import partners from "@/lib/partners.json";
type Partner = { name: string; logo: string; width: number; height: number; bounds: number[] };

export function SuccessPartners() {
  const logos = partners as Partner[];
  return (
    <section className="section success-partners" id="partners" aria-labelledby="partners-heading">
      <div className="container">
        <div className="section-intro centered"><h2 id="partners-heading">شركاء النجاح</h2><p className="partners-description">نفخر بثقة الشركات والعلامات التجارية التي اخترنا أن نكون جزءًا من رحلة نموها ونجاحها</p></div>
        {logos.length > 0 ? <>
          <div className="partner-marquee">
            <div className="partner-track">
              {[0, 1].map(copy => <ul className="partner-logo-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                {logos.map(partner => {
                  const [left, top, right, bottom] = partner.bounds;
                  const width = right - left;
                  const height = bottom - top;
                  const ratio = width / height;
                  return <li key={partner.name}>
                    <span className="partner-logo-viewport" style={{
                      "--logo-width": `${Math.min(190, 100 * ratio)}px`,
                      aspectRatio: ratio,
                    } as CSSProperties}>
                      <Image src={partner.logo} alt={copy === 0 ? partner.name : ""} width={partner.width} height={partner.height}
                        draggable={false} loading="eager"
                        style={{ width: `${partner.width / width * 100}%`, height: `${partner.height / height * 100}%`, left: `${-left / width * 100}%`, top: `${-top / height * 100}%` }} />
                    </span>
                  </li>;
                })}
              </ul>)}
            </div>
          </div>
        </> : <p className="partners-coming-soon">شعارات شركاء النجاح ستضاف قريبا.</p>}
      </div>
    </section>
  );
}
