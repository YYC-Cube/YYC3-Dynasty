/**
 * file: vitest.config.ts
 * description: Vitest 测试配置 · 基于 Vite 同构环境
 * author: YanYuCloudCube Team
 * version: v1.1.0
 * created: 2026-07-12
 * updated: 2026-07-16
 * status: active
 * tags: [config],[test],[vitest]
 *
 * brief: Vitest 配置，jsdom 环境 + 覆盖率收集
 *
 * details:
 * - 使用 jsdom 模拟浏览器环境
 * - 覆盖率收集 src/ 下所有 ts/tsx 文件
 * - 排除 ui/（shadcn 生成代码）和 node_modules
 */

/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'docs'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'lcov'],
      include: ['src/app/store.ts', 'src/app/i18n.ts', 'src/app/api.ts', 'src/app/domain/**/*.ts'],
      exclude: ['src/app/components/ui/**', 'src/app/components/figma/**', 'src/lib/**'],
      thresholds: {
        statements: 75,
        branches: 75,
        functions: 25,
        lines: 75,
      },
    },
  },
});
