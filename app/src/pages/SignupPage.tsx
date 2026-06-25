import { useLanguage } from '@/hooks/useLanguage';

export default function SignupPage() {
  const { t, lang } = useLanguage();
  return (
    <section className="py-24 bg-bg-light min-h-[60vh] flex items-center">
      <div className="container-main max-w-md mx-auto">
        <div className="bg-white p-8 shadow-card">
          <span className="font-mono text-xs text-brand-blue">// phase 2</span>
          <h1 className="text-2xl font-semibold text-text-primary mt-2 mb-6">{t.nav_signup}</h1>
          <div className="space-y-3">
            <input type="text" disabled placeholder={t.contact_name_ph}
              className="w-full px-4 py-3 border border-border-light text-sm font-mono text-text-primary/50 bg-bg-light" />
            <input type="email" disabled placeholder={t.contact_email_ph}
              className="w-full px-4 py-3 border border-border-light text-sm font-mono text-text-primary/50 bg-bg-light" />
            <input type="password" disabled placeholder={lang === 'zh' ? '密码' : 'Password'}
              className="w-full px-4 py-3 border border-border-light text-sm font-mono text-text-primary/50 bg-bg-light" />
            <button disabled className="w-full px-6 py-3 bg-brand-blue/50 text-white text-sm font-medium cursor-not-allowed">
              {t.nav_signup}
            </button>
          </div>
          <p className="text-xs text-text-secondary mt-6 font-mono">
            {lang === 'zh' ? '注册功能开发中' : 'Sign up coming soon'}
          </p>
        </div>
      </div>
    </section>
  );
}
