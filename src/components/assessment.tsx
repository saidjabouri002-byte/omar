"use client";
import { useCallback, useRef, useState } from "react";
import { useDialog } from "@/lib/use-dialog";
import { useForm, Controller, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Coffee,
  Utensils,
  Store,
  Building2,
  ArrowRight,
  ArrowUpLeft,
  Check,
  CheckCheck,
  CircleHelp,
  Download,
  FileText,
  LoaderCircle,
  RotateCcw,
  ShieldCheck,
  Sprout,
  Target,
  X,
} from "lucide-react";
import {
  schema,
  emptyAnswers,
  analyze,
  submitConsultation,
  type Answers,
  type ConsultationPayload,
} from "@/lib/assessment";
const steps = [
  "عن مشروعك",
  "المبيعات والطلبات",
  "مصادر العملاء",
  "العودة والولاء",
  "أولويات النمو",
];
const fields: FieldPath<Answers>[][] = [
  ["type", "branches"],
  ["sales", "average"],
  ["channels", "ads", "adSpend"],
  ["retention", "loyalty"],
  ["challenges"],
];
function download(
  text: string,
  name: string,
  type = "text/plain;charset=utf-8",
) {
  const url = URL.createObjectURL(
    new Blob([type.startsWith("text/") ? "\uFEFF" + text : text], { type }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function Assessment() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers | null>(null);
  const [consult, setConsult] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const [localRequest, setLocalRequest] = useState<ConsultationPayload | null>(
    null,
  );
  const heading = useRef<HTMLHeadingElement>(null);
  const closeConsult = useCallback(() => setConsult(false), []);
  useDialog(consult, closeConsult);
  const {
    control,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Answers>({
    resolver: zodResolver(schema),
    defaultValues: emptyAnswers,
    mode: "onChange",
  });
  const focus = () =>
    setTimeout(() => {
      heading.current?.focus({ preventScroll: true });
      heading.current?.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }, 20);
  async function next() {
    if (await trigger(fields[step])) {
      if (step === 4) {
        setAnswers(schema.parse(getValues()));
        focus();
      } else {
        setStep(step + 1);
        focus();
      }
    }
  }
  function choice(
    name: keyof Answers,
    label: string,
    options: string[],
    multi = false,
    hint?: string,
  ) {
    return (
      <fieldset className="question">
        <legend>{label}</legend>
        {hint && <p className="field-hint">{hint}</p>}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div
              className={`answer-options ${options.length > 4 ? "many" : ""}`}
            >
              {options.map((option) => {
                const OptionIcon = name === "type" ? ({ "مطعم": Utensils, "مقهى": Coffee, "مطعم ومقهى": Store }[option] || Store) : name === "branches" ? Building2 : null;
                const selected = multi
                  ? Array.isArray(field.value) && field.value.includes(option)
                  : field.value === option;
                return (
                  <label
                    key={option}
                    className={`answer ${selected ? "selected" : ""}`}
                  >
                    <input
                      type={multi ? "checkbox" : "radio"}
                      name={field.name}
                      checked={selected}
                      value={option}
                      onChange={() =>
                        field.onChange(
                          multi
                            ? selected
                              ? (field.value as string[]).filter(
                                  (x) => x !== option,
                                )
                              : option === "لا أعرف"
                                ? ["لا أعرف"]
                                : [
                                    ...(field.value as string[]).filter(
                                      (x) => x !== "لا أعرف",
                                    ),
                                    option,
                                  ]
                            : option,
                        )
                      }
                    />
                    <span className="answer-label">{OptionIcon && <span className="answer-icon"><OptionIcon size={21} strokeWidth={1.6} /></span>}<span>{option}</span></span>
                    <span className="answer-check">
                      {selected && <Check size={13} />}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        />
        {errors[name] && (
          <p className="field-error" role="alert">
            {errors[name]?.message}
          </p>
        )}
      </fieldset>
    );
  }
  const report = answers ? analyze(answers) : null;
  function reportText() {
    if (!answers || !report) return "";
    return [
      "تقرير فرص النمو — تقييم أولي",
      `نوع النشاط: ${answers.type} | الفروع: ${answers.branches}`,
      `المبيعات الشهرية التقريبية: ${answers.sales} | متوسط الفاتورة: ${answers.average}`,
      `القنوات: ${answers.channels.join("، ")} | الاعتماد على الإعلانات: ${answers.ads}`,
      `تكرار الزيارات: ${answers.retention} | الولاء: ${answers.loyalty}`,
      `التحديات: ${answers.challenges.join("، ")}`,
      "",
      ...report.indicators.map((x) => `${x.name}: ${x.status}`),
      "",
      "نقاط القوة",
      ...(report.strengths.length
        ? report.strengths
        : [
            "لا تكفي الإجابات لإثبات نقاط قوة في الأنظمة الحالية؛ ابدأ بجمع البيانات.",
          ]),
      "",
      "مجالات التحسين",
      ...(report.areas.length
        ? report.areas
        : ["تحقق من فاعلية الأنظمة المذكورة باستخدام بيانات فعلية."]),
      "",
      ...report.opportunities.flatMap((x, i) => [
        `${i + 1}. ${x.title}`,
        `لماذا؟ ${x.reason}`,
        `الخطوة المقترحة: ${x.action}`,
      ]),
      "",
      "الخطوة التالية: اجمع بيانات فعلية للمبيعات والتكاليف والزيارات وناقش أولويات التنفيذ في جلسة تشخيص.",
      "القواعد: 3 قنوات معروفة أو أكثر = أساس للتنوع، اعتماد مرتفع أو غير معروف = مراجعة القياس الإعلاني، عودة غير منتظمة أو غير معروفة = أولوية الاحتفاظ. تحديات الربحية وقيمة الفاتورة تقدم في ترتيب الفرص. لا نستنتج الربحية من إجمالي المبيعات.",
      "تقييم أولي مبني على معلومات ذاتية، وليس تدقيقا ماليا أو ضمانا لنتائج مستقبلية. لا تحفظ الإجابات في خادم في النسخة الحالية.",
    ].join("\n");
  }
  return (
    <div className={`assessment-shell ${answers ? "show-report" : ""}`}>
      <aside className="assessment-sidebar">
        <div className="audit-symbol">
          <Sprout size={32} />
        </div>
        <span className="eyebrow">من الفهم يبدأ النمو</span>
        <h3>
          نظرة أوضح.
          <br />
          خطوة أذكى.
        </h3>
        <p>
          معلومات تقريبية تكفي للبدء. دون كشوف حسابات أو بيانات مالية تفصيلية.
        </p>
        <ol>
          {steps.map((s, i) => (
            <li
              key={s}
              className={
                answers || i < step ? "done" : i === step ? "active" : ""
              }
            >
              <span>{answers || i < step ? <Check size={14} /> : i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
        <div className="audit-privacy">
          <ShieldCheck size={19} />
          <span>
            إجاباتك تبقى في متصفحك. لا تحفظ تلقائيا ولا ترسل إلى خادم.
          </span>
        </div>
      </aside>
      <div className="assessment-main">
        {!answers ? (
          <>
            <div className="step-meta">
              <span>تقييم فرص النمو المجاني</span>
              <span>الخطوة {step + 1} من 5</span>
            </div>
            <div
              className="progress-track"
              role="progressbar"
              aria-label="اكتمال التقييم"
              aria-valuemin={0}
              aria-valuemax={5}
              aria-valuenow={step + 1}
            >
              <span style={{ width: `${(step + 1) * 20}%` }} />
            </div>
            <h3 ref={heading} tabIndex={-1}>
              {
                [
                  "لنبدأ بالتعرف على مشروعك",
                  "كيف تبدو طلباتك اليوم؟",
                  "من أين يأتي عملاؤك؟",
                  "هل يعود العميل مرة أخرى؟",
                  "أين تريد أن تصنع الفرق؟",
                ][step]
              }
            </h3>
            <p className="assessment-subtitle">
              {
                [
                  "اختر الإجابة الأقرب إلى وضع مشروعك الحالي.",
                  "استخدم تقديراتك الحالية؛ لا حاجة إلى بيانات تفصيلية.",
                  "حدد القنوات التي تستخدمها حاليا، ثم مستوى اعتمادك على الإعلانات.",
                  "لنحدد كيف يحافظ مشروعك على علاقته بعملائه.",
                  "يمكنك اختيار أكثر من تحد واحد.",
                ][step]
              }
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void next();
              }}
              noValidate
            >
              {step === 0 && (
                <>
                  {choice("type", "ما نوع نشاطك؟", [
                    "مطعم",
                    "مقهى",
                    "مطعم ومقهى",
                    "نشاط آخر في الأغذية والمشروبات",
                  ])}
                  {choice("branches", "كم عدد الفروع؟", [
                    "فرع واحد",
                    "فرعان إلى 3 فروع",
                    "4 إلى 10 فروع",
                    "أكثر من 10 فروع",
                  ])}
                </>
              )}
              {step === 1 && (
                <>
                  {choice("sales", "ما متوسط المبيعات الشهرية التقريبي؟", [
                    "أقل من 50 ألف ريال",
                    "50 إلى 150 ألف ريال",
                    "150 إلى 500 ألف ريال",
                    "أكثر من 500 ألف ريال",
                    "لا تتوفر لدي بيانات حاليا",
                  ])}
                  {choice("average", "ما متوسط قيمة الفاتورة؟", [
                    "أقل من 25 ريالا",
                    "25 إلى 50 ريالا",
                    "51 إلى 100 ريال",
                    "أكثر من 100 ريال",
                    "لا أعرف",
                  ])}
                </>
              )}
              {step === 2 && (
                <>
                  {choice(
                    "channels",
                    "ما قنوات جذب العملاء الحالية؟",
                    [
                      "البحث المحلي وخرائط Google",
                      "المحتوى ووسائل التواصل",
                      "توصيات العملاء",
                      "شراكات محلية",
                      "الإعلانات المدفوعة",
                      "تطبيقات التوصيل",
                      "الموقع والمارة",
                      "لا أعرف",
                    ],
                    true,
                  )}
                  {choice("ads", "إلى أي مدى تعتمد على الإعلانات المدفوعة؟", [
                    "مرتفع",
                    "متوسط",
                    "منخفض",
                    "لا أعرف",
                  ])}
                  <Controller
                    name="ads"
                    control={control}
                    render={({ field }) => (
                      <>
                        {field.value === "مرتفع" && (
                          <Controller
                            name="adSpend"
                            control={control}
                            render={({ field: spend }) => (
                              <label className="text-field">
                                الإنفاق الإعلاني الشهري التقريبي{" "}
                                <small>اختياري — بالريال السعودي</small>
                                <input
                                  {...spend}
                                  value={spend.value ?? ""}
                                  inputMode="decimal"
                                  maxLength={30}
                                  placeholder="مثال: 5000"
                                />
                              </label>
                            )}
                          />
                        )}
                      </>
                    )}
                  />
                </>
              )}
              {step === 3 && (
                <>
                  {choice("retention", "هل يعود عملاؤك للزيارة مرة أخرى؟", [
                    "غالبا",
                    "أحيانا",
                    "نادرا",
                    "لا أقيس تكرار الزيارات",
                  ])}
                  {choice(
                    "loyalty",
                    "هل لديك برنامج ولاء أو آلية لتحفيز العودة؟",
                    [
                      "نعم، ونقيس نتائجه",
                      "نعم، دون قياس واضح",
                      "لا يوجد حاليا",
                    ],
                  )}
                </>
              )}
              {step === 4 && (
                <>
                  {choice(
                    "challenges",
                    "ما أبرز تحديات مشروعك؟",
                    [
                      "عدم استقرار المبيعات",
                      "ضعف عودة العملاء",
                      "الاعتماد على الإعلانات",
                      "انخفاض قيمة الفاتورة",
                      "ضعف الربحية",
                      "أداء الفريق",
                      "غياب مؤشرات واضحة",
                    ],
                    true,
                  )}
                  <div className="report-promise">
                    <FileText size={24} />
                    <div>
                      <strong>تقريرك، بناء على إجاباتك.</strong>
                      <p>
                        نقاط القوة، مجالات التحسين، ثلاث فرص مقترحة، وخطوتك
                        التالية — دون توقعات مالية أو وعود مضمونة.
                      </p>
                    </div>
                  </div>
                </>
              )}
              <div className="form-navigation">
                <button className="button" type="submit">
                  {step === 4 ? "اعرض تقرير فرص النمو" : "متابعة"}
                  <ArrowLeft size={18} />
                </button>
                {step > 0 && (
                  <button
                    className="back-button"
                    type="button"
                    onClick={() => {
                      setStep(step - 1);
                      focus();
                    }}
                  >
                    <ArrowRight size={16} />
                    السابق
                  </button>
                )}
              </div>
              <p className="field-hint">
                التقييم أولي، ويعتمد على المعلومات التي تقدمها. يمكنك تعديل
                إجاباتك بالعودة إلى الخطوة السابقة.
              </p>
            </form>
          </>
        ) : (
          <div className="growth-report" aria-live="polite">
            <div className="report-badge">
              <CheckCheck size={17} /> اكتمل التقييم الأولي
            </div>
            <h3 ref={heading} tabIndex={-1}>
              هذه فرص النمو التي تستحق اهتمامك.
            </h3>
            <p className="report-disclaimer">
              تقرير أولي مبني على إجاباتك الذاتية، وليس تدقيقا ماليا شاملا أو
              ضمانا لنتائج مستقبلية.
            </p>
            <div className="report-business">
              <span>{answers.type}</span>
              <span>{answers.branches}</span>
              <span>المبيعات: {answers.sales}</span>
              <span>متوسط الفاتورة: {answers.average}</span>
            </div>
            <div className="readiness-grid">
              {report!.indicators.map((x) => (
                <div key={x.name}>
                  <small>{x.name}</small>
                  <strong>{x.status}</strong>
                </div>
              ))}
            </div>
            <div className="report-findings">
              <div>
                <h4>
                  <Check size={17} /> نقاط القوة
                </h4>
                {(report!.strengths.length
                  ? report!.strengths
                  : [
                      "لا تكفي الإجابات لإثبات نقاط قوة في الأنظمة الحالية؛ نوصي بجمع بيانات فعلية.",
                    ]
                ).map((x) => (
                  <p key={x}>{x}</p>
                ))}
              </div>
              <div>
                <h4>
                  <Target size={17} /> مجالات التحسين
                </h4>
                {(report!.areas.length
                  ? report!.areas
                  : ["التحقق من فاعلية الأنظمة المذكورة باستخدام بيانات فعلية."]
                ).map((x) => (
                  <p key={x}>{x}</p>
                ))}
              </div>
            </div>
            <h4 className="report-opportunity-title">
              ثلاث فرص مقترحة لمشروعك
            </h4>
            {report!.opportunities.map((o, i) => (
              <article className="opportunity" key={o.title}>
                <span className="opportunity-no">0{i + 1}</span>
                <div>
                  <h4>{o.title}</h4>
                  <p>
                    <strong>لماذا ظهرت؟</strong> {o.reason}
                  </p>
                  <p>
                    <strong>خطوتك المقترحة:</strong> {o.action}
                  </p>
                </div>
              </article>
            ))}
            <details className="rules">
              <summary>
                <CircleHelp size={16} /> كيف توصلنا إلى هذه التوصيات؟
              </summary>
              <p>
                ثلاث قنوات جذب معروفة أو أكثر تشير إلى أساس للتنوع، دون الحكم
                على فاعليتها. الاعتماد المرتفع أو غير المعروف على الإعلانات يبرز
                الحاجة إلى مراجعة القياس. عدم انتظام الزيارات أو غياب قياسها
                يبرز فرصة الاحتفاظ. برنامج الولاء غير الموجود أو غير المقاس يبرز
                فرصة تطويره. تحديات الربحية وقيمة الفاتورة تقدم في ترتيب الفرص
                عند اختيارها. الفرص المتبقية تركز على البيانات والمتابعة. لا
                نستنتج الربحية من إجمالي المبيعات، ولا نستخدم تقديرات مالية
                للتنبؤ بنتائج.
              </p>
            </details>
            <div className="next-step">
              <h4>خطوتك التالية</h4>
              <p>
                اجمع بيانات المبيعات والتكاليف والزيارات، ثم ناقش النتائج مع
                المستشار لتحديد أولويات قابلة للتنفيذ.
              </p>
              <button
                className="button"
                onClick={() => {
                  setConsult(true);
                  setStatus("");
                }}
              >
                أرغب في جلسة تشخيص <ArrowUpLeft size={18} />
              </button>
              <small>
                التواصل الفعلي يحتاج إلى تفعيل قناة الحجز من المستشار.
              </small>
            </div>
            <div className="report-actions">
              <button
                onClick={() => download(reportText(), "تقرير-فرص-النمو.txt")}
              >
                <Download size={17} /> تنزيل التقرير
              </button>
              <button
                onClick={() => {
                  setAnswers(null);
                  setStep(0);
                  focus();
                }}
              >
                تعديل الإجابات
              </button>
              <button
                onClick={() => {
                  setAnswers(null);
                  setStep(0);
                  setConsult(false);
                  reset(emptyAnswers);
                  focus();
                }}
              >
                <RotateCcw size={16} /> بدء تقييم جديد
              </button>
            </div>
          </div>
        )}
      </div>
      {consult && answers && report && (
        <div className="modal-backdrop" onClick={() => setConsult(false)}>
          <section
            role="dialog"
            aria-modal="true"
            aria-label="طلب جلسة تشخيص"
            className="legal-dialog consultation-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="dialog-close"
              aria-label="إغلاق"
              onClick={() => setConsult(false)}
            >
              <X />
            </button>
            <h3>خطوتك نحو تشخيص أعمق</h3>
            <p>
              {process.env.NEXT_PUBLIC_CONSULTATION_ENDPOINT
                ? "أدخل بياناتك للموافقة على إرسال طلب التواصل وتقرير التقييم إلى المستشار."
                : "قناة الحجز لم تفعل بعد. يمكنك تجهيز وتنزيل طلبك لمشاركته مع المستشار لاحقا. لن يرسل الطلب ولن تحجز جلسة تلقائيا."}
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const payload: ConsultationPayload = {
                  version: 1,
                  createdAt: new Date().toISOString(),
                  name: String(data.get("name")).trim(),
                  phone: String(data.get("phone")).trim(),
                  consent: true,
                  answers,
                  report,
                };
                setSending(true);
                setStatus("");
                try {
                  const result = await submitConsultation(payload);
                  if (result.status === "unconfigured") {
                    setLocalRequest(payload);
                    setStatus(
                      "طلبك جاهز للتنزيل على جهازك. لم يرسل ولم يتم حجز موعد.",
                    );
                  } else
                    setStatus(
                      "تم إرسال طلبك بنجاح. هذا تأكيد استلام الطلب وليس تأكيدا لموعد الجلسة.",
                    );
                } catch {
                  setStatus(
                    "تعذر إرسال الطلب. لم يتم تأكيد استلامه. يمكنك المحاولة مرة أخرى.",
                  );
                } finally {
                  setSending(false);
                }
              }}
            >
              <label className="text-field">
                الاسم
                <input
                  autoFocus
                  name="name"
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                />
              </label>
              <label className="text-field">
                رقم التواصل
                <input
                  name="phone"
                  required
                  type="tel"
                  dir="ltr"
                  autoComplete="tel"
                  pattern="[+0-9٠-٩ ()-]{9,20}"
                  placeholder="+966 5X XXX XXXX"
                />
              </label>
              <label className="consent">
                <input required type="checkbox" /> أوافق على تضمين بيانات
                التواصل وإجابات التقييم في الطلب الذي أختار مشاركته مع المستشار.
              </label>
              <button className="button" type="submit" disabled={sending}>
                {sending ? (
                  <LoaderCircle className="spin" size={18} />
                ) : process.env.NEXT_PUBLIC_CONSULTATION_ENDPOINT ? (
                  "إرسال طلب التواصل"
                ) : (
                  "تجهيز طلب الاستشارة"
                )}
              </button>
              <p role="status">{status}</p>
              {localRequest && (
                <button
                  type="button"
                  className="button button-outline"
                  onClick={() =>
                    download(
                      JSON.stringify(localRequest, null, 2),
                      "طلب-جلسة-تشخيص.json",
                      "application/json;charset=utf-8",
                    )
                  }
                >
                  <Download size={17} /> تنزيل الطلب لمشاركته لاحقا
                </button>
              )}
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
