import './css/globals.css'
import './css/variables.css'
import './css/styles.css'
import './types/index.ts'
import { eventsList } from "./utils/constants.ts";
import { cloneTemplate, createIndex, ensureAllElements, ensureElement } from './utils/utils.ts';
import { EventEmitter } from './components/base/Events.ts';
import { CatalogModel } from "./components/base/Models/CatalogModel.ts";
import { CategoryCardView } from './components/Views/CategoryCard.ts';
import { CatalogView } from './components/Views/Catalog.ts';
import { ModalView } from './components/Views/Modal.ts';
import { loadPopularItems } from './scripts/loadPopularItems.ts';
import { LinkFormView } from './components/Views/LinkForm.ts';
import { catalogData } from './data/catalogData.ts';
import { ICategory } from './types/index.ts';
import { fulfillViewer } from './scripts/fulfilViewer.ts';
import { CategoryOffersFormView } from './components/Views/CategoryOffersForm.ts';
import { OfferCardView } from './components/Views/OfferCard.ts';
import { addPaginations } from './scripts/paginationPopularItems.ts';
import { headerAnchorScrolling } from './scripts/anchorScrolling.ts';
import { mapReplacer } from './scripts/mapReplacer.ts';
// import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { ScrollLock } from './components/base/noScroll.ts';
import { downloadFile } from './scripts/downloadFile.ts';

const PAGE = document.body;
// const BETWEEN_GAP = parseInt(window.getComputedStyle(PAGE).getPropertyValue('--between-gap'));
// const BASE_URL = 'http://localhost:5173/';

// Шаблоны для рендера в моделях представления
const cardTemplate = ensureElement('#catalog-item', PAGE) as HTMLTemplateElement;
const linkFormTemplate = ensureElement('#link-form', PAGE) as HTMLTemplateElement;
const categoryOffersFormTemplate = ensureElement('#catalog-info', PAGE) as HTMLTemplateElement;
const offerCardTemplate = ensureElement('#catalog-info__item', PAGE) as HTMLTemplateElement;
const topProductViewer = ensureElement('#product-viewer', PAGE) as HTMLTemplateElement;

const events = new EventEmitter();
// Модель хранения данных 
const catalogModel = new CatalogModel(events);

// Модели представления
const catalog = new CatalogView(ensureElement('.catalog', PAGE) as HTMLElement, events);
const modal = new ModalView(ensureElement('#modal-container', PAGE) as HTMLElement, events);
const linkForm = new LinkFormView(cloneTemplate(linkFormTemplate), events);
const categoryOffersForm = new CategoryOffersFormView(cloneTemplate(categoryOffersFormTemplate), events);

// Function
function initPopularSection() {
  if (hitProducts.length === 0) {
    if (topProductSection) {
      topProductSection.style.display = 'none';
    }
    return;
  }
  loadPopularItems(hitProducts, events);
  if (popularItemsViewer) {
    fulfillViewer(0, popularItemsViewer, hitProducts);
  }
}

// Constants
const topProductSection = ensureElement('.top-products', PAGE) as HTMLElement;
const popularItemsViewer = cloneTemplate(topProductViewer);
const burgerMenu = ensureElement('.burger-menu-overlay', PAGE);
const burgerMenuButton = ensureElement('.header__burger-menu-btn', PAGE);
const navigation = ensureElement('.header__navigation', PAGE);
const contacts = ensureElement('.header__contacts', PAGE);
const topProductContainer = ensureElement('.top-products__container', PAGE);
const downloadCard = ensureElement('.requisites__button', PAGE);
// Блокиратор скролла
const scrollLock = new ScrollLock();
// Создание массива популярных товаров с индексированием из общего файла данных
const hitProducts = catalogData.reduce((acc: any[], category: ICategory) => {
  category.categoryOffers.forEach(offer => {
    const hitItems = offer.items.filter(item => item.hit === true);
    acc.push(...hitItems);
  });
  return acc;
}, []).map((item, index) => ({
  ...item,
  index: createIndex(index + 1)
}));

// Установка наблюдателя за каталогом чтобы не давать его пролистнуть
// const catalogScrolling = (entries: IntersectionObserverEntry[]) => {
//   const paginationItems = catalog.getContainer().querySelectorAll('.pagination__item');


//   if (catalogModel.getCatalogItems().length <= 4) {
//     catalog.getListContainer().style.overflowX = 'hidden';
//     catalog.getListContainer().style.paddingBlockEnd = '0';
//     return;
//   }

//   entries.forEach((entry: IntersectionObserverEntry) => {
//     if (entry.isIntersecting) {
//       PAGE.style.overflow = 'hidden';
//       catalog.getContainer().scrollIntoView({ block: "center", behavior: "smooth" });

//       let isScrolling = false;
//       let lastScrollTime = 0;
//       const SCROLL_COOLDOWN = 1000;

//       // Универсальная функция для обновления пагинации
//       const updatePagination = (directionFwd?: boolean) => {
//         const currentScroll = catalog.getListContainer().scrollLeft;


//         let activeNum = Math.round(currentScroll / catalog.getListContainer().clientWidth);

//         // Если передан directionFwd - предсказываем следующую страницу
//         if (directionFwd !== undefined) {
//           const step = directionFwd ? 1 : -1;
//           activeNum += step;
//         }

//         if (activeNum >= 0 && activeNum < paginationItems.length) {
//           paginationItems.forEach(item => item.classList.remove('pagination__item_accent'));
//           paginationItems[activeNum].classList.add('pagination__item_accent');
//         }
//       };

