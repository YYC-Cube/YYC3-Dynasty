/**
 * file: ConfirmDialog.tsx
 * description: 确认对话框组件 · 带原因输入
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-21
 * updated: 2026-07-12
 * status: active
 * tags: [component],[dialog],[ui]
 *
 * brief: 通用确认对话框，支持原因输入
 *
 * details:
 * - 自定义标题、消息、按钮文本
 * - 可选原因输入框
 * - Escape 键关闭
 * - 点击遮罩层关闭
 *
 * dependencies: React
 * exports: ConfirmDialog (default)
 */

import { useEffect, useState } from 'react';

interface Props {
  title: string;
  message: string;
  okLabel: string;
  okClass?: string;
  onOk: (reason: string) => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ title, message, okLabel, okClass, onOk, onCancel }: Props) {
  const [reason, setReason] = useState('');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onCancel]);

  return (
    <div className="modal-bg open" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480 }}>
        <button className="modal-close" onClick={onCancel}>
          ✕
        </button>
        <div className="modal-body">
          <div
            className="confirm-title"
            style={{ fontSize: 16, fontWeight: 800, marginBottom: 10 }}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div
            className="confirm-msg"
            style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, lineHeight: 1.5 }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
          <textarea
            className="confirm-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="输入原因（可留空）"
            rows={2}
          />
          <div
            className="confirm-btns"
            style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}
          >
            <button className="btn btn-secondary" onClick={onCancel}>
              取消
            </button>
            <button className={`btn ${okClass || 'btn-primary'}`} onClick={() => onOk(reason)}>
              {okLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
