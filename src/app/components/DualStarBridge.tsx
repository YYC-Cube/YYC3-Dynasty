import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const FAMILY_MEMBERS = [
  {
    id: 'qianli',
    icon: '⭐',
    name: '千里·伯乐',
    role: '推荐·知识检索',
    color: '#C9A84C',
    angle: 90,
  },
  {
    id: 'zhiyun',
    icon: '🛡️',
    name: '智云·守护',
    role: '安全·基础设施',
    color: '#7B9EA8',
    angle: 30,
  },
  {
    id: 'yujian',
    icon: '🔮',
    name: '预见·先知',
    role: '预测·Physical AI',
    color: '#9B7BC4',
    angle: 330,
  },
  {
    id: 'yuanqi',
    icon: '⚙️',
    name: '元启·天枢',
    role: '决策·Agentic AI',
    color: '#E8734A',
    angle: 270,
  },
  { id: 'yushu', icon: '🧠', name: '语枢·万物', role: '记忆·训练AI', color: '#5B9B8A', angle: 210 },
  {
    id: 'yanqi',
    icon: '👂',
    name: '言启·千行',
    role: '感知·NLU路由',
    color: '#A8915A',
    angle: 150,
  },
  {
    id: 'chuangxiang',
    icon: '🎨',
    name: '创想·灵韵',
    role: '创作·视觉',
    color: '#C47BA8',
    angle: 315,
  },
  { id: 'gewu', icon: '⚖️', name: '格物·宗师', role: '推理·验证', color: '#6A9BC4', angle: 225 },
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

function FamilyMemberBadge({
  member,
  isActive,
  isHighlighted,
  onHover,
  onLeave,
  cx,
  cy,
}: {
  member: (typeof FAMILY_MEMBERS)[0];
  isActive: boolean;
  isHighlighted: boolean;
  onHover: () => void;
  onLeave: () => void;
  cx: number;
  cy: number;
}) {
  return (
    <motion.g
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{ cursor: 'pointer' }}
      animate={{ scale: isActive ? 1.25 : isHighlighted ? 1.05 : 1 }}
      transition={{ duration: 0.2 }}
    >
      {isActive && (
        <motion.circle
          cx={cx}
          cy={cy}
          r={36}
          fill="none"
          stroke={member.color}
          strokeWidth={2}
          initial={{ opacity: 0, r: 30 }}
          animate={{ opacity: [0.8, 0.3, 0.8], r: 36 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      <circle
        cx={cx}
        cy={cy}
        r={28}
        fill="#0f1520"
        stroke={isActive ? member.color : '#C9A84C33'}
        strokeWidth={isActive ? 2 : 1}
      />
      <text x={cx} y={cy + 2} textAnchor="middle" dominantBaseline="middle" fontSize={20}>
        {member.icon}
      </text>
      <text
        x={cx}
        y={cy + 18}
        textAnchor="middle"
        fill={isActive ? member.color : '#C9A84C99'}
        fontSize={9}
        fontFamily="serif"
      >
        {member.name.split('·')[0]}
      </text>
    </motion.g>
  );
}

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

export function DualStarBridge() {
  const [hoveredFamily, setHoveredFamily] = useState<string | null>(null);

  const activeDynasty = hoveredFamily ? (MAPPINGS[hoveredFamily] ?? []) : [];

  const CX = 200;
  const CY = 200;
  const R = 145;

  return (
    <div className="min-h-screen bg-bg-primary pb-12">
      {/* Header */}
      <div className="px-8 pt-8 pb-6 border-b border-accent-gold/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl">🌉</span>
              <h1 className="font-serif-sc text-2xl font-bold text-accent-gold tracking-widest">
                双星桥
              </h1>
              <span className="text-text-muted font-serif-sc text-sm">Dual Star Bridge</span>
            </div>
            <p className="text-text-muted text-sm">
              AI Family × Dynasty Court · 鹊桥映射 · 双架构联治全景
            </p>
          </div>
          <div className="flex gap-6">
            {[
              ['🏯', '旨意', '128'],
              ['🌹', '任务', '356'],
              ['🤝', '协作', '89'],
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
          {/* LEFT: AI Family Constellation */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-accent-gold font-serif-sc font-bold text-sm">⭐ AI Family</span>
              <span className="text-text-muted text-xs">8家人·圆环星座</span>
            </div>
            <div className="flex justify-center">
              <svg width={400} height={400} viewBox="0 0 400 400">
                {/* Milky way background arc */}
                <defs>
                  <radialGradient id="milky" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
                  </radialGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <circle
                  cx={CX}
                  cy={CY}
                  r={R}
                  fill="url(#milky)"
                  stroke="#C9A84C22"
                  strokeWidth={1}
                  strokeDasharray="4 6"
                />

                {/* Threads to bridge for hovered member */}
                {FAMILY_MEMBERS.map((m) => {
                  const rad = (m.angle * Math.PI) / 180;
                  const mx = CX + R * Math.cos(rad);
                  const my = CY - R * Math.sin(rad);
                  const isActive = hoveredFamily === m.id;
                  return isActive ? (
                    <motion.line
                      key={m.id + '_thread'}
                      x1={mx}
                      y1={my}
                      x2={400}
                      y2={CY}
                      stroke={m.color}
                      strokeWidth={1.5}
                      strokeDasharray="6 3"
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={{ opacity: 0.7, pathLength: 1 }}
                      transition={{ duration: 0.4 }}
                      filter="url(#glow)"
                    />
                  ) : null;
                })}

                {/* Center seal */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={32}
                  fill="#0f1520"
                  stroke="#C9A84C55"
                  strokeWidth={1.5}
                />
                <text
                  x={CX}
                  y={CY + 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#C9A84C"
                  fontSize={22}
                  fontFamily="serif"
                >
                  玺
                </text>
                <text
                  x={CX}
                  y={CY + 16}
                  textAnchor="middle"
                  fill="#C9A84C66"
                  fontSize={8}
                  fontFamily="serif"
                >
                  YYC³
                </text>

                {/* Family members */}
                {FAMILY_MEMBERS.map((m) => {
                  const rad = (m.angle * Math.PI) / 180;
                  const mx = CX + R * Math.cos(rad);
                  const my = CY - R * Math.sin(rad);
                  return (
                    <FamilyMemberBadge
                      key={m.id}
                      member={m}
                      isActive={hoveredFamily === m.id}
                      isHighlighted={hoveredFamily !== null && hoveredFamily !== m.id}
                      onHover={() => setHoveredFamily(m.id)}
                      onLeave={() => setHoveredFamily(null)}
                      cx={mx}
                      cy={my}
                    />
                  );
                })}
              </svg>
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
                    悬停家人·查看桥接映射
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CENTER: Bridge Channel */}
          <div className="flex flex-col items-center justify-start pt-16">
            <div className="w-px flex-1 min-h-[320px] relative">
              {/* Bridge pillar */}
              <div className="absolute inset-0 w-px bg-gradient-to-b from-transparent via-accent-gold/50 to-transparent mx-auto" />
              {/* Bridge ornaments */}
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
                鹊桥映射
              </div>
            </div>
          </div>

          {/* RIGHT: Dynasty Hierarchy */}
          <div>
            <div className="flex items-center gap-2 mb-4 justify-end">
              <span className="text-text-muted text-xs">12朝臣·层级排列</span>
              <span className="text-accent-gold font-serif-sc font-bold text-sm">
                🏛️ Dynasty Court
              </span>
            </div>
            <div className="space-y-2">
              {/* Apex */}
              {DYNASTY_OFFICIALS.filter((o) => o.tier === 'apex').map((o) => (
                <DynastyCard key={o.id} official={o} isHighlighted={activeDynasty.includes(o.id)} />
              ))}
              {/* Heir */}
              <div className="pl-4">
                {DYNASTY_OFFICIALS.filter((o) => o.tier === 'heir').map((o) => (
                  <DynastyCard
                    key={o.id}
                    official={o}
                    isHighlighted={activeDynasty.includes(o.id)}
                  />
                ))}
              </div>
              {/* Secretariat row */}
              <div className="pl-8 grid grid-cols-3 gap-2">
                {DYNASTY_OFFICIALS.filter((o) => o.tier === 'secretariat').map((o) => (
                  <DynastyCard
                    key={o.id}
                    official={o}
                    isHighlighted={activeDynasty.includes(o.id)}
                  />
                ))}
              </div>
              {/* Ministries */}
              <div className="pl-8 grid grid-cols-3 gap-2">
                {DYNASTY_OFFICIALS.filter((o) => o.tier === 'ministry').map((o) => (
                  <DynastyCard
                    key={o.id}
                    official={o}
                    isHighlighted={activeDynasty.includes(o.id)}
                  />
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
                <div className="text-[10px] text-accent-gold/70 font-serif-sc mb-1">桥接对应</div>
                {activeDynasty.map((did) => {
                  const off = DYNASTY_OFFICIALS.find((o) => o.id === did);
                  return off ? (
                    <div
                      key={did}
                      className="text-xs text-text-secondary flex items-center gap-1.5"
                    >
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
              🤝 近期联合旨意
            </span>
            <span className="text-text-muted text-xs">Family × Dynasty 协同任务</span>
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
