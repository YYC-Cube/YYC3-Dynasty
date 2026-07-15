/**
 * file: HubFloat.tsx
 * description: 悬浮功能面板 · AI 对话入口与快捷操作
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-21
 * updated: 2026-07-12
 * status: active
 * tags: [component],[floating],[ai],[chat]
 *
 * brief: 右下角悬浮智能枢纽面板
 *
 * details:
 * - AI 角色预设切换
 * - 聊天输入与发送
 * - 快捷操作按钮
 *
 * dependencies: React, motion/react, lucide-react
 * exports: HubFloat
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Minimize2, Trash2, Mic, Send, Copy } from 'lucide-react';

const PERSONAS = [
  { id: 'emperor', name: '帝', fullName: '天子', color: 'bg-[#8b5cf6]' },
  { id: 'prince', name: '太', fullName: '太子', color: 'bg-[#d4a843]' },
  { id: 'zhongshu', name: '中', fullName: '中书令', color: 'bg-[#3b82f6]' },
  { id: 'menxia', name: '门', fullName: '门下侍中', color: 'bg-[#f59e0b]' },
  { id: 'shangshu', name: '尚', fullName: '尚书令', color: 'bg-[#10b981]' },
  { id: 'hubu', name: '户', fullName: '户部尚书', color: 'bg-[#d4a843]' },
  { id: 'libu', name: '礼', fullName: '礼部尚书', color: 'bg-[#8b5cf6]' },
  { id: 'bingbu', name: '兵', fullName: '兵部尚书', color: 'bg-[#c2414b]' },
  { id: 'xingbu', name: '刑', fullName: '刑部尚书', color: 'bg-[#4b5563]' },
  { id: 'gongbu', name: '工', fullName: '工部尚书', color: 'bg-[#b45309]' },
  { id: 'libu2', name: '吏', fullName: '吏部尚书', color: 'bg-[#e5e7eb] text-black' },
  { id: 'court', name: '早', fullName: '朝议大夫', color: 'bg-[#0f766e]' },
];

const TABS = ['💬 对话', '⌘ 命令', '📖 提示词', '⚙️ 配置'];

export function HubFloat() {
  const [expanded, setExpanded] = useState(false);
  const [activePersona, setActivePersona] = useState(PERSONAS[0]);
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [inputValue, setInputValue] = useState('');

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      persona: '天子',
      content: '朕已阅。着中书省即刻草拟方案，门下省严加审议。',
      isEdict: true,
    },
    {
      id: 2,
      role: 'user',
      content: '请帮我查阅一下工部今日的流水线构建情况。',
    },
    {
      id: 3,
      role: 'assistant',
      persona: '工部尚书',
      content: '启禀天子，工部今日已完成23次构建，成功率95.6%，一切安好。',
      isEdict: false,
    },
  ]);

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!expanded && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpanded(true)}
            className="fixed bottom-8 right-8 w-14 h-14 rounded-xl bg-gradient-to-br from-[#d4a843] to-[#b8860b] shadow-[0_0_30px_rgba(212,168,67,0.4)] flex items-center justify-center z-50 group border border-[#fcf5e3]/30"
          >
            <Sparkles className="w-6 h-6 text-[#1a1f2e]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#10b981] rounded-full border-2 border-[#0a0e17] animate-pulse" />

            {/* Tooltip */}
            <div className="absolute right-full mr-4 bg-[#1a1f2e] border border-accent-gold/30 text-accent-gold px-3 py-1.5 rounded text-sm font-serif-sc whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
              王朝助理 · 天枢
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-8 right-8 w-[400px] h-[600px] bg-[#0a0e17]/95 backdrop-blur-xl border border-accent-gold/20 rounded-2xl shadow-[0_0_60px_rgba(212,168,67,0.1)] flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="h-[52px] bg-[#1a1f2e] border-b border-accent-gold/10 flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white rounded shadow-[0_0_10px_rgba(212,168,67,0.5)] flex items-center justify-center text-xs">
                  🔶
                </div>
                <div className="font-serif-sc font-bold text-text-primary">天枢 · Navigator</div>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <Trash2 className="w-4 h-4 hover:text-accent-gold cursor-pointer" />
                <Minimize2 className="w-4 h-4 hover:text-accent-gold cursor-pointer" />
                <X
                  className="w-5 h-5 hover:text-accent-red cursor-pointer ml-1"
                  onClick={() => setExpanded(false)}
                />
              </div>
            </div>

            {/* Model Info Bar */}
            <div className="bg-[#1a1f2e]/50 px-4 py-1.5 text-xs text-text-secondary border-b border-white/5 font-mono-jb flex justify-between">
              <span>Model: GPT-4o · 全局调度就绪</span>
              <span className="text-accent-gold/70">4 命令可用</span>
            </div>

            {/* Persona Bar */}
            <div className="flex overflow-x-auto hide-scrollbar gap-3 p-3 border-b border-white/5 shrink-0 bg-[#0a0e17]">
              {PERSONAS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePersona(p)}
                  className={`relative flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-serif-sc font-bold text-sm transition-all ${p.color} ${activePersona.id === p.id ? 'ring-2 ring-accent-gold ring-offset-2 ring-offset-[#0a0e17]' : 'opacity-70 hover:opacity-100'}`}
                  title={p.fullName}
                >
                  {p.name}
                </button>
              ))}
            </div>

            {/* Tab Bar */}
            <div className="flex border-b border-white/5 shrink-0">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`flex-1 py-2 text-sm font-serif-sc transition-colors border-b-2 ${
                    activeTab === t
                      ? 'border-accent-gold text-accent-gold bg-accent-gold/5'
                      : 'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="text-xs text-accent-gold/70 font-serif-sc mb-1 ml-1">
                      {msg.persona}
                    </div>
                  )}

                  {msg.isEdict ? (
                    /* Edict Style Message */
                    <div className="bg-[#f5e6c8] text-[#333] border border-[#d4a843] rounded-lg p-4 w-[90%] shadow-md relative">
                      <div className="font-ancient text-lg text-center mb-2 border-b border-[#333]/20 pb-1">
                        【 圣 旨 】
                      </div>
                      <div className="font-serif-sc text-sm leading-relaxed mb-4">
                        {msg.content}
                      </div>
                      <div className="text-right text-xs font-serif-sc text-accent-red font-bold">
                        — {msg.persona} 御批
                      </div>
                      <button className="absolute bottom-2 left-2 text-[#333]/50 hover:text-[#333] flex items-center gap-1 text-xs">
                        <Copy className="w-3 h-3" /> 复制
                      </button>
                    </div>
                  ) : (
                    /* Standard Bubble */
                    <div
                      className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-accent-gold/20 text-[#fcf5e3] rounded-br-sm border border-accent-gold/20'
                          : 'bg-[#1e3a5f]/80 text-[#e5e7eb] rounded-bl-sm border border-[#3b82f6]/20'
                      }`}
                    >
                      {msg.content}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-[#1a1f2e] shrink-0">
              <div className="relative flex items-center bg-[#0a0e17] border border-accent-gold/30 rounded-xl overflow-hidden focus-within:border-accent-gold focus-within:shadow-[0_0_15px_rgba(212,168,67,0.2)] transition-all">
                <button className="pl-3 pr-2 text-text-secondary hover:text-accent-gold">
                  <Mic className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  placeholder={`向 ${activePersona.fullName} 传达指令...`}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && inputValue.trim()) {
                      setMessages([
                        ...messages,
                        { id: Date.now(), role: 'user', content: inputValue },
                      ]);
                      setInputValue('');
                    }
                  }}
                  className="flex-1 bg-transparent py-3 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none"
                />
                <button
                  className={`px-4 font-serif-sc text-sm flex items-center gap-1 transition-colors ${
                    inputValue.trim()
                      ? 'text-accent-gold hover:bg-accent-gold/10'
                      : 'text-text-secondary/50'
                  }`}
                >
                  发送 <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
