/**
 * file: index.ts
 * description: @yyc3/i18n-core 模块入口（vendor 本地化内嵌）
 * author: YanYuCloudCube Team
 * version: v2.3.0
 * created: 2026-04-24
 * updated: 2026-07-16
 * status: active
 * tags: [i18n],[vendor],[entry]
 *
 * brief: @yyc3/i18n-core 模块入口（浏览器安全子集，本地化内嵌）
 *
 * details:
 * - 本文件从原 @yyc3/i18n-core 完整 vendor 出浏览器可用子集
 * - 刻意省略 Node 专属模块：MCP Server、AI Provider、CLI、Security、
 *   infra(backoff/rate-limit/secure-random)、utils(json-file/path-guards)、
 *   detector(依赖 process.env)
 * - 这些模块会拉入 Node 内置（crypto/fs/path/timers），浏览器端不可用
 *
 * license: MIT
 */
// Core Engine
export { I18nEngine, i18n, t } from './engine';
export type { I18nEngineConfig } from './engine';

// Cache System
export { LRUCache } from './cache';
export type { CacheConfig, CacheStats } from './cache';

// Plugin System
export { PluginManager } from './plugins';
export type { I18nContext, I18nPlugin } from './plugins';

// Built-in Plugins
export { MissingKeyReporter, PerformanceTracker, createConsoleLogger } from './plugins/index';
export type {
  ConsoleLoggerConfig,
  MissingKeyReporterConfig,
  PerformanceMetrics,
  PerformanceTrackerConfig,
} from './plugins/index';

// Formatter utilities
export { formatRelativeTime, interpolate, pluralize } from './formatter';
export type { TranslateParams } from './formatter';

// Registry / Locale resolution
export { DEFAULT_LOCALE, SUPPORTED_LOCALES, isSupportedLocale } from './registry';

// RTL Utilities
export {
  RTL_LOCALES,
  createMirroredLayout,
  flipSpacing,
  getAlignment,
  getDirection,
  getOppositeAlignment,
  isRTL,
  mirrorPosition,
  setupDocumentDirection,
  transformClassForRTL,
} from './rtl-utils';

// ICU MessageFormat Engine
export { ICUParser } from './icu/parser';
export { ICUCompiler } from './icu/compiler';
export type { ICUCompileContext } from './icu/compiler';
export type {
  ICUArgument,
  ICUDate,
  ICULiteral,
  ICUNode,
  ICUNumber,
  ICUParseError,
  ICUParseResult,
  ICUPlural,
  ICUPluralClause,
  ICUSelect,
  ICUSelectClause,
  ICUSelectOrdinal,
  ICUTime,
} from './icu/types';

// Logger
export { createLogger, getLogLevel, logger, setLogLevel } from './logger';
export type { LogLevel, Logger } from './logger';

// Core Types
export type {
  HorizontalAlignment,
  Locale,
  RTLLocale,
  SpacingProperty,
  TextDirection,
  TranslationMap,
} from './types';
