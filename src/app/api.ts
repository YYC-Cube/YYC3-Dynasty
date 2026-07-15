/**
 * file: api.ts
 * description: API 服务层 · 对接 OpenClaw FastAPI 后端 (RESTful) + 旧端点兼容适配
 * author: YanYuCloudCube Team
 * version: v2.0.0
 * created: 2026-03-21
 * updated: 2026-07-16
 * status: active
 * tags: [api],[service],[data],[adapter]
 *
 * brief: 封装所有后端 HTTP API 调用，含双路由适配、字段归一化与 Mock 回退机制
 *
 * details:
 * - 优先请求新 FastAPI 后端 RESTful 路由 (/api/tasks/*)，失败时回退旧路由
 * - normalizeTask() 归一化新旧字段差异 (task_id↔id / ts↔at / reason↔remark)
 * - VITE_STRICT_API=true 时禁止 Mock 回退，联调期暴露真实错误
 * - 新后端未实现的端点 (court-discuss/morning-brief 等) 保留 Mock 回退
 * - 完整的 TypeScript 类型定义，兼容新旧字段
 *
 * dependencies: fetch (原生)
 * exports: api, normalizeTask, 所有 TypeScript 类型接口
 */

const API_BASE = import.meta.env.VITE_API_URL || '';

// VITE_STRICT_API=true → 联调模式：后端不可达时直接抛错，不回退 Mock
const STRICT_API = import.meta.env.VITE_STRICT_API === 'true';

// ── Mock Data Fallbacks (aligned with backend Task.to_dict() shape) ──

const now = () => new Date().toISOString();
const HOUR = 3600000;

