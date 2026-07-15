<div align="center">

<img src="public/Family-001.png" alt="YYC³ Dynasty · 三省六部" width="860" />

# YYC³ Dynasty · 三省六部

**_YanYuCloudCube_**
_言启象限 | 语枢未来_
**_Words Initiate Quadrants, Language Serves as Core for Future_**

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.3-646cff?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss&logoColor=white)
![Tests](https://img.shields.io/badge/tests-320%20passed-22c55e)
![License](https://img.shields.io/badge/license-MIT-d4a843)

</div>

---

基于古典「三省六部」制度的 AI Agent 协作管理看板系统。以洛阳紫微城中轴线为空间隐喻，将 AI 工作流的任务流转、审批治理与绩效管理映射为朝堂运作。

## ✨ 特性

- **旨意看板** — 圣旨式任务管理，七阶 Pipeline 流转追踪（下旨→分拣→草拟→审议→派发→执行→归档）
- **朝堂议政** — 多 Agent 实时讨论，天命降临随机事件
- **太史监候** — 系统运行状态监控，Agent 健康检查，告警阈值配置
- **双星桥** — YYC³ AI Family（8 成员）与三省六部（12 朝臣）协同映射
- **勋章墙** — 17 种古典主题成就徽章，1–6 星稀有度分级
- **统一看板** — Tab 式控制中心，聚合旨意/朝堂/调度/官员/模型/技能/奏折/模板/要闻
- **国际化** — 支持 10 种语言（中文 / English / 日本語 / 한국어 / Français / Deutsch / Español / Português / Русский / العربية）
- **宫阙规制** — 灵活的系统配置：朝堂/旨意/令牌/通知/安全/外观/典章

## 🚀 快速开始

```bash
# 前置要求: Node.js >= 20, pnpm >= 10
pnpm install          # 安装依赖
pnpm dev              # 启动开发服务器 → http://localhost:3122
pnpm build            # 构建生产版本 → dist/
pnpm typecheck        # TypeScript 类型检查（0 errors）
pnpm lint             # ESLint 代码规范检查
pnpm test             # 运行 Vitest 测试套件（320 用例）
```

<details>
<summary>📋 完整命令列表</summary>

| 命令                                         | 说明                                      |
| -------------------------------------------- | ----------------------------------------- |
| `pnpm dev`                                   | 开发服务器 (port 3122, LAN 可访问)        |
| `pnpm build`                                 | 生产构建（路由懒加载 + vendor 分包）      |
| `pnpm preview`                               | 预览生产构建                              |
| `pnpm typecheck`                             | `tsc --noEmit` strict 类型检查            |
| `pnpm lint` / `lint:fix`                     | ESLint v9 检查 / 自动修复                 |
| `pnpm format` / `format:check`               | Prettier 格式化 / 检查                    |
| `pnpm test` / `test:watch` / `test:coverage` | Vitest 测试 / watch / 覆盖率              |
| `pnpm check:circular`                        | madge 循环依赖检测                        |
| `pnpm check:dead`                            | unimported 死代码检测                     |
| `pnpm check:all`                             | 完整门禁: typecheck + lint + test + build |

</details>

## 📖 文档导航

| 文档                                                             | 说明                                                 |
| ---------------------------------------------------------------- | ---------------------------------------------------- |
| [AGENTS.md](./AGENTS.md)                                         | **Agent 协作指南** — 命令/架构/陷阱/部署，新成员必读 |
| [CHANGELOG.md](./CHANGELOG.md)                                   | 版本变更记录（Keep a Changelog）                     |
| [docs/OPERATIONS.md](./docs/OPERATIONS.md)                       | 工程化总结 + 运维手册 + 故障排查                     |
| [docs/ROADMAP.md](./docs/ROADMAP.md)                             | P0–P5 迭代路线图（全阶段已闭环）                     |
| [docs/QUALITY_REPORT.md](./docs/QUALITY_REPORT.md)               | 代码质量审计报告（评分 A）                           |
| [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md)                   | 贡献指南                                             |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)                   | 架构总览                                             |
| [docs/API.md](./docs/API.md)                                     | API 接口文档                                         |
| [docs/guidelines/Guidelines.md](./docs/guidelines/Guidelines.md) | 设计系统全量规范                                     |

## 🏗️ 技术栈

| 技术                       | 版本       | 用途                                         |
| -------------------------- | ---------- | -------------------------------------------- |
| React + TypeScript         | 18.3 / 5.9 | 前端框架（strict 模式）                      |
| Vite                       | 6.3        | 构建工具（路由懒加载 + vendor 分包）         |
| TailwindCSS                | v4         | 样式系统（CSS-first `@theme`）               |
| Zustand                    | 5          | 状态管理（单 store + HTTP 轮询 + WebSocket） |
| react-router               | 7.13       | 路由（lazy code-splitting）                  |
| shadcn/ui + Radix UI       | —          | UI 组件库（45 基础组件）                     |
| motion                     | 12         | 动画引擎                                     |
| Recharts                   | 2.15       | 图表可视化                                   |
| Vitest + ESLint + Prettier | 3 / 9 / 3  | 测试 / 规范 / 格式                           |

## 🏛️ 体系架构

```
天堂(天子) → 明堂(太子) → 应天门(三省) → 天津桥(六部) → 端门(早朝) → 定鼎门(归档)
    │              │            │                │              │             │
   下旨          分拣       草拟·审议·派发       执行           监控          归档
```

## 📋 路由

| 路径            | 页面       | 说明                  |
| --------------- | ---------- | --------------------- |
| `/welcome`      | 欢迎入口   | 玉玺启宫门            |
| `/dashboard`    | 统一看板   | Tab 式面板控制中心    |
| `/court`        | 朝堂议政   | 中轴线节点 + 天子驾六 |
| `/timeline`     | 王朝时间轴 | 十三王朝技能矩阵      |
| `/honors`       | 勋章墙     | 17 种成就徽章         |
| `/edict`        | 旨意看板   | 七阶流转追踪          |
| `/edict/create` | 旨意工坊   | 圣旨卷轴拟旨          |
| `/edict/:id`    | 敕令详情   | 签章链 + 流转日志     |
| `/monitor`      | 太史监候   | 系统监控台            |
| `/settings`     | 宫阙规制   | 系统设置              |
| `/bridge`       | 双星桥     | Family × Dynasty 映射 |

## 🐳 Docker 部署

```bash
# 构建（~25 MB 镜像）
docker build -t yyc3-dynasty .

# 运行
docker run -p 3122:80 yyc3-dynasty

# 注入后端地址
docker build --build-arg VITE_API_URL=https://api.example.com -t yyc3-dynasty .
```

## 🌐 GitHub Pages 部署

推送到 `main` 分支后，[deploy.yml](./.github/workflows/deploy.yml) 会自动构建并发布到 GitHub Pages。

- **访问地址**：<https://dynasty.yyc3.fun>
- **自定义域名**：通过 `public/CNAME`（`dynasty.yyc3.fun`）配置
- **前置条件**：仓库 `Settings → Pages → Build and deployment → Source` 选择 **GitHub Actions**

## 🔗 相关项目

- **[YYC³ Dynasty · 三省六部](https://github.com/YYC-Cube/YYC3-Dynasty.git)** — 本项目仓库
- 🌐 **在线预览**：<https://dynasty.yyc3.fun>（GitHub Pages 自动部署）
- [YYC³ AI Family](https://github.com/YYC-Cube) — AI 智能应用生态

---

<div align="center">

_言启千行代码 · 语枢万物智能_
_三省以治 · 六部以行_

<sub>Built with ❤️ by YanYuCloudCube Team</sub>

</div>
