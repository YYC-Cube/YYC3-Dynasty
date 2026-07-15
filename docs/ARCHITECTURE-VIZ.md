---
file: ARCHITECTURE-VIZ.md
description: 可视化架构图 · 系统全链路数据流与组件关系
author: YanYuCloudCube Team
version: v1.0.0
created: 2026-07-16
updated: 2026-07-16
status: active
tags: [architecture],[diagram],[visualization]
category: technical
audience: developers,architects
complexity: advanced
---

# YYC³ Dynasty 可视化架构

## 一、系统全链路数据流

```
┌─────────────────────────────────────────────────────────────────────┐
│                         用户浏览器                                    │
│  ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌───────────┐           │
│  │ Welcome  │  │Dashboard │  │  Court   │  │  Edict    │  ...      │
│  │ (入口页) │  │ (Tab 式) │  │ (朝堂)   │  │  Board    │           │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └─────┬─────┘           │
│       │              │              │              │                 │
│  ─────┴──────────────┴──────────────┴──────────────┴───────         │
│                         │                                            │
│              ┌──────────┴──────────┐                                │
│              │   Zustand Store     │                                │
│              │  (src/app/store.ts) │                                │
│              │                     │                                │
│              │ • liveStatus        │     ┌────────────────┐         │
│              │ • agentConfig       │────▶│  Domain Layer  │         │
│              │ • officialsData     │     │ (src/app/domain)│        │
│              │ • agentsStatusData  │     │                │         │
│              │ • morningBrief      │     │ • state-machine│         │
│              │ • activeTab         │     │ • event-topics │         │
│              │ • wsConnected       │     │ • escalation   │         │
│              │ • toasts            │     │ • channels     │         │
│              └──────────┬──────────┘     │ • sanitize     │         │
│                         │                │ • skills       │         │
│              ┌──────────┴──────────┐     └────────────────┘         │
│              │   API Layer         │                                │
│              │ (src/app/api.ts)    │                                │
│              │                     │                                │
│              │ • 双路由适配         │                                │
│              │ • normalizeTask()   │                                │
│              │ • Mock 回退          │                                │
│              │ • STRICT_API 模式   │                                │
│              └──────────┬──────────┘                                │
│                         │                                            │
│              ┌──────────┴──────────┐                                │
│              │   WebSocket Hook    │                                │
│              │ (useWebSocket.ts)   │                                │
│              │                     │                                │
│              │ • /ws (全局)        │                                │
│              │ • /ws/task/{id}     │                                │
│              │ • 指数退避重连       │                                │
│              └──────────┬──────────┘                                │
└─────────────────────────┼───────────────────────────────────────────┘
                          │ HTTP / WS
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      后端 (OpenClaw)                                 │
│                                                                      │
│  ┌──────────┐   ┌───────────┐   ┌──────────┐   ┌────────────┐     │
│  │ FastAPI  │   │ Redis     │   │ Postgres │   │ OpenClaw   │     │
│  │ REST API │──▶│ Streams + │──▶│  Tasks + │   │ CLI Agent  │     │
│  │ /api/*   │   │ Pub/Sub   │   │  Events  │   │ Runtime    │     │
│  └──────────┘   └───────────┘   └──────────┘   └────────────┘     │
│                                                                      │
│  Workers: OutboxRelay → EventBus → Orchestrator → Dispatcher        │
└─────────────────────────────────────────────────────────────────────┘
```

## 二、前端分层架构

```
┌──────────────────────────────────────────────────┐
│                   UI Layer                        │
│  src/app/components/*.tsx                         │
│  (87 个组件：页面 + 面板 + 模态框 + 原语)         │
├──────────────────────────────────────────────────┤
│                 State Layer                       │
│  src/app/store.ts (Zustand)                       │
│  • PIPE / STATE_LABEL / PIPE_STATE_IDX            │
│  • startPolling() / stopPolling()                 │
│  • loadAll() → api.* → set()                      │
├───────────────────┬──────────────────────────────┤
│   Domain Layer    │       API Layer               │
│ src/app/domain/   │  src/app/api.ts               │
│                   │                               │
│ state-machine.ts  │  fetchJWithFallback()         │
│ event-topics.ts   │  postJWithFallback()          │
│ escalation.ts     │  normalizeTask()              │
│ channels.ts       │  normalizeFlowEntry()         │
│ sanitize.ts       │  findMock()                   │
│ skills.ts         │                               │
│                   │  Routes:                      │
│ Synthesized from  │  New: /api/tasks/* (RESTful)  │
│ backend Python    │  Old: /api/<action> (legacy)  │
├───────────────────┴──────────────────────────────┤
│              Infra Layer                          │
│  src/lib/i18n-core/  (vendor @yyc3/i18n-core)    │
│  src/lib/i18n-react/ (vendor @yyc3/i18n-react)   │
│  src/app/useWebSocket.ts                         │
│  src/app/i18n.ts (10 语言翻译)                    │
└──────────────────────────────────────────────────┘
```

## 三、路由地图

