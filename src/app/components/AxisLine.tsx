/**
 * file: AxisLine.tsx
 * description: 中轴线组件 · 王朝时间轴粒子动画
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-21
 * updated: 2026-07-12
 * status: active
 * tags: [component],[animation],[ui]
 *
 * brief: 页面中轴装饰线，包含粒子流动动画
 *
 * details:
 * - 垂直中轴渐变线
 * - 粒子沿中轴向下流动
 * - 使用 motion/react 实现无限循环动画
 *
 * dependencies: motion/react, React
 * exports: AxisLine
 */

import { motion } from 'motion/react';

export function AxisLine() {
  return (
    <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-2 pointer-events-none z-0">
      <motion.div
        className="w-full h-full bg-gradient-to-b from-accent-gold via-accent-gold/40 to-accent-gold/10"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Particles flowing down */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute top-0 left-0 w-full aspect-square bg-white rounded-full shadow-[0_0_10px_2px_rgba(212,168,67,0.8)]"
          initial={{ y: '-10%' }}
          animate={{ y: ['-10%', '1000%'] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 2.6,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
