# 10 · P4 勋章墙 HonorWall（P2 页面级）

【角色定位】成就展示设计师（Achievement & Gallery Designer）— 专注用户成就/勋章/荣誉的可视化呈现，精通勋章卡片网格、等级进度条、解锁动画、时间线成就流、空状态引导设计

【任务目标】设计用户个人成就展示页——勋章墙，以视觉化方式呈现用户在 YYC³ Dynasty 中获得的所有勋绩、里程碑与历史记录，激励持续参与

【前置依赖】→ 全部组件（01-06）必须已完成

【输出目标】1 个完整 Page P4-HonorWall + 勋章卡片网格 + 等级进度区 + 成就时间线 + 空状态引导

【验收标准】
- **【AI 可达成】** ① 勋章卡片含锁定/解锁/已佩戴三种视觉状态 ② 4种稀有度视觉区分 ③ 等级进度条+总星数展示 ④ 成就时间线最新在上 ⑤ 空状态有获取指引文案
- **【人工后处理】** ① 解锁仪式感动画用 Smart Animate 多帧 ② 筛选与排序交互 ③ legendary 闪光边框动效记录在 Description

【优先级】**P2 — 页面级**（用户激励与留存关键页面）

---

--- 复制以下内容提交 ---

【上下文锚点】Token system: bg=#1E180E, gold=#C9A96E, text=#E8D5A3, radius=16px
Components ready: StatusBadge / DynastyCard

TASK: Design Honor Wall displaying 17 culture-themed achievement badges with rarity tiers.

CONTEXT: Route /honors. Entry from welcome-P3 or post-task-completion redirect.
17 honors across 4 rarity tiers.

LAYOUT:
┌─────────────────────────────────────┐
│ 勋绩考课  十七勋章·功业昭彰         │
│ [全部] [已获] [未解锁] [稀有]        │
│ 已获 8/17 · 总星 23/85 ★           │
│ ██████████░░░░ 47%                 │
│                                     │
│ ┌──────┐ ┌──────┐ ┌──────┐        │
│ │ 🏅   │ │ 🏅   │ │ 🏅   │        │  Grid auto-fill minmax(180px)
│ │名称  │ │名称  │ │名称  │        │  180×220px fixed ratio
│ │★★★★★│ │★★★☆☆│ │☆☆☆☆☆│        │
│ │[已获]│ │[80%] │ │[锁定]│        │
│ └──────┘ └──────┘ └──────┘        │
│                                     │
│ 最近获得:                           │
│ │📜开元盛世 今天14:30              │  Timeline newest-top
│ │⚔️斩关夺隘 昨天09:15              │
└─────────────────────────────────────┘

HONOR CARD: Radius 16px, vertical auto-layout
- Top: Icon 64×64 (earned=color, locked=grey silhouette)
- Middle: Name bold + Rarity stars (★/☆)
- Bottom: Status — earned(date+check) | progress(circle%) | locked(condition+lock)

RARITY TIERS:
- Common(6 medals): silver-grey palette
- Rare(5 medals): gold palette + detailed icon
- Epic(4 medals): gold-red palette + animated border
- Legendary(2 medals): unique shimmer border, truly special

CONSTRAINTS:
- Use traditional medal/seal aesthetic (NOT game-cartoon style)
- Show clear unlock paths for locked honors
- Legendary honors must feel truly special and rare

OUTPUT FORMAT:
Generate as editable Figma frame with Auto Layout. Show all 17 honors in a grid.

--- 复制截止 ---

【提交后人工处理】
1. Create Component for HonorCard with state(earned/progress/locked) property
2. Unlock ceremony animation with Smart Animate multi-frame:
   ```
   Flash white(200ms) → Lock shatters(300ms) → Icon colorize(500ms) →
   12 golden particles erupt(600ms) → Rarity glow settles → Badge slides in(200ms)
   Legendary adds confetti burst.
   ```
3. Add filter/sort interactions
4. Note legendary shimmer border CSS in Description
5. Generate Mobile variant:
   ```
   Mobile (<480px): Single column cards, larger touch targets
   ```
