import { Link, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { getArticle } from '@/lib/articles';

export default function ArticleDetailPage() {
  const { slug = '' } = useParams();
  const { lang, t } = useLanguage();
  const article = getArticle(slug, lang);

  if (!article) {
    return (
      <div className="container-main py-20 text-center">
        <p className="text-text-secondary mb-4">{t.article_not_found}</p>
        <Link to="/articles" className="text-brand-blue">
          {t.article_back}
        </Link>
      </div>
    );
  }

  return (
    <article className="container-main max-w-[760px] py-12">
      <Link
        to="/articles"
        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-brand-blue mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> {t.article_back}
      </Link>
      <h1 className="text-2xl md:text-4xl font-bold text-text-primary mb-3 leading-tight">{article.title}</h1>
      <div className="text-xs text-gray-400 mb-8">
        {article.date}
        {article.tag ? ` · ${article.tag}` : ''}
      </div>
      <div
        className="prose-article text-text-primary"
        dangerouslySetInnerHTML={{ __html: article.html }}
      />
    </article>
  );
}