```
/ ──────────────────────────────────────────────────────────
│
├── /welcome              欢迎入口（玉玺启宫门）
│
├── /dashboard            统一看板（Tab 式控制中心）
│   ├── Tab: edicts       旨意看板
│   ├── Tab: court        朝堂议政
│   ├── Tab: monitor      省部调度
│   ├── Tab: officials    官员总览
│   ├── Tab: models       模型配置
│   ├── Tab: skills       技能配置
│   ├── Tab: sessions     小任务
│   ├── Tab: memorials    奏折阁
│   ├── Tab: templates    旨库
│   └── Tab: morning      天下要闻
│
├── /court                朝堂议政（独立全页）
├── /timeline             王朝时间轴（十三王朝）
├── /honors               勋章墙（17 种徽章）
├── /edict                旨意看板（独立全页）
├── /edict/create         旨意工坊（拟旨）
├── /edict/:id            敕令详情
├── /monitor              太史监候（系统监控）
├── /settings             宫阙规制（系统设置）
└── /bridge               双星桥（Family × Dynasty）

所有路由均懒加载（lazy code-splitting）+ ErrorBoundary + HydrateFallback
```

## 四、任务状态机（13 态）

```
                    ┌─────────────────────────────────────────┐
                    │                                         │
  Inbox ─▶ Pending ─▶ Taizi ─▶ Zhongshu ◀─▶ Menxia ─▶ Assigned
                │       │         │             │              │
                │       │         │             │              ▼
                │       │         └──Blocked◀───┘            Next
                │       │                       │              │
                │       ▼                       │              ▼
                │   Cancelled ◀─────────────────┴───        Doing
                │       (终态)                                   │
                │                                          ┌────┴────┐
                ▼                                          ▼         ▼
            Cancelled                                    Review    Done
             (终态)                                        │      (终态)
                                                  ┌───────┼─────────┘
                                                  ▼       ▼
                                          PendingConfirm  Menxia
                                                  │    (回退审议)
                                                  ▼
                                                 Done
                                               (终态)
```

## 五、CI/CD 流水线

```
Push to main ──────▶ ┌──────────────┐
                     │   ci.yml     │──▶ typecheck + lint + test + build
                     │  (Node 20+22)│──▶ coverage report + audit gate
                     └──────┬───────┘
                            │
                     ┌──────▼───────┐
                     │  deploy.yml  │──▶ pnpm build → GitHub Pages
                     │  (Node 22)   │──▶ dynasty.yyc3.fun
                     └──────┬───────┘
                            │
                     ┌──────▼───────┐
                     │ lighthouse   │──▶ 3 页面性能审计
                     │   .yml       │──▶ performance ≥ 0.75
                     └──────────────┘

Tag v*.*.* ────────▶ ┌──────────────┐
                     │ release.yml  │──▶ Docker amd64+arm64
                     │              │──▶ ghcr.io/yyc-cube/yyc3-dynasty
                     └──────────────┘

PR opened ─────────▶ ┌──────────────┐  ┌──────────────┐
                     │auto-label.yml│  │  stale.yml   │
                     │(路径+尺寸)    │  │(60d/30d 关闭) │
                     └──────────────┘  └──────────────┘
```

## 六、文件结构概览

```
yyc3-dynasty/
├── src/
│   ├── main.tsx                    # React 入口
│   ├── app/
│   │   ├── App.tsx                 # I18nProvider + RouterProvider
│   │   ├── routes.tsx              # 12 路由（lazy + ErrorBoundary）
│   │   ├── store.ts                # Zustand 全局状态 + PIPE 定义
│   │   ├── api.ts                  # 双路由 API 适配层（320 行类型）
│   │   ├── i18n.ts                 # 10 语言 Dynasty 翻译
│   │   ├── useWebSocket.ts         # WS 单例 + useTaskWebSocket
│   │   ├── domain/                 # 领域常量（同步后端）
│   │   │   ├── state-machine.ts    # 13 态 + STATE_TRANSITIONS
│   │   │   ├── event-topics.ts     # 15 个事件 Topic
│   │   │   ├── escalation.ts       # 升级路径 + 调度器配置
│   │   │   ├── channels.ts         # 7 种通知渠道 + SSRF 防护
│   │   │   ├── sanitize.ts         # 标题/备注文本净化
│   │   │   └── skills.ts           # Skills Hub + Agent 映射
│   │   └── components/             # 87 个组件
│   │       ├── ui/                 #   46 个 shadcn 原语
│   │       ├── *.tsx               #   41 个功能组件
│   │       └── *.test.tsx          #   组件交互测试
│   └── lib/
│       ├── i18n-core/              # vendor @yyc3/i18n-core（浏览器安全子集）
│       └── i18n-react/             # vendor @yyc3/i18n-react
├── agents/                         # Agent 人格体系（14 个文件）
├── docs/                           # 设计文档 + 工程文档
├── .github/workflows/              # 6 个 CI/CD 工作流
├── Dockerfile                      # 多阶段构建（Node 22 → nginx 非 root）
├── knip.json                       # 死代码检测配置
└── package.json                    # v1.0.0, Node ≥20, pnpm ≥10
```
