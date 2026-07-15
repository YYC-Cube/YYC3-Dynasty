/**
 * file: state-machine.ts
 * description: 三省六部任务状态机 · 领域常量与流转校验（同步自后端 models/task.py）
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-07-16
 * updated: 2026-07-16
 * status: active
 * tags: [domain],[state-machine],[state],[sync-backend]
 *
 * brief: 任务状态枚举、合法流转表、Agent 路由映射 — 前端唯一真相源
 *
 * details:
 * - 与后端 edict/backend/app/models/task.py 的 TaskState / STATE_TRANSITIONS /
 *   STATE_AGENT_MAP / ORG_AGENT_MAP / STATE_ORG_MAP / TERMINAL_STATES 保持同步
 * - canTransition() 校验状态流转合法性，供 UI 按钮禁用判断
 * - orgForState() 计算状态对应的执行部门（中文名）
 * - stateToAgent() 获取状态对应的责任 Agent ID
 * - orgToAgent() 获取部门中文名对应的 Agent ID
 *
 * dependencies: none
 * exports: TaskState, TERMINAL_STATES, STATE_TRANSITIONS, STATE_AGENT_MAP,
 *          ORG_AGENT_MAP, STATE_ORG_MAP, canTransition, orgForState,
 *          stateToAgent, orgToAgent, ALL_STATES
 */

// ══ 任务状态枚举（12 态，与后端 TaskState 完全一致）══

export const TaskState = {
  Inbox: 'Inbox',
  Pending: 'Pending',
  Taizi: 'Taizi',
  Zhongshu: 'Zhongshu',
  Menxia: 'Menxia',
  Assigned: 'Assigned',
  Next: 'Next',
  Doing: 'Doing',
  Review: 'Review',
  PendingConfirm: 'PendingConfirm',
  Done: 'Done',
  Blocked: 'Blocked',
  Cancelled: 'Cancelled',
} as const;

export type TaskStateValue = (typeof TaskState)[keyof typeof TaskState];

export const ALL_STATES = Object.values(TaskState);

// ══ 终态 ══

export const TERMINAL_STATES: ReadonlySet<string> = new Set([TaskState.Done, TaskState.Cancelled]);

// ══ 合法状态流转表（与后端 STATE_TRANSITIONS 同步）══
// key = 当前状态，value = 可流转到的目标状态集合

export const STATE_TRANSITIONS: Readonly<Record<string, ReadonlySet<string>>> = {
  [TaskState.Inbox]: new Set([TaskState.Taizi, TaskState.Pending, TaskState.Cancelled]),
  [TaskState.Pending]: new Set([TaskState.Taizi, TaskState.Cancelled]),
  [TaskState.Taizi]: new Set([TaskState.Zhongshu, TaskState.Cancelled]),
  [TaskState.Zhongshu]: new Set([TaskState.Menxia, TaskState.Cancelled, TaskState.Blocked]),
  [TaskState.Menxia]: new Set([TaskState.Assigned, TaskState.Zhongshu, TaskState.Cancelled]),
  [TaskState.Assigned]: new Set([
    TaskState.Doing,
    TaskState.Next,
    TaskState.Cancelled,
    TaskState.Blocked,
  ]),
  [TaskState.Next]: new Set([TaskState.Doing, TaskState.Cancelled, TaskState.Blocked]),
  [TaskState.Doing]: new Set([
    TaskState.Review,
    TaskState.Done,
    TaskState.Blocked,
    TaskState.Cancelled,
  ]),
  [TaskState.Review]: new Set([
    TaskState.Done,
    TaskState.Menxia,
    TaskState.Doing,
    TaskState.Cancelled,
    TaskState.PendingConfirm,
  ]),
  [TaskState.PendingConfirm]: new Set([TaskState.Done, TaskState.Review, TaskState.Cancelled]),
  [TaskState.Blocked]: new Set([
    TaskState.Taizi,
    TaskState.Zhongshu,
    TaskState.Menxia,
    TaskState.Assigned,
    TaskState.Next,
    TaskState.Doing,
    TaskState.Review,
    TaskState.Cancelled,
  ]),
  // 终态无流转
  [TaskState.Done]: new Set(),
  [TaskState.Cancelled]: new Set(),
};

