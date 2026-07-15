/**
 * file: store.test.ts
 * description: Zustand store 纯函数单元测试 · Pipeline / 分类 / 工具函数
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-07-12
 * updated: 2026-07-12
 * status: active
 * tags: [test],[store],[unit]
 *
 * brief: 测试 store.ts 中的纯函数：PIPE 状态映射、任务分类、HTML 转义、时间格式化
 */

import { describe, it, expect } from 'vitest';
import {
  PIPE,
  PIPE_STATE_IDX,
  DEPT_COLOR,
  STATE_LABEL,
  deptColor,
  stateLabel,
  isEdict,
  isSession,
  isArchived,
  getPipeStatus,
  esc,
  timeAgo,
} from './store';
import type { Task } from './api';

// ── 测试用 Task 工厂 ──

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: 'JJC-001',
    title: '测试旨意',
    state: 'Inbox',
    org: '兵部',
    now: new Date().toISOString(),
    eta: '',
    block: '',
    ac: '',
    output: '',
    heartbeat: { status: 'idle', label: '' },
    flow_log: [],
    todos: [],
    review_round: 0,
    archived: false,
    ...overrides,
  };
}

// ── PIPE 定义 ──

describe('PIPE constant', () => {
  it('should have exactly 8 stages', () => {
    expect(PIPE).toHaveLength(8);
  });

  it('should follow the correct pipeline order', () => {
    const keys = PIPE.map((s) => s.key);
    expect(keys).toEqual([
      'Inbox',
      'Taizi',
      'Zhongshu',
      'Menxia',
      'Assigned',
      'Doing',
      'Review',
      'Done',
    ]);
  });

  it('should have all required fields per stage', () => {
    PIPE.forEach((stage) => {
      expect(stage).toHaveProperty('key');
      expect(stage).toHaveProperty('dept');
      expect(stage).toHaveProperty('icon');
      expect(stage).toHaveProperty('action');
    });
  });
});

// ── PIPE_STATE_IDX ──

describe('PIPE_STATE_IDX', () => {
  it('should map Inbox and Pending to index 0', () => {
    expect(PIPE_STATE_IDX['Inbox']).toBe(0);
    expect(PIPE_STATE_IDX['Pending']).toBe(0);
  });

  it('should map Done to index 7 (last)', () => {
    expect(PIPE_STATE_IDX['Done']).toBe(7);
  });

  it('should map Blocked/Cancelled/Next/PendingConfirm to valid indices', () => {
    expect(PIPE_STATE_IDX['Blocked']).toBe(5);
    expect(PIPE_STATE_IDX['Cancelled']).toBe(5);
    expect(PIPE_STATE_IDX['Next']).toBe(4);
    expect(PIPE_STATE_IDX['PendingConfirm']).toBe(6);
  });

  it('should have a STATE_LABEL for every PIPE_STATE_IDX key', () => {
    const allStates = [
      'Inbox',
      'Pending',
      'Taizi',
      'Zhongshu',
      'Menxia',
      'Assigned',
      'Doing',
      'Review',
      'Done',
      'Blocked',
      'Cancelled',
      'Next',
      'PendingConfirm',
    ];
    allStates.forEach((s) => {
      expect(STATE_LABEL).toHaveProperty(s);
    });
  });

  it('should cover all PIPE keys', () => {
    PIPE.forEach((stage) => {
      expect(PIPE_STATE_IDX).toHaveProperty(stage.key);
    });
  });
});

// ── DEPT_COLOR & deptColor() ──

describe('deptColor()', () => {
  it('should return the correct color for known departments', () => {
    expect(deptColor('太子')).toBe('#e8a040');
    expect(deptColor('中书省')).toBe('#a07aff');
    expect(deptColor('皇上')).toBe('#ffd700');
  });

  it('should return a default color for unknown departments', () => {
    expect(deptColor('未知部门')).toBe('#6a9eff');
  });

  it('should be consistent with DEPT_COLOR map', () => {
    for (const [dept, color] of Object.entries(DEPT_COLOR)) {
      expect(deptColor(dept)).toBe(color);
    }
  });
});

// ── STATE_LABEL & stateLabel() ──

describe('stateLabel()', () => {
  it('should return the label from STATE_LABEL for simple states', () => {
    expect(stateLabel(makeTask({ state: 'Inbox' }))).toBe('收件');
    expect(stateLabel(makeTask({ state: 'Doing' }))).toBe('执行中');
    expect(stateLabel(makeTask({ state: 'Done' }))).toBe('已完成');
  });

  it('should show review round for Menxia state when review_round > 1', () => {
    const label = stateLabel(makeTask({ state: 'Menxia', review_round: 3 }));
    expect(label).toContain('第3轮');
  });

  it('should not show review round for Menxia when review_round <= 1', () => {
    const label = stateLabel(makeTask({ state: 'Menxia', review_round: 1 }));
    expect(label).toBe('门下审议');
  });

  it('should show revision round for Zhongshu when review_round > 0', () => {
    const label = stateLabel(makeTask({ state: 'Zhongshu', review_round: 2 }));
    expect(label).toContain('第2轮');
  });

  it('should return the raw state string for unknown states', () => {
    const task = makeTask({ state: 'UnknownState' });
    expect(stateLabel(task)).toBe('UnknownState');
  });
});