const mockData: Record<string, unknown> = {
  // ── live-status: 新旧双路由共用同一 mock ──
  '/api/tasks/live-status': {
    tasks: [
      {
        task_id: 'edict-042',
        trace_id: 'tr-042',
        title:
          '修缮云枢殿防火墙\n\n兹令兵部、工部协力修缮云枢殿防火墙之薄弱处，限三日内完成，不得有误。',
        description: '修缮云枢殿防火墙',
        priority: '高',
        state: 'Doing',
        assignee_org: '兵部',
        creator: 'emperor',
        tags: [],
        meta: { review_round: 0 },
        flow_log: [
          { at: now(), from: '尚书省', to: '兵部', remark: '派发至兵部/工部' },
          {
            at: new Date(Date.now() - HOUR).toISOString(),
            from: '天子',
            to: '太子',
            remark: '颁旨 (敕书·火急)',
          },
          {
            at: new Date(Date.now() - 2 * HOUR).toISOString(),
            from: '兵部',
            to: '兵部',
            remark: '开始执行 edict-042',
          },
        ],
        progress_log: [],
        todos: [],
        scheduler: {},
        created_at: new Date(Date.now() - 2 * HOUR).toISOString(),
        updated_at: now(),
        id: 'edict-042',
        org: '兵部',
        official: 'emperor',
        now: '正在执行',
        eta: now(),
        block: '',
        output: '',
        archived: false,
        templateId: '',
        templateParams: {},
        ac: '',
        targetDept: '兵部',
        _scheduler: {},
        createdAt: new Date(Date.now() - 2 * HOUR).toISOString(),
        updatedAt: now(),
      },
      {
        task_id: 'edict-043',
        trace_id: 'tr-043',
        title: '更新工部营造规范指南',
        description: '更新工部营造规范指南',
        priority: '中',
        state: 'Done',
        assignee_org: '工部',
        creator: 'emperor',
        tags: [],
        meta: {},
        flow_log: [{ at: now(), from: '工部', to: '尚书省', remark: '执行完成，申请归档' }],
        progress_log: [],
        todos: [],
        scheduler: {},
        created_at: new Date(Date.now() - 3 * HOUR).toISOString(),
        updated_at: now(),
        id: 'edict-043',
        org: '工部',
        official: 'emperor',
        now: '已完成',
        eta: now(),
        block: '',
        output: '规范指南 v2.0',
        archived: false,
        templateId: '',
        templateParams: {},
        ac: '',
        targetDept: '工部',
        _scheduler: {},
        createdAt: new Date(Date.now() - 3 * HOUR).toISOString(),
        updatedAt: now(),
      },
    ],
    syncStatus: { ok: true, message: 'Mock Sync OK' },
    last_updated: now(),
  },

  '/api/tasks/stats': {
    total: 2,
    by_state: { Doing: 1, Done: 1 },
  },

  '/api/events': {
    events: [],
    count: 0,
  },
  '/api/events/topics': {
    topics: [
      { name: 'task.created', description: '任务创建' },
      { name: 'task.dispatch', description: '任务派发' },
      { name: 'task.status', description: '状态变更' },
      { name: 'task.completed', description: '任务完成' },
      { name: 'agent.heartbeat', description: 'Agent 心跳' },
    ],
  },

  '/api/agents': {
    agents: [
      { id: 'taizi', name: '太子', role: '消息分拣', icon: '🎎' },
      { id: 'zhongshu', name: '中书省', role: '决策草拟', icon: '📜' },
      { id: 'menxia', name: '门下省', role: '审议封驳', icon: '🔍' },
      { id: 'shangshu', name: '尚书省', role: '执行派发', icon: '📮' },
      { id: 'bingbu', name: '兵部', role: '军政国防', icon: '⚔️' },
      { id: 'gongbu', name: '工部', role: '工程建造', icon: '🔧' },
      { id: 'xingbu', name: '刑部', role: '司法刑狱', icon: '⚖️' },
      { id: 'hubu', name: '户部', role: '财政经济', icon: '💰' },
      { id: 'libu', name: '礼部', role: '礼仪外交', icon: '📝' },
    ],
  },

  // ── 旧后端专用端点（新后端未实现，仅 Mock 回退）──
  '/api/agent-config': {
    agents: [
      { id: 'taizi', label: '太子', emoji: '🎎', role: '消息分拣' },
      { id: 'zhongshu', label: '中书省', emoji: '📜', role: '决策草拟' },
      { id: 'menxia', label: '门下省', emoji: '🔍', role: '审议封驳' },
      { id: 'shangshu', label: '尚书省', emoji: '📮', role: '执行派发' },
      { id: 'bingbu', label: '兵部', emoji: '⚔️', role: '军政国防' },
      { id: 'gongbu', label: '工部', emoji: '🔧', role: '工程建造' },
      { id: 'xingbu', label: '刑部', emoji: '⚖️', role: '司法刑狱' },
      { id: 'hubu', label: '户部', emoji: '💰', role: '财政经济' },
      { id: 'libu', label: '礼部', emoji: '📝', role: '礼仪外交' },
      { id: 'libu_hr', label: '吏部', emoji: '📋', role: '考核任免' },
    ],
    knownModels: [{ id: 'gemini-3.1-pro', name: 'Gemini 3.1 Pro' }],
  },
  '/api/officials-stats': {
    officials: [
      {
        id: 'bingbu',
        label: '兵部',
        emoji: '⚔️',
        role: '武备',
        rank: '尚书',
        model: 'gemini-3.1-pro',
        model_short: 'Gemini',
        tokens_in: 120000,
        tokens_out: 45000,
        cache_read: 80000,
        cache_write: 30000,
        cost_cny: 12.5,
        cost_usd: 1.8,
        sessions: 28,
        messages: 156,
        tasks_done: 12,
        tasks_active: 2,
        flow_participations: 45,
        merit_score: 87,
        merit_rank: 3,
        last_active: now(),
        heartbeat: { status: 'idle', label: '⚪ 待命' },
        participated_edicts: [],
      },
      {
        id: 'gongbu',
        label: '工部',
        emoji: '🔧',
        role: '营造',
        rank: '尚书',
        model: 'gemini-3.1-pro',
        model_short: 'Gemini',
        tokens_in: 200000,
        tokens_out: 80000,
        cache_read: 150000,
        cache_write: 50000,
        cost_cny: 22.3,
        cost_usd: 3.2,
        sessions: 45,
        messages: 230,
        tasks_done: 23,
        tasks_active: 1,
        flow_participations: 67,
        merit_score: 92,
        merit_rank: 1,
        last_active: now(),
        heartbeat: { status: 'running', label: '🟢 运行中' },
        participated_edicts: [],
      },
      {
        id: 'xingbu',
        label: '刑部',
        emoji: '⚖️',
        role: '律令',
        rank: '尚书',
        model: 'claude-sonnet',
        model_short: 'Sonnet',
        tokens_in: 50000,
        tokens_out: 20000,
        cache_read: 30000,
        cache_write: 10000,
        cost_cny: 5.8,
        cost_usd: 0.8,
        sessions: 12,
        messages: 67,
        tasks_done: 5,
        tasks_active: 0,
        flow_participations: 18,
        merit_score: 75,
        merit_rank: 5,
        last_active: now(),
        heartbeat: { status: 'idle', label: '⚪ 待命' },
        participated_edicts: [],
      },
      {
        id: 'hubu',
        label: '户部',
        emoji: '💰',
        role: '度支',
        rank: '尚书',
        model: 'gemini-3.1-pro',
        model_short: 'Gemini',
        tokens_in: 350000,
        tokens_out: 120000,
        cache_read: 280000,
        cache_write: 90000,
        cost_cny: 38.9,
        cost_usd: 5.6,
        sessions: 89,
        messages: 412,
        tasks_done: 42,
        tasks_active: 3,
        flow_participations: 134,
        merit_score: 95,
        merit_rank: 2,
        last_active: now(),
        heartbeat: { status: 'active', label: '🟢 活跃' },
        participated_edicts: [],
      },
      {
        id: 'libu',
        label: '礼部',
        emoji: '📝',
        role: '仪制',
        rank: '尚书',
        model: 'claude-sonnet',
        model_short: 'Sonnet',
        tokens_in: 80000,
        tokens_out: 30000,
        cache_read: 50000,
        cache_write: 15000,
        cost_cny: 8.2,
        cost_usd: 1.2,
        sessions: 19,
        messages: 89,
        tasks_done: 8,
        tasks_active: 1,
        flow_participations: 25,
        merit_score: 80,
        merit_rank: 4,
        last_active: now(),
        heartbeat: { status: 'idle', label: '⚪ 待命' },
        participated_edicts: [],
      },
      {
        id: 'libu_hr',
        label: '吏部',
        emoji: '📋',
        role: '铨选',
        rank: '尚书',
        model: 'gemini-3.1-pro',
        model_short: 'Gemini',
        tokens_in: 60000,
        tokens_out: 25000,
        cache_read: 40000,
        cache_write: 12000,
        cost_cny: 6.5,
        cost_usd: 0.9,
        sessions: 15,
        messages: 73,
        tasks_done: 11,
        tasks_active: 0,
        flow_participations: 22,
        merit_score: 78,
        merit_rank: 6,
        last_active: now(),
        heartbeat: { status: 'idle', label: '⚪ 待命' },
        participated_edicts: [],
      },
    ],
    totals: { tasks_done: 101, cost_cny: 0 },
    top_official: 'hubu',
  },
  '/api/agents-status': {
    ok: true,
    gateway: { status: 'online', uptime: '127d 14h 32m', alive: true },
    agents: [
      {
        id: 'bingbu',
        label: '兵部',
        emoji: '⚔️',
        role: '武备',
        status: 'idle',
        statusLabel: 'Online',
      },
      {
        id: 'gongbu',
        label: '工部',
        emoji: '🔧',
        role: '营造',
        status: 'running',
        statusLabel: 'Online',
      },
      {
        id: 'xingbu',
        label: '刑部',
        emoji: '⚖️',
        role: '律令',
        status: 'idle',
        statusLabel: 'Online',
      },
      {
        id: 'hubu',
        label: '户部',
        emoji: '💰',
        role: '度支',
        status: 'idle',
        statusLabel: 'Online',
      },
      {
        id: 'libu',
        label: '礼部',
        emoji: '📝',
        role: '仪制',
        status: 'idle',
        statusLabel: 'Online',
      },
      {
        id: 'libu_hr',
        label: '吏部',
        emoji: '📋',
        role: '铨选',
        status: 'idle',
        statusLabel: 'Online',
      },
    ],
    checkedAt: now(),
  },
  '/api/morning-brief': {
    news: [],
    date: now(),
  },
  '/api/morning-config': {
    categories: [],
  },
  '/api/remote-skills-list': {
    ok: true,
    remoteSkills: [],
  },
};

