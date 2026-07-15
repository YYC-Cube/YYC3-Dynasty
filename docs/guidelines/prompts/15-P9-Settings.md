# 15 · P9 宫阙规制 SystemSettings（P2 系统管理）

【角色定位】系统配置界面设计师（System Configuration Designer）— 专注管理后台与设置页面设计，精通 Tab 导航系统、表单控件样式定制、RBAC 权限矩阵可视化、危险操作区域设计、审计日志展示与即时保存交互

【任务目标】设计 YYC³ Dynasty 的系统管理页面，整合常规/外观/Agent管理/权限/日志/关于六大设置模块，实现 L0-L5 分级权限控制、即时生效的配置变更、危险操作二次确认、完整的操作审计追踪

【前置依赖】→ 全部组件（01-06）必须已完成

【输出目标】1 个完整 Page P9-SystemSettings + 6个 Tab 导航 + 表单控件集 + RBAC 权限矩阵 + 危险操作区 + 审计日志表 + 版本信息面板

【验收标准】
- **【AI 可达成】** ① 6 个 Tab 导航清晰分组、当前 Tab 高亮 ② 表单控件统一古风样式 ③ 危险操作区红色背景区分 ④ 各 Tab 内容区布局完整 ⑤ "保存更改"按钮可见
- **【人工后处理】** ① L0-L2 用户受限 Tab 子集逻辑 ② 变更即时生效+Ctrl+Z 撤销交互 ③ 危险操作二次确认弹窗 ④ 审计日志记录逻辑 ⑤ "保存更改"按钮仅变更时启用 ⑥ 移动端 Tab→底部导航适配

【优先级】**P2 — 页面级（系统管理）**（L4储君及以上权限可完整访问）

---

--- 复制以下内容提交 ---

【上下文锚点】Token system: bg=#1E180E, gold=#C9A96E, red=#C0392B, text=#E8D5A3
Components ready: DynastyButton-primary/seal / DynastyCard-form / StatusBadge-permission

TASK: Design System Settings (宫阙规制) — administration and configuration page.

CONTEXT: Route /settings. System management for admins (L4储君+).

LAYOUT:
┌─────────────────────────────────────────────┐
│ 宫阙规制                    [保存更改]      │
│ 系统配置 · 权限管理 · 参数调优              │
│                                             │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐│  ← Settings nav tabs
│ │常规│ │外观│ │Agent│ │权限│ │日志│ │关于││
│ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘│
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ 常规设置                                 │ │
│ │                                         │ │
│ │ 语言:  [简体中文 ▼]                     │ │
│ │ 主题:  (●) 古文化版  ( ) 现代化版       │ │
│ │ 动画:  [━━━━●━━━] 增强                  │ │
│ │ 通知:  ☑桌面通知  ☑声音  ☑邮件摘要    │ │
│ │ 自动保存: ☑ 开启 (间隔 5min ▼)          │ │
│ │                                         │ │
│ │ 危险操作区 (red-tinted background)       │ │
│ │ ════════════════════════════════════    │ │
│ │ ⚠️ 重置所有设置    [确认重置]           │ │
│ │ ⚠️ 清除所有数据    [确认清除]           │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘

TAB DEFINITIONS:
- 常规(General): Language, theme(古文化/现代化), animation intensity slider, notifications toggles, auto-save interval
- 外观(Appearance): Font size scale, card density(compact/comfortable/spacious), accent color picker, background texture toggle
- Agent管理: Agent list with online/offline status, role assignment dropdown, skill loadout preview, restart individual agent button
- 权限(Roles): RBAC matrix table (L0-L5 rows × feature columns), invite user form, API key management
- 日志(Logs): Filterable log table (time/type/user/action/result), export CSV, retention settings
- 关于(About): Version info, team credits, documentation links, license, check for updates

FORM COMPONENTS:
- Custom styled selects/dropdowns with gold borders
- Toggle switches with gold track
- Sliders with gold thumb
- Danger zone with red tinted background

OUTPUT FORMAT:
Generate as editable Figma frame with Auto Layout throughout.
Show the 常规(General) tab content as the default active tab.

--- 复制截止 ---

【提交后人工处理】
1. Create Tab navigation Component with active state highlighting
2. Style form controls (Select/Toggle/Slider/Checkbox) with gold accent theme
3. Create danger zone confirmation dialog:
   ```
   Two-step confirmation for destructive actions (重置/清除):
   Step 1: Click [确认重置] → Step 2: Modal "确定要重置所有设置？此操作不可撤销。" with [确认] [取消]
   ```
4. Add "保存更改" button enable logic (only when changes detected)
5. Add Ctrl+Z undo support
6. Generate other 5 tab contents in separate prompts if needed
7. Mobile adaptation: Tabs → bottom navigation, form fields full-width
