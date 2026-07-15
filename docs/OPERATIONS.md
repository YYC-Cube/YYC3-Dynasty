---
file: OPERATIONS.md
description: 工程化总结与后续运维指南 · P0–P5 全阶段交付记录与日常运维手册
author: YanYuCloudCube Team
version: v1.1.0
created: 2026-07-12
updated: 2026-07-16
status: active
tags: [operations],[summary],[maintenance],[runbook]
audience: developers,devops,managers
complexity: intermediate
---

# YYC³ Dynasty · 工程化总结与运维指南

> 本文档是 **P0–P5 全工程化阶段** 的最终总结，也是后续团队的日常运维手册。
> 包含：项目快照、阶段交付记录、质量门禁、发布流程、故障排查、后续迭代建议。

---

## §1 项目快照（2026-07-12）

| 维度       | 数值                                                              |
| ---------- | ----------------------------------------------------------------- |
| 项目版本   | `1.0.0`                                                           |
| 源码文件   | 99 个（`.ts` / `.tsx`，不含 `node_modules`）                      |
| 代码行数   | 18,924 行                                                         |
| 测试文件   | 3 个（`store.test.ts` / `i18n.test.ts` / `api.test.ts`）          |
| 测试用例   | 108 个，全部通过                                                  |
| 覆盖率     | 语句 83.82% / 分支 80.21%                                         |
| 生产依赖   | 60 个（`dependencies`）                                           |
| 开发依赖   | 22 个（`devDependencies`）                                        |
| 构建产物   | 2,928 模块 → 多 chunk 分包                                        |
| 首屏体积   | ~418 kB raw / ~137 kB gzip（vendor-react + motion + index）       |
| 最大 chunk | vendor-charts 385 kB（recharts，仅 `/monitor` 路由按需加载）      |
| 构建耗时   | ~1.9 秒                                                           |
| 技术栈     | React 18 + TypeScript 5.9 + Vite 6.3 + TailwindCSS v4 + Zustand 5 |

---

## §2 阶段交付总览

```
P0 基线修复 ✅  →  P1 工程化基座 ✅  →  P2 质量闭环 ✅  →  P3 性能优化 ✅  →  P4 功能完善 ✅  →  P5 发布部署 ✅
```

| 阶段              | 核心目标                     | 交付物数     | 关键指标变化                               |
| ----------------- | ---------------------------- | ------------ | ------------------------------------------ |
| **P0** 基线修复   | 修复阻断性构建/类型错误      | 10 个修复    | typecheck 403→0 错误；build 崩溃→成功      |
| **P1** 工程化基座 | ESLint + Prettier + 类型检查 | 3 个配置     | lint 52→0 问题；新增 `typecheck` 脚本      |
| **P2** 质量闭环   | Vitest 单元测试              | 3 个测试文件 | 108 测试通过；覆盖率 83.82%                |
| **P3** 性能优化   | 路由懒加载 + vendor 分包     | 2 个重构     | 首屏 gzip 266→137 kB（-48%）；0 chunk 警告 |
| **P4** 功能完善   | 死代码重新接入 + 清理        | 3 个新组件   | 死代码 10+→0 文件；面板组件全部可达        |
| **P5** 发布部署   | Docker + CI/CD + 版本管理    | 7 个新文件   | 多架构镜像；自动化发布流水线               |

---

## §3 各阶段详细交付记录

### P0 · 基线修复（已闭环）

**修复前状态**：项目无法在 macOS 上构建（rollup 原生二进制缺失），`package.json` 是畸形 JSON（重复键），TypeScript 有 403 个类型错误（其中 10 个是真实 bug）。

