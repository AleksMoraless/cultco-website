import { ScrollLock } from "../components/base/noScroll";

export function headerAnchorScrolling(HTMLContainer: Element | null, scrollLock: ScrollLock) {
  document.addEventListener('DOMContentLoaded', (): void => {
  if (!HTMLContainer) return;
  const linkArray = HTMLContainer.querySelectorAll('a[data-anchor]');
  // const header = HTMLContainer.querySelector('.head-section__header')?.clientHeight;
  // const computedStyle: CSSStyleDeclaration = window.getComputedStyle(document.body);
  // const mainPaddingValue: string = computedStyle.getPropertyValue('padding');
  // const mainPaddingValue: string = computedStyle.getPropertyValue('gap');
  const burgerMenu = HTMLContainer.querySelector('.burger-menu-overlay');
  // const padding: number = parseInt(mainPaddingValue) || 0;
  
  linkArray.forEach(item => {
    item.addEventListener('click', (e: Event) => {
  e.preventDefault();
  
  burgerMenu?.classList.remove('burger-menu_active');
  const anchorElement = document.querySelector(`#${item.getAttribute('data-anchor')}`);
  if (!anchorElement) return;
  
  // Разблокируем и ждем немного
  scrollLock.unlock();
  
  // Используем requestAnimationFrame для гарантии
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (anchorElement.id === 'main-anchor') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      anchorElement.scrollIntoView( {
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
});

  })
})
}