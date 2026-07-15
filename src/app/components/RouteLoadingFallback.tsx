/**
 * file: RouteLoadingFallback.tsx
 * description: 路由懒加载统一 Loading 状态 · 骨架屏占位
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-07-16
 * updated: 2026-07-16
 * status: active
 * tags: [component],[loading],[suspense]
 *
 * brief: 路由 chunk 加载时展示的统一骨架屏，避免白屏闪烁
 *
 * dependencies: react-router
 * exports: RouteLoadingFallback
 */

export function RouteLoadingFallback() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 16,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          border: '3px solid rgba(212, 168, 67, 0.2)',
          borderTopColor: '#d4a843',
          borderRadius: '50%',
          animation: 'route-spin 0.8s linear infinite',
        }}
      />
      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>加载中…</span>
      <style>{`
        @keyframes route-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
