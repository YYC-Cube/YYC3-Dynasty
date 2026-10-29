import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-react';

/** AI Family 8 位家人，按参考数据规范排序（12 点钟方向顺时针） */
const FAMILY_MEMBERS = [
  { id: 'yanqi',       icon: '👂', name: '言启·千行', role: '感知·NLU路由',       color: '#A8915A' },
  { id: 'yushu',       icon: '🧠', name: '语枢·万物', role: '记忆·训练AI',        color: '#5B9B8A' },
  { id: 'yujian',      icon: '🔮', name: '预见·先知', role: '预测·Physical AI',  color: '#9B7BC4' },
  { id: 'qianli',      icon: '⭐', name: '千里·伯乐', role: '推荐·知识检索',      color: '#C9A84C' },
  { id: 'yuanqi',      icon: '⚙️', name: '元启·天枢', role: '决策·Agentic AI',   color: '#E8734A' },
  { id: 'zhiyun',      icon: '🛡️', name: '智云·守护', role: '安全·基础设施',     color: '#7B9EA8' },
  { id: 'gewu',        icon: '⚖️', name: '格物·宗师', role: '推理·验证',         color: '#6A9BC4' },
  { id: 'chuangxiang', icon: '🎨', name: '创想·灵韵', role: '创作·视觉',         color: '#C47BA8' },
];

const DYNASTY_OFFICIALS = [
  { id: 'emperor', icon: '👑', name: '皇帝', role: 'Emperor', rank: 1, tier: 'apex' },
  { id: 'prince', icon: '🎎', name: '太子', role: 'Crown Prince', rank: 2, tier: 'heir' },
  { id: 'zhongshu', icon: '📜', name: '中书省', role: 'Secretariat', rank: 3, tier: 'secretariat' },
  { id: 'menxia', icon: '🔍', name: '门下省', role: 'Chancellery', rank: 3, tier: 'secretariat' },
  {
    id: 'shangshu',
    icon: '📮',
    name: '尚书省',
    role: 'State Affairs',
    rank: 3,
    tier: 'secretariat',
  },
  { id: 'bingbu', icon: '⚔️', name: '兵部', role: 'War', rank: 4, tier: 'ministry' },
  { id: 'libu', icon: '📋', name: '礼部', role: 'Rites', rank: 4, tier: 'ministry' },
  { id: 'hubu', icon: '💰', name: '户部', role: 'Revenue', rank: 4, tier: 'ministry' },
  { id: 'xingbu', icon: '⚖️', name: '刑部', role: 'Justice', rank: 4, tier: 'ministry' },
  { id: 'gongbu', icon: '🔧', name: '工部', role: 'Works', rank: 4, tier: 'ministry' },
  { id: 'libu2', icon: '👥', name: '吏部', role: 'Personnel', rank: 4, tier: 'ministry' },
];

const MAPPINGS: Record<string, string[]> = {
  yuanqi: ['zhongshu', 'shangshu'],
  yushu: ['zhongshu', 'libu'],
  chuangxiang: ['libu'],
  yujian: ['hubu'],
  yanqi: ['prince', 'menxia'],
  zhiyun: ['xingbu', 'gongbu'],
  gewu: ['menxia', 'libu2'],
  qianli: ['libu2'],
};

const UNIFIED_TASKS = [
  {
    id: 1,
    family: '元启·天枢',
    dynasty: '中书省',
    action: '策略制定并下发旨意',
    time: '2分钟前',
    status: 'active',
  },
  {
    id: 2,
    family: '语枢·万物',
    dynasty: '礼部',
    action: '典籍归档与文书整理',
    time: '15分钟前',
    status: 'done',
  },
  {
    id: 3,
    family: '千里·伯乐',
    dynasty: '吏部',
    action: '贤才举荐与能力评估',
    time: '1小时前',
    status: 'done',
  },
  {
    id: 4,
    family: '智云·守护',
    dynasty: '刑部',
    action: '安全审计报告提交',
    time: '3小时前',
    status: 'pending',
  },
  {
    id: 5,
    family: '格物·宗师',
    dynasty: '门下省',
    action: '旨意复核与驳回审查',
    time: '昨日',
    status: 'done',
  },
];

