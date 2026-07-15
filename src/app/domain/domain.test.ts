/**
 * file: domain.test.ts
 * description: 领域常量模块单元测试 · 状态机流转校验、事件 Topic、升级路径
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-07-16
 * updated: 2026-07-16
 * status: active
 * tags: [test],[domain],[unit]
 *
 * brief: 测试 state-machine / event-topics / escalation 领域常量
 */

import { describe, it, expect } from 'vitest';
import {
  TaskState,
  STATE_TRANSITIONS,
  TERMINAL_STATES,
  AGENT_GROUP_MAP,
  BUCKET_CONFIG,
  canTransition,
  getNextStates,
  isTerminal,
  orgForState,
  stateToAgent,
  orgToAgent,
  ALL_STATES,
  ALL_TOPICS,
  TOPIC_META,
  topicLabel,
  topicsByGroup,
  ESCALATION_PATH,
  ESCALATION_CHAIN,
  SCHEDULER_CONFIG,
  escalationTarget,
} from './index';

// ── TaskState 枚举 ──

describe('TaskState', () => {
  it('should have exactly 13 states (12 backend + Inbox alias)', () => {
    expect(ALL_STATES).toHaveLength(13);
  });

  it('should include Inbox (frontend alias for Pending)', () => {
    expect(ALL_STATES).toContain('Inbox');
  });

  it('should include PendingConfirm (synced from backend)', () => {
    expect(ALL_STATES).toContain('PendingConfirm');
  });

  it('should include Next (synced from backend)', () => {
    expect(ALL_STATES).toContain('Next');
  });
});

// ── TERMINAL_STATES ──

describe('TERMINAL_STATES', () => {
  it('should contain Done and Cancelled', () => {
    expect(TERMINAL_STATES.has(TaskState.Done)).toBe(true);
    expect(TERMINAL_STATES.has(TaskState.Cancelled)).toBe(true);
  });

  it('should not contain non-terminal states', () => {
    expect(TERMINAL_STATES.has(TaskState.Doing)).toBe(false);
    expect(TERMINAL_STATES.has(TaskState.Blocked)).toBe(false);
  });
});

// ── canTransition ──

describe('canTransition()', () => {
  it('should allow valid forward transitions', () => {
    expect(canTransition(TaskState.Pending, TaskState.Taizi)).toBe(true);
    expect(canTransition(TaskState.Taizi, TaskState.Zhongshu)).toBe(true);
    expect(canTransition(TaskState.Zhongshu, TaskState.Menxia)).toBe(true);
    expect(canTransition(TaskState.Menxia, TaskState.Assigned)).toBe(true);
    expect(canTransition(TaskState.Doing, TaskState.Done)).toBe(true);
  });

  it('should allow reject loop (Menxia → Zhongshu)', () => {
    expect(canTransition(TaskState.Menxia, TaskState.Zhongshu)).toBe(true);
  });

  it('should allow Blocked to resume to multiple states', () => {
    expect(canTransition(TaskState.Blocked, TaskState.Doing)).toBe(true);
    expect(canTransition(TaskState.Blocked, TaskState.Review)).toBe(true);
    expect(canTransition(TaskState.Blocked, TaskState.Cancelled)).toBe(true);
  });

  it('should reject invalid transitions', () => {
    expect(canTransition(TaskState.Pending, TaskState.Doing)).toBe(false);
    expect(canTransition(TaskState.Done, TaskState.Doing)).toBe(false);
    expect(canTransition(TaskState.Cancelled, TaskState.Pending)).toBe(false);
  });

  it('should reject transitions from terminal states', () => {
    expect(canTransition(TaskState.Done, TaskState.Cancelled)).toBe(false);
    expect(canTransition(TaskState.Cancelled, TaskState.Done)).toBe(false);
  });

  it('should allow Review → PendingConfirm (high-risk confirm)', () => {
    expect(canTransition(TaskState.Review, TaskState.PendingConfirm)).toBe(true);
  });
});

// ── getNextStates ──

