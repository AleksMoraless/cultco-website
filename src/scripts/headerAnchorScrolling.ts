
export function headerAnchorScrolling(HTMLContainer: Element | null) {
  
  if (!HTMLContainer) return;
  const linkArray = HTMLContainer.querySelectorAll('a[data-anchor]');
  const computedStyle: CSSStyleDeclaration = window.getComputedStyle(document.body);
  const gapValue: string = computedStyle.getPropertyValue('gap');
  const burgerMenu = HTMLContainer.querySelector('.burger-menu-overlay');
  const gap: number = parseInt(gapValue) || 0;

  linkArray.forEach(item => {
    item.addEventListener('click', (e: Event) => {
      e.preventDefault();
      
      const anchorElement = document.querySelector(`#${item.getAttribute('data-anchor')}`);
      if (!anchorElement) return
      burgerMenu?.classList.remove('burger-menu_active');
      document.body.style.overflow = '';
      const topPosition = anchorElement.getBoundingClientRect().top + window.pageYOffset - gap;

      window.scrollTo({
      top: topPosition,
      behavior: 'smooth'
    });
    })

  })
  console.log(linkArray);
}