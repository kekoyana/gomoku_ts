import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/gomoku_ts/', // リポジトリ名に合わせてベースパスを設定
})