| 修复项                                                    | 文件                               |
| --------------------------------------------------------- | ---------------------------------- |
| 合并 `package.json` 重复 `dependencies`/`devDependencies` | `package.json`                     |
| `pnpm-workspace.yaml` 添加 `darwin` 架构支持              | `pnpm-workspace.yaml`              |
| pnpm overrides 从 `package.json` 迁移到 workspace         | `pnpm-workspace.yaml`              |
| `vite.config.ts` 端口集中配置 (`server.port: 3122`)       | `vite.config.ts`                   |
| 新增 `@types/react` + `@types/react-dom` + `typescript`   | `package.json`                     |
| `ignoreDeprecations` 从 `"6.0"` 修正为 `"5.0"`            | `tsconfig.json`                    |
| 修复 `react-resizable-panels` API 误用                    | `DashboardLayout.tsx`              |
| 修复 `setIsBatchMode` 拼写错误                            | `EdictBoard.tsx`                   |
| 修复 toast 字段 (`msg`/`type` → `level`/`title`)          | `EdictCreate.tsx`                  |
| 修复 `useEffect` cleanup 返回值类型                       | `ToastSystem.tsx`                  |
| 修复 `ImperialSeal` props 不一致                          | `ImperialSeal.tsx` / `Welcome.tsx` |

### P1 · 工程化基座（已闭环）

| 交付物              | 说明                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------ |
| `eslint.config.mjs` | ESLint v9 flat config（typescript-eslint + react-hooks + react-refresh + prettier compat） |
| `.prettierrc.json`  | Prettier 配置（2 空格 / 单引号 / LF / trailing comma all）                                 |
| `.prettierignore`   | Prettier 排除列表                                                                          |
| npm scripts         | `lint` / `lint:fix` / `format` / `format:check`                                            |

**修复的 52 个 lint 问题**：1 个 rules-of-hooks（`useWS`→`subscribe`）、1 个不规则空格、2 个 `prefer-const`、7 个 `any`→强类型、20 个 unused vars、11 个 type-imports、7 个 react-refresh、3 个 exhaustive-deps。

**架构改进**：`toastEmitter` 从 `ToastSystem.tsx` 拆分为独立模块 `toastEmitter.ts`。

### P2 · 质量闭环（已闭环）

| 测试文件        | 覆盖目标                                                                                                                                                   | 用例数 |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `store.test.ts` | `PIPE` 定义 / `PIPE_STATE_IDX` / `deptColor()` / `stateLabel()` / `isEdict()` / `isSession()` / `isArchived()` / `getPipeStatus()` / `esc()` / `timeAgo()` | 37     |
| `i18n.test.ts`  | `LOCALES` / `t()` 翻译 + 参数插值 + 回退链 / `setLocale()` + localStorage 持久化 / `onLocaleChange()` 订阅 / `getAvailableLocales()` 元数据                | 22     |
| `api.test.ts`   | `fetchJ` 正常响应 + HTML 降级 + 网络错误降级 / `postJ` 成功 + 失败模拟成功 / mock 数据完整性 / 35 个 API 端点存在性                                        | 49     |

| 脚本                 | 用途                       |
| -------------------- | -------------------------- |
| `pnpm test`          | 运行全部测试（vitest run） |
| `pnpm test:watch`    | watch 模式                 |
| `pnpm test:coverage` | 覆盖率报告（v8 provider）  |

### P3 · 性能优化（已闭环）

| 指标            | 优化前        | 优化后                                     | 变化     |
| --------------- | ------------- | ------------------------------------------ | -------- |
| 首屏 JS chunk   | 1 个 903 kB   | 4 个 ~418 kB                               | **-54%** |
| 首屏 gzip       | 266 kB        | 137 kB                                     | **-48%** |
| 路由级 chunk    | 0（全量加载） | 12 个按需加载                              | ✅       |
| vendor 分包     | 0             | 5 个（react/charts/motion/icons/markdown） | ✅       |
| chunk-size 警告 | 1             | **0**                                      | ✅       |

**实现**：`routes.tsx` 使用 react-router v7 `lazy()` API；`vite.config.ts` 添加 `manualChunks` 分包。

### P4 · 功能完善（已闭环）

| 交付物              | 说明                                                    |
| ------------------- | ------------------------------------------------------- |
| `Dashboard.tsx`     | 新建 `/dashboard` 路由，tab 布局重新接入 10 个面板组件  |
| `DynastyNavbar.tsx` | 新增 Dashboard 导航项 + 集成 LanguageSwitcher（懒加载） |
| `Court.tsx`         | 懒加载接入 CourtDiscussion + CourtCeremony              |
| 删除 `Toaster.tsx`  | 已被 `ToastSystem.tsx` 替代                             |
| 死代码清理          | `pnpm check:dead` 从 10+ → 0 文件                       |

