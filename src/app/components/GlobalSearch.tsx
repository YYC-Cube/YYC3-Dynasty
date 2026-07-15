/**
 * file: GlobalSearch.tsx
 * description: 全局搜索组件 · 跨模块快速搜索
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-21
 * updated: 2026-07-12
 * status: active
 * tags: [component],[search],[global]
 *
 * brief: 全局快速搜索，跨模块搜索任务与内容
 *
 * details:
 * - 搜索任务、旨意、内容等
 * - 快捷键唤起
 * - 动画进出效果
 *
 * dependencies: React, motion/react, lucide-react, react-router
 * exports: GlobalSearch
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ScrollText, User, Zap, Medal } from 'lucide-react';
import { useNavigate } from 'react-router';

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((open) => !open);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const mockResults = [
    {
      type: 'edict',
      icon: <ScrollText className="w-4 h-4" />,
      title: '旨意 · 修缮云枢殿防火墙',
      status: '执行中',
      route: '/edict/042',
    },
    {
      type: 'user',
      icon: <User className="w-4 h-4" />,
      title: '朝臣 · 中书令',
      status: '草拟中 3 件',
      route: '/court',
    },
    {
      type: 'skill',
      icon: <Zap className="w-4 h-4" />,
      title: 'Skill · 唐诗品鉴',
      status: '已启用',
      route: '/timeline',
    },
    {
      type: 'medal',
      icon: <Medal className="w-4 h-4" />,
      title: '勋章 · 紫微星',
      status: '未获得',
      route: '/honors',
    },
  ];

  const filtered = query
    ? mockResults.filter((r) => r.title.toLowerCase().includes(query.toLowerCase()))
    : mockResults;

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    const handleNavigation = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          navigate(filtered[selectedIndex].route);
          setIsOpen(false);
          setQuery('');
        }
      }
    };
    window.addEventListener('keydown', handleNavigation);
    return () => window.removeEventListener('keydown', handleNavigation);
  }, [isOpen, filtered, selectedIndex, navigate]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex justify-center items-start pt-[15vh]"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-[560px] bg-[#1a1f2e] border border-accent-gold/20 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center px-4 border-b border-white/10 relative">
              <Search className="w-5 h-5 text-accent-gold" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索旨意、朝臣、Skill、勋章... [⌘K]"
                className="w-full bg-transparent border-none text-text-primary placeholder:text-text-secondary/50 px-4 py-4 outline-none font-serif-sc"
              />
              <div className="absolute right-4 text-xs font-mono-jb text-text-secondary/50 border border-white/10 rounded px-2 py-1">
                ESC
              </div>
            </div>

            <div className="p-2">
              <div className="text-xs font-serif-sc text-text-secondary px-3 py-2">📋 搜索建议</div>
              {filtered.length > 0 ? (
                <div className="space-y-1">
                  {filtered.map((item, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={() => {
                        navigate(item.route);
                        setIsOpen(false);
                        setQuery('');
                      }}
                      className={`flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                        selectedIndex === idx
                          ? 'bg-accent-gold/10 text-accent-gold border border-accent-gold/20'
                          : 'text-text-primary border border-transparent hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3 font-serif-sc text-sm">
                        <span
                          className={
                            selectedIndex === idx ? 'text-accent-gold' : 'text-text-secondary'
                          }
                        >
                          {item.icon}
                        </span>
                        {item.title}
                      </div>
                      <div
                        className={`text-xs ${selectedIndex === idx ? 'text-accent-gold/70' : 'text-text-secondary'}`}
                      >
                        {item.status}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-3 py-8 text-center text-sm font-serif-sc text-text-secondary">
                  未找到匹配的敕令/朝代/朝臣...
                </div>
              )}
            </div>

            <div className="border-t border-white/5 bg-white/5 px-4 py-2 flex justify-between items-center text-xs text-text-secondary font-mono-jb">
              <span>共 {filtered.length} 条结果</span>
              <div className="flex gap-4">
                <span>
                  <kbd className="bg-black/30 border border-white/10 rounded px-1">↑</kbd>{' '}
                  <kbd className="bg-black/30 border border-white/10 rounded px-1">↓</kbd> 选择
                </span>
                <span>
                  <kbd className="bg-black/30 border border-white/10 rounded px-1">↵</kbd> 跳转
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
