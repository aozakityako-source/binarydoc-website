import { Link } from 'react-router';
import { FileText, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { getArticles } from '@/lib/articles';

export default function ArticlesSection() {
  const { t, lang } = useLanguage();
  const articles = getArticles(lang);

  if (articles.length === 0) {
    return (
      <section id="articles" className="py-[50px] bg-white border-t border-border-light">
        <div className="container-main">
          <h2 className="text-2xl md:text-[28px] font-normal text-text-primary text-center mb-10">
            {t.nav_articles}
          </h2>
          <p className="text-center text-sm text-text-secondary">{t.articles_empty}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="articles" className="py-[50px] bg-white border-t border-border-light">
      <div className="container-main">
        <h2 className="text-2xl md:text-[28px] font-normal text-text-primary text-center mb-10">
          {t.nav_articles}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[900px] mx-auto">
          {articles.map((a) => (
            <Link
              key={a.slug}
              to={`/articles/${a.slug}`}
              className="group flex gap-4 p-4 border border-border-light hover:border-brand-blue hover:shadow-card transition-all duration-300"
            >
              <div className="shrink-0 w-12 h-12 bg-bg-light flex items-center justify-center group-hover:bg-[#E8F4FD] transition-colors duration-300">
                <FileText className="w-6 h-6 text-text-secondary group-hover:text-brand-blue transition-colors duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-text-primary mb-1 group-hover:text-brand-blue transition-colors duration-300 line-clamp-1">
                  {a.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-2 line-clamp-2">{a.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {a.date}
                    {a.tag ? ` · ${a.tag}` : ''}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-blue group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
