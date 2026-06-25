import { useState } from 'react';
import { Mail, MessageSquare, MessageCircle, Phone, Copy, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { siteConfig } from '@/config/site';

const labels = {
  qq: { zh: 'QQ', en: 'QQ' },
  wechat: { zh: '微信', en: 'WeChat' },
  whatsapp: { zh: 'WhatsApp', en: 'WhatsApp' },
  email: { zh: '邮箱', en: 'Email' },
};

type Channel = { key: keyof typeof labels; Icon: LucideIcon; value: string; href?: string };

function ContactCard({ Icon, label, value, href }: { Icon: LucideIcon; label: string; value: string; href?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <div className="flex items-center gap-4 bg-white p-4 shadow-card">
      <div className="w-10 h-10 bg-bg-light flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-brand-blue" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs text-text-secondary mb-0.5">{label}</div>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-primary font-mono break-all hover:text-brand-blue transition-colors"
          >
            {value}
          </a>
        ) : (
          <span className="text-sm text-text-primary font-mono break-all">{value}</span>
        )}
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label="复制"
        className="shrink-0 text-text-secondary hover:text-brand-blue transition-colors p-1"
      >
        {copied ? <Check className="w-4 h-4 text-brand-blue" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}

export default function ContactSection() {
  const { t, lang } = useLanguage();

  const channels: Channel[] = [
    { key: 'qq', Icon: MessageSquare, value: siteConfig.qq, href: `https://wpa.qq.com/msgrd?v=3&uin=${siteConfig.qq}&Site=BinaryDoc&Menu=yes` },
    { key: 'wechat', Icon: MessageCircle, value: siteConfig.wechat },
    { key: 'whatsapp', Icon: Phone, value: siteConfig.whatsapp, href: `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}` },
    { key: 'email', Icon: Mail, value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  ];

  return (
    <section id="contact" className="py-[50px] bg-bg-light border-t border-border-light">
      <div className="container-main max-w-[900px]">
        <h2 className="text-2xl md:text-[28px] font-normal text-text-primary text-center mb-4">
          {t.nav_contact}
        </h2>
        <p className="text-sm text-text-secondary text-center mb-10">{t.contact_subtitle}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {channels.map(({ key, Icon, value, href }) => (
            <ContactCard key={key} Icon={Icon} label={labels[key][lang]} value={value} href={href} />
          ))}
        </div>
      </div>
    </section>
  );
}
