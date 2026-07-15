---
file: OPENCLAW-INTEGRATION.md
description: OpenClaw API 与技能中心集成审计 · 架构模型 + 技能生命周期 + 闭环状态
author: YanYuCloudCube Team
version: v1.0.0
created: 2026-07-16
updated: 2026-07-16
status: active
tags: [openclaw],[skills],[integration],[audit]
category: technical
audience: developers
complexity: advanced
---

# OpenClaw API 与技能中心集成审计

> 基于 `/Volumes/Max/YYC3-Dynasty-Framework` 后端源码的完整审计结果。

---

## 一、OpenClaw 集成模型

### 关键发现：CLI 子进程，非 HTTP Gateway

后端 `config.py` 定义了 `openclaw_gateway_url = "http://localhost:18789"`，但**该字段是死代码——全代码库零引用**。后端实际通过 **CLI 子进程**调用 OpenClaw：

```
DispatchWorker._call_openclaw()
  → subprocess.run(['openclaw', 'agent', '--agent', agentId, '-m', message])
  → 超时 300s，工作目录 = openclaw_project_dir
  → 注入环境变量：EDICT_TASK_ID / EDICT_TRACE_ID / EDICT_API_URL / EDICT_CONTEXT_FILE
  → 上下文通过临时 JSON 文件传递（避免命令行长度限制）
```

唯一的 Gateway 交互是 `scripts/apply_model_changes.py` 的 `openclaw gateway restart` 命令。

### 前端影响

前端无需直接调用 OpenClaw Gateway。所有 Agent 交互通过后端 API 间接完成：
- 创建任务 → 后端 orchestrator → dispatch_worker → openclaw CLI → Agent 执行
- 实时进展 → WebSocket 事件流 → 前端看板

---

## 二、技能中心架构

### 两层技能系统（互不冲突）

| 层级 | 路径 | 加载方 | 状态 |
|------|------|--------|------|
| **OpenClaw 原生层** | `~/.openclaw/workspace-{agent}/skills/*/SKILL.md` | OpenClaw 运行时（Agent 会话启动时自动加载） | ✅ 活跃 |
| **Edict 注入层** | `agents/{agent}/skills/manifest.json` | DispatchWorker（按 task tags/org 匹配后注入提示词） | ⚠️ 未启用（无 manifest 文件） |

### 技能文件结构

```
~/.openclaw/
├── workspace-bingbu/
│   └── skills/
│       └── code_review/
│           ├── SKILL.md          # 技能内容（Markdown）
│           └── .source.json      # 远程技能元数据（仅远程技能）
```

### .source.json Schema

```json
{
  "skillName": "code_review",
  "sourceUrl": "https://raw.githubusercontent.com/...",
  "description": "代码审查技能",
  "addedAt": "2026-03-01T14:30:00Z",
  "lastUpdated": "2026-03-01T14:30:00Z",
  "checksum": "sha256hash16chars",
  "status": "valid"
}
```

---

## 三、技能生命周期（完整闭环）

### 添加（远程）

```
前端 api.addRemoteSkill(agentId, skillName, sourceUrl)
  → POST /api/add-remote-skill (dashboard/server.py port 7891)
  → skill_manager.py add_remote()
    → _download_file(sourceUrl)  # 下载 SKILL.md（重试 3 次，指数退避 3s/6s）
    → _compute_checksum(content) # SHA256 前 16 字符
    → 写入 ~/.openclaw/workspace-{agent}/skills/{name}/SKILL.md
    → 写入 ~/.openclaw/workspace-{agent}/skills/{name}/.source.json
  → sync_agent_config.py 发现新技能 → data/agent_config.json → 前端展示
```

### 加载（执行时）

```
DispatchWorker._dispatch()
  → _load_agent_skills(agent, payload)
    → 读取 agents/{agent}/skills/manifest.json（⚠️ 当前无文件 = no-op）
    → task.tags ∩ skill.match_tags 或 task.org ∈ skill.match_orgs → 匹配
    → 匹配的 SKILL.md 内容注入到 Agent 消息末尾
```

同时，OpenClaw 运行时**独立**加载 `~/.openclaw/workspace-{agent}/skills/*/SKILL.md`，不受 DispatchWorker 控制。

### 更新

```
前端 api.updateRemoteSkill(agentId, skillName)
  → POST /api/update-remote-skill
  → skill_manager.py update_remote()
    → 读取 .source.json → 用 sourceUrl 重新下载 → 覆盖 SKILL.md → 更新 checksum + lastUpdated
```

