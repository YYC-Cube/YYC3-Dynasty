/**
 * file: FlowBar.tsx
 * description: 流程条组件 · 七阶段圣旨流转进度
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-21
 * updated: 2026-07-12
 * status: active
 * tags: [component],[flow],[progress]
 *
 * brief: 七阶段圣旨流转进度条
 *
 * details:
 * - 下旨 → 分拣 → 草拟 → 审议 → 派发 → 执行 → 归档
 * - 当前阶段高亮标识
 *
 * dependencies: motion/react
 * exports: FlowBar
 */

import { motion } from 'motion/react';
const STAGES = ['下旨', '分拣', '草拟', '审议', '派发', '执行', '归档'];

export function FlowBar() {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 h-16 bg-bg-card/95 backdrop-blur-md border-t border-accent-gold/20 flex items-center justify-center z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] px-4"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{ delay: 0.8, type: 'spring', damping: 20 }}
    >
      <div className="max-w-[900px] w-full flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute top-1/2 left-8 right-8 h-[1px] bg-accent-gold/20 -translate-y-1/2 z-0" />

        {STAGES.map((stage, idx) => (
          <div key={idx} className="relative z-10 flex flex-col items-center gap-1 group">
            <div className="w-8 h-8 rounded-full bg-bg-card border border-accent-gold/40 flex items-center justify-center text-[10px] text-accent-gold group-hover:bg-accent-gold/10 group-hover:border-accent-gold transition-colors">
              {idx + 1}
            </div>
            <div className="absolute -top-6 flex gap-1">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-accent-red"
                animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
              />
            </div>
            <span className="text-[12px] font-serif-sc text-text-primary">{stage}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
