import Image from "next/image";

export function BrandLogo() {
  return <span className="brand-logo-surface"><Image src="/images/mulham-logo.svg" alt="شركة ملهم للحلول التسويقية" width={370} height={170} className="brand-logo-image" priority /></span>;
}
