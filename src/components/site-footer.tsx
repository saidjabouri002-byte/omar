import { MapPin, Clock3 } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { ContactButton } from "@/components/contact-button";
import { Legal } from "@/components/interactions";
import { navLinks } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="site-footer grape-footer">
      <div className="container">
        <div className="grape-footer-cta">
          <div>
            <h2>جاهز تبني نظام نمو لمطعمك أو مقهاك؟</h2>
            <p>احجز استشارتك أو تواصل معنا، ولنبدأ معاً بخطة واضحة لنمو مشروعك.</p>
          </div>
          <div className="grape-footer-cta-actions">
            <ContactButton variant="book" />
            <ContactButton />
          </div>
        </div>

        <div className="grape-footer-grid">
          <div className="grape-footer-brand">
            <a className="brand" href="#" aria-label="العودة إلى أعلى الصفحة"><BrandLogo /></a>
            <p>برنامج استشاري وتطبيقي مخصص لأصحاب المطاعم والمقاهي في الرياض، لبناء نمو مستدام لا يعتمد على الإعلانات وحدها.</p>
          </div>
          <div>
            <h3>روابط سريعة</h3>
            <ul>
              {navLinks.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
              <li><a href="#audit">التقييم المجاني</a></li>
            </ul>
          </div>
          <div>
            <h3>معلومات</h3>
            <ul className="grape-footer-info">
              <li><MapPin size={17} />الرياض، المملكة العربية السعودية</li>
              <li><Clock3 size={17} />برنامج نمو لمدة 90 يوماً</li>
            </ul>
          </div>
        </div>

        <div className="grape-footer-bottom">
          <span>© {new Date().getFullYear()} شركة ملهم للحلول التسويقية — جميع الحقوق محفوظة.</span>
          <Legal />
        </div>
      </div>
    </footer>
  );
}
