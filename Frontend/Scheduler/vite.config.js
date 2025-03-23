import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  base: '/UCONN-course-scheduler/', // Set base to your repo's name
  plugins: [react(), tailwindcss()],
})
