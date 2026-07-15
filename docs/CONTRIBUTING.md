---
file: CONTRIBUTING.md
description: YYC³ Dynasty 贡献指南
author: YanYuCloudCube Team
version: v1.0.1
created: 2026-07-12
updated: 2026-07-16
status: stable
tags: [contributing],[guide]
category: guide
audience: developers
complexity: basic
---

# 贡献指南

> **_YanYuCloudCube_**
> _言启象限 | 语枢未来_

---

## 开发环境准备

### 前置要求

- Node.js >= 18
- pnpm >= 8

### 快速开始

```bash
# 克隆项目
git clone https://github.com/YYC-Cube/YYC3-Dynasty.git
cd YYC3-Dynasty

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

## 代码规范

### 文件标头

所有源文件必须包含标准 JSDoc 标头：

```typescript
/**
 * file: 文件名.tsx
 * description: 文件描述
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: YYYY-MM-DD
 * updated: YYYY-MM-DD
 * status: active
 * tags: [tag1],[tag2]
 */
```

### 命名规范

| 对象 | 规范 | 示例 |
|------|------|------|
| 组件文件 | PascalCase.tsx | `EdictBoard.tsx` |
| Hook 文件 | camelCase.ts | `useWebSocket.ts` |
| 工具函数 | camelCase.ts | `formatDate.ts` |
| 样式文件 | kebab-case.css | `theme.css` |

### 组件模式

| 模式 | 示例 |
|------|------|
| XxxPanel | `MonitorPanel` |
| XxxPage | 路由级组件 |
| XxxModal | `TaskModal` |
| XxxCard | `MinistryCard` |

## 提交流程

### Commit 规范

遵循 Conventional Commits：

```
<type>(<scope>): <subject>

type: feat | fix | docs | style | refactor | test | chore
```

### 分支策略

```
main → 生产
  └── develop → 开发
        ├── feature/*
        ├── bugfix/*
        └── refactor/*
```

## 审核清单

提交 PR 前检查：

- [ ] JSDoc 文件头完整
- [ ] TypeScript 严格模式无错误
- [ ] ESLint 规则全部通过
- [ ] 组件命名符合规范
- [ ] 无循环依赖
- [ ] 无硬编码密钥
- [ ] 测试覆盖率达标
