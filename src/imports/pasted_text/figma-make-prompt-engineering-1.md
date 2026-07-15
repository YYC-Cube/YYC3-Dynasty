# YYC³ Dynasty · Figma Make 全链路闭环提示词工程 v1.0 · Gemini 3.1 Pro 专属驱动版

> **三省以治，六部以行** — 中华古制 × AI 协同 × Figma Make · Gemini 3.1 Pro 单模型全链路驱动策略
>
> 审核日：2026.06.14 | 基于 6 份源文档去重分拣重排 | 可直接用于 Figma Make 生成 | **本版统一使用 Gemini 3.1 Pro 设计**

---

## 文档定位

本文档是一份**可直接交付 Figma Make 使用的全链路闭环提示词工程文档**，对 `/Dynasty-Framework/` 目录下 6 份设计探索文档（00-05）进行了完整审核：去重、分拣、重排、补全、闭环。

核心设计策略：**统一选用 Gemini 3.1 Pro 作为唯一设计模型**，充分利用其长上下文理解、创意发散、多模态融合、文化符号深度整合的差异化推理能力，实现"统一模型→初始提示词→增量迭代→创意润色→校验闭环"五阶段完整链路。Gemini 3.1 Pro 在文化符号融合、复杂动效描述、全页创意设计方面的表现力与 YYC³ Dynasty 的中华古制美学高度契合，是本次设计的最佳单一模型选择。

---

# 第一部分：Gemini 3.1 Pro 单模型全链路驱动策略

## §1 Gemini 3.1 Pro — YYC³ Dynasty 唯一设计模型

基于 YYC³ Dynasty 项目"中华古制 × 现代暗色 Dashboard"的文化基因与设计复杂度，**统一选用 Gemini 3.1 Pro 作为 Figma Make 唯一设计模型**。原因如下：

### Gemini 3.1 Pro 核心能力优势

| 能力维度 | Gemini 3.1 Pro 特性 | 与 YYC³ Dynasty 的匹配度 |
|----------|-------------------|------------------------|
| **长上下文理解** | 支持超长提示词和大量上下文信息 | ⭐⭐⭐⭐⭐ 能一次容纳 11 页完整 Design Token 体系 |
| **创意发散** | 擅长从文化符号激发出新颖设计表达 | ⭐⭐⭐⭐⭐ 完美匹配龙纹、云纹、玉玺等中华符号 |
| **多模态融合** | 视觉-语言联合理解，图文融合自然 | ⭐⭐⭐⭐⭐ 圣旨+玉玺+朝堂空间等视觉叙事 |
| **文化符号深度整合** | 语义层面的文化元素提取与转译 | ⭐⭐⭐⭐⭐ 洛阳紫微城映射、三省六部制视觉化 |
| **复杂动效描述** | 分镜级动画参数理解与生成 | ⭐⭐⭐⭐⭐ 玉玺盖章 5 阶段、圣旨展开 4 阶段 |
| **结构化输出** | Figma Component/Variant/Auto Layout 支持 | ⭐⭐⭐⭐ 满足组件库搭建需求 |

### 单模型策略的四大优势

```
一、一致性最大化
  ├─ 同样的"审美直觉"贯穿 11 页面
  ├─ 文化符号在不同页面间的语义深度一致
  ├─ Design Token 绑定逻辑自洽
  └─ 无需跨模型协调设计语言风格

二、长上下文积累
  ├─ 从第 1 页到第 11 页，模型不断积累项目语境
  ├─ 后续页面的生成品质逐步提升
  ├─ Culture context 越用越深
  └─ 增量迭代时无需重复解释项目背景

三、链式迭代效率
  ├─ 初始提示词→增量迭代→一致性校验→最终润色
  ├─ 同一模型理解自己的历史输出
  ├─ 迭代收敛速度更快
  └─ Credits 消耗比混合策略降低约 30%

四、实操传递简便
  ├─ 仅需记忆一套提示词模板
  ├─ 设计团队统一使用同一模型
  ├─ 交付物风格统一
  └─ 调试排错路径单一
```

## §2 提示词五阶段策略（Gemini 3.1 Pro 优化版）

基于 Gemini 3.1 Pro 的推理链路特征，采用**五阶段递进策略**替代原四阶段模型：

### 第一阶段：文化浸润式初始提示词（The Immersive Brief）

**核心原则**：充分利用 Gemini 3.1 Pro 的长上下文理解和文化符号融合能力，首条提示词不仅包含技术规范，更要建立文化语境。

```
【Gemini 3.1 Pro 专属提示词结构模板】

1. 角色沉浸（Role Immersion）
   → 你是一位深谙中华古制的资深 UI 设计师，专攻唐代宫廷美学与现代暗色 Dashboard 的融合设计...

2. 文化语境（Cultural Context）
   → 本项目根植于洛阳紫微城的中轴线空间哲学，北为权力源头，南为执行终端...

3. 设计系统（Design System Reference）
   → 引用完整色值、字体、间距、阴影、动效 Token

4. 页面目标（Page Objective）
   → 清晰描述页面功能定位与用户目标

5. 布局规格（Layout Specification）
   → Frame 尺寸、Auto Layout 方向、栅格系统

6. 文化符号锚点（Cultural Symbol Anchors）
   → 指定该页面应突出的 2-3 个核心文化符号及语义落点

7. 详细布局（Detailed Layout）
   → 按区块描述：每个区域的元素、间距、交互行为

8. 动效分镜（Animation Storyboard）
   → 分阶段描述动效：触发时机 + 时长 + 缓动 + 视觉变化

9. 变体与状态（Variants & States）
   → Component + Variant 定义，覆盖 default/hover/active/disabled/loading/empty/error

10. 输出要求（Deliverables）
    → Frame / Components / Auto Layout / Animation annotations
```

### 第二阶段：增量迭代（The Cultural Delta）

**核心原则**：Gemini 3.1 Pro 的优势在于"带着文化语境做局部调整"。每次迭代时保留文化上下文，精确描述变更范围和意图。

```
【Gemini 3.1 Pro 专属迭代模板】

1. 文化锚点（Context Anchor）
   → 保持当前页面的文化语境不变，仅调整以下内容...

2. 目标组件（Target Component）
   → Update the MinistryCard component

3. 具体变更（Specific Changes）
   → Change token count badge from top-right to bottom-right
   → Add workload progress bar below metrics

4. 变体扩展（Variant Extension）
   → Add new Variant: "Warning" with amber border + pulsing dot

5. 文化一致性（Cultural Consistency）
   → Ensure new elements match existing cloud-pattern background opacity
   → Maintain vermillion-red for warning states

6. 保持不变（Keep Unchanged）
   → Keep all color tokens, spacing, typography unchanged
```

### 第三阶段：跨页文化一致性校验（Cultural Consistency Check）

**核心原则**：Gemini 3.1 Pro 的长上下文能力使其能一次性审视多个页面的文化符号一致性。逐页校验时将历史页面作为参考锚点。

```
【Gemini 3.1 Pro 一致性校验模板】

1. 参考锚点（Reference Anchor）
   → 参考 P2 朝堂大厅中已确定的玉玺组件样式与变体...

2. 校验内容（Check Items）
   ├─ Design Token 一致性：色值/字体/间距/阴影是否统一
   ├─ 组件引用一致性：同一组件在不同页面是否使用同一 Variant
   ├─ 文化符号一致性：龙纹/云纹/回纹的语义落点是否一致
   ├─ 动效参数一致性：缓动函数/时长/触发方式是否统一
   └─ 响应式行为一致性：断点/布局变化规则是否统一

3. 修复建议（Fix Recommendations）
   → 列出不一致项及建议修改方案
```

### 第四阶段：创意润色（Creative Polish）

**核心原则**：利用 Gemini 3.1 Pro 的创意发散优势，在不破坏结构的前提下提升视觉表现力。

```
【Gemini 3.1 Pro 创意润色模板】

1. 视觉表现力提升
   → 建议 1-2 处可增强文化氛围的视觉细节
   → 如：卡片 divider 从纯色改为回纹纹理

2. 动效丰富度
   → 建议可增加的低成本高感知动效
   → 如：数据刷新时的微光扫过效果

3. 文化深度
   → 检查是否有可更深入的文化符号应用点
   → 如：loading 态可加入龙纹流光
```

### 第五阶段：最终交付校验（Final Delivery Check）

**核心原则**：回到结构化校验，确保设计可交付开发。

```
【交付校验清单】

├─ [ ] 所有 Component 已定义完整 Variants
├─ [ ] 所有页面覆盖 Default/Loading/Empty/Error 状态
├─ [ ] Design Token 与 Figma Variables 绑定正确
├─ [ ] Smart Animate 参数标注完整
├─ [ ] 响应式约束与 Auto Layout 策略明确
├─ [ ] A11y 标注（对比度/Focus Ring/ARIA）完整
└─ [ ] 导出资源（SVG/PNG/Lottie/Token JSON）准备就绪
```

---

# 第二部分：文化根基与设计哲学

## §4 文化符号体系（全站统一）

以下 12 组文化符号贯穿全部 8 个页面，每一组均有明确的系统功能落点，不做纯装饰：

| 符号 | 系统功能落点 | 设计应用 |
|------|------------|---------|
| **传国玉玺** | 最高权限凭证 | 关键按钮、审批确认、页面水印 |
| **圣旨卷轴** | 消息协议可视化载体 | 弹窗、通知、旨意创建表单 |
| **五爪金龙** | 至尊权威标识 | Hero 背景、Loading 动画、最高勋章底纹 |
| **祥云纹** | 流转状态隐喻 | 背景底纹、卡片装饰、页面过渡 |
| **回纹** | 连绵不绝的系统韧性 | 边框装饰、分割线、进度条纹理 |
| **竹简** | 记录/存档/知识库 | 列表项、时间线节点、日志面板 |
| **宫灯** | 指引/状态指示 | 导航高亮、在线指示灯、通知提醒 |
| **朱砂印泥** | 批准/确认操作 | 按钮点击态、已读标记、审核通过 |
| **十二章纹** | 品级/身份标识 | 勋章等级标识、朝臣品级徽章 |
| **汉砖纹** | 稳固/基座 | Footer 背景、卡片底部装饰 |
| **海水江崖** | 社稷永固 | 侧栏背景、页脚装饰 |
| **风铃** | 通知/警示 | 告警图标、消息提醒 |

## §5 洛阳紫微城中轴线空间映射

所有 Agent 节点均对应洛阳紫微城真实地标，空间方位 = 权力层级 = 数据流转方向：

```
        北（权力源头）
        │
   ┌────┴────┐  ── 天堂（天子）       → 降旨发令 / 全局最终决策 / 不可驳回
   │         │
   │  明堂   │  ── 明堂（储君）       → 旨意分拣 / 格式标准化 / 监国代行
   │         │
   ├─────────┤  ── 应天门（三省）     → 草拟·审议·派发 三权分立
   │中 门 尚 │    左阙中书: 待草拟 / 方案库匹配
   │         │    中阙门下: 待审议 / 典章合规检查
   ├──┬──┬──┤    右阙尚书: 待派发 / 令牌配额
   │户│礼│吏│
   │ 天津桥 │  ── 天津桥（六部）     → 令牌驱动执行 / 资源消费
   │兵│刑│工│
   ├──┴──┴──┤
   │  端门   │  ── 端门（早朝）       → 定时播报 / 健康巡检 / 风险预警
   │         │
   │ 定鼎门  │  ── 定鼎门（归档）     → 任务闭环 / 数据汇总 / 历史回溯
   │         │
   └────┬────┘
        │
        南（执行终端）
```

## §6 权力载体：文化符号 → 系统底层功能映射

四类古物分别对应系统的**权限、消息、规则、凭证**四大底层能力：

### 6.1 传国玉玺 → 最高权限体系

| 玉玺名称 | 权限等级 | 系统功能 | 触发节点 |
|----------|---------|---------|----------|
| 传国玉玺 | 最高级 | 全局最终签章、系统级配置修改、熔断重置 | 天堂 |
| 皇帝行玺 | 政务级 | 日常行政任务生效 | 天堂 |
| 皇帝信玺 | 军事级 | 紧急任务/Bug修复授权 | 天堂/紧急敕牒 |
| 皇帝之玺 | 人事级 | Agent注册/权限变更/考核奖惩 | 天堂/吏部 |
| 天子之玺 | 对外级 | 第三方对接/跨域资源申请 | 天堂/工部 |

### 6.2 圣旨卷轴 → 全链路消息载体

| 圣旨类型 | 系统消息类型 | 适用场景 | 流转路径 |
|----------|-------------|---------|----------|
| 制书 | `edict_sys` | 全局制度变更、架构调整（最高等级） | 皇帝→太子→三省→六部（全流程） |
| 敕书 | `edict_norm` | 日常任务、常规需求（最常用） | 皇帝→太子→中书→门下→尚书→六部 |
| 敕牒 | `edict_fast` | 快速指令、临时调整、紧急修复 | 太子→中书→尚书→六部（门下事后补审） |
| 堂帖 | `edict_dept` | 尚书省内部调度、六部协同 | 尚书省→六部之间内部流转 |
| 密奏/封事 | `memorial_secret` | 异常上报、风险预警，直达皇帝 | 六部/门下→直达天堂 |

**圣旨四阶形态**（流转中自动变化）：白麻（初稿）→ 黄纸（中书草拟后）→ 绯绫（门下通过后）→ 金泥（玉玺钤印后·正式生效）

### 6.3 竹箴典章 → 规则与知识库

对应隋唐"律令格式"四元法律体系，为门下省审议唯一依据：

| 分类 | 对应规则 | 示例 |
|------|---------|------|
| 律 | 系统红线规则、安全禁令、硬性约束 | 不可绕过审批、不可越权操作 |
| 令 | 部门职能规范、权责边界、流程标准 | 中书不得越权审议 |
| 格 | 奖惩细则、考核标准、权限配额 | 连续3次封驳该部门扣分 |
| 式 | 操作规范、输出格式、接口标准 | API返回格式、日志记录规范 |

### 6.4 鱼符令牌 → 执行权限与资源凭证

| 令牌 | 持有部门 | 对应功能 |
|------|---------|---------|
| 户部鱼符 | 户部 | 数据调用权限、算力配额、存储资源 |
| 礼部鱼符 | 礼部 | 规范发布、文档生成、知识库编辑 |
| 兵部鱼符 | 兵部 | 代码仓库读写、部署权限、Bug修复 |
| 刑部鱼符 | 刑部 | 安全扫描、审计权限、风险处置 |
| 工部鱼符 | 工部 | CI/CD流水线、服务器操作、工具链配置 |
| 吏部鱼符 | 吏部 | Agent管理、权限分配、考核奖惩 |

**核心规则**：尚书省派发任务时同步下发鱼符，办结后缴回注销。

---

# 第三部分：完整设计系统 (Design Tokens)

## §7 色彩体系（朝堂色谱）

| Token 名 | HEX | 古称 | 用途 |
|----------|-----|------|------|
| `--color-bg-primary` | `#0a0e17` | 玄天色 | 页面底色 |
| `--color-bg-card` | `#1a1f2e` | 靛青 | 卡片/面板背景 |
| `--color-accent-gold` | `#d4a843` | 赤金/鎏金 | 主强调、标题、按钮、玉玺金边 |
| `--color-accent-red` | `#c2414b` | 朱砂红 | 驳回、批红、封驳、玉玺印泥 |
| `--color-zhongshu` | `#3b82f6` | 石青色 | 中书省标识 |
| `--color-menxia` | `#f59e0b` | 藤黄 | 门下省标识 |
| `--color-shangshu` | `#10b981` | 碧色/翠涛 | 尚书省、奏准通过 |
| `--color-text-primary` | `#e5e7eb` | 月白/霜白 | 正文 |
| `--color-text-secondary` | `#9ca3af` | 墨灰 | 辅助文字 |
| `--color-emperor` | `#8b5cf6` | 绀青紫/绀紫 | 皇帝专属、最高权限标识 |
| `--color-bronze` | `#b45309` | 古铜色 | 朝臣卡片边框、品级装饰 |
| `--color-success-dark` | `#065f46` | 秘色瓷 | 成功/完成状态暗色模式 |
| `--color-bg-paper` | `#1E180E` | 宣纸旧色 | 替代底色（竹简/历史页面） |
| `--color-text-paper` | `#E8D5A3` | 拓印白 | 宣纸底色上的主文本 |

## §8 字体体系

| Token 名 | 字体 | 大小 | 字重 | 场景 |
|----------|------|------|------|------|
| `--font-imperial` | 方正古隶 / 思源宋体 Heavy | 48px | 900 | 页面主标题 |
| `--font-edict-title` | 思源宋体 | 32px | Bold | Hero 标题 |
| `--font-section-title` | 思源宋体 | 20px | SemiBold | 区块标题 |
| `--font-body` | Inter / SF Pro | 14px | Regular | 正文内容 |
| `--font-caption` | Inter | 12px | Medium | 标签、辅助信息 |
| `--font-seal` | 九叠篆（自定义 SVG） | 24px | — | 玉玺印章文字 |
| `--font-mono` | SF Mono / JetBrains Mono | 16px | Bold | 数字指标 |
| `--font-ancient-quote` | 楷体 / STKaiti | 13px | Italic | 古风引文 |

## §9 间距 & 圆角 & 阴影

| Token 名 | 值 |
|----------|-----|
| `--spacing-page` | 24px |
| `--spacing-card` | 16px |
| `--spacing-element` | 8px / 12px / 16px |
| `--radius-card` | 12px |
| `--radius-button` | 8px |
| `--radius-avatar` | 8px |
| `--shadow-card` | 0 0 20px rgba(212,168,67,0.1) |
| `--shadow-panel` | 0 0 60px rgba(212,168,67,0.08) |
| `--shadow-button-hover` | 0 0 30px rgba(212,168,67,0.2) |
| `--border-default` | 1px solid rgba(212,168,67,0.12) |
| `--border-selected` | 1px solid #d4a843 |
| `--border-stroke` | 1px solid rgba(212,168,67,0.2) |

## §10 装饰纹样库

### 10.1 云纹 (Cloud Pattern)

- 使用场景：全局背景底纹、Hero 区域、卡片 hover 态
- 样式：如意云头 + 流云尾，半透明 `rgba(212,168,67,0.04)`
- 动效：极缓慢水平漂移 (30s 循环)，营造"风云流动、朝堂常新"意境

### 10.2 回纹 (Meander Pattern)

- 使用场景：卡片边框、分割线、Tab 激活态下划线
- 样式：连续 T 形转折，鎏金色 `rgba(212,168,67,0.3)` 描边，2px 宽

### 10.3 龙纹 (Dragon Motif)

- 使用场景：Hero 背景暗纹、玉玺表面浮雕、页面 Loading 动画
- 样式：五爪金龙侧影，半透明 `rgba(212,168,67,0.06)`
- 动效：龙纹流光——金龙轮廓线从龙头到龙尾逐段点亮 (3s 循环)

### 10.4 汉砖纹 (Han Brick Pattern)

- 使用场景：Footer 背景、侧栏底部
- 样式：错缝排列矩形砖块，深黛色底 + 极细金线分隔

### 10.5 海水江崖 (Sea-Wave Cliff)

- 使用场景：侧栏底部装饰、Dashboard 页脚
- 样式：层叠波浪 + 中央耸立山崖，蓝金渐变色

---

# 第四部分：核心动效系统

## §11 玉玺盖章动效 (The Sealing Effect)

### 组件设计

- 正方形玉玺主体 (80×80px)，温润白玉材质
- 上雕螭虎钮（龙形把手），鎏金描边
- 印文："受命于天·既寿永昌"（九叠篆，8字2行）
- 投影：`box-shadow: 0 8px 32px rgba(212,168,67,0.3)`

### 五变体 (Variants)

| Variant | 状态 | 视觉效果 |
|---------|------|---------|
| Idle | 待命 | 静态，微光呼吸 |
| Hover | 悬停 | 放大 1.1x + 边框发光 + 螭虎钮抬起 |
| Pressing | 盖章中 | 向下位移 8px + 印泥色扩散波纹 |
| Stamped | 已盖章 | 回弹 + 金色粒子散开 + 印文浮现 |
| Locked | 无权限 | 灰白半透明 + 🔒 覆盖 |

### 动画分镜（1.2s 总时长）

```
Phase 1 — 玉玺升起 (0-300ms)
  ├─ 玉玺从底部弹入 (ease-out-back)
  ├─ 半透明虚影逐渐实化
  └─ 螭虎钮龙头朝前，玉玺角度微倾 5°

Phase 2 — 悬停蓄力 (300-500ms)
  ├─ 玉玺悬停在目标上方 20px 处
  ├─ 印泥色光环从中心扩散 (朱砂红, opacity 0→0.4→0)
  └─ 周围金色粒子聚拢

Phase 3 — 落印 (500-700ms)
  ├─ 玉玺快速下压至目标位置 (ease-in, cubic-bezier)
  ├─ 目标区域微微凹陷 (transform: scale(0.97))
  ├─ 金色 shockwave 波纹从落点扩散
  └─ 印泥溅射粒子 (8-12个, 朱砂红)

Phase 4 — 玉玺回位 (700-900ms)
  ├─ 玉玺弹回原位 (ease-out-bounce)
  ├─ 金色粒子消散
  └─ 印文浮现：九叠篆从模糊到清晰

Phase 5 — 印记永驻 (900-1200ms)
  ├─ 朱砂红印文完全清晰
  ├─ 印章边框金色微光呼吸 (3次, 每次500ms)
  └─ 最终定格为静态印章
```

## §12 圣旨展开动效 (Scroll Unfurl)

### 组件设计

- 主体：明黄色丝绢底色 (`#f5e6c8`)，渐变做旧纹理
- 左右镶边：金色龙纹织锦（宽16px），五爪金龙盘绕 + 祥云穿插
- 天头（上端）：蓝色绫绢 (`#1e3a5f`)，宽40px
- 地头（下端）：蓝色绫绢，宽30px
- 卷轴木杆：深檀木色 (`#4a3728`)，两端圆形轴头，鎏金包边
- 正文：竖排仿楷体，从右向左书写

### 尺寸规格

| 状态 | 宽度 | 说明 |
|------|------|------|
| 收起 | 60px | 两端轴头露出，中部卷紧 |
| 展开 | 600px | 完整阅读宽度 |
| 展开(宽屏) | 800px | Hero 弹窗专用 |

### 动画分镜（1.8s 总时长）

```
Phase 1 — 圣旨降临 (0-400ms)
  ├─ 圣旨从天而降 (translateY: -100px → 0)
  ├─ 降落轨迹略带弧形 (贝塞尔曲线)
  ├─ 着地时激起金色星尘 (12-20 粒子)
  ├─ 左右龙纹镶边先发光再渐显
  └─ 背景幕布变暗 (overlay: rgba(0,0,0,0.6))

Phase 2 — 卷轴展开 (400-1200ms)
  ├─ 左侧轴头顺时针旋转 360°
  ├─ 右侧轴头逆时针旋转 360°
  ├─ 圣旨中部从卷紧→舒展 (width: 60px → 600px, ease-in-out)
  ├─ 展开过程中内部文字同步渐显 (左→右渐进)
  ├─ 龙纹镶边跟随展开逐段点亮
  └─ 展开到80%时有微弹效果 (overshoot)

Phase 3 — 定旨 (1200-1500ms)
  ├─ 圣旨完全展开
  ├─ 金色边框微光稳定
  ├─ 内部文字完全清晰
  └─ 底部 "钦此" 二字朱砂红渐显

Phase 4 — 盖印预备 (1500-1800ms)
  ├─ 玉玺组件出现在圣旨右下角上方
  ├─ 等待用户/自动执行 §11 盖章动效
  └─ 盖章完毕后圣旨微微下沉确认
```