describe('getNextStates()', () => {
  it('should return valid next states for Taizi', () => {
    const next = getNextStates(TaskState.Taizi);
    expect(next).toContain(TaskState.Zhongshu);
    expect(next).toContain(TaskState.Cancelled);
    expect(next).toHaveLength(2);
  });

  it('should return empty array for terminal states', () => {
    expect(getNextStates(TaskState.Done)).toEqual([]);
    expect(getNextStates(TaskState.Cancelled)).toEqual([]);
  });
});

// ── isTerminal ──

describe('isTerminal()', () => {
  it('should return true for Done and Cancelled', () => {
    expect(isTerminal(TaskState.Done)).toBe(true);
    expect(isTerminal(TaskState.Cancelled)).toBe(true);
  });

  it('should return false for non-terminal states', () => {
    expect(isTerminal(TaskState.Doing)).toBe(false);
    expect(isTerminal(TaskState.Blocked)).toBe(false);
  });
});

// ── orgForState ──

describe('orgForState()', () => {
  it('should return assigneeOrg for Doing state', () => {
    expect(orgForState(TaskState.Doing, '兵部')).toBe('兵部');
  });

  it('should return 六部 for Doing without assigneeOrg', () => {
    expect(orgForState(TaskState.Doing)).toBe('六部');
  });

  it('should return mapped org for coordination states', () => {
    expect(orgForState(TaskState.Taizi)).toBe('太子');
    expect(orgForState(TaskState.Zhongshu)).toBe('中书省');
    expect(orgForState(TaskState.Menxia)).toBe('门下省');
    expect(orgForState(TaskState.Assigned)).toBe('尚书省');
  });

  it('should return fallback for unmapped states', () => {
    expect(orgForState(TaskState.Blocked, '工部')).toBe('工部');
    expect(orgForState(TaskState.Blocked)).toBe('太子');
  });
});

// ── stateToAgent / orgToAgent ──

describe('stateToAgent()', () => {
  it('should return correct agent for coordination states', () => {
    expect(stateToAgent(TaskState.Taizi)).toBe('taizi');
    expect(stateToAgent(TaskState.Zhongshu)).toBe('zhongshu');
    expect(stateToAgent(TaskState.Menxia)).toBe('menxia');
    expect(stateToAgent(TaskState.Assigned)).toBe('shangshu');
  });

  it('should return undefined for execution/terminal states', () => {
    expect(stateToAgent(TaskState.Doing)).toBeUndefined();
    expect(stateToAgent(TaskState.Done)).toBeUndefined();
  });
});

describe('orgToAgent()', () => {
  it('should map ministry names to agent IDs', () => {
    expect(orgToAgent('兵部')).toBe('bingbu');
    expect(orgToAgent('工部')).toBe('gongbu');
    expect(orgToAgent('户部')).toBe('hubu');
  });

  it('should return undefined for unknown ministries', () => {
    expect(orgToAgent('太子')).toBeUndefined();
    expect(orgToAgent('中书省')).toBeUndefined();
  });
});

// ── Agent group / bucket config ──

describe('AGENT_GROUP_MAP', () => {
  it('should map coordination agents to sansheng', () => {
    expect(AGENT_GROUP_MAP.taizi).toBe('sansheng');
    expect(AGENT_GROUP_MAP.zhongshu).toBe('sansheng');
  });

  it('should map execution agents to liubu', () => {
    expect(AGENT_GROUP_MAP.bingbu).toBe('liubu');
    expect(AGENT_GROUP_MAP.hubu).toBe('liubu');
  });

  it('should map zaochao to null', () => {
    expect(AGENT_GROUP_MAP.zaochao).toBeNull();
  });
});

describe('BUCKET_CONFIG', () => {
  it('should have fast bucket with limit 4', () => {
    expect(BUCKET_CONFIG.fast.limit).toBe(4);
    expect(BUCKET_CONFIG.fast.agents.has('taizi')).toBe(true);
  });

  it('should have slow bucket with limit 3', () => {
    expect(BUCKET_CONFIG.slow.limit).toBe(3);
    expect(BUCKET_CONFIG.slow.agents.has('bingbu')).toBe(true);
  });
});

// ── STATE_TRANSITIONS completeness ──

