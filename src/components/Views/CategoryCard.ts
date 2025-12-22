import { ICategory } from "../../types";
import { eventsList } from "../../utils/constants";
import { createIndex, decodeIndex, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";


export class CategoryCardView extends Component<ICategory> {
  protected cardLink: HTMLElement;
  protected cardImage: HTMLImageElement;
  protected cardId: HTMLElement;
  protected cardTitle: HTMLElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);
    this.cardLink = ensureElement('.catalog-item__link', this.container);
    this.cardImage = ensureElement('.catalog-item__image', this.container) as HTMLImageElement;
    this.cardTitle = ensureElement('.catalog-item__heading', this.container);
    this.cardId = ensureElement('.catalog-item__index', this.container);

    this.cardLink.addEventListener('click', (e) => {
      e.preventDefault();
      events.emit(eventsList['catalogItem:picked'], { id: decodeIndex(this.cardId.textContent) });
      console.log(window.location.href);
    })
  }

  set id(value: string) {
    this.setText(this.cardId, createIndex(+value));
  }

  set title(value: string) {
    this.setText(this.cardTitle, value);
  }

  set src(value: string) {
    this.setImage(this.cardImage, value);
  }

  set href(value: string) {
    this.cardLink.setAttribute('href', value);
  }
}