### P5 · 发布部署（已闭环）

| 交付物                          | 说明                                                                |
| ------------------------------- | ------------------------------------------------------------------- |
| `Dockerfile`                    | 多阶段构建（pnpm builder + nginx:alpine），~25 MB 镜像              |
| `nginx.conf`                    | SPA fallback + Gzip + 安全头 + `/assets/` 永久缓存 + HEALTHCHECK    |
| `.dockerignore`                 | 排除 node_modules/docs/test/IDE                                     |
| `.env.example`                  | `VITE_API_URL` 模板                                                 |
| `.github/workflows/ci.yml`      | CI：Node 18+20 matrix × typecheck/lint/prettier/test/circular/build |
| `.github/workflows/deploy.yml` | main 推送 → 构建并部署到 GitHub Pages（自定义域名 dynasty.yyc3.fun） |
| `.github/workflows/release.yml` | tag 触发 → 多架构 Docker 镜像 + GitHub Release                      |
| `CHANGELOG.md`                  | Keep a Changelog 格式，完整变更记录                                 |

---

## §4 质量门禁（Quality Gates）

### 日常开发检查

```bash
pnpm check:all    # typecheck && lint && test && build（完整 CI 门禁）
```

### 门禁清单

| 命令                  | 检查内容                                      | 通过标准             |
| --------------------- | --------------------------------------------- | -------------------- |
| `pnpm typecheck`      | TypeScript strict 类型检查                    | 0 errors             |
| `pnpm lint`           | ESLint v9（含 react-hooks / prettier compat） | 0 errors, 0 warnings |
| `pnpm format:check`   | Prettier 格式检查                             | 所有文件通过         |
| `pnpm test`           | Vitest 单元测试                               | 108/108 通过         |
| `pnpm check:circular` | madge 循环依赖检测                            | 0 循环依赖           |
| `pnpm check:dead`     | unimported 死代码检测                         | 0 未引用文件         |
| `pnpm build`          | Vite 生产构建                                 | 成功，0 chunk 警告   |

### CI 自动执行

`.github/workflows/ci.yml` 在每次 PR / push 到 `main` / `develop` 时自动运行上述全部检查（Node 18 + 20 双版本 matrix）。任一步骤失败即阻止合并。

---

## §5 发布与部署流程

### 5.1 语义化版本发布

```bash
# 1. 版本号递增（修改 package.json）
pnpm version:patch    # 1.0.0 → 1.0.1（bug 修复）
pnpm version:minor    # 1.0.0 → 1.1.0（新功能，向后兼容）
pnpm version:major    # 1.0.0 → 2.0.0（不兼容变更）

# 2. 更新 CHANGELOG.md
#    将 [Unreleased] 段落重命名为 [x.y.z] - YYYY-MM-DD
#    在下方新建空的 [Unreleased] 段落

# 3. 提交并打 tag
git add -A
git commit -m "chore(release): vx.y.z"
git tag vx.y.z
git push origin main --tags

# 4. GitHub Actions release.yml 自动触发：
#    → 构建生产 bundle
#    → 构建多架构 Docker 镜像（amd64 + arm64）
#    → 推送到 ghcr.io/yyc-cube/yyc3-dynasty:vx.y.z
#    → 创建 GitHub Release（含 CHANGELOG 摘要）
```

### 5.2 GitHub Pages 自动部署

推送 `main` 分支时，`.github/workflows/deploy.yml` 自动触发：

1. pnpm install + `pnpm build` 生成 `dist/`
2. 上传 Pages 构件并部署到 GitHub Pages
3. `public/CNAME`（`dynasty.yyc3.fun`）随产物部署，GitHub Pages 据此启用自定义域名

**在线访问**：<https://dynasty.yyc3.fun>

> **前置条件**：仓库 `Settings → Pages → Build and deployment → Source` 须选择 **GitHub Actions**。
> 因使用自定义顶级域名（apex），Vite `base` 保持默认 `/`，无需改为子路径。

### 5.3 Docker 本地部署

