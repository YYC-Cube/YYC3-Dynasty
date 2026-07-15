import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],

  // Static assets served at / (favicons, images, etc.)
  publicDir: 'public',

  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Dev server: port 3122 + LAN access (--host equivalent), centralized here
  // so `pnpm dev` works without CLI flags.
  server: {
    port: 3122,
    host: true,
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Vendor 分包策略：将大型第三方库拆分为独立 chunk
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return

          // 用 pnpm 路径结构精确提取包名
          const match = id.match(
            /node_modules\/(?:\.pnpm\/)?((?:@[^/]+\/)?[^/@]+)@/,
          )
          const pkg = match?.[1] || ''

          // ── 精确包名匹配（顺序无关）──
          if (pkg.startsWith('@radix-ui/')) return 'vendor-radix'
          if (pkg === 'recharts' || pkg.startsWith('d3-') || pkg === 'victory-vendor')
            return 'vendor-charts'
          if (pkg === 'motion' || pkg === 'framer-motion') return 'vendor-motion'
          if (pkg === 'lucide-react') return 'vendor-icons'
          if (pkg === 'react-markdown' || pkg === 'remark-gfm') return 'vendor-markdown'
          if (
            pkg.startsWith('micromark') ||
            pkg.startsWith('mdast') ||
            pkg.startsWith('hast') ||
            pkg.startsWith('unist')
          )
            return 'vendor-markdown'
          if (
            pkg === 'react' ||
            pkg === 'react-dom' ||
            pkg === 'react-router' ||
            pkg === 'scheduler'
          )
            return 'vendor-react'
        },
      },
    },
  },
})
