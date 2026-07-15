# AGENTS.md

> Guidance for AI agents (and humans) working in the **YYC³ Dynasty** repository.
> Document only what is actually observed — when conventions below conflict with reality, reality wins.

---

## 1. Project at a Glance

**YYC³ Dynasty · 三省六部** is a **frontend-only React SPA** — an AI-Agent collaboration dashboard themed around the classical Chinese "Three Departments and Six Ministries" (三省六部) governance system. It visualizes task flow, agent status, and performance using imperial-court metaphors (edicts/圣旨, jade seal/玉玺, ministries/六部, etc.).

- **Runtime**: React 18 + TypeScript, built with Vite 6.
- **Styling**: TailwindCSS v4 (CSS-first `@theme`) + shadcn/ui (Radix UI) primitives.
- **State**: Zustand (single store) with HTTP polling + optional WebSocket realtime.
- **Routing**: react-router v7 (`createBrowserRouter`).
- **i18n**: Custom, dependency-free implementation (no `react-i18next`).
- **Backend**: NOT in this repo. The app calls an external Python service (`dashboard/server.py`, referenced in `src/app/api.ts`) and **falls back to embedded mock data** when the backend is unreachable.

The `docs/` tree contains extensive design/spec docs (in Chinese) and a **separate reference monorepo** (`docs/YYC3-AI-Dev/` with its own `package.json`, vitest, eslint). That subproject is documentation/reference only — it is **not** part of the build for `yyc3-dynasty`.

---

## 2. Essential Commands

Package manager: **pnpm** (declared in `pnpm-workspace.yaml`; the root is the only workspace package).

```bash
pnpm install          # install dependencies
pnpm dev              # start Vite dev server on http://localhost:3122 (host: true)
pnpm build            # production build → dist/ (route-level code-splitting + vendor chunks)
pnpm preview          # preview the production build
pnpm typecheck        # run `tsc --noEmit` (strict type check, no emit)
pnpm test             # run Vitest test suite (108 tests)
pnpm test:coverage    # run tests with v8 coverage report
pnpm lint             # ESLint check (flat config, TS + React Hooks + Prettier compat)
pnpm lint:fix         # ESLint auto-fix
pnpm format           # Prettier format all source/config files
pnpm format:check     # Prettier check (CI gate)
pnpm check:circular   # madge — detect circular dependencies
pnpm check:dead       # unimported — detect dead code / unused dependencies
pnpm check:all        # typecheck + lint + test + build (full CI gate)
```

Environment:

- **Node.js >= 18, pnpm >= 8** (declared in `package.json` `engines`, enforced norm from `docs/CONTRIBUTING.md`).
- `pnpm-workspace.yaml` sets `supportedArchitectures` to **linux + darwin** (x64 + arm64) so native binaries (e.g. `@rollup/rollup-*`) resolve on both macOS dev hosts and Linux Docker images. `minimumReleaseAge: 10080` (7-day cooldown on new package releases). `allowBuilds` whitelists `@tailwindcss/oxide` and `esbuild`.
- API base URL is configurable via the `VITE_API_URL` env var (defaults to same-origin / empty → mock fallback).

### Verification baseline (current)

| Command               | Result                                         |
| --------------------- | ---------------------------------------------- |
| `pnpm typecheck`      | ✅ 0 errors (TypeScript 5.9.x, strict)         |
| `pnpm lint`           | ✅ 0 errors, 0 warnings (ESLint 9 flat config) |
| `pnpm format:check`   | ✅ All files conform to Prettier style         |
| `pnpm test`           | ✅ 108 tests pass (Vitest 3.x)                 |
| `pnpm test:coverage`  | ✅ 83.82% statements, 80.21% branches          |
| `pnpm check:circular` | ✅ No circular dependencies                    |
| `pnpm check:dead`     | ✅ 0 unimported files                          |
| `pnpm build`          | ✅ 2661 modules, initial ~418 kB (gzip 137 kB) |

