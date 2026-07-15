/**
 * file: toastEmitter.ts
 * description: 通知事件总线 · Toast 消息的全局发射器与类型定义
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-07-12
 * updated: 2026-07-12
 * status: active
 * tags: [toast],[emitter],[types]
 *
 * brief: 从 ToastSystem.tsx 抽离的非组件模块，避免 react-refresh HMR 警告
 *
 * details:
 * - 定义 ToastLevel / ToastMessage 类型
 * - 提供 toastEmitter 全局事件总线（emit / subscribe）
 * - 从 ToastSystem.tsx 拆出，使组件文件仅导出组件
 *
 * dependencies: 无
 * exports: ToastLevel, ToastMessage, toastEmitter
 */

export type ToastLevel = 'emergency' | 'important' | 'normal';

export interface ToastMessage {
  id: string;
  level: ToastLevel;
  title: string;
  desc?: string;
  duration?: number;
}

/** 全局 Toast 事件总线 */
export const toastEmitter = {
  listeners: new Set<(toast: ToastMessage) => void>(),

  emit(toast: Omit<ToastMessage, 'id'>) {
    const id = Math.random().toString(36).substring(2, 9);
    const fullToast = { ...toast, id };
    this.listeners.forEach((l) => l(fullToast));
  },

  subscribe(listener: (toast: ToastMessage) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  },
};
