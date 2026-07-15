# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- **globals.css 空文件导致全局 CSS 变量缺失**：填充 `--bg/--text/--muted/--line/--panel/--acc/--danger/--ok/--warn` 等变量，引入到 `index.css`
- **EdictBoard 筛选器标签不匹配**：`FILTERS` 改为子串匹配，修复草拟/审议/已完成等筛选返回空结果
- **EdictBoard timeAgo(task.now) 传错参数**：改用 `task.updatedAt` / `task.created_at`
- **EdictBoard stages 数组乱码**：修复 `审议` 字符 mojibake
- **TemplatePanel priority 'normal'**：改为中文 `'中'` 匹配后端
- **TaishiMonitor 空 setInterval**：移除无操作空定时器
- **PalaceRegulation `<option selected>` React 无效**：改用 `<select defaultValue>`
- **TaskModal AGENT_LABELS 'main' 键**：改为 `'taizi'`
- **theme.css 缺失 Tailwind color tokens**：添加 `--color-bg-secondary` + `--color-text-muted`
- **domain state-machine 缺 Inbox**：添加 `Inbox` 别名 + `STATE_TRANSITIONS` 入口
- **mock OfficialInfo 数据不完整导致 NaN**：补全全部字段（tokens/cost/merit/heartbeat 等）

### Added
- **i18n 翻译补齐**：全部 10 语言 Dynasty 业务键翻译完成（zh-CN/zh-TW/en/ja/ko/fr/de/es/pt-BR/ar），复用 i18n-Core 风格
- **recharts v3 迁移**：recharts 2.15.2 → 3.8.1，vendor-charts 386→341 KB（-12%），chart.tsx 类型适配
- **图片懒加载**：`ImageWithFallback` 默认 `loading="lazy"` + `decoding="async"`
- **Lighthouse CI**：`.github/workflows/lighthouse.yml` — Pages 部署后自动审计 3 页面
- **生产就绪实施方案**：`docs/PRODUCTION-READINESS.md` — 全维度审核 + P0-P4 分阶段计划（P0-P4 全部完成 ✅）
- **ErrorBoundary**：`RouteErrorBoundary`（路由级）+ `ComponentErrorBoundary`（组件级），防止单页崩溃带垮全站
- **LICENSE**：MIT 许可证文件
- **路由 Loading 骨架**：`RouteLoadingFallback` + react-router `HydrateFallback`
- **Store 异步测试**：`store.async.test.ts` — 19 个用例覆盖 loadLive/loadAgentConfig/loadAgentsStatus/loadMorning/toast/startPolling/stopPolling
- **@testing-library/react 集成**：已安装 + vitest 配置更新（覆盖率范围扩展到 domain/）
- **Google Fonts 本地化**：`@fontsource-variable/noto-serif-sc` + `@fontsource/jetbrains-mono` + `@fontsource/zhi-mang-xing`，消除 CDN 首屏阻塞
- **nginx 安全加固**：HSTS + Permissions-Policy 头
- **Dockerfile 非 root 运行**：nginx 以 `nginx` 用户运行
- **CI 安全审计门禁**：`ci.yml` 添加 `pnpm audit --audit-level=high`
- `vite-env.d.ts` 补充 `VITE_STRICT_API` 环境变量类型声明
- **领域常量模块**：`src/app/domain/` — 状态机（TaskState 12 态 + STATE_TRANSITIONS 流转表 + canTransition 校验）、事件 Topic（15 个 + 中文描述）、升级路径（ESCALATION_PATH + 调度器配置）、Agent 路由映射（STATE_AGENT_MAP / ORG_AGENT_MAP / BUCKET_CONFIG）、通知渠道（7 种 + validateWebhook + SSRF 防护）、文本清洗（sanitizeText/sanitizeTitle/sanitizeRemark）、一致性守卫测试
- **安装脚本**：`scripts/setup.sh` — 依赖检查（Node/pnpm 版本）+ 依赖安装 + 可选后端配置 + 验证
- **技能中心领域模块**：`src/app/domain/skills.ts` — Skills Hub 目录（3 社区源 23 技能）+ SKILL_AGENT_MAPPING + OpenClaw 集成常量 + suggestAgentForSkill/getSkillsForAgent
- **OpenClaw 集成审计**：`docs/OPENCLAW-INTEGRATION.md` — API 审计结果 + 技能生命周期闭环 + 两层技能架构说明
- **GitHub 社区文件**：PR 模板、Bug Report 模板 + config.yml、CODEOWNERS、dependabot.yml（npm + GHA）、labeler.yml + auto-label.yml + stale.yml
- **API 适配层**：`api.ts` 新增双路由适配（新 FastAPI RESTful 优先 → 旧路由回退 → Mock），`normalizeTask()`/`normalizeFlowEntry()` 归一化新旧字段差异
- **新后端端点对接**：`tasks`(筛选/分页)、`taskDetail`、`taskStats`、`taskTransition`、`events`、`eventTopics`、`agents`、`agentDetail`、`agentRuntimeConfig`
- **任务级 WebSocket**：`useTaskWebSocket(taskId)` hook，精准订阅 `/ws/task/{id}` 事件流
- **状态机补全**：`PIPE_STATE_IDX`/`STATE_LABEL` 覆盖全部 12 态（新增 `PendingConfirm`）
- **STRICT 模式**：`VITE_STRICT_API=true` 禁止 Mock 回退，联调期暴露真实 API 错误
- `.github/workflows/deploy.yml` GitHub Pages 自动部署工作流（main 推送即发布到 `dynasty.yyc3.fun`）
- 文档补全仓库远程地址 `https://github.com/YYC-Cube/YYC3-Dynasty.git`（README / CONTRIBUTING / OPERATIONS / AGENTS）

