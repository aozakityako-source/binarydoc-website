// Bilibili videos for the /cases grid.
// Imported from https://space.bilibili.com/18731657/video (latest 30, 2026-06-23).
// `cover` is the Bilibili cover thumbnail (i.hdslb.com), https-normalized;
// loaded with referrerPolicy="no-referrer" in VideoCard to avoid hotlink blocking.
// Tags are auto-assigned by topic from the title; refine freely.
// TO ADD MORE: copy a block, paste the BV id from the video URL
//   (e.g. https://www.bilibili.com/video/BV1xx411c7mD  →  bvid: 'BV1xx411c7mD')
//   and fill zh/en title + a short tag + the cover URL.
export interface VideoEntry {
  bvid: string;
  cover: string;
  tag: { zh: string; en: string };
  title: { zh: string; en: string };
}

export const videos: VideoEntry[] = [
  { bvid: 'BV1jbV36FE1P', cover: 'https://i0.hdslb.com/bfs/archive/527d205c06d510ed609e0ec9e863984788f1d6f1.jpg', tag: { zh: '选购指南', en: 'Buying Guide' }, title: { zh: '2026年618「机械硬盘」翻新鉴定指南', en: '2026年618「机械硬盘」翻新鉴定指南' } },
  { bvid: 'BV1YJGQ6eEmm', cover: 'https://i1.hdslb.com/bfs/archive/2622057a08a4e12d65629f0c460d68b243986bb8.jpg', tag: { zh: 'U盘恢复', en: 'USB Recovery' }, title: { zh: 'U盘掉水里，还能恢复数据吗？', en: 'U盘掉水里，还能恢复数据吗？' } },
  { bvid: 'BV1Q1596GEMm', cover: 'https://i1.hdslb.com/bfs/archive/7f116cfbb4615ca0aea01dc777e9e56d32376117.jpg', tag: { zh: '氦气盘', en: 'Helium HDD' }, title: { zh: '【数据恢复】听声辨故障！氦气盘异响的几种可能性', en: '【数据恢复】听声辨故障！氦气盘异响的几种可能性' } },
  { bvid: 'BV1jEAaz3Ekq', cover: 'https://i2.hdslb.com/bfs/archive/f497b8fee4ee9e69ac4fc7fb74aca068c0ef1d87.jpg', tag: { zh: '氦气盘', en: 'Helium HDD' }, title: { zh: '网友报废了一箱子氦气硬盘，直接崩溃，看小伙这波操作能否挽回损失', en: '网友报废了一箱子氦气硬盘，直接崩溃，看小伙这波操作能否挽回损失' } },
  { bvid: 'BV1fTZQBQEmm', cover: 'https://i2.hdslb.com/bfs/archive/dc62f7cc60eecbb481b4a9a1851aef4744e06cce.jpg', tag: { zh: 'Western Digital', en: 'Western Digital' }, title: { zh: '西数监控盘数据恢复，真的别再用Diskgenius扫盘了', en: '西数监控盘数据恢复，真的别再用Diskgenius扫盘了' } },
  { bvid: 'BV1UscszKE7F', cover: 'https://i1.hdslb.com/bfs/archive/6a40be62b139f445e5e7ca33bd45b736f1f1f29f.jpg', tag: { zh: '开盘换磁头', en: 'Head Swap' }, title: { zh: '三天三夜，开盘恢复希捷老硬盘', en: '三天三夜，开盘恢复希捷老硬盘' } },
  { bvid: 'BV1wyFCzGE83', cover: 'https://i1.hdslb.com/bfs/archive/f19221bf1c63b52d85f7b95a8593efadd759edfd.jpg', tag: { zh: '数据恢复', en: 'Data Recovery' }, title: { zh: '硬盘坏了别直接丢，企业级的硬盘还是有维修价值的', en: '硬盘坏了别直接丢，企业级的硬盘还是有维修价值的' } },
  { bvid: 'BV1E4mEBeEp7', cover: 'https://i0.hdslb.com/bfs/archive/9fc5dff2bb468e5fd6a272f72df4cfac06ffd7ae.jpg', tag: { zh: '海康威视', en: 'Hikvision' }, title: { zh: '海康AI监控硬盘数据恢复', en: '海康AI监控硬盘数据恢复' } },
  { bvid: 'BV1ZFSjBcEzh', cover: 'https://i2.hdslb.com/bfs/archive/15fe548b8fda4a953304246c7617b700672dd1e4.jpg', tag: { zh: 'NAS', en: 'NAS' }, title: { zh: 'NAS硬盘挂了，数据恢复流程和自救成本', en: 'NAS硬盘挂了，数据恢复流程和自救成本' } },
  { bvid: 'BV1Je2TBKEqF', cover: 'https://i2.hdslb.com/bfs/archive/27644efb736545b2eeff9cd7b6d7116c12eaa7b6.jpg', tag: { zh: '数据恢复', en: 'Data Recovery' }, title: { zh: '我要守护属于我的容量', en: '我要守护属于我的容量' } },
  { bvid: 'BV1bGxEz7E6u', cover: 'https://i2.hdslb.com/bfs/archive/d9e18165538b72931982e3ca50fa983d362603eb.jpg', tag: { zh: 'Western Digital', en: 'Western Digital' }, title: { zh: '西数HA340坏道数据恢复', en: '西数HA340坏道数据恢复' } },
  { bvid: 'BV1xWWMzGEet', cover: 'https://i1.hdslb.com/bfs/archive/70f7e05d59881068e02e2bc2eb35b4051e8fd96e.jpg', tag: { zh: '选购指南', en: 'Buying Guide' }, title: { zh: '夯到拉锐评机械硬盘', en: '夯到拉锐评机械硬盘' } },
  { bvid: 'BV16iHDzjELe', cover: 'https://i2.hdslb.com/bfs/archive/d59b22f6949f536ccbac273829a1716f1d97a35a.jpg', tag: { zh: '固件', en: 'Firmware' }, title: { zh: '硬盘固件级别的加密，安全但不好用', en: '硬盘固件级别的加密，安全但不好用' } },
  { bvid: 'BV1bXthzxE89', cover: 'https://i1.hdslb.com/bfs/archive/f822f7e03d1eb1cf03763c1bef03cb8354641e30.jpg', tag: { zh: '选购指南', en: 'Buying Guide' }, title: { zh: '买硬盘附赠数据恢复服务，但是不保证成功', en: '买硬盘附赠数据恢复服务，但是不保证成功' } },
  { bvid: 'BV1QdhgzCEEu', cover: 'https://i1.hdslb.com/bfs/archive/0086f18b32f00561501225f061ecff7bb48060d8.jpg', tag: { zh: '数据恢复', en: 'Data Recovery' }, title: { zh: '14TB矿渣盘回炉重造，修好继续矿洞作业', en: '14TB矿渣盘回炉重造，修好继续矿洞作业' } },
  { bvid: 'BV1YR3RzWEhD', cover: 'https://i0.hdslb.com/bfs/archive/b058a53666ccd2345ef0909fd2349b9a6f244faf.jpg', tag: { zh: '氦气盘', en: 'Helium HDD' }, title: { zh: '氦气盘摔了，数据没有备份，结果很难受', en: '氦气盘摔了，数据没有备份，结果很难受' } },
  { bvid: 'BV1uDTczXEV8', cover: 'https://i2.hdslb.com/bfs/archive/03f8b4747f19a9e685db17652934f088cade36c1.jpg', tag: { zh: '固态硬盘', en: 'SSD' }, title: { zh: '固态硬盘数据恢复，开机连硬盘都检测不到了', en: '固态硬盘数据恢复，开机连硬盘都检测不到了' } },
  { bvid: 'BV1zuKNzVEXb', cover: 'https://i1.hdslb.com/bfs/archive/52bfe52ce362bb46e0e3175482db53dfa781950d.jpg', tag: { zh: '开盘换磁头', en: 'Head Swap' }, title: { zh: '希捷氦气盘经典故障，磁头卡死电机不转', en: '希捷氦气盘经典故障，磁头卡死电机不转' } },
  { bvid: 'BV1Jo7mzhESJ', cover: 'https://i0.hdslb.com/bfs/archive/29951f83db3d9289491fb32d7eb1bf51d21c08c4.jpg', tag: { zh: '固件', en: 'Firmware' }, title: { zh: '完了，硬盘的密码失效了', en: '完了，硬盘的密码失效了' } },
  { bvid: 'BV1yQ7KzXEft', cover: 'https://i0.hdslb.com/bfs/archive/01ac13e312fb72630ed37c497c1bfce074fee13b.jpg', tag: { zh: 'RAID', en: 'RAID' }, title: { zh: '磁盘阵列数据恢复', en: '磁盘阵列数据恢复' } },
  { bvid: 'BV1b1EWzyE5a', cover: 'https://i0.hdslb.com/bfs/archive/75e016fe6a839b94dd3ec1edb716af9423217bb1.jpg', tag: { zh: '固态硬盘', en: 'SSD' }, title: { zh: '师傅，固态硬盘能做数据恢复吗？', en: '师傅，固态硬盘能做数据恢复吗？' } },
  { bvid: 'BV1BWVozgEcd', cover: 'https://i0.hdslb.com/bfs/archive/60d90754704c50dd37338e1445e848fcdfb7ca58.jpg', tag: { zh: 'LaCie', en: 'LaCie' }, title: { zh: '莱斯LaCie移动硬盘数据恢复，这玩意到底是不是智商税？', en: '莱斯LaCie移动硬盘数据恢复，这玩意到底是不是智商税？' } },
  { bvid: 'BV1TSVPzkE1q', cover: 'https://i0.hdslb.com/bfs/archive/85f4bbbdc6bfc82e4bff58b39385dc180388bc4b.jpg', tag: { zh: '氦气盘', en: 'Helium HDD' }, title: { zh: '氦气盘批量修复，把数据恢复干成流水线', en: '氦气盘批量修复，把数据恢复干成流水线' } },
  { bvid: 'BV14FLdzREiP', cover: 'https://i2.hdslb.com/bfs/archive/97f5cd0d58e541bab1bcfac84d73d66c0d0c14d1.jpg', tag: { zh: '开盘换磁头', en: 'Head Swap' }, title: { zh: '【数据恢复】为了救这个盘的数据，牺牲了2个希捷酷鹰', en: '【数据恢复】为了救这个盘的数据，牺牲了2个希捷酷鹰' } },
  { bvid: 'BV1nkL4zYEWq', cover: 'https://i1.hdslb.com/bfs/archive/b308046de3c139428d67a5f199b7f7d69c5550fb.jpg', tag: { zh: '数据恢复', en: 'Data Recovery' }, title: { zh: '刚买的硬盘还没捂热就坏了', en: '刚买的硬盘还没捂热就坏了' } },
  { bvid: 'BV16JLAzcEiv', cover: 'https://i0.hdslb.com/bfs/archive/05a2008522d992868a183b189dd3ff9d3e1b74ad.jpg', tag: { zh: 'Toshiba', en: 'Toshiba' }, title: { zh: '东芝3TB硬盘数据救援，又要给某宝擦屁股', en: '东芝3TB硬盘数据救援，又要给某宝擦屁股' } },
  { bvid: 'BV1yy5sz8EFg', cover: 'https://i2.hdslb.com/bfs/archive/1ee1eb224a5bd27175dc95a1eaea9c5adddb6543.jpg', tag: { zh: '选购指南', en: 'Buying Guide' }, title: { zh: '机械硬盘翻新清零怎么鉴别？SMART被清除后其实是有痕迹的', en: '机械硬盘翻新清零怎么鉴别？SMART被清除后其实是有痕迹的' } },
  { bvid: 'BV1cSZRY3EWT', cover: 'https://i0.hdslb.com/bfs/archive/50a630b82fb61bcacea9d68f56903299bb9ca009.jpg', tag: { zh: '软件工具', en: 'Software' }, title: { zh: '数据恢复神器R-Studio实战指南', en: '数据恢复神器R-Studio实战指南' } },
  { bvid: 'BV1oSKVeBEuF', cover: 'https://i2.hdslb.com/bfs/archive/7dc38d653af05304c05f3a8385366a40315045f4.jpg', tag: { zh: 'Seagate', en: 'Seagate' }, title: { zh: '跨国数据救援，协助巴西数据恢复工程师修复一块希捷硬盘', en: '跨国数据救援，协助巴西数据恢复工程师修复一块希捷硬盘' } },
  { bvid: 'BV1BPFQewECr', cover: 'https://i0.hdslb.com/bfs/archive/6bafef6952556fc3bd6464a3b164b647bb864b11.jpg', tag: { zh: '数据恢复', en: 'Data Recovery' }, title: { zh: '硬盘坏了无法读出数据，小白如何判断故障点？是否能自行处理？', en: '硬盘坏了无法读出数据，小白如何判断故障点？是否能自行处理？' } },
];