// ── 通用请求 ──

/** 查找 URL 对应的 Mock 数据 — 按 key 长度降序匹配，避免短 key 误匹配 */
function findMock<T>(url: string): T | undefined {
  // live-status 新旧路由共用 mock
  if (url.includes('live-status')) return mockData['/api/tasks/live-status'] as T | undefined;
  // 按长度降序：长的 key 先匹配（/api/agents-status 优先于 /api/agents）
  const keys = Object.keys(mockData)
    .filter((k) => mockData[k] !== undefined)
    .sort((a, b) => b.length - a.length);
  const match = keys.find((k) => url.includes(k));
  return match ? (mockData[match] as T) : undefined;
}

/** 逐个尝试多个 URL，首个成功即返回；全部失败后回退 Mock 或抛错（STRICT 模式） */
async function fetchJWithFallback<T>(...urls: string[]): Promise<T> {
  for (const url of urls) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      const contentType = res.headers.get('content-type');
      if (res.ok && contentType && contentType.includes('application/json')) {
        return await res.json();
      }
    } catch {
      // 尝试下一个 URL
    }
  }
  // 所有 URL 均不可用
  if (STRICT_API) {
    throw new Error(`[STRICT_API] 全部端点不可达: ${urls.join(' → ')}`);
  }
  // Mock 回退
  for (const url of urls) {
    const mock = findMock<T>(url);
    if (mock !== undefined) return mock;
  }
  throw new Error(`No mock available for: ${urls.join(', ')}`);
}

