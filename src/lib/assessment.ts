import { z } from "zod";
export const schema = z.object({
  type: z.string().min(1, "اختر نوع النشاط"),
  branches: z.string().min(1, "اختر عدد الفروع"),
  sales: z.string().min(1, "اختر متوسط المبيعات"),
  average: z.string().min(1, "اختر متوسط قيمة الفاتورة"),
  channels: z.array(z.string()).min(1, "اختر قناة واحدة على الأقل"),
  ads: z.string().min(1, "حدد مستوى الاعتماد على الإعلانات"),
  adSpend: z.string().optional(),
  retention: z.string().min(1, "اختر الإجابة الأقرب"),
  loyalty: z.string().min(1, "حدد وضع برنامج الولاء"),
  challenges: z.array(z.string()).min(1, "اختر تحديا واحدا على الأقل"),
});
export type Answers = z.infer<typeof schema>;
export const emptyAnswers: Answers = {
  type: "",
  branches: "",
  sales: "",
  average: "",
  channels: [],
  ads: "",
  adSpend: "",
  retention: "",
  loyalty: "",
  challenges: [],
};
export type Opportunity = { title: string; reason: string; action: string };
export function analyze(a: Answers) {
  const strengths: string[] = [];
  const areas: string[] = [];
  const opportunities: Opportunity[] = [];
  const knownChannels = a.channels.filter((c) => c !== "لا أعرف");
  const diverse = knownChannels.length >= 3;
  if (diverse)
    strengths.push(
      "ذكرت ثلاث قنوات جذب أو أكثر؛ لديك قاعدة لتنويع مصادر العملاء.",
    );
  else {
    areas.push("تنوع مصادر جذب العملاء يحتاج إلى مراجعة.");
    opportunities.push({
      title: "توسيع قنوات جذب العملاء",
      reason: `ذكرت ${knownChannels.length} من قنوات الجذب المعروفة؛ عدد القنوات وحده لا يثبت فاعليتها.`,
      action:
        "تتبع مصدر العملاء، ثم اختبر البحث المحلي والتوصيات والشراكات بحسب جمهورك وموقعك.",
    });
  }
  if (a.ads === "منخفض")
    strengths.push(
      "أفدت بأن اعتمادك على الإعلانات منخفض؛ راجع القنوات التي تدعم هذا الوضع.",
    );
  else if (a.ads === "مرتفع" || a.ads === "لا أعرف") {
    areas.push("كفاءة الإنفاق الإعلاني ودوره في المبيعات تستحق التحليل.");
    opportunities.unshift({
      title: "فهم الاعتماد على الإعلانات",
      reason:
        a.ads === "مرتفع"
          ? "أفدت باعتماد مرتفع على الإعلانات المدفوعة."
          : "لم تحدد درجة اعتمادك على الإعلانات؛ وضوح القياس هو الخطوة الأولى.",
      action:
        "سجل مصادر الطلبات وتكلفة اكتساب العميل، وقارنها بزيارات العملاء المتكررين قبل تعديل الميزانية.",
    });
  }
  if (a.retention === "غالبا")
    strengths.push(
      "بحسب إجابتك، يعود العملاء غالبا؛ قياس تكرار الزيارات يساعد على فهم هذا الأصل.",
    );
  else {
    areas.push("قياس عودة العملاء وتحفيز الزيارة التالية.");
    opportunities.unshift({
      title: "تحويل الزيارة الأولى إلى علاقة مستمرة",
      reason: `إجابتك عن عودة العملاء: «${a.retention}».`,
      action:
        "ابدأ بتتبع الزيارات المتكررة واختبار عرض عودة مناسب، مع احترام موافقات التواصل التسويقي.",
    });
  }
  if (a.loyalty === "نعم، ونقيس نتائجه")
    strengths.push(
      "لديك برنامج ولاء تقيس نتائجه، وهو أساس يمكن تحسينه بالبيانات.",
    );
  else {
    areas.push("تطوير برنامج الولاء وقياس جدواه.");
    opportunities.push({
      title: "بناء آلية ولاء قابلة للقياس",
      reason: `وضع برنامج الولاء: «${a.loyalty}».`,
      action:
        "صمم مكافأة مناسبة لهامش الربح، وراقب تكرار الزيارة وتكلفة المكافآت.",
    });
  }
  if (a.challenges.includes("انخفاض قيمة الفاتورة"))
    opportunities.unshift({
      title: "تحسين قيمة الطلب مع مراعاة الربح",
      reason:
        "اخترت انخفاض قيمة الفاتورة ضمن تحدياتك؛ لا نستنتج ضعفها من قيمتها المطلقة.",
      action:
        "حلل مزيج المنتجات، واختبر باقة مكملة ونص بيع إضافي للفريق، ثم قس الهامش وتجربة العميل.",
    });
  if (a.challenges.includes("ضعف الربحية"))
    opportunities.unshift({
      title: "فهم ربحية المنتجات والعروض",
      reason: "حددت ضعف الربحية كأحد التحديات الأساسية.",
      action:
        "راجع تكلفة المنتجات والخصومات والعمولات، وحدد مساهمة كل منتج في الربح باستخدام بيانات فعلية.",
    });
  if (a.challenges.includes("أداء الفريق"))
    opportunities.push({
      title: "تطوير البيع والخدمة لدى الفريق",
      reason: "حددت أداء الفريق ضمن التحديات.",
      action:
        "راقب رحلة الطلب، وحدد توصية منتج مناسبة، ودرب الفريق وقس أثرها على الخدمة وقيمة الطلب.",
    });
  const fallback: Opportunity[] = [
    {
      title: "قياس أداء مصادر العملاء",
      reason: "وجود قنوات جذب لا يكفي لتقييم عائدها.",
      action:
        "وثق مصدر كل زيارة أو طلب عندما تتوفر البيانات، وقارن تكلفة القنوات وقيمة عملائها.",
    },
    {
      title: "مراجعة مزيج المنتجات",
      reason: "المبيعات الإجمالية ومتوسط الفاتورة لا يكفيان لقياس الربحية.",
      action:
        "اجمع تكلفة المنتجات وكميات البيع لتحديد المنتجات الأكثر مساهمة في الربح.",
    },
    {
      title: "توثيق نظام متابعة أسبوعي",
      reason: "الاستمرار يحتاج إلى إجراءات قابلة للمتابعة.",
      action:
        "حدد مسؤولا ومؤشرا لكل مبادرة، وراجع النتائج أسبوعيا قبل توسيع التنفيذ.",
    },
  ];
  for (const x of fallback) if (opportunities.length < 3) opportunities.push(x);
  return {
    strengths,
    areas,
    opportunities: opportunities.slice(0, 3),
    indicators: [
      {
        name: "تنوع القنوات",
        status: diverse ? "أساس متنوع بحسب إجابتك" : "يستحق التطوير",
      },
      { name: "الاعتماد على الإعلانات", status: a.ads },
      { name: "تكرار الزيارات", status: a.retention },
      { name: "برنامج الولاء", status: a.loyalty },
    ],
  };
}
export type ConsultationPayload = {
  version: 1;
  createdAt: string;
  name: string;
  phone: string;
  consent: true;
  answers: Answers;
  report: ReturnType<typeof analyze>;
};
/** Implement an adapter for GoHighLevel, Supabase, or your own server. Never expose service-role keys in browser code. */
export async function submitConsultation(
  payload: ConsultationPayload,
): Promise<{ status: "unconfigured" | "sent" }> {
  const endpoint = process.env.NEXT_PUBLIC_CONSULTATION_ENDPOINT;
  if (!endpoint) return { status: "unconfigured" };
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error("لم ينجح الإرسال. حاول مرة أخرى.");
  return { status: "sent" };
}
