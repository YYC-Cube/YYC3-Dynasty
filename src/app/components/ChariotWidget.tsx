/**
 * file: ChariotWidget.tsx
 * description: 天子驾六小部件 · 六部健康状态指示器
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-21
 * updated: 2026-07-12
 * status: active
 * tags: [component],[widget],[monitor]
 *
 * brief: 天子驾六马车部件，展示六部运行状态
 *
 * details:
 * - 六匹马的图标代表六部
 * - 颜色映射：绿=正常，金=预警，红=错误
 * - 悬浮面板显示系统整体健康状态
 *
 * dependencies: motion/react, MinistryCard
 * exports: ChariotWidget
 */

import { motion } from 'motion/react';
import { type MinistryStatus } from './MinistryCard';

interface ChariotWidgetProps {
  horseStatuses: MinistryStatus[];
}

export function ChariotWidget({ horseStatuses }: ChariotWidgetProps) {
  const getHorseColor = (status: MinistryStatus) => {
    switch (status) {
      case 'normal':
        return '#10b981'; // patina green
      case 'warning':
        return '#d4a843'; // mud gold
      case 'error':
        return '#c2414b'; // cinnabar red
      default:
        return '#6b7280';
    }
  };

  const getSystemHealth = () => {
    if (horseStatuses.some((s) => s === 'error')) return '危急';
    if (horseStatuses.some((s) => s === 'warning')) return '预警';
    return '平稳';
  };

  return (
    <motion.div
      className="fixed bottom-24 right-8 bg-bg-card/90 backdrop-blur-md border border-accent-gold/20 rounded-xl p-4 shadow-panel z-50 w-48 flex flex-col items-center"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      whileHover={{ y: -5, boxShadow: '0 0 40px rgba(212,168,67,0.2)' }}
    >
      <div className="text-[12px] font-serif-sc text-accent-gold mb-2 border-b border-accent-gold/20 pb-1 w-full text-center tracking-widest">
        天子驾六
      </div>

      {/* 6 Horses representing Six Ministries */}
      <div className="flex gap-2 mb-3">
        {horseStatuses.map((status, idx) => (
          <motion.div
            key={idx}
            className="w-4 h-6 rounded-t border-b-2"
            style={{
              backgroundColor: `${getHorseColor(status)}20`,
              borderColor: getHorseColor(status),
            }}
            animate={status === 'error' ? { y: [0, -3, 0] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
            title={`Horse ${idx + 1}`}
          />
        ))}
      </div>

      <div className="flex items-center justify-between w-full text-[10px]">
        <span className="text-text-secondary">龙辇行态</span>
        <span className="font-serif-sc text-accent-gold">{getSystemHealth()}</span>
      </div>
    </motion.div>
  );
}