### 移除

```
前端 api.removeRemoteSkill(agentId, skillName)
  → POST /api/remove-remote-skill
  → skill_manager.py remove_remote()
    → shutil.rmtree(workspace-{agent}/skills/{name})
```

### 内容查看

```
前端 api.skillContent(agentId, skillName)
  → GET /api/skill-content/{agentId}/{skillName}
  → 读取 ~/.openclaw/workspace-{agent}/skills/{name}/SKILL.md 文件内容
```

---

## 四、官方 Skills Hub

### Hub 地址

```
主：  https://raw.githubusercontent.com/openclaw-ai/skills-hub/main
备1： https://ghproxy.com/https://raw.githubusercontent.com/openclaw-ai/skills-hub/main
备2： https://raw.gitmirror.com/openclaw-ai/skills-hub/main
```

URL 构造：`{base}/{skillName}/SKILL.md`

### 官方技能→Agent 映射

| 技能 | 推荐分配 |
|------|---------|
| `code_review` | bingbu, xingbu, menxia |
| `api_design` | bingbu, gongbu, menxia |
| `security_audit` | xingbu, menxia |
| `data_analysis` | hubu, menxia |
| `doc_generation` | libu, menxia |
| `test_framework` | gongbu, xingbu, menxia |

### 社区技能源（前端已集成）

| 源 | Star | 技能数 | 特色 |
|----|------|--------|------|
| obra/superpowers | 66.9k | 10 | 完整开发工作流（TDD/调试/计划/审查） |
| anthropics/skills | 官方 | 10 | 文档处理/MCP/UI 设计 |
| ComposioHQ/awesome-claude-skills | 39.2k | 3 | GitHub 集成/数据分析/代码审查 |

---

## 五、API 端点状态

### 技能 API（由缺失的 dashboard/server.py 提供）

| 端点 | 方法 | 前端方法 | 后端状态 |
|------|------|---------|---------|
| `/api/skill-content/{agentId}/{skillName}` | GET | `api.skillContent()` | ⚠️ dashboard/server.py 缺失 |
| `/api/add-skill` | POST | `api.addSkill()` | ⚠️ dashboard/server.py 缺失 |
| `/api/add-remote-skill` | POST | `api.addRemoteSkill()` | ⚠️ dashboard/server.py 缺失 |
| `/api/remote-skills-list` | GET | `api.remoteSkillsList()` | ⚠️ dashboard/server.py 缺失 |
| `/api/update-remote-skill` | POST | `api.updateRemoteSkill()` | ⚠️ dashboard/server.py 缺失 |
| `/api/remove-remote-skill` | POST | `api.removeRemoteSkill()` | ⚠️ dashboard/server.py 缺失 |

### 新后端（Edict FastAPI）状态

Edict 后端**无任何技能端点**。已注册路由器：tasks / agents / events / admin / websocket / legacy。

---

## 六、前端闭环集成清单

| 集成项 | 状态 | 实现位置 |
|--------|------|---------|
| 技能 API 调用层 | ✅ 已有 | `src/app/api.ts`（6 个技能方法 + Mock 回退） |
| 技能类型定义 | ✅ 已有 | `src/app/api.ts`（SkillInfo / RemoteSkillItem / SkillContentResult） |
| 技能 Hub 目录 | ✅ **本次新增** | `src/app/domain/skills.ts`（COMMUNITY_SOURCES） |
| 技能→Agent 映射 | ✅ **本次新增** | `src/app/domain/skills.ts`（SKILL_AGENT_MAPPING + suggestAgentForSkill） |
| 官方 Hub URL 构造 | ✅ **本次新增** | `src/app/domain/skills.ts`（getHubSkillUrl + FALLBACK_HUB_BASES） |
| OpenClaw 集成常量 | ✅ **本次新增** | `src/app/domain/skills.ts`（OPENCLAW_CONFIG + SKILL_ARCHITECTURE） |
| 技能配置 UI | ✅ 已有 | `src/app/components/SkillsConfig.tsx`（本地/远程双 Tab） |
| 社区源导入 UI | ✅ 已有 → **重构** | SkillsConfig.tsx → 从 domain 导入（去除内联） |
| 领域测试 | ✅ **本次新增** | `src/app/domain/skills.test.ts`（40+ 用例） |
