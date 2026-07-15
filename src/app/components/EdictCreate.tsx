/**
 * file: EdictCreate.tsx
 * description: 新建旨意组件 · 圣旨创建表单
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-21
 * updated: 2026-07-12
 * status: active
 * tags: [component],[edict],[create],[form]
 *
 * brief: 新建圣旨/旨意页面
 *
 * details:
 * - 填写旨意内容、目标部门等
 * - 调用 API 创建任务
 * - 玉玺盖章确认
 *
 * dependencies: React, react-router, motion/react, ../api
 * exports: EdictCreate
 */

import { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ImperialSeal, type SealState } from './ImperialSeal';
import { api } from '../api';
import { toastEmitter } from './toastEmitter';

export function EdictCreate() {
  const [phase, setPhase] = useState<
    'initial' | 'descent' | 'unfurl' | 'settle' | 'seal_prep' | 'sealing' | 'done'
  >('initial');

  // Form State
  const [title, setTitle] = useState('');
  const [urgency, setUrgency] = useState<'缓' | '急' | '火急' | '十万火急'>('缓');
  const [selectedMinistries, setSelectedMinistries] = useState<string[]>([]);
  const [body, setBody] = useState('');
  const [edictType, setEdictType] = useState<'制书' | '敕书' | '敕牒' | '堂帖' | '密奏'>('敕书');

  const [sealState, setSealState] = useState<SealState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const ministries = ['兵部', '工部', '刑部', '户部', '礼部', '吏部'];
  const urgencies = ['缓', '急', '火急', '十万火急'] as const;
  const edictTypes = ['制书', '敕书', '敕牒', '堂帖', '密奏'] as const;

  const toggleMinistry = (m: string) => {
    setSelectedMinistries((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m],
    );
  };

  const startAnimation = () => {
    if (phase !== 'initial') return;
    setPhase('descent');
    setTimeout(() => setPhase('unfurl'), 400);
    setTimeout(() => setPhase('settle'), 1200);
    setTimeout(() => setPhase('seal_prep'), 1500);
  };

  const validate = () => {
    const newErrs: Record<string, string> = {};
    if (title.trim().length < 2) newErrs.title = '请拟旨意标题';
    if (selectedMinistries.length === 0) newErrs.ministries = '请至少指派一个执行部门';
    if (body.trim().length < 10) newErrs.body = '旨意详情不可少于10字';
    setErrors(newErrs);
    return Object.keys(newErrs).length === 0;
  };

  const handleSeal = async () => {
    if (!validate()) return;
    setPhase('sealing');
    setSealState('pressing');

    try {
      const result = await api.createTask({
        title: title + '\n\n' + body,
        org: '中书省',
        targetDept: selectedMinistries.join(','),
        priority: urgency,
      });
      if (result.ok) {
        toastEmitter.emit({ level: 'normal', title: `📜 ${result.taskId} 旨意已下达` });
      } else {
        toastEmitter.emit({
          level: 'important',
          title: `旨意下达失败${result.error ? ': ' + result.error : ''}`,
        });
      }
    } catch (_e) {
      toastEmitter.emit({ level: 'important', title: '系统连接错误' });
    }

    setTimeout(() => {
      setSealState('stamped');
      setPhase('done');
    }, 700);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 overflow-hidden"
      onClick={phase === 'initial' ? startAnimation : undefined}
    >
      {phase === 'initial' && (
        <div className="absolute inset-0 flex items-center justify-center text-accent-gold/50 font-serif-sc text-xl cursor-pointer">
          点击以拟旨
        </div>
      )}

      {/* Main Scroll Container */}
      <AnimatePresence>
        {phase !== 'initial' && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{
              y: phase === 'descent' ? 0 : phase === 'done' ? -20 : 0,
              opacity: 1,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative flex h-[900px] max-h-[90vh] items-stretch shadow-2xl"
          >
            {/* Left Roller */}
            <motion.div
              className="w-4 bg-gradient-to-r from-[#3a2718] to-[#5c4033] border-y-4 border-accent-gold/80 rounded-l-full z-20 shadow-[4px_0_10px_rgba(0,0,0,0.5)] flex items-center"
              animate={{ rotate: phase === 'unfurl' ? 360 : 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />

            {/* The Scroll Itself */}
            <motion.div
              initial={{ width: 60 }}
              animate={{ width: phase === 'descent' ? 60 : 600 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="relative bg-[#f5e6c8] overflow-hidden flex flex-col items-center"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
              }}
            >
              {/* Left/Right Dragon Brocade Borders */}
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-[#d4a843]/20 border-r border-[#b8860b]/30 z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-4 bg-[#d4a843]/20 border-l border-[#b8860b]/30 z-10" />

              {/* Scroll Content (Fades in during unfurl) */}
              <motion.div
                className="w-full h-full flex flex-col items-stretch pt-0 px-8 pb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase !== 'descent' ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Header Silk */}
                <div className="w-full h-24 bg-[#1e3a5f] mx-auto flex flex-col items-center justify-center border-b-[6px] border-[#b8860b] shadow-md mb-8 px-12">
                  <h1 className="font-ancient text-3xl text-[#e8d5a3] tracking-[0.5em] mb-1">
                    奉天承運
                  </h1>
                  <h2 className="font-ancient text-2xl text-[#e8d5a3] tracking-[1em]">皇帝詔曰</h2>
                </div>

                {/* Form Fields Container */}
                <div className="flex-1 flex flex-col px-4 space-y-6 overflow-y-auto hide-scrollbar text-[#333]">
                  {/* Type & Urgency Row */}
                  <div className="flex justify-between items-center bg-black/5 p-3 rounded-lg border border-[#b8860b]/20">
                    <div className="flex gap-2">
                      <span className="font-serif-sc font-bold text-[#5c4033] mr-2">旨意类型:</span>
                      {edictTypes.map((t) => (
                        <button
                          key={t}
                          onClick={() => setEdictType(t)}
                          className={`px-2 py-0.5 rounded text-sm transition-colors border ${edictType === t ? 'bg-[#b8860b] text-white border-[#b8860b]' : 'bg-transparent border-[#b8860b]/30 text-[#5c4033] hover:bg-[#b8860b]/10'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="relative pl-4">
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${errors.title ? 'bg-[#c2414b]' : 'bg-[#b8860b]'}`}
                    />
                    <input
                      type="text"
                      placeholder="拟定旨意标题..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={`w-full bg-transparent border-b-2 text-2xl font-serif-sc font-bold text-[#333] placeholder-[#333]/30 focus:outline-none pb-2 ${errors.title ? 'border-[#c2414b]' : 'border-[#b8860b]/30 focus:border-[#b8860b]'}`}
                    />
                    {errors.title && (
                      <span className="text-[#c2414b] text-xs absolute right-0 bottom-2">
                        {errors.title}
                      </span>
                    )}
                  </div>

                  {/* Urgency */}
                  <div className="flex items-center gap-4">
                    <span className="font-serif-sc font-bold text-[#5c4033]">紧急程度:</span>
                    <div className="flex gap-3">
                      {urgencies.map((u) => (
                        <button
                          key={u}
                          onClick={() => setUrgency(u)}
                          className={`relative flex items-center gap-1 px-3 py-1 rounded-full border transition-all ${
                            urgency === u
                              ? u.includes('火')
                                ? 'bg-[#c2414b] text-white border-[#c2414b] shadow-[0_0_10px_rgba(194,65,75,0.5)]'
                                : 'bg-[#b8860b] text-white border-[#b8860b]'
                              : 'bg-transparent border-[#b8860b]/30 text-[#5c4033] hover:bg-[#b8860b]/10'
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${urgency === u ? 'bg-white' : 'bg-[#b8860b]/50'}`}
                          />
                          {u}
                          {u === '十万火急' && urgency === u && (
                            <motion.span
                              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                              transition={{ repeat: Infinity, duration: 1 }}
                              className="absolute inset-0 border border-[#c2414b] rounded-full"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ministries */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-serif-sc font-bold text-[#5c4033]">指派六部:</span>
                      {errors.ministries && (
                        <span className="text-[#c2414b] text-xs">{errors.ministries}</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {ministries.map((m) => {
                        const isSelected = selectedMinistries.includes(m);
                        return (
                          <button
                            key={m}
                            onClick={() => toggleMinistry(m)}
                            className={`px-4 py-1.5 rounded text-sm font-bold transition-all border ${
                              isSelected
                                ? 'bg-[#10b981] text-white border-[#10b981] shadow-sm'
                                : 'bg-transparent border-[#b8860b]/30 text-[#5c4033] hover:bg-[#b8860b]/10'
                            }`}
                          >
                            {m}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Body Textarea */}
                  <div className="flex-1 min-h-[200px] flex flex-col relative">
                    <span className="font-serif-sc font-bold text-[#5c4033] mb-2">旨意详情:</span>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder="钦承此旨，不可怠慢..."
                      className={`flex-1 w-full bg-[#fcf5e3] border-2 rounded p-4 font-serif-sc text-lg leading-relaxed text-[#333] placeholder-[#333]/30 resize-none focus:outline-none ${
                        errors.body
                          ? 'border-[#c2414b]'
                          : 'border-[#b8860b]/20 focus:border-[#b8860b]/50'
                      }`}
                      style={{ writingMode: 'horizontal-tb' }} // Keeping horizontal for usability, though guidelines suggest vertical, modern web inputs are hard to use vertically
                    />
                    {errors.body && (
                      <span className="text-[#c2414b] text-xs absolute right-2 top-2">
                        {errors.body}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Area */}
                <div className="relative mt-6 pt-4 border-t-2 border-dashed border-[#b8860b]/30 flex justify-between items-end">
                  <div className="w-24 h-12 bg-[#1e3a5f] rounded-t-lg flex items-center justify-center border-t border-x border-[#b8860b]">
                    <span className="font-ancient text-[#e8d5a3] text-xl tracking-widest">
                      欽此
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button className="px-6 py-2 rounded border border-[#5c4033]/30 text-[#5c4033] hover:bg-[#5c4033]/5 font-serif-sc transition-colors">
                      存为草稿
                    </button>
                    {/* The Imperial Seal Component injected here when prep is done */}
                    <div className="w-20 h-20 relative">
                      <AnimatePresence>
                        {(phase === 'seal_prep' || phase === 'sealing' || phase === 'done') && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: -50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="absolute bottom-0 right-0 z-50"
                          >
                            <ImperialSeal state={sealState} onClick={handleSeal} />
                            {phase === 'seal_prep' && (
                              <div className="absolute -top-8 -left-12 w-32 text-center text-xs text-accent-red font-serif-sc font-bold animate-pulse">
                                点击玉玺颁旨
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Roller */}
            <motion.div
              className="w-4 bg-gradient-to-l from-[#3a2718] to-[#5c4033] border-y-4 border-accent-gold/80 rounded-r-full z-20 shadow-[-4px_0_10px_rgba(0,0,0,0.5)] flex items-center"
              animate={{ rotate: phase === 'unfurl' ? -360 : 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back button/Cancel */}
      <Link
        to="/court"
        className="absolute top-6 left-6 text-white/50 hover:text-white transition-colors z-50 flex items-center gap-2"
      >
        <span>← 返回朝堂</span>
      </Link>
    </div>
  );
}
