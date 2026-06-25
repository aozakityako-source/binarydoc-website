import { useLanguage } from '@/hooks/useLanguage';

export default function DashboardPage() {
  const { lang } = useLanguage();
  return (
    <section className="py-24 bg-bg-light min-h-[60vh]">
      <div className="container-main max-w-4xl mx-auto">
        <span className="font-mono text-xs text-brand-blue">// phase 2</span>
        <h1 className="text-2xl font-semibold text-text-primary mt-2 mb-6 font-mono">
          {lang === 'zh' ? '用户后台' : 'Dashboard'}
        </h1>
        <div className="bg-white p-8 shadow-card">
          <p className="text-sm text-text-secondary font-mono leading-relaxed">
            {lang === 'zh'
              ? '后台管理功能开发中:下载记录、固件收藏、账户设置将在此呈现。'
              : 'Dashboard coming soon — download history, firmware bookmarks, and account settings will live here.'}
          </p>
        </div>
      </div>
    </section>
  );
}
