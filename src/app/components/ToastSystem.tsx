/**
 * file: ToastSystem.tsx
 * description: 通知系统组件 · 多级别消息提示与事件总线
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-21
 * updated: 2026-07-12
 * status: active
 * tags: [component],[toast],[notification]
 *
 * brief: 通知消息系统，支持紧急/重要/普通三级
 *
 * details:
 * - 三种级别：emergency / important / normal
 * - 自动消失与手动关闭
 * - 事件总线模式（toastEmitter）
 * - 动画进出效果
 *
 * dependencies: React, motion/react, lucide-react, ./toastEmitter
 * exports: ToastSystem
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Bell, Send, X } from 'lucide-react';
import { toastEmitter, type ToastMessage } from './toastEmitter';
export type { ToastLevel, ToastMessage } from './toastEmitter';

export function ToastSystem() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    return toastEmitter.subscribe((toast) => {
      setToasts((prev) => {
        // Emergency preempts
        if (toast.level === 'emergency') {
          return [toast, ...prev].slice(0, 3);
        }
        return [toast, ...prev].slice(0, 3);
      });

      if (toast.duration !== 0) {
        const d =
          toast.duration ||
          (toast.level === 'emergency' ? 8000 : toast.level === 'important' ? 5000 : 3000);
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== toast.id));
        }, d);
      }
    });
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed top-20 right-6 z-[100] flex flex-col gap-2 w-80 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast, idx) => {
          const isEmergency = toast.level === 'emergency';
          const isImportant = toast.level === 'important';

          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1 - idx * 0.1, x: 0, scale: 1 - idx * 0.05 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              style={{ zIndex: 100 - idx }}
              className={`pointer-events-auto relative overflow-hidden backdrop-blur-md rounded-lg shadow-lg border p-4 flex gap-3 ${
                isEmergency
                  ? 'bg-[#1a0f12]/90 border-accent-red/50 shadow-[0_0_20px_rgba(194,65,75,0.2)]'
                  : isImportant
                    ? 'bg-[#1a1f2e]/90 border-[#f59e0b]/50 shadow-[0_0_20px_rgba(245,158,11,0.1)]'
                    : 'bg-[#1a1f2e]/90 border-white/10'
              }`}
            >
              {isEmergency && <div className="absolute inset-0 bg-accent-red/5 animate-pulse" />}

              <div className="flex-shrink-0 mt-0.5 relative z-10">
                {isEmergency ? (
                  <Flame className="w-5 h-5 text-accent-red animate-bounce" />
                ) : isImportant ? (
                  <Bell className="w-5 h-5 text-[#f59e0b]" />
                ) : (
                  <Send className="w-5 h-5 text-text-secondary" />
                )}
              </div>

              <div className="flex-1 relative z-10">
                <div
                  className={`text-sm font-serif-sc font-bold mb-1 ${
                    isEmergency
                      ? 'text-accent-red'
                      : isImportant
                        ? 'text-[#f59e0b]'
                        : 'text-text-primary'
                  }`}
                >
                  {toast.title}
                </div>
                {toast.desc && (
                  <div className="text-xs text-text-secondary font-serif-sc leading-relaxed">
                    {toast.desc}
                  </div>
                )}
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="absolute top-2 right-2 p-1 text-text-secondary hover:text-white transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
      {toasts.length > 3 && (
        <div className="text-center text-xs text-text-secondary font-serif-sc bg-[#1a1f2e]/80 border border-white/10 rounded-full py-1 mt-2 backdrop-blur pointer-events-auto cursor-pointer hover:text-white">
          + {toasts.length - 3} 条通知
        </div>
      )}
    </div>
  );
}
