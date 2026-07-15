/**
 * file: eslint.config.mjs
 * description: ESLint v9 flat config · TypeScript + React 代码规范
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-07-12
 * updated: 2026-07-12
 * status: active
 * tags: [config],[lint],[quality]
 *
 * brief: ESLint v9 flat config，集成 TypeScript ESLint + React Hooks + Prettier
 */

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  // 全局忽略
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'docs/YYC3-AI-Dev/**',          // 独立参考 monorepo，不归本仓 lint
      'src/imports/pasted_text/**',    // 参考文本，非源码
      '**/*.config.{js,mjs,ts}',       // 配置文件单独处理
      'eslint.config.mjs',
      'postcss.config.mjs',
    ],
  },

  // 基础推荐规则
  js.configs.recommended,

  // TypeScript 推荐规则（type-aware 关闭以保持速度）
  ...tseslint.configs.recommended,

  // 关闭与 Prettier 冲突的规则
  prettierConfig,

  // 项目源码规则
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // ── React Hooks ──
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // ── React Refresh (HMR) ──
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // ── TypeScript 收紧 ──
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
    },
  },

  // shadcn/ui primitives — standard pattern exports both component + variants;
  // react-refresh warning is expected and safe to disable here.
  {
    files: ['src/app/components/ui/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },

  // Vendored i18n library (src/lib/i18n-*) — library modules that legitimately
  // export hooks + components together and include a console-logger plugin.
  // react-refresh HMR does not apply to library code; console is intentional
  // in the logging plugin.
  {
    files: ['src/lib/i18n-core/**/*.{ts,tsx}', 'src/lib/i18n-react/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
      'no-console': 'off',
    },
  },

  // 配置文件规则
  {
    files: ['*.config.{js,mjs,ts}', '**/*.config.{js,mjs,ts}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },
);
