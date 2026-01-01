// noScroll.ts
export class ScrollLock {
  private scrollPosition = 0;
  private isLocked = false;
  private isUnlocking = false; // флаг процесса разблокировки
  
  lock() {
    if (this.isLocked || this.isUnlocking) return;
    
    this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // ВРЕМЕННО отключаем плавную прокрутку
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Блокируем скролл
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollPosition}px`;
    document.body.style.width = '100%';
    document.body.style.left = '0';
    
    this.isLocked = true;
    this.isUnlocking = false;
  }
  
  unlock() {
    if (!this.isLocked || this.isUnlocking) return;
    
    this.isUnlocking = true;
    
    // Восстанавливаем обычное состояние
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.left = '';
    
    // МГНОВЕННО скроллим к сохраненной позиции
    window.scrollTo(0, this.scrollPosition);
    
    // Восстанавливаем плавную прокрутку
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = '';
      this.isLocked = false;
      this.isUnlocking = false;
    }, 100);
  }
  
  // Метод для получения текущей сохраненной позиции
  getSavedPosition(): number {
    return this.scrollPosition;
  }
  
  // Метод для проверки, идет ли процесс разблокировки
  isCurrentlyUnlocking(): boolean {
    return this.isUnlocking;
  }
}