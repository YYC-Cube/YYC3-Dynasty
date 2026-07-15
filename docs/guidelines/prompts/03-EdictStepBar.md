# 03 · EdictStepBar 七阶流转步骤条（P1 核心组件）

【角色定位】流程交互设计师（Flow Interaction Designer）— 专注多步骤进度指示器与状态流转可视化，精通 SVG 路径动画、CSS keyframes 粒子效果、响应式步骤条

【任务目标】设计映射洛阳中轴线七大地标的七阶审批步骤条组件，完整呈现圣旨从"下旨→回奏"的全链路流转状态，含步进动画与驳回抖动特效

【前置依赖】→ 00-Design-Tokens（色彩/动效时长/缓动曲线令牌必须已注入）

【输出目标】1 个主组件 EdictStepBar + 7个步骤节点 × 5种状态 + 连接线动画 + 驳回动效 + 响应式变体（横向/纵向时间轴）

【验收标准】
- **【AI 可达成】** ① 7 步骤完整对应中轴线地标 ② 5种状态视觉差异明确 ③ Auto Layout 等宽分布 ④ 图标按地标语义区分
- **【人工后处理】** ① 封装为 Component ② 步进动效记录在 Description ③ 驳回抖动用 Smart Animate ④ <768px 竖向时间轴作为独立 Variant

【优先级】**P1 — 核心组件**（P2 朝堂大厅页面的核心导航元素）

---

--- 复制以下内容提交 ---

【上下文锚点】Token system: gold=#C9A96E, red=#FF3366, green=#00FF88, duration-normal=300ms

TASK: Design step progress bar "EdictStepBar" for 7-stage edict approval workflow along Luoyang central axis.

STEPS: 下旨(玉玺·天堂) → 分拣(文书·明堂) → 草拟(毛笔·中书省) → 审议(朱笔·门下省) → 派发(令牌·尚书省) → 执行(骏马·六部) → 回奏(折子·天津桥)

PER-STEP STATES:
- "pending": Greyed icon + dashed connector
- "active": Gold pulse glow + highlighted label + solid gold connector to here
- "completed": Gold icon + green checkmark badge
- "rejected": Red icon + red X + shake animation on connector
- "current-focus": Extra large golden ring pulse

REJECT ANIMATION [Figma Smart Animate 可模拟]:
Connector turns red + shake(±4px, 300ms) + red X scale bounce

LAYOUT: Horizontal Auto Layout, equal-width distribution.

CONSTRAINTS:
- Use horizontal Auto Layout with equal-width distribution for all 7 steps
- Ensure all step icons are visible without horizontal scroll on desktop (≥1024px)
- Create a separate vertical timeline variant for mobile (<768px)
- Differentiate each step with a unique cultural icon (seal/document/brush/red-pen/token/horse/memorial)

OUTPUT FORMAT:
Generate two variants: "horizontal" (desktop) and "vertical-timeline" (mobile).
Generate as editable Figma layers with Auto Layout.

--- 复制截止 ---

【提交后人工处理】
1. Create Component Set with orientation property (horizontal/vertical)
2. Create state property (pending/active/completed/rejected/current-focus)
3. Add Smart Animate: pending→active (300ms), active→completed (200ms)
4. Paste transition animation CSS into Description for frontend dev reference:
```
TRANSITION ANIMATION (step N → N+1):
1. Connector line draws itself (stroke-dashoffset, 300ms)
2. Step N+1 icon scales 1.2x→1x (spring 200ms)
3. Label fades in (150ms)
4. Gold particle burst (3 particles, 400ms fade)
```

【文化映射考据】
第七阶"回奏"映射为「天津桥」。定鼎门为洛阳外郭城正门，象征"颁行天下"；
天津桥为百官入朝奏事之所，与"回奏"语义更契合。
若需保留定鼎门，可将其作为"最终归档/昭告天下"的第八阶可选节点。