// ══ 状态 → 责任 Agent ID 映射（与后端 STATE_AGENT_MAP 同步）══

export const STATE_AGENT_MAP: Readonly<Record<string, string>> = {
  [TaskState.Taizi]: 'taizi',
  [TaskState.Zhongshu]: 'zhongshu',
  [TaskState.Menxia]: 'menxia',
  [TaskState.Assigned]: 'shangshu',
  [TaskState.Review]: 'shangshu',
  [TaskState.PendingConfirm]: 'shangshu',
  [TaskState.Pending]: 'zhongshu',
  // Doing/Next/Done/Blocked/Cancelled → 无直接 Agent（按部门或终态）
};

// ══ 部门中文名 → Agent ID 映射（与后端 ORG_AGENT_MAP 同步）══

export const ORG_AGENT_MAP: Readonly<Record<string, string>> = {
  户部: 'hubu',
  礼部: 'libu',
  兵部: 'bingbu',
  刑部: 'xingbu',
  工部: 'gongbu',
  吏部: 'libu_hr',
};

// ══ 状态 → 执行部门中文名（与后端 STATE_ORG_MAP 同步）══

export const STATE_ORG_MAP: Readonly<Record<string, string>> = {
  [TaskState.Taizi]: '太子',
  [TaskState.Zhongshu]: '中书省',
  [TaskState.Menxia]: '门下省',
  [TaskState.Assigned]: '尚书省',
  [TaskState.Review]: '尚书省',
  [TaskState.PendingConfirm]: '尚书省',
  [TaskState.Pending]: '中书省',
};

// ══ Agent → 提示词组映射（与后端 dispatch_worker._GROUP_MAP 同步）══

export const AGENT_GROUP_MAP: Readonly<Record<string, string | null>> = {
  taizi: 'sansheng',
  zhongshu: 'sansheng',
  menxia: 'sansheng',
  shangshu: 'sansheng',
  hubu: 'liubu',
  libu: 'liubu',
  bingbu: 'liubu',
  xingbu: 'liubu',
  gongbu: 'liubu',
  libu_hr: 'liubu',
  zaochao: null,
};

// ══ Agent 并发桶配置（与后端 dispatch_worker._BUCKET_CONFIG 同步）══

export interface BucketConfig {
  agents: ReadonlySet<string>;
  limit: number;
}

export const BUCKET_CONFIG: Readonly<Record<string, BucketConfig>> = {
  fast: {
    agents: new Set(['taizi', 'zhongshu', 'menxia', 'shangshu', 'zaochao']),
    limit: 4,
  },
  slow: {
    agents: new Set(['hubu', 'libu', 'bingbu', 'xingbu', 'gongbu', 'libu_hr']),
    limit: 3,
  },
};

// ══ 工具函数 ══

/**
 * 校验状态流转是否合法
 * @param from 当前状态
 * @param to 目标状态
 * @returns true 如果 from → to 是合法流转
 */
export function canTransition(from: string, to: string): boolean {
  const targets = STATE_TRANSITIONS[from];
  return targets !== undefined && targets.has(to);
}

/**
 * 获取某状态的所有合法后继状态
 */
export function getNextStates(state: string): string[] {
  const targets = STATE_TRANSITIONS[state];
  return targets ? Array.from(targets) : [];
}

/**
 * 判断状态是否为终态
 */
export function isTerminal(state: string): boolean {
  return TERMINAL_STATES.has(state);
}

/**
 * 计算状态对应的执行部门（中文名）
 * 与后端 Task.org_for_state() 逻辑一致
 */
export function orgForState(state: string, assigneeOrg?: string | null): string {
  if (state === TaskState.Doing || state === TaskState.Next) {
    return assigneeOrg || '六部';
  }
  return STATE_ORG_MAP[state] || assigneeOrg || '太子';
}

/**
 * 获取状态对应的责任 Agent ID
 */
export function stateToAgent(state: string): string | undefined {
  return STATE_AGENT_MAP[state];
}

/**
 * 获取部门中文名对应的 Agent ID
 */
export function orgToAgent(org: string): string | undefined {
  return ORG_AGENT_MAP[org];
}
