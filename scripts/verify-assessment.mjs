import assert from "node:assert/strict";
import {
  schema,
  emptyAnswers,
  analyze,
  submitConsultation,
} from "../src/lib/assessment.ts";
assert.equal(
  schema.safeParse(emptyAnswers).success,
  false,
  "Empty form must be rejected",
);
const base = {
  type: "مطعم",
  branches: "فرع واحد",
  sales: "50 إلى 150 ألف ريال",
  average: "25 إلى 50 ريالا",
  channels: ["الإعلانات المدفوعة"],
  ads: "مرتفع",
  retention: "نادرا",
  loyalty: "لا يوجد حاليا",
  challenges: ["ضعف الربحية", "انخفاض قيمة الفاتورة"],
};
assert.equal(schema.safeParse(base).success, true);
const r = analyze(base);
assert.equal(r.opportunities.length, 3);
assert.equal(r.opportunities[0].title, "فهم ربحية المنتجات والعروض");
assert.equal(r.opportunities[1].title, "تحسين قيمة الطلب مع مراعاة الربح");
assert.ok(r.areas.length >= 3);
assert.equal(r.strengths.length, 0);
const healthy = {
  ...base,
  channels: ["البحث المحلي وخرائط Google", "توصيات العملاء", "شراكات محلية"],
  ads: "منخفض",
  retention: "غالبا",
  loyalty: "نعم، ونقيس نتائجه",
  challenges: ["عدم استقرار المبيعات"],
};
const h = analyze(healthy);
assert.equal(h.strengths.length, 4);
assert.equal(h.opportunities.length, 3);
assert.equal(h.areas.length, 0);
const unknown = {
  ...base,
  channels: ["لا أعرف"],
  ads: "لا أعرف",
  retention: "لا أقيس تكرار الزيارات",
  challenges: ["غياب مؤشرات واضحة"],
};
assert.equal(analyze(unknown).opportunities.length, 3);
for (const p of [base, healthy, unknown]) {
  const a = analyze(p);
  assert.ok(a.opportunities.every((x) => x.title && x.reason && x.action));
  assert.equal(a.indicators.length, 4);
}
if (!process.env.NEXT_PUBLIC_CONSULTATION_ENDPOINT)
  assert.deepEqual(await submitConsultation({}), { status: "unconfigured" });
console.log(
  "Assessment checks passed: validation, priority rules, unknown answers, strengths, three explainable opportunities, unconfigured integration.",
);
