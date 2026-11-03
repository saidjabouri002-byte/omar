import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "نظام نمو المطاعم والمقاهي خلال 90 يوما | الرياض",
  description:
    "اكتشف فرص نمو مطعمك أو مقهاك مجانا. برنامج استشاري وتطبيقي لمدة 90 يوما لجذب العملاء ورفع قيمة الطلب وتكرار الزيارات وتحسين الربحية في الرياض.",
  metadataBase: new URL(
    "https://riyadh-growth-system.saidjabouri002.chatgpt.site",
  ),
  openGraph: {
    title: "نظام نمو المطاعم والمقاهي خلال 90 يوما",
    description: "من فرص متفرقة إلى نظام نمو متكامل. ابدأ بتقييم مشروعك مجانا.",
    locale: "ar_SA",
    type: "website",
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <a href="#main" className="skip-link">
          تجاوز إلى المحتوى
        </a>
        {children}
      </body>
    </html>
  );
}
