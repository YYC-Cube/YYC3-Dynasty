---
file: API.md
description: YYC³ Dynasty API 接口文档 · 新旧后端契约对照与迁移状态
author: YanYuCloudCube Team
version: v2.0.0
created: 2026-07-12
updated: 2026-07-16
status: active
tags: [api],[reference],[documentation],[adapter]
category: api
audience: developers
complexity: advanced
---

# API 接口文档

> **_YanYuCloudCube_**
> _言启象限 | 语枢未来_

---

## 概述

前端通过 HTTP API + WebSocket 对接后端。当前存在**两代后端**：

| 后代 | 路径风格 | 技术栈 | 状态 |
|------|---------|--------|------|
| **新后端（OpenClaw FastAPI）** | RESTful `/api/tasks/*` | FastAPI + Postgres + Redis | ✅ 主力，事件驱动 |
| **旧后端（dashboard/server.py）** | 扁平 `/api/<action>` | Flask/aiohttp 单文件 | ⚠️ 逐步废弃 |

前端 API 层（`src/app/api.ts`）采用**双路由适配 + Mock 回退**策略：
1. 优先请求新后端 RESTful 路由
2. 新路由不可用时回退旧路由
3. 全部失败时（非 STRICT 模式）回退内置 Mock 数据

### 基础配置

```bash
# .env / .env.production
VITE_API_URL=https://api.example.com    # 后端基址（空 = 同源）
VITE_STRICT_API=true                    # 联调模式：禁止 Mock 回退，暴露真实错误
```

---

## 一、新后端端点（FastAPI · 已对接）

### 任务 CRUD

| 方法 | 路径 | 说明 | 前端方法 | 返回类型 |
|------|------|------|---------|----------|
| GET | `/api/tasks/live-status` | 实时任务快照（旧 live_status 兼容） | `api.liveStatus()` | `LiveStatus` |
| GET | `/api/tasks` | 任务列表（支持筛选/分页） | `api.tasks(params)` | `TaskListResult` |
| GET | `/api/tasks/{task_id}` | 任务详情（UUID） | `api.taskDetail(id)` | `Task` |
| GET | `/api/tasks/by-legacy/{id}` | 旧 ID 查任务（自动回退） | `api.taskDetail(id)` | `Task` |
| GET | `/api/tasks/stats` | 按状态聚合统计 | `api.taskStats()` | `TaskStatsResult` |
| POST | `/api/tasks` | 创建任务 | `api.createTask(data)` | `ActionResult & {taskId}` |
| POST | `/api/tasks/{task_id}/transition` | 状态流转 | `api.taskTransition(id, state)` | `ActionResult & {state}` |
| POST | `/api/tasks/{task_id}/dispatch` | 手动派发至 Agent | — | `{message, agent}` |
| POST | `/api/tasks/{task_id}/progress` | 追加进展日志 | — | `{message: "ok"}` |
| PUT | `/api/tasks/{task_id}/todos` | 更新 todos | — | `{message: "ok"}` |
| PUT | `/api/tasks/{task_id}/scheduler` | 更新调度器元数据 | — | `{message: "ok"}` |

### Agent

| 方法 | 路径 | 说明 | 前端方法 | 返回类型 |
|------|------|------|---------|----------|
| GET | `/api/agents` | 9 Agent 静态目录 | `api.agents()` | `AgentCatalog` |
| GET | `/api/agents/{id}` | Agent 详情 + SOUL 预览 | `api.agentDetail(id)` | `AgentDetail` |
| GET | `/api/agents/{id}/config` | 运行时配置 | `api.agentRuntimeConfig(id)` | `{agent_id, config}` |

### 事件系统

| 方法 | 路径 | 说明 | 前端方法 | 返回类型 |
|------|------|------|---------|----------|
| GET | `/api/events` | 事件查询（trace_id/topic/producer 过滤） | `api.events(params)` | `EventListResult` |
| GET | `/api/events/topics` | 15 个事件 Topic 枚举 | `api.eventTopics()` | `EventTopicsResult` |
| GET | `/api/events/stream-info` | Redis Stream 信息 | — | `{topic, info}` |

### WebSocket

| 路径 | 说明 | 前端 Hook |
|------|------|----------|
| `/ws` | 全量事件流（Redis Pub/Sub） | `useWebSocket()` |
| `/ws/task/{task_id}` | 单任务精准订阅 | `useTaskWebSocket(taskId)` |

**WS 消息协议**：

```
Client → Server:  {"type": "ping"}                          → Server: {"type": "pong"}
Client → Server:  {"type": "subscribe", "topics": [...]}    → Server: {"type": "subscribed", ...} (⚠️ stub)
Server → Client:  {"type": "event", "topic": "...", "data": {event_id, trace_id, topic, event_type, producer, payload, meta, timestamp}}
```

