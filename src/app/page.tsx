import { EbookDownload } from "@/components/ebook-download";
import { ContactButton } from "@/components/contact-button";
import { BrandLogo } from "@/components/brand-logo";
import {
  ArrowUpLeft,
  Binoculars,
  BookOpen,
  BookOpenCheck,
  ChartNoAxesCombined,
  Check,
  ClipboardCheck,
  Compass,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Megaphone,
  ShieldCheck,
  ShoppingBag,
  X,
} from "lucide-react";
import Image from "next/image";
import { VSL } from "@/components/vsl";
import { ConsultantPortrait } from "@/components/consultant-portrait";
import consultant from "@/lib/consultant.json";
import source from "@/lib/content.json";
import { Copy, CTA, Eyebrow } from "@/components/content";
import { CommitmentSeal } from "@/components/commitment-seal";
import { Scribble } from "@/components/scribble";
import { ProfitGrowth } from "@/components/profit-growth";
import { SuccessPartners } from "@/components/success-partners";
import { Testimonials } from "@/components/testimonials";
import {
  FAQ,
  Header,
  Legal,
  Reveal,
} from "@/components/interactions";
import { Assessment } from "@/components/assessment";
const programItems = [
  { title: "تشخيص شامل وخطة نمو لمدة 90 يوما", description: "نحلل أداء مشروعك ونحدد فرص التحسين، ثم نبني خطة مخصصة بأولويات واضحة.", icon: ClipboardCheck },
  { title: "قنوات متنوعة لجذب العملاء", description: "استراتيجية تجمع التسويق المحلي والمحتوى والتوصيات والشراكات والإعلانات المناسبة.", icon: Megaphone },
  { title: "عروض ترفع قيمة الطلب", description: "تطوير الباقات والبيع الإضافي والبيع المتقاطع، مع مراعاة هامش الربح.", icon: ShoppingBag },
  { title: "نظام ولاء وعودة العملاء", description: "آليات للاحتفاظ بالعملاء وتحسين تجربتهم وتشجيعهم على تكرار الزيارة.", icon: HeartHandshake },
  { title: "تدريب الفريق ومتابعة التنفيذ", description: "جلستان تدريبيتان على البيع والخدمة، و12 اجتماع متابعة لمراجعة التطبيق والنتائج.", icon: GraduationCap },
  { title: "لوحة لقياس الأداء والربحية", description: "مؤشرات للمبيعات والربحية وتكرار الزيارات وكفاءة الإنفاق التسويقي، حسب البيانات المتاحة.", icon: ChartNoAxesCombined },
];
const split = (text: string, pattern: RegExp) =>
  text.split(pattern).filter(Boolean);