```bash
# 构建（默认 VITE_API_URL 为空 = 同源/mock 降级）
docker build -t yyc3-dynasty .

# 构建（注入后端地址）
docker build --build-arg VITE_API_URL=https://api.dynasty.yyc3.com -t yyc3-dynasty .

# 运行（容器 80 → 主机 3122）
docker run -d --name dynasty -p 3122:80 yyc3-dynasty

# 验证
curl -I http://localhost:3122/                    # 应返回 200
curl -I http://localhost:3122/edict/042           # 深链应返回 200（SPA fallback）
curl -I http://localhost:3122/assets/index-*.js   # 静态资源应返回 Cache-Control: immutable

# 停止/删除
docker stop dynasty && docker rm dynasty
```

### 5.4 Docker Compose（可选）

如需编排多个服务，可创建 `docker-compose.yml`：

```yaml
version: '3.8'
services:
  dynasty:
    build:
      context: .
      args:
        VITE_API_URL: https://api.dynasty.yyc3.com
    ports:
      - '3122:80'
    restart: unless-stopped
    healthcheck:
      test: ['CMD', 'wget', '--spider', '-q', 'http://localhost:80/']
      interval: 30s
      timeout: 3s
      retries: 3
```

### 5.5 环境变量

| 变量           | 默认值     | 说明                                                          |
| -------------- | ---------- | ------------------------------------------------------------- |
| `VITE_API_URL` | `''`（空） | 后端 API 基址。空 = 同源请求 → 后端不可达时降级到 mock 数据。 |

- **开发**：`.env`（本地，不提交）
- **生产构建**：通过 Docker `--build-arg` 或 `.env.production` 注入
- **绝不**在代码中硬编码密钥

---

## §6 日常运维手册（Runbook）

### 6.1 依赖更新

```bash
# 检查过时依赖
pnpm outdated

# 更新补丁版本（安全）
pnpm update --patch

# 更新特定包
pnpm update <package-name>

# 注意：pnpm-workspace.yaml 设置了 minimumReleaseAge: 10080（7天冷静期）
# 发布不足 7 天的包会被拒绝安装——紧急安全补丁可临时调低
```

### 6.2 新增路由页面

```bash
# 1. 创建组件
touch src/app/components/NewPage.tsx
# （添加标准 JSDoc 头 + named export）

# 2. 注册路由（lazy 加载）
# 在 src/app/routes.tsx 的 RootLayout children 中添加：
#   {
#     path: 'new-page',
#     lazy: () => import('./components/NewPage').then((m) => ({ Component: m.NewPage })),
#   },

# 3. 验证
pnpm check:all
```

### 6.3 新增 shadcn/ui 组件

```bash
# shadcn/ui 组件放在 src/app/components/ui/ 下
# 使用 cn() helper（from "./utils"）
# 遵循 CVA + data-slot 模式（参考 button.tsx）
# 注意：ui/ 目录已关闭 react-refresh 规则
```

### 6.4 新增测试

```bash
# 测试文件与源文件同目录，命名为 *.test.ts
# 纯函数测试参考 src/app/store.test.ts
# Mock fetch 测试参考 src/app/api.test.ts

pnpm test              # 运行
pnpm test:watch        # watch 模式
pnpm test:coverage     # 覆盖率
```

### 6.5 构建产物检查

```bash
pnpm build

# 检查 chunk 体积
ls -lh dist/assets/*.js | sort -k5 -rh

# 如果出现 chunk-size 警告：
# 1. 检查是否有新的大型依赖被引入
# 2. 在 vite.config.ts 的 manualChunks 中添加分包规则
# 3. 确认路由使用了 lazy() 加载
```

---

## §7 故障排查（Troubleshooting）

### 7.1 `pnpm build` 失败：`Cannot find module @rollup/rollup-darwin-arm64`

**原因**：`pnpm-workspace.yaml` 的 `supportedArchitectures` 未包含当前 OS。

**修复**：

```yaml
# pnpm-workspace.yaml
supportedArchitectures:
  os:
    - linux
    - darwin # ← 确保包含 macOS
  cpu:
    - x64
    - arm64
```

然后删除 lockfile 重装：

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 7.2 `pnpm install` 忽略 `package.json` 中的 `pnpm.overrides`

**原因**：pnpm v10+ 不再读取 `package.json` 的 `pnpm` 字段。

