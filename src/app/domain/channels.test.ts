/**
 * file: channels.test.ts
 * description: 通知渠道校验测试 · 域名白名单 + HTTPS 强制 + SSRF 防护
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-07-16
 * updated: 2026-07-16
 * status: active
 * tags: [test],[channels],[security],[unit]
 *
 * brief: 测试 channels.ts 的域名校验、HTTPS 强制、SSRF 防护逻辑
 */

import { describe, it, expect } from 'vitest';
import {
  CHANNELS,
  DEFAULT_CHANNEL,
  getChannel,
  validateWebhook,
  validateUrlScheme,
  extractDomain,
  isSafeUrl,
  getChannelOptions,
} from './channels';

// ── validateUrlScheme ──

describe('validateUrlScheme()', () => {
  it('should accept HTTPS URLs', () => {
    expect(validateUrlScheme('https://example.com')).toBe(true);
    expect(validateUrlScheme('https://open.feishu.cn/hook')).toBe(true);
  });

  it('should reject HTTP URLs', () => {
    expect(validateUrlScheme('http://example.com')).toBe(false);
  });

  it('should reject non-URL strings', () => {
    expect(validateUrlScheme('not-a-url')).toBe(false);
    expect(validateUrlScheme('')).toBe(false);
  });
});

// ── extractDomain ──

describe('extractDomain()', () => {
  it('should extract domain from HTTPS URL', () => {
    expect(extractDomain('https://open.feishu.cn/hook/123')).toBe('open.feishu.cn');
    expect(extractDomain('https://discord.com/api/webhooks/123/abc')).toBe('discord.com');
  });

  it('should return lowercase domain', () => {
    expect(extractDomain('https://OPEN.FEISHU.CN/hook')).toBe('open.feishu.cn');
  });

  it('should return empty string for invalid URL', () => {
    expect(extractDomain('not-a-url')).toBe('');
    expect(extractDomain('')).toBe('');
  });
});

// ── isSafeUrl (SSRF 防护) ──

describe('isSafeUrl() — SSRF protection', () => {
  it('should accept public domains', () => {
    expect(isSafeUrl('https://open.feishu.cn/hook')).toBe(true);
    expect(isSafeUrl('https://hooks.slack.com/services')).toBe(true);
  });

  it('should reject localhost', () => {
    expect(isSafeUrl('https://localhost/webhook')).toBe(false);
  });

  it('should reject 127.x loopback', () => {
    expect(isSafeUrl('https://127.0.0.1/webhook')).toBe(false);
    expect(isSafeUrl('https://127.0.0.1:8080/webhook')).toBe(false);
  });

  it('should reject private IP ranges', () => {
    expect(isSafeUrl('https://10.0.0.1/webhook')).toBe(false);
    expect(isSafeUrl('https://192.168.1.1/webhook')).toBe(false);
    expect(isSafeUrl('https://172.16.0.1/webhook')).toBe(false);
    expect(isSafeUrl('https://172.31.255.255/webhook')).toBe(false);
  });

  it('should reject link-local 169.254.x', () => {
    expect(isSafeUrl('https://169.254.169.254/latest/meta-data')).toBe(false);
  });

  it('should reject 0.0.0.0', () => {
    expect(isSafeUrl('https://0.0.0.0/webhook')).toBe(false);
  });

  it('should reject IPv6 loopback/link-local', () => {
    expect(isSafeUrl('https://[::1]/webhook')).toBe(false);
    expect(isSafeUrl('https://fe80::1/webhook')).toBe(false);
  });
});

// ── 渠道校验 ──

describe('Feishu channel', () => {
  const feishu = getChannel('feishu')!;

  it('should accept valid Feishu webhook URLs', () => {
    expect(feishu.validateWebhook('https://open.feishu.cn/open-apis/bot/v2/hook/abc123')).toBe(
      true,
    );
    expect(feishu.validateWebhook('https://open.larksuite.com/open-apis/bot/v2/hook/xyz')).toBe(
      true,
    );
  });

  it('should reject non-Feishu domains', () => {
    expect(feishu.validateWebhook('https://hooks.slack.com/services')).toBe(false);
    expect(feishu.validateWebhook('https://evil.com/hook')).toBe(false);
  });

  it('should reject HTTP (non-HTTPS) URLs', () => {
    expect(feishu.validateWebhook('http://open.feishu.cn/hook')).toBe(false);
  });
});