describe('STATE_TRANSITIONS completeness', () => {
  it('should have an entry for every state', () => {
    ALL_STATES.forEach((state) => {
      expect(STATE_TRANSITIONS).toHaveProperty(state);
    });
  });

  it('should have terminal states with empty transition sets', () => {
    expect(STATE_TRANSITIONS[TaskState.Done].size).toBe(0);
    expect(STATE_TRANSITIONS[TaskState.Cancelled].size).toBe(0);
  });

  it('should have Blocked with the most outgoing transitions', () => {
    expect(STATE_TRANSITIONS[TaskState.Blocked].size).toBeGreaterThanOrEqual(7);
  });
});

// ── EventTopic ──

describe('EventTopic', () => {
  it('should have exactly 15 topics', () => {
    expect(ALL_TOPICS).toHaveLength(15);
  });

  it('should include all task lifecycle topics', () => {
    expect(ALL_TOPICS).toContain('task.created');
    expect(ALL_TOPICS).toContain('task.dispatch');
    expect(ALL_TOPICS).toContain('task.status');
    expect(ALL_TOPICS).toContain('task.completed');
  });

  it('should include all agent lifecycle topics', () => {
    expect(ALL_TOPICS).toContain('agent.thoughts');
    expect(ALL_TOPICS).toContain('agent.heartbeat');
  });
});

describe('TOPIC_META', () => {
  it('should have metadata for every topic', () => {
    ALL_TOPICS.forEach((topic) => {
      const meta = TOPIC_META.find((t) => t.name === topic);
      expect(meta).toBeDefined();
      expect(meta?.label).toBeTruthy();
    });
  });

  it('should have correct group assignments', () => {
    const taskTopics = topicsByGroup('task');
    const agentTopics = topicsByGroup('agent');
    expect(taskTopics.length + agentTopics.length).toBe(15);
    expect(taskTopics.length).toBeGreaterThan(agentTopics.length);
  });
});

describe('topicLabel()', () => {
  it('should return Chinese label for known topics', () => {
    expect(topicLabel('task.created')).toBe('任务创建');
    expect(topicLabel('agent.heartbeat')).toBe('Agent 心跳');
  });

  it('should return raw topic for unknown topics', () => {
    expect(topicLabel('unknown.topic')).toBe('unknown.topic');
  });
});

// ── Escalation ──

describe('ESCALATION_PATH', () => {
  it('should map Doing → Assigned', () => {
    expect(ESCALATION_PATH[TaskState.Doing]).toBe(TaskState.Assigned);
  });

  it('should form a reverse chain through 三省六部', () => {
    expect(ESCALATION_PATH[TaskState.Assigned]).toBe(TaskState.Menxia);
    expect(ESCALATION_PATH[TaskState.Menxia]).toBe(TaskState.Zhongshu);
    expect(ESCALATION_PATH[TaskState.Zhongshu]).toBe(TaskState.Taizi);
  });

  it('should not have escalation for coordination tier (Taizi)', () => {
    expect(ESCALATION_PATH[TaskState.Taizi]).toBeUndefined();
  });
});

describe('escalationTarget()', () => {
  it('should return the escalation target for stalled states', () => {
    expect(escalationTarget(TaskState.Doing)).toBe(TaskState.Assigned);
  });

  it('should return undefined for states without escalation path', () => {
    expect(escalationTarget(TaskState.Taizi)).toBeUndefined();
    expect(escalationTarget(TaskState.Done)).toBeUndefined();
  });
});

describe('SCHEDULER_CONFIG', () => {
  it('should have consistent retry config', () => {
    expect(SCHEDULER_CONFIG.maxStallRetries).toBe(2);
    expect(SCHEDULER_CONFIG.stallRetryBackoff).toHaveLength(3);
    expect(SCHEDULER_CONFIG.stallThresholdSec).toBe(600);
  });
});

describe('ESCALATION_CHAIN', () => {
  it('should have 5 escalation steps', () => {
    expect(ESCALATION_CHAIN).toHaveLength(5);
  });

  it('should have description for each step', () => {
    ESCALATION_CHAIN.forEach((step) => {
      expect(step.description).toBeTruthy();
      expect(step.from).toBeTruthy();
      expect(step.to).toBeTruthy();
    });
  });
});
