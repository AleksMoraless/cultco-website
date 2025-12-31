export class ScrollLock {
  private scrollPosition = 0;
  private isLocked = false;
  
  lock() {
    if (this.isLocked) return;
    
    // Сохраняем позицию
    this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // ВРЕМЕННО отключаем плавную прокрутку на всем документе
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Блокируем скролл
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollPosition}px`;
    document.body.style.width = '100%';
    document.body.style.left = '0';
    
    this.isLocked = true;
  }
  
  unlock() {
    if (!this.isLocked) return;
    
    // Восстанавливаем обычное состояние
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.left = '';
    
    // МГНОВЕННО скроллим к сохраненной позиции
    window.scrollTo(0, this.scrollPosition);
    
    // Двойная гарантия
    requestAnimationFrame(() => {
      window.scrollTo(0, this.scrollPosition);
      
      // Восстанавливаем плавную прокрутку с задержкой
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = '';
        this.isLocked = false;
      }, 100);
    });
  }
}