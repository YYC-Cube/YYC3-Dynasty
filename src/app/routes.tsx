/**
 * file: routes.tsx
 * description: 应用路由配置 · 基于 react-router 的 BrowserRouter + 路由级懒加载
 * author: YanYuCloudCube Team
 * version: v1.2.0
 * created: 2026-03-21
 * updated: 2026-07-16
 * status: active
 * tags: [router],[config],[navigation],[lazy]
 *
 * brief: 定义应用全部路由路径与组件映射（路由级 code-splitting + Suspense + ErrorBoundary）
 *
 * details:
 * - 支持嵌套布局（RootLayout 包裹子页面）
 * - 涵盖：朝堂、王朝、旨意、双星桥等核心页面
 * - 默认重定向 / → /welcome
 * - 使用 lazy() 实现路由级 code-splitting，每个页面独立 chunk
 * - 全局 errorElement 捕获渲染异常
 * - 全局 HydrateFallback 提供懒加载统一 loading 状态
 *
 * dependencies: react-router
 * exports: router
 */

import { createBrowserRouter, Navigate } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { RouteErrorBoundary } from './components/RouteErrorBoundary';
import { RouteLoadingFallback } from './components/RouteLoadingFallback';

export const router = createBrowserRouter([
  {
    path: '/welcome',
    lazy: () => import('./components/Welcome').then((m) => ({ Component: m.Welcome })),
    errorElement: <RouteErrorBoundary />,
    HydrateFallback: RouteLoadingFallback,
  },
  {
    path: '/',
    Component: RootLayout,
    errorElement: <RouteErrorBoundary />,
    HydrateFallback: RouteLoadingFallback,
    children: [
      {
        index: true,
        element: <Navigate to="/welcome" replace />,
      },
      {
        path: 'court',
        lazy: () => import('./components/Court').then((m) => ({ Component: m.Court })),
      },
      {
        path: 'timeline',
        lazy: () => import('./components/Timeline').then((m) => ({ Component: m.Timeline })),
      },
      {
        path: 'honors',
        lazy: () => import('./components/Honors').then((m) => ({ Component: m.Honors })),
      },
      {
        path: 'edict',
        lazy: () => import('./components/EdictBoard').then((m) => ({ Component: m.EdictBoard })),
      },
      {
        path: 'edict/create',
        lazy: () => import('./components/EdictCreate').then((m) => ({ Component: m.EdictCreate })),
      },
      {
        path: 'edict/:id',
        lazy: () => import('./components/EdictDetail').then((m) => ({ Component: m.EdictDetail })),
      },
      {
        path: 'monitor',
        lazy: () =>
          import('./components/TaishiMonitor').then((m) => ({ Component: m.TaishiMonitor })),
      },
      {
        path: 'settings',
        lazy: () =>
          import('./components/PalaceRegulation').then((m) => ({
            Component: m.PalaceRegulation,
          })),
      },
      {
        path: 'bridge',
        lazy: () =>
          import('./components/DualStarBridge').then((m) => ({ Component: m.DualStarBridge })),
      },
      {
        path: 'dashboard',
        lazy: () => import('./components/Dashboard').then((m) => ({ Component: m.Dashboard })),
      },
    ],
  },
]);
