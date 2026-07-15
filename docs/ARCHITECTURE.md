---
file: ARCHITECTURE.md
description: YYC³ Dynasty 项目架构总览
author: YanYuCloudCube Team
version: v1.0.0
created: 2026-07-12
updated: 2026-07-12
status: stable
tags: [architecture],[overview],[design]
category: technical
audience: developers
complexity: intermediate
---

# YYC³ Dynasty 架构总览

> **_YanYuCloudCube_**
> _言启象限 | 语枢未来_

---

## 项目概述

YYC³ Dynasty（三省六部）是一个基于古典文化隐喻的 AI Agent 协作管理看板系统。以「三省六部」制度为框架，可视化展示 AI Agent 的任务流转、状态监控与绩效管理。

## 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 框架 | React 18 + TypeScript | 18.3.1 |
| 构建工具 | Vite | 6.3.5 |
| 样式 | TailwindCSS v4 | 4.1.12 |
| 路由 | react-router v7 | 7.13.0 |
| 状态管理 | Zustand | ^5.0.14 |
| 动画 | motion (framer-motion) | 12.23.24 |
| UI 组件 | shadcn/ui + Radix UI | - |
| 图表 | Recharts | 2.15.2 |
| Markdown | react-markdown + remark-gfm | - |

## 架构分层

```
┌─────────────────────────────────────────────┐
│                应用层 (App)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ 路由层   │  │ 布局层   │  │ 页面层   │  │
│  │ routes.ts│  │RootLayout│  │ Court,   │  │
│  │          │  │          │  │Timeline..│  │
│  └──────────┘  └──────────┘  └──────────┘  │
├─────────────────────────────────────────────┤
│              组件层 (Components)             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ 业务组件 │  │ 通用组件 │  │ UI组件   │  │
│  │EdictBoard│  │ CTAButton│  │shadcn/ui │  │
│  │Court     │  │ FlowBar  │  │ Radix    │  │
│  └──────────┘  └──────────┘  └──────────┘  │
├─────────────────────────────────────────────┤
│             服务层 (Services)                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ API 层  │  │ 状态管理 │  │WebSocket │  │
│  │ api.ts   │  │ store.ts │  │useWS.ts  │  │
│  └──────────┘  └──────────┘  └──────────┘  │
├─────────────────────────────────────────────┤
│            基础设施 (Infrastructure)          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ 样式系统 │  │ 国际化   │  │ 配置系统 │  │
│  │ theme.css│  │ i18n.ts  │  │vite,tsc  │  │
│  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────┘
```

## 目录结构

```
src/
├── app/
│   ├── App.tsx                    # 根组件
│   ├── routes.tsx                 # 路由配置
│   ├── api.ts                     # API 层（含 Mock）
│   ├── store.ts                   # Zustand 状态管理
│   ├── i18n.ts                    # 国际化
│   ├── useWebSocket.ts            # WebSocket Hook
│   └── components/
│       ├── ui/                    # shadcn/ui 组件
│       ├── Court.tsx              # 朝堂页
│       ├── EdictBoard.tsx         # 旨意看板
│       ├── Timeline.tsx           # 王朝时间轴
│       └── ...                    # 其他业务组件
├── styles/
│   ├── index.css                  # 样式入口
│   ├── theme.css                  # 主题变量
│   ├── tailwind.css               # Tailwind 配置
│   └── fonts.css                  # 字体定义
└── vite-env.d.ts                  # Vite 类型声明
```

## 数据流

```
后端 API (port 7891)
    │
    ▼
┌──────────────┐    ┌──────────────┐
│  HTTP 轮询   │    │  WebSocket   │
│  (5s/30s)    │    │  实时推送    │
└──────┬───────┘    └──────┬───────┘
       │                   │
       ▼                   ▼
┌──────────────────────────────────┐
│          Zustand Store           │
│   useStore (全局单例)            │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│         React 组件树             │
│   useContext / props 传递        │
└──────────────────────────────────┘
```

## 路由设计

| 路径 | 组件 | 说明 |
|------|------|------|
| `/welcome` | Welcome | 欢迎/入口页 |
| `/court` | Court | 朝堂议政 |
| `/timeline` | Timeline | 王朝时间轴 |
| `/edict` | EdictBoard | 旨意看板 |
| `/edict/create` | EdictCreate | 新建旨意 |
| `/edict/:id` | EdictDetail | 旨意详情 |
| `/honors` | Honors | 勋章墙 |
| `/monitor` | TaishiMonitor | 太史监候 |
| `/settings` | PalaceRegulation | 宫阙规制 |
| `/bridge` | DualStarBridge | 双星桥 |

## 核心概念

### 三省六部映射

| 部门 | 职责 | AI 映射 |
|------|------|---------|
| 中书省 | 决策草拟 | 策略生成 Agent |
| 门下省 | 审议封驳 | 质量审核 Agent |
| 尚书省 | 执行派发 | 任务调度 Agent |
| 六部 | 具体执行 | 各业务 Agent |

### Pipeline 流程

```
下旨 → 分拣 → 草拟 → 审议 → 派发 → 执行 → 归档
```

## 构建与部署

```bash
# 开发
pnpm dev

# 构建
pnpm build

# 类型检查
pnpm tsc --noEmit

# Lint
pnpm lint
```
