/**
 * file: event-topics.ts
 * description: 事件 Topic 常量 · 同步自后端 services/event_bus.py
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-07-16
 * updated: 2026-07-16
 * status: active
 * tags: [domain],[events],[sync-backend]
 *
 * brief: 15 个标准事件 Topic 常量 + 中文描述映射
 *
 * details:
 * - 与后端 edict/backend/app/services/event_bus.py 的 TOPIC_* 常量保持同步
 * - 用于 WebSocket 事件流过滤 UI、事件查询页面的 topic 选择器
 * - TOPIC_META 提供每个 topic 的中文名和描述，供 UI 展示
 *
 * dependencies: none
 * exports: EventTopic, ALL_TOPICS, TOPIC_META
 */

// ══ 事件 Topic 常量（15 个，与后端 event_bus.py 同步）══

export const EventTopic = {
  // 任务生命周期
  TaskCreated: 'task.created',
  TaskPlanningRequest: 'task.planning.request',
  TaskPlanningComplete: 'task.planning.complete',
  TaskReviewRequest: 'task.review.request',
  TaskReviewResult: 'task.review.result',
  TaskDispatch: 'task.dispatch',
  TaskStatus: 'task.status',
  TaskCompleted: 'task.completed',
  TaskClosed: 'task.closed',
  TaskReplan: 'task.replan',
  TaskStalled: 'task.stalled',
  TaskEscalated: 'task.escalated',

  // Agent 生命周期
  AgentThoughts: 'agent.thoughts',
  AgentTodoUpdate: 'agent.todo.update',
  AgentHeartbeat: 'agent.heartbeat',
} as const;

export type EventTopicValue = (typeof EventTopic)[keyof typeof EventTopic];

/** 所有 Topic 列表（排序与后端一致） */
export const ALL_TOPICS = Object.values(EventTopic);

// ══ Topic 中文描述映射 ══

export interface TopicMeta {
  name: string;
  label: string;
  description: string;
  /** 分组：用于 UI 折叠展示 */
  group: 'task' | 'agent';
}

export const TOPIC_META: ReadonlyArray<TopicMeta> = [
  // 任务生命周期
  {
    name: EventTopic.TaskCreated,
    label: '任务创建',
    description: '新任务创建时触发',
    group: 'task',
  },
  {
    name: EventTopic.TaskPlanningRequest,
    label: '规划请求',
    description: '请求规划方案',
    group: 'task',
  },
  {
    name: EventTopic.TaskPlanningComplete,
    label: '规划完成',
    description: '规划方案完成',
    group: 'task',
  },
  {
    name: EventTopic.TaskReviewRequest,
    label: '审议请求',
    description: '请求门下省审议',
    group: 'task',
  },
  {
    name: EventTopic.TaskReviewResult,
    label: '审议结果',
    description: '审议结果（准奏/封驳）',
    group: 'task',
  },
  {
    name: EventTopic.TaskDispatch,
    label: '任务派发',
    description: '任务派发至 Agent',
    group: 'task',
  },
  { name: EventTopic.TaskStatus, label: '状态变更', description: '任务状态流转', group: 'task' },
  { name: EventTopic.TaskCompleted, label: '任务完成', description: '任务执行完成', group: 'task' },
  { name: EventTopic.TaskClosed, label: '任务关闭', description: '任务最终关闭', group: 'task' },
  {
    name: EventTopic.TaskReplan,
    label: '重新规划',
    description: '任务需要重新规划',
    group: 'task',
  },
  {
    name: EventTopic.TaskStalled,
    label: '任务停滞',
    description: '任务长时间无进展',
    group: 'task',
  },
  {
    name: EventTopic.TaskEscalated,
    label: '任务升级',
    description: '任务升级至上级部门',
    group: 'task',
  },
  // Agent 生命周期
  {
    name: EventTopic.AgentThoughts,
    label: 'Agent 思考',
    description: 'Agent 推理过程',
    group: 'agent',
  },
  {
    name: EventTopic.AgentTodoUpdate,
    label: '待办更新',
    description: 'Agent 子任务状态更新',
    group: 'agent',
  },
  {
    name: EventTopic.AgentHeartbeat,
    label: 'Agent 心跳',
    description: 'Agent 存活心跳',
    group: 'agent',
  },
];

/** 获取 Topic 的中文标签 */
export function topicLabel(topic: string): string {
  return TOPIC_META.find((t) => t.name === topic)?.label ?? topic;
}

/** 按 group 过滤 Topic */
export function topicsByGroup(group: 'task' | 'agent'): TopicMeta[] {
  return TOPIC_META.filter((t) => t.group === group);
}
