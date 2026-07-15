/**
 * file: vite-env.d.ts
 * description: Vite 环境变量类型声明
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-07-12
 * updated: 2026-07-12
 * status: active
 * tags: [config],[types],[vite]
 *
 * brief: Vite 客户端类型声明，提供 import.meta.env 类型支持
 *
 * details:
 * - 声明 VITE_API_URL 环境变量类型
 * - 声明 VITE_STRICT_API 环境变量类型（联调模式）
 * - 提供 CSS 模块导入类型支持
 * - 确保 TypeScript 严格模式下的类型安全
 *
 * dependencies: Vite
 */

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_STRICT_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
