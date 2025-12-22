import { IListCards } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component"
import { EventEmitter } from "../base/Events";

export class CatalogView extends Component<IListCards> {
  protected itemsContainer: HTMLElement;
  // protected pagination: HTMLElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);
    this.itemsContainer = ensureElement('.catalog-list', this.container);
    // this.pagination = ensureElement('.catalog__pagination', this.container);
  }

  public getContainer(): HTMLElement {
    return this.container;
  }

  public getListContainer(): HTMLElement {
    return this.itemsContainer;
  }

  // protected addPagination(items: HTMLElement[]) {
  //   const countItems = Math.ceil(items.length / 4);
  //   if (countItems === 1) return;
  //   for (let i = 0; i < countItems; i++) {
  //     const item = document.createElement('span');
  //     item.classList.add('pagination__item');
  //     if (i === 0) {
  //       item.classList.add('pagination__item_acccent');
  //     }
  //     this.pagination.append(item);
  //   }
  // }

  set items(catalogItems: HTMLElement[]) {
    this.itemsContainer.replaceChildren(...catalogItems);
    // this.addPagination(catalogItems)
  }
}