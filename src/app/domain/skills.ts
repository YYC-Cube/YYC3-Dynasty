/**
 * file: skills.ts
 * description: 技能中心领域模块 · Skills Hub 目录 + Agent 映射 + OpenClaw 集成模型
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-07-16
 * updated: 2026-07-16
 * status: active
 * tags: [domain],[skills],[openclaw],[sync-backend]
 *
 * brief: 技能生命周期定义、官方 Skills Hub 目录、技能→Agent 智能映射
 *
 * details:
 * - 同步自后端 scripts/skill_manager.py 的 SKILL_AGENT_MAPPING 和 OFFICIAL_SKILLS_HUB_BASE
 * - 社区技能源同步自 Framework 前端 SkillsConfig.tsx 的 COMMUNITY_SOURCES
 * - OpenClaw 集成模型：CLI 子进程调用（非 HTTP Gateway），技能加载两层架构
 *
 * dependencies: none
 * exports: SkillManifest, SkillHubSource, SKILL_AGENT_MAPPING, COMMUNITY_SOURCES,
 *          OFFICIAL_SKILLS_HUB_BASE, suggestAgentForSkill, getSkillsForAgent
 */

// ══ 类型定义 ══

/** 技能清单条目（对应 agents/{id}/skills/manifest.json 格式） */
export interface SkillManifestEntry {
  /** 匹配标签（任务 tags 任一命中即加载） */
  matchTags: string[];
  /** 匹配部门（任务 org 命中即加载） */
  matchOrgs: string[];
  /** 技能文件路径（相对于 manifest.json） */
  file: string;
}

/** 技能清单文件 */
export interface SkillManifest {
  skills: SkillManifestEntry[];
}

/** 社区技能源中的单个技能 */
export interface CommunitySkill {
  /** 技能名称（同时作为目录名） */
  name: string;
  /** SKILL.md 的 raw URL */
  url: string;
  /** 中文描述（可选，用于 UI 展示） */
  description?: string;
}

/** 社区技能源（GitHub 仓库） */
export interface SkillHubSource {
  /** 仓库标识（org/repo 格式） */
  label: string;
  /** 图标 emoji */
  emoji: string;
  /** Star 数或标签（如 "官方"） */
  stars: string;
  /** 中文简介 */
  desc: string;
  /** 该源下的技能列表 */
  skills: CommunitySkill[];
}

/** 远程技能元数据（对应后端 .source.json） */
export interface RemoteSkillMeta {
  skillName: string;
  agentId: string;
  sourceUrl: string;
  description: string;
  addedAt: string;
  lastUpdated: string;
  /** SHA256 前 16 字符（变更检测用） */
  checksum?: string;
  status: 'valid' | 'not-found' | string;
}

// ══ 官方 Skills Hub（同步自 skill_manager.py:234-262）══

export const OFFICIAL_SKILLS_HUB_BASE =
  'https://raw.githubusercontent.com/openclaw-ai/skills-hub/main';

export const FALLBACK_HUB_BASES = [
  'https://ghproxy.com/https://raw.githubusercontent.com/openclaw-ai/skills-hub/main',
  'https://raw.gitmirror.com/openclaw-ai/skills-hub/main',
];

/**
 * 获取官方 Hub 中某技能的 URL
 * 对应 skill_manager.py 的 _get_hub_url()
 */
export function getHubSkillUrl(skillName: string, base: string = OFFICIAL_SKILLS_HUB_BASE): string {
  return `${base}/${skillName}/SKILL.md`;
}

// ══ 技能→Agent 映射（同步自 skill_manager.py:264-271）══
// 官方预定义技能的推荐 Agent 分配

export const SKILL_AGENT_MAPPING: Readonly<Record<string, readonly string[]>> = {
  code_review: ['bingbu', 'xingbu', 'menxia'],
  api_design: ['bingbu', 'gongbu', 'menxia'],
  security_audit: ['xingbu', 'menxia'],
  data_analysis: ['hubu', 'menxia'],
  doc_generation: ['libu', 'menxia'],
  test_framework: ['gongbu', 'xingbu', 'menxia'],
};

/**
 * 根据技能名推荐 Agent（使用官方映射表）
 * @param skillName 技能名（kebab-case）
 * @returns 推荐 Agent ID 数组，空数组表示无映射
 */
export function suggestAgentForSkill(skillName: string): string[] {
  return [...(SKILL_AGENT_MAPPING[skillName] || [])];
}

/**
 * 获取某 Agent 拥有的全部官方技能
 * @param agentId Agent ID
 * @returns 技能名数组
 */
export function getSkillsForAgent(agentId: string): string[] {
  return Object.entries(SKILL_AGENT_MAPPING)
    .filter(([, agents]) => agents.includes(agentId))
    .map(([skill]) => skill);
}

// ══ 社区技能源（同步自 SkillsConfig.tsx COMMUNITY_SOURCES）══

