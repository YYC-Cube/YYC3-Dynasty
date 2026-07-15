/**
 * file: TaishiMonitor.tsx
 * description: 太史监候组件 · 系统运行状态监控面板
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-21
 * updated: 2026-07-12
 * status: active
 * tags: [component],[monitor],[dashboard]
 *
 * brief: 太史监候 — 系统运行监控仪表板
 *
 * details:
 * - 展示各 Agent 运行状态
 * - 性能图表（Recharts 折线图）
 * - 网关状态监控
 *
 * dependencies: React, motion/react, recharts, lucide-react, ../store
 * exports: TaishiMonitor
 */

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, CheckCircle, Database, Shield, Users, GitMerge } from 'lucide-react';
import { useStore } from '../store';

export function TaishiMonitor() {
  const [time] = useState('永熙三年·午时三刻');

  const agentsStatusData = useStore((s) => s.agentsStatusData);
  const officialsData = useStore((s) => s.officialsData);
  const liveStatus = useStore((s) => s.liveStatus);
  const loadAgentsStatus = useStore((s) => s.loadAgentsStatus);
  const loadOfficials = useStore((s) => s.loadOfficials);

  useEffect(() => {
    loadAgentsStatus();
    loadOfficials();
  }, [loadAgentsStatus, loadOfficials]);

  const MINISTRIES = [
    {
      name: '兵部',
      chief: '大司马',
      icon: '⚔️',
      status: 'Online',
      tokens: 3,
      maxTokens: 5,
      active: 4,
      completed: 12,
      avgTime: '1h42m',
      errRate: '0.3%',
      workload: 78,
      health: 96,
      state: 'normal',
    },
    {
      name: '工部',
      chief: '大司空',
      icon: '🔧',
      status: 'Online',
      tokens: 1,
      maxTokens: 4,
      active: 8,
      completed: 23,
      avgTime: '3h15m',
      errRate: '2.1%',
      workload: 92,
      health: 85,
      state: 'warning',
    },
    {
      name: '刑部',
      chief: '大司寇',
      icon: '⚖️',
      status: 'Online',
      tokens: 4,
      maxTokens: 5,
      active: 2,
      completed: 5,
      avgTime: '45m',
      errRate: '0.0%',
      workload: 34,
      health: 100,
      state: 'normal',
    },
    {
      name: '户部',
      chief: '大司徒',
      icon: '💰',
      status: 'Online',
      tokens: 2,
      maxTokens: 6,
      active: 15,
      completed: 42,
      avgTime: '2h05m',
      errRate: '0.8%',
      workload: 85,
      health: 92,
      state: 'normal',
    },
    {
      name: '礼部',
      chief: '大宗伯',
      icon: '📝',
      status: 'Online',
      tokens: 3,
      maxTokens: 3,
      active: 1,
      completed: 8,
      avgTime: '15m',
      errRate: '0.0%',
      workload: 12,
      health: 100,
      state: 'normal',
    },
    {
      name: '吏部',
      chief: '大冢宰',
      icon: '📋',
      status: 'Online',
      tokens: 5,
      maxTokens: 5,
      active: 3,
      completed: 11,
      avgTime: '35m',
      errRate: '0.1%',
      workload: 45,
      health: 98,
      state: 'normal',
    },
  ];

  const REAL_MINISTRIES = MINISTRIES.map((m) => {
    // match to real official if possible
    const realAgent = agentsStatusData?.agents?.find((a) => a.label.includes(m.name));
    const realOfficial = officialsData?.officials?.find((o) => o.label.includes(m.name));
    const realActive =
      liveStatus?.tasks?.filter((t) => t.org === m.name && t.state === 'Doing').length || m.active;
    return {
      ...m,
      status: realAgent?.statusLabel || m.status,
      active: realActive,
      completed: realOfficial?.tasks_done || m.completed,
    };
  });

  const EVENT_STREAM = [
    { time: '午时三刻', type: '🌟 祥瑞', text: '敕令 edict-045 办结归档' },
    { time: '午时二刻', type: '⚠️ 异象', text: '兵部令牌数低于阈值(2/5)' },
    { time: '午时一刻', type: '🔥 灾异', text: '刑部扫描发现异常访问' },
    { time: '巳时四刻', type: '🌟 祥瑞', text: '门下省通过 edict-043' },
    { time: '巳时三刻', type: '📊 日表', text: '户部算力消耗达75%' },
    { time: '巳时二刻', type: '🌟 祥瑞', text: '中书省完成 edict-042' },
    { time: '巳时一刻', type: '🔥 灾异', text: '工部CI/CD流水线失败' },
  ];

  const CHART_DATA = [
    { name: '子', created: 10, done: 8, vetoed: 1 },
    { name: '丑', created: 5, done: 4, vetoed: 0 },
    { name: '寅', created: 8, done: 6, vetoed: 1 },
    { name: '卯', created: 25, done: 15, vetoed: 3 },
    { name: '辰', created: 45, done: 30, vetoed: 5 },
    { name: '巳', created: 60, done: 40, vetoed: 8 },
    { name: '午', created: 35, done: 50, vetoed: 4 },
  ];

  return (
    <div className="min-h-full bg-bg-primary text-text-primary px-6 py-8 flex flex-col items-center overflow-y-auto">
      <div className="w-full max-w-[1200px] flex flex-col gap-8">
        {/* Header */}
        <div className="flex justify-between items-end border-b border-accent-gold/20 pb-6">
          <div>
            <h1 className="font-serif-sc font-black text-3xl text-accent-gold tracking-widest mb-2 flex items-center gap-3">
              <span className="text-4xl">🔭</span> 太 史 监 候
            </h1>
            <p className="text-sm text-text-secondary font-serif-sc tracking-widest">
              观星辰之变 · 察万象之机
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="font-mono-jb text-accent-gold bg-accent-gold/5 px-4 py-1.5 border border-accent-gold/30 rounded">
              {time}
            </div>
            <div className="text-xs text-[#10b981] flex items-center gap-2">
              每 30 秒观星一次{' '}
              <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Section 1: KPI Overview */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-[#1a1f2e] border border-white/5 rounded-xl p-6 relative overflow-hidden group hover:border-accent-gold/30 transition-colors">
            <div className="absolute -right-4 -bottom-4 text-6xl opacity-5 grayscale group-hover:grayscale-0 group-hover:opacity-10 transition-all">
              🌟
            </div>
            <div className="text-sm text-text-secondary font-serif-sc mb-4">
              紫微星 · System Health
            </div>
            <div className="text-3xl font-mono-jb text-accent-gold mb-2">92%</div>
            <div className="h-2 bg-black rounded-full overflow-hidden mb-2">
              <div className="h-full bg-accent-gold w-[92%]" />
            </div>
            <div className="text-xs text-[#10b981] flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> 正常运行
            </div>
          </div>
          <div className="bg-[#1a1f2e] border border-white/5 rounded-xl p-6 relative overflow-hidden group hover:border-[#f59e0b]/30 transition-colors">
            <div className="absolute -right-4 -bottom-4 text-6xl opacity-5 grayscale group-hover:grayscale-0 group-hover:opacity-10 transition-all">
              ⭐
            </div>
            <div className="text-sm text-text-secondary font-serif-sc mb-4">
              北斗七星 · Active Alerts
            </div>
            <div className="text-3xl font-mono-jb text-[#f59e0b] mb-2">
              3 <span className="text-sm text-text-secondary">active</span>
            </div>
            <div className="text-xs text-text-secondary flex gap-3">
              <span className="text-[#f59e0b]">2 warning</span>
              <span className="text-accent-red">1 error</span>
            </div>
          </div>
          <div className="bg-[#1a1f2e] border border-white/5 rounded-xl p-6 relative overflow-hidden group hover:border-white/30 transition-colors">
            <div className="absolute -right-4 -bottom-4 text-6xl opacity-5 grayscale group-hover:grayscale-0 group-hover:opacity-10 transition-all">
              🌙
            </div>
            <div className="text-sm text-text-secondary font-serif-sc mb-4">太阴星 · Uptime</div>
            <div className="text-3xl font-mono-jb text-text-primary mb-2">
              127<span className="text-sm text-text-secondary">d</span> 14
              <span className="text-sm text-text-secondary">h</span>
            </div>
            <div className="text-xs text-text-secondary">since 永熙三年</div>
          </div>
        </div>

        {/* Section 2 & 3: Main Grid (Left: Ministries, Right: Event Stream) */}
        <div className="grid grid-cols-3 gap-6">
          {/* Section 2: Six Ministries Health */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            {REAL_MINISTRIES.map((m) => (
              <div
                key={m.name}
                className={`bg-[#1a1f2e] border rounded-xl p-5 transition-colors ${
                  m.state === 'warning'
                    ? 'border-[#d4a843] shadow-[0_0_15px_rgba(212,168,67,0.1)]'
                    : m.state === 'error'
                      ? 'border-[#c2414b] shadow-[0_0_15px_rgba(194,65,75,0.2)]'
                      : 'border-[#b45309]/50 hover:border-[#b45309]'
                }`}
              >
                <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-3">
                  <div className="font-serif-sc text-lg text-accent-gold flex items-center gap-2">
                    {m.icon} {m.name}{' '}
                    <span className="text-xs text-text-secondary">· {m.chief}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#10b981]">
                    <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-pulse" />{' '}
                    {m.status}
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">令牌:</span>
                    <span>
                      {'🐟'.repeat(m.tokens)}
                      <span className="text-white/20">{'🐟'.repeat(m.maxTokens - m.tokens)}</span> (
                      {m.tokens}/{m.maxTokens})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">当前任务:</span>
                    <span>
                      <span className="text-accent-gold">{m.active} active</span> / {m.completed}{' '}
                      completed today
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">响应/耗时:</span>
                    <span>{m.avgTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">异常率:</span>
                    <span
                      className={
                        m.state === 'warning'
                          ? 'text-[#f59e0b]'
                          : m.state === 'error'
                            ? 'text-accent-red'
                            : 'text-[#10b981]'
                      }
                    >
                      {m.errRate}
                    </span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs text-text-secondary">
                    <span>Workload</span>
                    <span>{m.workload}%</span>
                  </div>
                  <div className="h-1 bg-black rounded-full overflow-hidden">
                    <div
                      className={`h-full ${m.workload > 90 ? 'bg-accent-red' : m.workload > 70 ? 'bg-[#f59e0b]' : 'bg-accent-gold'}`}
                      style={{ width: `${m.workload}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section 3: Event Stream */}
          <div className="bg-[#1a1f2e] border border-white/5 rounded-xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
              <div className="font-serif-sc text-accent-gold flex items-center gap-2">
                📜 天文志 · 实时天象
              </div>
              <button className="text-xs text-text-secondary hover:text-white px-2 py-1 border border-white/10 rounded">
                暂停 ⏸
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {EVENT_STREAM.map((event, idx) => (
                <div key={idx} className="flex gap-3 text-sm">
                  <div className="font-mono-jb text-text-secondary/70 whitespace-nowrap">
                    [{event.time}]
                  </div>
                  <div className="flex-1">
                    <span className="mr-2">{event.type}</span>
                    <span
                      className={
                        event.type.includes('灾异')
                          ? 'text-accent-red'
                          : event.type.includes('异象')
                            ? 'text-[#f59e0b]'
                            : 'text-text-primary/80'
                      }
                    >
                      {event.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4 & 5: Charts and Resources */}
        <div className="grid grid-cols-2 gap-6">
          {/* Charts */}
          <div className="bg-[#1a1f2e] border border-white/5 rounded-xl p-6">
            <div className="font-serif-sc text-sm text-text-secondary mb-6">
              24h 敕令流转 (司天监·星图)
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={CHART_DATA}>
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1f2e',
                      border: '1px solid rgba(212,168,67,0.3)',
                      borderRadius: '8px',
                    }}
                    itemStyle={{ fontSize: '12px' }}
                    labelStyle={{ color: '#d4a843', marginBottom: '4px', fontFamily: 'serif' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="created"
                    name="创建数"
                    stroke="#d4a843"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="done"
                    name="办结数"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="vetoed"
                    name="封驳数"
                    stroke="#c2414b"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Resources */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1a1f2e] border border-white/5 rounded-xl p-5">
              <div className="flex items-center gap-2 font-serif-sc text-accent-gold mb-4">
                <Database className="w-4 h-4" /> 户部·仓廪
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-text-secondary">
                  <span>Storage</span>
                  <span>67%</span>
                </div>
                <div className="h-1.5 bg-black rounded-full overflow-hidden">
                  <div className="h-full bg-accent-gold w-[67%]" />
                </div>
                <div className="text-xs text-text-secondary">2.1TB / 3.2TB</div>
              </div>
            </div>
            <div className="bg-[#1a1f2e] border border-white/5 rounded-xl p-5">
              <div className="flex items-center gap-2 font-serif-sc text-accent-gold mb-4">
                <GitMerge className="w-4 h-4" /> 工部·匠坊
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Pipeline:</span>
                  <span>8/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">今日构建:</span>
                  <span>23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">成功率:</span>
                  <span className="text-[#10b981]">95.6%</span>
                </div>
              </div>
            </div>
            <div className="bg-[#1a1f2e] border border-white/5 rounded-xl p-5">
              <div className="flex items-center gap-2 font-serif-sc text-accent-gold mb-4">
                <Shield className="w-4 h-4" /> 刑部·诏狱
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">漏洞:</span>
                  <span className="text-[#f59e0b]">2 (中危)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">扫描:</span>
                  <span>已完成</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">修复率:</span>
                  <span>87.5%</span>
                </div>
              </div>
            </div>
            <div className="bg-[#1a1f2e] border border-white/5 rounded-xl p-5">
              <div className="flex items-center gap-2 font-serif-sc text-accent-gold mb-4">
                <Users className="w-4 h-4" /> 吏部·铨选
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Agents:</span>
                  <span>12/12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">在线率:</span>
                  <span className="text-[#10b981]">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">满意度:</span>
                  <span>4.8/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Alert Rules */}
        <div className="bg-[#1a1f2e] border border-white/5 rounded-xl p-6">
          <div className="font-serif-sc text-sm text-text-secondary mb-4">
            钦天监·律历 (Alert Rules)
          </div>
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-secondary border-b border-white/10 font-serif-sc">
              <tr>
                <th className="pb-3 font-normal">星象</th>
                <th className="pb-3 font-normal">监测指标</th>
                <th className="pb-3 font-normal">阈值</th>
                <th className="pb-3 font-normal">当前值</th>
                <th className="pb-3 font-normal">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { star: '荧惑守心', metric: '兵部异常率', limit: '>5%', current: '0.3%', ok: true },
                {
                  star: '太白经天',
                  metric: '工部部署失败',
                  limit: '>3次/日',
                  current: '1次',
                  ok: true,
                },
                { star: '彗星袭月', metric: '令牌耗尽', limit: '=0', current: '3/5', ok: false },
                {
                  star: '日蚀之变',
                  metric: '全局响应超时',
                  limit: '>10s',
                  current: '2.1s',
                  ok: true,
                },
                { star: '月掩岁星', metric: '存储超限', limit: '>90%', current: '67%', ok: true },
              ].map((rule, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors group">
                  <td className="py-3 font-serif-sc text-accent-gold">{rule.star}</td>
                  <td className="py-3 text-text-secondary">{rule.metric}</td>
                  <td className="py-3 font-mono-jb text-text-secondary">{rule.limit}</td>
                  <td
                    className={`py-3 font-mono-jb ${!rule.ok ? 'text-[#f59e0b]' : 'text-text-secondary'}`}
                  >
                    {rule.current}
                  </td>
                  <td className="py-3">
                    {rule.ok ? (
                      <span className="text-[#10b981] flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> ✅
                      </span>
                    ) : (
                      <span className="text-[#f59e0b] flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> ⚠️
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
