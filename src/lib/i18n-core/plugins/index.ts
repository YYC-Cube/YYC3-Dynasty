/**
 * file: index.ts
 * description: 内置插件入口（vendor 自 @yyc3/i18n-core，MIT）
 * author: YanYuCloudCube Team
 * version: v2.3.0
 * created: 2026-04-24
 * updated: 2026-07-16
 * status: active
 * tags: [i18n],[plugin],[vendor]
 *
 * brief: 内置插件入口（本地化内嵌）
 *
 * license: MIT
 */
export { createConsoleLogger } from './console-logger';
export type { ConsoleLoggerConfig } from './console-logger';

export { MissingKeyReporter } from './missing-key-reporter';
export type { MissingKeyReporterConfig } from './missing-key-reporter';

export { PerformanceTracker } from './performance-tracker';
export type { PerformanceTrackerConfig, PerformanceMetrics } from './performance-tracker';
