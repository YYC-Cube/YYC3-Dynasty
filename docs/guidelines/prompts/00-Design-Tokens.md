# 00 · Design Tokens 全局注入（P0 基础设施）

【角色定位】资深设计系统架构师（Design System Architect）— 精通 Figma Variables、CSS Custom Properties、Design Token 语义化命名体系，具备中国古典美学与现代 SaaS 设计系统融合经验

【任务目标】创建完整的 YYC³ Dynasty Design System，输出可视化的 Design Token 看板，作为所有后续组件和页面的唯一色彩/字体/间距/阴影/动效来源

【前置依赖】无（本提示词为整个流程的 P0 基础设施，必须首先执行）

【输出目标】1 块可视化 Design Token Board（6组色板/字体/间距/圆角/阴影/动效样例）

【验收标准】
- **【AI 可达成】** ① 色板按组排列、每个色值有标注名称 ② 字体展示4级层级 ③ 阴影呈现多层叠加效果 ④ 金色调为暖调 muted ⑤ 红色系唤起朱砂印泥联想 ⑥ 宣纸底色非纯黑
- **【人工后处理】** ① 将色板封装为 Figma Variables ② 创建 Color/Text/Effect Styles ③ 建立变量引用关系（AI 生成硬编码值，需人工替换）

【优先级】**P0 — 必须首先执行**（后续所有组件/页面均依赖此 Token 集）

---

--- 复制以下内容提交 ---

TASK:
Create a complete Design System for "YYC³ Dynasty" — an ancient Chinese imperial court themed multi-agent collaboration platform.
Generate all Design Tokens as a visual "Design Token Board" with labeled swatches and samples.

CONTEXT:
This is a dark-themed application inspired by Tang-Song dynasty aesthetics combined with modern SaaS dashboard patterns.
The visual mood is "ancient solemnity + technological lightness".
Reference aesthetic: Xuan paper texture, scroll unfurling, imperial seal stamping, gold leaf accents.

FEW-SHOT STYLE ANCHOR:
Reference this completed example as the visual style target:
- Card background: warm dark brown #2A2218 with subtle paper noise overlay
- Gold accent: muted antique gold #C9A96E, evoking aged gold leaf (NOT bright neon gold)
- Red accent: deep cinnabar #C0392B, evoking wet seal paste (NOT bright crimson)
- Text on dark: warm parchment cream #E8D5A3, evoking ink on aged Xuan paper
- Overall mood: "ancient solemnity + technological lightness" — think Tang dynasty scroll meets modern dark-mode dashboard

ELEMENTS:

=== COLOR TOKENS ===
/* Primary Palette - Ancient Culture Theme */
--color-bg-primary: #1E180E;          /* 宣纸旧色/墨底 */
--color-bg-secondary: #2A2218;        /* 卡片背景 */
--color-bg-tertiary: #352C20;         /* 面板背景 */
--color-bg-elevated: #3D3327;         /* 浮层背景 */

--color-text-primary: #E8D5A3;        /* 拓印白 - 主文本 */
--color-text-secondary: rgba(201,169,110,0.65);
--color-text-muted: rgba(201,169,110,0.45);  /* 注：原0.30对比度不足，提升至0.45 */

--color-accent-gold: #C9A96E;         /* 鎏金 - 主色调 */
--color-accent-gold-hover: #D4B87D;
--color-seal-red: #C0392B;            /* 印章红 - 强调色 */
--color-success: #00FF88;             /* 准奏绿 */
--color-warning: #FFDD00;             /* 待审议黄 */
--color-danger: #FF3366;              /* 驳回红 */

/* Status Badge Colors */
--color-status-pending: #2E5EAA;      /* 石青 - 待处理 */
--color-status-processing: #C9A96E;
--color-status-approved: #00FF88;
--color-status-rejected: #FF3366;
--color-status-completed: #E8D5A3;

/* Card Opacity Variants */
--color-card-default: rgba(201,169,110,0.04);
--color-card-hover: rgba(201,169,110,0.08);
--color-card-border: rgba(201,169,110,0.12);
--color-card-border-active: #C9A96E;

/* Interaction State Tokens */
--color-border-gold: rgba(201,169,110,0.12);
--color-border-gold-active: #C9A96E;
--color-overlay-focus: rgba(201,169,110,0.16);
--color-skeleton-base: rgba(201,169,110,0.06);
--color-skeleton-shimmer: rgba(201,169,110,0.12);