export const COMMUNITY_SOURCES: readonly SkillHubSource[] = [
  {
    label: 'obra/superpowers',
    emoji: '⚡',
    stars: '66.9k',
    desc: '完整开发工作流技能集',
    skills: [
      {
        name: 'brainstorming',
        url: 'https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/skills/brainstorming/SKILL.md',
      },
      {
        name: 'test-driven-development',
        url: 'https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/skills/test-driven-development/SKILL.md',
      },
      {
        name: 'systematic-debugging',
        url: 'https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/skills/systematic-debugging/SKILL.md',
      },
      {
        name: 'subagent-driven-development',
        url: 'https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/skills/subagent-driven-development/SKILL.md',
      },
      {
        name: 'writing-plans',
        url: 'https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/skills/writing-plans/SKILL.md',
      },
      {
        name: 'executing-plans',
        url: 'https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/skills/executing-plans/SKILL.md',
      },
      {
        name: 'requesting-code-review',
        url: 'https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/skills/requesting-code-review/SKILL.md',
      },
      {
        name: 'root-cause-tracing',
        url: 'https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/skills/root-cause-tracing/SKILL.md',
      },
      {
        name: 'verification-before-completion',
        url: 'https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/skills/verification-before-completion/SKILL.md',
      },
      {
        name: 'dispatching-parallel-agents',
        url: 'https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/skills/dispatching-parallel-agents/SKILL.md',
      },
    ],
  },
  {
    label: 'anthropics/skills',
    emoji: '🏛️',
    stars: '官方',
    desc: 'Anthropic 官方技能库',
    skills: [
      {
        name: 'docx',
        url: 'https://raw.githubusercontent.com/anthropics/skills/main/skills/docx/SKILL.md',
      },
      {
        name: 'pdf',
        url: 'https://raw.githubusercontent.com/anthropics/skills/main/skills/pdf/SKILL.md',
      },
      {
        name: 'xlsx',
        url: 'https://raw.githubusercontent.com/anthropics/skills/main/skills/xlsx/SKILL.md',
      },
      {
        name: 'pptx',
        url: 'https://raw.githubusercontent.com/anthropics/skills/main/skills/pptx/SKILL.md',
      },
      {
        name: 'mcp-builder',
        url: 'https://raw.githubusercontent.com/anthropics/skills/main/skills/mcp-builder/SKILL.md',
      },
      {
        name: 'frontend-design',
        url: 'https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md',
      },
      {
        name: 'web-artifacts-builder',
        url: 'https://raw.githubusercontent.com/anthropics/skills/main/skills/web-artifacts-builder/SKILL.md',
      },
      {
        name: 'webapp-testing',
        url: 'https://raw.githubusercontent.com/anthropics/skills/main/skills/webapp-testing/SKILL.md',
      },
      {
        name: 'algorithmic-art',
        url: 'https://raw.githubusercontent.com/anthropics/skills/main/skills/algorithmic-art/SKILL.md',
      },
      {
        name: 'canvas-design',
        url: 'https://raw.githubusercontent.com/anthropics/skills/main/skills/canvas-design/SKILL.md',
      },
    ],
  },
  {
    label: 'ComposioHQ/awesome-claude-skills',
    emoji: '🌐',
    stars: '39.2k',
    desc: '100+ 社区精选技能',
    skills: [
      {
        name: 'github-integration',
        url: 'https://raw.githubusercontent.com/ComposioHQ/awesome-claude-skills/master/github-integration/SKILL.md',
      },
      {
        name: 'data-analysis',
        url: 'https://raw.githubusercontent.com/ComposioHQ/awesome-claude-skills/master/data-analysis/SKILL.md',
      },
      {
        name: 'code-review',
        url: 'https://raw.githubusercontent.com/ComposioHQ/awesome-claude-skills/master/code-review/SKILL.md',
      },
    ],
  },
] as const;

/**
 * 获取所有社区技能的去重列表
 */
export function getAllCommunitySkills(): CommunitySkill[] {
  const seen = new Set<string>();
  const all: CommunitySkill[] = [];
  for (const src of COMMUNITY_SOURCES) {
    for (const sk of src.skills) {
      if (!seen.has(sk.name)) {
        seen.add(sk.name);
        all.push(sk);
      }
    }
  }
  return all;
}

/**
 * 按技能名搜索社区技能
 */
export function findCommunitySkill(name: string): CommunitySkill | undefined {
  return getAllCommunitySkills().find((s) => s.name === name);
}

// ══ OpenClaw 集成模型 ══

/**
 * OpenClaw 集成参数（对应后端 config.py 的 OpenClaw 相关字段）
 */
export const OPENCLAW_CONFIG = {
  /** 默认 OpenClaw 二进制路径 */
  bin: 'openclaw',

  /** 默认 Gateway URL（⚠️ 后端已定义但未使用——后端用 CLI 子进程而非 HTTP） */
  gatewayUrl: 'http://localhost:18789',

  /** 派发超时（秒） */
  dispatchTimeoutSec: 300,

  /** 心跳间隔（秒） */
  heartbeatIntervalSec: 30,

  /** OpenClaw Home 目录默认路径 */
  homeDir: '~/.openclaw',
} as const;

/**
 * 技能加载架构说明
 *
 * 存在两层技能系统（互不冲突）：
 *
 * 1. OpenClaw 原生层：
 *    ~/.openclaw/workspace-{agent}/skills/xxx/SKILL.md
 *    → 由 OpenClaw 运行时在 Agent 会话启动时自动加载
 *    → 远程技能通过 skill_manager.py add_remote() 写入此目录
 *
 * 2. Edict 注入层（dispatch_worker._load_agent_skills）：
 *    agents/{agent}/skills/manifest.json + 匹配的 SKILL.md
 *    → 在 DispatchWorker 构建提示词时，按 task tags/org 匹配后注入消息
 *    → ⚠️ 当前无 manifest.json 文件，此层是 no-op
 */
export const SKILL_ARCHITECTURE = {
  nativePath: '~/.openclaw/workspace-{agent}/skills/',
  injectionPath: 'agents/{agent}/skills/manifest.json',
  injectionActive: false, // 后端未创建 manifest.json
} as const;
