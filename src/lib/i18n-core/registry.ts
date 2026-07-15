/**
 * file: registry.ts
 * description: 语言注册表与懒加载（vendor 自 @yyc3/i18n-core，MIT）
 * author: YanYuCloudCube Team
 * version: v2.3.0
 * created: 2026-04-24
 * updated: 2026-07-16
 * status: active
 * tags: [i18n],[registry],[vendor]
 *
 * brief: 语言注册表与懒加载（本地化内嵌）
 *
 * license: MIT
 */
import type { Locale, TranslationMap } from './types';

type LazyLocale = Exclude<Locale, 'en'>;
type LocaleModule = Record<string, TranslationMap>;

type LazyLocaleRegistration = {
  exportName: string;
  loader: () => Promise<LocaleModule>;
};

export const DEFAULT_LOCALE: Locale = 'en';

const LAZY_LOCALES: readonly LazyLocale[] = [
  'zh-CN',
  'zh-TW',
  'ja',
  'ko',
  'fr',
  'de',
  'es',
  'pt-BR',
  'ar',
];

const LAZY_LOCALE_REGISTRY: Record<LazyLocale, LazyLocaleRegistration> = {
  'zh-CN': {
    exportName: 'zh_CN',
    loader: () => import('./locales/zh-CN'),
  },
  'zh-TW': {
    exportName: 'zh_TW',
    loader: () => import('./locales/zh-TW'),
  },
  ja: {
    exportName: 'ja',
    loader: () => import('./locales/ja'),
  },
  ko: {
    exportName: 'ko',
    loader: () => import('./locales/ko'),
  },
  fr: {
    exportName: 'fr',
    loader: () => import('./locales/fr'),
  },
  de: {
    exportName: 'de',
    loader: () => import('./locales/de'),
  },
  es: {
    exportName: 'es',
    loader: () => import('./locales/es'),
  },
  'pt-BR': {
    exportName: 'pt_BR',
    loader: () => import('./locales/pt-BR'),
  },
  ar: {
    exportName: 'ar',
    loader: () => import('./locales/ar'),
  },
};

export const SUPPORTED_LOCALES: ReadonlyArray<Locale> = [DEFAULT_LOCALE, ...LAZY_LOCALES];

export function isSupportedLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

export async function loadLazyLocaleTranslation(locale: LazyLocale): Promise<TranslationMap> {
  const registration = LAZY_LOCALE_REGISTRY[locale];

  if (!registration) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  const module = await registration.loader();
  return module[registration.exportName] as TranslationMap;
}

export function resolveNavigatorLocale(): Locale | null {
  if (typeof navigator === 'undefined') return null;

  const browserLocales = navigator.languages || [navigator.language];

  for (const locale of browserLocales) {
    if (isSupportedLocale(locale)) {
      return locale;
    }

    // Try base language (e.g., "zh" from "zh-CN")
    const baseLang = locale.split('-')[0];
    if (baseLang && isSupportedLocale(baseLang as Locale)) {
      return baseLang as Locale;
    }
  }

  return null;
}
