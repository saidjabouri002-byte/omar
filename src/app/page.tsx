import { ContactButton } from "@/components/contact-button";
import {
  Activity,
  ArrowUpLeft,
  BadgePercent,
  Binoculars,
  ConciergeBell,
  ReceiptText,
  ScanSearch,
  UserRoundX,
  BookOpenCheck,
  ChartNoAxesCombined,
  Check,
  ClipboardCheck,
  Target,
  HeartHandshake,
  Lightbulb,
  Megaphone,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import { VSL } from "@/components/vsl";
import { ConsultantPortrait } from "@/components/consultant-portrait";
import consultant from "@/lib/consultant.json";
import source from "@/lib/content.json";
import { Copy, CTA, Eyebrow } from "@/components/content";
import { Scribble } from "@/components/scribble";
import { Testimonials } from "@/components/testimonials";
import {
  FAQ,
  Header,
  Reveal,
} from "@/components/interactions";
import { SiteFooter } from "@/components/site-footer";
import { Assessment } from "@/components/assessment";
const programItems = [
  { title: "تشخيص تسويقي بالأرقام", description: "نحلل مبيعاتك وقنواتك التسويقية وأداء مشروعك بالأرقام، لنحدد بدقة أين توجد فرص التحسين.", icon: ClipboardCheck },
  { title: "خطة نمو 90 يومًا", description: "خطة مخصصة لنشاطك بأولويات واضحة وخطوات عملية، مع متابعة مستمرة للتنفيذ.", icon: Target },
  { title: "جذب عملاء جدد", description: "قنوات متنوعة تجمع التسويق المحلي والمحتوى والتوصيات والشراكات والإعلانات المناسبة.", icon: Megaphone },
  { title: "عروض ترفع قيمة الطلبات", description: "تطوير الباقات والبيع الإضافي والبيع المتقاطع، مع مراعاة هامش الربح.", icon: ShoppingBag },
  { title: "نظام ولاء لعودة العملاء", description: "آليات للاحتفاظ بالعملاء وتحسين تجربتهم وتشجيعهم على تكرار الزيارة.", icon: HeartHandshake },
  { title: "قياس الأثر والنتائج", description: "مؤشرات واضحة للمبيعات وتكرار الزيارات وكفاءة الإنفاق التسويقي، لنقيس أثر كل خطوة.", icon: ChartNoAxesCombined },
];
const split = (text: string, pattern: RegExp) =>
  text.split(pattern).filter(Boolean);
export default function Page() {
  const hero = source[0].split("\n\n");
  const problemParts = source[1].split("### المشكلة");
  const challenges = split(problemParts[0], /(?=\*\*\d\. )/).slice(1);
  const faq = split(source[12], /(?=### )/).slice(1);
  const challengeIcons = [
    Activity,
    UserRoundX,
    BadgePercent,
    ReceiptText,
    ConciergeBell,
    ScanSearch,
  ];
  const challengeLabels = [
    "استقرار المبيعات",
    "عودة العملاء",
    "كفاءة التسويق",
    "قيمة الطلب",
    "تجربة العميل",
    "وضوح المؤشرات",
  ];
  const bonusCards = [
    {
      title: "تحليل 5 منافسين محليين",
      description: "لتحديد فرص تميز مطعمك أو مقهاك داخل السوق المستهدف.",
      figure: "05",
      caption: "منافسين محليين",
      icon: Binoculars,
    },
    {
      title: "مكتبة تضم 12 فكرة لحملات تسويقية",
      description: "أفكار يمكن تخصيصها للمناسبات والأوقات الهادئة والمواسم المناسبة لمشروعك.",
      figure: "12",
      caption: "فكرة لحملات تسويقية",
      icon: Lightbulb,
    },
    {
      title: "دليل عملي لزيادة متوسط الطلب وتكرار الشراء",
      description: "خطوات وأساليب عملية تساعدك وفريقك على رفع قيمة كل طلب وتشجيع العملاء على العودة والشراء مجددا.",
      figure: "دليل",
      caption: "لزيادة الطلب والتكرار",
      icon: BookOpenCheck,
    },
  ];
  return (
    <>
      <Header />
      <main id="main" className="requested-edit-page">
        <section className="hero section" aria-labelledby="hero-title">
          <div className="container cinematic-hero">
            <div className="program-badge">
              <span className="badge-dot" />
              برنامج نمو مخصص لأصحاب المطاعم والمقاهي في الرياض
            </div>
            <h1 id="hero-title">
              <span className="hero-title-line">
                <Scribble color="gold">ارفع مبيعات</Scribble>{" "}مطعمك أو مقهاك بنظام نمو
              </span>{" "}
              <span className="hero-title-line">
                ما يعتمد على الإعلانات فقط
                <span className="heading-period">.</span>
              </span>
            </h1>
            <p className="hero-subheadline">{hero[3]}</p>
            <VSL />
            <div className="hero-summary">
              <div>
                <p className="hero-duration">{hero[4]}</p>
              </div>
              <div className="hero-action">
                <div className="hero-contact-actions"><CTA /><ContactButton /></div>
                <div className="hero-micro">
                  <ShieldCheck size={15} />
                  <span>
                    تقييم أولي يعتمد على المعلومات التي تقدمها، دون أي التزام
                    بالتعاقد.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section problems" id="challenges">
          <div className="container">
            <Reveal>
              <div className="section-intro centered challenges-intro">
                <h2>حين لا يعكس العائد <Scribble color="gold">حجم الجهد..</Scribble></h2>
                <h3>هل تواجه أيا من هذه التحديات في مطعمك أو مقهاك؟</h3>
                <p>تدير مشروعك يوميا، وتبذل جهدا كبيرا في التشغيل، لكن النتائج لا تعكس دائما حجم هذا الجهد.</p>
              </div>
            </Reveal>
            <div className="problem-grid">
              {challenges.map((p, i) => {
                const Icon = challengeIcons[i];
                return (
                  <Reveal className="problem-card challenge-icon-card" key={i}>
                    <div className="challenge-icon-head">
                      <span className="challenge-icon-tile" aria-hidden="true">
                        <Icon size={30} strokeWidth={1.6} />
                      </span>
                      <span className="card-serial">التحدي 0{i + 1}</span>
                    </div>
                    <Copy cardTitle text={p.replace(/\*\*(\d)\. /, "**")} />
                    <div className="card-footnote">
                      <span className="card-footnote-dot" />
                      {challengeLabels[i]}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
        <Testimonials />
        <section className="section included" id="included">
          <div className="container">
            <div className="section-intro centered included-intro">
              <h2>كل ما تحتاجه لبناء <Scribble color="gold">نظام نمو</Scribble> أكثر ربحية</h2>
              <p>عند انضمامك إلى البرنامج، ستحصل على:</p>
            </div>
            <div className="focused-deliverables">
              {programItems.map(({ title, description, icon: Icon }, i) => (
                <Reveal className="focused-deliverable" key={title}>
                  <div className="focused-deliverable-top"><span>0{i + 1}</span><span className="focused-deliverable-icon"><Icon size={30} strokeWidth={1.6} /></span></div>
                  <h3>{title}</h3><p>{description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="section bonuses photo-section refined-bonuses">
          <Image
            src="/images/arabic-coffee.webp"
            alt=""
            fill
            sizes="100vw"
            className="section-photo"
          />
          <div className="section-photo-shade" />
          <div className="container">
            <div className="section-intro">
              <Eyebrow number="04">قيمة إضافية، قابلة للتطبيق</Eyebrow>
              <h2>
                <span className="gold-text">وش تحصل عليه عند طلب الخدمة؟</span>
              </h2>
            </div>
            <div className="bonus-grid">
              {bonusCards.map(({ title, description, figure, caption, icon: Icon }, i) => {
                return (
                  <Reveal className="bonus-card" key={i}>
                    <div className="bonus-card-header">
                      <span className="bonus-index">المكافأة 0{i + 1}</span>
                      <span className="bonus-included">ضمن البرنامج</span>
                    </div>
                    <div className="bonus-art" aria-hidden="true">
                      <div>
                        <span className="bonus-figure">{figure}</span>
                        <span className="bonus-art-caption">{caption}</span>
                      </div>
                      <span className="bonus-icon-medallion">
                        <Icon size={28} strokeWidth={1.6} />
                      </span>
                    </div>
                    <Copy cardTitle text={`**${title}**\n\n${description}`} />
                    <div className="bonus-card-rule" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
        <section className="section consultant" id="consultant">
          <div className="container">
            <div className="section-intro centered">
              <Eyebrow number="05">الخبرة تبنى على ما يمكن التحقق منه</Eyebrow>
              <h2>لماذا يمكنك الاعتماد علينا؟</h2>
            </div>
            <div className="consultant-grid consultant-profile">
              <ConsultantPortrait />
              <div className="consultant-bio consultant-profile-copy">
                <div className="consultant-nameplate">
                  <h3>{consultant.name}</h3>
                  <span>{consultant.role}</span>
                </div>
                <blockquote className="consultant-quote">
                  {consultant.quote.split("يعرف الطريق")[0]}<Scribble color="gold">يعرف الطريق</Scribble>{consultant.quote.split("يعرف الطريق")[1]}
                </blockquote>
                <ul className="consultant-credentials">
                  {consultant.experience.map((line) => (
                    <li key={line}><Check size={16} strokeWidth={2.4} aria-hidden="true" />{line}</li>
                  ))}
                </ul>
                <div className="consultant-story">
                  <p>{consultant.vision}</p>
                  <p>{consultant.commitment}</p>
                </div>
                <div className="consultant-action"><ContactButton variant="book" /><ContactButton /></div>
              </div>
            </div>
          </div>
        </section>
        <section className="section audit-section" id="audit">
          <div className="container">
            <div className="section-intro centered">
              <Eyebrow number="06">خطوتك الأولى مجانية</Eyebrow>
              <h2>
                اكتشف <Scribble color="gold">فرص نمو</Scribble>
                <br />
                مطعمك أو مقهاك{" "}
                <span className="headline-highlight">مجانا.</span>
              </h2>
              <p>اكتشف فرص نمو مطعمك أو مقهاك قبل اتخاذ أي قرار</p>
              <p>احصل على تقرير تشخيص أولي مجاني لمشروعك</p>
            </div>
            <Assessment />
          </div>
        </section>
        <section className="section faq-section" id="faq">
          <div className="container faq-layout">
            <div className="faq-intro">
              <Eyebrow number="07">إجابات قبل أن تبدأ</Eyebrow>
              <h2><span className="faq-gold-title">الأسئلة الشائعة.</span></h2>
              <p>وضوح في المنهجية، والتوقعات، والخطوة التالية.</p>
              <a href="#audit" className="text-link">
                ابدأ بتقييم مشروعك <ArrowUpLeft size={18} />
              </a>
            </div>
            <FAQ items={[faq[0], faq[1], faq[7], faq[10], faq[11]]} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
