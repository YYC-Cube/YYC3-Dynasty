# 14 · P8 太史监候 MonitorDashboard（P2 全局监控）

【角色定位】数据可视化仪表盘设计师（Data Visualization Dashboard Designer）— 专注实时监控与系统可观测性界面设计，精通 KPI 卡片、漏斗分析图、热力图网格、事件时间线、实时数据动画与告警通知系统

【任务目标】设计 YYC³ Dynasty 的全局监控仪表盘，整合系统健康度、任务吞吐量、七阶漏斗分析、六部负载热力图、异常事件时间线五大核心视图

【前置依赖】→ 全部组件（01-06）必须已完成

【输出目标】1 个完整 Page P8-MonitorDashboard + 3个 KPI 指标卡片 + 七阶漏斗分析图 + 六部热力图 + 异常事件时间线 + 告警设置面板 + 导出功能

【验收标准】
- **【AI 可达成】** ① KPI 卡片含大号数字+标签+迷你 Sparkline+状态指示器 ② 漏斗图展示 7 阶段转化率对比 ③ 热力图 6 部门×时间段矩阵 ④ 事件时间线按严重程度着色、最新在上 ⑤ 数据新鲜度时间戳可见
- **【人工后处理】** ① 数字滚动动画用 Smart Animate ② 30s 自动刷新交互 ③ 异常 Toast 通知交互 ④ 导出报告功能 ⑤ 阈值设置交互 ⑥ 移动端简化适配

【优先级】**P2 — 页面级（全局监控）**（L4储君及以上权限可见）

---

--- 复制以下内容提交 ---

【上下文锚点】Token system: bg=#1E180E, gold=#C9A96E, green=#00FF88, red=#FF3366, amber=#FFDD00
Components ready: DynastyCard-metric / StatusBadge-severity / DynastyButton-export

TASK: Design Monitor Dashboard (太史监候) — global monitoring and analytics overview page.

CONTEXT: Route /monitor. System-level observability. Real-time metrics, health status, anomaly detection.

LAYOUT:
┌─────────────────────────────────────────────┐
│ 太史监候              [刷新 ↓] [告警设置⚙]  │
│ 全局运行态势 · 智能巡检                    │
│                                             │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│ │ 系统健康度│ │ 任务吞吐量│ │ 平均耗时  │     │  ← Key metric cards
│ │   92%    │ │  47/日   │ │  2.3h   │     │
│ │ ████░░░  │ │ ▓▓▓▓▓▓▓ │ │ 正常范围 │     │
│ └──────────┘ └──────────┘ └──────────┘     │
│                                             │
│ ┌───────────────────┐ ┌──────────────────┐ │
│ │ 七阶漏斗分析       │ │ 六部负载热力图    │ │
│ │ ▁▂▃▅▇█           │ │ 户礼兵刑工吏     │ │
│ │ 下100%分98%草85%  │ │ ██ ░ ███ █ ░ █  │ │
│ │ 审70%派55%执40%回30%│ │ 高负载=红        │ │
│ └───────────────────┘ └──────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ 异常事件时间线                            │ │
│ │ │ 🔴 刑部安全扫描异常  14:22  [处理→]  │ │
│ │ │ 🟡 吏部令牌即将逾期  13:50  [查看]   │ │
│ │ │ 🟢 工部部署成功      12:15  完成     │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ [导出报告]  [设置阈值]                      │
└─────────────────────────────────────────────┘

METRIC CARDS: Large number + label + sparkline mini chart + status indicator(green/yellow/red)
FUNNEL CHART: 7 stages horizontal bar showing drop-off rates, ideal vs actual comparison
HEATMAP GRID: 6 ministries × time periods, color intensity = load, tooltip shows values
EVENT TIMELINE: Vertical list, color-coded severity, newest top, expandable details

COLOR CODING: Healthy=green(#00FF88), Warning=amber(#FFDD00), Critical=red(#FF3366), Unknown=grey

EMPTY STATE: "暂无异常事件，六部运转正常" with sleeping dragon illustration (peaceful mood)

OUTPUT FORMAT:
Generate as editable Figma frame (full-width dashboard) with Auto Layout throughout.

--- 复制截止 ---

【提交后人工处理】
1. Create Metric Card Component with status(healthy/warning/critical) property
2. Add counter animation for numbers (Smart Animate roll up/down)
3. Note real-time refresh logic in Description:
   ```
   Numbers update with counter animation. Charts refresh every 30s.
   New events slide in from top with attention flash.
   Critical alerts trigger toast notification + Hub badge increment.
   ```
4. Add export interaction (PDF/PNG)
5. Add threshold configuration panel
6. Mobile adaptation: metric cards stack 1-col, heatmap → simplified list, charts → sparklines
