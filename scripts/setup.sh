#!/bin/bash
# ══════════════════════════════════════════════════════════════
# file: scripts/setup.sh
# description: YYC³ Dynasty 前端一键安装脚本 · 依赖检查与环境初始化
# author: YanYuCloudCube Team
# version: v1.0.0
# created: 2026-07-16
# updated: 2026-07-16
# status: active
# tags: [script],[setup],[install]
#
# brief: 检查 Node/pnpm 版本、安装依赖、配置后端连接（可选）
#
# dependencies: node, pnpm, bash
# ══════════════════════════════════════════════════════════════
set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$REPO_DIR/.env"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'

# ── 日志辅助函数（同步自 Framework install.sh）──

banner() {
  echo ""
  echo -e "${BLUE}╔══════════════════════════════════════════╗${NC}"
  echo -e "${BLUE}║  🏛️  YYC³ Dynasty · 三省六部            ║${NC}"
  echo -e "${BLUE}║       前端环境安装向导                    ║${NC}"
  echo -e "${BLUE}╚══════════════════════════════════════════╝${NC}"
  echo ""
}

log()   { echo -e "${GREEN}✅ $1${NC}"; }
warn()  { echo -e "${YELLOW}⚠️  $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; }
info()  { echo -e "${BLUE}ℹ️  $1${NC}"; }

# ── Step 0: 依赖检查 ──────────────────────────────────────────

check_deps() {
  info "检查依赖..."

  # Node.js >= 20
  if ! command -v node &>/dev/null; then
    error "未找到 Node.js。请安装 Node.js >= 20: https://nodejs.org"
    exit 1
  fi
  NODE_VERSION=$(node -v | sed 's/v//')
  NODE_MAJOR=$(echo "$NODE_VERSION" | cut -d. -f1)
  if [ "$NODE_MAJOR" -lt 20 ]; then
    error "Node.js 版本过低 ($NODE_VERSION)，需要 >= 20"
    exit 1
  fi
  log "Node.js: $NODE_VERSION"

  # pnpm >= 10
  if ! command -v pnpm &>/dev/null; then
    warn "未找到 pnpm，正在自动安装..."
    npm install -g pnpm@10
    log "pnpm 已安装"
  else
    PNPM_VERSION=$(pnpm --version)
    PNPM_MAJOR=$(echo "$PNPM_VERSION" | cut -d. -f1)
    if [ "$PNPM_MAJOR" -lt 10 ]; then
      warn "pnpm 版本过低 ($PNPM_VERSION)，建议升级到 >= 10"
    fi
    log "pnpm: $PNPM_VERSION"
  fi
}

# ── Step 1: 备份已有 .env ─────────────────────────────────────

backup_existing() {
  if [ -f "$ENV_FILE" ]; then
    BACKUP="$ENV_FILE.bak.$(date +%Y%m%d-%H%M%S)"
    cp "$ENV_FILE" "$BACKUP"
    log "已备份 .env → $BACKUP"
  fi
}

# ── Step 2: 安装依赖 ──────────────────────────────────────────

install_deps() {
  info "安装依赖..."
  cd "$REPO_DIR"
  pnpm install
  log "依赖安装完成"
}

# ── Step 3: 可选配置后端地址 ──────────────────────────────────

configure_backend() {
  echo ""
  info "后端 API 地址配置（可选）"
  echo "  - 留空 = 同源请求（生产部署推荐）"
  echo "  - 填写后端地址，如 https://api.dynasty.yyc3.fun"
  echo ""

  read -rp "请输入后端 API 地址（回车跳过）: " API_URL

  if [ -n "$API_URL" ]; then
    echo "VITE_API_URL=$API_URL" > "$ENV_FILE"
    log ".env 已配置: VITE_API_URL=$API_URL"
  else
    log "跳过后端配置（使用同源请求）"
  fi
}

# ── Step 4: 验证 ──────────────────────────────────────────────

verify() {
  info "验证安装..."
  cd "$REPO_DIR"

  echo ""
  echo -e "${BLUE}── TypeScript 类型检查 ──${NC}"
  if pnpm typecheck 2>/dev/null; then
    log "typecheck 通过"
  else
    warn "typecheck 有错误（不影响开发服务器启动）"
  fi

  echo ""
  echo -e "${BLUE}── 启动开发服务器 ──${NC}"
  log "安装完成！运行以下命令启动开发："
  echo ""
  echo -e "  ${GREEN}cd $REPO_DIR${NC}"
  echo -e "  ${GREEN}pnpm dev${NC}    # 开发服务器 → http://localhost:3122"
  echo -e "  ${GREEN}pnpm build${NC}  # 生产构建 → dist/"
  echo ""
}

# ── 主流程 ────────────────────────────────────────────────────

main() {
  banner
  check_deps
  backup_existing
  install_deps

  # 交互式配置（只在非 CI 环境下执行）
  if [ -t 0 ]; then
    configure_backend
  fi

  verify
}

main "$@"
