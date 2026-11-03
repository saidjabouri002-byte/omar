import Image from "next/image";

export function ConsultantPortrait() {
  return (
    <div className="consultant-portrait-shell">
      <div className="consultant-portrait-image">
      <Image className="consultant-portrait-photo" src="/images/omar-al-osbali.webp" alt="عمر العسبلي، المدير العام" width={920} height={1150} sizes="(max-width:700px) 85vw, 455px" />
      </div>
      <div className="consultant-portrait-caption">
        <span>خبرة في التسويق والمبيعات</span>
        <span>وضوح في الرؤية. التزام في العمل.</span>
      </div>
    </div>
  );
}
