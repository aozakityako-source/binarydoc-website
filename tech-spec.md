# 技术规格 - HddSurgery Firmware Database

## 依赖

| 包名 | 版本 | 用途 |
|------|------|------|
| react | ^18.3.1 | UI 框架 |
| react-dom | ^18.3.1 | DOM 渲染 |
| @fontsource/open-sans | ^5.0.28 | Open Sans 字体 |
| lucide-react | ^0.460.0 | 图标库 |
| tailwindcss | ^3.4.19 | 样式框架 |
| typescript | ^5.6.2 | 类型系统 |
| vite | ^6.0.0 | 构建工具 |

## 组件清单

### 布局组件

| 组件 | 来源 | 复用 | 说明 |
|------|------|------|------|
| Navbar | 自定义 | 否 | 透明背景导航，含 logo 和登录/注册按钮 |
| Footer | 自定义 | 否 | 灰色背景页脚，含社交图标和联系信息 |

### Section 组件

| 组件 | 来源 | 复用 | 说明 |
|------|------|------|------|
| HeroSection | 自定义 | 否 | 全屏背景图 + 遮罩 + 标题 + CTA 按钮 |
| StepsSection | 自定义 | 否 | 三步骤展示，浅灰背景 |
| SearchSection | 自定义 | 否 | 搜索输入框区域 |
| ManufacturerSection | 自定义 | 否 | 制造商列表 |
| DisclaimerSection | 自定义 | 否 | 免责声明文本 |
| ToolsSection | 自定义 | 否 | 产品卡片网格 |
| SocialSection | 自定义 | 否 | 社交媒体图标 |

### 可复用组件

| 组件 | 来源 | 复用 | 说明 |
|------|------|------|------|
| ToolCard | 自定义 | ToolsSection 内复用 | 产品图片 + 标题覆盖层 |

## 动画实现

| 动画 | 库 | 实现方式 | 复杂度 |
|------|------|---------|--------|
| 按钮 hover 反转 | Tailwind CSS | `hover:bg-white hover:text-black` transition | 低 |
| 链接 hover 下划线 | Tailwind CSS | `hover:underline` | 低 |
| 产品卡片图片放大 | Tailwind CSS | `group-hover:scale-105` + `overflow-hidden` | 低 |
| 社交图标 hover 变色 | Tailwind CSS | `hover:text-[#5B9BD5]` | 低 |
| 页面平滑滚动 | CSS | `scroll-behavior: smooth` | 低 |

## 状态与逻辑

本项目为静态展示页面，无复杂状态管理：
- 搜索框使用本地受控组件状态（value + onChange）
- 所有交互均为 CSS hover 效果，无需 JavaScript 状态
- 无需路由、API 调用或全局状态管理

## 样式策略

- 使用 Tailwind CSS 工具类为主
- 自定义颜色通过 tailwind.config.js 扩展
- 字体通过 @fontsource/open-sans 导入
- 响应式断点：sm(640px), md(768px), lg(1024px)
- 移动端适配：网格自动降级为 1-2 列

## 其他决策

- 所有图片使用 `public/` 目录下的静态资源
- 产品卡片采用 CSS Grid 布局（3列 → 2列 → 1列 响应式）
- 导航栏固定在顶部，z-index 最高
- Hero 区域使用 `100vh` 确保全屏
