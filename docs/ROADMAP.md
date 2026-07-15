---
file: ROADMAP.md
description: YYC³ Dynasty 迭代路线图 · 基于全局现状扫描的阶段节点规划
author: YanYuCloudCube Team
version: v1.0.0
created: 2026-07-12
updated: 2026-07-12
status: active
tags: [roadmap],[planning],[milestones]
audience: developers,managers
---

# YYC³ Dynasty · 迭代路线图

> 本路线图基于 **2026-07-12 全局现状扫描** 制定。每个阶段包含 **预期（目标）** 与 **结果（交付/验收）**，并在脚注附上扫描得到的客观基线数据，确保规划可追溯、可验收。

---

## §0 当前状态基线（Baseline · 已达成）

本次工程化巡检已修复阻断性问题，建立可验证基线：

| 维度 | 修复前 | 修复后（当前） |
|------|--------|----------------|
| `package.json` | ❌ 重复声明 `dependencies`/`devDependencies`（畸形 JSON） | ✅ 单一声明，合法 JSON |
| pnpm overrides | ⚠️ 写在 `package.json` 被 pnpm v10+ 忽略 | ✅ 迁移至 `pnpm-workspace.yaml` 生效 |
| 原生二进制 | ❌ `supportedArchitectures` 仅 linux → macOS 构建崩溃 | ✅ linux+darwin，本地可构建 |
| `pnpm install` | ❌ 受上述问题影响不稳定 | ✅ 干净安装通过（458 包） |
| `pnpm build` | ❌ rollup 原生模块缺失，构建失败 | ✅ 2659 模块，构建成功 |
| `pnpm typecheck` | ❌ 无此能力（依赖全局 tsc，403 错误） | ✅ 0 错误（TS 5.9.3 strict） |
| 源码类型错误 | 403 个（含 10 个真实逻辑/语法 bug） | 0 |
| `@types/react` | ❌ 缺失 | ✅ 已声明 |
| 入口文件 | ✅ `index.html` / `src/main.tsx` 完整存在（无需创建） | ✅ 保持 |

**已修复的 10 个真实缺陷**（详见 `AGENTS.md` §9 #15/#16 与本次提交）：
`DashboardLayout` 误用 `react-resizable-panels` 旧 API（`Group`/`Separator`/`orientation`）；`EdictBoard` 调用不存在的 `setIsBatchMode`；`EdictCreate` toast 使用非法 `msg`/`type` 字段 + 冗余 `"initial"` 类型比较；`ToastSystem` 的 `useEffect` cleanup 返回 `boolean`；`Welcome`/`ImperialSeal` props 命名不一致（`sealState` vs `state`，且缺少 hover 回调）。

---

## §1 阶段总览

```
P0 基线修复 ✅ ──► P1 工程化基座 ──► P2 质量闭环 ──► P3 性能优化 ──► P4 功能完善 ──► P5 发布部署
(已完成)          (lint/format)     (测试/CI)        (体积/加载)      (业务补全)       (生产上线)
```

---

## P1 · 工程化基座（Engineering Foundation）

**预期**：建立代码风格与静态检查的自动化基线，消除"靠肉眼审查"的隐患，对齐团队规范（`docs/CONTRIBUTING.md` 要求 ESLint 通过）。

