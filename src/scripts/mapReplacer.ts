export function mapReplacer(): void {
  // Функция для обновления src iframe в зависимости от ширины окна
  function updateMapSrc(): void {
    const iframe: HTMLIFrameElement | null = document.querySelector('.contacts__map');
    
    if (!iframe) return;
    
    const smallScreenSrc: string = 'https://yandex.ru/map-widget/v1/?um=constructor%3Ad5e1aac6de9e59580ab4270cb44847900d20034957d778d19a644ba0c6853057&source=constructor';
    const largeScreenSrc: string = 'https://yandex.ru/map-widget/v1/?um=constructor%3A432a35867723fbd4ceb15817a3f56cb94d166839ab3096d3274ce690c0bf34f6&source=constructor';
    
    // Определяем нужный src в зависимости от ширины окна
    const targetSrc: string = window.innerWidth < 768 ? smallScreenSrc : largeScreenSrc;
    
    // Проверяем, отличается ли текущий src от целевого
    if (iframe.src !== targetSrc) {
      iframe.src = targetSrc;
    }
  }

  // Инициализация при загрузке страницы
  document.addEventListener('DOMContentLoaded', (): void => {
    // Первоначальная установка src
    updateMapSrc();
    
    // Добавляем обработчик события resize с debounce для оптимизации
    let resizeTimeout: number | undefined;
    window.addEventListener('resize', (): void => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(updateMapSrc, 250);
    });
  });
}