# BinaryDoc 网站改造设计 (Spec)

- **日期**: 2026-06-22
- **项目**: 把 Kimi Agent 生成的 HddSurgery 固件数据库克隆站，改造成个人品牌数据恢复综合站
- **源码位置**: `Kimi_Agent_网站复制分析/app/`
- **状态**: 设计已口头确认；待 spec 审阅 → 通过后进 writing-plans

---

## 1. 目标

把现有样本站（`Kimi_Agent_网站复制分析/app/`）从 HddSurgery 克隆改造成「二进制的老王 / BinaryDoc」个人品牌**数据恢复综合站**。Phase 1 交付一个**静态、可部署**的版本；后端 / 付费 / 登录延后到 Phase 2。

## 2. 硬约束

- **不动压缩包** `Kimi_Agent_网站复制分析.zip`。所有改动只在解压后的 `app/` 文件夹内。
- Phase 1 是纯静态站：不引入后端、数据库、支付、登录。
- 保留现有技术栈（React 19 + TS + Vite + Tailwind + react-router 7 + 自定义 i18n），不换框架。

## 3. 品牌与语言

| 项 | 中文 | 英文 |
|---|---|---|
| 品牌名 | 二进制的老王 | **BinaryDoc** |

- 保留现有中英切换（i18n Context + `useLanguage` hook），默认 `zh`。
- **避开的命名**：`StorageDoctor`（HddSurgery 真实公司名，商标冲突）、`StorageSense`（Windows 内置功能名，易混）。

## 4. 站型与信息架构（IA）

**综合站** = 品牌 + 精选视频 + 固件库 + 数据恢复服务。

### 路由与页面

| 路由 | 页面 | Phase 1 内容 |
|---|---|---|
| `/` | 首页 | Hero + 精选视频预览（3-4 条）+ 固件库入口 + 服务介绍 + 步骤 |
| `/cases` | 精选视频 | **B站视频卡片网格**（嵌入官方播放器，手动维护） |
| `/articles` | 技术文章 | 占位文案 |
| `/contact` | 联系/服务 | 联系方式 + 数据恢复服务咨询 |

### 全局组件改造
Navbar / Footer / SocialSection / DisclaimerSection 全部去 HddSurgery 化 → BinaryDoc 品牌信息（你自己的地址、联系方式、社交链接）。

> 合并决策：原样板的「镜像视频」和「精选案例」两段重合 → 合并成**单个精选视频区**（带分类标签）。

### 内容来源决策

| 内容块 | 来源 | Phase 1 做法 |
|---|---|---|
| **视频** | 用户真实 B站视频 | 手动维护的精选卡片网格（用户给 BV 号 + 标签 → 嵌入官方播放器）。**不做 YouTube。不做自动同步**（B站空间页有反爬）。 |
| **固件** | 真实目录 `N:\硬盘固件\UserDataFile` | 写脚本自动扫描生成 catalog。家族级展示。夸克链接字段留好（model-agnostic）。 |
| **文章 / 服务** | 占位 | Phase 1 用占位文案，后续替换。 |

## 5. 视觉设计 · 技术工业风（Technical/Industrial）

### 现状评估（基于代码）
样板是「深色 navbar + 浅色正文」的现代企业风，但 **Open Sans + Office 蓝 + 无等宽字** = 通用模板感，缺乏技术专家气质。唯一的技术信号是深色 navbar。`--radius: 0px`（全直角）已经偏工业风 ✓。

### 4 个改造杠杆（按影响力排序）

1. **加等宽字体（JetBrains Mono）** — 型号 / SN / 家族代号 / 导航元信息 / 区块小标题用 mono 显示。让"数据"读起来像数据，而不是散文。
2. **换主色** — `#5B9BD5`（Office 蓝）→ **`#22D3EE`（信号青）**，诊断 / 仪表盘 / 工具感。
3. **换 Logo** — `Disc3`（黑胶图标，与存储站错位）→ **硬盘盘片母题**（默认）。文字 `StorageDoctor` → `BinaryDoc`，配 mono 小标语 `// data recovery`。
4. **加一段深色 section** — 固件库目录区做成深色（数据上深底 = 终端 / 实验室感），制造视觉节奏。

