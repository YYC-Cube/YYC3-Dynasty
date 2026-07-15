/**
 * file: index.ts
 * description: @yyc3/i18n-react 模块入口（vendor 本地化内嵌）
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-04-24
 * updated: 2026-07-16
 * status: active
 * tags: [i18n],[react],[vendor],[entry]
 *
 * brief: @yyc3/i18n-react 公共 API（本地化内嵌）
 *
 * license: MIT
 */
export {
  I18nProvider,
  useI18nContext,
  type I18nProviderProps,
  type I18nContextValue,
} from './I18nProvider';
export { useTranslation, type UseTranslationReturn } from './useTranslation';
export { Trans, type TransProps } from './Trans';
