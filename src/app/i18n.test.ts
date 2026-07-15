/**
 * file: i18n.test.ts
 * description: 国际化模块单元测试 · i18n-core 引擎适配层
 * author: YanYuCloudCube Team
 * version: v2.1.0
 * created: 2026-07-12
 * updated: 2026-07-12
 * status: active
 * tags: [test],[i18n],[unit]
 *
 * brief: 测试 Dynasty i18n 适配层：t() 翻译、参数插值、语言切换、语言列表
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  engine,
  t,
  getLocale,
  setLocale,
  onLocaleChange,
  getAvailableLocales,
  SUPPORTED_LOCALES,
  LANG_META,
  isRTL,
} from './i18n';
import type { Locale } from '@/lib/i18n-core';

beforeEach(async () => {
  await engine.setLocale('zh-CN');
});

// ── SUPPORTED_LOCALES ──

describe('SUPPORTED_LOCALES', () => {
  it('should contain exactly 10 supported locales', () => {
    expect(SUPPORTED_LOCALES).toHaveLength(10);
  });

  it('should include zh-CN and en', () => {
    expect(SUPPORTED_LOCALES).toContain('zh-CN');
    expect(SUPPORTED_LOCALES).toContain('en');
    expect(SUPPORTED_LOCALES).toContain('zh-TW');
  });
});

// ── t() 翻译函数 ──

describe('t()', () => {
  describe('with zh-CN locale', () => {
    beforeEach(async () => {
      await engine.setLocale('zh-CN');
    });

    it('should return zh-CN translation for known keys', () => {
      expect(t('dynasty.title')).toBe('三省六部 · 总控台');
      expect(t('sync.ok')).toBe('同步正常');
      expect(t('tab.edicts')).toBe('旨意看板');
    });

    it('should substitute {param} placeholders', () => {
      expect(t('edict.count', { count: '5' })).toBe('5 道旨意');
      expect(t('time.minutesAgo', { n: '10' })).toBe('10分钟前');
    });

    it('should accept number params (auto-converted to string)', () => {
      expect(t('edict.count', { count: 5 })).toBe('5 道旨意');
    });

    it('should return the raw key for unknown keys', () => {
      expect(t('nonexistent.key.xyz')).toBe('nonexistent.key.xyz');
    });
  });

  describe('with en locale', () => {
    beforeEach(async () => {
      await engine.setLocale('en');
    });

    it('should return English translation for known keys', () => {
      expect(t('dynasty.title')).toBe('Sansheng-Liubu · Dashboard');
      expect(t('sync.ok')).toBe('Sync OK');
      expect(t('tab.edicts')).toBe('Edict Board');
    });

    it('should substitute {param} placeholders in English', () => {
      expect(t('edict.count', { count: '3' })).toBe('3 edicts');
      expect(t('time.hoursAgo', { n: '2' })).toBe('2h ago');
    });
  });

  describe('non-zh-CN/non-en locales have real translations', () => {
    it('should return Japanese translation for ja locale', async () => {
      await engine.setLocale('ja');
      expect(t('sync.ok')).toBe('同期OK');
    });

    it('should return Korean translation for ko locale', async () => {
      await engine.setLocale('ko');
      expect(t('sync.ok')).toBe('동기화 정상');
    });

    it('should return French translation for fr locale', async () => {
      await engine.setLocale('fr');
      expect(t('sync.ok')).toBe('Synchro OK');
    });

    it('should return German translation for de locale', async () => {
      await engine.setLocale('de');
      expect(t('sync.ok')).toBe('Sync OK');
    });

    it('should return Spanish translation for es locale', async () => {
      await engine.setLocale('es');
      expect(t('sync.ok')).toBe('Sincronización OK');
    });

    it('should return Portuguese translation for pt-BR locale', async () => {
      await engine.setLocale('pt-BR');
      expect(t('sync.ok')).toBe('Sincronização OK');
    });

    it('should return Arabic translation for ar locale', async () => {
      await engine.setLocale('ar');
      expect(t('sync.ok')).toBe('المزامنة جيدة');
    });

    it('should return Traditional Chinese for zh-TW locale', async () => {
      await engine.setLocale('zh-TW');
      expect(t('sync.ok')).toBe('同步正常');
    });

    it('should return translated tab labels for ja', async () => {
      await engine.setLocale('ja');
      expect(t('tab.edicts')).toBe('旨意ボード');
    });

    it('should return translated action labels for ar', async () => {
      await engine.setLocale('ar');
      expect(t('action.approve')).toBe('موافقة');
    });
  });
});

// ── getLocale() / setLocale() ──

describe('setLocale() / getLocale()', () => {
  it('should update the current locale', async () => {
    await setLocale('en');
    expect(getLocale()).toBe('en');
  });

  it('should handle zh-CN', async () => {
    await setLocale('zh-CN');
    expect(getLocale()).toBe('zh-CN');
  });
});

// ── onLocaleChange() ──

describe('onLocaleChange()', () => {
  it('should return an unsubscribe function', () => {
    const unsub = onLocaleChange(() => {});
    expect(typeof unsub).toBe('function');
    unsub();
  });

  it('should stop receiving events after unsubscribe', async () => {
    let received: Locale | null = null;
    const unsub = onLocaleChange((l) => {
      received = l;
    });

    unsub();
    await engine.setLocale('en');

    expect(received).toBeNull();
  });
});

// ── getAvailableLocales() ──

describe('getAvailableLocales()', () => {
  it('should return all 10 locales with metadata', () => {
    const available = getAvailableLocales();
    expect(available).toHaveLength(10);
  });

  it('should include id, label, native, and flag for each locale', () => {
    const available = getAvailableLocales();
    available.forEach((locale) => {
      expect(locale).toHaveProperty('id');
      expect(locale).toHaveProperty('label');
      expect(locale).toHaveProperty('native');
      expect(locale).toHaveProperty('flag');
    });
  });

  it('should have correct metadata for zh-CN', () => {
    const zhCN = getAvailableLocales().find((l) => l.id === 'zh-CN');
    expect(zhCN?.label).toBe('中文');
    expect(zhCN?.native).toBe('简体中文');
    expect(zhCN?.flag).toBe('🇨🇳');
  });

  it('should have correct metadata for en', () => {
    const en = getAvailableLocales().find((l) => l.id === 'en');
    expect(en?.label).toBe('English');
    expect(en?.native).toBe('English');
    expect(en?.flag).toBe('🇺🇸');
  });
});

// ── LANG_META ──

describe('LANG_META', () => {
  it('should have metadata for every locale in SUPPORTED_LOCALES', () => {
    SUPPORTED_LOCALES.forEach((locale) => {
      expect(LANG_META).toHaveProperty(locale);
    });
  });
});

// ── isRTL() ──

describe('isRTL()', () => {
  it('should return true for Arabic', () => {
    expect(isRTL('ar')).toBe(true);
  });

  it('should return false for non-Arabic locales', () => {
    expect(isRTL('en')).toBe(false);
    expect(isRTL('zh-CN')).toBe(false);
    expect(isRTL('ja')).toBe(false);
  });
});

// ── engine singleton ──

describe('engine (I18nEngine)', () => {
  it('should be an I18nEngine instance', () => {
    expect(engine).toBeDefined();
    expect(typeof engine.t).toBe('function');
    expect(typeof engine.setLocale).toBe('function');
    expect(typeof engine.getLocale).toBe('function');
    expect(typeof engine.subscribe).toBe('function');
    expect(typeof engine.registerTranslation).toBe('function');
  });

  it('should have LRU cache enabled', () => {
    expect(engine.cache).toBeDefined();
  });

  it('should have plugin manager', () => {
    expect(engine.plugins).toBeDefined();
  });

  it('should support batchTranslate', () => {
    const result = engine.batchTranslate(['sync.ok', 'sync.error']);
    expect(result).toHaveProperty('sync.ok');
    expect(result).toHaveProperty('sync.error');
  });
});
