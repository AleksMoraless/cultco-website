import { IPopularItem } from "../types";

export function fulfillViewer(id: number, popularItemsViewer: Element, hitProductsWithIndex: IPopularItem[]) {
  const viewerIndex = popularItemsViewer.querySelector('.viewer__index');
    viewerIndex!.textContent = hitProductsWithIndex[id].index;
    const viewerImage = popularItemsViewer.querySelector('.viewer__image');
    viewerImage?.setAttribute('src', hitProductsWithIndex[id].src)
    viewerImage?.setAttribute('alt', hitProductsWithIndex[id].alt)
    const viewerTitle = popularItemsViewer.querySelector('.viewer__title');
    viewerTitle!.textContent = hitProductsWithIndex[id].title;
    const viewerDescription = popularItemsViewer.querySelector('.viewer__description');
    viewerDescription!.textContent = hitProductsWithIndex[id].description;

    const popularItemsList = document.querySelectorAll('.top-products__item')
    popularItemsList.forEach(item => item.classList.remove('item_active'));
    popularItemsList[id].classList.add('item_active');
}