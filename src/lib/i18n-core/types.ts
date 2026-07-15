/**
 * file: types.ts
 * description: i18n 核心类型定义（vendor 自 @yyc3/i18n-core，MIT）
 * author: YanYuCloudCube Team
 * version: v2.3.0
 * created: 2026-04-24
 * updated: 2026-07-16
 * status: active
 * tags: [i18n],[types],[vendor]
 *
 * brief: @yyc3/i18n-core 核心类型定义（本地化内嵌，避免 file: 本地路径依赖）
 *
 * license: MIT
 */
export type TranslationMap = { [key: string]: string | TranslationMap };

export type Locale = 'en' | 'zh-CN' | 'zh-TW' | 'ja' | 'ko' | 'fr' | 'de' | 'es' | 'pt-BR' | 'ar';

export type RTLLocale = Extract<Locale, 'ar'>;

export type TextDirection = 'ltr' | 'rtl' | 'auto';

export type HorizontalAlignment = 'left' | 'right';

export type SpacingProperty = 'marginLeft' | 'marginRight' | 'paddingLeft' | 'paddingRight';

export interface I18nConfig {
  locale: Locale;
  fallbackLocale: Locale;
  translations: Partial<Record<Locale, TranslationMap>>;
  rtlSupport?: boolean;
}
