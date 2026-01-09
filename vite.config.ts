import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { join } from 'path'

// GitHub Pages base path - update this to match your repository name
// If your repo is "Portfolio", keep it as "/Portfolio/"
// If your repo is "my-portfolio", change to "/my-portfolio/"
// For user/organization pages (username.github.io), use "/"
const REPO_NAME = 'Portfolio' // Change this to your actual repository name

export default defineConfig({
  base: `/${REPO_NAME}/`, // Always use base path for GitHub Pages
  plugins: [
    react(),
    {
      name: 'copy-nojekyll',
      closeBundle() {
        copyFileSync(join(__dirname, '.nojekyll'), join(__dirname, 'dist', '.nojekyll'))
      },
    },
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
})
