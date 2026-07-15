# 13 · P7 竹箴典章 LawLibrary（P2 二级嵌入页）

【角色定位】法律文档系统设计师（Legal Document System Designer）— 专注规则/法律/条款类信息架构设计，精通四元分类体系（律/令/格/式）视觉差异化、嵌入式侧边栏布局、竹简纹理美学

【任务目标】设计 YYC³ Dynasty 的律令典章参考页面，以「律令格式四元体系」组织全部系统规则，支持从 P5 审议面板或 P2 门下节点嵌入调用

【前置依赖】→ 全部组件（01-06）必须已完成

【输出目标】1 个完整 Page P7-LawLibrary + 4个分类 Tab（律/令/格/式）+ 条款卡片列表 + 搜索过滤 + 引用统计面板 + 嵌入式侧边栏模式（320px）+ 移动端独立页模式

【验收标准】
- **【AI 可达成】** ① 四种分类视觉明确区分（红/金/绿/青色左边框）② 侧边栏模式宽度 ≤380px ③ 条款卡片含古文引文（楷体斜体）+ 现代解读 ④ 竹简纹理背景深于主页面 ⑤ 搜索框+分类树导航清晰
- **【人工后处理】** ① 从 P5 打开时自动高亮相关条款交互 ② 移动端独立全屏适配 ③ 条款展开/收起交互 ④ 搜索关键词匹配逻辑

【优先级】**P2 — 页面级（二级嵌入页）**（非顶层导航项，由 P2/P5 触发调用）

---

--- 复制以下内容提交 ---

【上下文锚点】Token system: bg=#1A150C(darker), gold=#C9A96E, text=#E8D5A3
Components ready: DynastyCard-compact / StatusBadge-category / DynastyButton-ghost

TASK: Design Law Library (竹箴典章) — embedded secondary page for legal/rules reference.

CONTEXT: Route /law. Secondary page accessed from P5 Menxia review panel or P2 Menxia node.
Content: 律令格式四元体系 (律/令/格/式).

LAYOUT (embedded in right sidebar 320px wide):
┌──────────────────────────────┐
│ 竹箴典章        [←返回审议]  │
│                              │
│ [律] [令] [格] [式]  ← Tabs  │
│                              │
│ 🔍 搜索典章条文...           │
│                              │
│ ┌──────────────────────────┐ │
│ │ 律 · 第一条               │ │
│ │ 系统红线规则              │ │
│ │                          │ │
│ │ "不可绕过审批流程，       │ │
│ │  不可越权操作数据"        │ │  ← Classical quote (楷体 italic)
│ │                          │ │
│ │ 适用: 全局                │ │
│ │ 违规: 自动封驳 + 记录     │ │
│ │                          │ │
│ │ [引用此条] [相关案例→]   │ │
│ └──────────────────────────┘ │
│ ... more articles ...        │
│                              │
│ 📊 引用统计: 律128/令96/格42/式31 │
└──────────────────────────────┘

FOUR CATEGORIES (律令格式):
- 律(Lü): Red accent #C0392B — System red lines, security prohibitions, hard constraints
- 令(Ling): Gold accent #C9A96E — Department norms, authority boundaries, process standards
- 格(Ge): Green accent #00FF88 — Penalty rules, assessment criteria, quota limits
- 式(Shi): Cyan accent #00D4FF — Operation specs, output formats, API standards

ARTICLE CARD:
- Category color left border 3px
- Title + category tag
- Classical quote in 楷体 italic font
- Modern interpretation
- Applicability scope + violation consequence
- Action buttons: 引用此条 / 相关案例

STYLE:
- Bamboo slip texture background (subtle vertical lines pattern)
- Darker than main pages (#1A150C base)
- Narrower comfortable reading width

OUTPUT FORMAT:
Generate as editable Figma frame (320px width sidebar mode) with Auto Layout.

--- 复制截止 ---

【提交后人工处理】
1. Create Article Card Component with category(律/令/格/式) property
2. Add auto-match highlighting interaction (when opened from P5):
   ```
   Green highlight on matched keywords related to current edict type/content
   ```
3. Add search instant filter interaction
4. Mobile adaptation: full-screen standalone page (no sidebar constraint)
