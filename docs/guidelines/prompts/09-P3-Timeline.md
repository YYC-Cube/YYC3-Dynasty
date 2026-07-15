# 09 · P3 十三王朝时间轴 DynastyTimeline（P2 功能核心页）

【角色定位】数据密集型页面设计师（Data-Intensive Page Designer）— 专注大规模内容浏览与筛选体验，精通横向滚动选择器、双层技能卡片网格、分类标签页、时间轴事件流

【任务目标】设计十三王朝技能库核心页，呈现 26 个 L1 文化技能 + 18 个 L2 功能技能，通过朝代选择器→分类标签→技能卡片网格的三级导航实现高效检索与激活操作

【前置依赖】→ 全部组件（01-06）必须已完成

【输出目标】1 个完整 Page P3-Timeline + 13 朝代 Pill 选择器 + 11 分类标签页 + 双层技能卡片网格 + 时间轴事件列表

【验收标准】
- **【AI 可达成】** ① 全屏 max-w 1000px，13 个朝代 Pill 横向排列 ② L1/L2 技能卡片视觉明确区分 ③ 11 个分类标签清晰 ④ 技能协同矩阵面板呈现 ⑤ 朝代选中态金色边框+光晕
- **【人工后处理】** ① 朝代 Pill 横向 snap 滚动交互 ② 分类切换网格过渡用 Smart Animate ③ 技能卡片引用 SkillCard 组件 ④ 创建技能 Modal 表单验证

【优先级】**P2 — 页面级（功能核心页）**（技能系统的主交互界面）

---

--- 复制以下内容提交 ---

【上下文锚点】Token system: bg=#1E180E, gold=#C9A96E, text=#E8D5A3, radius=12px
Components ready: SkillCard(L1/L2) / StatusBadge / DynastyButton

TASK: Design Dynasty Timeline — core skill library with dual-layer system (L1 culture + L2 function).

CONTEXT: Full-screen max-w 1000px. 13 dynasties selectable. 26 L1 skills + 18 L2 skills. 11 categories.

LAYOUT:
┌─────────────────────────────────────────────────┐
│ 十三王朝  中华文明五千年·智能新范式              │
│                                                 │
│ [夏][商][周][秦][汉][魏晋][南北朝]  ← 40px pills│
│ [隋][唐][宋][元][明][清]        horizontal snap  │
│                                                 │
│ ┌─ 唐 朝 ══════════════════════════┐            │
│ │ 618–907·都长安  唐诗巅峰·开放兼容 │            │
│ │ [✨文化Buff激活中 ×1.15加成生效] │            │
│ └───────────────────────────────────┘            │
│                                                 │
│ [全部][治理][礼乐][文韬][革新][盛世][警世]...     │
│                                                 │
│ ┌─ L1 文化层技能 ─────────────────────┐         │
│ │ ⚡桃李满天下 治世 [活跃] ★★★★★    │  ← SkillCard L1
│ │ 效果:Agent回复+15% 冷却:无         │         │
│ │ [展开详情▼]                        │         │
│ ├─────────────────────────────────────┤         │
│ │ 🌸国色天香 盛世 [活跃] ★★★★      │  ← Passive
│ │ 效果:UI金碧辉煌 Buff:×1.15         │         │
│ └─────────────────────────────────────┘         │
│                                                 │
│ ┌─ L2 职能层技能 ─────────────────────┐         │
│ │[龙章][封还][提纲][精打][攻坚][营造]│  ← Compact 6-col grid
│ │ 中书 门下 尚书 户部 兵部 工部      │  100×80px min
│ └─────────────────────────────────────┘         │
│                                                 │
│ ┌─ 技能协同矩阵 L1×L2叠加 ───────────┐         │
│ │ 当前:【唐·桃李】×中书【龙章凤藻】   │         │
│ │ =基础分 ×1.15(Buff) ×1.0(技能)     │         │
│ │ 综合评分: S                         │         │
│ └─────────────────────────────────────┘         │
│ [+ 创建自定义技能]                             │
│ 26项L1 · 18项L2 · 13王朝 × 11类别              │
└─────────────────────────────────────────────────┘

DYNASTY SELECTOR:
- 40×48px pills, horizontal layout
- States: default(muted) / selected(2px gold border+glow) / has-active(green dot)
- Selected detail: Gradient bg, 3px left dynasty-color border, active buff banner

CATEGORY TABS: Horizontal, pill shape, active=filled gold, count badges

L1 SECTION: Vertical list 16px gaps, full SkillCards with expandable 竹简详情
L2 SECTION: CSS Grid auto-fill minmax(100px,1fr), mini cards 100×80px

SYNERGY PANEL: Fixed bottom/collapsible, Venn diagram style L1∩L2, grade S/A/B/C/D

OUTPUT FORMAT:
Generate as editable Figma frame (1000px wide) with Auto Layout throughout.

--- 复制截止 ---

【提交后人工处理】
1. Replace L1/L2 skill cards with SkillCard component instances
2. Add horizontal snap scroll interaction for dynasty selector
3. Add Smart Animate for category tab switching (card grid transition)
4. Create "新建技能" Modal (520×640, backdrop blur):
   Form: 名称/层级(radio)/朝代(drop)/类型(radio)/类别(drop)/效果/系数(slider)/关键词(tags)
5. Generate Mobile variant:
   ```
   Mobile (<768px): Dynasty selector → 2-row grid, L2 skill grid → 2-col,
   synergy panel → full-width below
   ```