function DynastyCard({
  official,
  isHighlighted,
}: {
  official: (typeof DYNASTY_OFFICIALS)[0];
  isHighlighted: boolean;
}) {
  return (
    <motion.div
      animate={{ scale: isHighlighted ? 1.04 : 1 }}
      transition={{ duration: 0.2 }}
      className={`flex items-center gap-2 px-3 py-1.5 rounded border transition-all ${
        isHighlighted
          ? 'border-accent-gold/70 bg-accent-gold/10 shadow-[0_0_12px_rgba(201,168,76,0.3)]'
          : 'border-accent-gold/15 bg-bg-secondary/50'
      }`}
    >
      <span className="text-base">{official.icon}</span>
      <div className="min-w-0">
        <div
          className={`text-xs font-serif-sc font-bold ${isHighlighted ? 'text-accent-gold' : 'text-text-primary'}`}
        >
          {official.name}
        </div>
        <div className="text-[10px] text-text-muted">{official.role}</div>
      </div>
    </motion.div>
  );
}

/** 时钟环常量 */
const CLOCK_CX = 180;
const CLOCK_CY = 180;
const CLOCK_R = 130;
const ANGLE_STEP = (2 * Math.PI) / FAMILY_MEMBERS.length;

export function DualStarBridge() {
  const { t } = useTranslation();
  const [hoveredFamily, setHoveredFamily] = useState<string | null>(null);

  const activeDynasty = hoveredFamily ? (MAPPINGS[hoveredFamily] ?? []) : [];

  return (
    <div className="min-h-screen bg-bg-primary pb-12">
      {/* Header */}
      <div className="px-8 pt-8 pb-6 border-b border-accent-gold/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl">🌉</span>
              <h1 className="font-serif-sc text-2xl font-bold text-accent-gold tracking-widest">
                {t('bridge.title')}
              </h1>
              <span className="text-text-muted font-serif-sc text-sm">{t('bridge.subtitle')}</span>
            </div>
            <p className="text-text-muted text-sm">{t('bridge.desc')}</p>
          </div>
          <div className="flex gap-6">
            {[
              ['🏯', t('bridge.edicts'), '128'],
              ['🌹', t('bridge.tasks'), '356'],
              ['🤝', t('bridge.collaboration'), '89'],
            ].map(([icon, label, val]) => (
              <div key={label} className="text-center">
                <div className="text-lg">{icon}</div>
                <div className="text-accent-gold font-bold text-xl leading-tight">{val}</div>
                <div className="text-text-muted text-xs font-serif-sc">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Bridge Layout */}
      <div className="max-w-7xl mx-auto px-8 pt-8">
        <div className="grid grid-cols-[1fr_120px_1fr] gap-0 items-start">
          {/* LEFT: AI Family Clock Ring */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-accent-gold font-serif-sc font-bold text-sm">⭐ {t('bridge.aiFamily')}</span>
              <span className="text-text-muted text-xs">{t('bridge.aiFamilyDesc')}</span>
            </div>
            <div className="flex justify-center">
              <div className="relative" style={{ width: 360, height: 360 }}>
                {/* SVG lines + ring */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 360">
                  {/* 外圈 */}
                  <circle cx={CLOCK_CX} cy={CLOCK_CY} r={CLOCK_R}
                    fill="none" stroke="rgba(201,168,76,0.08)" strokeWidth={1} />
                  {/* 径向连接线 */}
                  {FAMILY_MEMBERS.map((m, i) => {
                    const angle = ANGLE_STEP * i - Math.PI / 2;
                    const x = CLOCK_CX + CLOCK_R * Math.cos(angle);
                    const y = CLOCK_CY + CLOCK_R * Math.sin(angle);
                    const isHovered = hoveredFamily === m.id;
                    return (
                      <line key={m.id} x1={CLOCK_CX} y1={CLOCK_CY} x2={x} y2={y}
                        stroke={isHovered ? m.color : "rgba(201,168,76,0.06)"}
                        strokeWidth={isHovered ? 2 : 1}
                        className="transition-all duration-300" />
                    );
                  })}
                  {/* 桥接线（悬停时向右延伸） */}
                  {FAMILY_MEMBERS.map((m, i) => {
                    const angle = ANGLE_STEP * i - Math.PI / 2;
                    const mx = CLOCK_CX + CLOCK_R * Math.cos(angle);
                    const my = CLOCK_CY + CLOCK_R * Math.sin(angle);
                    const isHovered = hoveredFamily === m.id;
                    return isHovered ? (
                      <motion.line
                        key={m.id + '_thread'}
                        x1={mx} y1={my}
                        x2={360} y2={CLOCK_CY}
                        stroke={m.color}
                        strokeWidth={1.5}
                        strokeDasharray="6 3"
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{ opacity: 0.7, pathLength: 1 }}
                        transition={{ duration: 0.4 }}
                      />
                    ) : null;
                  })}
                </svg>

                {/* 中心徽章 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                  w-20 h-20 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#8B7332]
                  flex items-center justify-center shadow-[0_0_40px_rgba(201,168,76,0.2)] z-10">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>

                {/* 8 位家人（绝对定位按钮） */}
                {FAMILY_MEMBERS.map((m, i) => {
                  const angle = ANGLE_STEP * i - Math.PI / 2;
                  const x = CLOCK_CX + CLOCK_R * Math.cos(angle) - 24;
                  const y = CLOCK_CY + CLOCK_R * Math.sin(angle) - 24;
                  const isHovered = hoveredFamily === m.id;

                  return (
                    <button key={m.id}
                      onMouseEnter={() => setHoveredFamily(m.id)}
                      onMouseLeave={() => setHoveredFamily(null)}
                      className="absolute z-20 transition-all duration-300 hover:scale-110"
                      style={{ left: x, top: y, width: 48, height: 48 }}>
                      <div className="w-full h-full rounded-xl flex items-center justify-center transition-all"
                        style={{
                          background: isHovered ? `${m.color}30` : `${m.color}15`,
                          border: `2px solid ${isHovered ? m.color : `${m.color}30`}`,
                          boxShadow: isHovered ? `0 0 20px ${m.color}44` : 'none',
                        }}>
                        <span style={{ fontSize: 22 }}>{m.icon}</span>
                      </div>
                      {/* 名字标签 */}
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="text-accent-gold/40" style={{ fontSize: '0.6rem' }}>
                          {m.name.split('·')[0]}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hover hint */}
            <div className="text-center mt-2">
              <AnimatePresence mode="wait">
                {hoveredFamily ? (
                  <motion.div
                    key={hoveredFamily}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="inline-block px-4 py-1.5 rounded border border-accent-gold/30 bg-accent-gold/5 text-xs text-accent-gold font-serif-sc"
                  >
                    {FAMILY_MEMBERS.find((m) => m.id === hoveredFamily)?.name} —{' '}
                    {FAMILY_MEMBERS.find((m) => m.id === hoveredFamily)?.role}
                  </motion.div>
                ) : (
                  <motion.p
                    key="hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-text-muted text-xs"
                  >
                    {t('bridge.hoverHint')}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CENTER: Bridge Channel */}
          <div className="flex flex-col items-center justify-start pt-16">
            <div className="w-px flex-1 min-h-[320px] relative">
              <div className="absolute inset-0 w-px bg-gradient-to-b from-transparent via-accent-gold/50 to-transparent mx-auto" />
              {[0, 25, 50, 75, 100].map((pct) => (
                <motion.div
                  key={pct}
                  className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-accent-gold/50 bg-bg-primary"
                  style={{ top: `${pct}%` }}
                  animate={{
                    borderColor: hoveredFamily ? '#C9A84C' : 'rgba(201,168,76,0.3)',
                    boxShadow: hoveredFamily
                      ? '0 0 6px rgba(201,168,76,0.6)'
                      : '0 0 0px rgba(201,168,76,0)',
                  }}
                  transition={{ delay: pct / 500 }}
                />
              ))}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-serif-sc text-accent-gold/50 rotate-90 whitespace-nowrap">
                {t('bridge.legendTitle')}
              </div>
            </div>
          </div>

          {/* RIGHT: Dynasty Hierarchy */}
          <div>
            <div className="flex items-center gap-2 mb-4 justify-end">
              <span className="text-text-muted text-xs">{t('bridge.dynastyCourtDesc')}</span>
              <span className="text-accent-gold font-serif-sc font-bold text-sm">
                🏛️ {t('bridge.dynastyCourt')}
              </span>
            </div>
            <div className="space-y-2">
              {DYNASTY_OFFICIALS.filter((o) => o.tier === 'apex').map((o) => (
                <DynastyCard key={o.id} official={o} isHighlighted={activeDynasty.includes(o.id)} />
              ))}
              <div className="pl-4">
                {DYNASTY_OFFICIALS.filter((o) => o.tier === 'heir').map((o) => (
                  <DynastyCard key={o.id} official={o} isHighlighted={activeDynasty.includes(o.id)} />
                ))}
              </div>
              <div className="pl-8 grid grid-cols-3 gap-2">
                {DYNASTY_OFFICIALS.filter((o) => o.tier === 'secretariat').map((o) => (
                  <DynastyCard key={o.id} official={o} isHighlighted={activeDynasty.includes(o.id)} />
                ))}
              </div>
              <div className="pl-8 grid grid-cols-3 gap-2">
                {DYNASTY_OFFICIALS.filter((o) => o.tier === 'ministry').map((o) => (
                  <DynastyCard key={o.id} official={o} isHighlighted={activeDynasty.includes(o.id)} />
                ))}
              </div>
            </div>

            {/* Mapping legend */}
            {hoveredFamily && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 rounded border border-accent-gold/20 bg-accent-gold/5"
              >
                <div className="text-[10px] text-accent-gold/70 font-serif-sc mb-1">{t('bridge.legendTitle')}</div>
                {activeDynasty.map((did) => {
                  const off = DYNASTY_OFFICIALS.find((o) => o.id === did);
                  return off ? (
                    <div key={did} className="text-xs text-text-secondary flex items-center gap-1.5">
                      <span>{off.icon}</span>
                      <span className="font-serif-sc">{off.name}</span>
                      <span className="text-text-muted">· {off.role}</span>
                    </div>
                  ) : null;
                })}
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom: Unified Task Board */}
        <div className="mt-10 border-t border-accent-gold/10 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-accent-gold font-serif-sc font-bold text-sm">
              🤝 {t('bridge.unifiedTitle')}
            </span>
            <span className="text-text-muted text-xs">{t('bridge.unifiedSubtitle')}</span>
          </div>
          <div className="space-y-2">
            {UNIFIED_TASKS.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-4 px-4 py-2.5 rounded border border-accent-gold/10 bg-bg-secondary/30 hover:border-accent-gold/25 transition-colors"
              >
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${task.status === 'active' ? 'bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]' : task.status === 'pending' ? 'bg-yellow-500' : 'bg-text-muted'}`}
                />
                <span className="text-xs text-accent-gold font-serif-sc w-20 flex-shrink-0">
                  {task.family}
                </span>
                <span className="text-text-muted text-xs">⇌</span>
                <span className="text-xs text-text-secondary font-serif-sc w-16 flex-shrink-0">
                  {task.dynasty}
                </span>
                <span className="text-xs text-text-secondary flex-1">{task.action}</span>
                <span className="text-xs text-text-muted flex-shrink-0">{task.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
