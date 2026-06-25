import { useLanguage } from '@/hooks/useLanguage';

export default function DisclaimerSection() {
  const { t } = useLanguage();

  return (
    <section className="py-[50px] bg-bg-light">
      <div className="container-main max-w-[900px]">
        <h2 className="text-2xl md:text-[28px] font-normal text-text-primary text-center mb-10">
          {t.disclaimer_title}
        </h2>
        <ul className="space-y-4 text-sm text-text-primary leading-relaxed list-disc pl-5">
          <li>
            {t.disclaimer_li1_a}
            <strong className="text-brand-blue">{t.disclaimer_li1_b}</strong>
            {t.disclaimer_li1_c}
          </li>
          <li>{t.disclaimer_li2}</li>
          <li>{t.disclaimer_li3}</li>
          <li>{t.disclaimer_li4}</li>
        </ul>
      </div>
    </section>
  );
}