### What is NOT configured

All core quality tools are configured and passing: ESLint, Prettier, Vitest, madge, unimported, Docker, GitHub Actions CI. Use `pnpm check:all` as the full pre-commit gate (`typecheck && lint && test && build`). See §11 for deployment.

---

## 3. Repository Layout

```
.
├── index.html                  # Vite entry, loads Google Fonts (Noto Serif SC, JetBrains Mono, Zhi Mang Xing)
├── package.json                # version 1.0.0, scripts, deps (see §2)
├── pnpm-workspace.yaml         # overrides + supportedArchitectures (linux + darwin)
├── postcss.config.mjs          # intentionally EMPTY (Tailwind v4 handles plugins via @tailwindcss/vite)
├── vite.config.ts              # @ alias, server port 3122, manualChunks vendor splitting
├── vitest.config.ts            # Vitest config (jsdom, v8 coverage)
├── eslint.config.mjs           # ESLint v9 flat config
├── .prettierrc.json            # Prettier config
├── tsconfig.json               # strict, paths { "@/*": ["./src/*"] }
├── tsconfig.node.json          # for vite.config.ts only
├── Dockerfile                  # multi-stage: pnpm builder → nginx runtime
├── nginx.conf                  # SPA fallback + Gzip + security headers
├── .dockerignore               # Docker build exclusions
├── .env.example                # VITE_API_URL template
├── CHANGELOG.md                # Keep a Changelog format
├── default_shadcn_theme.css    # reference shadcn theme (not imported by app)
├── ATTRIBUTIONS.md             # shadcn/ui (MIT) + Unsplash attributions
├── .github/workflows/
│   ├── ci.yml                  # CI: typecheck/lint/test/build (Node 18+20)
│   └── release.yml             # tag → Docker image + GitHub Release
├── src/
│   ├── main.tsx                # React root (StrictMode → #root)
│   ├── vite-env.d.ts
│   ├── styles/
│   │   ├── index.css           # aggregator: fonts → tailwind → theme
│   │   ├── fonts.css
│   │   ├── tailwind.css        # @import 'tailwindcss' source(none); @source '../**/*.{js,ts,jsx,tsx}'
│   │   ├── theme.css           # @theme tokens (dynasty dark palette) + base body
│   │   └── globals.css         # currently EMPTY
│   ├── imports/pasted_text/    # reference prompt-engineering notes (not app code)
│   └── app/
│       ├── App.tsx             # RouterProvider + loads theme.css/fonts.css
│       ├── routes.tsx          # all routes (lazy code-splitting, see §5)
│       ├── store.ts            # Zustand store + PIPE/DEPTS/TEMPLATES constants
│       ├── store.test.ts       # store unit tests (37 cases)
│       ├── api.ts              # fetch wrapper + mock-data fallback + all TS types
│       ├── api.test.ts         # API mock fallback tests (49 cases)
│       ├── i18n.ts             # custom i18n (10 locales, only zh-CN + en translated)
│       ├── i18n.test.ts        # i18n translation tests (22 cases)
│       ├── useWebSocket.ts     # singleton WS hook with exponential-backoff reconnect
│       └── components/
│           ├── ui/             # shadcn/ui primitives (button.tsx, dialog.tsx, …) + utils.ts (cn)
│           ├── figma/          # Figma-Make helpers (ImageWithFallback.tsx)
│           ├── toastEmitter.ts # Toast event bus (extracted from ToastSystem)
│           ├── Dashboard.tsx   # /dashboard tab-based panel container
│           └── *.tsx           # feature components (Court, EdictBoard, TaishiMonitor, …)
└── docs/                       # design specs + ROADMAP + QUALITY_REPORT + reference monorepo
```

---

## 4. Code Conventions

### File header (mandatory on every source file)

