import { IOffer } from "../../types";
// import { eventsList } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";


export class OfferCardView extends Component<IOffer> {
  protected cardLink: HTMLElement;
  protected cardImage: HTMLImageElement;
  protected cardTitle: HTMLElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);
    this.cardLink = ensureElement('.catalog-info__link', this.container);
    this.cardImage = ensureElement('.catalog-info__image', this.container) as HTMLImageElement;
    this.cardTitle = ensureElement('.catalog-info__heading', this.container);
    
    this.cardLink.addEventListener('click', (e) => {
      e.preventDefault();
    })
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