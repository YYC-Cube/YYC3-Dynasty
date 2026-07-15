/**
 * file: ar.ts
 * description: ar 语言包 — العربية (RTL)（vendor 自 @yyc3/i18n-core，MIT）
 * author: YanYuCloudCube Team
 * version: v2.4.0
 * created: 2026-04-24
 * updated: 2026-07-16
 * status: active
 * tags: [i18n],[locale],[rtl],[vendor]
 *
 * brief: العربية 语言包（本地化内嵌，RTL）
 *
 * license: MIT
 */
export const ar = {
  common: {
    health: 'الحالة',
    online: 'متصل',
    offline: 'غير متصل',
    welcome: 'مرحباً',
    save: 'حفظ',
    cancel: 'إلغاء',
    loading: 'جارٍ التحميل...',
    error: 'خطأ',
    success: 'نجاح',
    version: 'v2.0.0',
  },
  nav: {
    home: 'الرئيسية',
    about: 'حول',
    contact: 'اتصل بنا',
  },
  overview: {
    stats: {
      cronNext: 'التشغيل التالي {time}',
    },
  },
  welcome: {
    message: 'مرحباً {name}',
    title: 'مرحباً بك في YYC³ i18n Core',
  },
} as const;
