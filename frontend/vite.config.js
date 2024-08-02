import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
  include: [
    '@emotion/react', 
    '@emotion/styled', 
    '@mui/material'
  ],
},
plugins: [
  react({
    jsxImportSource: '@emotion/react',
    babel: {
      plugins: ['@emotion/babel-plugin'],
    },
  }),
],
// server:{
//   host:'127.0.0.1'
// }
})