async function fetchJ<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    const contentType = res.headers.get('content-type');
    if (!res.ok || (contentType && contentType.includes('text/html'))) {
      throw new Error(`Invalid response for ${url}`);
    }
    return await res.json();
  } catch (err) {
    if (STRICT_API) throw err;
    const mock = findMock<T>(url);
    if (mock !== undefined) return mock;
    throw err;
  }
}

async function postJ<T>(url: string, data: unknown): Promise<T> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const contentType = res.headers.get('content-type');
    if (!res.ok || (contentType && contentType.includes('text/html'))) {
      throw new Error(`Invalid response for ${url}`);
    }
    return await res.json();
  } catch (err) {
    if (STRICT_API) throw err;
    return { ok: true, message: 'Mock successful' } as T;
  }
}

// ── 字段归一化适配层 ──
// 后端 Task.to_dict() 同时提供新字段(task_id/assignee_org)和旧别名(id/org)。
// flow_log 后端 schema 注释为 {at, from, to, remark}，但 transition 代码可能产出 {ts, reason, agent}。
// 此层确保前端组件统一消费一致的字段结构。

/** 归一化单条 flow_log 条目：兼容 at/ts、remark/reason 两种命名 */
export function normalizeFlowEntry(raw: Record<string, unknown>): FlowEntry {
  return {
    at: String(raw.at ?? raw.ts ?? raw.timestamp ?? now()),
    from: String(raw.from ?? ''),
    to: String(raw.to ?? ''),
    remark: String(raw.remark ?? raw.reason ?? raw.message ?? ''),
  };
}

/** 归一化 progress_log / activity 条目 */
function normalizeActivityEntry(raw: Record<string, unknown>): ActivityEntry {
  const atVal = raw.at ?? raw.ts ?? raw.timestamp;
  return {
    kind: String(raw.kind ?? raw.type ?? 'progress'),
    at: typeof atVal === 'number' || typeof atVal === 'string' ? atVal : undefined,
    text: String(raw.text ?? raw.content ?? raw.message ?? ''),
    agent: raw.agent ? String(raw.agent) : undefined,
  };
}

/** 归一化单个 Task：确保所有前端组件依赖的字段存在且类型正确 */
export function normalizeTask(raw: Record<string, unknown>): Task {
  const flowLog = Array.isArray(raw.flow_log)
    ? (raw.flow_log as Record<string, unknown>[]).map(normalizeFlowEntry)
    : [];
  const progressLog = Array.isArray(raw.progress_log)
    ? (raw.progress_log as Record<string, unknown>[]).map(normalizeActivityEntry)
    : [];
  const activity = Array.isArray(raw.activity)
    ? (raw.activity as Record<string, unknown>[]).map(normalizeActivityEntry)
    : progressLog;
  const meta = (raw.meta as Record<string, unknown>) || {};
  const heartbeat = (raw.heartbeat as Heartbeat) ||
    meta.heartbeat || { status: 'unknown', label: '' };

  return {
    id: String(raw.id ?? raw.task_id ?? ''),
    title: String(raw.title ?? ''),
    state: String(raw.state ?? ''),
    org: String(raw.org ?? raw.assignee_org ?? ''),
    now: String(raw.now ?? raw.description ?? ''),
    eta: String(raw.eta ?? ''),
    block: String(raw.block ?? ''),
    ac: String(raw.ac ?? ''),
    output: String(raw.output ?? ''),
    heartbeat,
    flow_log: flowLog,
    todos: Array.isArray(raw.todos) ? (raw.todos as TodoItem[]) : [],
    review_round: Number(raw.review_round ?? meta.review_round ?? 0),
    archived: Boolean(raw.archived ?? false),
    archivedAt: raw.archivedAt as string | undefined,
    updatedAt: (raw.updatedAt ?? raw.updated_at) as string | undefined,
    sourceMeta: raw.sourceMeta as Record<string, unknown> | undefined,
    activity,
    _prev_state: raw._prev_state as string | undefined,
    // 新后端额外字段透传
    task_id: raw.task_id ? String(raw.task_id) : undefined,
    trace_id: raw.trace_id ? String(raw.trace_id) : undefined,
    assignee_org: raw.assignee_org ? String(raw.assignee_org) : undefined,
    created_at: (raw.created_at ?? raw.createdAt) as string | undefined,
  };
}

/** 批量归一化 LiveStatus 响应 */
function normalizeLiveStatus(data: LiveStatus): LiveStatus {
  if (!data?.tasks) return data;
  return {
    ...data,
    tasks: data.tasks.map((t) => normalizeTask(t as unknown as Record<string, unknown>)),
  };
}

// ── API 接口 ──

