import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages base path - update this to match your repository name
// If your repo is "Portfolio", keep it as "/Portfolio/"
// If your repo is "my-portfolio", change to "/my-portfolio/"
// For user/organization pages (username.github.io), use "/"
const REPO_NAME = 'Portfolio' // Change this to your actual repository name

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? `/${REPO_NAME}/` : '/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
})
