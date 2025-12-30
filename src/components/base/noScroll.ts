export class ScrollLock {
  private scrollPosition = 0;
  private scrollbarWidth = 0;
  private isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  private isLocked = false;
  private scrollRestorationTimeout: number | null = null;

  lock() {
    if (this.isLocked) return;
    
    // Сохраняем текущую позицию скролла
    this.scrollPosition = window.pageYOffset || 
                          document.documentElement.scrollTop || 
                          document.body.scrollTop;
    
    // Рассчитываем ширину скроллбара
    this.scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // Применяем стили для блокировки скролла
    document.body.style.top = `-${this.scrollPosition}px`;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    
    // Компенсируем ширину скроллбара
    if (this.scrollbarWidth > 0) {
      document.body.style.paddingRight = `${this.scrollbarWidth}px`;
    }
    
    // Для iOS добавляем дополнительные стили
    if (this.isIOS) {
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overscrollBehavior = 'none';
    }
    
    // Сохраняем позицию в data-атрибуте на случай потери состояния
    document.body.setAttribute('data-scroll-pos', this.scrollPosition.toString());
    
    this.isLocked = true;
  }

  unlock() {
    if (!this.isLocked) return;
    
    // Очищаем предыдущий таймаут, если есть
    if (this.scrollRestorationTimeout) {
      clearTimeout(this.scrollRestorationTimeout);
    }
    
    // 1. Сначала восстанавливаем обычное позиционирование
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.overscrollBehavior = '';
    
    // 2. Удаляем data-атрибут
    document.body.removeAttribute('data-scroll-pos');
    
    // 3. Даем время на обновление DOM перед скроллом
    this.scrollRestorationTimeout = setTimeout(() => {
      // 4. Восстанавливаем позицию скролла
      window.scrollTo({
        top: this.scrollPosition,
        behavior: 'instant' // используем 'instant' вместо 'auto' или 'smooth'
      });
      
      // 5. Дополнительная проверка для iOS
      if (this.isIOS) {
        requestAnimationFrame(() => {
          window.scrollTo(0, this.scrollPosition);
        });
      }
      
      this.isLocked = false;
      this.scrollRestorationTimeout = null;
    }, 10); // Небольшая задержка в 10мс
  }
}