# ═══════════════════════════════════════════════════════════════
# file: Dockerfile
# description: 生产环境 Docker 多阶段构建 · pnpm builder + nginx 运行
# author: YanYuCloudCube Team
# version: v1.1.0
# created: 2026-07-12
# updated: 2026-07-16
# status: active
# tags: [docker],[deploy],[production]
#
# brief: 多阶段构建——Node 构建前端，nginx 托管静态文件（非 root 运行）
#
# details:
# - Stage 1 (builder): Node 20 + pnpm + frozen lockfile 安装 + Vite 构建
# - Stage 2 (runtime): nginx:alpine 托管 dist/，SPA fallback，非 root 用户
# - 多架构支持: linux/amd64 + linux/arm64 (pnpm-workspace.yaml 已声明)
# - 最终镜像约 25 MB（nginx:alpine + dist/）
#
# build:
#   docker build -t yyc3-dynasty:latest .
#
# run:
#   docker run -p 3122:80 yyc3-dynasty:latest
#
# multi-arch build:
#   docker buildx build --platform linux/amd64,linux/arm64 -t yyc3-dynasty:latest .
# ═══════════════════════════════════════════════════════════════

# ── Stage 1: Builder ──
FROM node:22-alpine AS builder

# pnpm 通过 corepack 启用（固定版本避免兼容性问题）
RUN corepack enable && corepack prepare pnpm@10 --activate

WORKDIR /app

# 先复制依赖清单（利用 Docker layer 缓存）
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# 冻结安装（CI 模式，不修改 lockfile）
RUN pnpm install --frozen-lockfile

# 复制源码
COPY . .

# 构建生产版本（Vite 输出到 dist/）
# VITE_API_URL 可在构建时通过 --build-arg 或 .env.production 注入
ARG VITE_API_URL=""
ENV VITE_API_URL=$VITE_API_URL
RUN pnpm build

# ── Stage 2: Runtime (nginx, 非 root) ──
FROM nginx:alpine AS runtime

# 复制自定义 nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 创建非 root 用户并设置权限（nginx 默认以 root 启动 master，worker 降权；
# 这里改为完全以 nginx 用户运行，移除 root 权限需求）
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /usr/share/nginx/html /var/run/nginx.pid /var/cache/nginx /var/log/nginx && \
    chmod -R 755 /usr/share/nginx/html

USER nginx

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
