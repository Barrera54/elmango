import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => {
  const baseConfig = {
    plugins: [react(),tailwindcss()],
    server: {
      port: 5173,
      open: '/elmango',
    },
  };

  // Configuración específica para producción
  if (command === 'build') {
    return {
      ...baseConfig,
      base: '/elmango/',
    };
  }

  // Configuración para desarrollo
  return {
    ...baseConfig,
    base: '/',
  };
});