### 设计 token 变更

| Token | 现状 | 改为 |
|---|---|---|
| `brand-blue` | `#5B9BD5` | `#22D3EE`（信号青） |
| `--radius` | `0px` | `0px`（保持直角，工业风核心） |
| `font-mono` | （无） | **新增 JetBrains Mono** |
| `font-sans` | Open Sans | Open Sans（保留做正文） |

## 6. 技术栈与现状

- React 19 + TypeScript 5.9 + Vite 7 + Tailwind 3.4 + react-router 7
- 自定义 i18n（Context + `useLanguage` hook）
- **大量未使用依赖**：40+ `@radix-ui/*`、`recharts`、`zod`、`react-hook-form`、`kimi-plugin-inspect-react`（已从 `vite.config.ts` 移除，需从 `package.json` 移除）
- `src/pages/Home.tsx` 是 Vite 模板死代码，未被引用
- `node_modules` 已重装修复（之前 `@babel/types` 损坏导致 React 挂载失败）

### Phase 1 技术工作清单

**删除（死代码 / 未用依赖）**
- `src/pages/Home.tsx`（Vite 模板死代码）
- `src/components/ui/` 整个 shadcn 文件夹（grep 已确认零引用）
- `package.json` 未用依赖：`@radix-ui/*`、`recharts`、`zod`、`react-hook-form`、`kimi-plugin-inspect-react`（`lucide-react` 保留——Navbar 等在用，按需删 import 即可，tree-shakeable）

**修改（去 HddSurgery 化 + 改造）**
- `Navbar.tsx`：logo 图标 + wordmark
- `HeroSection.tsx`：文案 + 配色
- `Footer.tsx`：地址 / 电话 / 邮箱 / 社交链接
- `SocialSection.tsx`、`DisclaimerSection.tsx`：品牌 / 免责文案
- `i18n/translations.ts`：所有 HddSurgery 文案 → BinaryDoc
- `tailwind.config.js`：`brand-blue` → 信号青，新增 `font-mono`
- `index.css`：引入 JetBrains Mono，调整 CSS 变量

**新增**
- 固件目录自动生成脚本（扫描 `N:\硬盘固件\UserDataFile` → 生成 catalog 数据）
- 固件库 section（深色、家族级展示、夸克链接占位）
- 精选视频卡片组件（B站 iframe 嵌入 `player.bilibili.com/player.html?bvid=...`）
- `videos.ts` 数据文件（用户维护：BV 号 + 标签 + 标题 + 简介）
- Logo 组件（硬盘盘片母题，默认）

## 7. 固件库数据模型（model-agnostic）

设计成免费 / 付费模式未定也能先用的结构：

```ts
type FirmwareFamily = {
  manufacturer: 'Seagate' | 'WDC' | 'Samsung' | string;
  familyCode: string;        // e.g. "F3 Arch"、"Marvell"
  donorCount: number;        // 该家族下 donor 数量（脚本统计）
  quarkUrl?: string;         // 夸克链接（Phase 2 填）
  quarkPwd?: string;         // 提取码
  // 免费/付费模式未定 → 字段都设可选，后续再加 paywall / price 字段
};
```

已知库结构（来自 `N:\硬盘固件\UserDataFile`）：
- Seagate F3 Arch（54 个 donor）
- WDC Marvell（61 个 donor）
- Sumsung HDD（2 个 donor）

## 8. 延后 / 不做（Phase 2+）

- 后端 API（真实下载、夸克链接动态生成）
- 用户登录 / 注册
- 支付（免费 / 付费模式确定后再做）
- YouTube 嵌入（用户暂不需要）
- 自动同步 B站视频列表（B站反爬，无公开 API）

## 9. 待 spec 审阅时确认的默认选择

| 项 | 默认 | 备选 |
|---|---|---|
| **Logo 母题** | 硬盘盘片剪影 | 二进制 `01` / 扇区网格 |
| **主色** | 信号青 `#22D3EE` | 电光蓝 `#3B82F6`（若嫌青太冷） |
| **spec 存放位置** | 本文件所在 `docs/specs/`（项目内） | 可改到 `N:\VIBE CODING\docs\superpowers\specs\`（仓库根） |
