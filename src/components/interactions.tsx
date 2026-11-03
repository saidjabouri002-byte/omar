"use client";
import { BrandLogo } from "@/components/brand-logo";
import { useCallback, useState } from "react";
import { useDialog } from "@/lib/use-dialog";
import { motion, useReducedMotion } from "motion/react";
import {
  X,
  ArrowUpLeft,
  Plus,
  Minus,
  Check,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { Copy } from "./content";
import { PillarVisual } from "./illustrations";
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { y: 14 }}
      whileInView={reduce ? {} : { y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 1] }}
      viewport={{ once: true, amount: 0.06 }}
    >
      {children}
    </motion.div>
  );
}
export function Header() {
  return (
    <header className="site-header logo-only-header">
      <div className="container nav centered-logo-header">
        <a href="#" className="brand" aria-label="نظام النمو — الصفحة الرئيسية">
          <BrandLogo />
        </a>
      </div>
    </header>
  );
}
export function Pillars({ parts }: { parts: string[] }) {
  const [active, setActive] = useState(0);
  const titles = [
    "جذب العملاء",
    "رفع قيمة الطلب",
    "عودة العملاء",
    "تحسين الربحية",
  ];
  return (
    <div className="pillar-experience">
      <div className="pillar-tabs" role="tablist" aria-label="ركائز النمو">
        {titles.map((title, i) => (
          <button
            key={title}
            role="tab"
            id={`pillar-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`pillar-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
                e.preventDefault();
                const n =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? 3
                      : (active + (e.key === "ArrowLeft" ? 1 : 3)) % 4;
                setActive(n);
                document.getElementById(`pillar-tab-${n}`)?.focus();
              }
            }}
          >
            <span>0{i + 1}</span>
            {title}
            <span className="tab-check">
              {active === i ? <ArrowUpLeft size={18} /> : <Plus size={16} />}
            </span>
          </button>
        ))}
      </div>
      <div
        className="pillar-panel"
        role="tabpanel"
        id={`pillar-panel-${active}`}
        aria-labelledby={`pillar-tab-${active}`}
        tabIndex={0}
      >
        <div key={active} className="pillar-copy">
          <Copy text={parts[active]} />
        </div>
        <PillarVisual index={active} />
      </div>
      <div className="pillar-flow">
        {titles.map((t, i) => (
          <span key={t}>
            {i > 0 && <ArrowLeft size={15} />}
            <span>{t}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
export function Roadmap({ parts }: { parts: string[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="roadmap">
      <div className="timeline-tabs" role="tablist" aria-label="مراحل البرنامج">
        {["01 — 14", "15 — 30", "31 — 60", "61 — 90"].map((day, i) => (
          <button
            key={day}
            id={`phase-tab-${i}`}
            role="tab"
            aria-selected={active === i}
            aria-controls={`phase-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
                e.preventDefault();
                const n =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? 3
                      : (active + (e.key === "ArrowLeft" ? 1 : 3)) % 4;
                setActive(n);
                document.getElementById(`phase-tab-${n}`)?.focus();
              }
            }}
          >
            <span className="timeline-dot">
              {i < active ? <Check size={14} /> : i + 1}
            </span>
            <span dir="ltr" className="phase-days">
              {day}
            </span>
            <small>
              {
                [
                  "التشخيص",
                  "التحسينات الأولى",
                  "بناء النظام",
                  "القياس والتطوير",
                ][i]
              }
            </small>
          </button>
        ))}
      </div>
      <div
        className="roadmap-panel"
        role="tabpanel"
        id={`phase-panel-${active}`}
        aria-labelledby={`phase-tab-${active}`}
        tabIndex={0}
      >
        <div className="phase-number" aria-hidden="true">
          0{active + 1}
          <span>من الفهم إلى الأثر</span>
        </div>
        <div key={active}>
          <Copy text={parts[active]} />
        </div>
      </div>
      <span className="timeline-help">
        <ChevronDown size={15} /> اختر أي مرحلة لاستكشاف الأنشطة والمخرجات كاملة
      </span>
    </div>
  );
}
export function FAQ({ items }: { items: string[] }) {
  return (
    <div className="faq-list">
      {items.map((item, i) => {
        const [title, ...rest] = item.trim().split("\n");
        return (
          <details key={i}>
            <summary>
              <span className="faq-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{title.replace(/^### /, "")}</span>
              <Plus className="faq-plus" size={20} />
              <Minus className="faq-minus" size={20} />
            </summary>
            <div className="faq-answer">
              <Copy text={rest.join("\n")} />
            </div>
          </details>
        );
      })}
    </div>
  );
}
export function Legal() {
  const [panel, setPanel] = useState<string | null>(null);
  const close = useCallback(() => setPanel(null), []);
  useDialog(!!panel, close);
  return (
    <>
      <div className="footer-links">
        {["سياسة الخصوصية", "وسائل التواصل", "بيانات المنشأة"].map((x) => (
          <button key={x} onClick={() => setPanel(x)}>
            {x}
            <ArrowUpLeft size={14} />
          </button>
        ))}
      </div>
      {panel && (
        <div className="modal-backdrop" onClick={() => setPanel(null)}>
          <section
            role="dialog"
            aria-modal="true"
            aria-label={panel}
            className="legal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              autoFocus
              className="dialog-close"
              onClick={() => setPanel(null)}
              aria-label="إغلاق"
            >
              <X />
            </button>
            <h3>{panel}</h3>
            <p>
              {panel === "سياسة الخصوصية"
                ? "[توضع هنا سياسة الخصوصية المعتمدة وبيانات الجهة المسؤولة عن معالجة البيانات.] التقييم الحالي يعمل في متصفحك ولا يرسل الإجابات إلى خادم. عند تنزيل التقرير، يحفظ ملف على جهازك."
                : panel === "وسائل التواصل"
                  ? "[يضاف هنا البريد الإلكتروني ورقم التواصل ورابط حجز الاستشارة بعد اعتماد بيانات المستشار.]"
                  : "[يضاف هنا اسم المنشأة، رقم السجل التجاري، العنوان الوطني، والبيانات النظامية المعتمدة في المملكة العربية السعودية.]"}
            </p>
            <button className="button" onClick={() => setPanel(null)}>
              إغلاق
            </button>
          </section>
        </div>
      )}
    </>
  );
}