### Admin / Health

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/health` | 存活探针 |
| GET | `/api` | API 清单 |
| GET | `/api/admin/health/deep` | 深度健康（DB+Redis） |
| GET | `/api/admin/pending-events` | 未 ACK 事件 |
| GET | `/api/admin/config` | 运行时配置 |

---

## 二、旧后端端点（仅 Mock 回退）

以下端点在新后端中**不存在**，前端通过 Mock 回退维持 UI 可用：

| 端点 | 方法 | 前端方法 | 新后端替代 | 迁移优先级 |
|------|------|---------|-----------|-----------|
| `/api/agent-config` | GET | `api.agentConfig()` | `/api/agents` + 扩展 | P2 |
| `/api/officials-stats` | GET | `api.officialsStats()` | 需后端新增 | P2 |
| `/api/agents-status` | GET | `api.agentsStatus()` | `/api/admin/health/deep` 近似 | P2 |
| `/api/model-change-log` | GET | `api.modelChangeLog()` | 需后端新增 | P3 |
| `/api/morning-brief` | GET | `api.morningBrief()` | 需后端新增 | P3 |
| `/api/morning-config` | GET | `api.morningConfig()` | 需后端新增 | P3 |
| `/api/task-activity/{id}` | GET | `api.taskActivity(id)` | `/api/tasks/{id}` + `/api/events?trace_id=` | P2 |
| `/api/scheduler-state/{id}` | GET | `api.schedulerState(id)` | `task.scheduler` 字段 | P2 |
| `/api/skill-content/*` | GET | `api.skillContent()` | 需后端新增 | P3 |
| `/api/set-model` | POST | `api.setModel()` | 需后端新增 | P2 |
| `/api/task-action` | POST | `api.taskAction()` | `/api/tasks/{id}/transition` | P1 |
| `/api/create-task` | POST | `api.createTask()` | `POST /api/tasks` ✅ 已适配 | ✅ 完成 |
| `/api/court-discuss/*` | POST ×5 | `api.courtDiscuss*()` | 需后端新增 | P3 |
| `/api/scheduler-*` | POST ×4 | `api.scheduler*()` | 需后端新增 | P3 |
| `/api/*-remote-skill` | ×4 | `api.*RemoteSkill()` | 需后端新增 | P3 |

---

## 三、字段归一化适配层

后端 `Task.to_dict()` 同时返回新字段和旧别名，前端 `normalizeTask()` 统一归一化：

### flow_log 字段映射

| 后端字段 | 旧命名 | 归一化后 | 说明 |
|---------|--------|---------|------|
| `at` | `ts` / `timestamp` | `at` | 时间戳 |
| `from` | `from` | `from` | 源部门 |
| `to` | `to` | `to` | 目标部门 |
| `remark` | `reason` / `message` | `remark` | 流转备注 |
| `agent` | `agent` | — | 触发 Agent（仅新后端） |

### Task 核心字段

| 新后端字段 | 旧别名（to_dict 注入） | 前端使用 |
|-----------|---------------------|---------|
| `task_id` | `id` | `id`（组件兼容） |
| `assignee_org` | `org` | `org`（组件兼容） |
| `description` | `now` | `now`（组件兼容） |
| `updated_at` | `updatedAt` | `updatedAt` |
| `created_at` | `createdAt` | `created_at` |
| — | `heartbeat` | 从 `meta.heartbeat` 归一化 |
| — | `review_round` | 从 `meta.review_round` 归一化 |
| `progress_log` | — | 归一化为 `activity` |

### 任务状态枚举（12 态）

```
Pending → Taizi → Zhongshu ⇄ Menxia → Assigned → [Next] → Doing → Review → PendingConfirm → Done
                    ↓                                                            ↓
                Blocked ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←← ↓
                                                                             Cancelled
```

终态：`Done`、`Cancelled`。前端 `PIPE_STATE_IDX` / `STATE_LABEL` 已覆盖全部 12 态。

---

## 四、Mock 数据策略

- Mock 数据与后端 `Task.to_dict()` 形状一致（含 `task_id`/`trace_id`/`assignee_org` 等新字段）
- `VITE_STRICT_API=true` 时**禁止 Mock 回退**，联调期直接抛错暴露问题
- `normalizeTask()` 在 Mock 和真实数据上统一执行，保证字段一致

---

## 五、已知后端问题（联调注意）

1. **零鉴权**：后端 CORS `*`，无 Bearer Token，`/api/admin/*` 全裸奔。生产部署前需加鉴权中间件。
2. **`GET /api/agents/{id}` 404 有 bug**：返回 `(dict, 404)` 元组，FastAPI 不认 → 实际返回 HTTP 200。
3. **WS `subscribe` 是 stub**：所有客户端收全量事件，按 topic 过滤未实现。
4. **`TaskOut` Pydantic 模型未启用**：端点返回未类型化的 `to_dict()`，实际字段是 `TaskOut` 的超集。
