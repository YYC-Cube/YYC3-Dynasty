# 12 · P6 Hub 浮窗 Global Hub Overlay（P2 全局交互层）

【角色定位】全局交互层设计师（Global Overlay Designer）— 专注浮动命令中心设计，精通紧凑信息密度布局、通知列表、快速操作网格、唤出/收起弹性动画

【任务目标】设计全局浮窗 Hub 组件，作为始终可访问的命令中心，聚合通知、快速操作、最近对话、系统概览，从任意页面通过快捷键唤出

【前置依赖】→ 全部组件（01-06）必须已完成

【输出目标】1 个 Overlay 组件 P6-Hub + 快速操作网格 + 通知列表 + 全局搜索框 + 快捷设置区 + 唤出/收起动画

【验收标准】
- **【AI 可达成】** ① 浮层覆盖式布局，背景模糊 ② 桌面端 720×480 尺寸 ③ 内部功能模块分区清晰 ④ 关闭按钮可见 ⑤ 视觉层次与主页面统一
- **【人工后处理】** ① ⌘+K 快捷键唤出交互 ② 手势唤出交互 ③ 打开/关闭对称反转动画用 Smart Animate ④ 移动端全屏适配 ⑤ 内部模块折叠交互

【优先级】**P2 — 页面级（全局交互层）**（提升全产品操作效率的关键设施）

---

--- 复制以下内容提交 ---

【上下文锚点】Token system: bg=#1E180E, gold=#C9A96E, text=#E8D5A3
Components ready: DynastyCard / StatusBadge / AgentAvatar / DynastyButton

TASK: Design global floating Hub widget — always-accessible command center.

CONTEXT: Floating overlay, not a full page. Global entry point. Shows notifications + quick actions.

LAYOUT (collapsed, 48×48 circle button):
┌────┐
│ 📜 │  ← Gold gradient bg, subtle pulse when unread
└────┘

LAYOUT (expanded, 360×520 panel):
┌──────────────────────────────┐
│ 太子监国 · 旨意Hub    [−] [×]│
│                              │
│ 🔔 通知 (3)                  │  ← Notification list
│ │ ⚡ 新敕令待分拣  2min前   │
│ │ ✅ 户部任务已完成  15min前 │
│ │ ⚠️ 刀部异常预警  1h前     │
│                              │
│ ⚡ 快捷操作                   │
│ [+ 新建敕令]  [查看朝堂]     │
│                              │
│ 👤 最近对话                   │
│ │ 🐉 中书省 · 方案草拟中...  │
│ │ 🔨 门下省 · 空闲           │
│                              │
│ 📊 系统概览                   │
│ 运行中: 12  队列: 3  健康:92%│
└──────────────────────────────┘

COLLAPSED BUTTON: Fixed bottom-right 48px circle, gold gradient, unread=count badge
EXPANDED PANEL: Backdrop blur, slide-up from bottom-right, shadow-panel depth
NOTIFICATION ITEM: Icon + title + time ago + unread dot, hover highlight

OUTPUT FORMAT:
Generate both states (collapsed button + expanded panel) as separate labeled frames.
Generate as editable Figma layers with Auto Layout.

--- 复制截止 ---

【提交后人工处理】
1. Create Component with state(collapsed/expanded) property
2. Add Smart Animate for expand animation:
   ```
   Expand: scale(0.8→1) + translateY(20px→0) + opacity 0→1, 400ms ease-out
   Collapse: reverse, 200ms faster
   New notification: slide in from right with subtle bounce
   ```
3. Add ⌘+K keyboard shortcut interaction (via Figma Prototype or documentation)
4. Mobile adaptation: full-screen overlay instead of 360×520 panel
