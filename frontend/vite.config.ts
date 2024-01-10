import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import dotenv from "dotenv";

dotenv.config();

const PORT = parseInt(process.env.PORT_FRONT) || 9999;


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: PORT,
  }
})
