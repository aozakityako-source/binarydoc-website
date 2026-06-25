// Single source of truth for brand identity + contact info.
// EDIT YOUR REAL CONTACT HERE. Placeholders are marked TODO.
export const siteConfig = {
  brandName: { en: 'BinaryDoc', zh: '二进制的老王' },
  tagline: 'data recovery',

  // Contact channels (user's real IDs)
  email: 'aozakisan@qq.com',
  qq: '278188016',
  wechat: 'aozakisan001',
  whatsapp: '+8615902746057',
  phone: '',                       // optional — leave '' to hide
  address: { en: '', zh: '' },     // optional — leave '' to hide

  // Social channels (user's real pages)
  bilibiliSpace: 'https://space.bilibili.com/18731657',
  youtube: 'https://www.youtube.com/@nextdoordatarecoveryshop',
  xiaohongshu: 'https://www.xiaohongshu.com/user/profile/614d7680000000000201e5db',
  douyin: '',

  // Quark root — filled in Phase 2 when free/paid model is decided
  quarkRoot: '',
} as const;

export type SiteConfig = typeof siteConfig;
