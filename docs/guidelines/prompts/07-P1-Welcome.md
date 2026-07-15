# 07 · P1 欢迎/启动页 WelcomePage（P2 页面级）

【角色定位】首页体验设计师（Onboarding & Landing Designer）— 专注产品首次印象与品牌视觉识别设计，精通入场动画编排、品牌仪式感营造、导航网格系统

【任务目标】设计 YYC³ Dynasty 的欢迎启动页，建立完整的古风科技视觉身份，提供 6 大功能模块的清晰入口，通过仪式感动画传递"奉天承运"的产品气质

【前置依赖】→ 全部组件（01-06）必须已完成

【输出目标】1 个完整 Page P1-Welcome + 6 个入口卡片 + Imperial Seal CTA 按钮 + 入场动画序列 + "下次不再显示"状态

【验收标准】
- **【AI 可达成】** ① 520×680px Modal 布局完整 ② 3×2 功能网格每卡片 200×120px ③ 6种入口色彩区分 ④ CTA 按钮居中280px ⑤ 整体古文化庄重感+科技轻盈感
- **【人工后处理】** ① 入场动画用 Smart Animate ② CTA 钤印动效记录在 Description ③ hover 微交互 ④ "下次不再显示"交互 ⑤ Mobile 适配单独生成

【优先级】**P2 — 页面级**（用户第一触点，决定产品首因效应）

---

--- 复制以下内容提交 ---

【上下文锚点】Token system: bg=#1E180E, gold=#C9A96E, red=#C0392B, text=#E8D5A3, radius=12px
Components ready: DynastyButton(seal variant) / DynastyCard / StatusBadge

TASK: Design Welcome/Startup page establishing product visual identity with clear navigation.

CONTEXT: 520×680px modal or fullscreen. First screen users see. Store dismissal state.
Visual identity: Ancient solemnity + technological elegance.

LAYOUT:
┌─────────────────────────────────────┐
│       [Imperial Seal Icon 56px]     │ ← Animated mount
│    YYC³ Dynasty (gold 24px)         │
│    三省以治 · 六部以行               │
│                                     │
│  ┌────────┐ ┌────────┐  3×2 grid   │
│  │朝堂听政│ │王朝典章│  200×120px   │
│  │ 👑金   │ │ 📜金   │  cards      │
│  └────────┘ └────────┘  6 entries  │
│  ┌────────┐ ┌────────┐             │
│  │勋绩考课│ │敕令流转│             │
│  └────────┘ └────────┘             │
│  ┌────────┐ ┌────────┐             │
│  │太史监候│ │宫阙规制│             │
│  └────────┘ └────────┘             │
│  ══════ Gold divider ══════        │
│  紫微城中枢 · 十二朝臣当值           │
│  [ 奉天承运 · 进入系统 ]            │ ← Imperial Seal button
│  ☐ 下次不再显示                     │
└─────────────────────────────────────┘

GRID CARD SPECS:
- bg: {iconColor} with 08 hex alpha overlay
- border: {iconColor} with 20 hex alpha
- radius: 12px, padding: 16px
- Card colors: 朝堂=Gold(#C9A96E), 王朝=Amber(#D4B87D), 勋章=BronzeGreen(#6B8E5A), 敕令=RedTint(#C0392B), 太史=Cyan(#2E7BAA), 宫阙=GoldWarm(#B8945A)
- Hover: translateY(-2px) scale(1.02), border intensifies, glow matching icon color

CTA BUTTON: Width 280px centered, h 48px, gold gradient bg, display font dark text, seal icon 16px

EMPTY STATE:
If all 6 modules have no data (fresh user): Show faded module cards with "尚未启用的朝堂领域" subtitle, CTA reads "开启你的王朝之旅"

OUTPUT FORMAT:
Generate as editable Figma frame (520×680px) with Auto Layout throughout.
Do not output CSS code; animations are for Description reference only.

--- 复制截止 ---

【提交后人工处理】
1. Replace card colors with Token variable references
2. Create entry animation with 4 Smart Animate frames:
   - Frame1 (0ms): Empty bg
   - Frame2 (200ms): Seal drops Y:-80→Y:0 with bounce, ripple on impact
   - Frame3 (400-800ms): Radial gradient reveal, title fades, cards stagger in (80ms each)
   - Frame4 (1200ms): Final state with CTA glow pulse
3. Add hover interactions on grid cards
4. Generate Mobile variant in separate prompt if needed:
   ```
   Mobile (<480px): Single column cards, full-width CTA, reduced animation, seal icon 40px
   ```

【Mobile 版追加提交】（如需要，在 Desktop 版生成后新建对话提交）：
```
TASK: Adapt the P1 Welcome page to mobile (375px width).
Single column layout, full-width CTA button, reduced entrance animation,
seal icon 40px, cards stack vertically with 12px gaps.
Reference the Desktop version already generated for visual consistency.
```