/* Edict Type Colors (P5 旨意板) */
--color-edict-system: #7B2FF7;      /* 制书·紫 */
--color-edict-normal: #C9A96E;      /* 敕书·金 */
--color-edict-fast: #00D4FF;        /* 敕牒·青 */
--color-edict-dept: #00FF88;        /* 堂帖·绿 */
--color-edict-secret: #C0392B;      /* 密奏·红 */

/* Auxiliary Accent Colors */
--color-accent-amber: #D4B87D;
--color-accent-bronze-green: #6B8E5A;
--color-accent-gold-warm: #B8945A;
--color-accent-cyan: #2E7BAA;

=== TYPOGRAPHY TOKENS ===
--font-display: 'STKaiti', 'KaiTi', '楷体', serif;
--font-body: '-apple-system', 'PingFang SC', sans-serif;
--font-mono: 'JetBrains Mono', monospace;

--text-xs: 12px;   --text-sm: 13px;
--text-base: 14px; --text-lg: 16px;
--text-xl: 24px;   --text-2xl: 32px;

=== SPACING TOKENS ===
--space-1: 4px; --space-2: 8px;   --space-3: 12px;
--space-4: 16px; --space-5: 24px; --space-6: 32px;

=== RADIUS TOKENS ===
--radius-sm: 6px; --radius-md: 8px;
--radius-lg: 12px; --radius-full: 9999px;

=== SHADOW TOKENS (Multi-layer for ancient material depth) ===
--shadow-card: 0 1px 2px rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.10), 0 0 20px rgba(201,169,110,0.08);
--shadow-panel: 0 2px 4px rgba(0,0,0,0.18), 0 8px 16px rgba(0,0,0,0.12), 0 0 60px rgba(201,169,110,0.03);
--shadow-button-hover: 0 0 0 1px rgba(201,169,110,0.2), 0 4px 12px rgba(201,169,110,0.25);
--shadow-seal-stamp: 0 0 0 4px rgba(192,57,43,0.2), 0 0 20px rgba(192,57,43,0.3);

=== ANIMATION TOKENS ===
--duration-instant: 100ms; --duration-fast: 200ms;
--duration-normal: 300ms; --duration-slow: 500ms; --duration-page: 800ms;
--ease-imperial: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* 玉玺落下弹跳 */

BEHAVIOR:
1. Organize all tokens into visual groups on the canvas: Colors / Typography / Spacing / Radius / Shadows / Animations
2. Render each color token as a labeled swatch (40×40px) with its variable name below in monospace
3. Render typography tokens as live text samples showing each size with its name
4. Apply the Xuan paper texture to the background of this token board
5. Use semantic naming convention: --{category}-{element}-{state}

CONSTRAINTS:
- Generate all elements using Auto Layout (horizontal/vertical) for responsive structure
- Apply colors exactly as specified above to establish the visual system baseline
- Use muted/warm gold tones throughout (antique gold leaf aesthetic)
- Use red accents that evoke cinnabar seal paste texture (朱砂印泥)
- Build all shadows with the multi-layer approach specified for material depth
- Set background as aged Xuan paper warmth (#1E180E base), avoiding pure black

OUTPUT FORMAT:
Generate as editable Figma vector layers organized in Auto Layout frames.
Output a visual "Design Token Board" — one labeled swatch/sample per token.
Do not output CSS code or JSON; render as visible design elements on canvas.

--- 复制截止 ---

【提交后人工处理】
1. 将所有色板封装为 Figma Variables（Mode: Default）
2. 创建 Color Styles（命名与 Token 一致）
3. 创建 Text Styles（display/body/mono × 6级字号）
4. 创建 Effect Styles（card/panel/button-hover/seal-stamp）
5. 全局替换后续生成物中的硬编码色值为 Variable 引用

【上下文锚点（后续会话用）】
保存以下摘要，在新对话中粘贴以重建上下文：
```
Token system active: bg=#1E180E系列, gold=#C9A96E, red=#C0392B, green=#00FF88,
text=#E8D5A3, radius(card/btn)=12px/8px, shadow=多层叠加, font-display=楷体系.
```
