"use client";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { Download, Mail, UserRound, X, Check } from "lucide-react";
import { useDialog } from "@/lib/use-dialog";
const guide = "/downloads/restaurant-growth-guide-ar.pdf";
export function EbookDownload() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  useDialog(open, close);
  return <>
    <button className="button ebook-download" type="button" onClick={() => { setReady(false); setOpen(true); }}><span>حمّل دليلك المجاني</span><Download size={20} /></button>
    {open && createPortal(<div className="modal-backdrop contact-backdrop" onClick={close}>
      <section className="contact-dialog ebook-lead-dialog" role="dialog" aria-modal="true" aria-labelledby="ebook-form-title" onClick={e => e.stopPropagation()}>
        <button className="contact-close" type="button" aria-label="إغلاق نموذج تحميل الدليل" onClick={close}><X size={21} /></button>
        <span className="contact-symbol"><Download size={27} strokeWidth={1.5} /></span>
        <h2 id="ebook-form-title">دليلك المجاني بخطوة واحدة</h2>
        {!ready ? <><p>أدخل اسمك وبريدك الإلكتروني للحصول على دليلك المجاني.</p>
          <form onSubmit={e => { e.preventDefault(); setReady(true); }}>
            <label><span><UserRound size={16} />الاسم</span><input name="name" autoComplete="name" required maxLength={100} autoFocus placeholder="اسمك الكامل" /></label>
            <label><span><Mail size={16} />البريد الإلكتروني</span><input type="email" name="email" autoComplete="email" dir="ltr" required maxLength={180} placeholder="name@example.com" /></label>
            <button className="button ebook-download" type="submit"><span>احصل على دليلك المجاني</span><Download size={19} /></button>
            <p className="contact-delivery-note">التحميل متاح هنا مباشرة، ولا يُرسل الدليل بالبريد حالياً. لا يتم حفظ بياناتك أو إرسالها.</p>
          </form></> : <div className="ebook-download-ready" role="status"><span className="ebook-ready-check"><Check size={26} /></span><p>دليلك جاهز للتحميل</p><a className="button ebook-download" href={guide} download="دليل-نمو-المطاعم.pdf"><span>تحميل الدليل PDF</span><Download size={19} /></a><p className="contact-delivery-note">نتمنى لك قراءة مفيدة وخطوات نمو موفقة.</p></div>}
      </section>
    </div>, document.body)}
  </>;
}