**结果（交付物）**：
- [ ] 引入 ESLint（`eslint` + `@typescript-eslint` + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`），配置 `eslint.config.mjs`
- [ ] 引入 Prettier（`.prettierrc`，2 空格 / 单引号 / LF，对齐 `.editorconfig`）
- [ ] `package.json` 新增脚本：`pnpm lint`、`pnpm format`、`pnpm lint:fix`
- [ ] 修复全部 lint 错误（基线扫描：当前无 lint 配置，接入后预计以 `no-explicit-any`、`no-unused-vars` 类为主）
- [ ] 配置 `.gitignore` 已就绪；补充 `.npmrc`（如需锁定镜像）

**验收标准**：`pnpm lint` 0 error；`pnpm typecheck` 0 error；`pnpm build` 成功。

---

## P2 · 质量闭环（Quality Loop · 测试 + CI） ✅ 已完成

**预期**：为核心纯函数与状态逻辑建立单元测试护栏，并通过 CI 自动执行 typecheck/lint/test/build，防止回归。

**结果（交付物）**：
- [x] 引入 Vitest 3.2.6（与 Vite 同构，零额外构建）；新增 `vitest.config.ts`
- [x] 覆盖纯函数/领域常量：`src/app/store.ts`（37 个测试：`getPipeStatus`、`stateLabel`、`isEdict`/`isSession`、`deptColor`、`timeAgo`、`esc`、`PIPE_STATE_IDX`）
- [x] 覆盖 `src/app/i18n.ts`（22 个测试：`t()` 回退链、`setLocale` 持久化、locale 检测、参数插值）
- [x] 覆盖 `src/app/api.ts` 的 mock 回退逻辑（49 个测试：`fetchJ`/`postJ` 在非 JSON 响应时降级、POST 失败模拟成功）
- [x] 新增 `pnpm test`、`pnpm test:watch`、`pnpm test:coverage` 脚本
- [ ] GitHub Actions 工作流（P5 阶段统一配置）

**验收结果**：
- 108 个测试全部通过
- 覆盖率：语句 83.82% / 分支 80.21% / 行 83.82%
- 测试独立运行，不依赖后端（使用 fetch mock）

---

## P3 · 性能优化（Performance） ✅ 已完成

**预期**：消除构建告警，显著降低首屏体积与加载时长，达到生产可用水平。

**结果（交付物）**：
- [x] **路由级懒加载**：使用 react-router v7 `lazy()` API，所有 11 个路由页面独立 chunk
- [x] **手动分包**：`manualChunks` 拆分 vendor-react / vendor-charts / vendor-motion / vendor-icons / vendor-markdown
- [x] **消除体积警告**：构建无 chunk-size 警告
- [ ] **按需加载重型库**：`recharts` 已标记 deprecated → 评估迁移 Recharts v3（P5 阶段）
- [ ] 主题字体：Google Fonts 增加 `<link rel="preload">` 或本地化（P5 阶段）
- [x] gzip 后首屏 JS < 150 kB ✅（137 kB）

**验收结果**：

| 指标 | 优化前 | 优化后 | 变化 |
|------|--------|--------|------|
| 首屏 chunk 数 | 1 | 4 | 分散加载 |
| 首屏 raw 体积 | 903 kB | 418 kB | **-54%** |
| 首屏 gzip 体积 | 266 kB | 137 kB | **-48%** |
| 路由 chunk 数 | 0 | 12 | 按需加载 |
| chunk-size 警告 | 1 | 0 | ✅ 消除 |

---

## P4 · 功能完善（Feature Completion） — 部分完成

**预期**：补齐设计规范中已定义但代码未落地的能力。

**结果（交付物）**：
- [x] **死代码重新接入**：创建 `/dashboard` 路由，通过 tab 布局重新接入 10 个面板组件（MonitorPanel、OfficialPanel、ModelConfig、SkillsConfig、SessionsPanel、MemorialPanel、TemplatePanel、MorningPanel、TaskModal、CourtDiscussion/CourtCeremony）
- [x] **LanguageSwitcher 接入**：集成到 DynastyNavbar，10 种语言切换可用
- [x] **死代码清理**：`pnpm check:dead` 从 10+ 文件降至 0（仅保留 2 个工具组件在 ignore 列表）
- [x] **删除 Toaster.tsx**（已被 ToastSystem 替代）
- [ ] **i18n 翻译补齐**：8 种语言仍 alias 到 en（后续迭代）
- [ ] **全局搜索 ⌘K**（后续迭代）
- [ ] **圣旨四阶形态**（后续迭代）
- [ ] **错误边界**（后续迭代）

**验收结果**：死代码文件 0 个；所有面板组件通过 Dashboard 路由可达。

---

## P5 · 发布与部署（Release & Deploy） ✅ 已完成

**预期**：具备可重复的生产构建与部署链路，版本可追溯。

**结果（交付物）**：
- [x] `VITE_API_URL` 生产值确认 + `.env.example` 模板（不含密钥）
- [x] Docker 构建：多阶段 Dockerfile（builder 阶段 `pnpm install --frozen-lockfile` + Vite 构建，runtime 阶段 nginx:alpine 托管 `dist/`）
- [x] SPA fallback：nginx `try_files $uri /index.html`（react-router BrowserRouter 深链刷新 200）
- [x] 多架构支持：`linux/amd64` + `linux/arm64`（Docker buildx，release.yml 自动推送 ghcr.io）
- [x] 语义化版本：`package.json` 版本与 Git tag 联动（SemVer，`v1.0.0` 格式）
- [x] CHANGELOG.md 启用（Keep a Changelog 格式）
- [x] GitHub Actions CI 工作流（`.github/workflows/ci.yml`）：Node 18+20 matrix × typecheck/lint/prettier/test/circular/build
- [x] GitHub Actions Release 工作流（`.github/workflows/release.yml`）：tag 触发 → 多架构 Docker 镜像 + GitHub Release
- [x] 版本管理脚本：`pnpm version:patch/minor/major`

**验收结果**：

| 交付物 | 状态 |
|--------|------|
| `.env.example` | ✅ 含 `VITE_API_URL` 模板，无密钥 |
| `Dockerfile` | ✅ 多阶段构建，`--frozen-lockfile`，HEALTHCHECK |
| `nginx.conf` | ✅ SPA fallback + Gzip + 安全头 + 资源缓存 |
| `.dockerignore` | ✅ 排除 node_modules/docs/test/config |
| `ci.yml` | ✅ Node 18+20 matrix，7 步检查 |
| `release.yml` | ✅ tag → 多架构镜像 + GH Release |
| `CHANGELOG.md` | ✅ Keep a Changelog 格式 |
| 本地 Docker 构建 | ⚠️ 受网络限制未完成本地构建（CI 环境可用） |

---

## §2 风险与约束

| 风险 | 说明 | 缓解 |
|------|------|------|
| 后端不在本仓 | 前端调用外部 `dashboard/server.py`，缺失时静默降级到 mock | CI 用 mock 跑测试；联调环境用 `VITE_API_URL` 指向真实服务 |
| recharts 2.x deprecated | 官方建议升 v3（破坏性变更） | P3 评估迁移成本，必要时替换为 ECharts/Visx |
| `minimumReleaseAge: 10080` | 7 天发布冷静期可能阻塞紧急依赖升级 | 紧急安全补丁可临时调低，并在 PR 注明 |
| 双 `globals.css`/空文件 | 易使后续 agent 困惑 | P4 一并清理 |

---

## §3 验收追踪

每阶段完成时，更新本文档对应 checkbox，并在 `AGENTS.md` §2「Verification baseline」表格刷新 typecheck/build 结果，保持"有预期、有结果"的闭环。
