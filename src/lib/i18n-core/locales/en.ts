/**
 * file: en.ts
 * description: en 语言包（vendor 自 @yyc3/i18n-core，MIT）
 * author: YanYuCloudCube Team
 * version: v2.3.0
 * created: 2026-04-24
 * updated: 2026-07-16
 * status: active
 * tags: [i18n],[locale],[vendor]
 *
 * brief: 英文语言包（本地化内嵌）
 *
 * license: MIT
 */
export const en = {
  common: {
    health: 'Health',
    online: 'Online',
    offline: 'Offline',
    welcome: 'Welcome',
    save: 'Save',
    cancel: 'Cancel',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    version: 'v2.0.0',
  },
  nav: {
    home: 'Home',
    about: 'About',
    contact: 'Contact',
  },
  overview: {
    stats: {
      cronNext: 'Next wake {time}',
    },
  },
  welcome: {
    message: 'Hello {name}',
    title: 'Welcome to YYC³ i18n Core',
  },
} as const;
