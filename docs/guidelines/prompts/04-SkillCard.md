# 04 · SkillCard 技能卡片（P1 核心组件）

【角色定位】游戏化 UI 设计师（Gamification UI Designer）— 专注技能/成就/道具类卡牌组件设计，精通双层信息架构（L1文化层/L2功能层）、状态机、SVG 环形进度条与径向渐变动效

【任务目标】设计支持十三王朝 26个 L1 文化技能 + 18个 L2 功能技能的统一卡片组件，清晰区分双层视觉语言，完整覆盖 5 种状态变体与冷却倒计时动效

【前置依赖】→ 00-Design-Tokens + → 02-DynastyCard（继承卡片容器基础结构与 Token 引用规范）

【输出目标】1 个主组件 SkillCard + L1/L2 双层视觉变体 × 5种状态 + 激活切换动效 + 冷却环形进度条

【验收标准】
- **【AI 可达成】** ① L1 与 L2 视觉明确区分（竹简纹理+140px高 vs 紧凑布局+100px高）② 5 种状态视觉差异清晰 ③ L1 含朝代名徽章+古典引文 ④ L2 含部门徽章+消耗指示
- **【人工后处理】** ① 封装为 Component，建立 layer(L1/L2)/state 属性 ② 冷却环动画记录在 Description ③ 激活动效记录在 Description ④ 替换硬编码色值

【优先级】**P1 — 核心组件**（P3 十三王朝时间轴页面的核心展示单元）

---

--- 复制以下内容提交 ---

【上下文锚点】Token system: bg=#2A2218, gold=#C9A96E, text=#E8D5A3, radius-card=12px
Component ready: DynastyCard (inherit base structure)

TASK: Design skill card for L1 (Culture Layer) and L2 (Function Layer) skills from 13 dynasties.

STATE VARIANTS:
- "locked": 50% opacity, lock overlay, "解锁条件: XXX"
- "unlocked-inactive": Normal + toggle OFF
- "unlocked-active": Golden breathing glow border (2s loop), toggle ON, left accent bar
- "cooling-down": 70% opacity, circular countdown ring (SVG dasharray), timer MM:SS
- "passive-always-on": Green left border, "被动" badge, no toggle, slow 3s pulse

L1 vs L2 DIFFERENTIATION:
- L1: Bamboo slip texture bg, dynasty name badge (e.g."唐·618-907"), cultural quote in classical italic, min height 140px
- L2: Compact layout min 100px, department badge (e.g."中书省·主动"), cost indicator "消耗🔵政令值X"

OUTPUT FORMAT:
Generate L1 and L2 as separate labeled frames. Show all 5 states for each layer.
Generate as editable Figma layers with Auto Layout.

--- 复制截止 ---

【提交后人工处理】
1. Create Component Set with layer(L1/L2) and state properties
2. Replace bamboo texture bg and colors with Token variable references
3. Note activation toggle + cooldown ring CSS in Description for frontend:
```
ACTIVATION TOGGLE [Production CSS]:
ON: Radial gradient reveal from toggle outward across card (400ms)
OFF: Glow fades out (300ms)

COOLDOWN RING [Production CSS]:
SVG circle with stroke-dasharray, CSS @keyframes rotation
```
