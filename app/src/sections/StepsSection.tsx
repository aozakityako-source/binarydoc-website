import { Database, Search, Link2 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import Reveal from '@/components/Reveal';

export default function StepsSection() {
  const { t } = useLanguage();
  const steps = [
    { icon: Database, label: t.step_1 },
    { icon: Search, label: t.step_2 },
    { icon: Link2, label: t.step_3 },
  ];

  return (
    <section className="py-[50px] bg-bg-light">
      <div className="container-main">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
            {t.steps_title}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-[800px] mx-auto">
          {steps.map((step, i) => (
            <Reveal key={step.label} delay={i * 120}>
              <div className="flex flex-col items-center text-center">
                <span className="text-2xl md:text-3xl font-bold text-brand-blue mb-3">0{i + 1}</span>
                <step.icon className="w-16 h-16 text-text-secondary mb-4" strokeWidth={1.5} />
                <span className="text-lg md:text-xl font-bold text-text-primary">{step.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
