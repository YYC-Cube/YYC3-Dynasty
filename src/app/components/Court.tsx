import { Link } from 'react-router';
import { Suspense, lazy } from 'react';
import { motion } from 'motion/react';
import { AxisLine } from './AxisLine';
import { MinistryCard, type MinistryStatus } from './MinistryCard';
import { ChariotWidget } from './ChariotWidget';
import { FlowBar } from './FlowBar';
import {
  Crown,
  Star,
  ScrollText,
  Send,
  Bell,
  Archive,
  ShieldAlert,
  Settings,
  BarChart2,
} from 'lucide-react';

function SideQuickEntry() {
  const items = [
    { path: '/edict/create', label: '新建旨意', icon: <ScrollText className="w-4 h-4" /> },
    { path: '/honors', label: '勋章墙', icon: <Star className="w-4 h-4" /> },
    { path: '/settings', label: '宫阙规制', icon: <Settings className="w-4 h-4" /> },
    { path: '/monitor', label: '太史监候', icon: <BarChart2 className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed right-6 top-24 flex flex-col gap-2 z-40 hidden xl:flex">
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="flex items-center gap-3 px-4 py-3 bg-[#1a1f2e]/80 backdrop-blur border border-white/5 hover:border-accent-gold/50 rounded-xl text-sm font-serif-sc text-text-secondary hover:text-accent-gold transition-all group shadow-lg"
        >
          {item.icon}
          <span className="opacity-0 group-hover:opacity-100 absolute right-full mr-2 whitespace-nowrap bg-[#1a1f2e] border border-accent-gold/30 text-accent-gold px-3 py-1.5 rounded translate-x-4 group-hover:translate-x-0 transition-all pointer-events-none">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
}

export function Court() {
  const horseStatuses: MinistryStatus[] = [
    'normal',
    'normal',
    'warning',
    'normal',
    'error',
    'normal',
  ];

  return (
    <div className="min-h-full bg-bg-primary text-text-primary overflow-y-auto overflow-x-hidden relative selection:bg-accent-gold/30 pb-32">
      {/* Background patterns */}
      <div className="fixed inset-0 opacity-[0.02] bg-[url('https://images.unsplash.com/photo-1615598124505-181552a8a5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center pointer-events-none" />

      <SideQuickEntry />
      <AxisLine />

      <main className="relative z-10 max-w-[900px] mx-auto px-6 py-12 flex flex-col gap-12">
        {/* Node 1: Heavenly Hall (天堂) */}
        <motion.section
          className="w-full bg-bg-card/80 backdrop-blur-sm border border-emperor/30 rounded-2xl p-6 relative overflow-hidden group shadow-[0_0_30px_rgba(139,92,246,0.1)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Dragon overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-5 bg-[url('https://images.unsplash.com/photo-1599727506975-43093c4eb3a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')] bg-cover mix-blend-screen pointer-events-none" />

          <div className="flex justify-between items-center relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emperor/20 flex items-center justify-center text-emperor border border-emperor/50">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-serif-sc text-2xl font-black text-emperor tracking-widest">
                  天子 · 天堂
                </h2>
                <p className="text-sm text-text-secondary mt-1">全局最终决策 · 权力源头</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-3xl font-mono-jb text-emperor font-bold">3</div>
                <div className="text-xs text-text-secondary mt-1">待御批</div>
              </div>
              <Link
                to="/edict/create"
                className="opacity-0 group-hover:opacity-100 bg-gradient-to-r from-emperor to-purple-600 px-6 py-2 rounded-lg text-white font-serif-sc font-bold shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all transform translate-x-4 group-hover:translate-x-0 inline-block"
              >
                降旨
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Node 2: Ming Hall (明堂) */}
        <motion.section
          className="w-4/5 mx-auto bg-bg-card/80 backdrop-blur-sm border border-accent-gold/30 rounded-xl p-5 shadow-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-accent-gold">
                <Star className="w-6 h-6" />
              </div>
              <h2 className="font-serif-sc text-xl font-bold text-accent-gold tracking-wider">
                储君 · 明堂
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-text-secondary bg-black/30 px-3 py-1.5 rounded-md">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> 监国代行
              </div>
              <div className="text-right">
                <span className="text-lg font-mono-jb text-accent-gold mr-2">7</span>
                <span className="text-xs text-text-secondary">待分拣</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Node 3: Yingtian Gate (应天门) - Three Departments */}
        <motion.section
          className="w-full relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-bg-primary px-4 text-sm font-serif-sc text-accent-gold tracking-widest border border-accent-gold/20 rounded-full">
            应天门 · 三省
          </div>
          <div className="grid grid-cols-3 gap-4 pt-6">
            {/* Secretariat */}
            <div className="bg-bg-card/80 border border-[#3b82f6]/30 rounded-xl p-4 flex flex-col gap-3 relative group">
              <div className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-[#3b82f6]/50 group-hover:bg-[#3b82f6] transition-colors" />
              <div className="flex items-center gap-2 text-[#3b82f6]">
                <ScrollText className="w-5 h-5" />
                <span className="font-serif-sc font-bold">中书省 · 草拟</span>
              </div>
              <div className="flex justify-between items-end mt-2">
                <div>
                  <div className="text-2xl font-mono-jb text-[#3b82f6]">12</div>
                  <div className="text-xs text-text-secondary">待草拟</div>
                </div>
                <div className="text-right text-xs">
                  <div className="text-[#3b82f6]">94%</div>
                  <div className="text-text-secondary">模板匹配</div>
                </div>
              </div>
            </div>

            {/* Chancellery */}
            <div className="bg-bg-card/80 border border-[#f59e0b]/30 rounded-xl p-4 flex flex-col gap-3 relative group">
              <div className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-[#f59e0b]/50 group-hover:bg-[#f59e0b] transition-colors" />
              <div className="flex items-center gap-2 text-[#f59e0b]">
                <ShieldAlert className="w-5 h-5" />
                <span className="font-serif-sc font-bold">门下省 · 审议</span>
              </div>
              <div className="flex justify-between items-end mt-2">
                <div>
                  <div className="text-2xl font-mono-jb text-[#f59e0b]">5</div>
                  <div className="text-xs text-text-secondary">待审议</div>
                </div>
                <div className="text-right text-xs">
                  <div className="text-[#f59e0b] font-bold">2</div>
                  <div className="text-text-secondary">今日封驳</div>
                </div>
              </div>
            </div>

            {/* Department of State */}
            <div className="bg-bg-card/80 border border-[#10b981]/30 rounded-xl p-4 flex flex-col gap-3 relative group">
              <div className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-[#10b981]/50 group-hover:bg-[#10b981] transition-colors" />
              <div className="flex items-center gap-2 text-[#10b981]">
                <Send className="w-5 h-5" />
                <span className="font-serif-sc font-bold">尚书省 · 派发</span>
              </div>
              <div className="flex justify-between items-end mt-2">
                <div>
                  <div className="text-2xl font-mono-jb text-[#10b981]">8</div>
                  <div className="text-xs text-text-secondary">待派发</div>
                </div>
                <div className="text-right text-xs">
                  <div className="text-[#10b981]">1.2k</div>
                  <div className="text-text-secondary">剩余 Tokens</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Node 4: Tianjin Bridge (天津桥) - Six Ministries */}
        <motion.section
          className="w-full relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-bg-primary px-4 text-sm font-serif-sc text-accent-gold tracking-widest border border-accent-gold/20 rounded-full z-20">
            天津桥 · 六部
          </div>
          <div className="flex gap-8 pt-6">
            {/* Left Bank */}
            <div className="flex-1 flex flex-col gap-4">
              <MinistryCard
                name="户部"
                icon="💰"
                status="normal"
                activeTasks={45}
                completedToday={120}
                avgTime="1.2s"
                tokens={8400}
                progress={65}
                align="left"
              />
              <MinistryCard
                name="礼部"
                icon="📜"
                status="warning"
                activeTasks={12}
                completedToday={34}
                avgTime="3.5s"
                tokens={2100}
                progress={85}
                align="left"
              />
              <MinistryCard
                name="吏部"
                icon="👤"
                status="normal"
                activeTasks={5}
                completedToday={18}
                avgTime="0.8s"
                tokens={5600}
                progress={30}
                align="left"
              />
            </div>
            {/* Right Bank */}
            <div className="flex-1 flex flex-col gap-4">
              <MinistryCard
                name="兵部"
                icon="⚔️"
                status="error"
                activeTasks={89}
                completedToday={210}
                avgTime="4.2s"
                tokens={120}
                progress={95}
                align="right"
              />
              <MinistryCard
                name="刑部"
                icon="⚖️"
                status="normal"
                activeTasks={3}
                completedToday={15}
                avgTime="2.1s"
                tokens={3400}
                progress={15}
                align="right"
              />
              <MinistryCard
                name="工部"
                icon="🏗️"
                status="normal"
                activeTasks={67}
                completedToday={89}
                avgTime="1.8s"
                tokens={9800}
                progress={70}
                align="right"
              />
            </div>
          </div>
        </motion.section>

        {/* Node 5: Duan Gate (端门) - Morning Court */}
        <motion.section
          className="w-full bg-bg-card/80 border border-accent-gold/20 rounded-xl p-5 shadow-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center gap-4">
            <div className="bg-accent-gold/10 p-3 rounded-lg text-accent-gold">
              <Bell className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h2 className="font-serif-sc text-lg font-bold text-text-primary tracking-wide">
                朝议大夫 · 端门
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                今日早朝简报：兵部积压告警，户部算力充沛，建议调拨资源。
              </p>
            </div>
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-md text-sm transition-colors border border-white/10 text-accent-gold font-serif-sc">
              查看折子
            </button>
          </div>
        </motion.section>

        {/* Node 6: Dingding Gate (定鼎门) - Archive */}
        <motion.section
          className="w-full bg-bg-card/60 border border-text-secondary/20 rounded-xl p-6 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="absolute right-0 bottom-0 text-9xl opacity-5 text-text-secondary pointer-events-none -mb-8 -mr-4 font-ancient">
            史
          </div>
          <div className="flex items-center gap-2 text-text-secondary mb-6">
            <Archive className="w-5 h-5" />
            <h2 className="font-serif-sc text-lg font-bold tracking-wide">定鼎门 · 归档</h2>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-mono-jb text-text-primary">98.5%</div>
              <div className="text-xs text-text-secondary">全链路完结率</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-mono-jb text-text-primary">1.8s</div>
              <div className="text-xs text-text-secondary">全局平均流转</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-mono-jb text-text-primary">92%</div>
              <div className="text-xs text-text-secondary">一次审批通过率</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-mono-jb text-accent-red">14</div>
              <div className="text-xs text-text-secondary">今日异常告警</div>
            </div>
          </div>
        </motion.section>
      </main>

      <ChariotWidget horseStatuses={horseStatuses} />
      <FlowBar />

      {/* 朝堂议政 & 仪式（懒加载） */}
      <Suspense fallback={null}>
        <CourtDiscussionLazy />
        <CourtCeremonyLazy />
      </Suspense>
    </div>
  );
}

const CourtDiscussionLazy = lazy(() => import('./CourtDiscussion'));
const CourtCeremonyLazy = lazy(() => import('./CourtCeremony'));
