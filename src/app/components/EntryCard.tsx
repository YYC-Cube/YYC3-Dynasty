/**
 * file: EntryCard.tsx
 * description: 入口卡片组件 · 欢迎页导航卡片
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-21
 * updated: 2026-07-12
 * status: active
 * tags: [component],[card],[navigation],[ui]
 *
 * brief: 欢迎页入口导航卡片
 *
 * details:
 * - 图标+标题+副标题展示
 * - 动画悬浮效果
 *
 * dependencies: motion/react, React
 * exports: EntryCard, EntryCardProps
 */

import { motion } from 'motion/react';
import { type ReactNode } from 'react';

interface EntryCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  delay?: number;
}

export function EntryCard({ icon, title, subtitle, delay = 0 }: EntryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      whileHover={{ scale: 1.03, backgroundColor: 'rgba(212,168,67,0.12)', borderColor: '#d4a843' }}
      whileTap={{ scale: 0.97 }}
      className="flex flex-col items-center justify-center p-3 rounded-xl border border-[rgba(212,168,67,0.15)] bg-[rgba(212,168,67,0.06)] cursor-pointer text-center relative overflow-hidden group h-[80px]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-[13px] text-accent-gold font-serif-sc font-medium">{title}</div>
      <div className="text-[10px] text-text-secondary">{subtitle}</div>
    </motion.div>
  );
}
