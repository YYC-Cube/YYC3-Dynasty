/**
 * file: skills.test.ts
 * description: 技能中心领域模块测试 · Skills Hub 目录 + Agent 映射 + 社区源
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-07-16
 * updated: 2026-07-16
 * status: active
 * tags: [test],[skills],[domain],[unit]
 *
 * brief: 测试 skills.ts 的 Hub URL 构造、Agent 映射、社区源完整性
 */

import { describe, it, expect } from 'vitest';
import {
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

// ── OFFICIAL_SKILLS_HUB_BASE ──

describe('OFFICIAL_SKILLS_HUB_BASE', () => {
  it('should point to openclaw-ai/skills-hub GitHub raw', () => {
    expect(OFFICIAL_SKILLS_HUB_BASE).toContain('openclaw-ai/skills-hub');
    expect(OFFICIAL_SKILLS_HUB_BASE).toContain('raw.githubusercontent.com');
  });
});

describe('FALLBACK_HUB_BASES', () => {
  it('should have at least 2 fallback mirrors', () => {
    expect(FALLBACK_HUB_BASES.length).toBeGreaterThanOrEqual(2);
  });
});

// ── getHubSkillUrl ──

describe('getHubSkillUrl()', () => {
  it('should construct correct URL for a skill', () => {
    const url = getHubSkillUrl('code_review');
    expect(url).toBe(`${OFFICIAL_SKILLS_HUB_BASE}/code_review/SKILL.md`);
  });

  it('should support custom base', () => {
    const customBase = 'https://mirror.example.com/skills-hub/main';
    const url = getHubSkillUrl('test_framework', customBase);
    expect(url).toBe(`${customBase}/test_framework/SKILL.md`);
  });
});

// ── SKILL_AGENT_MAPPING ──

describe('SKILL_AGENT_MAPPING', () => {
  it('should have 6 official skill mappings', () => {
    expect(Object.keys(SKILL_AGENT_MAPPING)).toHaveLength(6);
  });

  it('should map code_review to bingbu/xingbu/menxia', () => {
    expect(SKILL_AGENT_MAPPING.code_review).toEqual(['bingbu', 'xingbu', 'menxia']);
  });

  it('should map security_audit to xingbu/menxia', () => {
    expect(SKILL_AGENT_MAPPING.security_audit).toEqual(['xingbu', 'menxia']);
  });

  it('should map data_analysis to hubu/menxia', () => {
    expect(SKILL_AGENT_MAPPING.data_analysis).toEqual(['hubu', 'menxia']);
  });

  it('all mapped agents should be valid agent IDs', () => {
    const validAgents = [
      'taizi',
      'zhongshu',
      'menxia',
      'shangshu',
      'hubu',
      'libu',
      'bingbu',
      'xingbu',
      'gongbu',
      'libu_hr',
      'zaochao',
    ];
    Object.values(SKILL_AGENT_MAPPING).forEach((agents) => {
      agents.forEach((agent) => {
        expect(validAgents, `Unknown agent "${agent}" in SKILL_AGENT_MAPPING`).toContain(agent);
      });
    });
  });
});

// ── suggestAgentForSkill ──

describe('suggestAgentForSkill()', () => {
  it('should return mapped agents for known skills', () => {
    expect(suggestAgentForSkill('code_review')).toEqual(['bingbu', 'xingbu', 'menxia']);
  });

  it('should return empty array for unknown skills', () => {
    expect(suggestAgentForSkill('nonexistent_skill')).toEqual([]);
  });
});

// ── getSkillsForAgent ──

describe('getSkillsForAgent()', () => {
  it('should return skills for bingbu', () => {
    const skills = getSkillsForAgent('bingbu');
    expect(skills).toContain('code_review');
    expect(skills).toContain('api_design');
  });

  it('should return skills for xingbu', () => {
    const skills = getSkillsForAgent('xingbu');
    expect(skills).toContain('code_review');
    expect(skills).toContain('security_audit');
    expect(skills).toContain('test_framework');
  });

  it('should return empty array for agents without skills', () => {
    expect(getSkillsForAgent('taizi')).toEqual([]);
    expect(getSkillsForAgent('zaochao')).toEqual([]);
  });
});

// ── COMMUNITY_SOURCES ──

describe('COMMUNITY_SOURCES', () => {
  it('should have 3 community sources', () => {
    expect(COMMUNITY_SOURCES).toHaveLength(3);
  });

  it('should include obra/superpowers', () => {
    const src = COMMUNITY_SOURCES.find((s) => s.label === 'obra/superpowers');
    expect(src).toBeDefined();
    expect(src!.skills.length).toBeGreaterThanOrEqual(10);
  });

  it('should include anthropics/skills (official)', () => {
    const src = COMMUNITY_SOURCES.find((s) => s.label === 'anthropics/skills');
    expect(src).toBeDefined();
    expect(src!.stars).toBe('官方');
  });

  it('should include ComposioHQ/awesome-claude-skills', () => {
    const src = COMMUNITY_SOURCES.find((s) => s.label === 'ComposioHQ/awesome-claude-skills');
    expect(src).toBeDefined();
  });

  it('every skill should have a name and URL', () => {
    COMMUNITY_SOURCES.forEach((src) => {
      src.skills.forEach((sk) => {
        expect(sk.name).toBeTruthy();
        expect(sk.url).toMatch(/^https:\/\/raw\.githubusercontent\.com\//);
      });
    });
  });

  it('every skill URL should end with /SKILL.md', () => {
    COMMUNITY_SOURCES.forEach((src) => {
      src.skills.forEach((sk) => {
        expect(sk.url).toMatch(/\/SKILL\.md$/);
      });
    });
  });
});

// ── getAllCommunitySkills ──

describe('getAllCommunitySkills()', () => {
  it('should return deduplicated list', () => {
    const all = getAllCommunitySkills();
    const names = all.map((s) => s.name);
    const unique = [...new Set(names)];
    expect(names.length).toBe(unique.length);
  });

  it('should have at least 20 unique skills', () => {
    const all = getAllCommunitySkills();
    expect(all.length).toBeGreaterThanOrEqual(20);
  });
});

// ── findCommunitySkill ──

describe('findCommunitySkill()', () => {
  it('should find skill by name', () => {
    const sk = findCommunitySkill('brainstorming');
    expect(sk).toBeDefined();
    expect(sk!.name).toBe('brainstorming');
  });

  it('should return undefined for unknown skill', () => {
    expect(findCommunitySkill('nonexistent')).toBeUndefined();
  });
});

// ── OPENCLAW_CONFIG ──

describe('OPENCLAW_CONFIG', () => {
  it('should have correct default values', () => {
    expect(OPENCLAW_CONFIG.bin).toBe('openclaw');
    expect(OPENCLAW_CONFIG.gatewayUrl).toBe('http://localhost:18789');
    expect(OPENCLAW_CONFIG.dispatchTimeoutSec).toBe(300);
    expect(OPENCLAW_CONFIG.heartbeatIntervalSec).toBe(30);
  });

  it('should use ~/.openclaw as home directory', () => {
    expect(OPENCLAW_CONFIG.homeDir).toBe('~/.openclaw');
  });
});

// ── SKILL_ARCHITECTURE ──

describe('SKILL_ARCHITECTURE', () => {
  it('should document the native skill path', () => {
    expect(SKILL_ARCHITECTURE.nativePath).toContain('workspace-{agent}');
    expect(SKILL_ARCHITECTURE.nativePath).toContain('skills/');
  });

  it('should document the injection manifest path', () => {
    expect(SKILL_ARCHITECTURE.injectionPath).toContain('manifest.json');
  });

  it('should document that injection is currently inactive', () => {
    expect(SKILL_ARCHITECTURE.injectionActive).toBe(false);
  });
});
