/**
 * file: components.test.tsx
 * description: 组件交互测试 · @testing-library/react
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-07-16
 * updated: 2026-07-16
 * status: active
 * tags: [test],[components],[interaction],[rtl]
 *
 * brief: 测试可独立渲染的组件——RouteErrorBoundary、RouteLoadingFallback、LanguageSwitcher
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RouteErrorBoundary } from './RouteErrorBoundary';
import { RouteLoadingFallback } from './RouteLoadingFallback';
import { ComponentErrorBoundary } from './RouteErrorBoundary';

// ── RouteLoadingFallback ──

describe('RouteLoadingFallback', () => {
  it('should render a loading spinner with text', () => {
    render(<RouteLoadingFallback />);
    expect(screen.getByText('加载中…')).toBeInTheDocument();
  });
});

// ── ComponentErrorBoundary ──

describe('ComponentErrorBoundary', () => {
  // 抑制 console.error 输出（React 错误边界会打印）
  const originalError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });
  afterEach(() => {
    console.error = originalError;
  });

  it('should render children when no error', () => {
    render(
      <ComponentErrorBoundary>
        <div data-testid="child">正常内容</div>
      </ComponentErrorBoundary>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should render fallback when child throws', () => {
    const ThrowComponent = (): never => {
      throw new Error('Test crash');
    };

    render(
      <ComponentErrorBoundary>
        <ThrowComponent />
      </ComponentErrorBoundary>,
    );

    expect(screen.getByText('⚠️ 此区域渲染异常')).toBeInTheDocument();
  });

  it('should allow retry after error', async () => {
    let shouldThrow = true;
    const FlakyComponent = () => {
      if (shouldThrow) throw new Error('Flaky');
      return <div data-testid="recovered">恢复</div>;
    };

    render(
      <ComponentErrorBoundary>
        <FlakyComponent />
      </ComponentErrorBoundary>,
    );

    expect(screen.getByText('⚠️ 此区域渲染异常')).toBeInTheDocument();

    // Click retry
    shouldThrow = false;
    fireEvent.click(screen.getByText('重试'));

    await waitFor(() => {
      expect(screen.getByTestId('recovered')).toBeInTheDocument();
    });
  });
});

// ── RouteErrorBoundary ──

describe('RouteErrorBoundary', () => {
  // mock useRouteError
  vi.mock('react-router', () => ({
    useRouteError: () => new Error('Route crashed'),
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
      <a href={to} data-testid="home-link">
        {children}
      </a>
    ),
  }));

  it('should render error UI with refresh button', () => {
    render(<RouteErrorBoundary />);

    expect(screen.getByText('页面渲染异常')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /刷新页面/ })).toBeInTheDocument();
  });

  it('should render home link', () => {
    render(<RouteErrorBoundary />);

    const homeLink = screen.getByTestId('home-link');
    expect(homeLink).toHaveAttribute('href', '/welcome');
  });
});
