/**
 * file: main.tsx
 * description: 应用入口文件 · React 根渲染入口
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-21
 * updated: 2026-07-12
 * status: active
 * tags: [entry],[root],[react]
 *
 * brief: 应用入口，渲染 React 根组件
 *
 * details:
 * - 引入全局样式 index.css
 * - 使用 StrictMode 包裹 App 组件
 * - 挂载到 #root DOM 节点
 *
 * dependencies: React, ReactDOM, ./app/App
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './styles/index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element #root not found in the DOM');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
