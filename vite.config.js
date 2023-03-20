import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    'import.meta.env.PAYSTACK_SECRET_KEY': JSON.stringify('sk_live_8990dd21e112e7c5f4c74ece341c87c3c38ff2f3')
  }
})
