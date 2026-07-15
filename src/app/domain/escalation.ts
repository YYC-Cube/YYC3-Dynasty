/**
 * file: escalation.ts
 * description: 停滞升级路径与调度器参数 · 同步自后端 orchestrator_worker.py
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-07-16
 * updated: 2026-07-16
 * status: active
 * tags: [domain],[escalation],[scheduler],[sync-backend]
 *
 * brief: 任务停滞检测、三级恢复策略（重试→升级→阻断）的配置与路径
 *
 * details:
 * - 与后端 edict/backend/app/workers/orchestrator_worker.py 的常量保持同步
 * - ESCALATION_PATH 定义逆向三省六部升级链（执行层→协调层逐级追溯）
 * - 调度参数（停滞阈值/最大重试/退避序列）供前端监控面板展示
 *
 * dependencies: ./state-machine
 * exports: ESCALATION_PATH, SCHEDULER_CONFIG, escalationTarget
 */

import { TaskState } from './state-machine';

// ══ 升级路径（与后端 _ESCALATION_PATH 同步）══
// 逆向三省六部链：执行层卡住 → 逐级追溯至协调层

export const ESCALATION_PATH: Readonly<Record<string, string>> = {
  [TaskState.Doing]: TaskState.Assigned, // 六部卡住 → 退回尚书省重新派发
  [TaskState.Next]: TaskState.Assigned, // 等待队列卡住 → 退回尚书省
  [TaskState.Assigned]: TaskState.Menxia, // 尚书省卡住 → 退回门下省复核
  [TaskState.Menxia]: TaskState.Zhongshu, // 门下省卡住 → 退回中书省重新规划
  [TaskState.Zhongshu]: TaskState.Taizi, // 中书省卡住 → 退回太子重新起草
};

/**
 * 获取停滞升级的目标状态
 * @param state 当前停滞状态
 * @returns 升级后的目标状态，若无升级路径则返回 undefined
 */
export function escalationTarget(state: string): string | undefined {
  return ESCALATION_PATH[state];
}

// ══ 调度器参数（与后端 orchestrator_worker.py 常量同步）══

export const SCHEDULER_CONFIG = {
  /** 最大重试次数（同一 Agent 重试上限） */
  maxStallRetries: 2,

  /** 最大升级层级 */
  maxEscalationLevel: 3,

  /** 重试退避序列（秒）：第 1 次 30s，第 2 次 60s，第 3 次 120s */
  stallRetryBackoff: [30, 60, 120] as const,

  /** 停滞检测间隔（秒） */
  stallCheckIntervalSec: 60,

  /** 停滞阈值（秒）：超过此时间无心跳判定为停滞 */
  stallThresholdSec: 600,
} as const;

// ══ 升级链描述（供 UI 可视化展示完整链路）══

export const ESCALATION_CHAIN: ReadonlyArray<{
  from: string;
  to: string;
  description: string;
}> = [
  {
    from: TaskState.Doing,
    to: TaskState.Assigned,
    description: '六部执行停滞 → 退回尚书省重新派发',
  },
  { from: TaskState.Next, to: TaskState.Assigned, description: '等待执行停滞 → 退回尚书省' },
  {
    from: TaskState.Assigned,
    to: TaskState.Menxia,
    description: '尚书省派发停滞 → 退回门下省复核',
  },
  {
    from: TaskState.Menxia,
    to: TaskState.Zhongshu,
    description: '门下省审议停滞 → 退回中书省重新规划',
  },
  {
    from: TaskState.Zhongshu,
    to: TaskState.Taizi,
    description: '中书省规划停滞 → 退回太子重新起草',
  },
];
