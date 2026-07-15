/**
 * file: PalaceRegulation.tsx
 * description: 宫阙规制组件 · 应用设置与管理
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-21
 * updated: 2026-07-12
 * status: active
 * tags: [component],[settings],[config]
 *
 * brief: 宫阙规制 — 应用设置页面
 *
 * details:
 * - 主题偏好设置
 * - 通知配置
 * - 系统信息展示
 *
 * dependencies: React, motion/react, lucide-react, ToastSystem
 * exports: PalaceRegulation
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Settings,
  Landmark,
  ScrollText,
  Fish,
  Bell,
  Shield,
  Palette,
  BookOpen,
  Info,
  Search,
  AlertOctagon,
  CheckCircle2,
} from 'lucide-react';
import { toastEmitter } from './toastEmitter';

type TabId = 'court' | 'edict' | 'token' | 'notify' | 'security' | 'appearance' | 'codex' | 'about';

export function PalaceRegulation() {
  const [activeTab, setActiveTab] = useState<TabId>('court');
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSaved(true);
      toastEmitter.emit({
        level: 'normal',
        title: '🕊️ 宫阙规制已更新',
        desc: '天子御定，即刻生效。',
      });
      setTimeout(() => setShowSaved(false), 2000);
    }, 800);
  };

  const handleDangerReset = () => {
    toastEmitter.emit({
      level: 'emergency',
      title: '🔥 熔断警告',
      desc: '您正在尝试重置紫微城中枢全部数据，此操作极度危险！',
      duration: 8000,
    });
  };

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'court', label: '朝堂规制', icon: <Landmark className="w-4 h-4" /> },
    { id: 'edict', label: '旨意规制', icon: <ScrollText className="w-4 h-4" /> },
    { id: 'token', label: '令牌规制', icon: <Fish className="w-4 h-4" /> },
    { id: 'notify', label: '通知规制', icon: <Bell className="w-4 h-4" /> },
    { id: 'security', label: '安全规制', icon: <Shield className="w-4 h-4" /> },
    { id: 'appearance', label: '外观规制', icon: <Palette className="w-4 h-4" /> },
    { id: 'codex', label: '典章查阅', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'about', label: '关于本朝', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-full bg-bg-primary text-text-primary px-6 py-8 flex justify-center overflow-y-auto">
      <div className="w-full max-w-[1000px] flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-end border-b border-accent-gold/20 pb-6 relative">
          <div>
            <h1 className="font-serif-sc font-black text-3xl text-accent-gold tracking-widest mb-2 flex items-center gap-3">
              <Settings className="w-8 h-8" /> 宫 阙 规 制
            </h1>
            <p className="text-sm text-text-secondary font-serif-sc tracking-widest">
              紫微城中枢建制 · 唯天子可御
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs text-[#8b5cf6] bg-[#8b5cf6]/10 border border-[#8b5cf6]/30">
              <span className="font-ancient text-sm">👑</span> 天子专属
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving || showSaved}
              className="px-6 py-2 bg-accent-gold/10 hover:bg-accent-gold/20 border border-accent-gold/50 text-accent-gold font-serif-sc font-bold rounded transition-all min-w-[120px] flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent-gold"></span>
              ) : showSaved ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> 规制已更新
                </>
              ) : (
                '保存规制'
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-8 items-start relative pb-32">
          {/* Sidebar Navigation */}
          <div className="w-[220px] flex-shrink-0 sticky top-24 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-serif-sc transition-all ${
                  activeTab === tab.id
                    ? 'bg-accent-gold/10 text-accent-gold border border-accent-gold/30 shadow-[0_0_15px_rgba(212,168,67,0.1)]'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5 border border-transparent'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 min-h-[600px] bg-[#1a1f2e]/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden">
            {/* Background watermark */}
            <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none text-[200px] leading-none font-ancient translate-x-1/4 translate-y-1/4 select-none">
              {tabs.find((t) => t.id === activeTab)?.label.charAt(0)}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                {/* Court Regulations */}
                {activeTab === 'court' && (
                  <div className="space-y-8">
                    <h2 className="text-xl font-serif-sc text-accent-gold flex items-center gap-2 border-b border-white/10 pb-4">
                      <Landmark className="w-5 h-5" /> 朝堂规制
                    </h2>

                    <div className="space-y-6">
                      <FieldGroup label="朝堂名称" desc="紫微城中枢的全局显示名称。">
                        <input
                          type="text"
                          defaultValue="紫微城中枢"
                          className="w-full max-w-xs bg-bg-primary border border-white/20 rounded px-3 py-2 text-sm text-text-primary focus:border-accent-gold outline-none focus:shadow-[0_0_10px_rgba(212,168,67,0.2)]"
                        />
                      </FieldGroup>

                      <FieldGroup label="中轴线默认节点" desc="进入朝堂后默认聚焦的紫微城节点。">
                        <select className="w-full max-w-xs bg-bg-primary border border-white/20 rounded px-3 py-2 text-sm text-text-primary focus:border-accent-gold outline-none appearance-none">
                          <option>天堂</option>
                          <option>明堂</option>
                          <option>应天门</option>
                        </select>
                      </FieldGroup>

                      <FieldGroup
                        label="天子驾六显示"
                        desc="在朝堂大厅右下角显示六部健康��浮面板。"
                      >
                        <Toggle defaultChecked={true} />
                      </FieldGroup>

                      <FieldGroup label="自动刷新间隔" desc="朝堂大厅数据的自动轮询间隔。">
                        <select className="w-full max-w-xs bg-bg-primary border border-white/20 rounded px-3 py-2 text-sm text-text-primary outline-none appearance-none">
                          <option>30 秒</option>
                          <option>60 秒</option>
                          <option>5 分钟</option>
                        </select>
                      </FieldGroup>
                    </div>
                  </div>
                )}

                {/* Token Regulations */}
                {activeTab === 'token' && (
                  <div className="space-y-8">
                    <h2 className="text-xl font-serif-sc text-accent-gold flex items-center gap-2 border-b border-white/10 pb-4">
                      <Fish className="w-5 h-5" /> 令牌规制
                    </h2>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left border-collapse">
                        <thead className="text-xs text-text-secondary border-b border-white/10 font-serif-sc">
                          <tr>
                            <th className="pb-3 font-normal px-2">部门</th>
                            <th className="pb-3 font-normal px-2">令牌数量</th>
                            <th className="pb-3 font-normal px-2">预警阈值</th>
                            <th className="pb-3 font-normal px-2">自动补充</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {['户部', '礼部', '兵部', '刑部', '工部', '吏部'].map((dept) => (
                            <tr key={dept} className="hover:bg-white/5">
                              <td className="py-3 px-2 font-serif-sc text-accent-gold">{dept}</td>
                              <td className="py-3 px-2">
                                <select
                                  defaultValue="5"
                                  className="bg-bg-primary border border-white/20 rounded px-2 py-1 outline-none text-xs"
                                >
                                  {[1, 2, 3, 4, 5, 6].map((n) => (
                                    <option key={n} value={String(n)}>
                                      {n}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td className="py-3 px-2">
                                <select className="bg-bg-primary border border-white/20 rounded px-2 py-1 outline-none text-xs">
                                  {[1, 2, 3].map((n) => (
                                    <option key={n}>{n}</option>
                                  ))}
                                </select>
                              </td>
                              <td className="py-3 px-2 flex items-center gap-2 text-text-secondary">
                                <input
                                  type="checkbox"
                                  defaultChecked
                                  className="accent-accent-gold"
                                />{' '}
                                耗尽后+1
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="space-y-6 pt-6 border-t border-white/10">
                      <FieldGroup label="令牌跨部借用" desc="允许尚书省审批部门间令牌借用。">
                        <Toggle defaultChecked={false} />
                      </FieldGroup>
                      <FieldGroup label="令牌自动回收" desc="任务办结后自动缴回令牌。">
                        <Toggle defaultChecked={true} />
                      </FieldGroup>
                    </div>
                  </div>
                )}

                {/* Security Regulations */}
                {activeTab === 'security' && (
                  <div className="space-y-8">
                    <h2 className="text-xl font-serif-sc text-accent-gold flex items-center gap-2 border-b border-white/10 pb-4">
                      <Shield className="w-5 h-5" /> 安全规制
                    </h2>

                    <div className="space-y-6">
                      <FieldGroup label="会话超时" desc="无操作后自动锁定紫微城中枢。">
                        <select
                          defaultValue="30 分钟"
                          className="w-full max-w-xs bg-bg-primary border border-white/20 rounded px-3 py-2 text-sm text-text-primary outline-none appearance-none"
                        >
                          <option value="15 分钟">15 分钟</option>
                          <option value="30 分钟">30 分钟</option>
                          <option value="1 时辰">1 时辰</option>
                        </select>
                      </FieldGroup>

                      <FieldGroup label="操作审计" desc="记录所有敏感操作的流转日志。">
                        <Toggle defaultChecked={true} />
                      </FieldGroup>

                      <FieldGroup label="IP 白名单" desc="允许访问的来源网络。">
                        <div className="w-full max-w-sm border border-white/20 rounded overflow-hidden">
                          <div className="px-3 py-2 text-sm bg-white/5 border-b border-white/10 flex justify-between">
                            <span className="font-mono-jb">10.0.0.0/8 (紫微城内网)</span>
                            <button className="text-accent-red hover:text-red-400">✕</button>
                          </div>
                          <button className="w-full px-3 py-2 text-sm text-left text-text-secondary hover:bg-white/5 hover:text-accent-gold transition-colors">
                            + 添加白名单...
                          </button>
                        </div>
                      </FieldGroup>

                      <div className="mt-12 p-6 border border-accent-red/30 bg-accent-red/5 rounded-xl">
                        <h3 className="text-accent-red font-bold flex items-center gap-2 mb-2">
                          <AlertOctagon className="w-5 h-5" /> 危险区域 (Danger Zone)
                        </h3>
                        <p className="text-sm text-text-secondary mb-4">
                          重置所有令牌、清空敕令队列、归档全部数据。此操作不可撤销！
                        </p>
                        <button
                          onClick={handleDangerReset}
                          className="px-4 py-2 bg-accent-red/20 hover:bg-accent-red/40 text-accent-red border border-accent-red/50 rounded font-serif-sc text-sm font-bold transition-colors"
                        >
                          🔴 熔断重置 (Circuit Breaker Reset)
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Codex Reference */}
                {activeTab === 'codex' && (
                  <div className="space-y-8">
                    <h2 className="text-xl font-serif-sc text-accent-gold flex items-center gap-2 border-b border-white/10 pb-4">
                      <BookOpen className="w-5 h-5" /> 典章查阅
                    </h2>

                    <div className="relative mb-6">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                      <input
                        type="text"
                        placeholder="搜索典章..."
                        className="w-full bg-bg-primary border border-white/20 rounded-lg pl-10 pr-4 py-2 text-sm text-text-primary focus:border-accent-gold outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <CodexCard
                        title="律 (红线规则)"
                        items={[
                          '不可绕过审批',
                          '不可越权操作',
                          '不可篡改流转日志',
                          '密奏仅天子可见',
                        ]}
                      />
                      <CodexCard
                        title="令 (部门职能)"
                        items={[
                          '中书不得越权审议',
                          '门下为唯一审议机构',
                          '尚书为唯一派发机构',
                          '六部不得跨域操作',
                        ]}
                      />
                      <CodexCard
                        title="格 (奖惩细则)"
                        items={[
                          '连续3次封驳扣分',
                          '令牌上限=部门等级',
                          '超时未办结扣分',
                          '密奏不实加倍扣分',
                        ]}
                      />
                      <CodexCard
                        title="式 (操作规范)"
                        items={['API返回格式规范', '日志记录规范', '接口调用规范', '错误码规范']}
                      />
                    </div>
                  </div>
                )}

                {/* Placeholder for other tabs */}
                {['edict', 'notify', 'appearance', 'about'].includes(activeTab) && (
                  <div className="flex flex-col items-center justify-center py-20 opacity-50">
                    <div className="text-6xl mb-4 grayscale">📜</div>
                    <div className="text-text-secondary font-serif-sc tracking-widest">
                      该项规制尚在修缮中
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponents
function FieldGroup({
  label,
  desc,
  children,
}: {
  label: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors">
      <div>
        <div className="text-sm font-serif-sc text-text-primary mb-1">{label}</div>
        <div className="text-xs text-text-secondary">{desc}</div>
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ defaultChecked }: { defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked || false);
  return (
    <button
      onClick={() => setChecked(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-[#10b981]' : 'bg-white/20'}`}
    >
      <div
        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'left-6' : 'left-1'}`}
      />
    </button>
  );
}

function CodexCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border border-white/10 bg-bg-primary rounded-lg overflow-hidden">
      <div className="px-4 py-2 bg-white/5 border-b border-white/10 font-serif-sc text-sm text-accent-gold">
        {title}
      </div>
      <ul className="p-4 space-y-2 text-sm text-text-secondary">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-accent-gold/50 mt-0.5">•</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
