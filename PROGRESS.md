# BinaryDoc 网站改造 · 项目进度

| | |
|---|---|
| **版本** | `v2`(存档 tag `v2`)— 详见下方「版本历史」 |
| **日期** | 2026-06-23 |
| **状态** | 静态站可运行/可部署;案例页已接入 B站视频(封面+灯箱);Phase 2(固件下载系统)设计中 |
| **Git** | 分支 `master`,HEAD `4556380`;版本存档用 git tag |

---

## 0. 版本历史

本项目用 **git tag** 做版本存档:每个 tag = 该时刻源码 + MD 文件的永久快照,**新建版本不会覆盖旧版本**,可随时回到任意历史版本。源码改动始终只在 `app/` 与本目录的 MD 文件内(原始 `Kimi_Agent_网站复制分析.zip` 不动)。

| 版本 | 日期 | tag | HEAD | 说明 |
|---|---|---|---|---|
| V1 | 2026-06-22 | `v0.1.0` | `5842034` | Phase 1 静态站完成(去 HddSurgery、视觉重做、固件库、视频网格占位) |
| **V2** | 2026-06-23 | `v2` | `4556380` | +B站最新 30 视频导入 / 封面图 / 视频灯箱 |

**查看与回退任意版本:**
```bash
git tag                      # 列出所有版本
git checkout v2              # 整体切到 v2(只读查看)
git checkout v2 -- app       # 仅把 app/ 恢复到 v2
git checkout master          # 回到最新
```

**打下一个版本(每次改动后):**
1. 更新本文件「版本历史」表(加一行、改顶部版本号/日期)。
2. 提交并打标签(版本号递增 v3、v4…):
```bash
git add <文件> && git commit -m "<msg>"
git tag -a vN -m "VN — 简述本次变更"
```

---

## 1. 项目概述

把 Kimi Agent 生成的 HddSurgery 固件库克隆站,改造成个人品牌数据恢复综合站「**二进制的老王 / BinaryDoc**」。源码在 `app/`(压缩包 `Kimi_Agent_网站复制分析.zip` 为原始样板,未改动)。

- **品牌**:二进制的老王 / BinaryDoc,中英双语切换(保留 i18n Context)。
- **站型**:综合站 = 品牌 + 精选视频 + 固件库 + 服务。

## 2. 当前版本状态(v0.1.0,Phase 1)

静态、可部署的完整站点。无后端、无数据库、无支付。后端/下载/付费/登录均为 Phase 2。

## 3. 已完成功能

**v2 新增(2026-06-23)**
- **B站视频批量导入**:`/cases` 接入 B站最新 30 个投稿(`app/src/data/videos.ts`,从 `space.bilibili.com/18731657/video` 抓取 bvid+标题;3 条乱码标题用 view 接口补全)。
- **视频封面**:卡片由"▶ load player"文字改为 B站封面缩略图 + 播放按钮覆盖层(`cover` 字段,`referrerPolicy="no-referrer"` 绕过 hdslb 防盗链,实测 0 失败)。
- **视频灯箱**:点卡片 → 播放器放大居中(max 1100px、16:9、自动播放),Esc / 点遮罩 / × 三路关闭,锁背景滚动(`app/src/components/VideoModal.tsx`,createPortal→body)。

**品牌与去 HddSurgery 化**
- 全站清除 HddSurgery 文字(地址、电话、邮箱、Helpdisc/Smilesoft、PayPal 付费墙、hddsurgery.com 链接)→ BinaryDoc。
- 免责声明从 7 条(含 1 欧元 PayPal)精简为 4 条。
- 登录/注册/用户后台路由预留(`/login` `/signup` `/dashboard`,Phase 2 占位)。

**信息架构**
- `/` 首页:hero + 三步 + 搜索 + 厂商卡片。
- `/firmware` 固件库(独立页面,深色 section)。
- `/cases` Bilibili 视频卡片网格。
- `/articles` `/contact`。
- 子页内容下移 `pt-16`,避开固定导航栏遮挡。

**视觉(参照 firmware.hddsurgery.com)**
- 字体:Open Sans(实测对齐 HddSurgery:h1 50px/700、板块标题 40px、body 16px/medium)。small text 加粗加大(text-sm 15px/500、text-xs 14px/500)。
- 配色:信号青 `#22D3EE` 强调;直角圆角 `--radius: 0`。
- Logo:用户提供的图片,圆形裁剪(`rounded-full`)。
- Hero:85vh,DATA RECOVERY 标语放大到 40px。

