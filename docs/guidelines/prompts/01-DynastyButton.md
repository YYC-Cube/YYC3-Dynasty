# 01 · DynastyButton 通用按钮（P1 核心组件）

【角色定位】资深组件设计师（Component Designer）— 专注 Figma Component + Variants 体系设计，精通按钮组件的状态机建模、Auto Layout 响应式构建、微交互动效实现

【任务目标】设计完整的 DynastyButton 组件体系，覆盖全部 type×size×state 变体组合，包含特殊的"奉天承运"玉玺 CTA 按钮及其钤印动效

【前置依赖】→ 00-Design-Tokens（色彩/圆角/阴影/动效令牌必须已注入）

【输出目标】1 个主组件 DynastyButton + 5种 type × 3种 size × 5种 state = 75+ Variant 组合 + 1个特殊 Imperial Seal CTA 变体

【验收标准】
- **【AI 可达成】** ① 所有按钮使用 Auto Layout 构建响应式结构 ② 色彩按 type 区分清晰 ③ 5种 state 视觉差异可辨 ④ Seal 类型视觉区别于普通按钮 ⑤ 尺寸遵循 sm28/md36/lg44px
- **【人工后处理】** ① 封装为 Component，建立 type/size/state 变体属性 ② 替换硬编码色值为 Token 引用 ③ Prototype hover/active 过渡 ④ 钤印动效记录在 Description

【优先级】**P1 — 核心组件**（被所有页面广泛使用）

---

--- 复制以下内容提交 ---

【上下文锚点】Token system: bg=#1E180E, gold=#C9A96E, red=#C0392B, text=#E8D5A3, radius-btn=8px

TASK: Design "DynastyButton" with full variant coverage embodying imperial court aesthetics.

VARIANTS:
- type: "primary"(gold fill #C9A96E) | "secondary"(transparent+gold border) | "seal"(red fill #C0392B) | "ghost"(transparent) | "success"(green #00FF88)
- size: "sm"(28px h) | "md"(36px h) | "lg"(44px h)
- state: "default" | "hover"(glow+shadow) | "active"(press 1px) | "disabled"(40% opacity) | "loading"(spinner)

SPECIAL: "Imperial Seal Button" (奉天承运 CTA)
- Larger lg size, ancient pattern overlay (暗纹 SVG background)
- Click animation: Seal drops from top → contact → ink spreads outward → content reveals
- Duration: 800ms, easing: cubic-bezier bounce curve

SPECS: border-radius 8px, font weight medium, icon gap 8px, transition 200ms

GENERATION STRATEGY:
Step 1: Generate type=primary, size=md, all 5 states first as style anchor
Step 2: After confirming style, request remaining type×size combinations

CONSTRAINTS:
- Use Auto Layout for all buttons (horizontal, gap 8px, padding appropriate to size)
- Reserve primary(gold) type for one main action per section
- Reserve seal(red) type for critical irreversible actions only
- Differentiate disabled state with 40% opacity (maintain readability)
- Show loading state with a small spinning seal icon replacing left content

OUTPUT FORMAT:
Generate as editable Figma layers with Auto Layout. Each variant as a separate labeled frame.
Do not output CSS code; the animation keyframes below are for frontend reference only.

--- 复制截止 ---

【提交后人工处理】
1. Select all generated states → Create Component Set
2. Map properties: type / size / state
3. Replace all fill colors with Variable references from Token Board
4. Add Prototype interactions: default→hover(on hover)→active(on press)
5. Paste this CSS into component Description for frontend dev reference:
```
@keyframes seal-drop { 0%{transform:translateY(-80px) scale(.5);opacity:0} 60%{transform:translateY(8px) scale(1.05);opacity:1} 80%{transform:translateY(-4px) scale(.98)} 100%{transform:translateY(0) scale(1);opacity:1} }
Duration: 800ms | cubic-bezier(0.68,-0.55,0.265,1.55)
```
