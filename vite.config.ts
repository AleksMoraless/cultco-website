import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  // Настройка base для GitHub Pages (ОБЯЗАТЕЛЬНО!)
  base: '/cultco-website/',
  
  // Плагины (раскомментируйте нужный)
  // plugins: [react()],    // для React
  // plugins: [vue()],      // для Vue
  
  // Опции сборки
  build: {
    outDir: 'docs',          // Папка для сборки
    emptyOutDir: true,       // Очищать папку перед сборкой
    sourcemap: false         // Отключить sourcemaps для продакшена
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          // Настройки autoprefixer
          overrideBrowserslist: [
            '> 1%',
            'last 2 versions',
            'not dead'
          ]
        })
      ]
    }
  }
})