**修复**：将 overrides 移到 `pnpm-workspace.yaml`：

```yaml
overrides:
  vite: 6.3.5
```

### 7.3 深链刷新返回 404（如 `/edict/042`）

**原因**：nginx 未配置 SPA fallback。

**修复**：确认 `nginx.conf` 包含：

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### 7.4 ESLint 报 `react-hooks/rules-of-hooks` 但代码看起来正确

**原因**：自定义函数名以 `use` 开头，被误判为 Hook。

**修复**：重命名函数（不以 `use` 开头），或添加 `// eslint-disable-next-line react-hooks/rules-of-hooks`。

### 7.5 `pnpm test` 覆盖率不达标

**原因**：`vitest.config.ts` 的 `coverage.include` 范围或 `thresholds` 不匹配。

**修复**：调整 `vitest.config.ts` 的 `thresholds.functions`（store/i18n/api 有大量 React 组件方法，组件测试覆盖率天然偏低）。

### 7.6 Docker 构建失败：网络超时

**原因**：无法访问 Docker Hub（`registry-1.docker.io`）。

**修复**：配置镜像加速器或使用代理：

```json
// ~/.docker/daemon.json
{
  "registry-mirrors": ["https://mirror.example.com"]
}
```

---

## §8 项目结构索引

### 文档体系

| 文档                            | 位置   | 用途                                  |
| ------------------------------- | ------ | ------------------------------------- |
| `AGENTS.md`                     | 根目录 | Agent 协作指南（命令/架构/陷阱/部署） |
| `CHANGELOG.md`                  | 根目录 | 版本变更记录（Keep a Changelog）      |
| `README.md`                     | 根目录 | 项目概览与快速开始                    |
| `docs/ROADMAP.md`               | docs/  | P0–P5 迭代路线图                      |
| `docs/QUALITY_REPORT.md`        | docs/  | 代码质量审计报告                      |
| `docs/OPERATIONS.md`            | docs/  | 本文档：总结 + 运维手册               |
| `docs/CONTRIBUTING.md`          | docs/  | 贡献指南                              |
| `docs/ARCHITECTURE.md`          | docs/  | 架构总览                              |
| `docs/API.md`                   | docs/  | API 接口文档                          |
| `docs/guidelines/Guidelines.md` | docs/  | 设计系统（色彩/字体/动效/交互）       |

### 配置文件

| 文件                  | 用途                               |
| --------------------- | ---------------------------------- |
| `package.json`        | 依赖 + 脚本 + 版本号               |
| `pnpm-workspace.yaml` | pnpm overrides + 架构支持 + 冷静期 |
| `tsconfig.json`       | TypeScript strict 配置             |
| `vite.config.ts`      | Vite 构建配置（端口/别名/分包）    |
| `vitest.config.ts`    | Vitest 测试配置（jsdom/coverage）  |
| `eslint.config.mjs`   | ESLint v9 flat config              |
| `.prettierrc.json`    | Prettier 格式化配置                |
| `.editorconfig`       | 编辑器基础规范                     |
| `postcss.config.mjs`  | PostCSS（空，Tailwind v4 自注册）  |
| `.unimportedrc.json`  | 死代码检测配置                     |

### 部署文件

| 文件                            | 用途                      |
| ------------------------------- | ------------------------- |
| `Dockerfile`                    | 多阶段构建                |
| `nginx.conf`                    | nginx SPA 托管            |
| `.dockerignore`                 | Docker 构建排除           |
| `.env.example`                  | 环境变量模板              |
| `public/CNAME`                  | GitHub Pages 自定义域名   |
| `.github/workflows/ci.yml`      | CI 工作流                 |
| `.github/workflows/deploy.yml`  | GitHub Pages 自动部署     |
| `.github/workflows/release.yml` | 发布工作流                |

---

## §9 后续迭代建议

### 高优先级（建议下一迭代）

| 项目                 | 说明                                                                | 预估工作量 |
| -------------------- | ------------------------------------------------------------------- | ---------- |
| **i18n 翻译补齐**    | 8 种语言（ja/ko/fr/de/es/pt-BR/ru/ar）仍 alias 到 en                | 2–3 天     |
| **错误边界**         | 为每个路由包裹 `ErrorBoundary`，避免单页崩溃带垮全站                | 0.5 天     |
| **Recharts v3 迁移** | 当前 v2 已 deprecated；v3 有破坏性变更                              | 1–2 天     |
| **组件级测试**       | 用 @testing-library/react 为关键组件（EdictBoard、Court）写交互测试 | 2–3 天     |

