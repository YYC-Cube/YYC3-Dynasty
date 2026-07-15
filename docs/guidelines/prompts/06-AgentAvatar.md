# 06 · AgentAvatar 十二职司头像（P1 核心组件）

【角色定位】角色视觉系统设计师（Avatar & Identity Designer）— 专注组织架构可视化与角色身份表达，精通层级差异化设计（5级 Tier 体系）、状态指示器、等级徽章系统

【任务目标】设计映射十二职司（天子→太子→三省→六部→早朝）五层级关系的 Avatar 组件，通过尺寸/边框/背景/图标/动效五个维度实现清晰的视觉层级区分

【前置依赖】→ 00-Design-Tokens（色彩/圆角/阴影令牌必须已注入）

【输出目标】1 个主组件 AgentAvatar + 5种 Tier 层级变体 × 4种在线状态 × 多种 Rank Pip 组合

【验收标准】
- **【AI 可达成】** ① 五层 Tier 尺寸递减清晰（56-80→32-40px）② 天子头像视觉最突出 ③ 4种状态点色彩区分 ④ 严格 1:1 宽高比
- **【人工后处理】** ① 封装为 Component，建立 tier/status 属性 ② hover 缩放+阴影用 Smart Animate ③ 替换硬编码色值 ④ 龙纹水印 SVG 记录在 Description

【优先级】**P1 — 核心组件**（P2 朝堂大厅页面的核心身份标识元素）

---

--- 复制以下内容提交 ---

【上下文锚点】Token system: gold=#C9A96E, text=#E8D5A3, shadow=多层叠加

TASK: Avatar component for 12 official roles with hierarchical visual differentiation.

TIERS:
- Tier1 决策层(天子): 56-80px, rounded square double gold border, purple gradient bg(#2D1B69), crown icon, dragon watermark (<10% opacity), gold pulse ring when online
- Tier2 承启层(太子): 48-64px, single gold border, blue-teal gradient, phoenix icon, cyan glow
- Tier3 三省: 40-56px, circle gold ring, department-colored gradient (中书amber/门下crimson/尚书bronze)
- Tier4 六部: 36-48px, circle thin border, 15% opacity dept color, dept icons 💰📖⚔️🛡️🔧👥
- Tier5 辅助层(早朝): 32-40px, circle minimal, neutral grey, ☀️ icon

STATUS DOTS: online(green solid) | busy(amber pulse) | offline(grey 60% desaturated) | in-meeting(red slash overlay)
RANK PIPS: 1-4 rectangular pips below avatar showing agent level

CONSTRAINTS:
- Maintain 1:1 aspect ratio for all avatar sizes
- Keep Emperor avatar ≥40px minimum to preserve visual hierarchy
- Use minimum 32px for all other tiers

OUTPUT FORMAT:
Generate all 5 tiers in a row for visual comparison, with online status as default.
Generate as editable Figma layers with Auto Layout.

--- 复制截止 ---

【提交后人工处理】
1. Create Component Set with tier(1-5) and status(online/busy/offline/meeting) properties
2. Add Smart Animate for hover scale (1.08x, 200ms) + shadow elevation
3. Note dragon watermark SVG in Description for frontend
4. Replace gradient/colors with Token variable references