Every `.ts`/`.tsx`/`.css` file in `src/` begins with a standardized JSDoc/YAML-ish header. New files **must** follow this shape (enforced by team norm, not by a linter):

```ts
/**
 * file: Filename.tsx
 * description: 文件描述 (Chinese description is the norm)
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: YYYY-MM-DD
 * updated: YYYY-MM-DD
 * status: active
 * tags: [tag1],[tag2]
 *
 * brief: one-line summary
 *
 * details:
 * - bullet points
 *
 * dependencies: ...
 * exports: ...
 */
```

`created`/`updated` dates use ISO `YYYY-MM-DD`; today's project date is 2026-07-12.

### Naming

| Artifact               | Rule                                   | Example                                                  |
| ---------------------- | -------------------------------------- | -------------------------------------------------------- |
| Component file         | `PascalCase.tsx`                       | `EdictBoard.tsx`                                         |
| Hook file              | `camelCase.ts`                         | `useWebSocket.ts`                                        |
| Utility file           | `camelCase.ts`                         | (currently inlined in `store.ts`)                        |
| Style file             | `kebab-case.css`                       | `theme.css`                                              |
| Component suffixes     | `*Panel`, `*Card`, `*Modal`, `*Button` | `MonitorPanel`, `MinistryCard`, `TaskModal`, `CTAButton` |
| Route-level components | named export (no default)              | `export function Welcome()`                              |
| UI primitives (shadcn) | `function Button` + named exports      | see `components/ui/button.tsx`                           |

### Formatting (from `.editorconfig`)

- 2-space indent, LF line endings, UTF-8.
- Trim trailing whitespace; insert final newline.
- Exception: `*.md` keeps trailing whitespace (for Markdown hard breaks).

### Imports

- Use the `@/` path alias for `src/` (configured in both `tsconfig.json` and `vite.config.ts`).
- shadcn/ui primitives import the `cn` helper via relative path (`./utils`), not the alias — match that locally.
- `motion` is imported from `"motion/react"` (the `motion` package v12 unified entry), **not** `"framer-motion"`.

### Comments

Team norm (per `docs/CONTRIBUTING.md`) is Chinese inline comments and Chinese `description` fields. Match the surrounding file's language.

---

## 5. Application Architecture

### Routing (`src/app/routes.tsx`)

`createBrowserRouter` with two top-level entries:

| Path            | Component          | Notes                                  |
| --------------- | ------------------ | -------------------------------------- |
| `/welcome`      | `Welcome`          | standalone (no layout)                 |
| `/`             | `RootLayout`       | shell; `index` redirects to `/welcome` |
| `/dashboard`    | `Dashboard`        | 统一看板（tab 式面板布局）             |
| `/court`        | `Court`            | 朝堂议政                               |
| `/timeline`     | `Timeline`         | 十三王朝                               |
| `/honors`       | `Honors`           | 勋章墙                                 |
| `/edict`        | `EdictBoard`       | 旨意看板                               |
| `/edict/create` | `EdictCreate`      | 旨意工坊                               |
| `/edict/:id`    | `EdictDetail`      | 敕令详情                               |
| `/monitor`      | `TaishiMonitor`    | 太史监候                               |
| `/settings`     | `PalaceRegulation` | 宫阙规制                               |
| `/bridge`       | `DualStarBridge`   | 双星桥                                 |

All routes use react-router v7 `lazy()` for route-level code-splitting. Each page is a separate chunk loaded on-demand.

`App.tsx` renders `<RouterProvider router={router} />` inside `<React.StrictMode>`.

### State (`src/app/store.ts`)

