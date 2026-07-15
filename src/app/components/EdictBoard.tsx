/**
 * file: EdictBoard.tsx
 * description: 旨意看板组件 · 圣旨列表展示与筛选
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-21
 * updated: 2026-07-12
 * status: active
 * tags: [component],[edict],[board],[list]
 *
 * brief: 圣旨/旨意列表看板，支持筛选和批量操作
 *
 * details:
 * - 从 store 获取实时任务数据
 * - 支持按状态筛选（草拟/审议/执行/办结）
 * - 批量选择与操作
 * - 管道状态可视化
 *
 * dependencies: React, motion/react, lucide-react, ../store, ToastSystem
 * exports: EdictBoard
 */

import { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, CircleDashed, Clock, Search, Filter, FileText, Zap } from 'lucide-react';
import { toastEmitter } from './toastEmitter';
import { useStore, isEdict, isArchived, stateLabel, getPipeStatus, timeAgo } from '../store';
import type { Task } from '../api';

interface Edict {
  id: string;
  title: string;
  creator: string;
  time: string;
  status: '草拟中' | '审议中' | '执行中' | '已办结' | '已封驳' | string;
  currentDept: string;
  duration: string;
  seals: string[];
  logs: string[];
}

const FILTERS = ['全部', '草拟', '审议', '执行', '审查', '已完成'];