// ── isEdict() ──

describe('isEdict()', () => {
  it('should return true for JJC- prefixed IDs (case-insensitive)', () => {
    expect(isEdict(makeTask({ id: 'JJC-001' }))).toBe(true);
    expect(isEdict(makeTask({ id: 'jjc-002' }))).toBe(true);
  });

  it('should return false for non-JJC IDs', () => {
    expect(isEdict(makeTask({ id: 'OC-001' }))).toBe(false);
    expect(isEdict(makeTask({ id: 'edict-042' }))).toBe(false);
    expect(isEdict(makeTask({ id: '' }))).toBe(false);
  });
});

// ── isSession() ──

describe('isSession()', () => {
  it('should return true for OC- and MC- prefixed IDs (case-insensitive)', () => {
    expect(isSession(makeTask({ id: 'OC-001' }))).toBe(true);
    expect(isSession(makeTask({ id: 'mc-002' }))).toBe(true);
  });

  it('should return false for non-session IDs', () => {
    expect(isSession(makeTask({ id: 'JJC-001' }))).toBe(false);
    expect(isSession(makeTask({ id: 'edict-042' }))).toBe(false);
  });
});

// ── isArchived() ──

describe('isArchived()', () => {
  it('should return true when archived is true', () => {
    expect(isArchived(makeTask({ archived: true }))).toBe(true);
  });

  it('should return false when archived is false or undefined', () => {
    expect(isArchived(makeTask({ archived: false }))).toBe(false);
    const task = makeTask();
    task.archived = undefined as unknown as boolean;
    expect(isArchived(task)).toBe(false);
  });
});

// ── getPipeStatus() ──

describe('getPipeStatus()', () => {
  it('should return exactly 8 stages', () => {
    const result = getPipeStatus(makeTask({ state: 'Doing' }));
    expect(result).toHaveLength(8);
  });

  it('should mark stages before current as "done"', () => {
    const result = getPipeStatus(makeTask({ state: 'Doing' }));
    // Doing = index 5, so stages 0-4 are "done"
    expect(result[0].status).toBe('done');
    expect(result[4].status).toBe('done');
  });

  it('should mark the current stage as "active"', () => {
    const result = getPipeStatus(makeTask({ state: 'Doing' }));
    expect(result[5].status).toBe('active');
  });

  it('should mark stages after current as "pending"', () => {
    const result = getPipeStatus(makeTask({ state: 'Doing' }));
    expect(result[6].status).toBe('pending');
    expect(result[7].status).toBe('pending');
  });

  it('should mark all prior stages done and Done itself as active for "Done" state', () => {
    const result = getPipeStatus(makeTask({ state: 'Done' }));
    // Done is at index 7; it gets 'active' (current), 0-6 are 'done'
    expect(result.slice(0, 7).every((s) => s.status === 'done')).toBe(true);
    expect(result[7].status).toBe('active');
  });

  it('should default to index 4 (Assigned) for unknown states', () => {
    const result = getPipeStatus(makeTask({ state: 'UnknownState' }));
    expect(result[4].status).toBe('active');
  });
});

// ── esc() ──

describe('esc()', () => {
  it('should escape HTML special characters', () => {
    expect(esc('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
    );
  });

  it('should escape ampersands', () => {
    expect(esc('a & b')).toBe('a &amp; b');
  });

  it('should return empty string for null/undefined/empty', () => {
    expect(esc(null)).toBe('');
    expect(esc(undefined)).toBe('');
    expect(esc('')).toBe('');
  });

  it('should not alter plain text without special chars', () => {
    expect(esc('hello world')).toBe('hello world');
    expect(esc('12345')).toBe('12345');
  });
});

// ── timeAgo() ──

describe('timeAgo()', () => {
  it('should return "刚刚" for timestamps within the last minute', () => {
    expect(timeAgo(new Date().toISOString())).toBe('刚刚');
  });

  it('should return "X分钟前" for timestamps within the last hour', () => {
    const fiveMinAgo = new Date(Date.now() - 5 * 60_000).toISOString();
    expect(timeAgo(fiveMinAgo)).toBe('5分钟前');
  });

  it('should return "X小时前" for timestamps within the last day', () => {
    const threeHrsAgo = new Date(Date.now() - 3 * 3_600_000).toISOString();
    expect(timeAgo(threeHrsAgo)).toBe('3小时前');
  });

  it('should return "X天前" for timestamps older than a day', () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 86_400_000).toISOString();
    expect(timeAgo(twoDaysAgo)).toBe('2天前');
  });

  it('should return empty string for null/undefined', () => {
    expect(timeAgo(undefined)).toBe('');
    expect(timeAgo('')).toBe('');
  });

  it('should handle ISO strings with space separator (non-T format)', () => {
    const twoMinAgo = new Date(Date.now() - 2 * 60_000);
    const spaceFormat = twoMinAgo.toISOString().replace('T', ' ').slice(0, 19);
    const result = timeAgo(spaceFormat);
    // Should not be empty (parsed successfully)
    expect(result).toBeTruthy();
  });
});
