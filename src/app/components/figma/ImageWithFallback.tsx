/**
 * file: ImageWithFallback.tsx
 * description: 图片组件 · 加载失败时显示备用图 + 原生 lazy-loading
 * author: YanYuCloudCube Team
 * version: v1.1.0
 * created: 2026-05-01
 * updated: 2026-07-16
 * status: active
 * tags: [component],[image],[figma],[ui]
 *
 * brief: 带 fallback 的图片组件，加载失败显示占位图，原生懒加载
 *
 * details:
 * - 加载失败时显示 SVG 占位图
 * - 保留原始 URL 在 data 属性中
 * - 默认 loading="lazy" + decoding="async" 实现原生懒加载和异步解码
 *
 * dependencies: React
 * exports: ImageWithFallback
 */

import React, { useState } from 'react';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

export function ImageWithFallback({
  loading = 'lazy',
  decoding = 'async',
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    setDidError(true);
  };

  const { src, alt, style, className, ...rest } = props;

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img
          src={ERROR_IMG_SRC}
          alt="Error loading image"
          loading="lazy"
          decoding="async"
          {...rest}
          data-original-url={src}
        />
      </div>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      decoding={decoding}
      {...rest}
      onError={handleError}
    />
  );
}
