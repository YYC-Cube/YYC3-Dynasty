/**
 * file: zh-TW.ts
 * description: zh-TW 语言包（vendor 自 @yyc3/i18n-core，MIT）
 * author: YanYuCloudCube Team
 * version: v2.3.0
 * created: 2026-04-24
 * updated: 2026-07-16
 * status: active
 * tags: [i18n],[locale],[vendor]
 *
 * brief: 繁體中文語言包（本地化內嵌）
 *
 * license: MIT
 */
export const zh_TW = {
  common: {
    health: '健康狀態',
    online: '線上',
    offline: '離線',
    welcome: '歡迎',
    save: '儲存',
    cancel: '取消',
    loading: '載入中...',
    error: '錯誤',
    success: '成功',
    version: 'v2.0.0',
  },
  nav: {
    home: '首頁',
    about: '關於',
    contact: '聯絡我們',
  },
  overview: {
    stats: {
      cronNext: '下次喚醒 {time}',
    },
  },
  welcome: {
    message: '你好 {name}',
    title: '歡迎使用 YYC³ i18n Core',
  },
} as const;
