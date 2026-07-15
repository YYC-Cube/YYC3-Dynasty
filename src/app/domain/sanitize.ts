/**
 * file: sanitize.ts
 * description: 文本清洗工具 · 同步自后端 kanban_update.py _sanitize_text
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-07-16
 * updated: 2026-07-16
 * status: active
 * tags: [domain],[sanitize],[security],[sync-backend]
 *
 * brief: 剥离文件路径/URL/系统元数据/传旨前缀，截断过长内容
 *
 * details:
 * - 与后端 scripts/kanban_update.py 的 _sanitize_text / _sanitize_title / _sanitize_remark 同步
 * - 用于 EdictCreate.tsx 拟旨标题客户端预校验
 * - 规则：剥离 Conversation 元数据 → 剥离代码块 → 剥离文件路径 → 剥离 URL
 *         → 清理传旨前缀 → 剥离系统元数据键 → 合并空白 → 截断
 *
 * dependencies: none
 * exports: sanitizeText, sanitizeTitle, sanitizeRemark
 */

/**
 * 清洗文本：剥离文件路径、URL、Conversation 元数据、传旨前缀、截断过长内容
 * 与后端 _sanitize_text() 同步
 *
 * @param raw 原始文本
 * @param maxLen 最大长度（默认 80）
 * @returns 清洗后的文本
 */
export function sanitizeText(raw: string, maxLen = 80): string {
  let t = (raw || '').trim();

  // 1) 剥离 Conversation info / Conversation 后面的所有内容
  t = t.split(/\n*Conversation\b/)[0]!.trim();

  // 2) 剥离 ```json 等代码块
  t = t.split(/\n*```/)[0]!.trim();

  // 3) 剥离 URL（先于文件路径剥离，避免路径正则吃掉 URL 的 // 部分）
  t = t.replace(/https?:\/\/\S+/g, '');

  // 4) 剥离 Unix/Mac 文件路径 (/Users/xxx, /home/xxx, /opt/xxx, ./xxx, C:\xxx)
  t = t.replace(
    /[/\\.~][A-Za-z0-9_\-./]+(?:\.(?:py|js|ts|json|md|sh|yaml|yml|txt|csv|html|css|log))?/g,
    '',
  );

  // 5) 清理常见前缀: "传旨:" "下旨:" "下旨（xxx）:" 等
  t = t.replace(/^(传旨|下旨)([（(][^)）]*[)）])?[：:\s]+/, '');

  // 6) 剥离系统元数据关键词
  t = t.replace(/(message_id|session_id|chat_id|open_id|user_id|tenant_key)\s*[:=]\s*\S+/g, '');

  // 7) 合并多余空白
  t = t.replace(/\s+/g, ' ').trim();

  // 8) 截断过长内容
  if (t.length > maxLen) {
    t = t.slice(0, maxLen) + '…';
  }

  return t;
}

/**
 * 清洗标题（最长 80 字符）
 * 与后端 _sanitize_title() 同步
 */
export function sanitizeTitle(raw: string): string {
  return sanitizeText(raw, 80);
}

/**
 * 清洗流转备注（最长 120 字符）
 * 与后端 _sanitize_remark() 同步
 */
export function sanitizeRemark(raw: string): string {
  return sanitizeText(raw, 120);
}