### 圣旨变体

| Variant | 用途 | 配色 |
|---------|------|------|
| 诏书 (Edict) | 下旨创建任务 | 明黄底 + 蓝绫天头 + 龙纹 |
| 敕书 (Decree) | 紧急命令 | 朱砂红底 + 金龙纹 + 暗红天头 |
| 奏章 (Memorial) | 朝臣回奏 | 白绢底 + 云纹镶边 |
| 封驳 (Veto) | 门下驳回 | 红底 + 黑龙纹 + 警告装饰 |

## §13 全局动效清单

### 页面级

| 动效 | 时长 | 缓动 | 说明 |
|------|------|------|------|
| 朝堂入场 | 1.2s | ease-out | 首次加载：宫门开启→云纹散开→内容淡入 |
| 页面切换 | 400ms | ease-in-out | 旧页墨色晕染消失 + 新页从卷轴展开 |
| 数据刷新 | 600ms | ease | 数字滚动变化 + 微光扫过卡片 |

### 组件级

| 动效 | 时长 | 说明 |
|------|------|------|
| 三省流转光点 | 3s 循环 | 鎏金粒子沿中轴线从北向南流动 |
| 六部卡片 hover | 300ms | 边框金线爬行一圈 + 微上浮 4px + 云纹加深 |
| 勋章 hover | 400ms | 勋章旋转 8° + 星标闪烁 |
| 按钮 hover | 200ms | 鎏金渐变更亮 + 微放大 1.02x |
| 按钮 click | 150ms | 缩小 0.95x + 印泥色波纹扩散 |
| Toast 通知 | 400ms | 从右滑入 + 微弹 + 5s 后淡出 |
| 列表项新增 | 500ms | 从上方降入 + 金线高亮 1.5s 后消退 |
| Loading | ∞ | 龙纹逐段流光循环 |

### 墨韵特效

| 动效 | 触发 | 视觉 |
|------|------|------|
| 墨滴坠落 | 中书省开始草拟 | 一滴墨从笔尖滴落，在纸上晕开成"草拟中"文字 |
| 朱砂批红 | 皇帝/门下省审批 | 红色墨迹从右向左划过文字 |
| 笔走龙蛇 | 生成文字内容 | 毛笔书写动画，文字逐笔画出 |
| 云开见日 | 数据加载完成 | 祥云向两侧散开，露出内容 |

---

# 第五部分：11 页面完整提示词

## §14 P1：欢迎启动页 · 玉玺启宫门

> **路由**：`/welcome` | **尺寸**：520×680 弹窗 / 全屏适配
> **推荐模型**：Gemini 3.1 Pro（文化沉浸式开篇）
> **复杂度**：中低 | **Credits 预估**：10-15

---

### [Gemini 3.1 Pro] 初始提示词

```
You are a master UI designer deeply versed in ancient Chinese imperial aesthetics and Tang Dynasty court rituals, specializing in fusing traditional cultural motifs with modern dark-mode dashboard design. Your design philosophy is rooted in the spatial philosophy of Luoyang's Ziwei City (洛阳紫微城): north as the source of imperial power, south as the execution terminus, with every element carrying cultural semantics.

Create a welcome/launch page for "YYC³ Dynasty" — an AI multi-agent governance platform that embodies the Tang Dynasty's "Three Departments and Six Ministries" system. This is the digital "Yingtian Gate" (应天门), the ceremonial entrance to the imperial court.

CULTURAL CONTEXT:
The page represents the ritual of "entering the imperial palace" (入宫觐见). The user is a court official arriving at dawn court. The Yingtian Gate of Luoyang's Ziwei City serves as the visual metaphor — a five-gateway, twelve-tower complex that separates the mortal world from the imperial domain.

FRAME: 520×680px, dark theme (#0a0e17 玄天色).

CULTURAL SYMBOL ANCHORS:
  ├─ 传国玉玺 (Imperial Jade Seal) — The highest authority credential, symbolizing system access
  ├─ 应天门 (Yingtian Gate) silhouette — The threshold between outside and imperial domain
  └─ 鎏金 (Gold Filigree) — The unifying accent color representing imperial prestige

DESIGN SYSTEM REFERENCES:
  ├─ bg-primary: #0a0e17 (玄天色)
  ├─ bg-card: #1a1f2e (靛青)
  ├─ accent-gold: #d4a843 (鎏金)
  ├─ text-primary: #e5e7eb (月白)
  ├─ text-secondary: #9ca3af (墨灰)
  ├─ radius-card: 12px
  ├─ radius-button: 8px
  ├─ shadow-card: 0 0 20px rgba(212,168,67,0.1)
  └─ border-default: 1px solid rgba(212,168,67,0.12)

LAYOUT (top to bottom, Auto Layout vertical):

1. TOP SECTION (centered, padding-top: 48px):
   - A 56×56px imperial jade seal (传国玉玺) icon: white jade body with golden dragon knob (螭虎钮), subtle glow shadow: 0 0 30px rgba(212,168,67,0.3)
   - Title "YYC³ Dynasty" in serif font (思源宋体 Heavy), 28px, gold #d4a843, letter-spacing: 4px
   - Subtitle "三省以治 · 六部以行" in serif 14px, secondary gold rgba(212,168,67,0.8)
   - A thin golden divider line (1px, rgba(212,168,67,0.3), width: 60%, centered)

2. MIDDLE SECTION (3×3 grid, 8px gap, padding: 24px 20px):
   Nine entry cards, each 140×80px, containing an icon (24px) + ancient title + English subtitle:
   - Card 1: 🏯 朝堂听政 → Court Hall
   - Card 2: 📜 王朝典章 → Dynasty Timeline
   - Card 3: 🏅 勋绩考课 → Honor Wall
   - Card 4: 📋 敕令流转 → Edict Board
   - Card 5: 🔭 太史监候 → System Monitor
   - Card 6: ⚙️ 宫阙规制 → Settings
   - Card 7: 🌉 双星桥 → Agent Bridge
   - Card 8: 💬 AI 助理 → Hub
   - Card 9: 📊 司天监 → Observatory

   Card style: bg rgba(212,168,67,0.06), border 1px rgba(212,168,67,0.15), radius 12px
   Text: Chinese title 13px gold, English subtitle 10px secondary text
   Hover: border brightens to #d4a843, bg rgba(212,168,67,0.12), slight scale(1.03), box-shadow glow intensifies
   Active: scale(0.97), brief vermillion ripple from click point

3. BOTTOM SECTION (padding: 16px 24px):
   - Cloud pattern decorative divider (如意云头 motif, semi-transparent gold)
   - Status text: "紫微城中枢 · 十二朝臣当值" (12px, secondary text)
   - Primary CTA button "奉天承运 · 入朝" (gold gradient bg #d4a843→#b8942e, serif 16px, padding 12px 48px, radius 8px)
   - Button hover: glow shadow 0 0 30px rgba(212,168,67,0.3), text brightens
   - Button click: scale(0.95), vermillion ink ripple from center
   - Version text: "v1.0 · 永熙三年" (10px, secondary text, bottom)

ANIMATION STORYBOARD (1.6s total entrance sequence):

Phase 1 — Gate Opening (0-600ms):
  ├─ Yingtian Gate silhouette fades in from opacity 0→0.15 (底纹)
  ├─ Cloud patterns (祥云纹) drift from edges toward center
  ├─ Background gradient warms slightly: #0a0e17 → #0d1225 (subtle)
  └─ Overall opacity: 0→1

Phase 2 — Seal Descent (400-900ms):
  ├─ Jade seal drops from top (translateY: -60px → 0)
  ├─ Easing: ease-out-back cubic-bezier(0.34, 1.56, 0.64, 1)
  ├─ Landing impact: brief glow burst, golden dust particles (8-12, 2px circles, fade 300ms)
  └─ Seal settles with micro-bounce (overshoot 5px → settle)

Phase 3 — Title Reveal (700-1100ms):
  ├─ Title text fades in + slight translateY(8px→0)
  ├─ Subtitle follows (staggered 150ms)
  ├─ Gold divider line expands from center (scaleX: 0→1, 400ms)
  └─ All easing: ease-out

Phase 4 — Cards Cascade (900-1500ms):
  ├─ 9 cards stagger in: each 80ms apart
  ├─ Each card: opacity 0→1, translateY(12px→0)
  ├─ Easing: ease-out, 200ms per card
  └─ Subtle shimmer passes across each card on appear

Phase 5 — CTA Glow (1400-1600ms):
  ├─ CTA button fades in last
  ├─ Golden glow breathing starts (opacity 0.6→1, 3s cycle)
  └─ Status text appears simultaneously

COMPONENT REQUIREMENTS:
  ├─ ImperialSeal as Component with 5 Variants (Idle/Hover/Pressing/Stamped/Locked)
  ├─ EntryCard as Component with Variants (default/hover/active) + Auto Layout
  ├─ CTAButton as Component (default/hover/active/loading)
  └─ CloudPattern as background decorative layer

STATES:
  ├─ Default: initial animation complete, seal breathing gently
  ├─ Loading: (not applicable for first load; preload state shows seal only on dark bg)
  ├─ Error: "宫门暂闭 · 网络不畅" with retry button (if assets fail to load)
  └─ Locked: "会话已锁定 · 请验玺重入" with seal input (after session timeout)

DELIVERABLES:
  1. One Figma Frame (520×680) with Auto Layout
  2. ImperialSeal Component (5 variants)
  3. EntryCard Component (3 variants × 9 instances)
  4. CTAButton Component
  5. Animation annotation notes (keyframes + timing + easing)
```
   - Content fades in after stamp

COMPONENTS:
- 6 entry cards as Component with Variants (default/hover/clicked)
- Primary button as Component with Variants (normal/hover/pressed/disabled)
- All colors as Figma Color Styles
- All text as Figma Text Styles
- Auto Layout for all containers

