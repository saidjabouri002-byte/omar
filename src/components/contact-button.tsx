"use client";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { Mail, MessageCircle, UserRound, X, ArrowUpLeft } from "lucide-react";
import { useDialog } from "@/lib/use-dialog";
import contact from "@/lib/contact.json";
export function ContactButton() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  useDialog(open, close);
  const configured = Boolean(contact.email || contact.whatsapp);
  return <>
    <button type="button" className="button contact-gold-button" onClick={() => setOpen(true)}><MessageCircle size={19} /><span>تواصل معنا</span></button>
    {open && createPortal(<div className="modal-backdrop contact-backdrop" onClick={close}>
      <section className="contact-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-title" onClick={e => e.stopPropagation()}>
        <button className="contact-close" type="button" aria-label="إغلاق نموذج التواصل" onClick={close}><X size={21} /></button>
        <span className="contact-symbol"><MessageCircle size={27} strokeWidth={1.5} /></span>
        <h2 id="contact-title">لنتحدث عن مشروعك</h2><p>شاركنا بيانات التواصل لنناقش معك الخطوة المناسبة.</p>
        <form onSubmit={e => {
          e.preventDefault(); if (!configured) return;
          const data = new FormData(e.currentTarget);
          const body = `طلب تواصل من موقع نظام النمو\nالاسم: ${data.get("name")}\nالبريد الإلكتروني: ${data.get("email")}\nواتساب: ${data.get("whatsapp")}`;
          if (contact.whatsapp) window.location.assign(`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(body)}`);
          else window.location.assign(`mailto:${contact.email}?subject=${encodeURIComponent("طلب تواصل - نظام النمو")}&body=${encodeURIComponent(body)}`);
        }}>
          <label><span><UserRound size={16} />الاسم</span><input name="name" autoComplete="name" required maxLength={100} autoFocus placeholder="اسمك الكامل" /></label>
          <label><span><Mail size={16} />البريد الإلكتروني</span><input type="email" name="email" autoComplete="email" dir="ltr" required maxLength={180} placeholder="name@example.com" /></label>
          <label><span><MessageCircle size={16} />رقم الواتساب</span><input type="tel" name="whatsapp" autoComplete="tel" dir="ltr" required minLength={8} maxLength={25} pattern="[+0-9 ()-]{8,25}" placeholder="+966 5X XXX XXXX" /></label>
          <button type="submit" className="button contact-gold-button" disabled={!configured}><span>{contact.whatsapp ? "متابعة عبر واتساب" : "إرسال طلب التواصل"}</span><ArrowUpLeft size={19} /></button>
          <p className="contact-delivery-note">{!configured ? "سيتم تفعيل استقبال الطلبات قريباً." : contact.whatsapp ? "سيفتح واتساب برسالة جاهزة؛ راجعها واضغط إرسال." : "سيفتح تطبيق البريد برسالة جاهزة؛ راجعها واضغط إرسال."}</p>
        </form>
      </section>
    </div>, document.body)}
  </>;
}