### Changed
- **react-router 升级 7.13.0 → 8.2.0**：修复 CSRF 漏洞（GHSA-84g9-w2xq-vcv6）
- **Google Fonts 本地化**：移除 CDN 依赖，改用 `@fontsource` 本地加载（消除首屏阻塞）
- **nginx 安全加固**：添加 HSTS + Permissions-Policy 头
- **Dockerfile 非 root 运行**：nginx 以 `nginx` 用户运行，移除 root 权限
- **CI 安全审计门禁 + 覆盖率报告**：`ci.yml` 添加 `pnpm audit --audit-level=high` + `test:coverage` + artifact upload
- **tsconfig.json 启用 noUnusedLocals/noUnusedParameters**：清理 3 处死代码后启用 TS 严格检查
- **unimported → knip 迁移**：移除 deprecated `unimported`，改用 `knip@6.25.0`（`knip.json` 配置）
- `routes.tsx` 添加 `errorElement` + `HydrateFallback` 到所有路由层级
- `AGENTS.md` §8 后端契约更新为新旧双后端架构描述
- Mock 数据与后端 `Task.to_dict()` 形状对齐（含 `task_id`/`trace_id`/`assignee_org`）
- `createTask` 适配新 RESTful 路由（`POST /api/tasks`），body 自动转换 `org → assignee_org`
- `liveStatus` 优先请求 `/api/tasks/live-status`，回退 `/api/live-status`

### Removed
- `unimported` (deprecated devDep) → 替换为 `knip`
- `.unimportedrc.json` → 替换为 `knip.json`
- 3 处死代码：`_isPending` (EdictBoard)、`_downloadMemorial` 命名冲突、未使用 import
- **@yyc3/i18n-core**、**@yyc3/i18n-react**（`file:` 本地路径依赖）→ 完整 vendor 内嵌至 `src/lib/`
- `tsconfig.json` 添加 `types: ["vitest/globals", "@testing-library/jest-dom"]` 支持
- `tsconfig.node.json` 添加 `types: ["node"]` + 覆盖 `vitest.config.ts`
- `vite.config.ts` 显式设置 `publicDir: 'public'`
- 勋章墙（`Honors.tsx`）扩充至 17 种勋章（新增 5 枚：少保/新手村/同僚之谊/门神/勤勉）
- 勋章墙新增稀有度名称标签（传说/史诗/稀有/精良/普通/基础）
- 勋章墙新增总收集进度条 + 稀有度分布统计 + 未获得勋章解锁进度条

### Changed
- `vite.config.ts` `manualChunks` 重构：使用 `@pkg@version` 格式精确匹配包名，移除模糊 `includes` 匹配
- 移除 `vendor-mui` / `vendor-dnd` 分包规则（对应依赖已删除）

### Removed
- 12 个死依赖：`@mui/material`、`@mui/icons-material`、`@emotion/react`、`@emotion/styled`、`@popperjs/core`、`react-popper`、`react-dnd`、`react-dnd-html5-backend`、`react-slick`、`canvas-confetti`、`react-responsive-masonry`、`date-fns`（src/ 中 0 引用）

### Added (previous)
- `.env.example` 环境变量模板
- `Dockerfile` 多阶段构建（pnpm builder + nginx runtime）
- `nginx.conf` SPA 托管配置（深链 fallback + Gzip + 安全头 + 静态资源缓存）
- `.dockerignore` Docker 构建排除列表
- `.github/workflows/ci.yml` CI 工作流（typecheck/lint/test/build，Node 18 + 20 matrix）
- `.github/workflows/release.yml` 发布工作流（Git tag → 多架构 Docker 镜像 + GitHub Release）
- `vitest.config.ts` Vitest 配置（jsdom + v8 coverage）
- `eslint.config.mjs` ESLint v9 flat config（typescript-eslint + react-hooks + prettier compat）
- `.prettierrc.json` / `.prettierignore` 代码格式化配置
- `.unimportedrc.json` 死代码检测配置
- `src/app/components/toastEmitter.ts` Toast 事件总线独立模块
- `src/app/components/Dashboard.tsx` 统一看板页（tab 式面板布局）
- `src/app/store.test.ts` store 纯函数测试（37 用例）
- `src/app/i18n.test.ts` i18n 翻译测试（22 用例）
- `src/app/api.test.ts` API mock 回退测试（49 用例）
- `AGENTS.md` Agent 协作指南
- `docs/ROADMAP.md` 迭代路线图
- `docs/QUALITY_REPORT.md` 代码质量审计报告

