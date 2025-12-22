export function addPaginations() {
  document.addEventListener('DOMContentLoaded', (): void => {
    const listElement: HTMLElement | null = document.querySelector('.top-products__list');
    const paginationListElement: HTMLElement | null = document.querySelector('.top-products__pagination');

    if (!listElement) return;

    // Функция для определения активной карточки
    const updateActiveCard = (): void => {
      const scrollLeft: number = listElement.scrollLeft;
      const items: NodeListOf<HTMLElement> = listElement.querySelectorAll('.top-products__item');

      if (items.length === 0) return;

      // Получаем ширину одной карточки с учетом gap
      const firstItem: HTMLElement = items[0];
      const itemWidth: number = firstItem.offsetWidth;
      const computedStyle: CSSStyleDeclaration = window.getComputedStyle(listElement);
      const gapValue: string = computedStyle.getPropertyValue('gap');
      const gap: number = parseInt(gapValue) || 0;
      const totalItemWidth: number = itemWidth + gap;

      // Определяем индекс активной карточки
      let activeIndex: number = Math.round(scrollLeft / totalItemWidth);

      // Ограничиваем индекс в пределах количества карточек
      activeIndex = Math.min(activeIndex, items.length - 1);

      // console.log(`Активна карточка №${activeIndex + 1}`);

      // Create pagination list
      if (paginationListElement) {
        paginationListElement.textContent = '';
        // Можно добавить визуальное выделение активной карточки (опционально)
        items.forEach((): void => {
          if (paginationListElement) {
            const paginationItem = document.createElement('li');
            paginationItem.classList.add('top-products__pagination-item')
            paginationListElement?.append(paginationItem);
          }
        });
      }
      paginationListElement?.children[activeIndex].classList.add('top-products__pagination-item_active')
    };

    // Слушаем событие скролла с debounce для производительности
    let scrollTimeout: number | undefined;
    listElement.addEventListener('scroll', (): void => {
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(updateActiveCard, 100);
    });

    // Вызываем при загрузке страницы
    updateActiveCard();

    // Также обновляем при изменении размера окна (на случай ресайза)
    let resizeTimeout: number | undefined;
    window.addEventListener('resize', (): void => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(updateActiveCard, 250);
    });
  });
}