export const api = {
  // ══ 核心数据（新后端 RESTful 优先，旧路由回退）══

  /** 实时任务快照 — 新路由 /api/tasks/live-status 优先，旧 /api/live-status 回退 */
  liveStatus: async (): Promise<LiveStatus> => {
    const data = await fetchJWithFallback<LiveStatus>(
      `${API_BASE}/api/tasks/live-status`,
      `${API_BASE}/api/live-status`,
    );
    return normalizeLiveStatus(data);
  },

  /** 任务列表（新后端 RESTful — 支持筛选/分页）*/
  tasks: (params?: {
    state?: string;
    assignee_org?: string;
    priority?: string;
    limit?: number;
    offset?: number;
  }): Promise<TaskListResult> => {
    const qs = new URLSearchParams();
    if (params?.state) qs.set('state', params.state);
    if (params?.assignee_org) qs.set('assignee_org', params.assignee_org);
    if (params?.priority) qs.set('priority', params.priority);
    if (params?.limit != null) qs.set('limit', String(params.limit));
    if (params?.offset != null) qs.set('offset', String(params.offset));
    const query = qs.toString();
    const url = `${API_BASE}/api/tasks${query ? `?${query}` : ''}`;
    return fetchJWithFallback<TaskListResult>(url).then((r) => ({
      ...r,
      tasks: r.tasks.map((t) => normalizeTask(t as unknown as Record<string, unknown>)),
    }));
  },

  /** 任务详情（新后端 RESTful — UUID 或 legacy ID）*/
  taskDetail: (taskId: string): Promise<Task> =>
    fetchJWithFallback<Task>(
      `${API_BASE}/api/tasks/${encodeURIComponent(taskId)}`,
      `${API_BASE}/api/tasks/by-legacy/${encodeURIComponent(taskId)}`,
    ).then((t) => normalizeTask(t as unknown as Record<string, unknown>)),

  /** 任务统计（按状态聚合）*/
  taskStats: () => fetchJWithFallback<TaskStatsResult>(`${API_BASE}/api/tasks/stats`),

  /** 任务状态流转（新后端 RESTful）*/
  taskTransition: (taskId: string, newState: string, agent = 'system', reason = '') =>
    postJ<ActionResult & { state?: string }>(
      `${API_BASE}/api/tasks/${encodeURIComponent(taskId)}/transition`,
      { new_state: newState, agent, reason },
    ),

  /** 创建任务 — 新 RESTful 路由优先，旧 /api/create-task 回退 */
  createTask: (data: CreateTaskPayload) => {
    // 适配新后端 TaskCreate body（assignee_org ← org）
    const newBody: Record<string, unknown> = {
      title: data.title,
      description: data.title,
      priority: data.priority ?? '中',
      assignee_org: data.org || data.targetDept || null,
      creator: 'emperor',
      tags: [],
      meta: data.templateId ? { templateId: data.templateId, params: data.params } : {},
    };
    // 先试新路由，失败回退旧路由 + 旧 body
    return postJWithFallback<ActionResult & { taskId?: string; task_id?: string }>(
      { url: `${API_BASE}/api/tasks`, body: newBody },
      { url: `${API_BASE}/api/create-task`, body: data },
    ).then((r) => ({
      ...r,
      taskId: r.taskId ?? r.task_id,
    }));
  },

  // ══ 事件系统（新后端）══

  /** 事件查询（支持 trace_id/topic/producer 过滤）*/
  events: (params?: {
    trace_id?: string;
    topic?: string;
    producer?: string;
    limit?: number;
  }): Promise<EventListResult> => {
    const qs = new URLSearchParams();
    if (params?.trace_id) qs.set('trace_id', params.trace_id);
    if (params?.topic) qs.set('topic', params.topic);
    if (params?.producer) qs.set('producer', params.producer);
    if (params?.limit != null) qs.set('limit', String(params.limit));
    const query = qs.toString();
    return fetchJWithFallback<EventListResult>(`${API_BASE}/api/events${query ? `?${query}` : ''}`);
  },

  /** 事件 Topic 枚举 */
  eventTopics: () => fetchJWithFallback<EventTopicsResult>(`${API_BASE}/api/events/topics`),

  /** Agent 目录（新后端静态 9 Agent）*/
  agents: () => fetchJWithFallback<AgentCatalog>(`${API_BASE}/api/agents`),
  agentDetail: (agentId: string) =>
    fetchJWithFallback<AgentDetail>(`${API_BASE}/api/agents/${encodeURIComponent(agentId)}`),
  /** 单个 Agent 运行时配置（新后端）*/
  agentRuntimeConfig: (agentId: string) =>
    fetchJWithFallback<{ agent_id: string; config: Record<string, unknown> }>(
      `${API_BASE}/api/agents/${encodeURIComponent(agentId)}/config`,
    ),

  // ══ 旧后端专用端点（新后端未实现，Mock 回退）══

  agentConfig: () => fetchJ<AgentConfig>(`${API_BASE}/api/agent-config`),
  modelChangeLog: () =>
    fetchJ<ChangeLogEntry[]>(`${API_BASE}/api/model-change-log`).catch(() => []),
  officialsStats: () => fetchJ<OfficialsData>(`${API_BASE}/api/officials-stats`),
  morningBrief: () => fetchJ<MorningBrief>(`${API_BASE}/api/morning-brief`),
  morningConfig: () => fetchJ<SubConfig>(`${API_BASE}/api/morning-config`),
  agentsStatus: () => fetchJ<AgentsStatusData>(`${API_BASE}/api/agents-status`),

  // 任务实时动态（旧端点）
  taskActivity: (id: string) =>
    fetchJ<TaskActivityData>(`${API_BASE}/api/task-activity/${encodeURIComponent(id)}`),
  schedulerState: (id: string) =>
    fetchJ<SchedulerStateData>(`${API_BASE}/api/scheduler-state/${encodeURIComponent(id)}`),

  // 技能内容
  skillContent: (agentId: string, skillName: string) =>
    fetchJ<SkillContentResult>(
      `${API_BASE}/api/skill-content/${encodeURIComponent(agentId)}/${encodeURIComponent(skillName)}`,
    ),

  // 操作类（旧端点，Mock 回退）
  setModel: (agentId: string, model: string) =>
    postJ<ActionResult>(`${API_BASE}/api/set-model`, { agentId, model }),
  setDispatchChannel: (channel: string) =>
    postJ<ActionResult>(`${API_BASE}/api/set-dispatch-channel`, { channel }),
  agentWake: (agentId: string) => postJ<ActionResult>(`${API_BASE}/api/agent-wake`, { agentId }),
  taskAction: (taskId: string, action: string, reason: string) =>
    postJ<ActionResult>(`${API_BASE}/api/task-action`, { taskId, action, reason }),
  reviewAction: (taskId: string, action: string, comment: string) =>
    postJ<ActionResult>(`${API_BASE}/api/review-action`, { taskId, action, comment }),
  advanceState: (taskId: string, comment: string) =>
    postJ<ActionResult>(`${API_BASE}/api/advance-state`, { taskId, comment }),
  archiveTask: (taskId: string, archived: boolean) =>
    postJ<ActionResult>(`${API_BASE}/api/archive-task`, { taskId, archived }),
  archiveAllDone: () =>
    postJ<ActionResult & { count?: number }>(`${API_BASE}/api/archive-task`, {
      archiveAllDone: true,
    }),
  schedulerScan: (thresholdSec = 180) =>
    postJ<ActionResult & { count?: number; actions?: ScanAction[]; checkedAt?: string }>(
      `${API_BASE}/api/scheduler-scan`,
      { thresholdSec },
    ),
  schedulerRetry: (taskId: string, reason: string) =>
    postJ<ActionResult>(`${API_BASE}/api/scheduler-retry`, { taskId, reason }),
  schedulerEscalate: (taskId: string, reason: string) =>
    postJ<ActionResult>(`${API_BASE}/api/scheduler-escalate`, { taskId, reason }),
  schedulerRollback: (taskId: string, reason: string) =>
    postJ<ActionResult>(`${API_BASE}/api/scheduler-rollback`, { taskId, reason }),
  refreshMorning: () => postJ<ActionResult>(`${API_BASE}/api/morning-brief/refresh`, {}),
  saveMorningConfig: (config: SubConfig) =>
    postJ<ActionResult>(`${API_BASE}/api/morning-config`, config),
  addSkill: (agentId: string, skillName: string, description: string, trigger: string) =>
    postJ<ActionResult>(`${API_BASE}/api/add-skill`, { agentId, skillName, description, trigger }),

  // 远程 Skills 管理
  addRemoteSkill: (agentId: string, skillName: string, sourceUrl: string, description?: string) =>
    postJ<
      ActionResult & {
        skillName?: string;
        agentId?: string;
        source?: string;
        localPath?: string;
        size?: number;
        addedAt?: string;
      }
    >(`${API_BASE}/api/add-remote-skill`, {
      agentId,
      skillName,
      sourceUrl,
      description: description || '',
    }),
  remoteSkillsList: () => fetchJ<RemoteSkillsListResult>(`${API_BASE}/api/remote-skills-list`),
  updateRemoteSkill: (agentId: string, skillName: string) =>
    postJ<ActionResult>(`${API_BASE}/api/update-remote-skill`, { agentId, skillName }),
  removeRemoteSkill: (agentId: string, skillName: string) =>
    postJ<ActionResult>(`${API_BASE}/api/remove-remote-skill`, { agentId, skillName }),

  // ── 朝堂议政（旧端点，Mock 回退）──
  courtDiscussStart: (topic: string, officials: string[], taskId?: string) =>
    postJ<CourtDiscussResult>(`${API_BASE}/api/court-discuss/start`, { topic, officials, taskId }),
  courtDiscussAdvance: (sessionId: string, userMessage?: string, decree?: string) =>
    postJ<CourtDiscussResult>(`${API_BASE}/api/court-discuss/advance`, {
      sessionId,
      userMessage,
      decree,
    }),
  courtDiscussConclude: (sessionId: string) =>
    postJ<ActionResult & { summary?: string }>(`${API_BASE}/api/court-discuss/conclude`, {
      sessionId,
    }),
  courtDiscussDestroy: (sessionId: string) =>
    postJ<ActionResult>(`${API_BASE}/api/court-discuss/destroy`, { sessionId }),
  courtDiscussFate: () =>
    fetchJ<{ ok: boolean; event: string }>(`${API_BASE}/api/court-discuss/fate`),
};

