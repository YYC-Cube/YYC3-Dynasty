/**
 * file: RootLayout.tsx
 * description: 应用根布局组件 · 导航栏 + 内容区 + 全局组件
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-21
 * updated: 2026-07-12
 * status: active
 * tags: [component],[layout],[root]
 *
 * brief: 应用根布局，嵌套路由的通用外壳
 *
 * details:
 * - 包含导航栏（DynastyNavbar）
 * - 悬浮功能面板（HubFloat）
 * - 全局搜索（GlobalSearch）
 * - 通知系统（ToastSystem）
 * - 自动启动轮询与 WebSocket
 *
 * dependencies: React, react-router, ../store, ../useWebSocket
 * exports: RootLayout
 */

import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { DynastyNavbar } from './DynastyNavbar';
import { HubFloat } from './HubFloat';
import { GlobalSearch } from './GlobalSearch';
import { ToastSystem } from './ToastSystem';
import { startPolling, stopPolling, useStore } from '../store';
import { useWebSocket } from '../useWebSocket';

export function RootLayout() {
  const { connected, subscribe } = useWebSocket();
  const setWsConnected = useStore((s) => s.setWsConnected);
  const handleWSEvent = useStore((s) => s.handleWSEvent);

  useEffect(() => {
    startPolling();
    return () => stopPolling();
  }, []);

  useEffect(() => {
    setWsConnected(connected);
  }, [connected, setWsConnected]);

  useEffect(() => {
    const unsub = subscribe((event) => {
      if (event.type === 'event' && event.topic && event.data) {
        handleWSEvent(event.topic, event.data);
      }
    });
    return unsub;
  }, [subscribe, handleWSEvent]);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col">
      <DynastyNavbar />
      <div className="flex-1 mt-14 relative">
        <Outlet />
      </div>
      <HubFloat />
      <GlobalSearch />
      <ToastSystem />
    </div>
  );
}