- One Zustand store: `useStore`. Holds both server data (`liveStatus`, `agentConfig`, `officialsData`, …) and UI state (`activeTab`, filters, `modalTaskId`, `toasts`, `wsConnected`).
- Domain constants co-located here: `PIPE` (8-stage pipeline), `PIPE_STATE_IDX`, `DEPT_COLOR`, `STATE_LABEL`, `DEPTS`, `TEMPLATES`, `TPL_CATS`, `TAB_DEFS`.
- Helper exports: `deptColor()`, `stateLabel()`, `isEdict()`, `isSession()`, `isArchived()`, `getPipeStatus()`, `esc()`, `timeAgo()`.
- **Polling**: `startPolling()` / `stopPolling()` drive a countdown timer. Interval = `POLL_INTERVAL_HTTP` (5s) when WS is down, `POLL_INTERVAL_WS` (30s) when WS is up. `loadAll()` refreshes data each cycle.
- Toasts auto-dismiss after 3000ms.

### API layer (`src/app/api.ts`)

- `API_BASE = import.meta.env.VITE_API_URL || ''` (same-origin by default).
- `fetchJ<T>()` GETs JSON and **silently falls back to `mockData`** if the response is non-OK or HTML (e.g. dev server returning index.html). `postJ<T>()` likewise swallows errors and returns a fake success.
- All endpoints hang off the `api` object; do not call `fetch` directly elsewhere.
- Every response shape has a TypeScript `interface` in this file — add new types here, not inline in components.

### Realtime (`src/app/useWebSocket.ts`)

- Module-level singleton `_ws` shared across components. The hook registers a listener into a module-level `Set`; **cleanup only removes the listener, it does not close the socket** (other components may depend on it). Call `wsDisconnect()` only on page unload.
- Reconnect uses exponential backoff capped at 30s (`MAX_RECONNECT_DELAY`).
- WS URL derived from `VITE_API_URL` (`http→ws`) or `location.host`.

### i18n (`src/app/i18n.ts`)

- 10 locales declared in `LOCALES`, but **only `zh-CN` and `en` have real translation maps**. The other 8 (`ja, ko, fr, de, es, pt-BR, ru, ar`) alias to `en`.
- `t(key, params?)` falls back to `zh-CN` then to the raw key.
- Locale persisted in `localStorage` under `dynasty_locale`; detected from `navigator.language` on first load.
- React binding: `useLocale()` hook subscribes to a module-level pub/sub (`onLocaleChange`).

### Styling

- **TailwindCSS v4** is wired through `@tailwindcss/vite` (the plugin), not PostCSS. `postcss.config.mjs` is empty on purpose — do **not** add `tailwindcss`/`autoprefixer` there (see its own header comment).
- Theme tokens live in `src/styles/theme.css` under `@theme { … }`. They expose colors like `--color-accent-gold`, `--color-emperor`, `--color-zhongshu`, plus spacing/radius/shadow tokens. Use them as Tailwind utilities (e.g. `bg-bg-primary`, `text-accent-gold`, `shadow-panel`).
- Class merging in shadcn primitives uses `cn()` from `src/app/components/ui/utils.ts` (`twMerge(clsx(...))`).
- The design system (color names, fonts, motifs, animation timing) is extensively specified in `docs/guidelines/Guidelines.md` — consult it before touching visual components.

---

## 6. Adding a New Page (checklist)

1. Create `src/app/components/MyPage.tsx` with the standard file header and a named export.
2. Register the route in `src/app/routes.tsx` (under `RootLayout`'s `children` unless it's standalone like `/welcome`).
3. If the page needs server data, add the endpoint + TypeScript interface to `src/app/api.ts`, add the fetch action to the Zustand store in `src/app/store.ts`, and add any new tab key to `TabKey` + `TAB_DEFS`.
4. Add user-facing strings to both the `zhCN` and `en` maps in `src/app/i18n.ts`.
5. Reuse shadcn primitives from `src/app/components/ui/`; compose with the dynasty theme tokens.
6. Verify with `pnpm dev` (port 3122), `pnpm typecheck` (must be 0 errors), and `pnpm build`.

---

## 7. Adding a New UI Primitive (shadcn-style)

