/**
 * file: MinistryCard.tsx
 * description: 六部卡片组件 · 部门状态展示
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-21
 * updated: 2026-07-12
 * status: active
 * tags: [component],[card],[ministry],[ui]
 *
 * brief: 三省六部状态卡片，展示部门运行指标
 *
 * details:
 * - 状态颜色映射：normal=绿, warning=金, error=红
 * - 活跃任务数展示
 * - 动画进出效果
 *
 * dependencies: motion/react, lucide-react
 * exports: MinistryCard, MinistryStatus
 */

import { motion } from 'motion/react';
import { Activity, CheckCircle2, Clock, FishSymbol } from 'lucide-react';

export type MinistryStatus = 'normal' | 'warning' | 'error' | 'empty';

interface MinistryCardProps {
  name: string;
  icon: string;
  status: MinistryStatus;
  activeTasks: number;
  completedToday: number;
  avgTime: string;
  tokens: number;
  progress: number;
  align: 'left' | 'right';
  watermarkIcon?: React.ReactNode;
}

export function MinistryCard({
  name,
  icon,
  status,
  activeTasks,
  completedToday,
  avgTime,
  tokens,
  progress,
  align: _align,
  watermarkIcon,
}: MinistryCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'normal':
        return '#10b981';
      case 'warning':
        return '#f59e0b';
      case 'error':
        return '#c2414b';
      case 'empty':
        return '#6b7280';
    }
  };

  const getBorderColor = () => {
    switch (status) {
      case 'normal':
        return '#b45309'; // bronze
      case 'warning':
        return '#d4a843'; // mud-gold
      case 'error':
        return '#c2414b'; // cinnabar
      case 'empty':
        return 'rgba(107,114,128,0.3)';
    }
  };

  if (status === 'empty') {
    return (
      <div className="relative bg-bg-card/50 border border-gray-500/30 rounded-xl p-4 h-[120px] flex items-center justify-center">
        <span className="text-gray-500 font-serif-sc text-sm">尚无任务</span>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative bg-bg-card rounded-xl p-4 flex flex-col gap-3 overflow-hidden group cursor-pointer"
      style={{
        border: `1px solid ${getBorderColor()}`,
        boxShadow:
          status === 'warning'
            ? `0 0 15px ${getBorderColor()}40`
            : status === 'error'
              ? `0 0 15px ${getBorderColor()}50`
              : 'none',
      }}
    >
      {/* Background Watermark */}
      <div className="absolute -right-4 -bottom-4 opacity-5 text-8xl pointer-events-none group-hover:scale-110 group-hover:opacity-10 transition-all duration-500 text-accent-gold">
        {watermarkIcon || <span className="font-ancient">{name[0]}</span>}
      </div>

      {/* Top Row: Name and Status */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="font-serif-sc font-bold text-sm text-text-primary">{name}</span>
        </div>
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: getStatusColor() }}
          animate={status === 'error' || status === 'warning' ? { opacity: [1, 0.5, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      {/* Middle Row: Metrics */}
      <div className="flex items-center justify-between z-10">
        <div className="flex flex-col">
          <span className="text-accent-gold font-mono-jb text-[12px] flex items-center gap-1">
            <Activity className="w-3 h-3" /> {activeTasks}
          </span>
          <span className="text-[10px] text-text-secondary">进行中</span>
        </div>
        <div className="flex flex-col">
          <span className="text-accent-gold font-mono-jb text-[12px] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> {completedToday}
          </span>
          <span className="text-[10px] text-text-secondary">今日办结</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-accent-gold font-mono-jb text-[12px] flex items-center gap-1 justify-end">
            <Clock className="w-3 h-3" /> {avgTime}
          </span>
          <span className="text-[10px] text-text-secondary">均时</span>
        </div>
      </div>

      {/* Bottom Row: Workload Bar & Token */}
      <div className="flex items-center gap-3 mt-auto z-10">
        <div className="flex-1 h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-gold/40 to-accent-gold"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <div
          className="flex items-center gap-1 text-[12px] font-mono-jb text-accent-gold bg-accent-gold/10 px-2 py-0.5 rounded border border-accent-gold/20"
          title="Tokens"
        >
          <FishSymbol className="w-3 h-3" />
          {tokens}
        </div>
      </div>

      {/* Corner Seal / Official Mark */}
      <div className="absolute top-2 right-2 w-4 h-4 border border-accent-red/30 rounded flex items-center justify-center opacity-40">
        <div className="w-2 h-2 bg-accent-red/40 rounded-sm" />
      </div>
    </motion.div>
  );
}
