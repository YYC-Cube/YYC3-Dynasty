# 02 · DynastyCard 通用卡片容器（P1 核心组件）

【角色定位】容器组件架构师（Container Architect）— 专注卡片/面板类复合组件设计，精通 Auto Layout 嵌套、内容自适应、状态驱动视觉变化、古风装饰性边框实现

【任务目标】设计通用的 DynastyCard 容器组件，支持多种 variant/padding/status 组合，作为页面中信息展示的核心载体，具备卷轴画轴美学气质

【前置依赖】→ 00-Design-Tokens（背景色/边框/圆角/阴影令牌必须已注入）

【输出目标】1 个主组件 DynastyCard + 5种 variant × 3种 padding × 5种 status = 75+ Variant 组合

【验收标准】
- **【AI 可达成】** ① Auto Layout Vertical 三区结构清晰 ② 宽度区间 80-480px ③ 5种 variant 视觉差异明确 ④ status 用左侧3px色条区分 ⑤ hover 态背景提亮
- **【人工后处理】** ① 封装为 Component，建立 variant/padding/status 属性 ② 替换硬编码色值 ③ Imperial 变体 SVG 描边动画记录在 Description ④ hover 用 Smart Animate

【优先级】**P1 — 核心组件**（被 SkillCard/AgentCard/EdictCard 等继承或组合使用）

---

--- 复制以下内容提交 ---

【上下文锚点】Token system: bg=#1E180E/#2A2218, gold=#C9A96E, text=#E8D5A3, radius-card=12px

TASK: Design versatile card container "DynastyCard" with scroll-painting aesthetic.

STRUCTURE (Auto Layout Vertical):
┌─────────────────────────────────────┐
│ [Header Row]          [StatusBadge] │
│ [Body Content Area]                 │
│ [Footer Row]          [ActionBtn]   │
└─────────────────────────────────────┘

VARIANTS:
- variant: "default" | "elevated"(higher shadow) | "outlined"(thick gold border) | "ghost" | "imperial"(回字纹 decorative frame)
- padding: "compact"(12px) | "normal"(16px) | "comfortable"(24px)
- status: "neutral" | "active"(3px left gold border) | "success"(green) | "warning"(amber) | "danger"(red)

SPECS:
- bg: rgba(201,169,110,0.04)
- border: 1px solid rgba(201,169,110,0.12)
- radius: 12px
- Hover: bg transitions to rgba(201,169,110,0.08), border brightens to rgba(201,169,110,0.20)
- Imperial variant: decorative 回字纹 (key-fret pattern) border frame

CONSTRAINTS:
- Keep card width between 80px and 480px
- Maintain minimum height of 80px
- Use single-level Auto Layout nesting (card > content rows)
- Apply 3px left accent border for active/success/warning/danger status colors

OUTPUT FORMAT:
Generate as editable Figma frames with Auto Layout. Show all variants in a grid for comparison.
Reference the 回字纹 (key-fret) pattern: a repeating geometric border motif resembling the Chinese character 回.

--- 复制截止 ---

【提交后人工处理】
1. Create Component Set with variant/padding/status properties
2. Replace bg/border colors with Token variable references
3. For Imperial variant: note SVG stroke-dasharray animation in Description for frontend:
```
Imperial border: SVG rect with stroke-dasharray animation on mount (stroke-dashoffset 100%→0%, 500ms ease-out)
```
4. Prototype: default→hover with 200ms Smart Animate transition