- Place under `src/app/components/ui/<name>.tsx`, kebab-case filename, matching the existing 45 primitives.
- Import `cn` from `"./utils"`.
- Follow the CVA + `data-slot` + `React.ComponentProps<...>` pattern used in `button.tsx`.
- Export both the component and its variant helper (e.g. `buttonVariants`) when peers do.

---

## 8. Backend Contract (for reference; backend is external)

The frontend targets **two backend generations** via a dual-route adapter in `api.ts`:

### New backend (OpenClaw FastAPI — primary)

RESTful resource-grouped routes under `/api`:

- `GET /api/tasks/live-status` (legacy compat snapshot), `GET /api/tasks` (list + filter/paginate), `GET /api/tasks/{id}`, `GET /api/tasks/stats`, `GET /api/tasks/by-legacy/{id}`
- `POST /api/tasks` (create), `POST /api/tasks/{id}/transition` (state machine), `POST /api/tasks/{id}/dispatch|progress`, `PUT /api/tasks/{id}/todos|scheduler`
- `GET /api/agents`, `GET /api/agents/{id}`, `GET /api/agents/{id}/config`
- `GET /api/events` (trace_id/topic/producer filter), `GET /api/events/topics`
- `GET /health`, `/api`, `/api/admin/health/deep`, `/api/admin/pending-events`
- WebSocket at `/ws` (global event stream) and `/ws/task/{id}` (per-task filtered)

### Old backend (dashboard/server.py — Mock fallback only)

These endpoints **do not exist** in the new backend; the frontend falls back to embedded Mock data:

- `GET /api/agent-config`, `/api/officials-stats`, `/api/agents-status`, `/api/morning-brief`, `/api/morning-config`, `/api/model-change-log`, `/api/task-activity/{id}`, `/api/scheduler-state/{id}`, `/api/skill-content/*`, `/api/remote-skills-list`
- `POST /api/set-model`, `/api/task-action`, `/api/review-action`, `/api/court-discuss/*`, `/api/scheduler-*`, `/api/*-remote-skill`

### Field normalization

`normalizeTask()` in `api.ts` handles field name differences between old/new backends:

- `task_id` ↔ `id`, `assignee_org` ↔ `org`, `progress_log` → `activity`
- `flow_log` entries: `ts`/`timestamp` → `at`, `reason`/`message` → `remark`
- `review_round` extracted from `meta.review_round`; `heartbeat` defaults to `{status:'unknown'}`

### STRICT mode

`VITE_STRICT_API=true` disables Mock fallback — all API failures throw. Use during backend integration to surface real errors.

`docs/API.md` contains the full endpoint-by-endpoint migration status table.

---

## 9. Gotchas & Non-Obvious Details

