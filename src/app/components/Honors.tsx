/**
 * file: Honors.tsx
 * description: 勋章墙组件 · 17 种古典主题成就徽章 · 1–6 星稀有度
 * author: YanYuCloudCube Team
 * version: v1.1.0
 * created: 2026-03-21
 * updated: 2026-07-12
 * status: active
 * tags: [component],[honors],[ui]
 *
 * brief: 勋章墙页面，展示各类成就与徽章，支持稀有度分级与解锁动画
 *
 * details:
 * - 5 大类别：角色 / 成就 / 协作 / 安全 / 效率
 * - 17 种勋章（对齐设计规范 §Guidelines P4）
 * - 稀有度分级（1-6 星），每种稀有度有独立边框样式
 * - 已获得/未获得两态，未获得显示锁定遮罩
 * - 可折叠分类（accordion），hover 微动画
 * - 解锁进度条（对未获得勋章显示当前进度）
 *
 * dependencies: React, motion/react
 * exports: Honors
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// ── 类型定义 ──

type Rarity = 1 | 2 | 3 | 4 | 5 | 6;

interface Honor {
  id: string;
  name: string;
  rarity: Rarity;
  desc: string;
  condition: string;
  date?: string;
  earned: boolean;
  icon: string;
  progress?: number; // 0-100，未获得时的当前进度
}

// ── 17 种勋章数据（5 类别）──

const HONORS_DATA: Record<string, Honor[]> = {
  角色: [
    {
      id: 'h1',
      name: '紫微星',
      rarity: 6,
      desc: '统御中枢，算无遗策',
      condition: '连续30天全系统健康度>99%',
      date: '永熙三年·辰时',
      earned: true,
      icon: '🌟',
    },
    {
      id: 'h2',
      name: '太史令',
      rarity: 5,
      desc: '洞察天机，防微杜渐',
      condition: '成功预判并拦截100次系统风险',
      date: '永熙三年·卯时',
      earned: true,
      icon: '🔭',
    },
    {
      id: 'h3',
      name: '少保',
      rarity: 2,
      desc: '辅佐储君，分拣有序',
      condition: '太子分拣任务500份无误',
      earned: false,
      icon: '🎎',
      progress: 62,
    },
  ],
  成就: [
    {
      id: 'h4',
      name: '金科玉律',
      rarity: 6,
      desc: '制定系统红线并无一违背',
      condition: '全站规则引擎运行1万次零失误',
      earned: false,
      icon: '📜',
      progress: 78,
    },
    {
      id: 'h5',
      name: '洛口巨仓',
      rarity: 4,
      desc: '数据吞吐如大江大河',
      condition: '累计处理1TB流转数据',
      date: '永熙二年·酉时',
      earned: true,
      icon: '🗄️',
    },
    {
      id: 'h6',
      name: '笔走龙蛇',
      rarity: 3,
      desc: '草拟旨意行云流水',
      condition: '中书省累计草拟1000份无误旨意',
      earned: false,
      icon: '✍️',
      progress: 45,
    },
    {
      id: 'h7',
      name: '新手村',
      rarity: 1,
      desc: '初入朝堂，拜为散骑',
      condition: '完成首次旨意创建',
      date: '永熙元年·子时',
      earned: true,
      icon: '🐣',
    },
  ],
  协作: [
    {
      id: 'h8',
      name: '三出阙',
      rarity: 5,
      desc: '三省同心，其利断金',
      condition: '三省流转效率提升50%',
      date: '永熙三年·寅时',
      earned: true,
      icon: '🏛️',
    },
    {
      id: 'h9',
      name: '天子驾六',
      rarity: 4,
      desc: '六部协同，宛如一臂',
      condition: '六部并发执行任务零锁死',
      earned: false,
      icon: '🐎',
      progress: 88,
    },
    {
      id: 'h10',
      name: '双星鹊桥',
      rarity: 3,
      desc: 'Family与Dynasty默契无间',
      condition: '跨系统Agent协作100次',
      date: '永熙二年·子时',
      earned: true,
      icon: '🌉',
    },
    {
      id: 'h11',
      name: '同僚之谊',
      rarity: 2,
      desc: '与同僚并肩，共理朝政',
      condition: '参与50次朝堂议政',
      earned: false,
      icon: '🤝',
      progress: 34,
    },
  ],
  安全: [
    {
      id: 'h12',
      name: '玄武门',
      rarity: 6,
      desc: '禁军护卫，固若金汤',
      condition: '抵御10次高级模拟入侵',
      earned: false,
      icon: '🛡️',
      progress: 20,
    },
    {
      id: 'h13',
      name: '锦衣卫',
      rarity: 4,
      desc: '刑部肃清暗流风险',
      condition: '排查并修复50个中危漏洞',
      date: '永熙元年·丑时',
      earned: true,
      icon: '⚔️',
    },
    {
      id: 'h14',
      name: '门神',
      rarity: 2,
      desc: '守门有责，出入有序',
      condition: '权限校验连续30天无异常',
      date: '永熙二年·午时',
      earned: true,
      icon: '🚪',
    },
  ],
  效率: [
    {
      id: 'h15',
      name: '十万火急',
      rarity: 5,
      desc: '兵贵神速，瞬息即达',
      condition: '火急敕令平均办结时间<5分钟',
      earned: false,
      icon: '🔥',
      progress: 91,
    },
    {
      id: 'h16',
      name: '神行太保',
      rarity: 3,
      desc: '令牌调度如飞',
      condition: '尚书省派发零延迟',
      date: '永熙三年·申时',
      earned: true,
      icon: '⚡',
    },
    {
      id: 'h17',
      name: '勤勉',
      rarity: 1,
      desc: '日日上朝，从不缺席',
      condition: '连续7天每日完成至少1项任务',
      date: '永熙三年·巳时',
      earned: true,
      icon: '📅',
    },
  ],
};

// ── 稀有度视觉样式 ──

const RARITY_STYLES: Record<Rarity, { border: string; glow: string; label: string }> = {
  6: {
    border: 'border-accent-gold',
    glow: 'shadow-[0_0_24px_rgba(212,168,67,0.5)]',
    label: '龙纹金边',
  },
  5: {
    border: 'border-bronze',
    glow: 'shadow-[0_0_16px_rgba(180,83,9,0.35)]',
    label: '青铜纹边',
  },
  4: {
    border: 'border-gray-300',
    glow: 'shadow-[0_0_10px_rgba(209,213,219,0.2)]',
    label: '银边',
  },
  3: {
    border: 'border-[#b87333]',
    glow: 'shadow-[0_0_10px_rgba(184,115,51,0.2)]',
    label: '铜边',
  },
  2: {
    border: 'border-gray-500',
    glow: '',
    label: '铁边',
  },
  1: {
    border: 'border-white/20',
    glow: '',
    label: '素边',
  },
};

const RARITY_NAMES: Record<Rarity, string> = {
  6: '传说',
  5: '史诗',
  4: '稀有',
  3: '精良',
  2: '普通',
  1: '基础',
};

// ── 统计 ──

function countHonors(data: Record<string, Honor[]>) {
  const all = Object.values(data).flat();
  return {
    total: all.length,
    earned: all.filter((h) => h.earned).length,
    byRarity: (r: Rarity) => all.filter((h) => h.rarity === r).length,
  };
}

// ── 勋章卡片 ──

function HonorBadge({ honor }: { honor: Honor }) {
  const style = RARITY_STYLES[honor.rarity];

  return (
    <motion.div
      whileHover={{ scale: honor.earned ? 1.02 : 1, rotate: honor.earned ? 0.5 : 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`relative p-4 rounded-xl border-2 flex items-start gap-4 transition-all duration-300 ${
        honor.earned
          ? `bg-[#1a1f2e] ${style.border} ${style.glow}`
          : 'bg-black/40 border-white/10 opacity-60'
      }`}
    >
      {/* 锁定遮罩 */}
      {!honor.earned && <div className="absolute top-2 right-2 z-10 text-lg opacity-50">🔒</div>}

      {/* 图标 */}
      <div className={`text-4xl shrink-0 mt-1 select-none ${!honor.earned ? 'grayscale' : ''}`}>
        {honor.icon}
      </div>

      {/* 内容 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3 className="font-serif-sc font-bold text-base text-text-primary truncate">
            {honor.name}
          </h3>
          {/* 星级 */}
          <div className="flex gap-0.5 text-[10px] shrink-0">
            {[...Array(6)].map((_, i) => (
              <span key={i} className={i < honor.rarity ? 'text-accent-gold' : 'text-gray-700'}>
                {i < honor.rarity ? '★' : '☆'}
              </span>
            ))}
          </div>
          {/* 稀有度标签 */}
          <span
            className={`text-[9px] px-1.5 py-0.5 rounded-full border ${
              honor.rarity >= 5
                ? 'border-accent-gold/40 text-accent-gold bg-accent-gold/10'
                : honor.rarity >= 3
                  ? 'border-bronze/40 text-bronze bg-bronze/10'
                  : 'border-white/20 text-text-secondary bg-white/5'
            }`}
          >
            {RARITY_NAMES[honor.rarity]}
          </span>
        </div>

        <p className="text-xs text-text-secondary truncate mb-2">{honor.desc}</p>

        {/* 进度条（未获得时显示） */}
        {!honor.earned && honor.progress !== undefined && (
          <div className="mb-1.5">
            <div className="flex items-center justify-between text-[10px] text-text-secondary/60 mb-0.5">
              <span>进度</span>
              <span className="font-mono-jb">{honor.progress}%</span>
            </div>
            <div className="h-1 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent-gold/60 to-accent-gold"
                initial={{ width: 0 }}
                animate={{ width: `${honor.progress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
        )}

        <div className="text-[11px] text-text-secondary/50 flex flex-col gap-0.5">
          <div className="flex gap-1.5">
            <span className="text-accent-gold/40 shrink-0">条件:</span>
            <span className="truncate">{honor.condition}</span>
          </div>
          {honor.earned && honor.date && (
            <div className="flex gap-1.5">
              <span className="text-accent-gold/40 shrink-0">获得:</span>
              <span>{honor.date}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── 主组件 ──

export function Honors() {
  const stats = countHonors(HONORS_DATA);

  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>(
    Object.keys(HONORS_DATA).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
  );

  const toggleCat = (cat: string) => setExpandedCats((prev) => ({ ...prev, [cat]: !prev[cat] }));

  return (
    <div className="min-h-full bg-bg-primary text-text-primary px-6 py-10 flex flex-col items-center">
      <div className="w-full max-w-[800px]">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif-sc font-black text-4xl text-accent-gold tracking-widest mb-2"
          >
            🏅 勋 章 墙
          </motion.h1>
          <p className="text-sm text-text-secondary font-serif-sc tracking-widest">
            {stats.total} 种 · {stats.earned} 已获得 · 1–6 星
          </p>

          {/* 总进度 */}
          <div className="mt-4 mx-auto max-w-xs">
            <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
              <span>总收集进度</span>
              <span className="font-mono-jb text-accent-gold">
                {stats.earned}/{stats.total}
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent-gold/60 to-accent-gold"
                initial={{ width: 0 }}
                animate={{ width: `${(stats.earned / stats.total) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* 稀有度分布 */}
        <div className="flex justify-center gap-4 mb-8 text-xs text-text-secondary">
          {([6, 5, 4, 3, 2, 1] as Rarity[]).map((r) => (
            <div key={r} className="flex items-center gap-1">
              <span className={r >= 5 ? 'text-accent-gold' : r >= 3 ? 'text-bronze' : ''}>
                {'★'.repeat(r)}
              </span>
              <span className="font-mono-jb">{stats.byRarity(r)}</span>
            </div>
          ))}
        </div>

        {/* 分类折叠列表 */}
        <div className="space-y-4">
          {Object.entries(HONORS_DATA).map(([category, honors]) => (
            <div
              key={category}
              className="border border-white/5 bg-white/5 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleCat(category)}
                className="w-full px-6 py-3.5 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <h2 className="font-serif-sc font-bold text-base text-accent-gold/90">
                    / {category}
                  </h2>
                  <span className="text-xs text-text-secondary">
                    {honors.filter((h) => h.earned).length}/{honors.length}
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: expandedCats[category] ? 180 : 0 }}
                  className="text-text-secondary text-sm"
                >
                  ▼
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {expandedCats[category] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                      {honors.map((honor) => (
                        <HonorBadge key={honor.id} honor={honor} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