// ── postJ 多路由回退 ──

async function postJWithFallback<T>(...routes: { url: string; body: unknown }[]): Promise<T> {
  for (const { url, body } of routes) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const contentType = res.headers.get('content-type');
      if (res.ok && contentType && contentType.includes('application/json')) {
        return await res.json();
      }
    } catch {
      // 尝试下一个
    }
  }
  if (STRICT_API) {
    throw new Error(`[STRICT_API] 全部 POST 端点不可达: ${routes.map((r) => r.url).join(' → ')}`);
  }
  return { ok: true, message: 'Mock successful' } as T;
}

// ══ Types ══

export interface ActionResult {
  ok: boolean;
  message?: string;
  error?: string;
}

export interface FlowEntry {
  at: string;
  from: string;
  to: string;
  remark: string;
}

export interface TodoItem {
  id: string | number;
  title: string;
  status: 'not-started' | 'in-progress' | 'completed';
  detail?: string;
}

export interface Heartbeat {
  status: 'active' | 'warn' | 'stalled' | 'unknown' | 'idle';
  label: string;
}

export interface Task {
  // 旧前端兼容字段（后端 to_dict() 提供）
  id: string;
  title: string;
  state: string;
  org: string;
  now: string;
  eta: string;
  block: string;
  ac: string;
  output: string;
  heartbeat: Heartbeat;
  flow_log: FlowEntry[];
  todos: TodoItem[];
  review_round: number;
  archived: boolean;
  archivedAt?: string;
  updatedAt?: string;
  sourceMeta?: Record<string, unknown>;
  activity?: ActivityEntry[];
  _prev_state?: string;
  // 新后端字段（归一化后透传）
  task_id?: string;
  trace_id?: string;
  assignee_org?: string;
  created_at?: string;
}