### Changed
- `package.json`: 修复重复声明 `dependencies`/`devDependencies` 的畸形 JSON
- `package.json`: 新增 `typecheck`/`lint`/`lint:fix`/`format`/`format:check`/`test`/`test:watch`/`test:coverage`/`check:circular`/`check:dead`/`check:all` 脚本
- `package.json`: 声明 `@types/react`/`@types/react-dom`/`typescript`/`eslint`/`prettier`/`vitest` 等 devDependencies
- `package.json`: `dev` 脚本简化为 `vite`（端口集中到 vite.config.ts）
- `pnpm-workspace.yaml`: `supportedArchitectures` 添加 `darwin` 支持 macOS 开发
- `pnpm-workspace.yaml`: `overrides` 从 package.json 迁入（pnpm v10+ 仅读取此文件）
- `vite.config.ts`: 新增 `server.port: 3122` + `server.host: true`
- `vite.config.ts`: 新增 `build.rollupOptions.output.manualChunks` vendor 分包
- `tsconfig.json`: `ignoreDeprecations` 从 `"6.0"` 修正为 `"5.0"`
- `src/app/routes.tsx`: 所有路由改为 react-router v7 `lazy()` 路由级 code-splitting
- `src/app/routes.tsx`: 新增 `/dashboard` 路由
- `src/app/components/DynastyNavbar.tsx`: 新增 Dashboard 导航项 + LanguageSwitcher
- `src/app/components/Court.tsx`: 懒加载接入 CourtDiscussion + CourtCeremony
- `src/app/useWebSocket.ts`: `useWS` 重命名为 `subscribe`（避免 rules-of-hooks 误判）
- `src/app/components/ToastSystem.tsx`: 拆出 `toastEmitter.ts`，仅保留组件
- `src/app/api.ts`: `mockData` 类型从 `Record<string, any>` 改为 `Record<string, unknown>`
- `src/app/api.ts`: mock `flow_log` 字段名对齐 `FlowEntry` 接口
- `src/app/components/EdictBoard.tsx`: `mapTaskToEdict` 入参从 `any` 改为 `Task` 类型
- `src/app/components/Timeline.tsx`: `SkillCard` props 从 `any` 改为 `DynastySkill` 接口

### Fixed
- `package.json` 重复 `dependencies`/`devDependencies` 键（畸形 JSON）
- `DashboardLayout.tsx` 误用 `react-resizable-panels` 旧 API（`Group`/`Separator`/`orientation`）
- `EdictBoard.tsx` 调用不存在的 `setIsBatchMode`（应为 `setBatchMode`）
- `EdictCreate.tsx` toast 使用非法 `msg`/`type` 字段（应为 `level`/`title`）
- `EdictCreate.tsx` 冗余 `"initial"` 类型比较
- `ToastSystem.tsx` 的 `useEffect` cleanup 返回 `boolean` 而非 `void`
- `Welcome.tsx`/`ImperialSeal.tsx` props 命名不一致（`sealState` vs `state`）+ 缺少 hover 回调
- `TaskModal.tsx` 不规则全角空格
- 5 处 `any` 类型 → 强类型（api.ts, EdictBoard.tsx, Timeline.tsx）
- `src/main.tsx` 入口文件缺失（重新创建）
- rollup 原生二进制缺失导致 macOS 构建崩溃

### Removed
- `src/app/components/Toaster.tsx`（已被 `ToastSystem.tsx` 替代）
- `package.json` 中失效的 `pnpm.overrides` 字段（pnpm v10+ 已迁移到 `pnpm-workspace.yaml`）

## [1.0.0] - 2026-03-21

### Added
- 初始版本：YYC³ Dynasty 三省六部 AI Agent 协作管理看板
- React 18 + TypeScript + Vite 6 前端架构
- TailwindCSS v4 + shadcn/ui 组件库
- Zustand 状态管理 + WebSocket 实时推送
- 10 种语言国际化（zh-CN / en 完整翻译，其余 alias 到 en）
- 8 个路由页面：welcome / court / timeline / honors / edict / monitor / settings / bridge
- 45 个 shadcn/ui 基础组件
- 自定义朝堂暗色主题（theme.css）
- Mock 数据降级机制（后端不可达时自动回退）

---

## 版本号约定

遵循 [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html)：

- **MAJOR** (x.0.0)：不兼容的 API 变更
- **MINOR** (1.x.0)：向后兼容的新功能
- **PATCH** (1.0.x)：向后兼容的 bug 修复

Git tag 格式：`v1.0.0`、`v1.1.0`、`v2.0.0-rc.1` 等。
