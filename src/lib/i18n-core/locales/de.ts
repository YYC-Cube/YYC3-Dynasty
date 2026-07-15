/**
 * file: de.ts
 * description: de 语言包 — Deutsch（vendor 自 @yyc3/i18n-core，MIT）
 * author: YanYuCloudCube Team
 * version: v2.4.0
 * created: 2026-04-24
 * updated: 2026-07-16
 * status: active
 * tags: [i18n],[locale],[vendor]
 *
 * brief: Deutsch 语言包（本地化内嵌）
 *
 * license: MIT
 */
export const de = {
  common: {
    health: 'Status',
    online: 'Online',
    offline: 'Offline',
    welcome: 'Willkommen',
    save: 'Speichern',
    cancel: 'Abbrechen',
    loading: 'Laden...',
    error: 'Fehler',
    success: 'Erfolg',
    version: 'v2.0.0',
  },
  nav: {
    home: 'Startseite',
    about: 'Über uns',
    contact: 'Kontakt',
  },
  overview: {
    stats: {
      cronNext: 'Nächste Aktivierung {time}',
    },
  },
  welcome: {
    message: 'Hallo {name}',
    title: 'Willkommen bei YYC³ i18n Core',
  },
} as const;
