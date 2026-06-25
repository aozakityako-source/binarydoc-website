import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { Search } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import Reveal from '@/components/Reveal';

export default function SearchSection() {
  const { t } = useLanguage();
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = searchValue.trim();
    navigate(q ? `/firmware?q=${encodeURIComponent(q)}` : '/firmware');
  };

  return (
    <section className="py-[50px] bg-white">
      <div className="container-main max-w-[800px]">
        <Reveal>
          <form onSubmit={onSubmit} className="flex">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={t.search_placeholder}
              className="flex-1 px-4 py-3 border border-border-light text-sm text-text-primary font-mono placeholder:text-gray-400 focus:outline-none focus:border-brand-blue transition-colors duration-300"
            />
            <button
              type="submit"
              className="px-4 py-3 border border-l-0 border-border-light text-text-secondary hover:text-brand-blue hover:border-brand-blue transition-all duration-300"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