describe('Discord channel', () => {
  const discord = getChannel('discord')!;

  it('should accept valid Discord webhook URLs', () => {
    expect(discord.validateWebhook('https://discord.com/api/webhooks/123/abc')).toBe(true);
    expect(discord.validateWebhook('https://discordapp.com/api/webhooks/456/def')).toBe(true);
  });

  it('should reject Discord URLs without /api/webhooks/ path', () => {
    expect(discord.validateWebhook('https://discord.com/channels/123')).toBe(false);
  });

  it('should reject non-Discord domains', () => {
    expect(discord.validateWebhook('https://evil.com/api/webhooks/123')).toBe(false);
  });
});

describe('Slack channel', () => {
  const slack = getChannel('slack')!;

  it('should accept valid Slack webhook URLs', () => {
    expect(slack.validateWebhook('https://hooks.slack.com/services/T001/B001/abc123')).toBe(true);
  });

  it('should reject non-Slack domains', () => {
    expect(slack.validateWebhook('https://evil.com/services/T001')).toBe(false);
  });
});

describe('Telegram channel', () => {
  const telegram = getChannel('telegram')!;

  it('should accept valid Telegram URLs', () => {
    expect(
      telegram.validateWebhook('https://api.telegram.org/bot123:abc/sendMessage?chat_id=1'),
    ).toBe(true);
  });

  it('should reject non-Telegram domains', () => {
    expect(telegram.validateWebhook('https://evil.com/bot123/sendMessage')).toBe(false);
  });
});

describe('QQ channel', () => {
  const qq = getChannel('qq')!;

  it('should accept valid QQ bot URLs', () => {
    expect(qq.validateWebhook('https://api.sgroup.qq.com/v2/users/@me/messages')).toBe(true);
  });

  it('should reject non-QQ domains', () => {
    expect(qq.validateWebhook('https://evil.com/v2/users')).toBe(false);
  });
});

describe('WeCom channel', () => {
  const wecom = getChannel('wecom')!;

  it('should accept valid WeCom URLs', () => {
    expect(wecom.validateWebhook('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=abc')).toBe(
      true,
    );
  });

  it('should reject non-WeCom domains', () => {
    expect(wecom.validateWebhook('https://evil.com/cgi-bin/webhook/send')).toBe(false);
  });
});

describe('Generic Webhook channel', () => {
  const webhook = getChannel('webhook')!;

  it('should accept any HTTPS URL', () => {
    expect(webhook.validateWebhook('https://my-server.com/webhook/abc')).toBe(true);
    expect(webhook.validateWebhook('https://any-domain.com/hook')).toBe(true);
  });

  it('should reject HTTP URLs', () => {
    expect(webhook.validateWebhook('http://my-server.com/webhook')).toBe(false);
  });
});

// ── validateWebhook (统一入口) ──

describe('validateWebhook() — unified entry', () => {
  it('should validate by channel name', () => {
    expect(validateWebhook('feishu', 'https://open.feishu.cn/hook')).toBe(true);
    expect(validateWebhook('feishu', 'https://evil.com/hook')).toBe(false);
  });

  it('should return false for unknown channel', () => {
    expect(validateWebhook('unknown', 'https://example.com')).toBe(false);
  });
});

// ── CHANNELS 注册表 ──

describe('CHANNELS registry', () => {
  it('should have exactly 7 channels', () => {
    expect(CHANNELS).toHaveLength(7);
  });

  it('should include all expected channel names', () => {
    const names = CHANNELS.map((c) => c.name);
    expect(names).toContain('feishu');
    expect(names).toContain('discord');
    expect(names).toContain('slack');
    expect(names).toContain('telegram');
    expect(names).toContain('qq');
    expect(names).toContain('wecom');
    expect(names).toContain('webhook');
  });

  it('should have label and icon for every channel', () => {
    CHANNELS.forEach((c) => {
      expect(c.label).toBeTruthy();
      expect(c.icon).toBeTruthy();
      expect(c.placeholder).toBeTruthy();
    });
  });
});

// ── DEFAULT_CHANNEL ──

describe('DEFAULT_CHANNEL', () => {
  it('should be feishu (matching backend config)', () => {
    expect(DEFAULT_CHANNEL).toBe('feishu');
  });
});

// ── getChannelOptions ──

describe('getChannelOptions()', () => {
  it('should return options for UI dropdown', () => {
    const options = getChannelOptions();
    expect(options).toHaveLength(7);
    expect(options[0]).toHaveProperty('value');
    expect(options[0]).toHaveProperty('label');
    expect(options[0]).toHaveProperty('icon');
  });
});

// ── getChannel ──

describe('getChannel()', () => {
  it('should return channel by name', () => {
    const feishu = getChannel('feishu');
    expect(feishu).toBeDefined();
    expect(feishu?.label).toBe('飞书 Feishu');
  });

  it('should return undefined for unknown channel', () => {
    expect(getChannel('nonexistent')).toBeUndefined();
  });
});
