/**
 * file: App.tsx
 * description: 应用根组件 · I18nProvider + RouterProvider 入口
 * author: YanYuCloudCube Team
 * version: v1.1.0
 * created: 2026-03-21
 * updated: 2026-07-12
 * status: active
 * tags: [component],[root],[router],[i18n]
 *
 * brief: 应用根组件，I18nProvider 包裹 RouterProvider
 *
 * details:
 * - 使用 @/lib/i18n-react 的 I18nProvider 包裹全局
 * - 引擎实例来自 ./i18n.ts（已注册 Dynasty 翻译）
 * - 引入路由配置 routes.tsx
 * - 加载全局样式（theme.css, fonts.css）
 *
 * dependencies: react-router, @/lib/i18n-react, ./i18n
 * exports: App (default)
 */

import { RouterProvider } from 'react-router';
import { I18nProvider } from '@/lib/i18n-react';
import { router } from './routes';
import { engine } from './i18n';
import '../styles/theme.css';
import '../styles/fonts.css';

export default function App() {
  return (
    <I18nProvider engine={engine}>
      <RouterProvider router={router} />
    </I18nProvider>
  );
}