//       // Инициализируем пагинацию
//       updatePagination();

//       function handleWheel(e: WheelEvent) {
//         e.preventDefault();

//         const now = Date.now();

//         if (isScrolling || (now - lastScrollTime) < SCROLL_COOLDOWN) {
//           return;
//         }

//         isScrolling = true;
//         lastScrollTime = now;

//         const scrollDirection = e.deltaY > 0 ? 1 : -1;
//         const directionFwd = scrollDirection > 0;
//         const scrollAmount = catalog.getListContainer().clientWidth + BETWEEN_GAP;
//         const newScrollLeft = catalog.getListContainer().scrollLeft + (scrollDirection * scrollAmount);

//         const maxScroll = catalog.getListContainer().scrollWidth - catalog.getListContainer().clientWidth;
//         const targetScroll = Math.max(0, Math.min(newScrollLeft, maxScroll));

//         // Обновляем пагинацию перед началом прокрутки (с предсказанием)
//         updatePagination(directionFwd);

//         catalog.getListContainer().scrollTo({
//           left: targetScroll,
//           behavior: 'smooth'
//         });

//         const checkScrollCompletion = () => {
//           const currentScroll = catalog.getListContainer().scrollLeft;
//           const atStart = currentScroll <= 10;
//           const atEnd = currentScroll >= maxScroll - 10;

//           if (Math.abs(currentScroll - targetScroll) < 5 || atStart || atEnd) {
//             isScrolling = false;

//             // Точное обновление пагинации после завершения анимации (без предсказания)
//             updatePagination();

//             if ((scrollDirection > 0 && atEnd) || (scrollDirection < 0 && atStart)) {
//               PAGE.style.overflow = '';
//               document.removeEventListener('wheel', handleWheel);
//             }
//           } else {
//             requestAnimationFrame(checkScrollCompletion);
//           }
//         };

//         setTimeout(() => {
//           requestAnimationFrame(checkScrollCompletion);
//         }, 100);
//       }

//       document.addEventListener('wheel', handleWheel, { passive: false });
//     }
//   })
// }
// const observer = new IntersectionObserver(catalogScrolling, {
//   rootMargin: '0px 0px',
//   threshold: 1,
// })
// observer.observe(catalog.getContainer())

/*
  Подписка на события 
*/
events.on(eventsList['catalogItems:changed'], () => {
  const productsHTMLArray = catalogModel.getCatalogItems().map(item => {
    return new CategoryCardView(cloneTemplate(cardTemplate), events).render(item)
  })
  catalog.render({
    items: productsHTMLArray
  })
})
events.on(eventsList['linkForm:open'], ({ title }: { title: string }) => {
  // document.body.style.overflow = 'hidden';
  modal.modalRender('link-form', {
    content: linkForm.render(),
    isOpen: true,
    textTitle: title,
  })
  scrollLock.lock();
  // disableBodyScroll(modal.getModal());
})
events.on(eventsList['catalogItem:picked'], ({ id }: { id: string }) => {
  // document.body.style.overflow = 'hidden';
  const pickedItem = catalogModel.getCatalogCategoryById(id);
  if (pickedItem) {
    const offersHTMLArray = pickedItem.categoryOffers.map(item => {
      return new OfferCardView(cloneTemplate(offerCardTemplate), events).render(item)
    })

    modal.modalRender('offers-form', {
      content: categoryOffersForm.render({
        ...pickedItem,
        content: offersHTMLArray,
      }),
      isOpen: true,
      textTitle: pickedItem.title
    })
    scrollLock.lock();
    // disableBodyScroll(modal.getModal());
  }
})
events.on(eventsList['modal:close'], () => {
  // document.body.style.overflow = '';
  modal.render({
    content: null,
    isOpen: false,
    textTitle: ''
  })
  scrollLock.unlock();
  // enableBodyScroll(modal.getModal());

})
events.on(eventsList['popularItems: picked'], ({ id }: { id: number }) => {
  if (popularItemsViewer) {
    fulfillViewer(id, popularItemsViewer, hitProducts)
  }
})


// ИНИЦИАЛИЗАЦИЯ ОСНОВНАЯ ФУНКЦИОНАЛЬНОСТЬ САЙТА
if (navigation && contacts && burgerMenu && burgerMenuButton) {
  const cloneNavigation = navigation.cloneNode(true);
  const cloneContacts = contacts.cloneNode(true);
  burgerMenu.appendChild(cloneNavigation);
  burgerMenu.appendChild(cloneContacts);

  burgerMenuButton?.addEventListener('click', () => {
    if (!burgerMenu.classList.contains('burger-menu_active')) {
      burgerMenu?.classList.add('burger-menu_active')
      scrollLock.lock();     
    } else {
      burgerMenu?.classList.remove('burger-menu_active')
      scrollLock.unlock();
    }
  })
}

// Загрузка данных каталога
catalogModel.setCatalogItems();

// Инициализация секции популярных товаров
topProductContainer.prepend(popularItemsViewer);
initPopularSection();
addPaginations();

// Реплейсер карты на 2 устройства
mapReplacer();

// Добавление события открытия формы на кнопки связи
const openFormButtons = ensureAllElements('button[name="link-form"]', PAGE);
openFormButtons.forEach(item => item.addEventListener('click', (e) => {
  e.preventDefault()
  events.emit(eventsList['linkForm:open'], { title: 'Свяжитесь с нами' });
}))

// Добавление плавного скролла на кнопки шапки
headerAnchorScrolling(PAGE, scrollLock);
// Добавление загрузки карточки события
downloadCard.addEventListener('click', () => downloadFile())


