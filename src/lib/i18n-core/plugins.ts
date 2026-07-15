/**
 * file: plugins.ts
 * description: i18n 插件系统（vendor 自 @yyc3/i18n-core，MIT）
 * author: YanYuCloudCube Team
 * version: v2.3.0
 * created: 2026-04-24
 * updated: 2026-07-16
 * status: active
 * tags: [i18n],[plugin],[vendor]
 *
 * brief: @yyc3/i18n-core 插件系统（本地化内嵌）
 *
 * license: MIT
 */
import { logger } from './logger';
import type { Locale } from './types';

export type I18nContext = {
  locale: Locale;
  key: string;
  params?: Record<string, string>;
  result?: string;
};

export type I18nPlugin = {
  name: string;
  version?: string;

  // Lifecycle hooks
  init?: (context: I18nContext) => void | Promise<void>;
  destroy?: () => void | Promise<void>;

  // Translation hooks (executed in order)
  beforeTranslate?: (
    key: string,
    params?: Record<string, string>,
  ) => { key: string; params?: Record<string, string> } | void;
  afterTranslate?: (result: string, key: string, params?: Record<string, string>) => string | void;

  // System hooks
  onLocaleChange?: (newLocale: Locale, oldLocale: Locale) => void;
  onError?: (error: Error, context: I18nContext) => void;
  onMissingKey?: (key: string, locale: Locale) => string | void;
};

export class PluginManager {
  private plugins = new Map<string, I18nPlugin>();
  private hookOrder: string[] = [];

  register(plugin: I18nPlugin): void {
    if (this.plugins.has(plugin.name)) {
      logger.warn(`Plugin "${plugin.name}" is already registered. Overwriting.`);
    }

    this.plugins.set(plugin.name, plugin);

    if (!this.hookOrder.includes(plugin.name)) {
      this.hookOrder.push(plugin.name);
    }

    logger.info(
      `✅ Plugin "${plugin.name}" registered${plugin.version ? ` v${plugin.version}` : ''}`,
    );
  }

  unregister(name: string): boolean {
    const plugin = this.plugins.get(name);
    if (!plugin) return false;

    if (plugin.destroy) {
      plugin.destroy();
    }

    this.plugins.delete(name);
    this.hookOrder = this.hookOrder.filter((n) => n !== name);

    logger.info(`🗑️ Plugin "${name}" unregistered`);
    return true;
  }

  getPlugin(name: string): I18nPlugin | undefined {
    return this.plugins.get(name);
  }

  getRegisteredPlugins(): string[] {
    return [...this.hookOrder];
  }

  async initAll(context: I18nContext): Promise<void> {
    for (const name of this.hookOrder) {
      const plugin = this.plugins.get(name);
      if (plugin?.init) {
        await plugin.init(context);
      }
    }
  }

  async destroyAll(): Promise<void> {
    for (const name of this.hookOrder) {
      const plugin = this.plugins.get(name);
      if (plugin?.destroy) {
        await plugin.destroy();
      }
    }
    this.plugins.clear();
    this.hookOrder = [];
  }

  executeBeforeTranslate(
    key: string,
    params?: Record<string, string>,
  ): { key: string; params?: Record<string, string> } {
    let currentKey = key;
    let currentParams = params;

    for (const name of this.hookOrder) {
      const plugin = this.plugins.get(name);
      if (plugin?.beforeTranslate) {
        const result = plugin.beforeTranslate(currentKey, currentParams);
        if (result) {
          currentKey = result.key;
          currentParams = result.params;
        }
      }
    }

    return { key: currentKey, params: currentParams };
  }

  executeAfterTranslate(result: string, key: string, params?: Record<string, string>): string {
    let currentResult = result;

    for (const name of this.hookOrder) {
      const plugin = this.plugins.get(name);
      if (plugin?.afterTranslate) {
        const modified = plugin.afterTranslate(currentResult, key, params);
        if (modified !== undefined) {
          currentResult = modified as string;
        }
      }
    }

    return currentResult;
  }

  notifyLocaleChange(newLocale: Locale, oldLocale: Locale): void {
    for (const name of this.hookOrder) {
      const plugin = this.plugins.get(name);
      plugin?.onLocaleChange?.(newLocale, oldLocale);
    }
  }

  handleError(error: Error, context: I18nContext): void {
    for (const name of this.hookOrder) {
      const plugin = this.plugins.get(name);
      const handler = plugin?.onError;
      if (handler) {
        handler(error, context);
      }
    }
  }

  handleMissingKey(key: string, locale: Locale): string | undefined {
    let fallback: string | undefined;

    for (const name of this.hookOrder) {
      const plugin = this.plugins.get(name);
      const handler = plugin?.onMissingKey;
      if (handler) {
        const result = handler(key, locale);
        if (result !== undefined) {
          fallback = result as string | undefined;
        }
      }
    }

    return fallback;
  }
}
