---
file: agents/README.md
description: Agent 人格体系 · 三省六部 AI Agent 灵魂配置权威定义
author: YanYuCloudCube Team
version: v1.0.0
created: 2026-07-16
updated: 2026-07-16
status: stable
tags: [agents],[soul],[reference],[sync-framework]
category: technical
language: zh-CN
audience: developers
complexity: advanced
---

# Agent 人格体系 · 三省六部 AI Agent 灵魂配置

> 本目录包含全部 AI Agent 的人格定义（SOUL.md），是前端角色卡的**权威数据源**。
> 与 [YYC3-Dynasty-Framework](https://github.com/YYC-Cube/YYC3-Dynasty-Framework) 的 `agents/` 目录保持同步。

---

## 文件层次（三层继承）

```
GLOBAL.md               ← 所有 Agent 共享的通用规则
  ├── groups/sansheng.md ← 三省（太子/中书/门下/尚书）共用协调规则
  ├── groups/liubu.md    ← 六部共用执行规则
  └── [agent]/SOUL.md    ← 个体 Agent 人格（可覆盖上层设定）
```

## Agent 角色总览

### 协调层（三省 · Sansheng）

| Agent ID | 角色 | 核心职责 |
|----------|------|---------|
| `taizi` | 太子 | 消息分拣、旨意整理、最终回奏 |
| `zhongshu` | 中书省 | 规划决策、方案起草、流程枢纽 |
| `menxia` | 门下省 | 审议把关、准奏/封驳 |
| `shangshu` | 尚书省 | 执行调度、六部派发、结果汇总 |

### 执行层（六部 · Liubu）

| Agent ID | 角色 | 专业领域 |
|----------|------|---------|
| `gongbu` | 工部 | 基础设施、部署运维、性能监控 |
| `bingbu` | 兵部 | 工程实现、架构设计、功能开发 |
| `hubu` | 户部 | 数据分析、统计报表、资源管理 |
| `libu` | 礼部 | 文档规范、UI 文案、对外沟通 |
| `xingbu` | 刑部 | 质量保障、测试验收、合规审计 |
| `libu_hr` | 吏部 | 人事管理、Agent 考核、能力培训 |
| `zaochao` | 钦天监 | 每日新闻采集、早朝简报 |

## 状态机对应关系

Agent 角色与任务状态机的映射定义在 `src/app/domain/state-machine.ts`：

- `STATE_AGENT_MAP` — 状态 → 责任 Agent
- `ORG_AGENT_MAP` — 部门中文名 → Agent ID
- `STATE_ORG_MAP` — 状态 → 执行部门

## 同步策略

本目录与 Framework 项目 `agents/` 目录双向同步。修改时需在两处同时更新：

1. [YYC3-Dynasty-Framework](https://github.com/YYC-Cube/YYC3-Dynasty-Framework) `agents/` — 后端运行时引用
2. 本项目 `agents/` — 前端角色卡数据源