export default function Page() {
  const hero = source[0].split("\n\n");
  const problemParts = source[1].split("### المشكلة");
  const challenges = split(problemParts[0], /(?=\*\*\d\. )/).slice(1);
  const bonuses = split(source[6], /(?=\*\*المكافأة)/).slice(1);
  const faq = split(source[12], /(?=### )/).slice(1);
  const challengePhotos = [
    { src: "/images/challenges/challenge-1.webp", position: "50% 50%" },
    { src: "/images/challenges/challenge-2.webp", position: "50% 50%" },
    { src: "/images/challenges/challenge-3.webp", position: "50% 50%" },
    { src: "/images/challenges/challenge-4.webp", position: "50% 50%" },
    { src: "/images/challenges/challenge-5.webp", position: "50% 50%" },
    { src: "/images/challenges/challenge-6.webp", position: "50% 50%" },
  ];
  const challengeLabels = [
    "استقرار المبيعات",
    "عودة العملاء",
    "كفاءة التسويق",
    "قيمة الطلب",
    "تجربة العميل",
    "وضوح المؤشرات",
  ];
  const bonusFigures = ["05", "12", "دليل", "عودة", "03"];
  const bonusCaptions = [
    "منافسين محليين",
    "فكرة لحملات تسويقية",
    "لفريق العمل",
    "للعملاء غير النشطين",
    "أشهر تالية",
  ];
  const bonusIcons = [Binoculars, Lightbulb, BookOpenCheck];
  const transformation = source[2].split("\n\n");
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
                <Scribble>طوّر مبيعات</Scribble>{" "}مطعمك أو مقهاك، وابن{" "}
                <span>نظام نمو</span>
              </span>{" "}
              <span className="hero-title-line">
                لا يعتمد على الإعلانات المدفوعة وحدها
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
        <SuccessPartners />
        <section className="section problems" id="challenges">
          <div className="container">
            <Reveal>
              <div className="section-intro centered challenges-intro">
                <h2>حين لا يعكس العائد <Scribble color="red">حجم الجهد..</Scribble></h2>
                <h3>هل تواجه أيا من هذه التحديات في مطعمك أو مقهاك؟</h3>
                <p>تدير مشروعك يوميا، وتبذل جهدا كبيرا في التشغيل، لكن النتائج لا تعكس دائما حجم هذا الجهد.</p>
              </div>
            </Reveal>
            <div className="problem-grid">
              {challenges.map((p, i) => {
                return (
                  <Reveal className="problem-card" key={i}>
                    <div className="challenge-card-media">
                      <Image
                        src={challengePhotos[i].src}
                        alt=""
                        fill
                        sizes="(max-width:700px) 100vw, (max-width:1000px) 50vw, 400px"
                        style={{ objectPosition: challengePhotos[i].position }}
                      />
                      <div
                        className="challenge-media-fade"
                        aria-hidden="true"
                      />
                      <div className="problem-card-top">
                        <span className="card-serial">التحدي 0{i + 1}</span>
                      </div>
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
        <section className="section transformation" id="transformation">
          <div className="container">
            <div className="section-intro centered">
              <Eyebrow number="02">التحول الذي نعمل عليه</Eyebrow>
              <h2>
                من إدارة عشوائية…
                <br />
                <span className="gold-text">إلى بناء غد مشرق لمشروعك.</span>
              </h2>
            </div>
            <div className="transformation-layout">
              <ProfitGrowth />
              <div>
                <Copy text={transformation.slice(0, 2).join("\n\n")} />
              </div>
            </div>
            <div className="section-contact-action"><ContactButton /></div>
          </div>
        </section>
        <Testimonials />
        <section className="section included" id="included">
          <div className="container">
            <div className="section-intro centered included-intro">
              <h2>كل ما تحتاجه لبناء <Scribble>نظام نمو</Scribble> أكثر ربحية</h2>
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
                وبالإضافة إلى ذلك…
                <br />
                <span className="gold-text">ثلاث مكافآت عملية.</span>
              </h2>
              <p className="source-label">بالإضافة إلى مكافآت عملية</p>
            </div>
            <div className="bonus-grid">
              {bonuses.slice(0, 3).map((b, i) => {
                const Icon = bonusIcons[i];
                return (
                  <Reveal className="bonus-card" key={i}>
                    <div className="bonus-card-header">
                      <span className="bonus-index">المكافأة 0{i + 1}</span>
                      <span className="bonus-included">ضمن البرنامج</span>
                    </div>
                    <div className="bonus-art" aria-hidden="true">
                      <div>
                        <span className="bonus-figure">{bonusFigures[i]}</span>
                        <span className="bonus-art-caption">
                          {bonusCaptions[i]}
                        </span>
                      </div>
                      <span className="bonus-icon-medallion">
                        <Icon size={28} strokeWidth={1.6} />
                      </span>
                    </div>
                    <Copy cardTitle text={b} />
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
                <div className="consultant-brand"><BrandLogo /></div>
                <div className="consultant-nameplate">
                  <h3>{consultant.name}</h3>
                  <span>{consultant.role}</span>
                </div>
                <blockquote className="consultant-quote">
                  {consultant.quote.split("يعرف الطريق")[0]}<Scribble>يعرف الطريق</Scribble>{consultant.quote.split("يعرف الطريق")[1]}
                </blockquote>
                <div className="consultant-highlight">
                  <span className="consultant-stat" aria-hidden="true"><strong>+10</strong><span>سنوات خبرة</span></span>
                  <p className="consultant-experience">{consultant.experience}</p>
                </div>
                <div className="consultant-story">
                  <div className="consultant-point">
                    <span className="consultant-point-icon"><Compass size={22} strokeWidth={1.6} /></span>
                    <div><h4>رؤيتنا</h4><p>{consultant.vision}</p></div>
                  </div>
                  <div className="consultant-point">
                    <span className="consultant-point-icon"><ShieldCheck size={22} strokeWidth={1.6} /></span>
                    <div><h4>التزامنا</h4><p>{consultant.commitment}</p></div>
                  </div>
                </div>
                <div className="consultant-signoff">
                  <span />
                  <span>رؤية واضحة. وعمل يستحق الأثر.</span>
                </div>
                <div className="consultant-action"><ContactButton /></div>
              </div>
            </div>
          </div>
        </section>
        <section className="section audit-section" id="audit">
          <div className="container">
            <div className="section-intro centered">
              <Eyebrow number="06">خطوتك الأولى مجانية</Eyebrow>
              <h2>
                اكتشف <Scribble>فرص نمو</Scribble>
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
        <section className="section commitment">
          <div className="container commitment-layout">
            <CommitmentSeal />
            <div>
              <Eyebrow number="07">التزام واضح من البداية</Eyebrow>
              <h2>
                نريد أن تكون رحلتك
                <br />
                <span className="commitment-gold-title">واضحة من البداية.</span>
              </h2>
              <Copy text={source[10]} omitTitle />
            </div>
          </div>
        </section>
        <section className="section qualification">
          <div className="container">
            <div className="section-intro">
              <Eyebrow number="08">شراكة تناسب احتياجك</Eyebrow>
              <h2>
                هل هذا البرنامج
                <br />
                <span className="muted">مناسب لمشروعك؟</span>
              </h2>
            </div>
            <div className="qualification-grid">
              <div className="qualified">
                <div className="fit-card-heading"><span className="fit-card-icon"><Check size={27} /></span><h3>البرنامج مناسب لك إذا:</h3></div>
                <Copy omitTitle
                  text={
                    source[11].split("## البرنامج")[1]
                      ? "## البرنامج" +
                        source[11].split("## البرنامج")[1].split("## قد لا")[0]
                      : ""
                  }
                />
              </div>
              <div className="not-qualified">
                <div className="fit-card-heading"><span className="fit-card-icon"><X size={27} /></span><h3>قد لا يكون مناسبا لك إذا:</h3></div>
                <Copy omitTitle negative text={"## قد لا" + source[11].split("## قد لا")[1]} />
              </div>
            </div>
          </div>
        </section>
        <section className="section faq-section" id="faq">
          <div className="container faq-layout">
            <div className="faq-intro">
              <Eyebrow number="09">إجابات قبل أن تبدأ</Eyebrow>
              <h2><span className="faq-gold-title">الأسئلة الشائعة.</span></h2>
              <p>وضوح في المنهجية، والتوقعات، والخطوة التالية.</p>
              <a href="#audit" className="text-link">
                ابدأ بتقييم مشروعك <ArrowUpLeft size={18} />
              </a>
            </div>
            <FAQ items={[faq[0], faq[1], faq[7], faq[10], faq[11]]} />
          </div>
        </section>
        <section className="section ebook-section" id="free-guide" aria-labelledby="ebook-heading">
          <div className="container ebook-layout">
            <div className="ebook-image-scene">
              <Image className="ebook-supplied-cover" src="/images/restaurant-growth-ebook.webp" alt="غلاف دليل نمو المطاعم من إعداد عمر العسبلي" width={800} height={875} sizes="(max-width:800px) 85vw, 420px" />
            </div>
            <div className="ebook-copy">
              <span className="ebook-kicker"><BookOpen size={18} />دليل مجاني لأصحاب المطاعم والمقاهي</span>
              <h2 id="ebook-heading">امنح عملاءك سبباً للزيارة…<br /><span className="muted">وسبباً أقوى للعودة.</span></h2>
              <p>ابدأ من فرصة واحدة تستحق التجربة. اكتشف في هذا الدليل 7 خطوات تساعدك على الوصول إلى عملاء جدد، وتحسين تجربتهم، وتشجيعهم على تكرار الزيارة.</p>
              <ul className="ebook-benefits"><li><Check size={18} />اجعل العثور على مشروعك واختيارك أسهل.</li><li><Check size={18} />طوّر عروضك وشجّع العودة والتوصيات.</li><li><Check size={18} />حوّل الأفكار إلى تجربة أسبوعية تقيس نتائجها.</li></ul>
              <p className="ebook-invitation">اقرأه اليوم، واختر أول خطوة تطبّقها غداً.</p>
              <EbookDownload />
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <a className="brand" href="#">
              <BrandLogo />
            </a>
            <p>برنامج استشاري وتطبيقي مخصص لأصحاب المطاعم والمقاهي في الرياض</p>
          </div>
          <div className="footer-bottom">
            <span>© [اسم الشركة] — جميع الحقوق محفوظة.</span>
            <Legal />
            <span className="footer-location">
              الرياض، المملكة العربية السعودية
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
