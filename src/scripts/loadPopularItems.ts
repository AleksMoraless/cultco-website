import { EventEmitter } from "../components/base/Events";
import { IPopularItem } from "../types";
import { eventsList } from "../utils/constants";

export function loadPopularItems(data: IPopularItem[], events: EventEmitter): void {
  const parent = document.querySelector('.top-products__list');

  for (let i = 0; i < data.length; i++) {
    const item = document.createElement('li');
    item.classList.add('top-products__item');

    const itemLink = document.createElement('a');
    itemLink.classList.add('top-products-item__link');
    itemLink.setAttribute('href', '#');

    const image = document.createElement('img');
    image.setAttribute('src', data[i].src);
    image.classList.add('top-products-item__image');

    const text = document.createElement('span');
    text.classList.add('top-products-item__index')
    text.innerHTML = data[i].index;

    const heading = document.createElement('h3');
    heading.classList.add('top-products-item__heading')
    heading.innerHTML = data[i].title;

    const description = document.createElement('p');
    description.classList.add('top-products-item__description')
    description.innerHTML = data[i].description;

    const button = document.createElement('button');
    button.classList.add('top-products-item_button');
    button.classList.add('button-style');
    button.setAttribute('name', 'link-form')
    button.innerHTML = 'Узнать подробнее';
    
    itemLink.addEventListener('click', (e) => {
      e.preventDefault();
      events.emit(eventsList['popularItems: picked'], { id: i });
    })

    // itemLink.append(image,text);
    itemLink.append(image, text, heading, description, button);
    item.append(itemLink);

    parent?.append(item)
  }

  parent?.addEventListener('mouseenter', (e) => {
      e.preventDefault();
  }, {passive: false})
}