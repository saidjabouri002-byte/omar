import Image from "next/image";

export function ProfitGrowth() {
  return (
    <figure className="growth-photo-card">
      <Image src="/images/planned-growth.webp" alt="نمو مدروس. ربحية أفضل." width={1200} height={675} sizes="(max-width: 800px) 100vw, 560px" />
    </figure>
  );
}
