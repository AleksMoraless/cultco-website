import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";

export class CategoryOffersFormView extends Component<object> {
  protected categoryTitle: HTMLElement;
  protected formContainer: HTMLElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);
    this.categoryTitle = ensureElement('.catalog-info__text-content', this.container);
    this.formContainer = ensureElement('.catalog-info__container', this.container);
  }

  set description(value: string) {
    this.setText(this.categoryTitle, value);
  }

  set content(content: HTMLElement[]) {
    this.formContainer.replaceChildren(...content);
  }
}