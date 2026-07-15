/**
 * file: useWebSocket.ts
 * description: WebSocket Hook · 实时事件推送与自动重连
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-21
 * updated: 2026-07-12
 * status: active
 * tags: [hook],[websocket],[realtime]
 *
 * brief: WebSocket 实时连接 Hook，替代 HTTP 轮询
 *
 * details:
 * - 自动处理连接/断线重连/降级回退
 * - 指数退避重连（最大 30s）
 * - 单例 WebSocket 连接，多组件共享
 * - 提供 connected 状态与事件监听
 *
 * dependencies: React
 * exports: useWebSocket
 */

import { useEffect, useRef, useCallback, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || '';
const WS_BASE = API_BASE
  ? API_BASE.replace(/^http/, 'ws') + '/ws'
  : `${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${location.host}/ws`;

type WSEvent = {
  type: 'event' | 'pong' | 'subscribed';
  topic?: string;
  data?: Record<string, unknown>;
};

type Listener = (event: WSEvent) => void;

let _ws: WebSocket | null = null;
const _listeners: Set<Listener> = new Set();
let _reconnectTimer: ReturnType<typeof setTimeout> | null = null;
let _reconnectAttempts = 0;
const MAX_RECONNECT_DELAY = 30000; // 30s cap

function connect() {
  if (_ws && (_ws.readyState === WebSocket.OPEN || _ws.readyState === WebSocket.CONNECTING)) return;

  try {
    _ws = new WebSocket(WS_BASE);

    _ws.onopen = () => {
      _reconnectAttempts = 0;
      _listeners.forEach((fn) => fn({ type: 'pong' })); // signal connected
    };

    _ws.onmessage = (msg) => {
      try {
        const event = JSON.parse(msg.data) as WSEvent;
        _listeners.forEach((fn) => fn(event));
      } catch {
        // ignore parse errors
      }
    };

    _ws.onclose = () => {
      _ws = null;
      scheduleReconnect();
    };

    _ws.onerror = () => {
      // onclose will fire after this
    };
  } catch {
    scheduleReconnect();
  }
}

function scheduleReconnect() {
  if (_reconnectTimer) return;
  const delay = Math.min(1000 * 2 ** _reconnectAttempts, MAX_RECONNECT_DELAY);
  _reconnectAttempts++;
  _reconnectTimer = setTimeout(() => {
    _reconnectTimer = null;
    connect();
  }, delay);
}

function disconnect() {
  if (_reconnectTimer) {
    clearTimeout(_reconnectTimer);
    _reconnectTimer = null;
  }
  if (_ws) {
    _ws.close();
    _ws = null;
  }
}

export function useWebSocket() {
  const [connected, setConnected] = useState(false);
  const listenerRef = useRef<Listener | null>(null);

  // Register listener (named `subscribe` — NOT a hook, despite using useCallback)
  const subscribe = useCallback((fn: Listener) => {
    listenerRef.current = fn;
    _listeners.add(fn);
    return () => {
      _listeners.delete(fn);
      listenerRef.current = null;
    };
  }, []);

  // Manage connection lifecycle
  useEffect(() => {
    connect();

    // Track connection state
    const connListener: Listener = (ev) => {
      if (ev.type === 'pong') {
        setConnected(true);
      }
    };
    _listeners.add(connListener);

    return () => {
      _listeners.delete(connListener);
      // Don't disconnect here — other components may use the shared connection
    };
  }, []);

  return { connected, subscribe };
}

// ── 全局发送 ──

export function wsSend(data: Record<string, unknown>) {
  if (_ws && _ws.readyState === WebSocket.OPEN) {
    _ws.send(JSON.stringify(data));
  }
}

// ── 全局断开（用于页面卸载）──

export function wsDisconnect() {
  disconnect();
}

// ══ 任务级 WebSocket（/ws/task/{id}）══
// 后端提供 /ws/task/{task_id} 端点，仅推送与该任务相关的事件。
// 适用于任务详情页精准订阅，替代全量 /ws 的客户端过滤。

const _taskSockets: Map<string, WebSocket> = new Map();

/**
 * 任务级 WebSocket Hook — 精准订阅单个任务的事件流。
 *
 * 后端 /ws/task/{task_id} 仅推送 payload.task_id 匹配的事件，
 * 相比全量 /ws 减少无关消息开销。
 *
 * @param taskId - 任务 ID（UUID 或 legacy ID）
 * @returns { connected, subscribe } — 同 useWebSocket 接口
 */
export function useTaskWebSocket(taskId: string | null) {
  const [connected, setConnected] = useState(false);
  const listenerRef = useRef<Listener | null>(null);

  const subscribe = useCallback((fn: Listener) => {
    listenerRef.current = fn;
    return () => {
      listenerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!taskId) return;

    // 构造 /ws/task/{id} URL
    const taskWsUrl = API_BASE
      ? API_BASE.replace(/^http/, 'ws') + `/ws/task/${encodeURIComponent(taskId)}`
      : `${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${location.host}/ws/task/${encodeURIComponent(taskId)}`;

    let ws: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let attempts = 0;
    let cancelled = false;

    const doConnect = () => {
      if (cancelled) return;
      ws = new WebSocket(taskWsUrl);

      ws.onopen = () => {
        attempts = 0;
        setConnected(true);
        listenerRef.current?.({ type: 'pong' });
      };

      ws.onmessage = (msg) => {
        try {
          const event = JSON.parse(msg.data) as WSEvent;
          listenerRef.current?.(event);
        } catch {
          // ignore parse errors
        }
      };

      ws.onclose = () => {
        setConnected(false);
        if (cancelled) return;
        const delay = Math.min(1000 * 2 ** attempts, MAX_RECONNECT_DELAY);
        attempts++;
        reconnectTimer = setTimeout(doConnect, delay);
      };

      ws.onerror = () => {
        // onclose will fire
      };
    };

    doConnect();
    if (ws) _taskSockets.set(taskId, ws);

    return () => {
      cancelled = true;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      if (ws) {
        ws.onclose = null;
        ws.close();
      }
      _taskSockets.delete(taskId);
    };
  }, [taskId]);

  return { connected, subscribe };
}
