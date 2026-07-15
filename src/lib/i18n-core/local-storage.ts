/**
 * file: local-storage.ts
 * description: 本地存储持久化（vendor 自 @yyc3/i18n-core，MIT）
 * author: YanYuCloudCube Team
 * version: v2.3.0
 * created: 2026-04-24
 * updated: 2026-07-16
 * status: active
 * tags: [i18n],[storage],[vendor]
 *
 * brief: 本地存储持久化（本地化内嵌）
 *
 * license: MIT
 */
export function getSafeLocalStorage(): Storage | null {
  if (typeof window === 'undefined') return null;

  try {
    const testKey = '__yyc3_test__';
    window.localStorage.setItem(testKey, 'test');
    window.localStorage.removeItem(testKey);
    return window.localStorage;
  } catch {
    return null;
  }
}
