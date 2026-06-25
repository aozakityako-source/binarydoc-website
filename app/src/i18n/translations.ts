export const translations = {
  en: {
    // Navbar
    nav_home: 'Home',
    nav_cases: 'Cases',
    nav_articles: 'Tech Articles',
    nav_contact: 'Contact',
    nav_firmware: 'Firmware',
    nav_login: 'Log in',
    nav_signup: 'Sign up',

    // Hero
    hero_title: 'Data Recovery, Down to the Binary',
    hero_subtitle: 'Firmware library, recovery cases, and field notes from a specialist.',
    hero_cta_cases: 'View Cases',
    hero_cta_firmware: 'Browse Firmware',

    // Steps
    steps_title: 'Find firmware in three steps',
    step_1: 'Pick manufacturer & family',
    step_2: 'Locate the firmware family',
    step_3: 'Get the donor link',

    // Search
    search_placeholder: 'family code · model · donor',

    // Manufacturer
    manufacturer_title: 'Browse by manufacturer',

    // Firmware
    firmware_title: 'Firmware Library',
    firmware_subtitle: 'Family-level donor resources, parsed live from the local archive.',
    firmware_donors: 'donors',
    firmware_get_link: 'Get link',

    // Cases (video grid)
    cases_title: 'Recovery Cases',
    cases_subtitle: 'Selected walkthroughs from the channel.',

    // Disclaimer (slimmed — no paywall)
    disclaimer_title: 'Firmware Library Disclaimer',
    disclaimer_li1_a: 'Firmware in this library is intended strictly for professional data recovery, not for the general public. These files are ',
    disclaimer_li1_b: 'not firmware updates',
    disclaimer_li1_c: '. Only qualified specialists should handle them. Improper use may cause permanent drive damage and total data loss.',
    disclaimer_li2: 'You use these files entirely at your own risk. Recovery success cannot be guaranteed by firmware alone.',
    disclaimer_li3: 'You are responsible for determining compatibility with your drives and tools, and for protecting your backups. BinaryDoc is not liable for any damage arising from use or modification of these files.',
    disclaimer_li4: 'BinaryDoc does not guarantee the quality or function of donor files, as they are extracted from patient drives during real recovery work.',

    // Articles
    articles_title: 'Tech Articles',
    article_not_found: 'Article not found or unavailable.',
    article_back: '← Back to articles',
    articles_empty: 'No articles yet.',

    // Contact
    contact_subtitle: 'Reach out for data recovery or technical inquiries.',
    contact_quick_msg: 'Quick Message',
    contact_name_ph: 'Your Name',
    contact_email_ph: 'Email Address',
    contact_msg_ph: 'Describe your data recovery needs...',
    contact_send: 'Send Message',
  },
  zh: {
    nav_home: '首页',
    nav_cases: '案例',
    nav_articles: '技术文章',
    nav_contact: '联系我们',
    nav_firmware: '固件库',
    nav_login: '登录',
    nav_signup: '注册',

    hero_title: '数据恢复，直抵二进制',
    hero_subtitle: '固件库、实战案例，与一线数据恢复笔记。',
    hero_cta_cases: '查看案例',
    hero_cta_firmware: '浏览固件库',

    steps_title: '三步找到固件',
    step_1: '选厂商与家族',
    step_2: '定位固件家族',
    step_3: '获取 donor 链接',

    search_placeholder: '家族代号 · 型号 · donor',

    manufacturer_title: '按厂商浏览',

    firmware_title: '固件库',
    firmware_subtitle: '家族级 donor 资源，从本地存档实时解析。',
    firmware_donors: '个 donor',
    firmware_get_link: '获取链接',

    cases_title: '数据恢复案例',
    cases_subtitle: '来自频道的精选实战。',

    disclaimer_title: '固件库免责声明',
    disclaimer_li1_a: '本库固件严格用于专业数据恢复，不面向普通公众。这些文件',
    disclaimer_li1_b: '不是固件更新',
    disclaimer_li1_c: '，仅限合格专家操作。误用可能导致硬盘永久损坏与数据全部丢失。',
    disclaimer_li2: '使用这些文件的风险由使用者自行承担。仅凭固件无法保证恢复成功。',
    disclaimer_li3: '你有责任判断文件与硬盘及工具的兼容性，并保护好备份。BinaryDoc 对因使用或修改这些文件造成的任何损害不承担责任。',
    disclaimer_li4: 'BinaryDoc 不保证 donor 文件的质量与功能，因为它们提取自真实恢复中的患者盘。',

    articles_title: '技术文章',
    article_not_found: '文章不存在或已下线。',
    article_back: '← 返回文章列表',
    articles_empty: '暂无文章。',

    contact_subtitle: '如有数据恢复需求或技术咨询，请随时联系。',
    contact_quick_msg: '快速留言',
    contact_name_ph: '您的姓名',
    contact_email_ph: '电子邮箱',
    contact_msg_ph: '请描述您的数据恢复需求...',
    contact_send: '发送消息',
  },
} as const;

export type Language = 'en' | 'zh';
export type Translations = Record<string, string>;
