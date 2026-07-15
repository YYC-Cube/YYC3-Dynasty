/**
 * file: EdictDetail.tsx
 * description: 旨意详情组件 · 单条圣旨完整展示
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-21
 * updated: 2026-07-12
 * status: active
 * tags: [component],[edict],[detail]
 *
 * brief: 圣旨/旨意详情页
 *
 * details:
 * - 从路由参数获取旨意 ID
 * - 展示完整内容与流转日志
 *
 * dependencies: React, react-router, motion/react, lucide-react
 * exports: EdictDetail
 */

import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, X, Zap } from 'lucide-react';

export function EdictDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for the detail
  const edict = {
    id: id || 'edict-042',
    title: '修缮云枢殿防火墙',
    type: '敕书',
    urgency: '火急 🔥',
    body: '兹令兵部、工部协力修缮云枢殿防火墙之薄弱处，限三日内完成，不得有误。',
    status: '执行中',
    creator: '天子',
    drafter: '中书省·中书令',
    draftTime: '巳时三刻',
    logs: [
      '[午时二刻] 兵部·大将军 → 开始执行 edict-042',
      '[午时一刻] 尚书省·尚书令 → 派发至兵部/工部',
      '[巳时四刻] 门下省·门下侍中 → 审议通过 ✅',
      '[巳时三刻] 中书省·中书令 → 草拟方案完成',
      '[巳时二刻] 太子 → 分拣至兵部/工部',
      '[巳时一刻] 天子 → 颁旨 (敕书·火急)',
    ],
    ministries: [
      { name: '兵部', icon: '⚔️', progress: 80, tokens: 2, status: '执行中 🔄' },
      { name: '工部', icon: '🔧', progress: 60, tokens: 1, status: '执行中 🔄' },
    ],
    seals: [
      { title: '天子', label: '玉玺✓', verified: true },
      { title: '中书令', label: '中书印✓', verified: true },
      { title: '门下侍中', label: '门下印✓', verified: true },
      { title: '尚书令', label: '尚书印✓', verified: true },
    ],
    currentStageIndex: 5,
  };

  const stages = ['下旨', '分拣', '草拟', '审议', '派发', '执行', '归档'];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-start pt-10 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-[720px] bg-[#0a0e17] border border-accent-gold/20 rounded-t-2xl shadow-[0_0_60px_rgba(0,0,0,0.8)] min-h-[900px] flex flex-col mb-20"
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 h-14 bg-[#1a1f2e]/90 backdrop-blur border-b border-accent-gold/20 flex items-center justify-between px-6 rounded-t-2xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-text-secondary hover:text-accent-gold flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> 返回旨意板
            </button>
            <div className="font-mono-jb text-sm border border-accent-gold/50 text-accent-gold px-2 py-0.5 rounded bg-accent-gold/5">
              #{edict.id}
            </div>
            <div className="flex items-center gap-2 px-2 py-0.5 rounded-full text-xs text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/30">
              {edict.status}{' '}
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-1 text-xs font-serif-sc border border-[#f59e0b]/50 text-[#f59e0b] hover:bg-[#f59e0b]/10 rounded transition-colors flex items-center gap-1">
              <Zap className="w-3 h-3" /> 催办
            </button>
            <button
              onClick={() => navigate(-1)}
              className="text-text-secondary hover:text-accent-red"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scroll Area */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8 pb-32">
          {/* Section 1: Edict Header (Scroll Look) */}
          <div className="relative bg-[#f5e6c8] text-[#333] border-4 border-[#d4a843] rounded px-10 py-12 shadow-lg mx-4">
            {/* Scroll decorative ends */}
            <div className="absolute top-0 bottom-0 left-0 w-4 bg-[#4a3728] border-r border-[#d4a843]" />
            <div className="absolute top-0 bottom-0 right-0 w-4 bg-[#4a3728] border-l border-[#d4a843]" />

            <div className="text-center font-ancient text-2xl font-bold tracking-[1em] mb-8 border-b-2 border-[#333]/20 pb-4">
              奉 天 承 运<br />皇 帝 诏 曰
            </div>

            <div className="flex justify-center gap-6 mb-8 text-sm font-serif-sc font-bold">
              <span className="bg-[#333]/5 px-3 py-1 rounded">圣旨类型: {edict.type}</span>
              <span className="text-accent-red bg-accent-red/5 px-3 py-1 rounded">
                紧急程度: {edict.urgency}
              </span>
            </div>

            <div className="text-center text-xl font-serif-sc font-bold mb-6">{edict.title}</div>

            <div className="font-serif-sc leading-loose text-justify mb-8 px-4 border-l-4 border-accent-red pl-4">
              制曰：{edict.body}
            </div>

            <div className="text-right text-sm font-serif-sc text-[#666]">
              [✍️ {edict.drafter} 草拟] {edict.draftTime}
            </div>
          </div>

          {/* Section 2: Seven-Stage Flow */}
          <div className="bg-[#1a1f2e] border border-white/5 rounded-xl p-6">
            <div className="flex justify-between relative">
              {/* Lines */}
              <div className="absolute left-6 right-6 top-4 h-[2px] bg-white/10 z-0" />
              <div
                className="absolute left-6 top-4 h-[2px] bg-accent-gold z-0 transition-all duration-1000"
                style={{ width: `calc(${edict.currentStageIndex} * (100% - 3rem) / 6)` }}
              />

              {stages.map((stage, idx) => {
                const isCompleted = idx < edict.currentStageIndex;
                const isCurrent = idx === edict.currentStageIndex;
                return (
                  <div
                    key={stage}
                    className="flex flex-col items-center gap-3 z-10 bg-[#1a1f2e] px-2"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                        isCompleted
                          ? 'bg-accent-gold text-[#1a1f2e] border-accent-gold'
                          : isCurrent
                            ? 'bg-[#1a1f2e] border-accent-gold text-accent-gold border-dashed animate-[spin_4s_linear_infinite]'
                            : 'bg-[#1a1f2e] border-white/20 text-text-secondary'
                      }`}
                    >
                      {isCompleted ? '✓' : isCurrent ? '🔄' : '○'}
                    </div>
                    <span
                      className={`text-xs font-serif-sc ${isCompleted || isCurrent ? 'text-accent-gold' : 'text-text-secondary'}`}
                    >
                      {stage}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Approval Seal Chain */}
          <div className="bg-[#1a1f2e] border border-white/5 rounded-xl p-6">
            <div className="text-sm text-text-secondary mb-4 font-serif-sc">签章链</div>
            <div className="flex items-center gap-4">
              {edict.seals.map((seal, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 border-2 border-accent-red text-accent-red rounded flex items-center justify-center font-ancient text-sm rotate-[-5deg] shadow-[0_0_15px_rgba(194,65,75,0.2)] bg-accent-red/5">
                      {seal.label.replace('✓', '')}
                    </div>
                    <div className="text-xs text-text-secondary">{seal.title}</div>
                  </div>
                  {i < edict.seals.length - 1 && <div className="w-8 h-[2px] bg-accent-gold/30" />}
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Assigned Ministries */}
          <div className="grid grid-cols-2 gap-4">
            {edict.ministries.map((min, i) => (
              <div key={i} className="bg-[#1a1f2e] border border-white/5 rounded-xl p-5">
                <div className="flex items-center gap-2 text-lg font-serif-sc mb-4 text-accent-gold">
                  {min.icon} {min.name}
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-text-secondary mb-1">
                      <span>进度</span>
                      <span>{min.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-black rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-gold"
                        style={{ width: `${min.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">令牌:</span>
                    <span>
                      {'🐟'.repeat(min.tokens)} × {min.tokens}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">状态:</span>
                    <span className="text-[#10b981]">{min.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section 5: Flow Log */}
          <div className="bg-[#1a1f2e] border border-white/5 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
              <div className="font-serif-sc text-sm text-accent-gold flex items-center gap-2">
                📜 流转日志
              </div>
            </div>
            <div className="p-4 font-mono-jb text-xs text-text-secondary space-y-3">
              {edict.logs.map((log, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="text-accent-gold/50">{log.split(']')[0] + ']'}</span>
                  <span className={log.includes('✅') ? 'text-[#10b981]' : 'text-text-primary/80'}>
                    {log.split(']')[1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#1a1f2e] border-t border-accent-gold/20 flex items-center justify-center gap-4 rounded-b-2xl">
          <button className="px-4 py-2 text-sm font-serif-sc bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/50 hover:bg-[#f59e0b]/30 rounded transition-colors flex items-center gap-1">
            <Zap className="w-4 h-4" /> 催办
          </button>
          <button className="px-4 py-2 text-sm font-serif-sc border border-white/20 text-text-secondary hover:text-white hover:border-white/40 rounded transition-colors">
            撤回 ↩
          </button>
          <button className="px-4 py-2 text-sm font-serif-sc border border-accent-red/30 text-accent-red hover:bg-accent-red/10 rounded transition-colors">
            封驳 ✕
          </button>
          <button className="px-4 py-2 text-sm font-serif-sc border border-white/20 text-text-secondary hover:text-white hover:border-white/40 rounded transition-colors">
            复制敕令编号 📋
          </button>
        </div>
      </motion.div>
    </div>
  );
}
