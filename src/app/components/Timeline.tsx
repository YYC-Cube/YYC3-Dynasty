/**
 * file: Timeline.tsx
 * description: 王朝时间轴组件 · 历代王朝展示
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-21
 * updated: 2026-07-12
 * status: active
 * tags: [component],[timeline],[dynasty]
 *
 * brief: 历代王朝时间轴可视化
 *
 * details:
 * - 朝代卡片展示（夏商周至现代）
 * - 滚动时间轴交互
 * - 动画进出效果
 *
 * dependencies: React, motion/react
 * exports: Timeline
 */

import { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const DYNASTIES = [
  {
    id: 'xia',
    name: '夏',
    period: '约前2070–约前1600年',
    capital: '斟鄩',
    desc: '华夏文明的发源地，青铜器时代的开端。',
  },
  {
    id: 'shang',
    name: '商',
    period: '约前1600–前1046年',
    capital: '西亳',
    desc: '甲骨文与祭祀文化的早期繁荣。',
  },
  {
    id: 'xizhou',
    name: '西周',
    period: '前1046–前771年',
    capital: '成周',
    desc: '礼乐制度的创立，周公营建成周。',
  },
  {
    id: 'dongzhou',
    name: '东周',
    period: '前771–前256年',
    capital: '洛邑',
    desc: '诸子百家，百家争鸣的学术鼎盛期。',
  },
  {
    id: 'donghan',
    name: '东汉',
    period: '25–220年',
    capital: '雒阳',
    desc: '丝绸之路的延伸与造纸术的发明。',
  },
  {
    id: 'caowei',
    name: '曹魏',
    period: '220–266年',
    capital: '洛阳',
    desc: '建安风骨，文学与政治的交融。',
  },
  {
    id: 'xijin',
    name: '西晋',
    period: '266–316年',
    capital: '洛阳',
    desc: '太康文学，竹林七贤的玄学风尚。',
  },
  {
    id: 'beiwei',
    name: '北魏',
    period: '493–534年',
    capital: '洛阳',
    desc: '孝文帝汉化改革，龙门石窟开凿。',
  },
  {
    id: 'sui',
    name: '隋',
    period: '605–618年',
    capital: '东都',
    desc: '大运河的开凿，科举制的初步创立。',
  },
  {
    id: 'tang',
    name: '唐',
    subtitle: '武周',
    period: '618–907年',
    capital: '神都',
    desc: '万国来朝的盛世，洛阳紫微城之巅。',
  },
  {
    id: 'houliang',
    name: '后梁',
    period: '907–923年',
    capital: '西都',
    desc: '五代十国开端，中原政权的更迭。',
  },
  {
    id: 'houtang',
    name: '后唐',
    period: '923–936年',
    capital: '洛阳',
    desc: '沙陀部族的汉化，恢复唐朝旧制。',
  },
  {
    id: 'houjin',
    name: '后晋',
    period: '936–947年',
    capital: '洛阳',
    desc: '幽云十六州的割让，风云变幻的乱世。',
  },
];

const CATEGORIES = ['全部', '治理', '礼乐', '文韬', '革新', '盛世', '警世'];

interface DynastySkill {
  id: number;
  dynasty: string;
  icon: string;
  title: string;
  category: string;
  desc: string;
  keywords: string[];
  active: boolean;
}

const MOCK_SKILLS: DynastySkill[] = [
  {
    id: 1,
    dynasty: 'tang',
    icon: '📜',
    title: '唐诗品鉴',
    category: '文韬',
    desc: '初盛中晚四唐风格流变解析',
    keywords: ['唐诗', '李白', '杜甫', '律诗'],
    active: true,
  },
  {
    id: 2,
    dynasty: 'tang',
    icon: '🏯',
    title: '紫微宫营造',
    category: '盛世',
    desc: '神都洛阳建筑规划与空间哲学推演',
    keywords: ['建筑', '明堂', '天堂', '都城'],
    active: true,
  },
  {
    id: 3,
    dynasty: 'tang',
    icon: '⚖️',
    title: '律令格式',
    category: '治理',
    desc: '大唐行政法典合规性审查插件',
    keywords: ['唐律', '疏议', '法典'],
    active: false,
  },
  {
    id: 4,
    dynasty: 'dongzhou',
    icon: '📖',
    title: '诸子百家',
    category: '文韬',
    desc: '道儒法墨思想流派语料库',
    keywords: ['老子', '孔子', '哲学'],
    active: true,
  },
  {
    id: 5,
    dynasty: 'dongzhou',
    icon: '⚔️',
    title: '兵法韬略',
    category: '警世',
    desc: '孙膑兵法与战国阵法模拟',
    keywords: ['兵家', '战术', '推演'],
    active: false,
  },
  {
    id: 6,
    dynasty: 'sui',
    icon: '🌊',
    title: '运河水系',
    category: '革新',
    desc: '大运河物流与水利工程优化',
    keywords: ['漕运', '水利', '洛口仓'],
    active: true,
  },
  {
    id: 7,
    dynasty: 'sui',
    icon: '🎓',
    title: '科举选士',
    category: '治理',
    desc: '标准化人才评估与九品中正制变迁',
    keywords: ['科举', '进士', '人才'],
    active: true,
  },
  {
    id: 8,
    dynasty: 'beiwei',
    icon: '🗿',
    title: '龙门造像',
    category: '礼乐',
    desc: '石窟艺术风格与北朝佛教传播',
    keywords: ['石窟', '造像', '佛教'],
    active: false,
  },
  {
    id: 9,
    dynasty: 'beiwei',
    icon: '🔄',
    title: '孝文汉化',
    category: '革新',
    desc: '民族融合政策与文化适应模型',
    keywords: ['改革', '鲜卑', '汉化'],
    active: true,
  },
  {
    id: 10,
    dynasty: 'xizhou',
    icon: '🎵',
    title: '制礼作乐',
    category: '礼乐',
    desc: '周代礼乐制度与钟鼎铭文识别',
    keywords: ['礼记', '编钟', '金文'],
    active: true,
  },
  {
    id: 11,
    dynasty: 'xizhou',
    icon: '🗺️',
    title: '分封建国',
    category: '治理',
    desc: '封建等级与宗法血缘网络图谱',
    keywords: ['诸侯', '宗法', '世系'],
    active: false,
  },
  {
    id: 12,
    dynasty: 'donghan',
    icon: '📜',
    title: '蔡侯纸',
    category: '革新',
    desc: '造纸工艺演进与信息载体革命',
    keywords: ['造纸术', '蔡伦', '媒介'],
    active: true,
  },
  {
    id: 13,
    dynasty: 'donghan',
    icon: '🐫',
    title: '太学丝路',
    category: '盛世',
    desc: '太学教育与丝路东端商贸网络',
    keywords: ['太学', '商贸', '班超'],
    active: true,
  },
  {
    id: 14,
    dynasty: 'caowei',
    icon: '📝',
    title: '建安风骨',
    category: '文韬',
    desc: '三曹七子文学鉴赏与文本生成',
    keywords: ['三曹', '诗赋', '文学'],
    active: true,
  },
  {
    id: 15,
    dynasty: 'caowei',
    icon: '🌾',
    title: '屯田制',
    category: '治理',
    desc: '战时农业经济模型与屯田管理',
    keywords: ['屯田', '农业', '经济'],
    active: false,
  },
  {
    id: 16,
    dynasty: 'xijin',
    icon: '🎋',
    title: '竹林玄学',
    category: '文韬',
    desc: '清谈玄学体系与竹林七贤思想',
    keywords: ['玄学', '清谈', '七贤'],
    active: true,
  },
  {
    id: 17,
    dynasty: 'shang',
    icon: '🐢',
    title: '甲骨贞卜',
    category: '礼乐',
    desc: '商代甲骨文图像识别与占卜祭祀分析',
    keywords: ['甲骨文', '占卜', '殷墟'],
    active: true,
  },
  {
    id: 18,
    dynasty: 'shang',
    icon: '🏺',
    title: '青铜饕餮',
    category: '革新',
    desc: '青铜器纹饰生成与冶铸工艺数据库',
    keywords: ['青铜器', '饕餮纹', '司母戊'],
    active: true,
  },
  {
    id: 19,
    dynasty: 'xia',
    icon: '🌊',
    title: '大禹治水',
    category: '治理',
    desc: '史前洪水防御与黄河流域水文模拟',
    keywords: ['治水', '大禹', '神话'],
    active: true,
  },
];

const SkillCard = forwardRef<HTMLDivElement, { skill: DynastySkill }>(({ skill }, ref) => {
  const [active, setActive] = useState(skill.active);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={`p-4 rounded-xl border flex items-start gap-4 transition-colors duration-300 ${
        active
          ? 'border-accent-gold/40 bg-accent-gold/5 shadow-[0_4px_20px_rgba(212,168,67,0.05)]'
          : 'border-white/10 bg-white/5'
      } hover:border-accent-gold/60`}
    >
      <div className="text-3xl mt-1 select-none">{skill.icon}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-serif-sc font-bold text-base text-text-paper">{skill.title}</h3>
          <span
            className={`px-2 py-[2px] rounded border text-[10px] ${
              active
                ? 'bg-accent-gold/20 text-accent-gold border-accent-gold/30'
                : 'bg-white/5 text-text-secondary border-white/10'
            }`}
          >
            {skill.category}
          </span>
        </div>
        <p className="text-[13px] text-text-secondary mb-4 leading-relaxed">{skill.desc}</p>
        <div className="flex flex-wrap gap-2">
          {skill.keywords.map((kw: string) => (
            <span
              key={kw}
              className="px-2 py-0.5 rounded bg-black/40 border border-white/5 text-[11px] text-text-secondary/80 font-serif-sc"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-end pt-1 pl-2">
        <button
          onClick={() => setActive(!active)}
          className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-300 ${active ? 'bg-accent-gold' : 'bg-white/20'}`}
        >
          <motion.div
            className="w-4 h-4 rounded-full bg-white shadow-sm"
            animate={{ x: active ? 20 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </button>
      </div>
    </motion.div>
  );
});

export function Timeline() {
  const [selectedDynasty, setSelectedDynasty] = useState('tang');
  const [category, setCategory] = useState('全部');

  const selected = DYNASTIES.find((d) => d.id === selectedDynasty)!;
  const filteredSkills = MOCK_SKILLS.filter(
    (s) => s.dynasty === selectedDynasty && (category === '全部' || s.category === category),
  );

  return (
    <div className="min-h-full bg-bg-paper text-text-paper selection:bg-accent-gold/30 flex flex-col relative overflow-hidden">
      {/* Background textures */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1615598124505-181552a8a5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E180E] via-transparent to-[#1E180E] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[1000px] mx-auto pt-10 pb-20 px-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif-sc font-black text-3xl text-accent-gold tracking-widest mb-2">
            十三王朝
          </h1>
          <p className="text-sm text-accent-gold/70 font-serif-sc">中华文明五千年 · 智能新范式</p>
        </div>

        {/* Dynasty Selector */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto py-4 hide-scrollbar w-full mb-6">
          {DYNASTIES.map((d, i) => (
            <div key={d.id} className="flex items-center">
              <button
                onClick={() => setSelectedDynasty(d.id)}
                className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-all shrink-0 ${
                  selectedDynasty === d.id
                    ? 'bg-accent-gold text-bg-paper border-2 border-accent-gold shadow-[0_0_15px_rgba(212,168,67,0.5)]'
                    : 'bg-black/20 border border-accent-gold/20 text-accent-gold/70 hover:border-accent-gold/60 hover:bg-accent-gold/10'
                }`}
              >
                <span className="font-ancient text-lg leading-none pt-0.5">{d.name}</span>
              </button>
              {i < DYNASTIES.length - 1 && (
                <div className="w-4 h-[1px] bg-accent-gold/20 mx-1 shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Dynasty Info Banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-accent-gold/5 border border-accent-gold/20 rounded-xl p-6 relative overflow-hidden mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          >
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-accent-gold/10 to-transparent pointer-events-none" />
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-[140px] font-ancient text-accent-gold/5 pointer-events-none select-none">
              {selected.name}
            </div>

            <div className="relative z-10 flex justify-between items-center">
              <div>
                <div className="flex items-end gap-4 mb-4">
                  <h2 className="font-serif-sc text-4xl font-black text-accent-gold">
                    {selected.name}
                  </h2>
                  {selected.subtitle && (
                    <span className="font-serif-sc text-xl text-accent-gold/80 mb-1">
                      ({selected.subtitle})
                    </span>
                  )}
                  <span className="font-mono-jb text-text-paper/70 text-sm pb-1 ml-2 bg-black/30 px-2 py-0.5 rounded">
                    {selected.period}
                  </span>
                </div>
                <div className="flex items-center gap-8 text-sm text-text-paper/90">
                  <div className="flex items-center gap-2">
                    <span className="opacity-60 font-serif-sc">都城:</span>
                    <span className="font-serif-sc font-bold text-accent-gold bg-accent-gold/10 px-2 py-0.5 rounded border border-accent-gold/20">
                      {selected.capital}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="opacity-60 font-serif-sc">文化纪元:</span>
                    <span className="font-serif-sc">{selected.desc}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Category Tabs */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-serif-sc transition-colors border ${
                category === cat
                  ? 'bg-accent-gold text-bg-paper border-accent-gold font-bold shadow-[0_0_10px_rgba(212,168,67,0.3)]'
                  : 'bg-black/30 text-text-secondary border-white/10 hover:bg-white/10 hover:text-text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Cards Grid */}
        <div className="flex-1">
          {filteredSkills.length > 0 ? (
            <motion.div layout className="grid grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full min-h-[300px] flex flex-col items-center justify-center py-20 opacity-60"
            >
              <div className="text-8xl text-accent-gold/20 mb-6 font-ancient mix-blend-screen">
                空
              </div>
              <p className="text-text-paper font-serif-sc tracking-widest text-lg">
                此朝代暂无可用技能
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