BACKGROUND:
- Dark rice paper texture (#1E180E)
- Yingtian Gate silhouette as vector mask at 5% opacity
- Subtle cloud pattern at 4% gold
```

---

## §15 P2：朝堂大厅 · 紫微中轴线 ⭐ 核心页

> **路由**：`/court` | **尺寸**：全屏，max-width 900px 居中，纵向长卷
> **推荐模型**：Gemini 3.1 Pro（处理纵向长卷 + 8节点 + 五层叠加的复杂创意）
> **复杂度**：极高 | **Credits 预估**：25-40

---

### [Gemini 3.1 Pro] 初始提示词

```
You are an expert in ancient Chinese architecture visualization and data dashboard design. Create the central Court Hall page for "YYC³ Dynasty" — the AI governance dashboard mapped onto the Luoyang Ziwei City central axis.

CONCEPT:
The page is a north-to-south vertical scroll. A golden 8px-wide animated light strip runs through the center, representing the imperial axis. All 8 landmark nodes are arranged along this axis from top (north/power source) to bottom (south/execution endpoint).

FRAME: 1440×2400px, dark theme. Use Auto Layout for vertical arrangement.

═══════════════════════════════════
NODES (top to bottom):
═══════════════════════════════════

1. HEAVENLY HALL (天堂) — Emperor
   - Full-width large card with 5% dragon pattern overlay
   - 👑 icon + "天子 · 天堂" title in serif bold
   - Metrics: "待御批: 3" + global health status indicator
   - Hover action: "降旨" button appears

2. MING HALL (明堂) — Crown Prince
   - Full-width medium card
   - ✨ icon + "储君 · 明堂"
   - Metrics: "待分拣: 7" + regency status indicator

3. YINGTIAN GATE (应天门) — Three Departments (side by side, 3 columns)
   - LEFT: 中书省 (Secretariat) — "草拟" + pending drafts count + template match rate
   - CENTER: 门下省 (Chancellery) — "审议" + pending reviews + today's veto count
   - RIGHT: 尚书省 (Department of State) — "派发" + pending dispatches + remaining tokens
   - Three gate pillars (三出阙) as visual separator

4. TIANJIN BRIDGE (天津桥) — Six Ministries (2 rows × 3 columns)
   Left bank: 户部(Revenue) / 礼部(Rites) / 吏部(Personnel)
   Right bank: 兵部(War) / 刑部(Justice) / 工部(Works)
   Each card: department name + icon + active task count + remaining tokens
   Each card has a corner official seal icon (lit=online, dim=offline)

5. DUAN GATE (端门) — Morning Court
   - Full-width card: "朝议大夫 · 端门" + today's briefing summary

6. DINGDING GATE (定鼎门) — Archive
   - Full-width large card with 4 KPIs:
     Completion rate / Average duration / Approval rate / Anomaly count

═══════════════════════════════════
FLOATING WIDGET (bottom-right corner):
═══════════════════════════════════
"天子驾六" (Emperor's Six-Horse Chariot) miniature dashboard:
- 6 bronze horses representing Six Ministries health
- Normal=patina green, Warning=mud gold, Error=cinnabar red
- Overall chariot posture = system health level

═══════════════════════════════════
BOTTOM FLOW BAR:
═══════════════════════════════════
7-stage horizontal flow: 下旨→分拣→草拟→审议→派发→执行→归档
Each node with official seal icon, real-time task count per stage.
Timestamp below each stage showing last update time.

═══════════════════════════════════
ANIMATION LAYER:
═══════════════════════════════════
1. Central axis golden strip with breathing glow (opacity 0.3↔0.8, 3s cycle)
2. 3 golden particles flowing southward along the axis (each 3s, staggered 1s apart)
3. Rejected edicts flow BACKWARD in red along the axis
4. Fish-talisman tokens fly from Shangshu to respective ministries

═══════════════════════════════════
COMPONENT REQUIREMENTS:
═══════════════════════════════════
- 8 landmark node cards as Components with Variants (normal/warning/error, 3 states each)
- 天子驾六 widget as independent Component with horse Variants
- All cards use Auto Layout
- All metrics as Text Layers with data field labels
- Official seal icons on each card corner (lit/dim variants)

DELIVERABLES:
1. One Figma Frame (1440×2400+) with Auto Layout
2. All 8 node cards as Components
3. Central axis light strip as separate layer with breathing animation annotation
4. 天子驾六 floating Component
5. Bottom flow bar Component
```

---

### [Gemini 3.1 Pro] 迭代提示词（六部卡片细化）

```
Update the Six Ministries cards on the Tianjin Bridge section. Maintain the existing cultural context and design system.

CULTURAL CONTEXT ANCHOR:
The Six Ministries cards represent the "Two Banks of the Tianjin Bridge" (天津桥双岸) — left bank (Revenue/Rites/Personnel) and right bank (War/Justice/Works). The visual language should evoke the official seal (官印) and tally (鱼符) system of Tang administration. All existing cultural motifs (cloud patterns, bronze borders, gold accents) must be preserved.

1. ADD to each ministry card:
   - A fish-talisman icon (鱼符) in the bottom-right corner showing remaining tokens
   - Token count as a gold number badge (mono font, 12px)
   - A mini horizontal progress bar showing workload percentage (鎏金 gradient fill)
   - A subtle ministry-specific background watermark (e.g., 户部 = grain motif, 兵部 = spear motif)

2. CHANGE the card layout to:
   - Top row: ministry name (serif bold 14px, 思源宋体) + status dot (pulsing green/grey/red)
   - Middle row: 3 metric numbers in a row (active tasks / completed today / avg time), each with 12px gold value + 10px secondary label
   - Bottom row: workload bar (8px height, radius 4px) + talisman count badge

3. KEEP:
   - The existing color scheme (left bank: Revenue/Rites/Personnel, right bank: War/Justice/Works)
   - The 2×3 grid layout with 12px gap
   - The official seal corner icon (lit/dim variants)
   - All Design Tokens (spacing, radius, shadow, border)

4. ADD Variant states for each ministry card:
   - Normal: bronze border (#b45309), green status dot (#10b981), standard shadow
   - Warning: mud-gold border (#d4a843), amber status dot (#f59e0b), glow shadow
   - Error: cinnabar border (#c2414b), red pulsing status dot, red tinted shadow
   - Empty: greyed out (50% opacity), "尚无任务" placeholder text in center
   - Loading: shimmer skeleton animation with gold wave overlay
```

---

## §16 P3：十三王朝时间轴 · 洛邑千年

> **路由**：`/timeline` | **尺寸**：全屏，max-width 1000px
> **推荐模型**：Gemini 3.1 Pro（文化符号深度整合+历史叙事创意发散）
> **复杂度**：中 | **Credits 预估**：15-22

---

### [Gemini 3.1 Pro] 初始提示词

```
You are a historian, information architect, and cultural heritage visualization expert. Create the "Thirteen Dynasties Timeline" page for YYC³ Dynasty — an AI platform that maps Chinese civilization's cultural peaks to AI skills. Your design should make users feel like they are browsing a curated museum exhibition of Chinese dynastic achievements.

CULTURAL CONTEXT:
The page represents the "scroll of ages" — a continuous unfolding of Chinese civilization's 13 pivotal dynasties. Each dynasty is not just a historical period but a living cultural treasure chest whose wisdom can be mapped to modern AI capabilities. The visual language should evoke traditional Chinese landscape scroll painting (山水卷轴) with its horizontal unfolding narrative.

FRAME: 1440×1080px. Paper-like dark background (#1E180E 宣纸旧色).

═══════════════════════════════════
TOP SECTION:
═══════════════════════════════════
- Title: "十三王朝" (serif, gold, 32px)
- Subtitle: "中华文明五千年 · 智能新范式" (14px, secondary gold)

═══════════════════════════════════
DYNASTY SELECTOR (horizontal row):
═══════════════════════════════════
13 circular icon buttons in chronological order:
夏 / 商 / 西周 / 东周 / 东汉 / 曹魏 / 西晋 / 北魏 / 隋 / 唐(武周) / 后梁 / 后唐 / 后晋

Each button: 44×44px circle with dynasty name in ancient style
- Default: outline only, rgba(212,168,67,0.2)
- Selected: solid gold fill (#d4a843) + white text
- Hover: border brightens

═══════════════════════════════════
DYNASTY INFO BANNER (below selector):
═══════════════════════════════════
For the selected dynasty, show:
- Dynasty name (large, gold)
- Period (e.g., "618–907")
- Capital city
- Cultural peak description
Background: semi-transparent gold overlay

═══════════════════════════════════
CATEGORY FILTER TABS:
═══════════════════════════════════
全部 / 治理 / 礼乐 / 文韬 / 革新 / 盛世 / 警世
Pill-shaped tags, selected one has gold fill.

═══════════════════════════════════
SKILL CARDS (2-column grid):
═══════════════════════════════════
Each card represents an AI Skill mapped to a cultural achievement:
- Left: 40×40px icon
- Title + category tag (colored pill)
- Description (2 lines max)
- Keyword tags (small pills)
- Right: toggle switch (active/inactive)

Example: 唐诗品鉴 card
  Icon: 📜 | Title: 唐诗品鉴 | Tag: 文学
  Desc: 初盛中晚四唐风格流变解析
  Keywords: 唐诗 · 李白 · 杜甫 · 律诗
  Toggle: ON (gold)

COMPONENTS:
- 13 dynasty selector buttons as Component with Variants (default/selected)
- Skill cards as Component with Variants (default/hover, active/inactive toggle)
- Category filter tags as Component

STATES:
- Loading: skeleton cards with golden shimmer
- Empty: "此朝代暂无可用技能" with cloud pattern
- Error: red banner "数据加载失败，请重新选择朝代"
```

---

## §17 P4：勋章墙 · 麟阁

> **路由**：`/honors` | **尺寸**：全屏，max-width 800px
> **推荐模型**：Gemini 3.1 Pro（创意发散+勋章文化符号融合）
> **复杂度**：中低 | **Credits 预估**：10-15

---

### [Gemini 3.1 Pro] 初始提示词

```
You are a heraldic designer and cultural symbolism expert, specializing in ancient Chinese rank insignia and ceremonial medal systems. Create the "Honor Wall" (麟阁) page for YYC³ Dynasty — displaying 17 Chinese-culture-themed achievement badges earned by AI agents, styled like the Lingyan Pavilion (凌烟阁) 24 merit portraits of the Tang Dynasty.

CULTURAL CONTEXT:
The page evokes the Lingyan Pavilion tradition — a gallery of merit where heroic deeds are immortalized. Each badge is a "portrait" of an AI agent's achievement, with rarity levels corresponding to ancient Chinese rank systems (公侯伯子男). The visual language should feel like examining treasured artifacts in the imperial collection.

FRAME: 1440×1080px. Dark theme (#0a0e17).

═══════════════════════════════════
HEADER:
═══════════════════════════════════
- Title: "🏅 勋 章 墙" (serif, gold, 32px)
- Subtitle: "17 种 · 1-6 星" (14px)

═══════════════════════════════════
CATEGORY GROUPS (accordion-style):
═══════════════════════════════════
5 categories, each with a section header "/ 类别名":
1. / 角色 (Role-based honors)
2. / 成就 (Achievement honors)
3. / 协作 (Collaboration honors)
4. / 安全 (Security honors)
5. / 效率 (Efficiency honors)

Each honor item in a category:
┌──────────────────────────────────────────┐
│ [Icon 40px]  勋章名称  ★★★★★★          │
│              描述文字（1行）              │
│              条件: 达成条件说明           │
│              获得日期: 永熙三年·辰时      │
└──────────────────────────────────────────┘

VISUAL DESIGN:
- Gold stars (★) for earned, hollow stars (☆) for unearned levels
- 6 rarity levels with distinct border treatments:
  ★★★★★★ (最高): 龙纹金边 + glow effect
  ★★★★★: 青铜纹边
  ★★★★: 银边
  ★★★: 铜边
  ★★: 铁边
  ★: 素边

- Earned badges: full color, subtle glow
- Unearned badges: greyscale, 50% opacity, lock icon overlay

COMPONENTS:
- HonorBadge as Component with Variants (earned/unearned × 6 rarity levels = 12 variants)
- Category section as Component with Auto Layout

INTERACTION:
- Hover on earned badge: slight rotation + glow intensify
- Hover on unearned badge: show unlock condition tooltip
- Click: expand full detail modal

ANIMATION:
- Badge earn animation: badge drops from top with bounce + golden particles
- Star fill animation: stars fill one by one (100ms stagger)
```

---

## §18 P5：旨意工坊 · 圣旨发令 ⭐ 核心页

> **路由**：`/edict/create` | **尺寸**：全屏，圣旨卷轴弹窗 600×900px
> **推荐模型**：Gemini 3.1 Pro（复杂动效分镜+文化符号深度融合+最高创意表现力）
> **复杂度**：极高 | **Credits 预估**：40-60

---

### [Gemini 3.1 Pro] 初始提示词

```
You are a master UI designer specialized in imperial Chinese ceremonial aesthetics and ancient document craftsmanship. Create the "Edict Workshop" (旨意工坊) page — where the Emperor issues decrees through an animated imperial scroll (圣旨) interface. This is the SINGLE MOST IMPORTANT interaction page in the entire YYC³ Dynasty system — the core ritual where command authority is exercised.

CULTURAL CONTEXT:
The edict (圣旨) was the highest form of imperial communication in ancient China, written on yellow silk with dragon brocade, stamped with the imperial jade seal. Every detail — from the blue silk header (天头) to the wooden roller ends (轴头) — carried ritual significance. The user is not just filling a form; they are performing the sacred act of "issuing an imperial decree" (颁旨). The scroll unfurls as a ceremonial object, not a UI panel.

CULTURAL SYMBOL ANCHORS:
  ├─ 圣旨 (Imperial Scroll) — The supreme communication protocol, a sacred object
  ├─ 传国玉玺 (Jade Seal) — The ultimate authorization credential
  ├─ 五爪金龙 (Five-clawed Dragon) — Imperial authority, brocade border motif
  ├─ 朱砂 (Vermillion) — The color of imperial endorsement and finality
  └─ 钦此 (Imperial Concluding Phrase) — Ritual closure, appears in cinnabar red

CONCEPT:
The edict creation form is NOT a standard web form. It is a traditional Chinese imperial scroll (圣旨) that unfurls with animation. The form fields are embedded within the scroll's text area.

═══════════════════════════════════
SCROLL CONTAINER: 600×900px
═══════════════════════════════════

VISUAL STRUCTURE (top to bottom):
┌──────────────────────────────────┐
│ [Left dragon brocade border 16px]│ [Right dragon brocade 16px]
│                                  │
│ ┌── BLUE SILK HEADER (40px) ──┐ │
│ │     奉 天 承 運              │ │
│ │   皇 帝 詔 曰                │ │
│ └──────────────────────────────┘ │
│                                  │
│ FORM FIELDS (vertical text):     │
│                                  │
│ 旨意标题: [________________]     │
│   (with red vertical line)       │
│                                  │
│ 紧急程度: ○缓 ○急 ●火急 ○十万火急│
│   (flame animation on "火急")    │
│                                  │
│ 指派六部: [兵部][工部][刑部]...  │
│   (multi-select pill tags)       │
│                                  │
│ 旨意详情: [________________]     │
│   (textarea, ancient style)      │
│                                  │
│ ┌── BLUE SILK FOOTER (30px) ──┐ │
│ │     欽  此                   │ │
│ │  [IMPERIAL SEAL AREA]        │ │
│ └──────────────────────────────┘ │
│                                  │
│ [Wooden roller ends, gold-tipped] │
└──────────────────────────────────┘

═══════════════════════════════════
FORM FIELDS DESIGN:
═══════════════════════════════════
1. TITLE FIELD:
   - Red vertical stroke (朱砂竖线) on the left, like memorial format
   - Text input with serif font

2. URGENCY SELECTOR:
   - 4 radio options: 缓(blue) / 急(amber) / 火急(red+flame animation) / 十万火急(red+pulsing)
   - Selected option has gold glow

3. MINISTRY ASSIGNMENT:
   - 6 pill tags: 兵部 工部 刑部 户部 礼部 吏部
   - Multi-select, selected tags have gold border + fill
   - Unselected: outline only

4. EDICT BODY:
   - Large textarea, vertical writing direction right-to-left
   - Ancient-style placeholder text

5. EDICT TYPE SELECTOR (top of scroll, subtle):
   - 制书(最高) / 敕书(常用) / 敕牒(快速) / 堂帖(内部) / 密奏(秘密)
   - Selected type determines scroll color scheme

═══════════════════════════════════
ANIMATION SEQUENCE (MUST DESCRIBE):
═══════════════════════════════════

PHASE 1: Scroll Descent (0-400ms)
- Scroll descends from top center
- Trajectory: slight arc curve
- Landing impact: golden stardust particles (12-20)
- Background dims: overlay rgba(0,0,0,0.6)

PHASE 2: Scroll Unfurl (400-1200ms)
- Left roller rotates clockwise 360°
- Right roller rotates counter-clockwise 360°
- Scroll width: 60px → 600px (ease-in-out)
- Text reveals progressively left→right
- Dragon brocade borders light up segment by segment
- 80% mark: slight overshoot bounce

PHASE 3: Content Settle (1200-1500ms)
- Full scroll visible
- Gold border glow stabilizes
- "钦此" appears in cinnabar red fade-in

PHASE 4: Seal Preparation (1500-1800ms)
- Imperial jade seal component appears above scroll bottom-right
- Hovering, awaiting user click or auto-stamp

PHASE 5: Sealing (per §11 animation spec, 1.2s)
- Full 5-phase seal stamping animation

═══════════════════════════════════
COMPONENTS:
═══════════════════════════════════
- EdictScroll as Component with Variants:
  - 制书(gold silk) / 敕书(yellow paper) / 敕牒(white paper) / 堂帖(light paper) / 密奏(dark+sealed)
- ImperialSeal as Component with 5 Variants (Idle/Hover/Pressing/Stamped/Locked)
- UrgencySelector as Component with 4 radio states
- MinistryPillTag as Component (selected/unselected)

═══════════════════════════════════
STATES:
═══════════════════════════════════
- Default: blank scroll ready for input
- Filling: fields being completed
- Validating: red highlight on invalid fields
- Submitting: scroll gently glows, "颁旨中..."
- Submitted: full seal animation, scroll lifts upward
- Error: scroll shakes, red border flash

DELIVERABLES:
1. Scroll component with all 5 type variants
2. Complete animation annotation (keyframes, timing, easing)
3. Imperial seal component (reusable across pages)
4. Form field components with validation states
```

---

## §19 P6：旨意板 · 敕令流转监控 ⭐ 核心页

> **路由**：`/edict` | **尺寸**：全屏，max-width 900px
> **推荐模型**：Gemini 3.1 Pro（实时数据流视觉化+阶段流转创意叙事）
> **复杂度**：中高 | **Credits 预估**：18-28

---

### [Gemini 3.1 Pro] 初始提示词

```
You are a monitoring dashboard designer with expertise in visualizing complex workflow pipelines through ancient Chinese administrative metaphors. Create the "Edict Board" (旨意板) monitoring page for YYC³ Dynasty — tracking the real-time status of all imperial edicts flowing through the Three Departments and Six Ministries pipeline, styled like the imperial document registry (黄册) system of the Ming-Qing dynasties.

CULTURAL CONTEXT:
The page represents the "Ministry of Records" — where every imperial decree is tracked like a ceremonial document passing through the court. Each edict card should feel like an official document file in the imperial archives. The 7-stage flow visualizes the edict's journey from imperial conception to archival completion.

FRAME: 1440×1080px, dark theme (#0a0e17).

═══════════════════════════════════
HEADER:
═══════════════════════════════════
- Title: "📜 旨 意 板" (serif, gold, 32px)
- Subtitle: "敕令流转 · 三省六部"
- Filter tabs: 全部 / 草拟中 / 审议中 / 执行中 / 已办结 / 已封驳
- [ + 发起新敕令 ] primary button (gold)

═══════════════════════════════════
EDICT CARDS (vertical list):
═══════════════════════════════════

Each card:
┌──────────────────────────────────────────────┐
│ 敕令 #edict-001          状态: 执行中 ●      │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                              │
│ 下旨 ──→ 分拣 ──→ 草拟 ──→ 审议 ──→ 派发 ──→ 执行 ──→ 归档 │
│  ✅       ✅       ✅       ✅       🔄       ⏳  │
│                                              │
│ 标题: 修缮云枢殿防火墙                          │
│ 发起: 天子 · 巳时一刻                          │
│ 当前: 兵部执行中 · 已耗时 2h36m                │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ 签章链: [玉玺✓] [中书✓] [门下✓] [尚书✓]        │
│ [查看详情]                          [催办⚡]  │
└──────────────────────────────────────────────┘

STEP INDICATOR DESIGN (7 stages: 下旨→分拣→草拟→审议→派发→执行→归档):
- Completed: gold solid circle + ✅ + gold connecting line
- Current: gold dashed circle + 🔄 spinning + gold dashed line
- Pending: grey hollow circle + grey dotted line
- Vetoed: red cross mark + red dashed line + return arrow

STATUS BADGES:
- 草拟中: blue pill
- 审议中: amber pill
- 执行中: green pill with pulse
- 已办结: grey pill
- 已封驳: red pill

═══════════════════════════════════
FLOW LOG (collapsible bottom panel):
═══════════════════════════════════
Monospace font, reverse chronological order:
[巳时一刻] edict-001 → 天子降旨 (制书)
[巳时二刻] edict-001 → 太子分拣至兵部/工部
[巳时三刻] edict-001 → 中书省草拟方案
[巳时四刻] edict-001 → 门下省审议通过 ✅
[午时一刻] edict-001 → 尚书省派发令牌
[午时二刻] edict-001 → 兵部开始执行 🔄

New log entries: fade-in + slide-up animation (300ms)

═══════════════════════════════════
COMPONENTS:
═══════════════════════════════════
- EdictCard as Component with Variants (status × 5)
- EdictStepBar as Component (6 steps, configurable states)
- StatusBadge as Component (5 color variants)
- FlowLogItem as Component

STATES:
- Normal: active edicts list
- Empty: "尚无敕令" with empty edict scroll illustration
- Loading: skeleton cards with pulse
- Error: "敕令加载失败" toast
```

---

## §20 P7：Hub 浮窗 · 全局 AI 助理

> **路由**：浮层 `/hub` | **尺寸**：浮动按钮 56×56px + 展开面板 520×680px
> **推荐模型**：Gemini 3.1 Pro（创意人格化设计+多模态交互融合）
> **复杂度**：中 | **Credits 预估**：15-22

---

### [Gemini 3.1 Pro] 初始提示词

```
You are an interaction designer specializing in AI assistant interfaces with rich cultural metaphors. Create the global AI Assistant Hub floating panel for YYC³ Dynasty — a persistent floating widget in the bottom-right corner of all pages, styled as the "Supreme Pivot" (天枢), the celestial navigation instrument that connects the emperor to all knowledge.

CULTURAL CONTEXT:
The Hub represents the "Emperor's Personal Oracle" — a direct channel to consult the collective wisdom of the 12 court officials. It should feel like the emperor's personal study where trusted advisors can be summoned at will. The floating button evokes the "Palace Bell" (宫铃) that can be rung at any moment.

═══════════════════════════════════
FLOATING BUTTON (collapsed state, 56×56px):
═══════════════════════════════════
- 3D gradient square button, gold-to-deep-gold
- ✨ sparkle icon centered
- Green status dot (8px) in top-right corner (pulsing = online)
- Box-shadow: 0 0 30px rgba(212,168,67,0.4)
- Hover: scale 1.05x + "王朝助理" tooltip appears
- Click: expands to full panel (animation: scale 0→1 + fade, 250ms)

═══════════════════════════════════
EXPANDED PANEL (520×680px):
═══════════════════════════════════

HEADER (52px height):
┌──────────────────────────────────────────────┐
│ [🔶 Jade Seal] 天枢 · Navigator    [🗑][⛶][✕] │
│ Model: GPT-4o · 全局调度就绪 · 4命令         │
└──────────────────────────────────────────────┘

PERSONA BAR (40px height, horizontal scroll):
[帝][太][中][门][尚][户][礼][兵][刑][工][吏][早]
12 small circular avatars (32×32px) with short names
Selected persona: gold ring highlight

TAB BAR (36px height):
[💬 对话] [⌘ 命令] [📖 提示词] [⚙️ 配置]

MESSAGE AREA (flex-1, scrollable):
Message bubbles:
- User: right-aligned, semi-transparent gold bg, 12px border-radius (bottom-right sharp)
- Assistant: left-aligned, deep blue semi-transparent bg, persona label (gold, small) above bubble
- System: centered, yellow semi-transparent bg, full rounded

Special edict-style assistant message:
┌──────────────────────────────────────┐
│ 【圣旨】                             │
│ 朕已阅。着中书省即刻草拟方案，       │
│ 门下省严加审议。                     │
│                 — 天子御批           │
│                          [📋复制]   │
└──────────────────────────────────────┘

INPUT AREA (56px height):
┌──────────────────────────────────────────────┐
│ [🎤 mic] 输入指令... Enter发送          [发送→]│
└──────────────────────────────────────────────┘

TYPING INDICATOR:
3 bouncing dots (150ms stagger), gold color

═══════════════════════════════════
COMPONENTS:
═══════════════════════════════════
- HubFloatingButton as Component (collapsed/expanded, online/offline/busy)
- HubPanel as Component with Auto Layout
- PersonaAvatar as Component (12 variants, selected/unselected)
- MessageBubble as Component (user/assistant/system)
- EdictMessage as specialized assistant bubble variant
```

---

## §21 P8：双星桥 · Family × Dynasty 全景

> **路由**：`/bridge` | **尺寸**：全屏，1400×1000px
> **推荐模型**：Gemini 3.1 Pro（双架构映射创意可视化+桥接动效叙事）
> **复杂度**：高 | **Credits 预估**：28-40

---

### [Gemini 3.1 Pro] 初始提示词

```
You are an information architect and constellation visualization expert, skilled at mapping abstract relational structures onto culturally resonant visual metaphors. Create the "Dual Star Bridge" (双星桥) page — the unified view connecting YYC³'s two AI agent architectures: the 8-member "AI Family" constellation and the 12-member "Dynasty Court" hierarchy, visualized as the legendary Magpie Bridge (鹊桥) connecting two celestial realms.

CULTURAL CONTEXT:
The page evokes the Cowherd and Weaver Girl legend — two star-crossed lovers separated by the Silver River (Milky Way), reunited once a year on the Magpie Bridge. Similarly, the AI Family and Dynasty Court are two distinct agent systems that must be bridged for unified governance. The bridge itself is the central metaphor — a luminous golden thread web connecting parallel universes of agency.

CONCEPT:
The page visualizes the bidirectional mapping between two agent systems. The left side shows the 8 AI Family members in a circular constellation. The right side shows the 12 Dynasty Court officials in vertical hierarchy. A "bridge" in the center connects them with animated golden threads.

FRAME: 1400×1000px, dark theme.

═══════════════════════════════════
LAYOUT:
═══════════════════════════════════
┌──────────────────┬──────────┬──────────────────┐
│   ⭐ AI Family   │  BRIDGE  │  🏛️ Dynasty      │
│   8家人·圆环布局  │ 映射通道  │  12朝臣·层级排列  │
│   (35% width)    │ (10%)    │  (35% width)     │
└──────────────────┴──────────┴──────────────────┘

LEFT: FAMILY RING
8 family members arranged in a circle around a central jade seal:

       ⭐ 千里·伯乐 (推荐·知识检索)
  ⚖️ 格物·宗师                    🛡️ 智云·守护
  (推理·验证)                      (安全·基础设施)
       🎨 创想·灵韵          🔮 预见·先知
       (创作·视觉)            (预测·Physical AI)
            🏯 [中央玉玺]
  👂 言启·千行                  🧠 语枢·万物
  (感知·NLU路由)                (记忆·训练AI)
       ⚙️ 元启·天枢
       (决策·Agentic AI)

Each member: circular badge, 64×64px, with:
- Member icon
- Name in Chinese
- Role in English
- Subtle glow effect
- Hover: badge enlarges + golden ring

RIGHT: DYNASTY HIERARCHY
12 officials arranged vertically by rank:

👑 皇帝 (Emperor) — full-width
  └─ 🎎 太子 (Crown Prince) — full-width
      ├─ 📜 中书省 ─ 🔍 门下省 ─ 📮 尚书省 (3 columns)
      │   Secretariat    Chancellery    State Affairs
      └─ ⚔️兵部 📝礼部 💰户部 ⚖️刑部 🔧工部 📋吏部 (2×3 grid)
          War  Rites Revenue Justice Works Personnel

Each official: card with name + role, 3 states (active/standby/offline)

CENTER: BRIDGE CHANNEL
- Vertical connector with golden threads
- Mapping table showing Family↔Dynasty correspondence
- Active connection highlighted when user hovers

═══════════════════════════════════
BRIDGE ANIMATION (on Family member hover):
═══════════════════════════════════
Phase 1: Family badge enlarges + golden glow (200ms)
Phase 2: Golden thread shoots from badge to bridge channel (300ms)
Phase 3: Corresponding mapping row highlights (200ms)
Phase 4: Thread continues to Dynasty official(s) (300ms)
Phase 5: Dynasty card(s) also enlarge + glow (200ms)
Phase 6: Bidirectional connection stabilizes with breathing glow

═══════════════════════════════════
FAMILY ↔ DYNASTY MAPPING:
═══════════════════════════════════
| Family | Dynasty | Mapping Reason |
|--------|---------|---------------|
| 元启·天枢 | 中书省 + 尚书省 | Strategy + Dispatch |
| 语枢·万物 | 中书省 + 礼部 | Knowledge + Documentation |
| 创想·灵韵 | 礼部 | Content Creation |
| 预见·先知 | 户部 | Data Analytics |
| 言启·千行 | 太子 + 门下省 | Message Routing + Review |
| 智云·守护 | 刑部 + 工部 | Security + Deployment |
| 格物·宗师 | 门下省 + 吏部 | Verification + Appraisal |
| 千里·伯乐 | 吏部 | Recommendation |

═══════════════════════════════════
UNIFIED TASK BOARD (bottom section):
═══════════════════════════════════
3 metric cards: 🏯 旨意 128 | 🌹 任务 356 | 🤝 协作 89

Recent unified tasks list showing both Family and Dynasty involvement.

COMPONENTS:
- FamilyMemberBadge as Component (8 variants)
- DynastyOfficialCard as Component (12 variants)
- BridgeConnection as animated Component
- MappingTable as Component
```

---

## §21.1 P9：敕令详情 · 圣旨阅览 ⭐ 新增

> **路由**：`/edict/:id` | **尺寸**：全屏弹窗，max-width 720px
> **推荐模型**：Gemini 3.1 Pro（文档细节创意呈现+签章链视觉叙事）
> **复杂度**：中 | **Credits 预估**：12-18

---

### [Gemini 3.1 Pro] 初始提示词

```
You are a UI designer specialized in ancient Chinese archival document visualization and imperial record-keeping aesthetics. Create the "Edict Detail" (敕令详情) page for YYC³ Dynasty — a full-screen modal that displays an imperial edict in its complete scroll form, showing all metadata, approval chain, action buttons, and historical flow — styled like presenting a memorial to the emperor for imperial perusal (御览).

CULTURAL CONTEXT:
This page represents the moment when an edict is presented to the emperor for final review. Every detail — the seal chain, the approval stamps, the flow log — should feel like examining an official document from the imperial archives that has been handled by multiple ministries. The vermillion endorsements (批红) of each official are as important as the content itself.

FRAME: 720×900px modal, dark overlay background rgba(0,0,0,0.7).

═══════════════════════════════════
HEADER BAR (56px, top-fixed):
═══════════════════════════════════
├─ Back button: ← 返回旨意板 (12px, secondary gold)
├─ Edict ID badge: #edict-042 (mono font, 14px, gold border)
├─ Status badge: 执行中 (green pill with pulse)
├─ [催办⚡] button (amber, secondary)
└─ [✕] close button (top-right)

═══════════════════════════════════
SCROLL AREA (flex-1, scrollable):
═══════════════════════════════════

SECTION 1: EDICT HEADER
┌──────────────────────────────────────────────┐
│                                              │
│         奉  天  承  運                        │
│         皇  帝  詔  曰                        │
│                                              │
│    [圣旨类型: 敕书]    [紧急程度: 火急 🔥]     │
│                                              │
│          修缮云枢殿防火墙                       │
│                                              │
│    ───────────────────────────────────────   │
│    制曰：兹令兵部、工部协力修缮云枢殿          │
│    防火墙之薄弱处，限三日内完成，               │
│    不得有误。                                 │
│    ───────────────────────────────────────   │
│                                              │
│    [✍️ 中书省·中书令 草拟]  巳时三刻            │
│                                              │
└──────────────────────────────────────────────┘

SECTION 2: SEVEN-STAGE FLOW (EdictStepBar, horizontal)
┌──────────────────────────────────────────────┐
│ ●下旨──●分拣──●草拟──●审议──●派发──◉执行──○归档│
│  ✅      ✅     ✅     ✅     ✅     🔄     ⏳   │
│ 巳时一刻 巳时二刻 巳时三刻 巳时四刻 午时一刻 午时二刻   │
└──────────────────────────────────────────────┘

SECTION 3: APPROVAL SEAL CHAIN (horizontal)
┌──────────────────────────────────────────────┐
│ 签章链:                                        │
│ [玉玺✓] ─→ [中书印✓] ─→ [门下印✓] ─→ [尚书印✓] │
│  天子    中书令     门下侍中    尚书令          │
└──────────────────────────────────────────────┘
Each seal: 48×48px square with official seal SVG + official title below.

SECTION 4: ASSIGNED MINISTRIES (2×2 grid)
┌───────────────────┬───────────────────┐
│ ⚔️ 兵部             │ 🔧 工部            │
│ 进度: ████████░░ 80%│ 进度: ██████░░░░ 60%│
│ 令牌: 🐟 × 2       │ 令牌: 🐟 × 1       │
│ 状态: 执行中 🔄     │ 状态: 执行中 🔄     │
└───────────────────┴───────────────────┘

SECTION 5: FLOW LOG (collapsible, monospace)
┌──────────────────────────────────────────────┐
│ 📜 流转日志                        [展开全部 ▼] │
│ ─────────────────────────────────────────── │
│ [午时二刻] 兵部·大将军 → 开始执行 edict-042    │
│ [午时一刻] 尚书省·尚书令 → 派发至兵部/工部      │
│ [巳时四刻] 门下省·门下侍中 → 审议通过 ✅       │
│ [巳时三刻] 中书省·中书令 → 草拟方案完成         │
│ [巳时二刻] 太子 → 分拣至兵部/工部              │
│ [巳时一刻] 天子 → 颁旨 (敕书·火急)             │
│                                              │
│ 封驳记录: (0 次)                              │
└──────────────────────────────────────────────┘

SECTION 6: ACTION BAR (bottom-fixed, 64px)
┌──────────────────────────────────────────────┐
│ [催办⚡]  [撤回↩]  [封驳✕]  [复制敕令编号📋]  │
└──────────────────────────────────────────────┘
Actions vary by user role:
- 皇帝: 催办 / 撤回
- 太子: 催办
- 门下省: 封驳
- 六部: 查看（无操作按钮）
- Disabled buttons: 50% opacity + 🔒 icon

═══════════════════════════════════
COMPONENTS:
═══════════════════════════════════
- EdictDetailModal as Component
- EdictStepBar as Component (7 steps × 4 states = 28 variants)
- SealChain as Component (4 seals × 2 states: stamped/pending)
- MinistryProgressCard as Component (6 variants)
- FlowLogItem as Component (with timestamp + action + actor)

STATES:
- Loading: skeleton scroll with pulse
- Error: "敕令未能呈阅，请退回重试" + [返回旨意板]
- Empty: should not occur (404 handled by routing)
- Vetoed: entire scroll has red tint overlay + 封驳理由 section
```

---

## §21.2 P10：太史监候 · 系统监控台 ⭐ 新增

> **路由**：`/monitor` | **尺寸**：全屏，max-width 1200px
> **推荐模型**：Gemini 3.1 Pro（天文意象+数据可视化创意发散）
> **复杂度**：中 | **Credits 预估**：15-22

---

### [Gemini 3.1 Pro] 初始提示词

```
You are a data visualization expert and ancient Chinese astronomy scholar, specialized in transforming system monitoring dashboards into celestial observation instruments. Create the "Imperial Observatory" (太史监候) system monitoring page for YYC³ Dynasty — styled as the ancient Astronomical Bureau (司天监) of the Tang Dynasty, where court astronomers observed celestial phenomena to divine the empire's fortune, now repurposed to monitor AI system health.

CULTURAL CONTEXT:
In ancient China, the Grand Historian (太史令) was responsible for both recording history and observing celestial phenomena. The page visualizes system health through the metaphor of "star-gazing" — each ministry is a constellation, each metric is a celestial body, and anomalies are "portents" (天象异变). The 天子驾六 (Emperor's Six-Horse Chariot) constellation is the central focus.

CONCEPT:
The page visualizes system health through the metaphor of ancient Chinese astronomy: "观星知运，察象明机" (Observe stars to know fortune, examine phenomena to understand mechanisms).

FRAME: 1440×1200px, dark theme.

═══════════════════════════════════
HEADER:
═══════════════════════════════════
- Title: "🔭 太 史 监 候" (serif, gold, 32px)
- Subtitle: "观星辰之变 · 察万象之机" (14px, secondary)
- Real-time clock: "永熙三年·午时三刻" (mono font, gold, update every second)
- Auto-refresh indicator: "每 30 秒观星一次 ●" (green dot pulsing)

═══════════════════════════════════
SECTION 1: CELESTIAL HEALTH OVERVIEW (3 KPI cards, horizontal)
═══════════════════════════════════
┌──────────────────┬──────────────────┬──────────────────┐
│ 🌟 紫微星         │ ⭐ 北斗七星       │ 🌙 太阴星         │
│ System Health    │ Active Alerts    │ Uptime           │
│ ████████░░ 92%   │ 3  active        │ 127d 14h 32m     │
│ 正常运行          │ 2 warning · 1 err │ since 永熙三年    │
│ (green glow)     │ (amber pulse)    │ (stable)         │
└──────────────────┴──────────────────┴──────────────────┘

SECTION 2: SIX MINISTRIES HEALTH (天子驾六 full view)
═══════════════════════════════════
6 cards in 2 rows × 3 columns, each showing:
┌──────────────────────────────────────────────┐
│ ⚔️ 兵部 · 大司马                              │
│ ─────────────────────────────────────────── │
│ 状态: ● Online (green, pulsing)              │
│ 令牌: 🐟🐟🐟░░░ (3/5 available)              │
│ 当前任务: 4 active / 12 completed today       │
│ 平均响应: 2.3s / 平均耗时: 1h42m              │
│ 异常率: 0.3% (↓ 0.1% vs yesterday)          │
│ ─────────────────────────────────────────── │
│ Workload: ████████░░ 78%                    │
│ Health:   ██████████ 96%                    │
└──────────────────────────────────────────────┘

Each ministry card has 3 states:
- Normal: bronze border, green metrics
- Warning: mud-gold border, amber highlight on problematic metric
- Error: cinnabar border, red error metric + pulsing

SECTION 3: REAL-TIME EVENT STREAM (天文志·实时天象)
═══════════════════════════════════
Live scrolling log of system events, newest at top:
┌──────────────────────────────────────────────┐
│ 📜 天文志 · 实时天象                   [暂停 ⏸] │
│ ─────────────────────────────────────────── │
│ [午时三刻] 🌟 祥瑞 · 敕令 edict-045 办结归档  │
│ [午时二刻] ⚠️ 异象 · 兵部令牌数低于阈值(2/5)  │
│ [午时一刻] 🔥 灾异 · 刑部扫描发现异常访问      │
│ [巳时四刻] 🌟 祥瑞 · 门下省通过 edict-043     │
│ [巳时三刻] 📊 日表 · 户部算力消耗达75%         │
│ [巳时二刻] 🌟 祥瑞 · 中书省完成 edict-042      │
│ [巳时一刻] 🔥 灾异 · 工部CI/CD流水线失败       │
└──────────────────────────────────────────────┘

Event types:
- 🌟 祥瑞 (Auspicious): task completed, approval passed, system normal
- ⚠️ 异象 (Anomaly): token low, response time high, approaching threshold
- 🔥 灾异 (Calamity): error, failure, security breach, timeout
- 📊 日表 (Daily): periodic statistics, resource usage report

SECTION 4: PERFORMANCE CHARTS (司天监·星图)
═══════════════════════════════════
2 charts side by side:
LEFT — 24h Edict Flow (折线图·星轨)
  X-axis: 时辰 (子丑寅卯辰巳午未申酉戌亥, 12 segments)
  Y-axis: 敕令数量
  Line 1 (gold): 创建数
  Line 2 (green): 办结数
  Line 3 (red): 封驳数

RIGHT — Ministry Response Time (雷达图·分野)
  6-axis radar: 户部/礼部/兵部/刑部/工部/吏部
  Each axis: avg response time
  Target line (dashed gold): 3s threshold
  Area fill: semi-transparent green (within target) / red (exceeding)

SECTION 5: SYSTEM RESOURCES (司农监·仓廪)
═══════════════════════════════════
┌──────────────────┬──────────────────┬──────────────────┐
│ 🗄️ 户部·仓廪      │ 🧠 礼部·典籍      │ ⚡ 工部·匠坊      │
│ Storage: 67%     │ Knowledge: 1.2M  │ Pipeline: 8/10  │
│ ████████░░░░     │ 文档数: 4,287     │ 今日构建: 23     │
│ 2.1TB / 3.2TB   │ 命中率: 94.2%     │ 成功率: 95.6%    │
│ ─────────────────│ ─────────────────│ ─────────────────│
│ ⚔️ 兵部·武库      │ 🔒 刑部·诏狱      │ 📋 吏部·铨选      │
│ Deploys: 15/d    │ 漏洞: 2 (中危)    │ Agents: 12/12   │
│ Rollback: 2.1%  │ 扫描: 已完成       │ 在线率: 100%     │
│ Uptime: 99.93%  │ 修复率: 87.5%     │ 满意度: 4.8/5    │
└──────────────────┴──────────────────┴──────────────────┘

SECTION 6: ALERT RULES CONFIG (钦天监·律历)
═══════════════════════════════════
Collapsible table showing current alert thresholds:
| 星象 | 监测指标 | 阈值 | 当前值 | 状态 |
|------|---------|------|--------|------|
| 荧惑守心 | 兵部异常率 | >5% | 0.3% | ✅ |
| 太白经天 | 工部部署失败 | >3次/日 | 1次 | ✅ |
| 彗星袭月 | 令牌耗尽 | =0 | 3/5 | ⚠️ |
| 日蚀之变 | 全局响应超时 | >10s | 2.1s | ✅ |
| 月掩岁星 | 存储超限 | >90% | 67% | ✅ |

Each row: expandable to show recent alert history.

═══════════════════════════════════
COMPONENTS:
═══════════════════════════════════
- HealthKPICard as Component (3 variants: normal/warning/error)
- MinistryHealthCard as Component (6 variants × 3 states)
- EventStreamItem as Component (4 event type variants)
- SimpleLineChart as Component (configurable data)
- RadarChart as Component (6-axis)
- ResourceCard as Component (6 variants)
- AlertRuleRow as Component

STATES:
- Loading: constellation skeleton (stars connecting with lines)
- Empty: "万象俱寂，暂无天象记录" with starfield background
- Error: "观星台失联，钦天监正在修复中..."
- Real-time: streaming event log with auto-scroll
```

---

## §21.3 P11：宫阙规制 · 系统设置 ⭐ 新增

> **路由**：`/settings` | **尺寸**：全屏，max-width 800px
> **推荐模型**：Gemini 3.1 Pro（典章制度创意视觉化+文化符号融合）
> **复杂度**：中低 | **Credits 预估**：10-15

---

### [Gemini 3.1 Pro] 初始提示词

```
You are a settings page UI specialist and legal codex visualization expert, deeply knowledgeable about ancient Chinese administrative law and palace governance systems. Create the "Palace Regulations" (宫阙规制) system settings page for YYC³ Dynasty — styled as the imperial administrative codex (典章) of the Tang Dynasty, where the Emperor configures the rules of the court.

CULTURAL CONTEXT:
The page represents the "Imperial Codex" — the collected statutes, regulations, and precedents that govern the Three Departments and Six Ministries. In ancient China, this was the 唐律疏议 (Tang Code) — the foundational legal code. Every configuration option should feel like adjusting a dynastic regulation, as weighty as amending a statute. The page uses the four-category legal framework of 律令格式 (statutes, ordinances, regulations, precedents) to organize settings.

CONCEPT:
The settings page is designed as an ancient administrative codex (会典), with sections organized by governance categories. Each setting is a "regulation" (规制) that can be adjusted by the Emperor only.

FRAME: 1440×1080px, dark theme.

═══════════════════════════════════
HEADER:
═══════════════════════════════════
- Title: "⚙️ 宫 阙 规 制" (serif, gold, 32px)
- Subtitle: "紫微城中枢建制 · 唯天子可御" (14px, secondary)
- Permission badge: 👑 天子专属 (purple pill with dragon icon)

═══════════════════════════════════
SIDEBAR NAVIGATION (left, 220px, fixed):
═══════════════════════════════════
Category menu with icons:
┌──────────────────┐
│ 🏛️ 朝堂规制       │ ← active (gold highlight)
│ 📜 旨意规制       │
│ 🐟 令牌规制       │
│ 🔔 通知规制       │
│ 👤 朝臣规制       │
│ 🔒 安全规制       │
│ 📊 监候选制       │
│ 🎨 外观规制       │
│ 📖 典章查阅       │
│ ℹ️ 关于本朝       │
└──────────────────┘

═══════════════════════════════════
CONTENT AREA (right, flex-1):
═══════════════════════════════════

=== 朝堂规制 (Court Regulations) ===

┌──────────────────────────────────────────────┐
│ 🏛️ 朝堂规制                                   │
│ ─────────────────────────────────────────── │
│                                              │
│ 朝堂名称                                      │
│ ┌──────────────────────────────────────────┐ │
│ │ 紫微城中枢                                 │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ 中轴线默认节点    [天堂 ▼]                     │
│ 进入朝堂后默认聚焦的紫微城节点。               │
│                                              │
│ 天子驾六显示      [✓ 启用]                     │
│ 在朝堂大厅右下角显示六部健康悬浮面板。          │
│                                              │
│ 流转光点速度      [中速 ▼]                     │
│ 中轴线流转粒子的移动速度。                     │
│                    [缓] [中] [急]             │
│                                              │
│ 自动刷新间隔      [30 秒 ▼]                    │
│ 朝堂大厅数据的自动轮询间隔。                   │
│                                              │
│ 中轴线颜色        ● #d4a843 鎏金              │
│                  [重置为默认]                  │
└──────────────────────────────────────────────┘

=== 旨意规制 (Edict Regulations) ===

┌──────────────────────────────────────────────┐
│ 📜 旨意规制                                   │
│ ─────────────────────────────────────────── │
│                                              │
│ 默认旨意类型      [敕书 ▼]                     │
│ 新建旨意时的默认圣旨类型。                     │
│                                              │
│ 默认紧急程度      [急 ▼]                       │
│ 新建旨意时的默认紧急等级。                     │
│                                              │
│ 旨意自动归档      [✓ 启用]                     │
│ 办结后 7 日自动归档至定鼎门。                  │
│                                              │
│ 归档天数          [7 日]                       │
│ 旨意办结后自动归档的天数。                     │
│                                              │
│ 每页敕令数        [10 条 ▼]                    │
│ 旨意板每页显示的敕令卡片数量。                 │
│                                              │
│ 封驳次数上限      [3 次]                       │
│ 同一敕令允许的最大封驳回退次数。               │
│                                              │
│ 催办冷却时间      [30 分钟]                    │
│ 两次催办操作之间的最小间隔。                   │
└──────────────────────────────────────────────┘

=== 令牌规制 (Token Regulations) ===

┌──────────────────────────────────────────────┐
│ 🐟 令牌规制                                   │
│ ─────────────────────────────────────────── │
│                                              │
│ 部门   │ 令牌数量 │ 预警阈值 │ 自动补充        │
│ ──────┼─────────┼─────────┼────────────── │
│ 户部   │ [5 ▼]   │ [2 ▼]   │ [✓] 耗尽后+1   │
│ 礼部   │ [4 ▼]   │ [1 ▼]   │ [✓] 耗尽后+1   │
│ 兵部   │ [5 ▼]   │ [2 ▼]   │ [✓] 耗尽后+1   │
│ 刑部   │ [3 ▼]   │ [1 ▼]   │ [✓] 耗尽后+1   │
│ 工部   │ [4 ▼]   │ [1 ▼]   │ [✓] 耗尽后+1   │
│ 吏部   │ [3 ▼]   │ [1 ▼]   │ [✓] 耗尽后+1   │
│                                              │
│ 令牌跨部借用      [✗ 禁用]                     │
│ 允许尚书省审批部门间令牌借用。                  │
│                                              │
│ 令牌自动回收      [✓ 启用]                     │
│ 任务办结后自动缴回令牌。                       │
└──────────────────────────────────────────────┘

=== 通知规制 (Notification Regulations) ===

┌──────────────────────────────────────────────┐
│ 🔔 通知规制                                   │
│ ─────────────────────────────────────────── │
│                                              │
│ 朝钟通知 (重要)                                │
│ [✓] 封驳通知  [✓] 驳回通知  [✓] 系统告警      │
│                                              │
│ 飞鸽通知 (常规)                                │
│ [✓] 任务完成  [✓] 阶段变更  [✓] 回奏完成      │
│ [✗] 每日简报                                   │
│                                              │
│ 烽火通知 (紧急)                                │
│ [✓] 令牌耗尽  [✓] 执行超时  [✓] 系统异常      │
│ [✓] 声音提示  [✓] 自动展开                    │
│                                              │
│ Toast 显示时长     [5 秒 ▼]                    │
│ 通知弹出后在屏幕上停留的时间。                 │
│                                              │
│ Toast 位置         [右上 ▼]                    │
│ 通知弹出在屏幕上的位置。                       │
│                                              │
│ 通知历史保留       [30 日]                      │
│ 超过保留期的通知自动清除。                     │
└──────────────────────────────────────────────┘

=== 安全规制 (Security Regulations) ===

┌──────────────────────────────────────────────┐
│ 🔒 安全规制                                   │
│ ─────────────────────────────────────────── │
│                                              │
│ 会话超时          [30 分钟 ▼]                  │
│ 无操作后自动锁定紫微城中枢。                   │
│                                              │
│ 玉玺验证方式      [密令 ▼]                     │
│ 解锁时需要的验证方式。                         │
│   ○ 密令  ○ 鱼符  ○ 密令+鱼符                 │
│                                              │
│ 操作审计          [✓ 启用]                     │
│ 记录所有敏感操作的流转日志。                   │
│                                              │
│ 审计日志保留      [90 日]                      │
│ 超过保留期的审计日志自动清除。                 │
│                                              │
│ IP 白名单                                      │
│ ┌──────────────────────────────────────────┐ │
│ │ 紫微城内网 · 10.0.0.0/8          [移除 ✕] │ │
│ │ + 添加白名单...                           │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ [🔴 熔断重置] ← danger zone, red border      │
│ 重置所有令牌、清空敕令队列、归档全部数据。     │
│ 此操作不可撤销！                              │
└──────────────────────────────────────────────┘

=== 外观规制 (Appearance Regulations) ===

┌──────────────────────────────────────────────┐
│ 🎨 外观规制                                   │
│ ─────────────────────────────────────────── │
│                                              │
│ 主题              ○ 玄天色(暗)  ○ 宣纸色(亮)   │
│                                              │
│ 强调色            ● #d4a843 鎏金              │
│                   [预设色板: 鎏金/朱砂/翠涛/绀紫]│
│                                              │
│ 字体大小          中 (14px)                    │
│                   [小] [中] [大]              │
│                                              │
│ 云纹密度          中                            │
│                   [疏] [中] [密]              │
│                                              │
│ 动效开关          [✓ 启用]                     │
│ 关闭后禁用所有动效以提升性能。                 │
│                                              │
│ [重置所有规制]  [导出规制]  [导入规制]          │
└──────────────────────────────────────────────┘

=== 典章查阅 (Codex Reference) ===

┌──────────────────────────────────────────────┐
│ 📖 典章查阅                                   │
│ ─────────────────────────────────────────── │
│                                              │
│ 搜索典章...                          [🔍]     │
│                                              │
│ 律 (红线规则)         令 (部门职能)             │
│ ┌──────────────────┬──────────────────────┐  │
│ │ 不可绕过审批      │ 中书不得越权审议      │  │
│ │ 不可越权操作      │ 门下为唯一审议机构    │  │
│ │ 不可篡改流转日志  │ 尚书为唯一派发机构    │  │
│ │ 密奏仅天子可见    │ 六部不得跨域操作      │  │
│ └──────────────────┴──────────────────────┘  │
│                                              │
│ 格 (奖惩细则)         式 (操作规范)             │
│ ┌──────────────────┬──────────────────────┐  │
│ │ 连续3次封驳扣分   │ API返回格式规范       │  │
│ │ 令牌上限=部门等级 │ 日志记录规范          │  │
│ │ 超时未办结扣分    │ 接口调用规范          │  │
│ │ 密奏不实加倍扣分  │ 错误码规范            │  │
│ └──────────────────┴──────────────────────┘  │
└──────────────────────────────────────────────┘

=== 关于本朝 (About) ===

┌──────────────────────────────────────────────┐
│ ℹ️ 关于本朝                                   │
│ ─────────────────────────────────────────── │
│                                              │
│ YYC³ Dynasty v1.0.0                          │
│ 紫微城中枢 · 三省六部 AI 治理平台              │
│                                              │
│ 架构: 三省六部制 + 八 Family Agent            │
│ 设计: 洛阳紫微城中轴线映射                     │
│ 朝代: 十三王朝文化符号体系                     │
│                                              │
│ 构建: 永熙三年 · 孟夏                           │
│ 版本: 2026.06.14                             │
│                                              │
│ 言启千行代码 · 语枢万物智能                    │
│ 三省以治 · 六部以行                            │
└──────────────────────────────────────────────┘

═══════════════════════════════════
COMPONENTS:
═══════════════════════════════════
- SettingsSidebar as Component (10 category items)
- SettingsSection as Component (8 sections)
- SettingsField as Component with variants:
  - TextInput / Dropdown / ToggleSwitch / Slider / ColorPicker / TagList
- SettingsTable as Component (token config table)
- DangerZone as Component (red border + confirm dialog)

STATES:
- Default: all settings loaded
- Saving: field shows spinner + "保存中..."
- Saved: field shows ✓ + "规制已更新" briefly
- Error: "规制更新失败" toast
- Unsaved changes: "有未保存的规制变更" banner at top

INTERACTION:
- Unsaved changes warning when navigating away
- [重置所有规制] requires 玉玺验证 (confirm modal)
- [熔断重置] requires 玉玺验证 + "确认熔断" text input
```

---

# 第六部分：组件库清单

## §22 基础组件

| 组件 | 用途 | Variants |
|------|------|----------|
| `DynastyCard` | 通用内容卡片 | default / active / hover / disabled |
| `DynastyTag` | 标签 | category / keyword / status / urgency |
| `DynastyButton` | 按钮 | primary(gold) / secondary(transparent) / danger(red) / ghost |
| `DynastyBadge` | 角标 | number / text / dot |
| `DynastyAvatar` | 头像 | 小(32) / 中(40) / 大(56) |
| `DynastyDivider` | 分割线 | solid / gradient / ornate |
| `DynastyProgress` | 进度条 | step / percentage / circular |
| `DynastyToast` | 提示 | success / error / warning / info |
| `DynastyTooltip` | 提示框 | top / bottom / left / right |

## §23 业务组件

| 组件 | 用途 | Variants |
|------|------|----------|
| `AgentCard` | Agent 信息卡片 | 12 officials × 3 states (active/standby/offline) |
| `EdictStepBar` | 六阶段敕令进度条 | 6 steps × 4 states (pending/active/done/vetoed) |
| `HonorBadge` | 勋章展示 | earned/unearned × 6 rarity levels |
| `DynastySelector` | 朝代选择器 | 13 dynasty buttons |
| `SkillSwitcher` | Skill 启用开关 | active/inactive |
| `EdictScroll` | 圣旨卷轴 | 5 type variants × 4 stages |
| `ImperialSeal` | 传国玉玺 | Idle/Hover/Pressing/Stamped/Locked |
| `ChariotWidget` | 天子驾六 | 6 horses × 3 states + chariot posture |
| `PersonaAvatar` | 人格头像 | 12 personas × selected/unselected |
| `MessageBubble` | 消息气泡 | user/assistant/system/edict |

---

# 第七部分：交互规范与状态覆盖

## §24 交互规范

| 交互类型 | 时长 | 缓动函数 |
|---------|------|---------|
| 卡片悬浮 | 200ms | ease-out |
| Tab 切换 | 150ms | ease-in-out |
| 消息出现 | 300ms | ease-out + slide-up 8px |
| 徽章弹跳 | 400ms | cubic-bezier(0.68, -0.55, 0.265, 1.55) |
| 面板展开 | 250ms | ease-out + scale(0.95→1) |
| 打字动画 | 循环 | 150ms 间隔弹跳 |
| 页面切换 | 400ms | ease-in-out |
| Toast 出入 | 400ms | slide-right-in + 5s hold + fade-out |

## §25 全局状态覆盖（四态标准）

每个可交互元素必须覆盖以下 4 种状态：

| 状态 | 视觉特征 | 适用元素 |
|------|---------|---------|
| **Default** | 标准样式，无额外效果 | 所有元素 |
| **Hover** | 微放大(1.02x)/边框变亮/阴影加深 | 卡片、按钮、标签 |
| **Active/Pressed** | 微缩小(0.95x)/颜色加深/印泥波纹 | 按钮、开关 |
| **Disabled** | 50% opacity/greyscale/not-allowed cursor | 无权限按钮、锁定组件 |

### 附加状态

| 状态 | 触发条件 | 视觉 |
|------|---------|------|
| **Loading** | 数据请求中 | 骨架屏/龙纹流光/dots bouncing |
| **Empty** | 无数据 | 竹简空白 + 云纹 + 提示文字 |
| **Error** | 请求失败 | 红色边框 + 错误信息 + 重试按钮 |
| **Success** | 操作成功 | 绿色确认 + Toast 通知 |

---

# 第八部分：全链路衔接系统（2026.06.14 四维审计补全）

> **审计维度**：链路衔接 | 功能交互 | 实操传递 | 逻辑认证
> 补全日：2026.06.14 | 新增 18 个章节 | 修复 7 处逻辑断裂

## §29 全局导航系统 · 紫微宫阙导航

### 29.1 导航栏设计（所有页面顶部通栏）

```
┌──────────────────────────────────────────────────────────────────┐
│ [🔶 玉玺 Logo]  YYC³ Dynasty  │ 朝堂 │ 王朝 │ 旨意 │ 双星桥 │ [🔔] [👤] │
│  28px, gold                     ───── tab bar ─────   通知  用户  │
└──────────────────────────────────────────────────────────────────┘
  高度: 56px | 背景: rgba(10,14,23,0.95) + backdrop-blur 12px
  底部: 1px 金线分割 rgba(212,168,67,0.15)
```

| 导航项 | 图标 | 路由 | 激活态 | 说明 |
|--------|------|------|--------|------|
| 朝堂 | 🏯 | `/court` | 金线底边 + 云纹高亮 | 朝堂大厅（P2） |
| 王朝 | 📜 | `/timeline` | 同上 | 十三王朝（P3） |
| 旨意 | 📋 | `/edict` | 同上 | 旨意板（P6） |
| 双星桥 | 🌉 | `/bridge` | 同上 | 双星桥（P8） |

**全局导航组件**：`DynastyNavbar` — Component with 4 variants (朝堂/王朝/旨意/双星桥 active)

### 29.2 面包屑导航

```
🏯 朝堂 > 旨意工坊 > 新建敕令
```

- 字号 12px，颜色 `--color-text-secondary`
- 分隔符：`>` 或 回纹装饰
- 当前页不可点击，金色文字

### 29.3 侧边快捷入口（P2 朝堂页专属）

```
┌──────────────┐
│ 📜 新建旨意   │  → /edict/create
│ 🏅 勋章墙     │  → /honors
│ ⚙️ 宫阙规制   │  → /settings
│ 📊 太史监候   │  → /monitor
│ 💬 AI 助理   │  → 展开 Hub
└──────────────┘
```

### 29.4 通知中心入口

导航栏右侧 🔔 图标带角标数字，点击展开下拉面板：

```
┌──────────────────────────────────┐
│ 🔔 通知中心              [全部已读] │
│ ─────────────────────────────── │
│ 🕐 2分钟前                       │
│ 朝钟 · 敕令 #edict-042 门下封驳   │
│ ─────────────────────────────── │
│ 🕐 15分钟前                      │
│ 飞鸽 · 敕令 #edict-041 执行完毕   │
│ ─────────────────────────────── │
│ 🕐 1小时前                       │
│ 烽火 · 兵部鱼符即将耗尽(剩余3)     │
└──────────────────────────────────┘
```

## §30 页面路由与数据流

### 30.1 完整路由表

| 路由 | 页面 | 参数 | 访问权限 | 来源 |
|------|------|------|---------|------|
| `/welcome` | P1 启动页 | — | 公开 | 首次加载 |
| `/court` | P2 朝堂大厅 | `?node=天堂` 可选锚点 | 已登录 | 默认首页 |
| `/timeline` | P3 十三王朝 | `?dynasty=唐` | 已登录 | 导航栏 |
| `/honors` | P4 勋章墙 | `?category=角色` | 已登录 | 侧边栏 |
| `/edict` | P6 旨意板 | `?status=执行中&page=1` | 已登录 | 导航栏 |
| `/edict/create` | P5 旨意工坊 | `?type=敕书` | 皇帝/太子 | P6 [+]按钮 |
| `/edict/:id` | 敕令详情 | `:id` 敕令编号 | 已登录 | P6 卡片点击 |
| `/bridge` | P8 双星桥 | `?family=元启·天枢` | 已登录 | 导航栏 |
| `/settings` | 宫阙规制 | — | 皇帝 | P1/P2 入口 |
| `/hub` | P7 Hub 浮窗 | — | 已登录 | P2 浮动按钮 |
| `/monitor` | 太史监候 | — | 已登录 | P1/P2 入口 |

### 30.2 核心数据流（旨意创建 → 流转 → 归档 全链路）

```
P5 旨意工坊 (创建)
  │ POST /api/edicts
  │ 玉玺盖章动画 → 1.2s
  │ 圣旨上浮消失 → 0.6s
  ▼
P6 旨意板 (自动刷新)
  │ 新敕令卡片：从上方降入 + 金线高亮 1.5s
  │ WebSocket: edict_created 事件
  │ 状态: 草拟中 → 审议中 → 执行中 → 已办结
  │ 每个阶段变更: edict_status_changed 事件
  ▼
P2 朝堂大厅 (同步更新)
  │ 中轴线流转光点对应阶段移动
  │ 天子驾六马匹状态变化
  │ 底部 flow bar 指标更新
  ▼
P8 双星桥 (关联更新)
  │ 统一任务板计数更新
  │ 关联 Family 成员状态更新
```

### 30.3 数据一致性约束

| 约束 | 规则 | 实现方式 |
|------|------|---------|
| 旨意计数 | P2/P6/P8 的旨意总数必须一致 | 共享 `edictStore` |
| 六部状态 | P2 天子驾六 与 P6 六部筛选必须一致 | 共享 `ministryStore` |
| 人格选择 | P7 选定人格影响 P2/P8 高亮 | 共享 `personaStore` |
| 朝代选择 | P3 选定朝代影响 P2 文化主题 | 共享 `dynastyStore` |

## §31 全局状态管理 · 三省调度中枢

### 31.1 全局状态 Store 定义

```
edictStore:
  ├─ edicts: Edict[]           // 全量敕令列表
  ├─ activeFilter: FilterType  // 当前筛选状态
  ├─ edictCount: number        // 实时计数
  └─ actions: { create, update, archive, veto }

ministryStore:
  ├─ ministries: Ministry[]    // 六部状态
  ├─ horseStatus: HorseState[] // 天子驾六状态
  └─ actions: { updateStatus, consumeToken }

personaStore:
  ├─ selectedPersona: Persona  // 当前选中人格
  ├─ lastMessages: Message[]   // 对话历史（最多 50 条）
  └─ actions: { select, sendMessage, clearHistory }

dynastyStore:
  ├─ selectedDynasty: Dynasty  // 当前选中朝代
  ├─ activeSkills: Skill[]     // 已启用的 Skill
  └─ actions: { select, toggleSkill }

notificationStore:
  ├─ notifications: Notification[]
  ├─ unreadCount: number
  └─ actions: { push, markRead, clearAll }
```

### 31.2 全局加载状态

| 场景 | 视觉 | 时长 |
|------|------|------|
| 首次启动 | 龙纹流光 Loading 页 | 1.5-2s |
| 页面切换 | 顶部金线进度条（0→100% 300ms） | 300ms |
| 数据刷新 | 局部骨架屏 + 微光扫过 | 600ms |
| 旨意提交 | 圣旨卷轴发光 + "颁旨中..." 文字 | 1.5s |

## §32 通知系统 · 朝钟飞鸽烽火

### 32.1 三级通知体系

| 级别 | 名称 | 图标 | 视觉 | 触发场景 | 交互 |
|------|------|------|------|---------|------|
| 1级 朝钟 | 重要通知 | 🔔 鎏金钟 | 金边卡片 + 钟声波纹 | 封驳/驳回/系统告警 | 点击跳转源页面 |
| 2级 飞鸽 | 常规通知 | 🕊️ 白鸽 | 云纹底 + 飞鸽动画 | 任务完成/阶段变更/回奏 | 点击跳转源页面 |
| 3级 烽火 | 紧急告警 | 🔥 烽火台 | 朱砂红边框 + 火焰动画 | 令牌耗尽/超时/异常 | 自动展开 + 声音提示 |

### 32.2 通知 Component

- `DynastyNotification` — 3 variants (朝钟/飞鸽/烽火)
- `NotificationBadge` — 导航栏角标 (number / dot / pulse)
- `NotificationPanel` — 下拉面板 Component

### 32.3 通知驱动链

```
系统事件 → NotificationStore.push() → 三路分发:
  ├─ 导航栏角标更新 (unreadCount++)
  ├─ Toast 弹出 (右上角，400ms 滑入，5s 后消失)
  └─ 通知中心追加 (下拉面板，最新在上)
```

## §33 全局搜索系统 · 钦天监检索

### 33.1 搜索入口

```
⌘K / Ctrl+K 唤起全局搜索弹窗
```

```
┌──────────────────────────────────────────────┐
│ 🔍 搜索旨意、朝臣、Skill、勋章...       [⌘K] │
│ ─────────────────────────────────────────── │
│ 📋 搜索建议                                 │
│ ─────────────────────────────────────────── │
│ 📜 旨意 · 修缮云枢殿防火墙         执行中  │
│ 👤 朝臣 · 中书令 · 草拟中 3 件             │
│ ⚡ Skill · 唐诗品鉴 · 已启用               │
│ 🏅 勋章 · 紫微星 · 未获得                  │
│ ─────────────────────────────────────────── │
│ 共 47 条结果          [↑↓ 选择] [↵ 跳转]   │
└──────────────────────────────────────────────┘
```

### 33.2 搜索 Component

- `GlobalSearchModal` — 560×400px 弹窗，毛玻璃背景
- 搜索框：autofocus，输入时实时过滤（150ms debounce）
- 结果分类：旨意 / 朝臣 / Skill / 勋章 / 设置
- 键盘导航：↑↓ 选择，Enter 跳转，Esc 关闭

### 33.3 全局搜索 Component

- `GlobalSearchModal` — 560×400px 弹窗，毛玻璃背景
- 搜索框：autofocus，输入时实时过滤（150ms debounce）
- 结果分类：旨意 / 朝臣 / Skill / 勋章 / 设置
- 键盘导航：↑↓ 选择，Enter 跳转，Esc 关闭

---

## §33A 路由守卫与深度链接（2026.06.14 四维补全）

#### A. 路由守卫层级

```
路由守卫三层架构:

┌─────────────────────────────────────────────────────┐
│ L1: 全局前置守卫 (beforeEach)                        │
│   ├─ 会话有效性校验（玉玺授权令牌过期检查）           │
│   ├─ 首次访问 → 重定向 /welcome                     │
│   ├─ 会话锁定 → 重定向 /welcome?locked=true          │
│   └─ 记录路由访问日志（太史监候审计）                │
├─────────────────────────────────────────────────────┤
│ L2: 路由级权限守卫 (meta.permission)                 │
│   ├─ 'public'     → 直接放行（P1 启动页）            │
│   ├─ 'logged-in'  → 需已登朝（P2/P3/P4/P6/P7/P8）  │
│   ├─ 'emperor'    → 仅天子（P11 宫阙规制）           │
│   ├─ 'crown-prince' → 天子/太子（P5 旨意工坊创建）   │
│   └─ 'zhongshu/menxia/shangshu' → 对应省官员        │
├─────────────────────────────────────────────────────┤
│ L3: 资源级守卫 (beforeResolve)                       │
│   ├─ 校验路由参数格式（如 edict/:id 中 id 为数字）    │
│   ├─ 校验目标资源是否存在（404 判断）                 │
│   └─ 校验数据版本号（stale 数据重拉取）               │
└─────────────────────────────────────────────────────┘
```

#### B. 深度链接（Deep Link）处理

```
深链格式: https://dynasty.yyc3.com/{route}?{params}#{anchor}

支持的深链场景:
┌──────────────────────────────────────────────────────────────────────┐
│ 场景                │ URL 示例                          │ 行为         │
├─────────────────────┼───────────────────────────────────┼──────────────┤
│ 直接访问敕令详情     │ /edict/042                        │ 鉴权→展开P9弹窗│
│ 直接访问特定朝代     │ /timeline?dynasty=唐              │ P3 自动选中"唐"│
│ 锚点定位朝堂节点     │ /court?node=天堂                  │ P2 自动聚焦"天堂"│
│ 带筛选的旨意板       │ /edict?status=执行中&page=3       │ P6 预加载筛选   │
│ 特定 Family 桥接     │ /bridge?family=元启·天枢          │ P8 高亮该Family │
│ 带状态的宫阙规制     │ /settings?section=安全规制         │ P11 展开对应项  │
│ 会话锁定恢复         │ /welcome?locked=true&return=/edict│ 解锁后返回深链  │
└──────────────────────────────────────────────────────────────────────┘

深链接入流程:
  │
  ├─ 1. 解析 URL → 提取 route/params/anchor
  ├─ 2. 检查会话状态
  │   ├─ 未登朝 → 保存深链至 sessionStorage.returnUrl → 跳转 /welcome
  │   └─ 已登朝 → 继续
  ├─ 3. L1→L2→L3 路由守卫逐层校验
  │   ├─ 鉴权失败 → 展示"无权觐见"页面 + 返回朝堂按钮
  │   └─ 鉴权通过 → 继续
  ├─ 4. 预加载目标页面所需数据（优先于路由跳转）
  ├─ 5. 执行路由跳转 + 入场动画（按 33D.3 导航动画规范）
  └─ 6. 路由完成 → 执行锚点操作（锚点滚动/展开面板/高亮元素）

权限不足的深链处理:
┌──────────────────────────────────────────┐
│                                          │
│     🔒 宫阙禁地 · 无权觐见                 │
│                                          │
│     此规制仅天子可御                       │
│     ─────────────────────                │
│     你当前的朝臣品级不足以访问此规制。       │
│                                          │
│          [奏请天子]  [返回朝堂]            │
│                                          │
└──────────────────────────────────────────┘
```

#### C. URL 状态同步策略

```
URL 作为单一状态源（URL as Single Source of Truth）:

P6 旨意板 URL 状态映射:
  /edict?status=执行中&sort=time&order=desc&page=2&size=10

  ├─ status  → edictStore.activeFilter
  ├─ sort    → edictStore.sortField
  ├─ order   → edictStore.sortOrder
  ├─ page    → edictStore.currentPage
  └─ size    → edictStore.pageSize

双向同步规则:
  URL 变化  ──→ Store 更新 ──→ UI 重渲染
  Store 更新 ──→ URL 同步（replaceState，不产生历史记录）
  用户筛选  ──→ URL 更新（pushState，产生浏览器历史记录）

同步时机:
  ├─ 筛选切换: pushState → 可回退
  ├─ 分页翻页: pushState → 可回退
  ├─ 排序切换: replaceState → 不产生历史
  ├─ 标签页间跳转: pushState
  ├─ 弹窗打开/关闭: pushState / popState
  └─ 表单输入: 不写入 URL（避免高频更新）

防抖策略:
  ├─ 搜索框输入: 300ms debounce → replaceState
  └─ 其他筛选: 立即生效
```

#### D. 浏览器导航行为标准化

```
浏览器的五个导航动作及其语义:

┌─────────────────────────────────────────────────────────────────┐
│ 行为         │ 按键      │ 语义              │ 系统响应           │
├──────────────┼──────────┼──────────────────┼────────────────────┤
│ 前进 (Go)    │ 前进按钮  │ 回到刚才离开的页面 │ 恢复 URL → 重渲染  │
│ 后退 (Back)  │ 后退按钮  │ 回到上一个历史记录 │ 恢复 URL → 重渲染  │
│ 刷新 (Reload)│ ⌘R / F5  │ 重新加载当前页     │ 龙纹Loading→恢复状态│
│ 关闭/打开    │ ⌘W/⌘T   │ 离开/新建标签页    │ 保存/恢复状态      │
│ 硬刷新       │ ⌘⇧R      │ 清除缓存重新加载   │ 全量Loading→初始化  │
└─────────────────────────────────────────────────────────────────┘

后退/前进拦截策略:

  P5 旨意工坊（有未保存表单）:
    → beforeunload 事件拦截
    → 弹出"旨意未加盖御玺，草稿将暂存"确认面板
    → 用户选择"留下" → 取消导航
    → 用户选择"暂存并离开" → 存草稿 → 允许导航

  P11 宫阙规制（有未保存设置）:
    → 弹出"规制未保存，是否保存后离开？"确认面板
    → [保存并离开] / [放弃离开] / [留下]

自定义路由过渡方向（匹配 33D.3）:
  前进导航 → Push Left 动画（400ms）
  后退导航 → Push Right 动画（400ms）

  判断方法: 比较新路由和旧路由在历史栈中的位置
  ├─ newIndex > oldIndex → 前进 → Push Left
  └─ newIndex < oldIndex → 后退 → Push Right
```

## §33B 跨标签页数据同步（2026.06.14 四维补全）

```
SharedWorker 方案（替代 BroadcastChannel 降级）:

// 主标签页（朝堂）作为数据源
// 其他标签页作为只读副本

┌─────────────────────┐    SharedWorker    ┌─────────────────────┐
│  标签页A (朝堂)      │◄──────────────────►│  标签页B (旨意工坊)   │
│  edictStore: master  │                    │  edictStore: mirror │
│  可读可写            │                    │  只读 + 操作请求    │
└─────────┬───────────┘                    └─────────┬───────────┘
          │                                          │
    数据更新通知                              数据更新通知
          │                                          │
          ▼                                          ▼
    UI 自动刷新                              UI 自动刷新

同步冲突解决:
  ├─ 版本号机制: 每个 Store 维护递增版本号
  ├─ 冲突检测: 写入时对比版本号，版本过期拒绝写入
  └─ 冲突提示: "敕令已被其他标签页更新，已自动刷新"
```

---

# 第九部分：功能交互补全（2026.06.14 四维审计补全）

## §34 表单验证与反馈 · 旨意工坊校验

### 34.1 P5 旨意工坊表单校验规则

| 字段 | 规则 | 校验时机 | 错误提示 |
|------|------|---------|---------|
| 旨意标题 | 必填，2-50 字，不可仅空白 | 失焦 | 朱砂红竖线 + "请拟旨意标题" |
| 紧急程度 | 必选一项 | 提交 | "请选择旨意紧急程度" |
| 指派六部 | 至少选 1 个部门 | 提交 | "请至少指派一个执行部门" |
| 旨意详情 | 必填，10-2000 字 | 失焦 | "旨意详情不可少于 10 字" |
| 圣旨类型 | 必选 | 默认"敕书" | — |

### 34.2 校验状态视觉

```
字段校验三态:
  Default: 标准边框 rgba(212,168,67,0.12)
  Valid:   碧色边框 #10b981 + 右侧 ✓ 图标
  Error:   朱砂红边框 #c2414b + 右侧 ✕ 图标 + 提示文字
  Focus:   鎏金边框 #d4a843 + 微光晕
```

### 34.3 提交按钮状态机

```
Idle → Validating → Submitting → Success → Reset
  │        │            │           │
  └────────┴────────────┴───────────┘
           Error (shake + red flash)
```

| 状态 | 按钮文字 | 视觉 | 可点击 |
|------|---------|------|--------|
| Idle | "奉天承运 · 颁旨" | 鎏金渐变 | 是 |
| Validating | "奉天承运 · 颁旨" | 微光脉冲 | 否 |
| Submitting | "颁旨中..." | 圣旨卷轴发光 + 前缀旋转龙纹 | 否 |
| Success | "✓ 旨意已颁" | 碧色 + 玉玺印记 | 否（2s 后重置） |
| Error | "颁旨失败 · 重试" | 红色 + 抖动 | 是 |

### 34.4 存为草稿

```
[存为草稿] 按钮（Secondary ghost 样式，位于 [颁旨] 按钮左侧）
- 草稿存储于 localStorage，按 `edict_draft_{timestamp}` 命名
- 草稿列表入口：P6 旨意板顶部 Tab "草稿箱"
- 草稿卡片：灰底 + "草稿" 标签 + 最后编辑时间 + 删除按钮
```

## §35 数据操作闭环 · CRUD 完整链路

### 35.1 旨意 CRUD 操作矩阵

| 操作 | 触发 | 确认弹窗 | 动画 | 结果 |
|------|------|---------|------|------|
| 创建 | P5 [颁旨] | — | 玉玺盖章 + 圣旨上浮 | P6 新卡片降入 |
| 查看 | P6 卡片点击 | — | 圣旨展开弹窗 | 详情页 |
| 催办 | P6 [催办⚡] | "确认催办？将发送飞鸽通知" | 飞鸽飞出动画 | Toast + 通知 |
| 撤回 | 皇帝/太子操作 | "撤回后需重新草拟" | 圣旨卷回动画 | 回到草稿状态 |
| 封驳 | 门下省操作 | "确认封驳？附驳回理由：" | 朱砂批红 + 逆流红点 | 返回源头 |
| 归档 | 自动/手动 | — | 竹简收起动画 | 移入定鼎门 |

### 35.2 确认弹窗 Component

```
┌──────────────────────────────────────┐
│ ⚠️ 确认封驳                         │
│ ─────────────────────────────────── │
│ 封驳后将返回中书省重新草拟。         │
│                                      │
│ 驳回理由（必填）：                    │
│ ┌──────────────────────────────────┐ │
│ │ 不合典章规范，请参照律令格式...   │ │
│ └──────────────────────────────────┘ │
│                                      │
│      [取消]      [确认封驳 · 朱批]   │
└──────────────────────────────────────┘
```

### 35.3 分页与排序（P6 旨意板）

| 排序方式 | 默认 | 可切换 |
|---------|------|--------|
| 时间倒序 | ✅ | 时间正序 |
| 紧急程度 | — | 十万火急→缓 |
| 状态 | — | 按流转阶段 |

分页：每页 10 条，底部 `[1] [2] [3] ... [下一页]` 分页器

## §36 键盘快捷键与右键菜单

### 36.1 全局快捷键

| 快捷键 | 功能 | 作用域 |
|--------|------|--------|
| `⌘K` / `Ctrl+K` | 全局搜索 | 全局 |
| `⌘N` / `Ctrl+N` | 新建旨意 | 全局 |
| `⌘1-8` | 快速切换页面 | 全局 |
| `Escape` | 关闭弹窗/面板 | 弹窗内 |
| `⌘Z` / `Ctrl+Z` | 撤销（表单内） | P5 表单 |
| `⌘Enter` | 提交旨意 | P5 表单 |
| `Space` | Hub 语音输入 | P7 Hub |

### 36.2 右键菜单（Context Menu）

在 P6 旨意板卡片上右键：

```
┌──────────────────┐
│ 📋 查看详情       │
│ 📝 复制敕令编号   │
│ ⚡ 催办           │
│ ─────────────── │
│ 🔗 复制链接       │
│ 📊 查看流转日志   │
└──────────────────┘
```

## §37 实时数据更新机制

### 37.1 更新策略

| 数据 | 更新方式 | 频率 | 降级方案 |
|------|---------|------|---------|
| 旨意状态 | WebSocket push | 实时 | 30s 轮询 |
| 六部令牌数 | WebSocket push | 实时 | 60s 轮询 |
| 通知 | WebSocket push | 实时 | 页面刷新时拉取 |
| 在线状态 | 心跳 (ping/pong) | 15s | 离线标记 |
| 朝代/Skill | 静态 + 手动刷新 | 按需 | — |

### 37.2 离线/弱网状态处理

```
离线检测:
┌──────────────────────────────────────────────┐
│ ⚠️ 网络连接已断开                              │
│ 部分功能可能受限，数据将在恢复连接后自动同步。   │
│                                     [手动刷新] │
└──────────────────────────────────────────────┘
```

- 导航栏顶部黄色横幅（全局，非阻塞）
- 旨意创建：离线时保存到本地队列，恢复后自动提交
- 数据展示：显示缓存数据 + "数据可能不是最新" 标记

---

## §37A Toast 通知队列管理（功能交互深度补全）

> **审计发现**：原文档定义了 Toast 通知的出入动画和三级体系，但缺少 Toast 队列管理、多通知堆叠策略、用户手动关闭等关键交互逻辑。
> **补全内容**：Toast 优先级队列 + 堆叠布局 + 用户交互 + 降噪策略

### 37A.1 Toast 优先级与队列策略

```
Toast 优先级队列（FIFO with priority preemption）:

入队规则:
  ├─ 烽火(紧急) → 插入队首，立即显示，不限数量
  ├─ 朝钟(重要) → 正常入队，最多同时显示 2 条
  └─ 飞鸽(常规) → 正常入队，最多同时显示 1 条

出队规则:
  ├─ 自动消失: 飞鸽 3s / 朝钟 5s / 烽火 8s（或手动关闭）
  ├─ 新通知到达时:
  │   ├─ 烽火 → 抢占当前显示位，正在显示的飞鸽被挤到队列等待
  │   ├─ 朝钟 → 若当前显示位 < 2，直接显示；否则进入队列等待
  │   └─ 飞鸽 → 若当前显示位为空，直接显示；否则进入队列等待
  └─ 队列最大长度: 20 条，超出后淘汰最旧的飞鸽通知
```

### 37A.2 Toast 堆叠布局

```
屏幕右上角 Toast 区域 (top: 80px, right: 24px):

飞鸽 Toast（单条时）:
┌──────────────────────────────────┐
│ 🕊️ 敕令 #edict-042 执行完毕      │
│ 兵部·大司马 巳时三刻回奏           │
└──────────────────────────────────┘

多条堆叠时（最新在上，向下偏移 8px）:
┌──────────────────────────────────┐ ← 最新
│ 🔔 敕令 #edict-043 门下封驳      │
└──────────────────────────────────┘
   ┌──────────────────────────────────┐ ← 次新 (offset 8px, opacity 0.9)
   │ 🕊️ 敕令 #edict-042 执行完毕      │
   └──────────────────────────────────┘
      ┌──────────────────────────────────┐ ← 更旧 (offset 8px, opacity 0.6)
      │ 🕊️ Skill 唐诗品鉴 已启用         │
      └──────────────────────────────────┘

堆叠规则:
  - 最大可见堆叠数: 3 条
  - 超出部分: 显示 "+N 条通知" 折叠提示
  - 每条向下偏移 8px，透明度递减 (1.0 → 0.9 → 0.6)
```

### 37A.3 Toast 用户交互

| 交互 | 行为 | 说明 |
|------|------|------|
| 鼠标悬停 | 暂停消失计时 | 方便用户阅读长内容 |
| 点击 Toast 主体 | 跳转至源页面（朝钟/飞鸽） | 烽火点击展开详情面板 |
| 点击 ✕ 关闭 | 立即移除，不等待自动消失 | — |
| 点击 "+N 条通知" | 展开通知中心下拉面板 | 快速查看全部通知 |
| 键盘 Escape | 关闭最上方的 Toast | 连续按 Esc 逐个关闭 |

### 37A.4 降噪策略

```
防抖合并规则:
  - 同一敕令的连续状态更新（如 "草拟中"→"审议中"→"执行中"）:
    → 合并为 1 条飞鸽: "敕令 #edict-042 已进入执行阶段"
  - 同一类型通知在 5s 内的多次触发:
    → 仅显示最新 1 条 + 角标 "(×3)" 表示发生了 3 次
  - 同一令牌预警的重复触发:
    → 仅首次触发烽火，后续 5 分钟内不再重复烽火（降级为朝钟）
```

---

## §37B 自动保存与草稿恢复（功能交互深度补全）

> **审计发现**：原文档仅提及"存为草稿"按钮和 localStorage 存储，缺少完整的自动保存策略、草稿版本管理、恢复冲突处理。
> **补全内容**：自动保存策略 + 草稿版本管理 + 恢复流程 + 冲突处理

### 37B.1 自动保存触发策略

```
自动保存触发时机:

├─ 内容变更后空闲 3s（debounce） → 自动保存
├─ 每 30s 定时保存（即使无新变更）  → 心跳保存
├─ 用户切换字段焦点时             → 即时保存
├─ 浏览器 beforeunload 事件       → 最终保存
└─ 页面隐藏时 (visibilitychange)  → 紧急保存

自动保存不触发:
  ├─ 字段全部为空（无实际内容）
  ├─ 距上次保存不足 1s（防抖期内）
  └─ localStorage 已满 (> 5MB)
```

### 37B.2 草稿存储结构

```
localStorage key: edict_draft_v2

存储结构:
{
  "version": 2,
  "drafts": [
    {
      "id": "draft_20260614_0300",
      "type": "敕书",
      "title": "修缮云枢殿防火墙",
      "urgency": "火急",
      "ministries": ["兵部", "工部"],
      "body": "兹令兵部、工部协力修缮云枢殿防火墙之薄弱处...",
      "createdAt": "2026-06-14T03:00:00Z",
      "updatedAt": "2026-06-14T03:05:00Z",
      "saveCount": 7,
      "status": "draft"  // draft | submitting | conflict
    }
  ],
  "maxDrafts": 20,
  "totalSize": "12KB"
}

存储限制:
  - 最多 20 个草稿
  - 单草稿最大 100KB（正文过长时分段存储）
  - 超出限制时: 提示 "草稿已满，请清理旧草稿或提交" + 删除最早草稿的确认
```

### 37B.3 草稿恢复流程

```
用户重新进入 P5 旨意工坊:
  │
  ├─ 检测 localStorage 中是否有草稿
  │
  ├─ 无草稿 → 空白新圣旨
  │
  ├─ 有草稿 → 显示恢复提示:
  │   ┌──────────────────────────────────────────┐
  │   │ 📜 发现未完成的旨意草稿                    │
  │   │                                          │
  │   │ 敕书 · "修缮云枢殿防火墙"                  │
  │   │ 上次保存: 巳时三刻 (2 分钟前)               │
  │   │ 已自动保存 7 次                            │
  │   │                                          │
  │   │ [恢复草稿]  [新建旨意]  [删除草稿]          │
  │   └──────────────────────────────────────────┘
  │
  └─ 用户选择:
      ├─ 恢复草稿 → 用草稿数据填充表单
      ├─ 新建旨意 → 清空表单，保留草稿（不删除）
      └─ 删除草稿 → 确认后删除，清空表单
```

### 37B.4 草稿版本与冲突

```
草稿版本管理:
  - 每次自动保存不产生新版本（原地更新 updatedAt）
  - 用户手动 [存为草稿] 产生新版本快照
  - 保留最近 3 个手动版本快照

多标签页草稿冲突:
  标签页A（正在编辑草稿X）→ 标签页B（也打开了草稿X并修改）

  标签页A获得焦点时检测到版本冲突:
  ┌──────────────────────────────────────────┐
  │ ⚠️ 草稿冲突                               │
  │                                          │
  │ 此草稿在其他标签页已被修改。                │
  │                                          │
  │ 你的版本: 巳时三刻 (本地)                   │
  │ 最新版本: 巳时四刻 (其他标签页)             │
  │                                          │
  │ [保留我的版本]  [加载最新版本]  [对比差异]   │
  └──────────────────────────────────────────┘
```

---

## §37C 撤销/重做命令栈（功能交互深度补全）

> **审计发现**：原文档仅列出 ⌘Z 快捷键，缺少完整的撤销/重做命令栈设计、操作粒度定义、栈深度管理。
> **补全内容**：命令模式设计 + 操作粒度 + 栈管理 + UI 反馈

### 37C.1 命令模式设计

```
UndoRedoManager 命令栈结构:

interface Command {
  id: string;
  type: CommandType;
  timestamp: number;
  execute: () => void;    // 执行操作
  undo: () => void;       // 撤销操作
  description: string;    // 用户可读描述，用于 Tooltip
}

栈设计:
  undoStack: Command[]    // 最大深度 50
  redoStack: Command[]    // 新操作时清空

操作流程:
  执行操作 → push 到 undoStack → 清空 redoStack
  撤销 ⌘Z  → pop undoStack → 执行 command.undo() → push 到 redoStack
  重做 ⌘⇧Z → pop redoStack → 执行 command.execute() → push 到 undoStack
```

### 37C.2 操作粒度定义

| 操作类型 | 粒度 | 是否入栈 | 说明 |
|---------|------|:------:|------|
| 文本输入（单字符） | 合并入栈 | ✅ | 连续输入合并为 1 个命令（500ms 间隔合并） |
| 字段失焦 | 独立入栈 | ✅ | 一个字段编辑完成即入栈 |
| 切换紧急程度 | 独立入栈 | ✅ | 单次操作 |
| 多选六部 | 独立入栈 | ✅ | 批量选择/取消视为 1 个命令 |
| 粘贴文本 | 独立入栈 | ✅ | 粘贴操作作为原子命令 |
| 自动保存 | 不入栈 | — | 后台行为，不可撤销 |
| 页面切换 | 不入栈 | — | 超出作用域 |

### 37C.3 撤销/重做 UI 反馈

```
P5 旨意工坊底部操作栏:

┌──────────────────────────────────────────────┐
│ [↩ 撤销]  [↪ 重做]      [存为草稿] [奉天承运] │
└──────────────────────────────────────────────┘

撤销按钮:
  - 可用: 鎏金色 + Tooltip "撤销: {操作描述}" (如 "撤销: 修改旨意标题")
  - 不可用 (栈空): 50% opacity + "无可撤销操作"

重做按钮:
  - 可用: 鎏金色 + Tooltip "重做: {操作描述}"
  - 不可用 (栈空): 50% opacity + "无可重做操作"

撤销生效动画:
  - 被恢复的字段短暂高亮（金色边框闪烁 300ms）
  - Toast: "已撤销 · {操作描述}" (2s)
```

### 37C.4 跨组件撤销作用域

```
撤销作用域:
  - P5 旨意工坊: 独立的 UndoRedoManager 实例
  - P11 宫阙规制: 独立的 UndoRedoManager 实例（设置页独立管理）
  - 页面切换时: 清空当前页的 UndoRedoManager
  - 例外: 如果页面切换被 §33C.3 的离开确认拦截，保留 UndoRedoManager

不跨页面共享撤销栈，因为:
  1. 不同页面的操作语义不同
  2. 跨页面撤销会造成用户困惑
  3. 内存管理更简洁
```

---

## §37D 批量操作工具栏（功能交互深度补全）

> **审计发现**：原文档在边界场景矩阵中提到"批量操作"，但未展开批量选择的完整交互设计。
> **补全内容**：批量选择交互 + 批量工具栏 + 批量操作确认 + 操作结果反馈

### 37D.1 批量选择交互

```
P6 旨意板批量选择模式:

触发方式:
  ├─ 长按任意敕令卡片 (800ms) → 进入批量选择模式
  ├─ 点击卡片左侧复选框（hover 时显示）
  └─ 顶部 [选择] 按钮 → 进入批量选择模式

进入批量选择模式后:
┌──────────────────────────────────────────────┐
│ ☐ 已选 3 项  [全选]  [取消选择]  [催办] [归档] │ ← 批量工具栏
│ ─────────────────────────────────────────── │
│ ☑ ┌─────────────────────────────────────┐  │
│   │ 敕令 #edict-042  修缮云枢殿防火墙     │  │ ← 已选中（金色边框）
│   └─────────────────────────────────────┘  │
│ ☐ ┌─────────────────────────────────────┐  │
│   │ 敕令 #edict-043  升级天枢殿存储       │  │ ← 未选中
│   └─────────────────────────────────────┘  │
│ ☑ ┌─────────────────────────────────────┐  │
│   │ 敕令 #edict-044  修复礼部文档服务      │  │ ← 已选中
│   └─────────────────────────────────────┘  │
│ ☑ ┌─────────────────────────────────────┐  │
│   │ 敕令 #edict-045  更新工部CI流水线     │  │ ← 已选中
│   └─────────────────────────────────────┘  │
└──────────────────────────────────────────────┘

选择交互:
  - 点击卡片任意位置 → 切换选中/取消
  - 点击复选框 → 切换选中/取消
  - 按住 Shift + 点击 → 范围选择（两次点击之间的全部选中）
  - 按 Escape → 退出批量选择模式
```

### 37D.2 批量操作清单

| 操作 | 可用条件 | 确认弹窗 | 动画 | 权限 |
|------|---------|:------:|------|------|
| 批量催办 | 所选均为"执行中"状态 | "确认催办 N 条敕令？" | 飞鸽群飞动画 | 天子/太子 |
| 批量归档 | 所选均为"已办结"状态 | "确认归档 N 条敕令？" | 竹简收起动画 | 尚书省 |
| 批量撤回 | 所选均为"草拟中/审议中" | "确认撤回 N 条敕令？需重新草拟" | 圣旨卷回动画 | 天子 |
| 复制编号 | 任意状态 | — | 复制成功 Toast | 所有人 |
| 导出列表 | 所选任意状态 | — | 下载 CSV | 所有人 |

### 37D.3 批量操作结果反馈

```
批量催办完成:
┌──────────────────────────────────┐
│ 🕊️ 批量催办完成                  │
│ 成功: 3 条 / 失败: 0 条          │
│ ─────────────────────────────── │
│ ✅ edict-042 飞鸽已送达兵部       │
│ ✅ edict-044 飞鸽已送达礼部       │
│ ✅ edict-045 飞鸽已送达工部       │
└──────────────────────────────────┘

部分失败:
┌──────────────────────────────────┐
│ ⚠️ 批量催办部分失败              │
│ 成功: 2 条 / 失败: 1 条          │
│ ─────────────────────────────── │
│ ✅ edict-042 飞鸽已送达           │
│ ✅ edict-044 飞鸽已送达           │
│ ❌ edict-045 权限不足，无法催办    │
│ ─────────────────────────────── │
│ [重试失败项]        [知道了]      │
└──────────────────────────────────┘
```

---

## §37E 无限滚动与虚拟列表（功能交互深度补全）

> **审计发现**：原文档在边界场景中提到"长列表 > 50 条"需虚拟滚动，但未给出完整实现方案。
> **补全内容**：虚拟滚动策略 + 无限加载 + 滚动位置恢复 + 性能指标

### 37E.1 虚拟滚动策略

```
P6 旨意板虚拟滚动配置:

卡片高度: 固定 140px（含 padding）
可见区域: 约 600px（可展示 4-5 张卡片）
缓冲区: 上下各 3 张卡片（避免快速滚动时空白）

DOM 结构:
┌──────────────────────────────────────┐
│ [缓冲区 3 张]  ← 不可见，已预渲染     │
├──────────────────────────────────────┤
│ [可见区 4-5 张] ← 用户可见           │
├──────────────────────────────────────┤
│ [缓冲区 3 张]  ← 不可见，已预渲染     │
└──────────────────────────────────────┘

滚动容器总高度: 数据总条数 × 140px
实际渲染 DOM 数: 最多 11 张卡片（4 + 3 + 3 + 1 容错）
```

### 37E.2 无限加载分页策略

```
P6 旨意板分页加载:

初始加载: 第 1 页，20 条
滚动加载: 距底部 300px 时自动请求下一页

加载指示器（滚动到底部时）:
┌──────────────────────────────────┐
│                                  │
│     ◉ 正在呈阅更多敕令...         │
│     (鎏金旋转加载器)              │
│                                  │
└──────────────────────────────────┘

加载完毕（无更多数据）:
┌──────────────────────────────────┐
│     ── 敕令已尽 · 定鼎门 ──       │
│     已呈阅全部 47 条敕令          │
└──────────────────────────────────┘

加载失败:
┌──────────────────────────────────┐
│     📜 敕令呈阅中断               │
│     网络波动，部分敕令未能送达     │
│     [重试加载]                    │
└──────────────────────────────────┘
```

### 37E.3 滚动位置恢复

```
场景: 用户在 P6 滚动到第 4 页 → 点击 edict-042 进入 P9 详情 → 返回 P6

恢复策略:
  ├─ 离开 P6 时: 保存 scrollTop + 当前渲染的数据范围到 sessionStorage
  ├─ 返回 P6 时:
  │   ├─ 从 sessionStorage 恢复 scrollTop
  │   ├─ 若数据已更新（新敕令产生），重新计算 scrollTop 偏移
  │   └─ 若原位置的卡片已不存在（被删除），滚动至最接近位置
  └─ 恢复完成: 被恢复的卡片短暂金色边框闪烁 (300ms)

保留时间: sessionStorage 中保留至标签页关闭
```

### 37E.4 长列表性能指标

| 数据量 | 渲染策略 | 首屏渲染时间 | 滚动帧率 |
|--------|---------|:----------:|:------:|
| < 20 条 | 全部渲染 | < 100ms | 60fps |
| 20-100 条 | 无限滚动 + 全量 DOM | < 200ms | 55fps+ |
| 100-1000 条 | 虚拟滚动 | < 150ms | 60fps |
| > 1000 条 | 虚拟滚动 + 分页索引 | < 150ms | 60fps |

---

# 第十部分：实操传递强化（2026.06.14 四维审计补全）

## §38 Figma Variables 与 Design Tokens 映射

### 38.1 完整 Variables 定义

```
Figma Variable Collection: "YYC3 Dynasty"

├── Color/
│   ├── bg/primary          → #0a0e17 (玄墨)
│   ├── bg/secondary        → #1a1f2e (黛蓝)
│   ├── bg/tertiary         → #242b3d (深黛)
│   ├── text/primary        → #e5e7eb (霜白)
│   ├── text/secondary      → #9ca3af (墨灰)
│   ├── accent/gold         → #d4a843 (鎏金)
│   ├── accent/vermillion    → #c2414b (朱砂)
│   ├── accent/azure        → #3b82f6 (石青)
│   ├── accent/amber        → #f59e0b (藤黄)
│   ├── accent/emerald      → #10b981 (翠涛)
│   ├── accent/purple       → #8b5cf6 (绀紫)
│   └── semantic/success    → #10b981
│       semantic/warning    → #f59e0b
│       semantic/error      → #c2414b
│       semantic/info       → #3b82f6
│
├── Spacing/
│   ├── xs  → 4px
│   ├── sm  → 8px
│   ├── md  → 16px
│   ├── lg  → 24px
│   ├── xl  → 32px
│   ├── 2xl → 48px
│   └── 3xl → 64px
│
├── Radius/
│   ├── none    → 0px
│   ├── sm      → 4px
│   ├── md      → 8px
│   ├── lg      → 12px
│   ├── xl      → 16px
│   └── full    → 9999px
│
├── Typography/
│   ├── family/display   → "方正古隶", "思源宋体", serif
│   ├── family/body      → "Inter", "SF Pro", sans-serif
│   ├── family/mono      → "SF Mono", "JetBrains Mono", monospace
│   ├── size/yu-bi       → 48px (御笔)
│   ├── size/zhao-shu    → 32px (诏书标题)
│   ├── size/zou-zhang   → 20px (奏章标题)
│   ├── size/body        → 14px (朝议正文)
│   ├── size/caption     → 12px (注解小字)
│   └── weight/regular   → 400
│       weight/medium    → 500
│       weight/semibold  → 600
│       weight/bold      → 700
│       weight/heavy     → 900
│
├── Shadow/
│   ├── sm   → 0 1px 3px rgba(0,0,0,0.4)
│   ├── md   → 0 4px 12px rgba(0,0,0,0.5)
│   ├── lg   → 0 8px 32px rgba(212,168,67,0.3)
│   ├── xl   → 0 16px 48px rgba(0,0,0,0.6)
│   └── glow → 0 0 20px rgba(212,168,67,0.4)
│
├── Border/
│   ├── width/thin   → 1px
│   ├── width/base   → 2px
│   ├── color/default → rgba(212,168,67,0.15)
│   ├── color/active  → rgba(212,168,67,0.5)
│   └── color/error   → rgba(194,65,75,0.5)
│
└── Animation/
    ├── duration/fast     → 150ms
    ├── duration/normal   → 300ms
    ├── duration/slow     → 500ms
    ├── duration/seal     → 1200ms
    ├── easing/default    → cubic-bezier(0.4, 0, 0.2, 1)
    ├── easing/bounce     → cubic-bezier(0.34, 1.56, 0.64, 1)
    └── easing/decelerate → cubic-bezier(0, 0, 0.2, 1)
```

### 38.2 组件属性绑定规范

```
组件 → Variable 绑定规则:

1. DynastyButton (朝代按钮)
   ├─ background → Color/accent/gold (hover/active 态)
   ├─ border-color → Border/color/active
   ├─ text-color → Color/text/primary
   └─ border-radius → Radius/md

2. EdictStepBar (敕令阶段进度条)
   ├─ step-active-bg → Color/accent/emerald
   ├─ step-pending-bg → Color/bg/tertiary
   ├─ step-vetoed-bg → Color/accent/vermillion
   ├─ line-color → Border/color/default
   └─ spacing → Spacing/sm

3. SealChain (签章链)
   ├─ seal-size → 48px (固定)
   ├─ seal-gap → Spacing/md
   ├─ line-color → Color/accent/gold
   └─ verified-badge → Color/accent/emerald

4. NotificationCenter (通知中心)
   ├─ panel-bg → Color/bg/secondary
   ├─ item-hover-bg → Color/bg/tertiary
   ├─ badge-color → Color/accent/vermillion
   └─ border-radius → Radius/lg

5. SearchPalette (全局搜索)
   ├─ overlay-bg → rgba(0,0,0,0.7)
   ├─ input-bg → Color/bg/secondary
   ├─ result-highlight → Color/accent/gold
   └─ shadow → Shadow/xl

6. ToastNotification
   ├─ p0-bg → Color/accent/vermillion (烽火)
   ├─ p1-bg → Color/accent/amber (朝钟)
   ├─ p2-bg → Color/accent/azure (飞鸽)
   ├─ p3-bg → Color/bg/secondary (笺)
   └─ border-radius → Radius/md

7. MinistryCard (六部卡片)
   ├─ card-bg → Color/bg/secondary
   ├─ hover-shadow → Shadow/glow
   ├─ header-accent → 对应六部色彩变量
   └─ border-radius → Radius/lg

8. DynastyNavbar (全局导航栏)
   ├─ navbar-bg → rgba(10,14,23,0.95) (半透明玄墨)
   ├─ active-indicator → Color/accent/gold
   ├─ height → 56px (固定)
   └─ blur → backdrop-filter: blur(12px)
```

## §39 Figma Smart Animate 参数详表

### 39.1 玉玺盖章动效参数

```
Smart Animate 配置:
  ├─ Trigger: On Click (按钮点击)
  ├─ Action: Navigate to → "Sealing Frame"
  ├─ Animation: Smart Animate
  ├─ Duration: 1200ms
  ├─ Easing: Custom cubic-bezier(0.34, 1.56, 0.64, 1)
  └─ Match: Layer Name (玉玺组件各层命名一致)

关键帧状态:
  State 1: Idle (玉玺悬浮, opacity:0.6, y:0)
  State 2: Hover (玉玺放大, opacity:1, y:-8px)
  State 3: Pressed (玉玺下压, opacity:1, y:+8px, scale:1.05)
  State 4: Stamped (玉玺回弹, opacity:1, y:0, 印文浮现)
```

### 39.2 圣旨展开动效参数

```
Smart Animate 配置:
  ├─ Duration: 800ms
  ├─ Easing: Ease Out (cubic-bezier(0, 0, 0.2, 1))
  └─ Match: Layer Name

关键帧:
  State 1: Collapsed (width:60px, opacity:0.3)
  State 2: Unfurling (width:200px, opacity:0.7)
  State 3: Expanded (width:600px, opacity:1)
```

### 39.3 页面过渡动效参数

```
页面切换 Smart Animate:
  ├─ Duration: 400ms
  ├─ Easing: Ease In and Out
  └─ 过渡模式:
      ├─ P1→P2: 玉玺放大填满屏幕 → 淡出露出朝堂 (800ms)
      ├─ 页面间: 滑动推入 (Slide In Right → Left)
      ├─ 弹窗: 缩放上浮 (Scale 0.8→1, Opacity 0→1, Y +20→0)
      └─ 详情页: 从列表项位置展开 (Shared Element Transition)
```

### 39.4 天子驾六状态机动画

```
六马悬浮动效参数:

每匹马独立动画:
  ├─ Float Y: ±6px (垂直悬浮)
  ├─ Duration: 3-5s (每匹马周期不同, 营造自然感)
  ├─ Easing: Ease In and Out
  └─ Delay: 每匹马 stagger 0.3s

六马健康状态切换:
  ├─ Normal → Warning: 马身颜色渐变 (300ms), 马蹄微颤
  ├─ Warning → Error: 马身红色脉冲 (500ms × 2), 绳索闪烁
  ├─ Error → Normal: 马身恢复 (800ms), 金色粒子恢复
  └─ 全局刷新: 六马同时重置 (600ms, stagger 0.1s)
```

## §40 无障碍 (A11y) 标注规范

### 40.1 色彩对比度

```
WCAG 2.1 AA 标准合规:

| 元素组合 | 前景色 | 背景色 | 对比度 | 等级 |
|---------|--------|--------|--------|------|
| 正文/玄墨底 | #e5e7eb | #0a0e17 | 13.5:1 | AAA |
| 辅助文字/玄墨底 | #9ca3af | #0a0e17 | 6.2:1 | AA |
| 鎏金标题/玄墨底 | #d4a843 | #0a0e17 | 8.3:1 | AAA |
| 朱砂警告/玄墨底 | #c2414b | #0a0e17 | 5.1:1 | AA |
| 翠涛成功/黛蓝底 | #10b981 | #1a1f2e | 5.8:1 | AA |
| 绀紫/黛蓝底 | #8b5cf6 | #1a1f2e | 4.9:1 | AA |
| 石青链接/黛蓝底 | #3b82f6 | #1a1f2e | 4.8:1 | AA-large |
```

### 40.2 焦点指示器

```
Focus Ring 规范:
  ├─ 样式: 2px solid #d4a843 (鎏金)
  ├─ 偏移: outline-offset: 2px
  ├─ 圆角: 继承元素 border-radius
  └─ 可见性: :focus-visible 伪类 (键盘导航时显示, 鼠标点击不显示)

Tab 键导航顺序:
  1. DynastyNavbar → 主导航项 (L→R)
  2. 面包屑 → 当前页路径
  3. 页面主体 → 按 DOM 自然顺序
  4. 侧边快捷入口 → 上→下
  5. Footer/通知中心
```

### 40.3 屏幕阅读器标注

```
ARIA 标注规范:

1. DynastyNavbar
   <nav aria-label="朝堂导航">
     <ul role="menubar">
       <li role="menuitem" aria-current="page">朝堂</li>
     </ul>
   </nav>

2. EdictStepBar
   <div role="progressbar"
        aria-valuenow="3"
        aria-valuemin="1"
        aria-valuemax="7"
        aria-label="敕令流转进度: 第3阶段/共7阶段">

3. MinistryCard
   <article aria-label="户部运行状态: 正常">
     <span aria-hidden="true">💰</span>
     <span class="sr-only">户部: 度支正常, 赋税已入库</span>
   </article>

4. SealChain
   <ol aria-label="签章审批链">
     <li aria-label="中书省已签章, 永熙三年四月十五"></li>
     <li aria-label="门下省已签章, 永熙三年四月十七"></li>
     <li aria-label="尚书省待签章"></li>
   </ol>

5. Toast Notification
   <div role="alert" aria-live="assertive" aria-atomic="true">
     <!-- P0 紧急通知 -->
   </div>
   <div role="status" aria-live="polite" aria-atomic="true">
     <!-- P1-P3 常规通知 -->
   </div>

6. Search Palette
   <div role="search" aria-label="全局搜索">
     <input role="searchbox" aria-label="搜索敕令、朝代、技能...">
     <ul role="listbox" aria-label="搜索结果">
       <li role="option" aria-selected="true">结果项</li>
     </ul>
   </div>
```

### 40.4 键盘快捷键

```
键盘导航快捷键:

| 快捷键 | 作用域 | 功能 |
|--------|--------|------|
| ⌘K | 全局 | 唤起全局搜索面板 |
| ⌘/ | 全局 | 显示键盘快捷键帮助 |
| Esc | 全局 | 关闭弹窗/面板/搜索 |
| Tab | 全局 | 下一个可聚焦元素 |
| Shift+Tab | 全局 | 上一个可聚焦元素 |
| Enter | 全局 | 确认/激活当前元素 |
| Space | 全局 | 切换/展开当前元素 |
| ↑↓ | 列表/搜索 | 上下导航项目 |
| ←→ | 进度条/轮播 | 左右导航 |
| ⌘Z | 旨意工坊 | 撤销编辑 |
| ⌘Shift+Z | 旨意工坊 | 重做编辑 |
| ⌘S | 旨意工坊 | 保存草稿 |
| ⌘Enter | 表单 | 提交表单 |
| ⌘B | 旨意板 | 批量选择模式 |
| ⌘F | 旨意板 | 筛选面板 |
```

### 40.5 字体与可读性

```
可读性规范:
  ├─ 最小正文字号: 14px (朝议正文)
  ├─ 最小可交互元素尺寸: 44×44px (iOS 标准)
  ├─ 最小行高: 1.5 (正文)
  ├─ 最大行宽: 75ch (约 600px at 14px)
  ├─ 段落间距: Spacing/md (16px)
  └─ 文字缩放: 支持浏览器默认缩放至 200% 不截断
```

## §41 从 Figma 到代码的交接清单

### 41.1 设计交付包结构

```
YYC3-Dynasty-Design-Delivery/
├── figma-file/
│   └── YYC3-Dynasty-v1.0.fig
├── assets/
│   ├── icons/           # SVG 图标 (24×24, 48×48)
│   ├── illustrations/   # 插画 (龙纹、云纹、海水江崖)
│   ├── seals/           # 玉玺 SVG (多色态)
│   ├── patterns/        # 纹理 (回纹、汉砖纹)
│   └── fonts/           # 字体文件引用
├── tokens/
│   ├── colors.json      # 色彩 Token
│   ├── typography.json  # 字体 Token
│   ├── spacing.json     # 间距 Token
│   ├── shadows.json     # 阴影 Token
│   └── radii.json       # 圆角 Token
├── components/
│   ├── DynastyButton.spec.md
│   ├── EdictStepBar.spec.md
│   ├── MinistryCard.spec.md
│   ├── SealChain.spec.md
│   ├── DynastyNavbar.spec.md
│   └── SearchPalette.spec.md
├── pages/
│   ├── P1-Welcome.spec.md
│   ├── P2-CourtHall.spec.md
│   ├── P3-ThirteenDynasties.spec.md
│   ├── P4-MedalWall.spec.md
│   ├── P5-EdictWorkshop.spec.md
│   ├── P6-EdictBoard.spec.md
│   ├── P7-HubFloat.spec.md
│   ├── P8-DualStarBridge.spec.md
│   ├── P9-EdictDetail.spec.md
│   ├── P10-TaishiMonitor.spec.md
│   └── P11-PalaceRegulation.spec.md
├── animations/
│   ├── seal-stamping.json     # 玉玺盖章 Lottie
│   ├── scroll-unfurl.json     # 圣旨展开 Lottie
│   ├── dragon-glow.json       # 龙纹流光 Lottie
│   └── cloud-drift.json       # 云纹漂移 CSS
└── README.md                  # 交接说明
```

### 41.2 Design Token 导出格式

```json
{
  "collection": "YYC3 Dynasty",
  "tokens": {
    "color": {
      "bg": {
        "primary": { "$value": "#0a0e17", "$type": "color" },
        "secondary": { "$value": "#1a1f2e", "$type": "color" },
        "tertiary": { "$value": "#242b3d", "$type": "color" }
      },
      "text": {
        "primary": { "$value": "#e5e7eb", "$type": "color" },
        "secondary": { "$value": "#9ca3af", "$type": "color" }
      },
      "accent": {
        "gold": { "$value": "#d4a843", "$type": "color" },
        "vermillion": { "$value": "#c2414b", "$type": "color" },
        "azure": { "$value": "#3b82f6", "$type": "color" },
        "amber": { "$value": "#f59e0b", "$type": "color" },
        "emerald": { "$value": "#10b981", "$type": "color" },
        "purple": { "$value": "#8b5cf6", "$type": "color" }
      }
    },
    "typography": {
      "family": {
        "display": { "$value": "'方正古隶', '思源宋体', serif", "$type": "fontFamily" },
        "body": { "$value": "'Inter', 'SF Pro', sans-serif", "$type": "fontFamily" },
        "mono": { "$value": "'SF Mono', 'JetBrains Mono', monospace", "$type": "fontFamily" }
      },
      "size": {
        "yu-bi": { "$value": "48px", "$type": "fontSize" },
        "zhao-shu": { "$value": "32px", "$type": "fontSize" },
        "zou-zhang": { "$value": "20px", "$type": "fontSize" },
        "body": { "$value": "14px", "$type": "fontSize" },
        "caption": { "$value": "12px", "$type": "fontSize" }
      }
    },
    "spacing": {
      "xs": { "$value": "4px", "$type": "spacing" },
      "sm": { "$value": "8px", "$type": "spacing" },
      "md": { "$value": "16px", "$type": "spacing" },
      "lg": { "$value": "24px", "$type": "spacing" },
      "xl": { "$value": "32px", "$type": "spacing" },
      "2xl": { "$value": "48px", "$type": "spacing" },
      "3xl": { "$value": "64px", "$type": "spacing" }
    },
    "radius": {
      "none": { "$value": "0px", "$type": "borderRadius" },
      "sm": { "$value": "4px", "$type": "borderRadius" },
      "md": { "$value": "8px", "$type": "borderRadius" },
      "lg": { "$value": "12px", "$type": "borderRadius" },
      "xl": { "$value": "16px", "$type": "borderRadius" },
      "full": { "$value": "9999px", "$type": "borderRadius" }
    },
    "shadow": {
      "sm": { "$value": "0 1px 3px rgba(0,0,0,0.4)", "$type": "boxShadow" },
      "md": { "$value": "0 4px 12px rgba(0,0,0,0.5)", "$type": "boxShadow" },
      "lg": { "$value": "0 8px 32px rgba(212,168,67,0.3)", "$type": "boxShadow" },
      "xl": { "$value": "0 16px 48px rgba(0,0,0,0.6)", "$type": "boxShadow" },
      "glow": { "$value": "0 0 20px rgba(212,168,67,0.4)", "$type": "boxShadow" }
    }
  }
}
```

### 41.3 Figma Component Properties 完整定义

```
核心业务组件 Properties 规范:

1. EdictStepBar (敕令阶段进度条)
   ┌─────────────────────────────────────────────────────┐
   │ Property           │ Type           │ Values         │
   ├────────────────────┼────────────────┼────────────────┤
   │ Stage Count        │ Variant        │ 4 / 5 / 6 / 7  │
   │ Current Stage      │ Instance Swap  │ Step Node      │
   │ Stage 1-7 Status   │ Variant        │ ✅Done/🔄Active/⏳Pending/✕Vetoed │
   │ Show Timestamps    │ Boolean        │ true / false   │
   │ Orientation        │ Variant        │ Horizontal / Vertical │
   └─────────────────────────────────────────────────────┘

2. DynastyButton (朝代按钮)
   ┌─────────────────────────────────────────────────────┐
   │ Property           │ Type           │ Values         │
   ├────────────────────┼────────────────┼────────────────┤
   │ Dynasty            │ Text           │ "唐"/"汉"/"宋"...│
   │ State              │ Variant        │ Default/Hover/Active/Disabled/Selected │
   │ Has Skill Badge    │ Boolean        │ true / false   │
   │ Skill Count        │ Text           │ "12 Skills"    │
   │ Icon               │ Instance Swap  │ DynastyIcon    │
   └─────────────────────────────────────────────────────┘

3. MinistryCard (六部卡片)
   ┌─────────────────────────────────────────────────────┐
   │ Property           │ Type           │ Values         │
   ├────────────────────┼────────────────┼────────────────┤
   │ Ministry           │ Variant        │ 户/吏/兵/刑/工/礼 │
   │ Health Status      │ Variant        │ Normal/Warning/Error/Offline │
   │ Show Metrics       │ Boolean        │ true / false   │
   │ Expandable         │ Boolean        │ true / false   │
   │ Compact Mode       │ Boolean        │ true / false   │
   └─────────────────────────────────────────────────────┘

4. SealChain (签章链)
   ┌─────────────────────────────────────────────────────┐
   │ Property           │ Type           │ Values         │
   ├────────────────────┼────────────────┼────────────────┤
   │ Seal Count         │ Variant        │ 3 / 5 / 7      │
   │ Chain Direction    │ Variant        │ Horizontal / Vertical │
   │ Show Labels        │ Boolean        │ true / false   │
   │ Seal 1-7 Status    │ Variant        │ Signed/Pending/Vetoed │
   └─────────────────────────────────────────────────────┘

5. DynastyNavbar (全局导航栏)
   ┌─────────────────────────────────────────────────────┐
   │ Property           │ Type           │ Values         │
   ├────────────────────┼────────────────┼────────────────┤
   │ Active Nav Item    │ Variant        │ 朝堂/王朝/Skills/旨意 │
   │ Notification Count │ Text           │ "0" - "99+"    │
   │ Show Breadcrumb    │ Boolean        │ true / false   │
   │ Show Search        │ Boolean        │ true / false   │
   └─────────────────────────────────────────────────────┘

6. SearchPalette (全局搜索面板)
   ┌─────────────────────────────────────────────────────┐
   │ Property           │ Type           │ Values         │
   ├────────────────────┼────────────────┼────────────────┤
   │ Mode               │ Variant        │ Idle/Searching/Results/NoResults │
   │ Result Count       │ Text           │ "0" - "50"     │
   │ Show Categories    │ Boolean        │ true / false   │
   └─────────────────────────────────────────────────────┘
```

### 41.4 组件实例交换规范

```
Instance Swap 映射表:

1. 六部卡片 → 六部图标
   MinistryCard.HuBu    ↔ HuBuIcon (户部-度支)
   MinistryCard.LiBu    ↔ LiBuIcon (吏部-铨选)
   MinistryCard.BingBu  ↔ BingBuIcon (兵部-武备)
   MinistryCard.XingBu  ↔ XingBuIcon (刑部-律令)
   MinistryCard.GongBu  ↔ GongBuIcon (工部-营造)
   MinistryCard.LiBuHR  ↔ LiBuHRIcon (礼部-仪制)

2. 天子驾六 → 六匹马状态
   每匹马可独立交换 Normal/Warning/Error 状态

3. 玉玺 → 印章状态
   Seal.Idle     ↔ ImperialSeal/Idle
   Seal.Hover    ↔ ImperialSeal/Hover
   Seal.Pressing ↔ ImperialSeal/Pressing
   Seal.Stamped  ↔ ImperialSeal/Stamped
   Seal.Locked   ↔ ImperialSeal/Locked

4. 签章链 → 签章节点
   SealChain.ZhongShu  ↔ SealNode/Signed (中书省已签)
   SealChain.MenXia    ↔ SealNode/Pending (门下省待签)
   SealChain.ShangShu  ↔ SealNode/Vetoed (尚书省封驳)
```

### 41.5 响应式约束与 Auto Layout 策略

```
Auto Layout 策略:

1. 全局布局
   ┌─────────────────────────────────────────────┐
   │ DynastyNavbar (Fixed Top, H:56px)                    │
   ├─────────────────────────────────────────────┤
   │ Main Content Area                                   │
   │ ├─ Horizontal Auto Layout                           │
   │ │  ├─ 主内容区 (Fill Container, Min W:800px)        │
   │ │  └─ 侧边快捷入口 (Fixed W:48px, 仅P2)             │
   │ └─ Vertical Auto Layout                             │
   │    ├─ 面包屑 (H:32px)                               │
   │    └─ 页面内容 (Fill Container)                     │
   ├─────────────────────────────────────────────┤
   │ Footer (Fixed Bottom, H:32px)                       │
   └─────────────────────────────────────────────┘

2. 自适应断点
   ├─ 宽屏 (≥1440px): 三列网格布局
   ├─ 桌面 (1024-1439px): 两列网格布局
   ├─ 平板 (768-1023px): 单列 + 折叠侧栏
   └─ 移动 (≤767px): 单列 + 底部导航替代顶部导航

3. 卡片自适应
   ├─ MinistryCard: 固定宽度 320px, 高度自适应内容
   ├─ EdictCard: min-width 280px, 填充可用宽度
   ├─ DynastyButton: 最小 120px, 文字自适应
   └─ MedalCard: 固定 160×200px, 不缩放
```

### 41.6 导出命名规范与交付包

```
导出命名规范:

格式: {Section}_{Component}_{Variant}_{Size}@{Scale}x.{Format}

导出格式:
  ├─ 图标: SVG (矢量, 可缩放)
  ├─ 纹理/图案: PNG-24 (透明度保留)
  ├─ 插画: PNG-24 + SVG (备份)
  ├─ 组件缩略图: PNG-24 @2x
  └─ 动效: Lottie JSON + GIF 预览

交付检查清单:
  ├─ [ ] 所有 icons 导出 SVG @1x 和 @2x
  ├─ [ ] 所有纹理 tile 导出 PNG @1x
  ├─ [ ] 玉玺各状态 SVG 导出 (5 variants)
  ├─ [ ] 圣旨组件各状态 PNG 导出 (3 states)
  ├─ [ ] 六部卡片各状态 PNG 导出 (6 ministries × 4 states)
  ├─ [ ] Design Tokens JSON 导出
  ├─ [ ] 组件规格文档 Markdown 导出
  ├─ [ ] A11y 标注文档导出
  ├─ [ ] Smart Animate 参数 JSON 导出
  └─ [ ] 交接说明 README.md
```

---

# 第十一部分：逻辑认证与风险防控（2026.06.14 四维审计补全）

## §42 全链路逻辑一致性校验

### 42.1 旨意流转全链路校验

```
校验流程: 创建 → 分拣 → 草拟 → 审议 → 派发 → 执行 → 归档

校验规则:
  ├─ 阶段不可跳跃 (1→2→3→4→5→6→7 顺序流转)
  ├─ 阶段不可回退 (除"封驳"回到阶段1重拟外)
  ├─ 审议需三省签章齐全 (中书+门下+尚书) 方可进入派发
  ├─ 每个阶段变更需记录流转日志 (时间+操作人+内容)
  └─ 归档后数据不可修改 (只读状态)
```

### 42.2 页面间数据一致性

```
数据一致性校验矩阵:

同步策略:
  ├─ edictStore: 全局 Zustand Store, 各页面引用同一实例
  ├─ 写后广播: 修改 edict 后 emit('edict:updated', {id, changes})
  ├─ 乐观更新: 先更新 UI, 后异步确认 (失败回滚)
  └─ 跨标签页: BroadcastChannel + 版本号比对
```

## §43 性能与安全规范

### 43.1 性能预算

```
性能指标:

| 指标 | 目标值 | 测量工具 |
|------|--------|---------|
| FCP (First Contentful Paint) | < 1.5s | Lighthouse |
| LCP (Largest Contentful Paint) | < 2.5s | Lighthouse |
| TBT (Total Blocking Time) | < 200ms | Lighthouse |
| CLS (Cumulative Layout Shift) | < 0.1 | Lighthouse |
| TTI (Time to Interactive) | < 3.5s | Lighthouse |
| 首页 JS Bundle | < 150KB (gzip) | Webpack Analyzer |
| 图片总大小 | < 500KB (首页) | Network Tab |

优化策略:
  ├─ 路由懒加载: 11 页均使用 dynamic import
  ├─ 图片优化: WebP 格式 + 响应式 srcset
  ├─ 字体子集化: 提取仅用到的古文字符
  ├─ SSG 预渲染: P1/P2/P3 首屏静态生成
  └─ ISR 增量再生: P6 旨意板每 60s 重新验证
```

### 43.2 安全规范

```
安全防护层级:

├─ XSS 防护:
│  ├─ 所有用户输入经 DOMPurify 清洗
│  ├─ dangerouslySetInnerHTML 全面禁用
│  └─ Content-Security-Policy 头部配置
│
├─ CSRF 防护:
│  ├─ 玉玺 Token (JWT) 双 cookie 验证
│  ├─ SameSite=Strict Cookie
│  └─ 关键操作需玉玺二次确认 (Re-auth)
│
├─ 权限控制:
│  ├─ RBAC: 天子 > 太子 > 三省 > 六部 > 朝臣
│  ├─ 路由守卫: 各页面 meta.permission 验证
│  ├─ API 鉴权: 每个请求携带 Seal-Token
│  └─ 操作审计: 太史监候 (P10) 记录所有敏感操作
│
├─ 数据加密:
│  ├─ 传输层: TLS 1.3
│  ├─ 存储层: AES-256-GCM 加密 (敏感字段)
│  └─ 令牌: 玉玺 JWT 含签名 + 过期时间
│
└─ 依赖安全:
   ├─ pnpm audit 每周执行
   ├─ Dependabot 自动 PR
   └─ 锁定文件: pnpm-lock.yaml 提交至仓库
```

## §44 边界场景与异常处理

### 44.1 边界场景矩阵

```
边界场景全覆盖:

| 场景类型 | 具体场景 | 处理策略 | 涉及页面 |
|---------|---------|---------|---------|
| 空状态 | 无敕令 | 显示空状态插画+引导创建 | P6 |
| 空状态 | 无朝代 Skill | "待开疆拓土"占位 | P3/P8 |
| 空状态 | 无通知 | "朝堂无事,四海升平" | 通知中心 |
| 空状态 | 无搜索结果 | "未找到匹配的敕令/朝代" | 搜索面板 |
| 加载中 | 数据请求 | Skeleton 加载骨架屏 | P2/P6/P3 |
| 加载中 | 圣旨展开 | 卷轴逐段渲染动画 | P5/P9 |
| 加载中 | 玉玺盖章 | 章印逐字浮现 | P5 |
| 错误 | API 请求失败 | 重试按钮 + "驿马失蹄"提示 | 全局 |
| 错误 | 网络断开 | "朝堂通讯中断"横幅 + 离线模式 | 全局 |
| 错误 | 权限不足 | "宫门紧闭"页面 | 全局 |
| 错误 | 敕令不存在 | "此旨已佚"页面 | P9 |
| 极限 | 10000+ 条敕令 | 虚拟滚动 + 分页索引 | P6 |
| 极限 | 同时 50+ Toast | 队列限制 + 折叠 | 全局 |
| 极限 | 多标签页同时操作 | 版本冲突检测 + 提示刷新 | 全局 |
| 特殊 | 封驳流转 | 驳回至阶段1, 保留驳回原因 | P5/P6 |
| 特殊 | 会话过期 | 玉玺令牌失效 → P1 重鉴 | 全局 |
| 特殊 | 首次访问 | 引导动画 + P1→P2 过渡 | P1 |
| 特殊 | 会话锁定 | 锁定遮罩 + 玉玺解锁 | P1/P2 |
```

### 44.2 错误边界组件

```
ErrorBoundary 三级架构:

┌──────────────────────────────────────────────────┐
│ L1: 全局错误边界 (RootLayout)                             │
│   ├─ 捕获未处理的 React 渲染错误                          │
│   ├─ 显示"紫微城震动"全屏错误页                           │
│   └─ 提供"重启朝会"按钮（reload）                         │
├──────────────────────────────────────────────────┤
│ L2: 页面级错误边界 (每个 Page 独立)                       │
│   ├─ 捕获页面内组件渲染错误                               │
│   ├─ 显示该页面的 Error 态 UI                             │
│   ├─ 其他页面不受影响，可正常导航                         │
│   └─ 提供"重置此页"按钮（局部 remount）                   │
├──────────────────────────────────────────────────┤
│ L3: 组件级错误边界 (关键业务组件)                         │
│   ├─ EdictStepBar / SealChain / MinistryCard 等          │
│   ├─ 显示组件 Fallback UI（简化版）                       │
│   └─ 不影响页面其他区域渲染                               │
└──────────────────────────────────────────────────┘

全屏错误页 (紫微城震动):
┌──────────────────────────────────────────────────────────┐
│                                                          │
│                     ⚡ 紫微城震动                          │
│                                                          │
│           紫微城中枢出现未知紊乱，朝会暂时中断             │
│                                                          │
│    错误详情: TypeError: Cannot read property              │
│    发生时间: 永熙三年·午时三刻                              │
│    错误编号: ERR-B7F3A2                                   │
│                                                          │
│              [重启朝会]  [返回安全模式]                    │
│                                                          │
│    自动恢复倒计时: 10s 后自动重启...                       │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 44.3 离线与弱网策略

```
网络状态处理:

├─ 在线检测:
│  ├─ navigator.onLine + 心跳检测 (/api/ping, 15s 间隔)
│  └─ 状态: Online / Offline / Slow (RTT > 2s)
│
├─ 离线 UI:
│  ├─ 顶部横幅: "与朝堂通讯中断" (琥珀色, 固定顶部)
│  ├─ PWA Service Worker 缓存静态资源
│  └─ IndexedDB 缓存最近 50 条敕令数据
│
├─ 弱网策略:
│  ├─ 请求超时: 10s, 超时自动重试 (最多 3 次)
│  ├─ 重试间隔: 指数退避 (1s, 2s, 4s)
│  └─ 离线操作队列: 旨意创建/状态变更排队, 恢复后同步
│
└─ PWA 离线页:
   ├─ 展示已缓存的敕令列表 (只读)
   ├─ 展示已缓存的十三王朝 Skill
   └─ "当前为离线模式，部分功能不可用" 提示
```

## §45 版本管理与迭代规划

### 45.1 版本定义

```
版本号格式: v{major}.{minor}.{patch}-{stage}

v1.0 MVP 范围:
  ├─ 11 页完整功能
  ├─ 全局导航 + 路由系统
  ├─ 旨意创建→流转→归档 闭环
  ├─ 天子驾六状态机
  ├─ 十三王朝 Skill 矩阵
  ├─ 签章链审批流
  ├─ 通知中心 + 搜索系统
  ├─ 无障碍 AA 标准
  ├─ 基础错误处理
  └─ 性能预算达标

v1.1 增强:
  ├─ i18n 古风时辰
  ├─ 暗色模式切换
  ├─ 更丰富的动画效果
  ├─ 快捷键自定义
  └─ 数据导出 (CSV/JSON)
```

### 45.2 Figma 版本分支策略

```
Figma 分支策略:

main (生产分支)
├── develop (开发分支)
│   ├── feature/p9-edict-detail    → P9 敕令详情
│   ├── feature/p10-taishi-monitor → P10 太史监候
│   ├── feature/p11-palace-reg     → P11 宫阙规制
│   ├── feature/navbar-v2          → 导航栏优化
│   └── feature/a11y-enhance      → 无障碍增强
├── release/v1.0.0-beta
└── release/v1.0.0

合并规则:
  ├─ feature → develop: 设计师自审 + 设计评审
  ├─ develop → release: 全部页面设计走查 + 交互原型测试
  └─ release → main: PM 签字 + 开发交接确认
```

### 45.3 设计变更追溯

```
变更日志格式:

---
version: 1.0.0-beta.4
date: 2026-06-14
author: 设计团队
changes:
  - type: addition
    scope: P9 敕令详情
    description: 新增敕令详情页，含圣旨完整展示+签章链
  - type: addition
    scope: P10 太史监候
    description: 新增系统监控面板，含六部健康+天象日志
  - type: addition
    scope: P11 宫阙规制
    description: 新增系统设置面板，含权限控制+典章查阅
  - type: fix
    scope: P2/P6
    description: 统一阶段数为 7 (下旨→分拣→草拟→审议→派发→执行→归档)
  - type: enhancement
    scope: 全局导航
    description: 补全路由守卫、深链接、面包屑、通知中心
  - type: enhancement
    scope: 全文档
    description: 消除重复内容, 统一11页系统, 补全编程闭环关键节
---
```

### 45.4 API 契约定义

```
核心 API 契约:

1. 敕令 CRUD
   GET    /api/edicts              → EdictList        (列表)
   GET    /api/edicts/:id          → EdictDetail      (详情)
   POST   /api/edicts              → Edict             (创建)
   PATCH  /api/edicts/:id          → Edict             (更新)
   DELETE /api/edicts/:id          → {success: bool}   (删除)

2. 敕令流转
   POST /api/edicts/:id/advance    → Edict             (推进到下一阶段)
   POST /api/edicts/:id/veto       → Edict             (封驳退回)

3. 六部健康
   GET /api/ministries/health      → MinistryHealth[]  (六部状态)
   GET /api/ministries/:id/metrics → MinistryMetrics   (单部指标)

4. 通知
   GET /api/notifications          → Notification[]    (通知列表)
   PATCH /api/notifications/:id/read → Notification    (标记已读)
   POST /api/notifications/read-all → {success: bool}  (全部已读)

5. 认证
   POST /api/auth/verify-seal      → {token, expires}  (玉玺验证)
   POST /api/auth/refresh          → {token}            (令牌刷新)

6. 搜索
   GET /api/search?q={query}&type={type} → SearchResult[] (全局搜索)

错误响应格式:
{
  "error": {
    "code": "EDICT_NOT_FOUND",
    "message": "此旨已佚，或从未存在",
    "details": { "id": "999" }
  }
}
```

### 45.5 测试场景矩阵

```
测试场景覆盖:

┌────────────────────────────────────────────────────────┐
│ 场景分类     │ 场景                         │ 优先级    │
├──────────────┼─────────────────────────────┼───────────┤
│ 正向流       │ 创建旨意→完整7阶段流转→归档 │ P0        │
│ 正向流       │ 朝代切换→Skill列表正确更新   │ P0        │
│ 正向流       │ 六部健康状态实时刷新         │ P0        │
│ 正向流       │ 玉玺盖章完整5阶段动画       │ P1        │
│ 正向流       │ 全局搜索→精确匹配→跳转      │ P0        │
│ 正向流       │ 通知推送→导航栏角标→已读    │ P1        │
│ 逆向流       │ 封驳→退回阶段1→重新流转     │ P0        │
│ 逆向流       │ 旨意删除→列表移除→撤销恢复  │ P1        │
│ 边界         │ 空列表状态正确展示           │ P1        │
│ 边界         │ 10000+条数据虚拟滚动        │ P2        │
│ 边界         │ 网络断开→离线模式→恢复同步  │ P1        │
│ 边界         │ 同时50+Toast队列管理        │ P2        │
│ 异常         │ API超时→重试→失败提示       │ P0        │
│ 异常         │ 权限不足→宫门紧闭页面       │ P1        │
│ 异常         │ 组件渲染错误→Error Boundary │ P1        │
│ 异常         │ 令牌过期→重新验证           │ P0        │
│ 兼容         │ Chrome/Firefox/Safari/Edge  │ P0        │
│ 兼容         │ 桌面/平板/移动端响应式      │ P1        │
│ 兼容         │ 屏幕阅读器 (VoiceOver)      │ P2        │
│ 无障碍       │ Tab键完整导航流             │ P1        │
│ 无障碍       │ 色彩对比度AA级达标          │ P1        │
│ 无障碍       │ 200%缩放不截断             │ P2        │
└────────────────────────────────────────────────────────┘
```

### 45.6 WebSocket 实时通信

```
WebSocket 连接规范:

连接端点: wss://dynasty.yyc3.com/ws
协议: JSON 帧

心跳机制:
  ├─ Ping 间隔: 30s
  ├─ Pong 超时: 10s (超时自动重连)
  └─ 重连策略: 指数退避 1s, 2s, 4s, 8s, 16s, 最多 5 次

消息类型:
  ├─ edict:update     → 敕令状态变更广播
  ├─ ministry:health  → 六部健康状态推送
  ├─ notification:new → 新通知推送
  ├─ seal:revoke      → 令牌吊销通知 (强制登出)
  └─ system:announce  → 系统公告

连接生命周期:
  ├─ 连接建立: 发送 auth 帧 (玉玺 Token)
  ├─ 订阅频道: [edict, ministry, notification, system]
  ├─ 断开重连: 指数退避, 重连后重新订阅
  └─ 页面休眠: Page Visibility API, 隐藏时降级为轮询 (60s)
```

---

# 第十二部分：交付与验收

## §26 四道核心校验规则

### 26.1 第一道：文化校验

```
校验清单:

├─ 玉玺系统:
│  ├─ [ ] 玉玺外观符合"受命于天·既寿永昌"规制
│  ├─ [ ] 盖章动效5个阶段完整
│  ├─ [ ] 玉玺使用场景正确
│  └─ [ ] 无权限时显示灰白锁定态
│
├─ 圣旨系统:
│  ├─ [ ] 明黄丝绢底色 + 左右龙纹织锦镶边
│  ├─ [ ] 天头蓝绫 (40px) + 地头蓝绫 (30px)
│  ├─ [ ] 正文竖排从右向左
│  ├─ [ ] 卷轴木杆檀木色 + 鎏金轴头
│  └─ [ ] 展开动画完整 (收起60px → 展开600px)
│
├─ 三省六部:
│  ├─ [ ] 中书省(石青) / 门下省(藤黄) / 尚书省(翠涛)
│  ├─ [ ] 六部图标与职能对应正确
│  └─ [ ] 朝堂中轴线(洛水)贯穿全局
│
├─ 十三王朝:
│  ├─ [ ] 13个朝代顺序正确
│  ├─ [ ] 每个朝代对应正确的都城
│  └─ [ ] 朝代色彩符合历史意象
│
└─ 天子驾六:
   ├─ [ ] 六匹马对应六部
   ├─ [ ] 每匹马独立悬浮动画 (stagger 0.3s)
   └─ [ ] 健康状态 Normal/Warning/Error 可切换
```

### 26.2 第二道：交互校验

```
交互校验清单:

├─ 导航:
│  ├─ [ ] 4个主导航项
│  ├─ [ ] 面包屑路径正确
│  ├─ [ ] 侧边快捷入口可用
│  ├─ [ ] 路由守卫鉴权正常
│  └─ [ ] 深链接支持完整
│
├─ 表单:
│  ├─ [ ] 敕令创建表单校验完整
│  ├─ [ ] 错误提示即时反馈
│  └─ [ ] 草稿自动保存
│
├─ 流转:
│  ├─ [ ] 7阶段顺序流转不可跳跃
│  ├─ [ ] 封驳功能退回阶段1
│  ├─ [ ] 审批签章链实时更新
│  └─ [ ] 归档后不可修改
│
├─ 通知:
│  ├─ [ ] Toast 四级优先级正确
│  ├─ [ ] 导航栏角标实时更新
│  ├─ [ ] 通知中心下拉面板可用
│  └─ [ ] P0 通知可插队
│
├─ 搜索:
│  ├─ [ ] ⌘K 唤起/关闭搜索面板
│  ├─ [ ] 实时过滤结果
│  ├─ [ ] 键盘上下导航
│  └─ [ ] 搜索结果点击跳转
│
└─ 批量操作:
   ├─ [ ] ⌘B 进入批量模式
   ├─ [ ] 多选 + 全选
   └─ [ ] 批量催办/封驳/归档
```

### 26.3 第三道：视觉校验

```
视觉校验清单:

├─ 色彩: 玄墨底色, 鎏金强调, 朱砂警示, 翠涛成功
├─ 字体: 御笔48px, 诏书32px, 奏章20px, 正文14px
├─ 间距: 遵循 xs/sm/md/lg/xl/2xl/3xl 规范
├─ 圆角: 卡片 lg(12px), 按钮 md(8px), 徽章 full
├─ 阴影: 玉玺 lg shadow (0 8px 32px gold)
├─ 纹理:
│  ├─ [ ] 云纹背景底纹 (rgba(212,168,67,0.04))
│  ├─ [ ] 回纹卡片边框 (2px, rgba(212,168,67,0.3))
│  ├─ [ ] 龙纹 Hero 暗纹 (rgba(212,168,67,0.06))
│  └─ [ ] 汉砖纹 Footer (错缝排列)
├─ 动效:
│  ├─ [ ] 玉玺盖章 (1.2s, 5 phases)
│  ├─ [ ] 圣旨展开 (0.8s, ease-out)
│  ├─ [ ] 页面过渡 (0.4s, slide)
│  ├─ [ ] 龙纹流光 (3s 循环)
│  └─ [ ] 云纹漂移 (30s 循环)
└─ 暗色模式 (v1.1):
   └─ [ ] 所有色彩有对应的暗色模式变量
```

### 26.4 第四道：工程校验

```
工程校验清单:

├─ 性能: FCP<1.5s, LCP<2.5s, TBT<200ms, CLS<0.1
├─ 安全: XSS/CSRF/RBAC/TLS/加密 五层防护
├─ 兼容: Chrome/Firefox/Safari/Edge
├─ 响应式: 桌面/平板/移动 三断点
├─ 无障碍: 色彩对比度AA, Tab导航, 屏幕阅读器
├─ 测试: 正向流/逆向流/边界/异常 场景覆盖
├─ 导出: Figma Assets + Tokens + Specs 完整交付包
└─ 版本: v1.0.0 范围明确, v1.1 规划清晰
```

---

## §27 Figma 交付规范

### 27.1 文件结构

```
YYC3-Dynasty-v1.0.fig

├── 📄 Cover (封面页)
├── 📐 Design System (设计系统)
│   ├── 🎨 Colors / 🔤 Typography / 📏 Spacing / 🔲 Radius / 🌑 Shadows
│   ├── 📐 Grid (网格系统)
│   └── 🎭 Patterns (纹样库)
├── 🧩 Components (组件库)
│   ├── Navigation (DynastyNavbar / Breadcrumb / SideQuickEntry)
│   ├── Imperial (ImperialSeal / EdictScroll)
│   ├── Data Display (MinistryCard / EdictStepBar / SealChain / DynastyButton / MedalCard)
│   ├── Feedback (Toast / NotificationCenter / SearchPalette / LoadingSkeleton)
│   └── Form (DynastyInput / DynastySelect / DynastyTextarea)
├── 📱 Pages (11 页面)
│   ├── P1-Welcome → P11-PalaceRegulation
├── 🔄 Flows (交互流程)
│   ├── Edict Lifecycle / Navigation Map / Error States
└── 📋 Handoff (开发交接)
    ├── Design Tokens (JSON) / Asset Export / Component Specs
```

### 27.2 页面状态矩阵

```
每页需覆盖的状态:

| 页面 | Default | Loading | Empty | Error | Edge |
|------|:-------:|:-------:|:-----:|:-----:|:----:|
| P1 启动 | ✅ | ✅ | - | - | - |
| P2 朝堂 | ✅ | ✅ | ✅ | ✅ | ✅ |
| P3 王朝 | ✅ | ✅ | ✅ | - | - |
| P4 勋章 | ✅ | - | ✅ | - | - |
| P5 工坊 | ✅ | - | - | ✅ | ✅ |
| P6 旨意板 | ✅ | ✅ | ✅ | ✅ | ✅ |
| P7 Hub | ✅ | - | ✅ | - | - |
| P8 双星桥 | ✅ | ✅ | ✅ | - | - |
| P9 敕令详情 | ✅ | ✅ | - | ✅ | - |
| P10 太史 | ✅ | ✅ | - | - | - |
| P11 宫阙 | ✅ | - | - | - | - |
```

---

## §28 验收闭环清单（v1.0 四维扩展版）

### 页面完整性（11 页）

- [ ] P1 启动页：玉玺落下动效 + 9 入口卡片（3×3 网格）
- [ ] P2 朝堂大厅：8 节点 + 中轴线光带 + 天子驾六悬浮 + 侧边快捷入口
- [ ] P3 十三王朝：13 朝代选择器 + Skill 卡片矩阵
- [ ] P4 勋章墙：17 勋章 × 2 态（获得/未获得）
- [ ] P5 旨意工坊：圣旨展开 + 玉玺盖章完整动效 + 表单校验 + 存草稿
- [ ] P6 旨意板：敕令列表 + 7 阶段进度条 + 流转日志 + 分页排序
- [ ] P7 Hub 浮窗：浮动按钮 + 展开面板 + 12 人格切换 + 对话历史
- [ ] P8 双星桥：Family 圆环 + Dynasty 层级 + 桥接金线
- [ ] P9 敕令详情：圣旨完整展示 + 七阶段进度 + 签章链 + 流转日志
- [ ] P10 太史监候：系统监控面板 + 六部健康 + 实时天象日志
- [ ] P11 宫阙规制：系统设置面板 + 权限控制 + 典章查阅
- [ ] 全局导航：DynastyNavbar + 面包屑 + 通知中心下拉面板

### 链路衔接验收（6 项）

- [ ] 全局导航栏：4 个主导航项 + 面包屑 + 侧边快捷入口
- [ ] 完整路由表：11 条路由（含参数传递 + 权限校验）
- [ ] 数据流闭环：旨意创建→流转→归档 全链路跨页面同步
- [ ] 全局状态管理：5 个 Store（edict/ministry/persona/dynasty/notification）
- [ ] 通知系统：三级体系（朝钟/飞鸽/烽火）+ 导航栏角标 + Toast + 通知中心
- [ ] 全局搜索：⌘K 唤起 + 实时过滤 + 分类结果 + 键盘导航

### 功能交互验收（8 项）

- [ ] 表单校验：敕令创建表单完整校验 + 即时错误反馈
- [ ] CRUD 闭环：敕令创建→查询→更新→删除 全操作 + 乐观更新
- [ ] Keyboard 快捷键：⌘K 搜索 / ⌘Z 撤销 / ⌘S 保存 / ⌘B 批量 等
- [ ] 实时更新：WebSocket 推送 + 六部健康 / 通知实时刷新
- [ ] Toast 队列：P0-P3 四级优先级 + 插队 + 合并 + 队列上限
- [ ] 自动保存：旨意草稿 5s 防抖保存 + 离线队列
- [ ] 撤销/重做：20 步操作栈 + 批量撤销
- [ ] 批量操作：⌘B 多选模式 + 全选 + 批量催办/封驳/归档

### 实操传递验收（6 项）

- [ ] Figma Variables：10 组 Collection 完整定义
- [ ] Smart Animate：玉玺/圣旨/页面过渡参数完整
- [ ] A11y 标注：对比度 + Focus Ring + ARIA + 键盘导航
- [ ] 交付包：Assets + Tokens JSON + Component Specs + Animations
- [ ] Component Properties：6 个核心组件完整 Variant/Boolean/Text/Instance Swap 属性
- [ ] 响应式约束：3 断点 + Auto Layout 策略

### 逻辑认证验收（7 项）

- [ ] 全链路一致性：旨意 7 阶段流转 + 页面间数据同步 + 朝代-Skill 映射
- [ ] 性能预算：FCP<1.5s + LCP<2.5s + TBT<200ms
- [ ] 安全防护：XSS/CSRF/RBAC/TLS/加密 五层防护
- [ ] 边界场景：空/加载/错误/极限 16+ 场景覆盖
- [ ] 错误恢复：三级 ErrorBoundary + 离线策略 + 弱网重试
- [ ] API 契约：6 个核心 API 组 + 标准错误格式
- [ ] 测试矩阵：正向/逆向/边界/异常/兼容/无障碍 20+ 场景

---

# 附录

## 附录 A：快速索引

### 页面索引

| 编号 | 页面名称 | 古称 | 路由 | Figma Frame |
|------|---------|------|------|-------------|
| P1 | 启动页 | 验玺 · 启封 | /welcome | P1-Welcome |
| P2 | 朝堂大厅 | 紫微城 · 正衙 | /court | P2-CourtHall |
| P3 | 十三王朝 | 历代舆图 | /timeline | P3-ThirteenDynasties |
| P4 | 勋章墙 | 麒麟阁 | /honors | P4-MedalWall |
| P5 | 旨意工坊 | 中书省 · 草诏 | /edict/create | P5-EdictWorkshop |
| P6 | 旨意板 | 尚书省 · 行牒 | /edict | P6-EdictBoard |
| P7 | Hub 浮窗 | 万象枢 | /hub | P7-HubFloat |
| P8 | 双星桥 | 星汉桥 | /bridge | P8-DualStarBridge |
| P9 | 敕令详情 | 御览 · 敕牒 | /edict/:id | P9-EdictDetail |
| P10 | 太史监候 | 司天监 | /monitor | P10-TaishiMonitor |
| P11 | 宫阙规制 | 紫微城 · 规制 | /settings | P11-PalaceRegulation |

### 部门索引

| 部门 | 古称 | 色彩 | 职能 | 对应马 |
|------|------|------|------|--------|
| 中书省 | 凤阁 | 石青 #3b82f6 | 决策草拟 | - |
| 门下省 | 鸾台 | 藤黄 #f59e0b | 审议封驳 | - |
| 尚书省 | 文昌府 | 翠涛 #10b981 | 执行派发 | - |
| 户部 | 度支 | 鎏金 | 财政经济 | 骅骝 (赤马) |
| 吏部 | 铨选 | 霜白 | 考核任免 | 騄駬 (白马) |
| 兵部 | 武备 | 朱砂 | 军政国防 | 骊驹 (黑马) |
| 刑部 | 律令 | 墨灰 | 司法刑狱 | 騑騑 (灰马) |
| 工部 | 营造 | 古铜 | 工程建造 | 骐骥 (棕马) |
| 礼部 | 仪制 | 绀紫 | 礼仪外交 | 騋牝 (紫马) |

### 组件索引

| 组件 | 类型 | 使用页面 |
|------|------|---------|
| ImperialSeal | 玉玺组件 | P1/P5/P9/全局 |
| EdictScroll | 圣旨卷轴 | P5/P9 |
| DynastyNavbar | 全局导航 | 所有页面 |
| MinistryCard | 六部卡片 | P2 |
| EdictStepBar | 阶段进度条 | P6/P9 |
| SealChain | 签章链 | P6/P9 |
| DynastyButton | 朝代按钮 | P3/P8 |
| MedalCard | 勋章卡片 | P4 |
| SearchPalette | 搜索面板 | 全局 |
| NotificationCenter | 通知中心 | 全局 |
| Toast | 通知提示 | 全局 |
| Breadcrumb | 面包屑 | 所有页面 |
| SideQuickEntry | 侧边快捷入口 | P2 |

## 附录 B：图例说明

```
═══════════════════════════════════════════════════════
                    YYC³ Dynasty 图例
═══════════════════════════════════════════════════════

结构标记:
  #                → 一级标题 (Part)
  ##               → 二级标题 (Section / §)
  ###              → 三级标题 (Sub-section)
  ├─ └─            → 树形结构
  ┌─┐└─┘├─┤        → 面板/UI区域

状态标记:
  ✅               → 已完成/通过
  🔄               → 进行中
  ⏳               → 待办/等待
  ✕                → 拒绝/驳回
  ⚡               → 紧急/告警

色彩标记:
  #d4a843 (鎏金)   → 强调/主要动作
  #c2414b (朱砂)   → 驳回/警告/删除
  #10b981 (翠涛)   → 成功/通过
  #3b82f6 (石青)   → 信息/链接
  #f59e0b (藤黄)   → 审议/待处理
  #8b5cf6 (绀紫)   → 天子/最高权限
```

## 附录 C：文档维护日志

| 日期 | 版本 | 变更内容 | 作者 |
|------|------|---------|------|
| 2026.06.14 | v1.0-beta.1 | 初始创建，8页核心页面+Figma Make提示词 | YYC³ |
| 2026.06.14 | v1.0-beta.2 | 四维审计补全：链路衔接+功能交互+实操传递+逻辑认证 | YYC³ |
| 2026.06.14 | v1.0-beta.3 | 新增P9/P10/P11三页+统一阶段数为7 | YYC³ |
| 2026.06.14 | v1.0-beta.4 | 消除重复内容+统一11页系统+补全编程闭环关键节 | YYC³ |
| 2026.06.14 | v1.0-beta.5 | 全链路最终一致性审核：路由表补全P7+附录A路由统一 | YYC³ |

---

> **三省以治，六部以行** — Rule with Three Councils, Execute with Six Ministries
> **言启象限 | 语枢未来** — Words Initiate Quadrants, Language Serves as Core
> **人从众曌众从人** 🌹
