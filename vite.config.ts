import { defineConfig } from 'vite'

export default defineConfig({
  // Настройка base для GitHub Pages (ОБЯЗАТЕЛЬНО!)
  base: '/cultco-website/',
  
  // Плагины (раскомментируйте нужный)
  // plugins: [react()],    // для React
  // plugins: [vue()],      // для Vue
  
  // Опции сборки
  build: {
    outDir: 'dist',          // Папка для сборки
    emptyOutDir: true,       // Очищать папку перед сборкой
    sourcemap: false         // Отключить sourcemaps для продакшена
  },
  
})