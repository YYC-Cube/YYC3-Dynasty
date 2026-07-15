/**
 * file: LanguageSwitcher.tsx
 * description: 国际化语言切换器 · 8 种语言支持
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-05-01
 * updated: 2026-07-12
 * status: active
 * tags: [component],[i18n],[locale],[switcher]
 *
 * brief: 国际化语言切换器，一键切换语言
 *
 * details:
 * - 8 种语言支持
 * - 下拉菜单切换
 * - 持久化到 localStorage
 *
 * dependencies: ../i18n
 * exports: LanguageSwitcher
 */

/**
 * LanguageSwitcher — 国际化语言切换器
 *
 * 8 种语言支持，一键切换
 */

import { useEffect, useRef, useState } from 'react';
import { getAvailableLocales, getLocale, setLocale, onLocaleChange } from '../i18n';
import type { Locale } from '@/lib/i18n-core';

export default function LanguageSwitcher() {
  const [locale, setLocaleState] = useState<Locale>(getLocale());

  useEffect(() => {
    const unsub = onLocaleChange((newLocale) => setLocaleState(newLocale));
    return unsub;
  }, []);

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const available = getAvailableLocales();
  const current = available.find((l) => l.id === locale) || available[0];

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        className="btn-refresh"
        onClick={() => setOpen(!open)}
        style={{ minWidth: 36, textAlign: 'center', fontSize: 13 }}
        title={`${current.flag} ${current.native}`}
      >
        {current.flag}
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: 4,
            background: 'var(--panel)',
            border: '1px solid var(--line)',
            borderRadius: 10,
            padding: 4,
            zIndex: 300,
            minWidth: 150,
            boxShadow: '0 8px 32px rgba(0,0,0,.4)',
          }}
        >
          {available.map((loc) => {
            const active = locale === loc.id;
            return (
              <div
                key={loc.id}
                onClick={() => {
                  setLocale(loc.id as Locale);
                  setOpen(false);
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: active ? 'var(--acc)22' : 'transparent',
                  color: active ? 'var(--acc)' : 'var(--text)',
                  transition: 'background .1s',
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.background = 'var(--panel2)';
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span>{loc.flag}</span>
                <span>{loc.native}</span>
                {active && <span style={{ marginLeft: 'auto', fontSize: 11 }}>✓</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
