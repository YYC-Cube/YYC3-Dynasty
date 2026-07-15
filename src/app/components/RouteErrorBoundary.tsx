/**
 * file: RouteErrorBoundary.tsx
 * description: 路由级错误边界 · 捕获页面渲染异常防止全站白屏
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-07-16
 * updated: 2026-07-16
 * status: active
 * tags: [component],[error-boundary],[resilience]
 *
 * brief: 捕获路由组件渲染错误，展示友好的错误恢复界面
 *
 * details:
 * - 作为 react-router errorElement 使用
 * - 捕获子路由树中任意组件的渲染异常
 * - 提供刷新/返回首页操作
 * - 错误信息仅在开发环境展示（生产环境隐藏堆栈）
 *
 * dependencies: react-router, react
 * exports: RouteErrorBoundary
 */

import { useRouteError, Link } from 'react-router';
import { Component, type ReactNode } from 'react';

interface ErrorInfo {
  componentStack?: string;
}

interface RouteErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/** 路由级错误边界 — 作为 react-router errorElement 挂载 */
export function RouteErrorBoundary() {
  const error = useRouteError() as Error;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '40px 20px',
        background: 'var(--bg, #0a0e1a)',
        color: 'var(--text, #e0e0e0)',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 16 }}>🏛️</div>
      <h1 style={{ fontSize: 20, marginBottom: 8, color: '#ff6b6b' }}>页面渲染异常</h1>
      <p
        style={{ fontSize: 14, color: 'var(--muted, #888)', marginBottom: 24, textAlign: 'center' }}
      >
        三省六部系统遇到意外错误，请尝试刷新页面或返回首页。
      </p>

      {import.meta.env.DEV && (
        <pre
          style={{
            maxWidth: 600,
            padding: 16,
            background: 'rgba(255,0,0,0.05)',
            border: '1px solid rgba(255,0,0,0.2)',
            borderRadius: 8,
            fontSize: 12,
            overflow: 'auto',
            marginBottom: 24,
            color: '#ff9999',
          }}
        >
          {error?.message || String(error)}
          {error?.stack && `\n\n${error.stack}`}
        </pre>
      )}

      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 24px',
            background: 'var(--acc, #d4a843)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          ⟳ 刷新页面
        </button>
        <Link
          to="/welcome"
          style={{
            padding: '10px 24px',
            background: 'transparent',
            color: 'var(--acc, #d4a843)',
            border: '1px solid var(--acc, #d4a843)',
            borderRadius: 8,
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          🏠 返回首页
        </Link>
      </div>
    </div>
  );
}

/**
 * 组件级错误边界 — 包裹单个组件防止崩溃蔓延
 * 使用方式：<ComponentErrorBoundary><MyComponent /></ComponentErrorBoundary>
 */
export class ComponentErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  RouteErrorBoundaryState
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): RouteErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ComponentErrorBoundary]', error, errorInfo.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            style={{
              padding: 20,
              textAlign: 'center',
              color: 'var(--muted, #888)',
              fontSize: 13,
            }}
          >
            ⚠️ 此区域渲染异常
            <br />
            <button
              onClick={() => this.setState({ hasError: false })}
              style={{
                marginTop: 8,
                padding: '4px 12px',
                background: 'transparent',
                border: '1px solid var(--line, #333)',
                borderRadius: 6,
                color: 'var(--acc, #d4a843)',
                cursor: 'pointer',
                fontSize: 12,
              }}
            >
              重试
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