**固件库**
- `scripts/gen-firmware.mjs` 扫描 `N:\硬盘固件\UserDataFile` 自动生成目录(TDD:`gen-firmware.test.mjs`)。
- **117 个家族**:Seagate 54 / Western Digital 61 / Samsung 2;Hitachi、Toshiba 卡位(库内暂无,显示 `· 0`)。
- 深色卡片网格 + 厂商筛选 chips + 搜索;"获取链接"按钮预留(Phase 2 接夸克/下载)。
- 厂商卡片点击 → `/firmware?mfr=<厂商>` 自动套用筛选(`useSearchParams`)。

**视频**
- `/cases` 嵌入用户 B 站视频(B 站官方播放器 iframe,懒加载)。

**清理**
- 删死代码(Home.tsx、ToolsSection、ToolCard、shadcn `ui/`、`lib/utils.ts`)。
- 卸 140+ 未用依赖(@radix-ui/*、recharts、zod 等)。构建产物 ~272KB(gzip 84KB)。

## 4. 技术栈

React 19 + TypeScript 5.9 + Vite 7 + Tailwind 3.4 + react-router 7 + 自定义 i18n(Context)。字体 `@fontsource/open-sans`(400/500/600/700)。固件生成器用 Node `--test`。

## 5. 关键文件

| 文件 | 用途 |
|---|---|
| `app/src/config/site.ts` | 品牌/联系方式(邮箱/电话/地址占位、B站空间)—— **用户填真信息** |
| `app/src/data/videos.ts` | B 站视频条目(BV 号 + 标签)—— **用户填真 BV 号** |
| `app/src/data/firmware.ts` | **自动生成**,勿手改(`npm run gen:firmware`) |
| `app/src/i18n/translations.ts` | 全部中英文案 |
| `app/scripts/gen-firmware.mjs` | 固件目录生成器(读 `N:\硬盘固件\UserDataFile`) |
| `app/docs/specs/` `app/docs/plans/` | 设计 spec + 实施计划 |

## 6. 运行方式

```bash
cd "N:/VIBE CODING/01-Projects/Website Design/Kimi_Agent_网站复制分析/app"
npm install                # 用 https://registry.npmmirror.com 镜像
npm run dev                # 开发,端口 5173
npm run build              # 产物 dist/
npm test                   # 固件生成器单测
npm run gen:firmware       # 固件库有变动时重新生成 catalog
```

## 7. 用户待办(Phase 1 收尾)

- [ ] `app/src/config/site.ts`:占位邮箱 `hello@binarydoc.cn` 换成真实邮箱;选填电话/地址。
- [ ] `app/src/data/videos.ts`:3 个占位 BV 号换成真实视频 BV 号 + 标题/标签。

## 8. 下一步 · Phase 2(固件下载系统)

**已定方向(本次 brainstorm):**
- 固件上传到**腾讯云 COS**,用 **rclone** 做上传/维护(`rclone sync` 本地 → COS)。
- 架构按 **方案 B**(私有 COS 桶 + 后端签发**预签名 URL**),便于将来接积分/付费。
- **初始阶段所有人可下载**(公开/免校验),后续再加积分或付费校验(只改"放行策略",不动骨架)。
- 每个 firmware 一个下载链接。

**待定(下一轮 brainstorm):**
- 粒度:每个 donor 盘单独链接,还是每个家族打 zip?
- 后端宿主:Vercel serverless vs VPS?
- 积分 / 付费模型细节(可后定,B 架构不阻塞)。

## 9. 提交历史

**v0.1.0 轮**:30+ 提交,前缀 `binarydoc`,涵盖 site config → translations → de-brand → design tokens → logo/navbar → hero/steps/manufacturer → 固件生成器+目录 → 深色固件区 → B 站视频网格 → 死码清理 → /firmware 分页 + auth 路由 → 字体对齐 HddSurgery → 圆形 logo → 厂商卡片跳转 → 导航栏 offset → 字号加粗放大。

**v2 轮**(`8e80212` / `14072e9` / `4556380`):B站视频批量导入 → 封面图+播放覆盖层 → 视频灯箱。

详见 `git log` 与上方「版本历史」表。