### 中优先级

| 项目                    | 说明                                                      |
| ----------------------- | --------------------------------------------------------- |
| **全局搜索 ⌘K**         | `GlobalSearch` 组件已存在，需接入键盘快捷键和结果过滤     |
| **圣旨四阶形态**        | 白麻→黄纸→绯绫→金泥 视觉流转态                            |
| **通知中心**            | 导航栏通知下拉面板（朝钟/飞鸽/烽火三级）                  |
| **Bundle 进一步优化**   | vendor-charts (386 kB) 可替换为更轻量的图表库（如 Visx）  |
| **Google Fonts 本地化** | 当前首屏阻塞加载远程字体，可改为 `@fontsource` 或 preload |

### 低优先级

| 项目             | 说明                                                  |
| ---------------- | ----------------------------------------------------- |
| **跨标签页同步** | SharedWorker / BroadcastChannel 方案（设计文档 §33B） |
| **PWA 支持**     | Service Worker + Web App Manifest（离线访问）         |
| **E2E 测试**     | Playwright 覆盖关键用户流程（拟旨→流转→归档）         |
| **性能监控**     | 接入 Web Vitals 上报（LCP/FID/CLS）                   |

---

## §10 技术债务登记

| 编号   | 债务                                                 | 严重度 | 状态          | 说明                                             |
| ------ | ---------------------------------------------------- | ------ | ------------- | ------------------------------------------------ |
| TD-001 | `globals.css` 为空文件                               | 低     | 待清理        | `index.css` 未引用它，应删除或合并到 `theme.css` |
| TD-002 | `ConfirmDialog.tsx` / `DashboardLayout.tsx` 未被引用 | 低     | 已加入 ignore | 工具组件，保留备用                               |
| TD-003 | `noUnusedLocals` / `noUnusedParameters` 为 `false`   | 低     | 待启用        | 启用后需清理大量未使用变量                       |
| TD-004 | Mock 数据与真实后端字段可能不一致                    | 中     | 待验证        | 后端 `dashboard/server.py` 不在本仓              |
| TD-005 | `src/imports/pasted_text/` 参考文本未被使用          | 低     | 待清理        | 可移到 `docs/` 或删除                            |
| TD-006 | 8 种 i18n 语言未实际翻译                             | 中     | 待补齐        | 当前 alias 到 `en`                               |
| TD-007 | recharts v2 deprecated                               | 中     | 待迁移        | 官方建议升 v3                                    |

---

## §11 关键联系人与引用

| 引用                 | 位置                                                       |
| -------------------- | ---------------------------------------------------------- |
| 团队开发标准         | `docs/09-YYC3-团队通用-标准规范/YYC3-团队规范-开发标准.md` |
| 设计系统规范         | `docs/guidelines/Guidelines.md`                            |
| 贡献指南             | `docs/CONTRIBUTING.md`                                     |
| 架构总览             | `docs/ARCHITECTURE.md`                                     |
| API 接口             | `docs/API.md`                                              |
| Agent 指南           | `AGENTS.md`                                                |
| 参考实现（独立项目） | `docs/YYC3-AI-Dev/`（**不归本仓构建/lint**）               |

---

## §12 验收检查清单（最终）

每次重大变更后运行此清单，确保工程化基线不退化：

```bash
# ── 完整门禁 ──
pnpm check:all

# ── 分项检查 ──
pnpm typecheck        # → 0 errors
pnpm lint             # → 0 errors, 0 warnings
pnpm format:check     # → all pass
pnpm test             # → 108 passed
pnpm check:circular   # → 0 circular deps
pnpm check:dead       # → 0 unimported files
pnpm build            # → ✓ built, 0 warnings
```

**全绿 = 可发布。**

---

> _言启千行代码 · 语枢万物智能_
> _三省以治 · 六部以行_
> _P0–P5 工程化全阶段已闭环，项目进入维护迭代阶段。_