export function EdictBoard() {
  const [filter, setFilter] = useState('全部');
  const [batchMode, setBatchMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const liveStatus = useStore((s) => s.liveStatus);
  const tasks = liveStatus?.tasks || [];
  const activeEdicts = tasks.filter(isEdict).filter((t) => !isArchived(t));

  const mapTaskToEdict = (task: Task): Edict => {
    return {
      id: task.id,
      title: task.title,
      creator: String(task.sourceMeta?.sender ?? '天子'),
      time: timeAgo(task.updatedAt) || timeAgo(task.created_at) || '未知',
      status: stateLabel(task) || '未知',
      currentDept: task.org || '朝堂',
      duration: task.activity?.length ? '计算中' : '未知',
      seals: getPipeStatus(task)
        .filter((s) => s.status === 'done')
        .map((s) => `${s.dept}✓`),
      logs: task.flow_log?.map((l) => `[${timeAgo(l.at)}] ${l.from} → ${l.to}`) || [],
    };
  };

  const REAL_EDICTS = activeEdicts.map(mapTaskToEdict);

  const filteredEdicts = REAL_EDICTS.filter((e) => filter === '全部' || e.status.includes(filter));

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleAll = () => {
    if (selectedIds.length === filteredEdicts.length) setSelectedIds([]);
    else setSelectedIds(filteredEdicts.map((e) => e.id));
  };

  return (
    <div className="min-h-full bg-bg-primary text-text-primary px-6 py-8 flex flex-col items-center">
      <div className="w-full max-w-[900px] flex flex-col gap-8">
        {/* Header */}
        <div className="flex justify-between items-end border-b border-accent-gold/20 pb-6">
          <div>
            <h1 className="font-serif-sc font-black text-3xl text-accent-gold tracking-widest mb-2 flex items-center gap-3">
              <span className="text-4xl">📜</span> 旨 意 板
            </h1>
            <p className="text-sm text-text-secondary font-serif-sc tracking-widest">
              敕令流转 · 三省六部
            </p>
          </div>
          <Link
            to="/edict/create"
            className="px-6 py-2 bg-gradient-to-r from-[#d4a843] to-[#b8942e] text-[#1a1f2e] font-serif-sc font-bold rounded shadow-[0_0_20px_rgba(212,168,67,0.3)] hover:scale-105 transition-transform"
          >
            + 发起新敕令
          </Link>
        </div>

        {/* Filters and Batch Mode */}
        <div className="flex justify-between items-center bg-[#1a1f2e]/80 p-2 rounded-lg border border-white/5">
          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded text-sm font-serif-sc transition-colors ${
                  filter === f
                    ? 'bg-accent-gold/20 text-accent-gold border border-accent-gold/30'
                    : 'text-text-secondary hover:bg-white/5 border border-transparent'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 text-text-secondary px-4">
            <button
              onClick={() => {
                setBatchMode(!batchMode);
                setSelectedIds([]);
              }}
              className={`px-3 py-1 text-sm font-serif-sc rounded transition-colors ${batchMode ? 'bg-accent-gold text-[#1a1f2e]' : 'border border-white/20 hover:border-accent-gold hover:text-accent-gold'}`}
            >
              {batchMode ? '取消批量' : '批量操作'}
            </button>
            <Search className="w-4 h-4 hover:text-accent-gold cursor-pointer" />
            <Filter className="w-4 h-4 hover:text-accent-gold cursor-pointer" />
          </div>
        </div>

        {/* Batch Toolbar */}
        <AnimatePresence>
          {batchMode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center justify-between bg-accent-gold/10 border border-accent-gold/30 p-3 rounded-lg text-sm text-accent-gold">
                <div className="flex items-center gap-4">
                  <span className="font-serif-sc">已选 {selectedIds.length} 项</span>
                  <button onClick={toggleAll} className="hover:underline">
                    全选
                  </button>
                  <button onClick={() => setSelectedIds([])} className="hover:underline">
                    取消选择
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      toastEmitter.emit({
                        level: 'important',
                        title: '批量催办成功',
                        desc: `已向对应部门发送了 ${selectedIds.length} 封飞鸽催办通知。`,
                      });
                      setSelectedIds([]);
                      setBatchMode(false);
                    }}
                    className="px-3 py-1 bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 rounded hover:bg-[#10b981]/30 transition-colors flex items-center gap-1"
                  >
                    <Zap className="w-3 h-3" /> 批量催办
                  </button>
                  <button
                    onClick={() => {
                      toastEmitter.emit({
                        level: 'normal',
                        title: '批量归档完成',
                        desc: `已将 ${selectedIds.length} 份敕令送往定鼎门。`,
                      });
                      setSelectedIds([]);
                      setBatchMode(false);
                    }}
                    className="px-3 py-1 bg-gray-500/20 text-gray-300 border border-gray-500/30 rounded hover:bg-gray-500/30 transition-colors flex items-center gap-1"
                  >
                    <FileText className="w-3 h-3" /> 批量归档
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edict Cards List */}
        <div className="flex flex-col gap-6">
          <AnimatePresence>
            {filteredEdicts.map((edict) => (
              <EdictCard
                key={edict.id}
                edict={edict}
                batchMode={batchMode}
                selected={selectedIds.includes(edict.id)}
                onToggleSelect={() => toggleSelect(edict.id)}
              />
            ))}
            {filteredEdicts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 flex flex-col items-center justify-center opacity-60"
              >
                <div className="text-6xl mb-4 grayscale">📜</div>
                <p className="font-serif-sc text-lg">尚无敕令</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function EdictCard({
  edict,
  batchMode,
  selected,
  onToggleSelect,
}: {
  edict: Edict;
  batchMode: boolean;
  selected: boolean;
  onToggleSelect: () => void;
}) {
  const [logExpanded, setLogExpanded] = useState(false);

  const getStatusColor = (s: string) => {
    switch (s) {
      case '执行中':
        return 'text-[#10b981] bg-[#10b981]/10 border-[#10b981]/30';
      case '已办结':
        return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
      case '审议中':
        return 'text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/30';
      case '草拟中':
        return 'text-[#3b82f6] bg-[#3b82f6]/10 border-[#3b82f6]/30';
      case '已封驳':
        return 'text-[#c2414b] bg-[#c2414b]/10 border-[#c2414b]/30';
      default:
        return 'text-white bg-white/10';
    }
  };

  const stages = ['下旨', '分拣', '草拟', '审议', '派发', '执行', '归档'];
  const currentStageIndex =
    edict.status === '已办结'
      ? 6
      : edict.status === '执行中'
        ? 5
        : edict.status === '审议中'
          ? 3
          : edict.status === '草拟中'
            ? 2
            : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={batchMode ? onToggleSelect : undefined}
      className={`bg-[#1a1f2e] border rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all ${
        batchMode ? 'cursor-pointer' : ''
      } ${selected ? 'border-accent-gold ring-1 ring-accent-gold' : 'border-[#d4a843]/20'}`}
    >
      {/* Card Header */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-white/5 to-transparent border-b border-white/5">
        <div className="flex items-center gap-3">
          {batchMode && (
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selected ? 'bg-accent-gold border-accent-gold text-[#1a1f2e]' : 'border-white/30'}`}
            >
              {selected && <CheckCircle2 className="w-3 h-3" />}
            </div>
          )}
          <div className="font-mono-jb text-sm text-text-secondary">敕令 #{edict.id}</div>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs flex items-center gap-2 border ${getStatusColor(edict.status)}`}
        >
          状态: {edict.status}
          {edict.status === '执行中' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
          )}
        </div>
      </div>

      {/* 7-Stage Flow */}
      <div className="px-6 py-8 border-b border-white/5">
        <div className="flex items-center justify-between relative">
          {/* Background Connecting Line */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-gray-700 z-0" />

          {/* Active Connecting Line */}
          <div
            className="absolute left-6 top-1/2 -translate-y-1/2 h-[2px] bg-accent-gold z-0 transition-all duration-1000"
            style={{ width: `calc(${currentStageIndex} * (100% - 3rem) / 6)` }}
          />

          {stages.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex || edict.status === '已办结';
            const isCurrent = idx === currentStageIndex && edict.status !== '已办结';

            return (
              <div key={stage} className="flex flex-col items-center gap-2 z-10 bg-[#1a1f2e] px-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center bg-[#1a1f2e] border-2 transition-colors ${
                    isCompleted
                      ? 'border-accent-gold text-accent-gold'
                      : isCurrent
                        ? 'border-accent-gold border-dashed text-accent-gold'
                        : 'border-gray-600 text-gray-600'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isCurrent ? (
                    <CircleDashed className="w-4 h-4 animate-spin-slow" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </div>
                <span
                  className={`text-xs font-serif-sc ${isCompleted || isCurrent ? 'text-accent-gold' : 'text-gray-500'}`}
                >
                  {stage}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details */}
      <div className="p-6 grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <div className="text-xs text-text-secondary mb-1">标题</div>
            <div className="font-serif-sc text-lg font-bold">{edict.title}</div>
          </div>
          <div className="flex gap-8">
            <div>
              <div className="text-xs text-text-secondary mb-1">发起</div>
              <div className="text-sm">
                {edict.creator} · {edict.time}
              </div>
            </div>
            <div>
              <div className="text-xs text-text-secondary mb-1">当前</div>
              <div className="text-sm">
                {edict.currentDept} ·{' '}
                {edict.status === '已办结' ? '已完结' : `已耗时 ${edict.duration}`}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between items-end border-l border-white/5 pl-8">
          <div className="w-full">
            <div className="text-xs text-text-secondary mb-2">签章链</div>
            <div className="flex gap-2">
              {edict.seals.map((seal, i) => (
                <div
                  key={i}
                  className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-accent-gold/80"
                >
                  {seal}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-4 items-end w-full">
            <div className="flex gap-3">
              <Link
                to={`/edict/${edict.id}`}
                className="px-4 py-1.5 text-sm font-serif-sc border border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 rounded transition-colors"
              >
                查看详情
              </Link>
              {edict.status !== '已办结' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toastEmitter.emit({
                      level: 'important',
                      title: '飞鸽已送出',
                      desc: `已向 ${edict.currentDept} 发送对 ${edict.id} 的催办通知。`,
                    });
                  }}
                  className="px-4 py-1.5 text-sm font-serif-sc border border-[#f59e0b]/50 text-[#f59e0b] hover:bg-[#f59e0b]/10 rounded transition-colors flex items-center gap-1"
                >
                  催办 ⚡
                </button>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLogExpanded(!logExpanded);
              }}
              className="text-xs text-text-secondary hover:text-accent-gold transition-colors flex items-center gap-1"
            >
              {logExpanded ? '收起日志 ▲' : '展开流转日志 ▼'}
            </button>
          </div>
        </div>
      </div>

      {/* Flow Log Collapsible Panel */}
      <AnimatePresence>
        {logExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-black/40 border-t border-white/5 font-mono-jb text-xs text-text-secondary space-y-2">
              {edict.logs.map((log, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="text-accent-gold/50">{log.split(']')[0] + ']'}</span>
                  <span className={log.includes('✅') ? 'text-[#10b981]' : 'text-text-primary/80'}>
                    {log.split(']')[1]}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
