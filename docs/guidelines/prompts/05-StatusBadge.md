# 05 · StatusBadge 状态徽章（P1 核心组件）

【角色定位】微组件设计师（Micro-Component Designer）— 专注状态指示器/标签/徽章类原子组件设计，精通 CSS shimmer/pulse 动画、无障碍色彩对比（WCAG 2.1 AA）、色盲友好型状态区分

【任务目标】设计覆盖全工作流状态的统一 StatusBadge 组件，8种类型 × 3种尺寸 × 3种形状组合，确保每个状态在视觉、动效、无障碍三个维度均可明确辨识

【前置依赖】→ 00-Design-Tokens（状态色/圆角/动效令牌必须已注入）

【输出目标】1 个主组件 StatusBadge + 8种 type × 3种 size × 3种 shape = 72+ Variant 组合 + 独立动画定义

【验收标准】
- **【AI 可达成】** ① 8 种状态色彩+图标+形状三通道区分（色盲安全）② 3种尺寸清晰 ③ 文本控制在 6 个中文字符内 ④ 三种动画态视觉可辨
- **【人工后处理】** ① 封装为 Component，建立 type/size/shape 属性 ② shimmer/pulse/glow 动画用 Smart Animate 或记录在 Description ③ 替换硬编码色值

【优先级】**P1 — 核心组件**（被 DynastyCard/SkillCard/EdictCard 等广泛嵌套使用）

---

--- 复制以下内容提交 ---

【上下文锚点】Token system: gold=#C9A96E, red=#FF3366, green=#00FF88, amber=#FFDD00, cyan=#2E5EAA

TASK: Unified status badge covering all workflow states.

TYPES:
- pending: 石青 #2E5EAA solid, clock icon
- processing: 鎏金 #C9A96E + shimmer sweep, gear icon
- approved: 青铜绿 #00FF88 + ✓ check
- rejected: 朱红 #FF3366 + ✕ cross
- completed: 纸白 #E8D5A3 outlined, seal icon
- error: 红色 #FF3366 + pulse glow, alert icon
- locked: 灰色 desaturated, lock icon
- active: 金色 #C9A96E + glow, star icon

SIZES: sm(20px h) | md(24px h) | lg(28px h)
SHAPES: pill(radius-full) | rounded(radius-sm) | square(2px)

ANIMATIONS:
- processing: Shimmer sweep left→right, 2s loop
- error: Pulse glow 0.6↔1.0 opacity, 1s loop
- active: Golden breath box-shadow spread, 2.5s loop
- State change: Background 200ms ease, scale 1.0→1.1→1.0 spring

CONSTRAINTS:
- Keep text within 6 Chinese characters for readability
- Limit to 1 animated badge per viewport to avoid visual noise
- Pair each color with a unique icon/shape for colorblind accessibility

OUTPUT FORMAT:
Generate all 8 types in a grid (md size, pill shape as default).
Generate as editable Figma layers with Auto Layout.

--- 复制截止 ---

【提交后人工处理】
1. Create Component Set with type/size/shape properties
2. Add Smart Animate for processing shimmer and error pulse loops
3. Replace colors with Token variable references
