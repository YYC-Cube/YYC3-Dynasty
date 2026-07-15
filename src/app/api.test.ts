/**
 * file: api.test.ts
 * description: API 服务层单元测试 · 双路由适配、字段归一化、Mock 回退
 * author: YanYuCloudCube Team
 * version: v2.0.0
 * created: 2026-07-12
 * updated: 2026-07-16
 * status: active
 * tags: [test],[api],[unit],[adapter]
 *
 * brief: 测试 api.ts 的双路由适配、normalizeTask 归一化、fetchJ/postJ mock 回退
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { api, normalizeTask, normalizeFlowEntry } from './api';

// ── Mock fetch ──

function mockFetchResponse(
  body: unknown,
  options: { ok?: boolean; contentType?: string } = {},
): Response {
  const { ok = true, contentType = 'application/json' } = options;
  return {
    ok,
    headers: new Headers({ 'content-type': contentType }),
    json: () => Promise.resolve(body),
  } as Response;
}

beforeEach(() => {
  vi.restoreAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ── fetchJWithFallback: 正常响应 ──

describe('api.liveStatus() — successful fetch', () => {
  it('should return parsed JSON with normalized tasks when fetch succeeds', async () => {
    const mockData = {
      tasks: [{ task_id: 't1', id: 'edict-001', title: 'Test', state: 'Done', flow_log: [] }],
      last_updated: '2026-07-12T00:00:00Z',
    };
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockFetchResponse(mockData));

    const result = await api.liveStatus();
    expect(result.tasks).toHaveLength(1);
    expect(result.tasks[0].id).toBe('edict-001');
    expect(result.last_updated).toBe('2026-07-12T00:00:00Z');
  });

  it('should call fetch with the new RESTful route first', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(mockFetchResponse({ tasks: [] }));

    await api.liveStatus();

    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('/api/tasks/live-status'),
      expect.objectContaining({ cache: 'no-store' }),
    );
  });
});

// ── fetchJWithFallback: Mock 回退 ──

describe('api.liveStatus() — mock fallback', () => {
  it('should fall back to mock data when all routes return HTML', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      mockFetchResponse('<html>Not Found</html>', {
        ok: true,
        contentType: 'text/html',
      }),
    );

    const result = await api.liveStatus();
    expect(result).toHaveProperty('tasks');
    expect(Array.isArray(result.tasks)).toBe(true);
  });

  it('should fall back to mock data when response is not ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      mockFetchResponse('Server Error', { ok: false }),
    );

    const result = await api.liveStatus();
    expect(result).toHaveProperty('tasks');
  });

  it('should fall back to mock data when network fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));

    const result = await api.liveStatus();
    expect(result).toHaveProperty('tasks');
  });
});

// ── fetchJ: 不在 mock 表中的 URL ──

describe('api.taskActivity() — no mock fallback for unknown URL', () => {
  it('should throw when fetch fails for a URL not in mockData', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));

    await expect(api.taskActivity('nonexistent-id')).rejects.toThrow();
  });
});

// ── postJWithFallback: createTask ──

describe('api.createTask() — successful POST', () => {
  it('should return parsed JSON when POST succeeds (new route)', async () => {
    const mockResponse = { ok: true, task_id: 'uuid-099', state: 'Taizi' };
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockFetchResponse(mockResponse));

    const result = await api.createTask({ title: 'Test edict', org: '中书省' });

    expect(result.ok).toBe(true);
    expect(result.taskId).toBe('uuid-099');
  });

  it('should send POST to new RESTful route first', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(mockFetchResponse({ ok: true }));

    await api.createTask({ title: 'Test', org: '兵部' });

    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('/api/tasks'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  });
});

// ── postJWithFallback: Mock 回退 ──

describe('api.createTask() — mock fallback on error', () => {
  it('should return a mock success when POST fails (network error)', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));

    const result = await api.createTask({ title: 'Test', org: '兵部' });

    expect(result.ok).toBe(true);
    expect(result.message).toBe('Mock successful');
  });

  it('should return a mock success when server returns HTML', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      mockFetchResponse('<html>Error</html>', {
        ok: true,
        contentType: 'text/html',
      }),
    );

    const result = await api.createTask({ title: 'Test', org: '兵部' });

    expect(result.ok).toBe(true);
  });
});

// ── modelChangeLog: 空 catch ──

describe('api.modelChangeLog() — graceful empty fallback', () => {
  it('should return empty array on error', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));

    const result = await api.modelChangeLog();

    expect(result).toEqual([]);
  });
});

// ── normalizeFlowEntry ──

describe('normalizeFlowEntry()', () => {
  it('should pass through standard {at, from, to, remark} fields', () => {
    const entry = normalizeFlowEntry({
      at: '2026-01-01',
      from: '太子',
      to: '中书省',
      remark: '派发',
    });
    expect(entry).toEqual({ at: '2026-01-01', from: '太子', to: '中书省', remark: '派发' });
  });

  it('should map ts → at, reason → remark (new backend transition format)', () => {
    const entry = normalizeFlowEntry({ ts: '2026-01-01', from: 'A', to: 'B', reason: '推进' });
    expect(entry.at).toBe('2026-01-01');
    expect(entry.remark).toBe('推进');
  });

  it('should handle missing fields gracefully', () => {
    const entry = normalizeFlowEntry({});
    expect(entry.at).toBeTruthy(); // defaults to now()
    expect(entry.from).toBe('');
    expect(entry.to).toBe('');
    expect(entry.remark).toBe('');
  });
});

// ── normalizeTask ──

describe('normalizeTask()', () => {
  it('should map task_id → id when id is missing', () => {
    const task = normalizeTask({ task_id: 'uuid-123', title: 'Test', state: 'Doing' });
    expect(task.id).toBe('uuid-123');
    expect(task.task_id).toBe('uuid-123');
  });

  it('should normalize flow_log entries (ts/reason → at/remark)', () => {
    const task = normalizeTask({
      id: 't1',
      flow_log: [{ ts: '2026-01-01', from: 'A', to: 'B', reason: '推进' }],
    });
    expect(task.flow_log[0].at).toBe('2026-01-01');
    expect(task.flow_log[0].remark).toBe('推进');
  });

  it('should map progress_log → activity when activity is missing', () => {
    const task = normalizeTask({
      id: 't1',
      progress_log: [{ kind: 'progress', text: '正在执行' }],
    });
    expect(task.activity).toHaveLength(1);
    expect(task.activity![0].text).toBe('正在执行');
  });

  it('should default heartbeat to unknown when missing', () => {
    const task = normalizeTask({ id: 't1', title: 'T', state: 'Doing' });
    expect(task.heartbeat.status).toBe('unknown');
  });

  it('should extract review_round from meta when missing at top level', () => {
    const task = normalizeTask({ id: 't1', meta: { review_round: 3 } });
    expect(task.review_round).toBe(3);
  });

  it('should default archived to false', () => {
    const task = normalizeTask({ id: 't1' });
    expect(task.archived).toBe(false);
  });

  it('should map assignee_org → org when org is missing', () => {
    const task = normalizeTask({ task_id: 't1', assignee_org: '兵部' });
    expect(task.org).toBe('兵部');
    expect(task.assignee_org).toBe('兵部');
  });
});

// ── API 端点存在性 ──

describe('api object structure', () => {
  const expectedMethods = [
    // 新后端 RESTful
    'liveStatus',
    'tasks',
    'taskDetail',
    'taskStats',
    'taskTransition',
    'createTask',
    'events',
    'eventTopics',
    'agents',
    'agentDetail',
    'agentRuntimeConfig',
    // 旧后端兼容
    'agentConfig',
    'modelChangeLog',
    'officialsStats',
    'morningBrief',
    'morningConfig',
    'agentsStatus',
    'taskActivity',
    'schedulerState',
    'skillContent',
    'setModel',
    'setDispatchChannel',
    'agentWake',
    'taskAction',
    'reviewAction',
    'advanceState',
    'archiveTask',
    'archiveAllDone',
    'schedulerScan',
    'schedulerRetry',
    'schedulerEscalate',
    'schedulerRollback',
    'refreshMorning',
    'saveMorningConfig',
    'addSkill',
    'addRemoteSkill',
    'remoteSkillsList',
    'updateRemoteSkill',
    'removeRemoteSkill',
    'courtDiscussStart',
    'courtDiscussAdvance',
    'courtDiscussConclude',
    'courtDiscussDestroy',
    'courtDiscussFate',
  ];

  it.each(expectedMethods)('api.%s should be a function', (method) => {
    expect(typeof (api as Record<string, unknown>)[method]).toBe('function');
  });
});

// ── Mock 数据完整性 ──

describe('mock data integrity', () => {
  it('agent-config mock should have 10 agents', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('mock'));

    const result = await api.agentConfig();

    expect(result.agents).toHaveLength(10);
    expect(result.agents[0]).toHaveProperty('id');
    expect(result.agents[0]).toHaveProperty('label');
  });

  it('officials-stats mock should have 6 officials', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('mock'));

    const result = await api.officialsStats();

    expect(result.officials).toHaveLength(6);
    expect(result).toHaveProperty('totals');
    expect(result).toHaveProperty('top_official');
  });

  it('agents-status mock should have gateway status', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('mock'));

    const result = await api.agentsStatus();

    expect(result.ok).toBe(true);
    expect(result.gateway).toHaveProperty('status');
    expect(result.gateway).toHaveProperty('alive');
  });

  it('live-status mock tasks should have to_dict() shape (task_id/trace_id)', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('mock'));

    const result = await api.liveStatus();

    expect(result.tasks[0]).toHaveProperty('task_id');
    expect(result.tasks[0]).toHaveProperty('trace_id');
    expect(result.tasks[0]).toHaveProperty('assignee_org');
  });
});

// ── 新后端端点 mock 回退 ──

describe('new backend endpoints — mock fallback', () => {
  it('taskStats should fall back to mock', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('mock'));

    const result = await api.taskStats();
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('by_state');
  });

  it('events should fall back to mock', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('mock'));

    const result = await api.events();
    expect(result).toHaveProperty('events');
    expect(result).toHaveProperty('count');
  });

  it('agents should fall back to mock (9 agents)', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('mock'));

    const result = await api.agents();
    expect(result.agents).toHaveLength(9);
  });
});
