# 99 · 动效与材质参考（非提交项 — 供人工后处理参考）

> 本文档不直接提交给 Figma AI。供设计师在「人工后处理」阶段实现 Smart Animate 或为前端开发记录 Production CSS 时参考。

---

## 动效实现分级

| 标记 | 含义 | 使用场景 |
|------|------|----------|
| **[Figma Smart Animate]** | 可在 Figma Prototype 中通过帧间过渡模拟 | 设计评审与交互演示 |
| **[Production CSS]** | 需在前端代码中实现 | 粘贴到组件 Description 供前端参考 |

> Figma Smart Animate 不支持：`stroke-dashoffset`、`clip-path` 动画、粒子效果、`background-position` shimmer

---

## 入场动画

### Seal Stamp Drop（玉玺钤印入场）[Production CSS]
```css
@keyframes seal-drop {
  0%   { transform: translateY(-80px) scale(0.5); opacity: 0; }
  60%  { transform: translateY(8px) scale(1.05); opacity: 1; }
  80%  { transform: translateY(-4px) scale(0.98); }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}
/* Duration: 800ms | cubic-bezier(0.68,-0.55,0.265,1.55) */
```

### Scroll Unfurl（卷轴展开）[Production CSS]
```css
@keyframes unfurl {
  0%   { clip-path: inset(0 100% 0 0); }
  100% { clip-path: inset(0 0 0 0); }
}
/* Duration: 500-800ms */
```

### Bamboo Reveal（竹简展开）[Figma Smart Animate 可模拟]
```css
@keyframes bamboo-slide {
  0%   { max-height: 0; opacity: 0; transform: translateY(-10px); }
  100% { max-height: 500px; opacity: 1; transform: translateY(0); }
}
/* Duration: 300ms | ease-out | Each strip staggers 50ms */
```

---

## 微交互

### Gold Touch（鎏金触控反馈）[Production CSS]
- 触发：Button/card hover/touch
- 效果：金色光晕从触点扩散（radial-gradient, 150ms）
- 缓动：ease-out

### Ink Spread（墨迹扩散）[Production CSS]
- 触发：Form input focus, seal stamp confirmation
- 效果：深色墨圈从中心扩散（scale 0.5→1.2→1.0, 300ms）

### Breathing Glow（呼吸光效）[Figma Smart Animate 可模拟]
- 触发：Active state, online status
- 效果：box-shadow 透明度 0.3↔0.7, 2-3s loop, ease-in-out

---

## 状态转换

### Approval Ripple（准奏波纹）[Production CSS]
- 触发：Task approved (准奏)
- 效果：绿色同心圆从按钮中心扩散（3环, 间隔100ms），勾号弹入
- 时长：600ms

### Rejection Shake（封驳震动）[Figma Smart Animate 可模拟]
- 触发：Task rejected (封驳)
- 效果：卡片水平抖动（translateX ±6px, 3次, 80ms/次），边框闪红2次，红X盖印
- 时长：400ms

### Stage Progress（阶次推进）[Production CSS]
- 触发：Edict 进入下一阶段
- 效果：连接线自绘（strokeDashoffset），下一节点缩放1.2→1.0弹性，金色粒子爆发（4-6点）
- 时长：500ms

---

## 加载状态

### Imperial Loading（御批加载）[Figma Smart Animate 可模拟]
- 视觉：旋转的金色玉玺轮廓（非通用 spinner）
- 时长：线性 1.5s 循环

### Skeleton Shimmer（骨架屏闪烁）[Production CSS]
```css
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
/* bg: linear-gradient(90deg, transparent, rgba(201,169,110,0.08), transparent) */
/* Duration: 1.5s loop */
```

---

## 材质纹理

### 宣纸（Xuan Paper）背景
```css
.bg-xuan-paper {
  background-color: #1E180E;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  background-blend-mode: soft-light;
}
/* Opacity: 2-4% (barely visible, felt not seen) */
```

### 印泥（Ink Paste）质感
- 方法：多层 inner shadow + noise
- 颜色：#C0392B 带轻微纹理变化，呈现湿润/厚重感
- 边缘：略微不规则（非完美圆形），模拟手工钤印
- 光晕：活动/新鲜印章带红色外发光

### 鎏金（Gold Leaf）质感
- 方法：线性渐变 + noise overlay
- 色域：#C9A96E → #D4B87D → #B8945A（暖金范围）
- 特殊："imperial"元素加超细斜线暗纹（2% opacity）

### 竹简（Bamboo Slip）质感
- 方法：重复水平线 + 垂直纤维纹
- 底色：#2A2218（略去饱和暖棕）
- 线条：每16px一条1px水平线（3%金色透明度）
- 用途：法典背景、技能详情展开区、古典引文区

### 绢（Silk）质感 — 圣旨卷轴
| 阶段 | 材质 | 色调 |
|------|------|------|
| 白麻（草稿） | 近白暖灰 | #3D3327 |
| 黄纸（提案） | 暖琥珀 | #3D3520 |
| 绯绫（审议） | 深绯红 | #3D2020 |
| 金泥（钤印） | 浓金 | #3D3018 |

---

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
