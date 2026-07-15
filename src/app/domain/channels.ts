/**
 * file: channels.ts
 * description: 通知渠道抽象层 · 同步自后端 channels/*.py（策略模式）
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-07-16
 * updated: 2026-07-16
 * status: active
 * tags: [domain],[channels],[notification],[sync-backend]
 *
 * brief: 7 种通知渠道定义（飞书/Discord/Slack/Telegram/QQ/企业微信/通用 Webhook）
 *
 * details:
 * - 与后端 edict/backend/app/channels/*.py 保持同步
 * - 每个渠道含：名称/标签/图标/占位符/域名白名单/webhook 校验逻辑
 * - validateWebhook() 在前端做客户端预校验，减少无效请求
 * - 用于"宫阙规制"设置页的派发渠道配置 UI
 * - 发送操作由后端执行，前端仅做校验和 UI 展示
 *
 * dependencies: none
 * exports: NotificationChannel, CHANNELS, getChannel, validateWebhook,
 *          validateUrlScheme, extractDomain, DEFAULT_CHANNEL
 */

// ══ 渠道接口定义（对应后端 NotificationChannel Protocol）══

export interface NotificationChannel {
  /** 渠道唯一标识 */
  readonly name: string;
  /** 中文显示名称 */
  readonly label: string;
  /** 图标 emoji */
  readonly icon: string;
  /** 输入框占位符文本 */
  readonly placeholder: string;
  /** 允许的域名白名单（空数组表示不限） */
  readonly allowedDomains: readonly string[];
  /** 额外的路径校验规则（如 Discord 要求含 /api/webhooks/） */
  readonly pathRequirement?: string;

  /**
   * 校验 webhook URL 是否合法
   * 前端客户端预校验，最终校验在后端执行
   */
  validateWebhook(webhook: string): boolean;
}

// ══ 工具函数（对应后端 _validate_url_scheme / _extract_domain）══

/** 校验 URL 是否为 HTTPS 协议 */
export function validateUrlScheme(url: string): boolean {
  return url.startsWith('https://');
}

/**
 * 从 URL 中提取域名（小写）
 * 对应后端 _extract_domain()
 */
export function extractDomain(url: string): string {
  try {
    // 简单提取：https://domain/path → domain
    const match = url.match(/^https?:\/\/([^/]+)/i);
    return match ? match[1].toLowerCase() : '';
  } catch {
    return '';
  }
}

/**
 * 校验 URL 是否为合法的内网地址（防 SSRF）
 * 对应后端 utils.validate_url() 的内网检测逻辑
 * @returns true 如果 URL 安全（非内网），false 如果指向内网/回环
 */
export function isSafeUrl(url: string): boolean {
  const domain = extractDomain(url);
  if (!domain) return false;

  // 禁止 localhost / 127.x / 10.x / 172.16-31.x / 192.168.x / 169.254.x / 0.0.0.0
  const unsafePatterns = [
    /^localhost$/i,
    /^127\./,
    /^10\./,
    /^172\.(1[6-9]|2\d|3[01])\./,
    /^192\.168\./,
    /^169\.254\./,
    /^0\.0\.0\.0$/,
    /^\[?::1\]?$/, // IPv6 loopback
    /^fe80:/i, // IPv6 link-local
    /^fc00:/i, // IPv6 unique local
    /^fd/i, // IPv6 unique local
  ];

  return !unsafePatterns.some((p) => p.test(domain));
}

// ══ 7 种渠道定义（与后端 channels/*.py 同步）══

/** 飞书 Feishu */
const feishu: NotificationChannel = {
  name: 'feishu',
  label: '飞书 Feishu',
  icon: '💬',
  placeholder: 'https://open.feishu.cn/open-apis/bot/v2/hook/...',
  allowedDomains: ['open.feishu.cn', 'open.larksuite.com'],
  validateWebhook(webhook: string): boolean {
    if (!validateUrlScheme(webhook)) return false;
    const domain = extractDomain(webhook);
    return this.allowedDomains.some((d) => domain.endsWith(d));
  },
};

