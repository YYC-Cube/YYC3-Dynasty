/**
 * file: Welcome.tsx
 * description: 欢迎页组件 · 应用入口首页
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-21
 * updated: 2026-07-12
 * status: active
 * tags: [component],[welcome],[page]
 *
 * brief: 应用欢迎/入口页面
 *
 * details:
 * - 玉玺印章交互
 * - 入口卡片导航
 * - 号召性按钮引导
 *
 * dependencies: React, motion/react, react-router
 * exports: Welcome
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ImperialSeal, type SealState } from './ImperialSeal';
import { EntryCard } from './EntryCard';
import { CTAButton } from './CTAButton';

const CARDS = [
  { icon: '🏯', title: '朝堂听政', subtitle: 'Court Hall' },
  { icon: '📜', title: '王朝典章', subtitle: 'Dynasty Timeline' },
  { icon: '🏅', title: '勋绩考课', subtitle: 'Honor Wall' },
  { icon: '📋', title: '敕令流转', subtitle: 'Edict Board' },
  { icon: '🔭', title: '太史监候', subtitle: 'System Monitor' },
  { icon: '⚙️', title: '宫阙规制', subtitle: 'Settings' },
  { icon: '🌉', title: '双星桥', subtitle: 'Agent Bridge' },
  { icon: '💬', title: 'AI 助理', subtitle: 'Hub' },
  { icon: '📊', title: '司天监', subtitle: 'Observatory' },
];

export function Welcome() {
  const navigate = useNavigate();
  const [sealState, setSealState] = useState<SealState>('idle');
  const [_ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setSealState('pressing');
    setTimeout(() => {
      setSealState('stamped');
      setTimeout(() => {
        navigate('/court');
      }, 1000);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center overflow-hidden relative selection:bg-accent-gold/30">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://images.unsplash.com/photo-1615598124505-181552a8a5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center pointer-events-none" />

      {/* Cloud pattern drifting */}
      <motion.div
        className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-gold/20 via-transparent to-transparent pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative w-full max-w-[520px] bg-bg-primary border border-white/5 rounded-2xl shadow-panel overflow-hidden p-6 flex flex-col items-center z-10"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top Section */}
        <div className="flex flex-col items-center pt-8 pb-4">
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5, delay: 0.4 }}
          >
            <ImperialSeal
              state={sealState}
              onHoverStart={() => sealState === 'idle' && setSealState('hover')}
              onHoverEnd={() => sealState === 'hover' && setSealState('idle')}
              onClick={handleEnter}
            />
          </motion.div>

          <motion.h1
            className="font-serif-sc font-black text-[28px] text-accent-gold mt-6 tracking-[4px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            YYC³ Dynasty
          </motion.h1>
          <motion.p
            className="font-serif-sc text-sm text-accent-gold/80 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
          >
            三省以治 · 六部以行
          </motion.p>

          <motion.div
            className="w-[60%] h-[1px] bg-accent-gold/30 mt-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          />
        </div>

        {/* Middle Section: Cards */}
        <div className="grid grid-cols-3 gap-2 w-full px-4 py-2">
          {CARDS.map((card, idx) => (
            <EntryCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              subtitle={card.subtitle}
              delay={0.9 + idx * 0.08}
            />
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center pt-6 pb-2 w-full">
          <motion.div
            className="text-[12px] text-text-secondary mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            紫微城中枢 · 十二朝臣当值
          </motion.div>

          <CTAButton onClick={handleEnter} delay={1.4}>
            奉天承运 · 入朝
          </CTAButton>

          <motion.div
            className="text-[10px] text-text-secondary/60 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            v1.0 · 永熙三年
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