export interface SyncStatus {
  ok: boolean;
  [key: string]: unknown;
}

export interface LiveStatus {
  tasks: Task[];
  syncStatus?: SyncStatus;
  last_updated?: string;
}

/** 新后端 /api/tasks 响应 */
export interface TaskListResult {
  tasks: Task[];
  count: number;
}

/** 新后端 /api/tasks/stats 响应 */
export interface TaskStatsResult {
  total: number;
  by_state: Record<string, number>;
}

/** 新后端 /api/events 响应 */
export interface EventListResult {
  events: EventEntry[];
  count: number;
}

export interface EventEntry {
  event_id: string;
  trace_id: string;
  timestamp: string;
  topic: string;
  event_type: string;
  producer: string;
  payload: Record<string, unknown>;
  meta: Record<string, unknown>;
}

/** 新后端 /api/events/topics 响应 */
export interface EventTopicsResult {
  topics: { name: string; description: string }[];
}

/** 新后端 /api/agents 响应 */
export interface AgentCatalog {
  agents: { id: string; name: string; role: string; icon: string }[];
}

export interface AgentDetail {
  id: string;
  name: string;
  role: string;
  icon: string;
  soul_preview?: string;
}

export interface AgentInfo {
  id: string;
  label: string;
  emoji: string;
  role: string;
  model: string;
  skills: SkillInfo[];
}

export interface SkillInfo {
  name: string;
  description: string;
  path: string;
}

export interface KnownModel {
  id: string;
  label: string;
  provider: string;
}

export interface AgentConfig {
  agents: AgentInfo[];
  knownModels?: KnownModel[];
  dispatchChannel?: string;
}

export interface ChangeLogEntry {
  at: string;
  agentId: string;
  oldModel: string;
  newModel: string;
  rolledBack?: boolean;
}

