/**
 * file: CTAButton.tsx
 * description: 号召性按钮组件 · 金色渐变动效
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-21
 * updated: 2026-07-12
 * status: active
 * tags: [component],[ui],[button]
 *
 * brief: 金色渐变动效号召性按钮
 *
 * details:
 * - 使用 motion/react 动画库
 * - hover/active 动效反馈
 * - 支持自定义延迟动画
 *
 * dependencies: motion/react, React
 * exports: CTAButton
 */

import { motion } from 'motion/react';
import { type ReactNode } from 'react';

interface CTAButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  delay?: number;
}

export function CTAButton({ children, onClick, className = '', delay = 0 }: CTAButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative group overflow-hidden px-12 py-3 rounded-lg bg-gradient-to-r from-accent-gold to-[#b8942e] text-bg-primary font-serif-sc font-bold text-base shadow-[0_0_15px_rgba(212,168,67,0.3)] hover:shadow-[0_0_30px_rgba(212,168,67,0.5)] transition-shadow ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
    </motion.button>
  );
}