1. **`package.json` duplicate keys — RESOLVED.** The file previously declared `dependencies` and `devDependencies` twice (malformed JSON). It is now consolidated into single blocks; the authoritative dependency set is the one that includes `react`/`react-dom`. The dead `pnpm.overrides` field was removed (pnpm v10+ ignores it — see #2).

2. **pnpm overrides live in `pnpm-workspace.yaml`, not `package.json`.** pnpm v10+ no longer reads `package.json`'s `"pnpm"` field. The `vite: 6.3.5` override is set under top-level `overrides:` in `pnpm-workspace.yaml`. Keep package-manager settings there.

3. **`supportedArchitectures` must include the host OS.** It is set to `linux + darwin` (x64 + arm64). If you restrict it to Linux-only, pnpm won't install the macOS native binding (e.g. `@rollup/rollup-darwin-arm64`) and `pnpm build` crashes with `Cannot find module @rollup/rollup-darwin-arm64`. After changing this field you must delete `pnpm-lock.yaml` + `node_modules` and reinstall (pnpm reuses the cached lockfile otherwise).

4. **Vite plugins are load-bearing even when they look optional.** `vite.config.ts` explicitly warns: the `react()` and `tailwindcss()` plugins "are both required for Make, even if Tailwind is not being actively used — do not remove them."

5. **Dev server port is centralized in `vite.config.ts`** (`server.port: 3122`, `server.host: true`). The `dev` script is just `vite` (no CLI flags); edit the config, not the script, to change the port.

6. **`assetsInclude` rule.** `vite.config.ts` adds `*.svg` and `*.csv` as raw-importable assets and comments: _"Never add `.css`, `.tsx`, or `.ts` files to this."_

7. **PostCSS file is intentionally empty.** Tailwind v4 self-registers via the Vite plugin; adding `tailwindcss`/`autoprefixer` to `postcss.config.mjs` will double-process and break the build.

8. **Tailwind source scanning is explicit.** `tailwind.css` uses `@import 'tailwindcss' source(none)` + `@source '../**/*.{js,ts,jsx,tsx}'`. New class names must appear in those file types to be generated.

9. **API calls silently succeed against mock data.** Because `fetchJ`/`postJ` fall back to `mockData` / fake `{ ok: true }`, a missing backend will **not** throw — components will render mock tasks. Don't mistake mock data for real backend integration. To hit a real backend, set `VITE_API_URL`.

10. **`globals.css` is currently empty.** `index.css` does not import it. Prefer `theme.css` for global rules.

11. **`noUnusedLocals` / `noUnusedParameters` are OFF.** TS won't flag dead variables/params; keep an eye out manually.

12. **WebSocket cleanup is listener-only.** Calling the hook's cleanup does **not** close the shared socket. Only `wsDisconnect()` (page unload) tears it down.

13. **The `motion` import path is `"motion/react"`, not `"framer-motion"`.** This project uses the unified `motion` v12 package.

14. **Path alias `@/` → `src/`** is set in both `tsconfig.json` (`paths`) and `vite.config.ts` (`resolve.alias`). shadcn primitives deliberately use relative `./utils` instead — keep that local convention inside `components/ui/`.

15. **`react-resizable-panels` v2 API.** Exports are `Panel`, `PanelGroup`, `PanelResizeHandle` (NOT `Group`/`Separator`). `PanelGroup` takes `direction="horizontal"|"vertical"` (NOT `orientation`). `PanelResizeHandle`s must be interleaved **between** panels, not appended after them.

16. **Toast emitter shape.** `toastEmitter.emit()` takes `Omit<ToastMessage,"id">` = `{ level: ToastLevel, title, desc?, duration? }`. There is no `msg` or `type` field (`ToastLevel` = `"emergency"|"important"|"normal"`).

17. **`docs/YYC3-AI-Dev/` is a separate reference monorepo** with its own `package.json`, vitest, eslint, and workspace. Its commands and code do **not** apply to `yyc3-dynasty`. Don't run its tests expecting them to cover this app.

18. **Commit/branch conventions** (from `docs/CONTRIBUTING.md`, not enforced by tooling here): Conventional Commits (`feat|fix|docs|style|refactor|test|chore(scope): subject`); branches `main` → `develop` → `feature/* | bugfix/* | refactor/*`.

19. **PR checklist** (team norm, not automated): JSDoc header complete, TS strict clean (`pnpm typecheck`), naming compliant, no circular deps, no hardcoded secrets.

---

## 10. Key Files to Read First

| File                                                       | Why                                                                                             |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `src/app/routes.tsx`                                       | The full route map; entry point for navigation.                                                 |
| `src/app/store.ts`                                         | All domain constants (`PIPE`, `DEPTS`, `TEMPLATES`) + the single Zustand store + polling logic. |
| `src/app/api.ts`                                           | Every backend call and every shared TypeScript interface.                                       |
| `src/app/components/ui/utils.ts`                           | The `cn()` helper used by all primitives.                                                       |
| `src/app/components/ui/button.tsx`                         | Canonical pattern for a shadcn primitive in this repo.                                          |
| `src/styles/theme.css`                                     | Dynasty color/spacing/shadow tokens.                                                            |
| `docs/guidelines/Guidelines.md`                            | Exhaustive design system (colors, fonts, motifs, animation specs, per-page prompts).            |
| `docs/CONTRIBUTING.md`                                     | Team norms (headers, naming, commit/branch, PR checklist).                                      |
| `docs/09-YYC3-团队通用-标准规范/YYC3-团队规范-开发标准.md` | Broader YYC³ team development standard.                                                         |

---

## 11. Deployment & CI/CD

### Docker

Production image is a **multi-stage build** (`Dockerfile`):

1. **Builder stage** (Node 20 Alpine + pnpm): `pnpm install --frozen-lockfile` → `pnpm build` → outputs `dist/`.
2. **Runtime stage** (nginx:alpine): serves `dist/` with SPA fallback (`try_files $uri /index.html`), Gzip, security headers, and 1-year cache for `/assets/`.

```bash
# Build locally
docker build -t yyc3-dynasty .

# Build with custom API URL
docker build --build-arg VITE_API_URL=https://api.example.com -t yyc3-dynasty .

# Run (maps container port 80 to host 3122)
docker run -p 3122:80 yyc3-dynasty

# Multi-arch build (amd64 + arm64)
docker buildx build --platform linux/amd64,linux/arm64 -t yyc3-dynasty .
```

The final image is ~25 MB. Health check is built in (`HEALTHCHECK`).

### GitHub Pages Deployment

`.github/workflows/deploy.yml` deploys the app to GitHub Pages on every push to `main`:

- **Live site**: <https://dynasty.yyc3.fun> (custom domain via `public/CNAME`)
- **Repo**: <https://github.com/YYC-Cube/YYC3-Dynasty.git>
- Builds with pnpm + Node 20, uploads `dist/` as a Pages artifact, then deploys.
- Because the apex custom domain serves at root, Vite `base` stays at the default `/` (no sub-path prefix needed).
- **Prerequisite**: repo `Settings → Pages → Build and deployment → Source` must be set to **GitHub Actions**.

### GitHub Actions CI

`.github/workflows/ci.yml` runs on every PR/push to `main`/`develop`:

- **Matrix**: Node.js 18 + 20
- **Steps**: `typecheck` → `lint` → `format:check` → `test` → `check:circular` → `build`
- **Artifacts**: `dist/` uploaded (7-day retention, Node 20 only)

### GitHub Actions Release

`.github/workflows/release.yml` triggers on `v*.*.*` Git tags:

1. Builds production bundle
2. Builds multi-arch Docker image (amd64 + arm64) → pushes to `ghcr.io/yyc-cube/yyc3-dynasty`
3. Creates GitHub Release with auto-generated notes from `CHANGELOG.md`

### Semantic Versioning

- `package.json` `version` field is the **single source of truth**.
- Git tags follow `v1.0.0` format (SemVer 2.0.0).
- Bump scripts: `pnpm version:patch` / `version:minor` / `version:major` (uses `npm version --no-git-tag-version`).
- After bumping: commit, tag, push → CI/release workflow runs automatically.

```bash
# Release flow
pnpm version:patch          # bumps 1.0.0 → 1.0.1 in package.json
# edit CHANGELOG.md (move [Unreleased] → [1.0.1])
git add -A && git commit -m "chore(release): v1.0.1"
git tag v1.0.1
git push origin main --tags # triggers release.yml
```

### Environment Variables

| Variable       | Default      | Purpose                                                                             |
| -------------- | ------------ | ----------------------------------------------------------------------------------- |
| `VITE_API_URL` | `''` (empty) | Backend API base URL. Empty = same-origin → falls back to mock data if unreachable. |

Copy `.env.example` → `.env` (dev) or `.env.production` (build). Never commit secrets.