export interface OfficialInfo {
  id: string;
  label: string;
  emoji: string;
  role: string;
  rank: string;
  model: string;
  model_short: string;
  tokens_in: number;
  tokens_out: number;
  cache_read: number;
  cache_write: number;
  cost_cny: number;
  cost_usd: number;
  sessions: number;
  messages: number;
  tasks_done: number;
  tasks_active: number;
  flow_participations: number;
  merit_score: number;
  merit_rank: number;
  last_active: string;
  heartbeat: Heartbeat;
  participated_edicts: { id: string; title: string; state: string }[];
}

export interface OfficialsData {
  officials: OfficialInfo[];
  totals: { tasks_done: number; cost_cny: number };
  top_official: string;
}

export interface AgentStatusInfo {
  id: string;
  label: string;
  emoji: string;
  role: string;
  status: 'running' | 'idle' | 'offline' | 'unconfigured';
  statusLabel: string;
  lastActive?: string;
}

export interface GatewayStatus {
  alive: boolean;
  probe: boolean;
  status: string;
}

export interface AgentsStatusData {
  ok: boolean;
  gateway: GatewayStatus;
  agents: AgentStatusInfo[];
  checkedAt: string;
}

export interface MorningNewsItem {
  title: string;
  summary?: string;
  desc?: string;
  link: string;
  source: string;
  image?: string;
  pub_date?: string;
}

export interface MorningBrief {
  date?: string;
  generated_at?: string;
  categories: Record<string, MorningNewsItem[]>;
}

export interface SubCategoryConfig {
  name: string;
  enabled: boolean;
}

export interface CustomFeed {
  name: string;
  url: string;
  category: string;
}

export interface SubConfig {
  categories: SubCategoryConfig[];
  keywords: string[];
  custom_feeds: CustomFeed[];
  feishu_webhook: string;
}

export interface ActivityEntry {
  kind: string;
  at?: number | string;
  text?: string;
  thinking?: string;
  agent?: string;
  from?: string;
  to?: string;
  remark?: string;
  tools?: { name: string; input_preview?: string }[];
  tool?: string;
  output?: string;
  exitCode?: number | null;
  items?: TodoItem[];
  diff?: {
    changed?: { id: string; from: string; to: string }[];
    added?: { id: string; title: string }[];
    removed?: { id: string; title: string }[];
  };
}

export interface PhaseDuration {
  phase: string;
  durationSec: number;
  durationText: string;
  ongoing?: boolean;
}

export interface TodosSummary {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  percent: number;
}

export interface ResourceSummary {
  totalTokens?: number;
  totalCost?: number;
  totalElapsedSec?: number;
}

export interface TaskActivityData {
  ok: boolean;
  message?: string;
  error?: string;
  activity?: ActivityEntry[];
  relatedAgents?: string[];
  agentLabel?: string;
  lastActive?: string;
  phaseDurations?: PhaseDuration[];
  totalDuration?: string;
  todosSummary?: TodosSummary;
  resourceSummary?: ResourceSummary;
}

export interface SchedulerInfo {
  retryCount?: number;
  escalationLevel?: number;
  lastDispatchStatus?: string;
  stallThresholdSec?: number;
  enabled?: boolean;
  lastProgressAt?: string;
  lastDispatchAt?: string;
  lastDispatchAgent?: string;
  autoRollback?: boolean;
}

export interface SchedulerStateData {
  ok: boolean;
  error?: string;
  scheduler?: SchedulerInfo;
  stalledSec?: number;
}

export interface SkillContentResult {
  ok: boolean;
  name?: string;
  agent?: string;
  content?: string;
  path?: string;
  error?: string;
}

export interface ScanAction {
  taskId: string;
  action: string;
  to?: string;
  toState?: string;
  stalledSec?: number;
}

export interface CreateTaskPayload {
  title: string;
  org: string;
  targetDept?: string;
  priority?: string;
  templateId?: string;
  params?: Record<string, string>;
}

export interface RemoteSkillItem {
  skillName: string;
  agentId: string;
  sourceUrl: string;
  description: string;
  localPath: string;
  addedAt: string;
  lastUpdated: string;
  status: 'valid' | 'not-found' | string;
}

export interface RemoteSkillsListResult {
  ok: boolean;
  remoteSkills?: RemoteSkillItem[];
  count?: number;
  listedAt?: string;
  error?: string;
}

// ── 朝堂议政 ──

export interface CourtDiscussResult {
  ok: boolean;
  session_id?: string;
  topic?: string;
  round?: number;
  new_messages?: Array<{
    official_id: string;
    name: string;
    content: string;
    emotion?: string;
    action?: string;
  }>;
  scene_note?: string;
  total_messages?: number;
  error?: string;
}
