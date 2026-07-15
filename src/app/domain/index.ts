/**
 * file: index.ts
 * description: 领域常量模块入口 · 三省六部业务逻辑唯一真相源
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-07-16
 * updated: 2026-07-16
 * status: active
 * tags: [domain],[barrel],[entry]
 *
 * brief: 领域常量 barrel — 状态机 / 事件 Topic / 升级路径 / 通知渠道 / 文本清洗
 *
 * details:
 * - 本目录下所有模块同步自后端 edict/backend/app/ 的 Python 常量
 * - 作为前端业务逻辑的唯一真相源（single source of truth）
 * - store.ts 的 PIPE_STATE_IDX / STATE_LABEL 负责展示层映射；本模块负责领域层校验
 *
 * dependencies: none
 * exports: re-exports from state-machine, event-topics, escalation
 */

// 状态机：枚举 / 流转表 / Agent 路由 / 部门映射 / 校验函数
export {
  TaskState,
  ALL_STATES,
  TERMINAL_STATES,
  STATE_TRANSITIONS,
  STATE_AGENT_MAP,
  ORG_AGENT_MAP,
  STATE_ORG_MAP,
  AGENT_GROUP_MAP,
  BUCKET_CONFIG,
  canTransition,
  getNextStates,
  isTerminal,
  orgForState,
  stateToAgent,
  orgToAgent,
} from './state-machine';
export type { TaskStateValue, BucketConfig } from './state-machine';

// 事件 Topic：15 个标准 Topic + 中文描述
export { EventTopic, ALL_TOPICS, TOPIC_META, topicLabel, topicsByGroup } from './event-topics';
export type { EventTopicValue, TopicMeta } from './event-topics';

// 升级路径与调度器配置
export {
  ESCALATION_PATH,
  ESCALATION_CHAIN,
  SCHEDULER_CONFIG,
  escalationTarget,
} from './escalation';

// 通知渠道（飞书/Discord/Slack/Telegram/QQ/企业微信/通用 Webhook）
export {
  CHANNELS,
  DEFAULT_CHANNEL,
  getChannel,
  getChannelOptions,
  validateWebhook,
  validateUrlScheme,
  extractDomain,
  isSafeUrl,
} from './channels';
export type { NotificationChannel } from './channels';

// 文本清洗（标题/备注净化）
export { sanitizeText, sanitizeTitle, sanitizeRemark } from './sanitize';

// 技能中心（Skills Hub + Agent 映射 + OpenClaw 集成模型）
export {
  OFFICIAL_SKILLS_HUB_BASE,
  FALLBACK_HUB_BASES,
  SKILL_AGENT_MAPPING,
  COMMUNITY_SOURCES,
  OPENCLAW_CONFIG,
  SKILL_ARCHITECTURE,
  getHubSkillUrl,
  suggestAgentForSkill,
  getSkillsForAgent,
  getAllCommunitySkills,
  findCommunitySkill,
} from './skills';
export type {
  SkillManifestEntry,
  SkillManifest,
  CommunitySkill,
  SkillHubSource,
  RemoteSkillMeta,
} from './skills';