// YouTube videos — shown on /cases when language is English (Bilibili for Chinese).
// Cover from i.ytimg.com/vi/<id>; titles via oembed, 2026-06-24 (re-scraped).
export interface YoutubeEntry { id: string; cover: string; tag: string; title: string; }

export const youtubeVideos: YoutubeEntry[] = [
  {"id":"naOfVJm4st4","cover":"https://i.ytimg.com/vi/naOfVJm4st4/hqdefault.jpg","tag":"Buying Guide","title":"「机械硬盘」翻新鉴定指南"},
  {"id":"It7fC7bNg0Q","cover":"https://i.ytimg.com/vi/It7fC7bNg0Q/hqdefault.jpg","tag":"Helium HDD","title":"【数据恢复】听声辨故障！氦气盘异响的几种可能性"},
  {"id":"-JlSXhsj5Dg","cover":"https://i.ytimg.com/vi/-JlSXhsj5Dg/hqdefault.jpg","tag":"Helium HDD","title":"网友报废了一箱子氦气硬盘，直接崩溃，看小伙这波操作能否挽回损失"},
  {"id":"STuZ5PwzbMA","cover":"https://i.ytimg.com/vi/STuZ5PwzbMA/hqdefault.jpg","tag":"Data Recovery","title":"西数监控盘数据恢复，真的别再用Diskgenius扫盘了"},
  {"id":"dse0pi6PDUo","cover":"https://i.ytimg.com/vi/dse0pi6PDUo/hqdefault.jpg","tag":"Head Swap","title":"三天三夜，开盘恢复希捷老硬盘"},
  {"id":"m09oH93rADY","cover":"https://i.ytimg.com/vi/m09oH93rADY/hqdefault.jpg","tag":"Data Recovery","title":"硬盘坏了别直接丢，企业级的硬盘还是有维修价值的"},
  {"id":"YOnEpbcFOzg","cover":"https://i.ytimg.com/vi/YOnEpbcFOzg/hqdefault.jpg","tag":"Data Recovery","title":"我要守护属于我的容量"},
  {"id":"7DdKg8-K55w","cover":"https://i.ytimg.com/vi/7DdKg8-K55w/hqdefault.jpg","tag":"Data Recovery","title":"西数HA340坏道数据恢复"},
  {"id":"5FSeP_iuv6E","cover":"https://i.ytimg.com/vi/5FSeP_iuv6E/hqdefault.jpg","tag":"Firmware","title":"硬盘固件级别的加密，安全但不好用"},
  {"id":"aQ9YoHP2bsU","cover":"https://i.ytimg.com/vi/aQ9YoHP2bsU/hqdefault.jpg","tag":"Data Recovery","title":"买硬盘附赠数据恢复服务，但是不保证成功"},
  {"id":"J8mEQ0L34pE","cover":"https://i.ytimg.com/vi/J8mEQ0L34pE/hqdefault.jpg","tag":"Data Recovery","title":"14TB矿渣盘回炉重造，修好继续矿洞作业"},
  {"id":"tlhjLl6zWXU","cover":"https://i.ytimg.com/vi/tlhjLl6zWXU/hqdefault.jpg","tag":"Helium HDD","title":"氦气盘摔了，数据没有备份，结果很难受"},
  {"id":"aFVv2vN_u_o","cover":"https://i.ytimg.com/vi/aFVv2vN_u_o/hqdefault.jpg","tag":"Data Recovery","title":"Cutting hard drive"},
  {"id":"ljsCechzHKQ","cover":"https://i.ytimg.com/vi/ljsCechzHKQ/hqdefault.jpg","tag":"SSD","title":"固态硬盘数据恢复，开机连硬盘都检测不到了"},
  {"id":"X0MN2eTK5AM","cover":"https://i.ytimg.com/vi/X0MN2eTK5AM/hqdefault.jpg","tag":"Head Swap","title":"希捷氦气盘经典故障，磁头卡死电机不转"},
  {"id":"Y8kYgZNKnRo","cover":"https://i.ytimg.com/vi/Y8kYgZNKnRo/hqdefault.jpg","tag":"Firmware","title":"完了，硬盘的密码失效了"},
  {"id":"4kI4ovzv29o","cover":"https://i.ytimg.com/vi/4kI4ovzv29o/hqdefault.jpg","tag":"RAID","title":"磁盘阵列数据恢复"},
  {"id":"oeOH6z_Cqco","cover":"https://i.ytimg.com/vi/oeOH6z_Cqco/hqdefault.jpg","tag":"SSD","title":"师傅，固态硬盘能做数据恢复吗？"},
  {"id":"tN-XUAUHu8w","cover":"https://i.ytimg.com/vi/tN-XUAUHu8w/hqdefault.jpg","tag":"Data Recovery","title":"莱斯LaCie移动硬盘数据恢复，这玩意到底是不是智商税？"},
  {"id":"EPRFauywsbM","cover":"https://i.ytimg.com/vi/EPRFauywsbM/hqdefault.jpg","tag":"Helium HDD","title":"氦气盘批量修复，把数据恢复干成流水线"},
  {"id":"NWFN9hOCl0o","cover":"https://i.ytimg.com/vi/NWFN9hOCl0o/hqdefault.jpg","tag":"Data Recovery","title":"【数据恢复】为了救这个盘的数据，牺牲了2个希捷酷鹰"},
  {"id":"KgifCwUAEuQ","cover":"https://i.ytimg.com/vi/KgifCwUAEuQ/hqdefault.jpg","tag":"Data Recovery","title":"刚买的硬盘还没捂热就坏了"},
  {"id":"Nu54VPRzU14","cover":"https://i.ytimg.com/vi/Nu54VPRzU14/hqdefault.jpg","tag":"Data Recovery","title":"东芝3TB硬盘数据救援，又要给某宝擦屁股"},
  {"id":"fajJCD1eo5o","cover":"https://i.ytimg.com/vi/fajJCD1eo5o/hqdefault.jpg","tag":"Buying Guide","title":"机械硬盘翻新清零怎么鉴别？SMART被清除后其实是有痕迹的"},
  {"id":"KpUFKNaHzBo","cover":"https://i.ytimg.com/vi/KpUFKNaHzBo/hqdefault.jpg","tag":"Data Recovery","title":"数据恢复神器R-Studio实战指南"},
  {"id":"MTb2WL1JyJ0","cover":"https://i.ytimg.com/vi/MTb2WL1JyJ0/hqdefault.jpg","tag":"Data Recovery","title":"Common Data Recovery Procedure by Experts"},
  {"id":"OjmX2fDGODw","cover":"https://i.ytimg.com/vi/OjmX2fDGODw/hqdefault.jpg","tag":"Data Recovery","title":"硬盘坏了无法读出数据，小白如何判断故障点？是否能自行处理？"},
  {"id":"o2rXB_nTGKI","cover":"https://i.ytimg.com/vi/o2rXB_nTGKI/hqdefault.jpg","tag":"SSD","title":"固态硬盘坏了一般是怎么做数据恢复的？"},
  {"id":"CTXiU1UHmYU","cover":"https://i.ytimg.com/vi/CTXiU1UHmYU/hqdefault.jpg","tag":"Data Recovery","title":"海康威视专用硬盘到底能不能用"},
  {"id":"bGYVzFaitdQ","cover":"https://i.ytimg.com/vi/bGYVzFaitdQ/hqdefault.jpg","tag":"Data Recovery","title":"硬盘莫名其妙就坏了，摄影素材全部丢失，如何恢复数据？"},
];