/** Discord */
const discord: NotificationChannel = {
  name: 'discord',
  label: 'Discord',
  icon: '🎮',
  placeholder: 'https://discord.com/api/webhooks/.../...',
  allowedDomains: ['discord.com', 'discordapp.com'],
  pathRequirement: '/api/webhooks/',
  validateWebhook(webhook: string): boolean {
    if (!validateUrlScheme(webhook)) return false;
    const domain = extractDomain(webhook);
    return (
      this.allowedDomains.some((d) => domain.endsWith(d)) && webhook.includes(this.pathRequirement!)
    );
  },
};

/** Slack */
const slack: NotificationChannel = {
  name: 'slack',
  label: 'Slack',
  icon: '💬',
  placeholder: 'https://hooks.slack.com/services/T.../B.../...',
  allowedDomains: ['hooks.slack.com'],
  validateWebhook(webhook: string): boolean {
    if (!validateUrlScheme(webhook)) return false;
    const domain = extractDomain(webhook);
    return this.allowedDomains.some((d) => domain.endsWith(d));
  },
};

/** Telegram */
const telegram: NotificationChannel = {
  name: 'telegram',
  label: 'Telegram',
  icon: '✈️',
  placeholder: 'https://api.telegram.org/bot<TOKEN>/sendMessage?chat_id=<CHAT_ID>',
  allowedDomains: ['api.telegram.org'],
  validateWebhook(webhook: string): boolean {
    if (!validateUrlScheme(webhook)) return false;
    const domain = extractDomain(webhook);
    return this.allowedDomains.some((d) => domain.endsWith(d));
  },
};

/** QQ 机器人 */
const qq: NotificationChannel = {
  name: 'qq',
  label: 'QQ 机器人',
  icon: '🐧',
  placeholder: 'https://api.sgroup.qq.com/v2/users/{openid}/messages?appid=XXX&secret=YYY',
  allowedDomains: ['api.sgroup.qq.com'],
  validateWebhook(webhook: string): boolean {
    if (!validateUrlScheme(webhook)) return false;
    const domain = extractDomain(webhook);
    return this.allowedDomains.some((d) => domain.endsWith(d));
  },
};

/** 企业微信 WeCom */
const wecom: NotificationChannel = {
  name: 'wecom',
  label: '企业微信 WeCom',
  icon: '💼',
  placeholder: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=...',
  allowedDomains: ['qyapi.weixin.qq.com'],
  validateWebhook(webhook: string): boolean {
    if (!validateUrlScheme(webhook)) return false;
    const domain = extractDomain(webhook);
    return this.allowedDomains.some((d) => domain.endsWith(d));
  },
};

/** 通用 Webhook（不限域名，仅校验 HTTPS） */
const webhook: NotificationChannel = {
  name: 'webhook',
  label: '通用 Webhook',
  icon: '🔗',
  placeholder: 'https://your-server.com/webhook/...',
  allowedDomains: [],
  validateWebhook(webhook: string): boolean {
    return validateUrlScheme(webhook);
  },
};

// ══ 渠道注册表 ══

export const CHANNELS: readonly NotificationChannel[] = [
  feishu,
  discord,
  slack,
  telegram,
  qq,
  wecom,
  webhook,
];

/** 默认渠道（与后端 config.py default_dispatch_channel 同步） */
export const DEFAULT_CHANNEL = 'feishu';

/**
 * 按名称获取渠道定义
 */
export function getChannel(name: string): NotificationChannel | undefined {
  return CHANNELS.find((c) => c.name === name);
}

/**
 * 校验指定渠道的 webhook URL
 * @param channelName 渠道名称
 * @param webhook webhook URL
 * @returns true 如果校验通过
 */
export function validateWebhook(channelName: string, webhook: string): boolean {
  const channel = getChannel(channelName);
  if (!channel) return false;
  return channel.validateWebhook(webhook);
}

/**
 * 获取所有渠道的选项列表（用于 UI 下拉选择器）
 */
export function getChannelOptions(): Array<{ value: string; label: string; icon: string }> {
  return CHANNELS.map((c) => ({
    value: c.name,
    label: c.label,
    icon: c.icon,
  }));
}
