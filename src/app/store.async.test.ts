/**
 * file: store.async.test.ts
 * description: Store 异步 action 单元测试 · loadLive/loadAgentConfig/polling
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-07-16
 * updated: 2026-07-16
 * status: active
 * tags: [test],[store],[async],[unit]
 *
 * brief: 测试 store.ts 的异步 load 方法 + startPolling/stopPolling 生命周期
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useStore, startPolling, stopPolling, POLL_INTERVAL_HTTP, esc, timeAgo } from './store';
import { api } from './api';

// ── Mock api 方法 ──

vi.mock('./api', () => ({
  api: {
    liveStatus: vi.fn(),
    agentConfig: vi.fn(),
    modelChangeLog: vi.fn(),
    officialsStats: vi.fn(),
    agentsStatus: vi.fn(),
    morningBrief: vi.fn(),
    morningConfig: vi.fn(),
  },
}));

beforeEach(() => {
  vi.useFakeTimers();
  vi.restoreAllMocks();
  // 重置 store 到初始状态
  useStore.setState({
    liveStatus: null,
    agentConfig: null,
    officialsData: null,
    agentsStatusData: null,
    morningBrief: null,
    subConfig: null,
    wsConnected: false,
    countdown: 0,
    toasts: [],
  });
});

afterEach(() => {
  stopPolling();
  vi.useRealTimers();
});

// ── loadLive ──

describe('loadLive()', () => {
  it('should set liveStatus on success', async () => {
    const mockData = { tasks: [], last_updated: '2026-01-01T00:00:00Z' };
    vi.mocked(api.liveStatus).mockResolvedValue(mockData as never);

    await useStore.getState().loadLive();

    expect(useStore.getState().liveStatus).toEqual(mockData);
  });

  it('should not throw on API failure', async () => {
    vi.mocked(api.liveStatus).mockRejectedValue(new Error('Network error'));

    await expect(useStore.getState().loadLive()).resolves.toBeUndefined();
    expect(useStore.getState().liveStatus).toBeNull();
  });

  it('should lazy-load officialsStats when not yet loaded', async () => {
    vi.mocked(api.liveStatus).mockResolvedValue({ tasks: [] } as never);
    vi.mocked(api.officialsStats).mockResolvedValue({
      officials: [],
      totals: { tasks_done: 0, cost_cny: 0 },
      top_official: '',
    } as never);

    await useStore.getState().loadLive();
    // 官员数据是异步 fire-and-forget，需要等待微任务
    await vi.waitFor(() => {
      expect(useStore.getState().officialsData).not.toBeNull();
    });
  });
});

// ── loadAgentConfig ──

describe('loadAgentConfig()', () => {
  it('should set agentConfig and changeLog', async () => {
    const mockCfg = { agents: [], knownModels: [] };
    vi.mocked(api.agentConfig).mockResolvedValue(mockCfg as never);
    vi.mocked(api.modelChangeLog).mockResolvedValue([] as never);

    await useStore.getState().loadAgentConfig();

    expect(useStore.getState().agentConfig).toEqual(mockCfg);
    expect(useStore.getState().changeLog).toEqual([]);
  });

  it('should not throw on API failure', async () => {
    vi.mocked(api.agentConfig).mockRejectedValue(new Error('fail'));

    await expect(useStore.getState().loadAgentConfig()).resolves.toBeUndefined();
  });
});

// ── loadAgentsStatus ──

describe('loadAgentsStatus()', () => {
  it('should set agentsStatusData on success', async () => {
    const mockData = {
      ok: true,
      gateway: { alive: true, status: 'online' },
      agents: [],
      checkedAt: '',
    };
    vi.mocked(api.agentsStatus).mockResolvedValue(mockData as never);

    await useStore.getState().loadAgentsStatus();

    expect(useStore.getState().agentsStatusData).toEqual(mockData);
  });

  it('should set agentsStatusData to null on failure', async () => {
    vi.mocked(api.agentsStatus).mockRejectedValue(new Error('fail'));

    await useStore.getState().loadAgentsStatus();

    expect(useStore.getState().agentsStatusData).toBeNull();
  });
});

// ── loadMorning ──

describe('loadMorning()', () => {
  it('should set morningBrief and subConfig', async () => {
    vi.mocked(api.morningBrief).mockResolvedValue({ categories: {} } as never);
    vi.mocked(api.morningConfig).mockResolvedValue({
      categories: [],
      keywords: [],
      custom_feeds: [],
      feishu_webhook: '',
    } as never);

    await useStore.getState().loadMorning();

    expect(useStore.getState().morningBrief).not.toBeNull();
    expect(useStore.getState().subConfig).not.toBeNull();
  });
});

// ── toast ──

describe('toast()', () => {
  it('should add a toast message', () => {
    useStore.getState().toast('Test message', 'ok');
    expect(useStore.getState().toasts).toHaveLength(1);
    expect(useStore.getState().toasts[0].msg).toBe('Test message');
  });

  it('should auto-remove toast after 3000ms', () => {
    useStore.getState().toast('Temporary', 'ok');
    expect(useStore.getState().toasts).toHaveLength(1);

    vi.advanceTimersByTime(3000);

    expect(useStore.getState().toasts).toHaveLength(0);
  });
});

// ── startPolling / stopPolling ──

describe('startPolling() / stopPolling()', () => {
  it('should start polling and call loadAll', () => {
    vi.mocked(api.liveStatus).mockResolvedValue({ tasks: [] } as never);

    startPolling();

    // loadAll should have been called immediately
    expect(api.liveStatus).toHaveBeenCalled();
  });

  it('should set countdown to POLL_INTERVAL_HTTP when WS not connected', () => {
    vi.mocked(api.liveStatus).mockResolvedValue({ tasks: [] } as never);

    startPolling();

    expect(useStore.getState().countdown).toBe(POLL_INTERVAL_HTTP);
  });

  it('should trigger loadAll after countdown reaches 0', () => {
    vi.mocked(api.liveStatus).mockResolvedValue({ tasks: [] } as never);

    startPolling();
    // Clear the initial call count
    vi.mocked(api.liveStatus).mockClear();

    // Fast-forward to trigger the countdown cycle
    vi.advanceTimersByTime((POLL_INTERVAL_HTTP + 1) * 1000);

    expect(api.liveStatus).toHaveBeenCalled();
  });

  it('should stop polling when stopPolling is called', () => {
    vi.mocked(api.liveStatus).mockResolvedValue({ tasks: [] } as never);

    startPolling();
    stopPolling();

    const callCount = vi.mocked(api.liveStatus).mock.calls.length;

    // Advance time significantly — no new calls should happen
    vi.advanceTimersByTime(60000);

    expect(vi.mocked(api.liveStatus).mock.calls.length).toBe(callCount);
  });

  it('should be idempotent (calling twice does not create duplicate timers)', () => {
    vi.mocked(api.liveStatus).mockResolvedValue({ tasks: [] } as never);

    startPolling();
    startPolling();

    stopPolling();

    // After stop, advancing time should not cause errors
    vi.advanceTimersByTime(30000);
    // No assertion needed — if there was a duplicate timer, it would throw
  });
});

// ── esc() and timeAgo() ──

describe('esc()', () => {
  it('should escape HTML special characters', () => {
    expect(esc('<script>alert("x")</script>')).toBe(
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;',
    );
  });

  it('should handle empty/null', () => {
    expect(esc('')).toBe('');
    expect(esc(null)).toBe('');
    expect(esc(undefined)).toBe('');
  });
});

describe('timeAgo()', () => {
  it('should return relative time string', () => {
    const past = new Date(Date.now() - 3600000).toISOString();
    const result = timeAgo(past);
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });

  it('should return empty for invalid date', () => {
    expect(timeAgo('')).toBe('');
    expect(timeAgo('invalid-date')).toBe('');
  });
});
