# 11 · P5 旨意板 EdictBoard（P2 业务核心页）

【角色定位】任务流转设计师（Workflow & Task Board Designer）— 专注任务/工单/审批流的可视化管理，精通圣旨卡片设计、看板列布局、拖拽交互暗示、筛选/排序/搜索工具栏

【任务目标】设计任务流转核心页——旨意板，以古风"圣旨→分拣→草拟→审议→派发→执行→回奏"七阶流程为隐喻，呈现所有进行中/待处理/已完成的敕令任务

【前置依赖】→ 全部组件（01-06）必须已完成

【输出目标】1 个完整 Page P5-EdictBoard + 看板列视图 + 圣旨卡片列表 + 筛选/搜索工具栏 + 批量操作栏

【验收标准】
- **【AI 可达成】** ① 按七阶流程组织列表视图 ② 每张 EdictCard 显示类型+标题+优先级+阶段+负责人+截止时间 ③ 5种敕令类型色彩区分 ④ 内联 mini StepBar 显示进度 ⑤ 准奏/封驳/查看详情按钮醒目
- **【人工后处理】** ① 筛选/搜索工具栏交互 ② 分页器交互 ③ 封驳抖动动效用 Smart Animate ④ 密奏红色警告条交互 ⑤ 阶段详情侧滑面板

【优先级】**P2 — 页面级（业务核心页）**（日常任务管理主界面）

---

--- 复制以下内容提交 ---

【上下文锚点】Token system: bg=#1E180E, gold=#C9A96E, red=#C0392B, text=#E8D5A3
Components ready: EdictStepBar / StatusBadge / DynastyButton

TASK: Design Edict Board — core task management interface for tracking edicts through 7-stage approval.

CONTEXT: Route /edict P0. Primary work page.
5 edict types: 制书/敕书/敕牒/堂帖/密奏

LAYOUT:
┌───────────────────────────────────────────────┐
│ 旨意板                   [+ 新建敕令]        │
│ [全部][进行中][待我审][已通过][已驳回][已归档] │
│ 🔍搜索...                      [筛选▼]       │
│                                               │
│ ┌───────────────────────────────────────────┐ │
│ │📜制书:系统架构升级方案      [制书]purple   │ │  ← Left border by type
│ │P0 · Stage:审议中 ○↓↓↓                  │ │
│ │ [下旨✓]→[分拣✓]→[草拟✓]→[审议○]→[ ]→[ ]│ │  ← Inline mini StepBar
│ │                                           │ │
│ │ 创建者:天子 · 审议:门下(Danxin)          │ │
│ │ 截止:2026-06-15 18:00                     │ │
│ │                                           │ │
│ │      [准奏]  [封驳]  [查看详情→]          │ │
│ └───────────────────────────────────────────┘ │
│ ... more edict cards ...                     │
│ 显示 1-10/42条           [< 1 2 3 4 5 >]    │
└───────────────────────────────────────────────┘

EDICT TYPE COLORS (left border 4px):
- 制书 sys: #7B2FF7 (purple)
- 敕书 norm: #C9A96E (gold)
- 敕牒 fast: #00D4FF (cyan)
- 堂帖 dept: #00FF88 (green)
- 密奏 secret: #C0392B (red)

CARD HEADER: Type pill + Title + Priority badge(P0-P3)
INLINE STEP BAR: Mini 7-step showing current position
ACTION BUTTONS: 准奏(green primary) | 封驳(red seal) | 查看详情(ghost)

OUTPUT FORMAT:
Generate as editable Figma frame with Auto Layout throughout.
Show 3-4 sample edict cards with different types and stages.

--- 复制截止 ---

【提交后人工处理】
1. Create EdictCard Component with type/priority/stage properties
2. Insert mini EdictStepBar for inline progress
3. Add filter/search toolbar interactions
4. Add Smart Animate for 封驳 rejection: card shake ±6px, border flash red, red X stamp
5. Create stage detail slide-in panel (from right)
6. Note: 密奏(secret) edicts get red warning stripe overlay
7. Generate Mobile variant:
   ```
   Mobile (<768px): Cards stack full-width, inline step bar → vertical,
   filters → horizontal scroll
   ```
