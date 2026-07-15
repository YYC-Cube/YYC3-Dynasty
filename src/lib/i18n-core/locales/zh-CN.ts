/**
 * file: zh-CN.ts
 * description: zh-CN 语言包（vendor 自 @yyc3/i18n-core，MIT）
 * author: YanYuCloudCube Team
 * version: v2.3.0
 * created: 2026-04-24
 * updated: 2026-07-16
 * status: active
 * tags: [i18n],[locale],[vendor]
 *
 * brief: 简体中文语言包（本地化内嵌）
 *
 * license: MIT
 */
export const zh_CN = {
  common: {
    health: '健康状况',
    online: '在线',
    offline: '离线',
    welcome: '欢迎',
    save: '保存',
    cancel: '取消',
    loading: '加载中...',
    error: '错误',
    success: '成功',
    version: 'v2.0.0',
  },
  nav: {
    home: '首页',
    about: '关于',
    contact: '联系我们',
  },
  overview: {
    stats: {
      cronNext: '下次唤醒 {time}',
    },
  },
  welcome: {
    message: '你好 {name}',
    title: '欢迎使用 YYC³ i18n Core',
  },
} as const;
