# 08 · P2 朝堂大厅 CourtHall（P2 核心页面）

【角色定位】复杂仪表盘设计师（Complex Dashboard Designer）— 专注多层级信息架构与实时数据可视化，精通洛阳中轴线空间映射（6层垂直布局）、12 Agent 角色卡片体系、七阶流转进度条集成

【任务目标】设计 YYC³ Dynasty 的核心操作页面——朝堂大厅，以中轴线空间隐喻组织 6 层架构，整合 12 位 Agent 卡片 + 七阶步骤条 + 驾六仪表，形成 Mission Control 级别的全局态势感知界面

【前置依赖】→ 全部组件（01-06）必须已完成

【输出目标】1 个完整 Page P2-CourtHall + 6 个层级分区 + 12 张 Agent 卡片 + EdictStepBar 全宽步骤条 + 天子驾六 Mini Dashboard（240×160 BR 悬浮）

【验收标准】
- **【AI 可达成】** ① 全屏 max-w 900px，6层架构排列清晰 ② 天子卡片视觉焦点突出 ③ 七阶步骤条全宽可见 ④ 12位 Agent 卡片层级分明 ⑤ 背景含宣纸噪点+中轴虚线
- **【人工后处理】** ① 驾六仪表封装为组件 ② 步骤条引用 EdictStepBar 实例 ③ Agent 卡片引用 DynastyCard+AgentAvatar 组合 ④ Mobile 适配单独生成

【优先级】**P2 — 页面级（核心页面）**（用户停留时间最长的主工作区）

---

--- 复制以下内容提交 ---

【上下文锚点】Token system: bg=#1E180E/#2A2218, gold=#C9A96E, red=#C0392B, text=#E8D5A3, radius=12px
Components ready: DynastyCard / EdictStepBar / AgentAvatar(5 tiers) / DynastyButton / StatusBadge

TASK: Design Court Hall — central dashboard showing 12 Agents along Luoyang central axis with 7-stage workflow bar.

CONTEXT: Full-screen max-w 900px. Mission control view. Most time spent here.
Hierarchy: 决策层(天堂) → 承启层(明堂) → 三省(应天门三出阙) → 六部(天津桥) → 辅助层(端门) → 归档层(定鼎门)

LAYOUT STRUCTURE:
┌─────────────────────────────────────────┐
│ [玉玺56px]  朝堂  三省以治·六部以行     │
│                                         │
│ ▸ 决策层 — 天堂                         │
│ ┌──────────────────────────────────┐     │
│ │👑天子·天堂  最终决策·下旨发令     │     │ ← Full-width ImperialCard
│ │待御批:3  全局健康度:92%          │     │   Double gold border
│ └──────────────────────────────────┘     │
│                                         │
│ ▸ 承启层 — 明堂                         │
│ ┌────────────────────────────────────┐  │
│ │✨储君·明堂  消息分拣·旨意整理       │  │ ← RelayCard
│ │待分拣:12  监国状态:在线            │  │
│ └────────────────────────────────────┘  │
│                                         │
│ ▸ 三省 — 应天门(三出阙)                 │
│ ┌───────┐ ┌───────┐ ┌───────┐         │
│ │📜中书 │ │🔨门下 │ │🏛️尚书 │         │ ← 3-col, gate tower motif
│ │草拟:5 │ │审议:3 │ │派发:7 │         │
│ └───────┘ └───────┘ └───────┘         │
│                                         │
│ ▸ 六部 — 天津桥                         │
│ ┌────┐┌────┐┌────┐                    │
│ │💰户││📖礼││⚔️兵│                    │ ← 3×2 compact grid
│ │:2 ││:1 ││:4 │                    │   80px min height
│ ├────┤├────┤├────┤                    │
│ │🛡️刑││🔧工││👥吏│                    │
│ │:0 ││:3 ││:6 │                    │
│ └────┘└────┘└────┘                    │
│                                         │
│ ▸ 辅助层 — 端门  /  ▸ 归档层 — 定鼎门   │
│ [七阶流转示意条: 下旨→分拣→草拟→审议→派发→执行→回奏] │ ← EdictStepBar full width
│ [天子驾六微型仪表 240×160 floating BR]  │ ← 6 horse health dashboard
│ 12位朝臣 · 洛阳中轴线八节点              │
└─────────────────────────────────────────┘

SECTION RULES:
- Header "▸ 层级 — 地名", gold bullet U+25B8 40% opacity, dashed underline
AGENT CARDS:
- Emperor: full-width double border radial gold gradient center
- ThreeProvinces: 33% each gate motif
- SixMinistries: 33% compact icon+name+task count
MINI CHARIOT:
- Fixed BR 240×160, semi-transparent elevated bg
- 6 horse silhouettes 32px in 3×2 grid
- color=green/yellow/red/grey per status
BACKGROUND:
- Base #1E180E, vertical gradient lighter(top→darker bottom)
- faint central axis line 5% gold dashed
- 宣纸 noise 2-3%

OUTPUT FORMAT:
Generate as editable Figma frame (900px wide) with Auto Layout throughout.

--- 复制截止 ---

【提交后人工处理】
1. Replace Emperor/Relay/Province/Ministry cards with DynastyCard + AgentAvatar instances
2. Insert EdictStepBar component instance for the 7-stage bar
3. Create Mini Chariot Dashboard as separate Component (240×160)
4. Add real-time metric update interactions via Prototype
5. Generate Mobile variant:
   ```
   Mobile (<768px): Sections collapse to accordion, six-ministry grid → 2-col,
   chariot dashboard → bottom bar, step bar → vertical timeline
   ```

【Mobile 版追加提交】（如需要）：
```
TASK: Adapt P2 Court Hall to mobile (375px width).
Sections collapse to accordion, six-ministry grid 3×2→2×3,
chariot dashboard → bottom bar, step bar → vertical timeline.
Reference the Desktop version for visual consistency.
```
