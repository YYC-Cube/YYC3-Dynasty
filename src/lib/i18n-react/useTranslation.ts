/**
 * file: useTranslation.ts
 * description: useTranslation hook（vendor 自 @yyc3/i18n-react，MIT）
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-04-24
 * updated: 2026-07-16
 * status: active
 * tags: [i18n],[react],[hook],[vendor]
 *
 * brief: useTranslation hook — zero boilerplate i18n for React（本地化内嵌）
 *
 * license: MIT
 */
import { useCallback } from 'react';
import { useI18nContext } from './I18nProvider';
import type { Locale } from '../i18n-core';

export interface UseTranslationReturn {
  /** Translate a key with optional ICU parameters */
  t: (key: string, params?: Record<string, string>) => string;
  /** Current active locale */
  locale: Locale;
  /** Change the active locale */
  setLocale: (locale: Locale) => Promise<void>;
  /** Whether the engine is ready */
  ready: boolean;
  /** The underlying I18nEngine instance */
  engine: ReturnType<typeof useI18nContext>['engine'];
}

export function useTranslation(): UseTranslationReturn {
  const ctx = useI18nContext();

  const t = useCallback(
    (key: string, params?: Record<string, string>) => ctx.t(key, params),
    [ctx],
  );

  return {
    t,
    locale: ctx.locale,
    setLocale: ctx.setLocale,
    ready: ctx.ready,
    engine: ctx.engine,
  };
}
