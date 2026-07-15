/**
 * file: Dashboard.tsx
 * description: 统一看板页 · 三省六部 tab 式控制中心
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-07-12
 * updated: 2026-07-12
 * status: active
 * tags: [component],[dashboard],[tabs]
 *
 * brief: 统一看板页面，通过 tab 切换各功能面板
 *
 * details:
 * - 基于 store 的 TAB_DEFS 渲染 tab 导航
 * - 按 activeTab 懒加载对应面板组件
 * - 包含 TaskModal 浮窗
 * - 重新接入 9 个 panel 组件（P4 阶段）
 *
 * dependencies: React, ../store, lazy panels
 * exports: Dashboard
 */

import { Suspense, lazy } from 'react';
import { TAB_DEFS, useStore, type TabKey } from '../store';

// 路由级懒加载各面板组件，避免首屏过重
const EdictBoard = lazy(() => import('./EdictBoard').then((m) => ({ default: m.EdictBoard })));
const Court = lazy(() => import('./Court').then((m) => ({ default: m.Court })));
const MonitorPanel = lazy(() => import('./MonitorPanel'));
const OfficialPanel = lazy(() => import('./OfficialPanel'));
const ModelConfig = lazy(() => import('./ModelConfig'));
const SkillsConfig = lazy(() => import('./SkillsConfig'));
const SessionsPanel = lazy(() => import('./SessionsPanel'));
const MemorialPanel = lazy(() => import('./MemorialPanel'));
const TemplatePanel = lazy(() => import('./TemplatePanel'));
const MorningPanel = lazy(() => import('./MorningPanel'));
const TaskModal = lazy(() => import('./TaskModal'));

const TAB_PANELS: Record<TabKey, React.ComponentType> = {
  edicts: EdictBoard,
  court: Court,
  monitor: MonitorPanel,
  officials: OfficialPanel,
  models: ModelConfig,
  skills: SkillsConfig,
  sessions: SessionsPanel,
  memorials: MemorialPanel,
  templates: TemplatePanel,
  morning: MorningPanel,
};

function TabFallback() {
  return (
    <div className="flex items-center justify-center h-64 text-text-secondary">
      <div className="animate-pulse font-serif-sc">载入中…</div>
    </div>
  );
}

export function Dashboard() {
  const activeTab = useStore((s) => s.activeTab);
  const setActiveTab = useStore((s) => s.setActiveTab);

  const ActivePanel = TAB_PANELS[activeTab] || EdictBoard;

  return (
    <div className="min-h-full bg-bg-primary text-text-primary px-4 py-6">
      {/* Tab 导航栏 */}
      <div className="flex gap-1 mb-6 border-b border-accent-gold/20 pb-2 flex-wrap">
        {TAB_DEFS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-t-lg text-sm font-serif-sc transition-all border-b-2 ${
              activeTab === tab.key
                ? 'text-accent-gold border-accent-gold bg-accent-gold/5'
                : 'text-text-secondary border-transparent hover:text-text-primary hover:bg-white/5'
            }`}
          >
            <span className="mr-1">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* 当前 Tab 内容 */}
      <div className="relative">
        <Suspense fallback={<TabFallback />}>
          <ActivePanel />
        </Suspense>
      </div>

      {/* 任务详情浮窗（全局） */}
      <Suspense fallback={null}>
        <TaskModal />
      </Suspense>
    </div>
  );
}
