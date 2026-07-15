/**
 * file: ja.ts
 * description: ja 语言包 — 日本語（vendor 自 @yyc3/i18n-core，MIT）
 * author: YanYuCloudCube Team
 * version: v2.4.0
 * created: 2026-04-24
 * updated: 2026-07-16
 * status: active
 * tags: [i18n],[locale],[vendor]
 *
 * brief: 日本語言包（本地化内嵌）
 *
 * license: MIT
 */
export const ja = {
  common: {
    health: 'ヘルス',
    online: 'オンライン',
    offline: 'オフライン',
    welcome: 'ようこそ',
    save: '保存',
    cancel: 'キャンセル',
    loading: '読み込み中...',
    error: 'エラー',
    success: '成功',
    version: 'v2.0.0',
  },
  nav: {
    home: 'ホーム',
    about: '概要',
    contact: 'お問い合わせ',
  },
  overview: {
    stats: {
      cronNext: '次回起動 {time}',
    },
  },
  welcome: {
    message: 'こんにちは {name}',
    title: 'YYC³ i18n Core へようこそ',
  },
} as const;
