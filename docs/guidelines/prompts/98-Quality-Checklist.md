# 98 · 质量检查清单（非提交项 — 供人工验收参考）

> 本文档不直接提交给 Figma AI。供设计师在「人工后处理」完成后逐项检查质量。

---

## 设计系统检查

### 色彩
- [ ] 所有颜色已封装为 Figma Variables
- [ ] 零硬编码 hex 值（全部使用 Variable 引用）
- [ ] 金色调为暖调 muted（#C9A96E 系列，非霓虹亮色）
- [ ] 红色系唤起朱砂印泥联想（#C0392B，非亮红）
- [ ] 背景为宣纸暖底（#1E180E），非纯黑

### 字体
- [ ] 严格遵循 4 级字号体系（12/14/16/24px + 特殊 32px）
- [ ] 显示字体使用楷体系（STKaiti/KaiTi）
- [ ] 正文字体使用系统无衬线（PingFang SC）
- [ ] 代码字体使用等宽（JetBrains Mono）

### 间距/圆角/阴影
- [ ] 间距遵循 4/8/12/16/24/32px 刻度
- [ ] 圆角使用 Token 变量（card=12px / btn=8px / badge=full）
- [ ] 阴影使用多层叠加（非单一 box-shadow）

---

## 组件检查

### Component + Variants
- [ ] 每个组件已封装为 Component Set
- [ ] Variants 属性命名规范（type/size/state 等）
- [ ] 所有状态变体完整覆盖（default/hover/active/disabled/loading）
- [ ] 嵌套深度合理（不超过 2 层）

### Auto Layout
- [ ] 所有内容使用 Auto Layout（非绝对定位）
- [ ] 内容变化时组件正确自适应
- [ ] 最小/最大尺寸已设置

### Prototype 交互
- [ ] hover/active 状态过渡已连线
- [ ] Smart Animate 时长正确（微交互≤200ms / 入场≤800ms）
- [ ] 所有动效尊重 prefers-reduced-motion

---

## 页面检查

### 布局
- [ ] 9 个页面全部完成
- [ ] 每页视觉层级清晰（一个视口一个主导元素）
- [ ] 留白使用得当（无信息过载）
- [ ] 最大宽度约束正确（P1: 520px / P2: 900px / P3: 1000px）

### 状态完整性
- [ ] 每个数据依赖区域都有 Loading 骨架屏
- [ ] 每个列表/网格都有 Empty State 设计
- [ ] 每个表单都有 Error State 设计

### 响应式
- [ ] Desktop 版本（1280px）已测试
- [ ] Mobile 版本（375px）已生成并测试
- [ ] 关键断点（480/768/1024px）表现正确

---

## 无障碍检查

### WCAG 2.1 AA
- [ ] 正文色彩对比度 ≥ 4.5:1
- [ ] 大文本（18px+）对比度 ≥ 3:1
- [ ] muted 文本（0.45 alpha）仅用于装饰性大文本
- [ ] 所有交互元素有可见 focus 指示器（2px gold outline + 2px offset）

### 键盘导航
- [ ] Tab 顺序遵循视觉流（从上到下，从左到右）
- [ ] Modal 内 focus trap 正常
- [ ] Escape 关闭 Modal
- [ ] 所有交互可通过键盘操作

### 屏幕阅读器
- [ ] 所有图标有 aria-label
- [ ] 状态变化有 aria-live 区域
- [ ] 表单错误有 aria-describedby 关联

### 色盲友好
- [ ] 颜色非唯一状态指示器（均搭配图标/形状/文本）
- [ ] StatusBadge 8 种状态有三通道区分（色彩+图标+形状）

---

## 一致性检查

- [ ] 同一组件用于同一目的（跨页面无替代品）
- [ ] 术语一致（朝堂语境用"敕令"非"任务"）
- [ ] 文化符号使用正确（参考 Dynasty.md 定义）
- [ ] 无混合隐喻（不将现代 UI 模式与古风主题随意组合）

---

## 动效检查

- [ ] 入场动画 ≤ 800ms
- [ ] 微交互 ≤ 200ms
- [ ] 所有动效尊重 prefers-reduced-motion
- [ ] 每个视口最多 1 个显著动画
- [ ] 动效缓动感觉"庄重/皇家"（非弹跳/轻浮）
- [ ] Production CSS 动画已记录在组件 Description
