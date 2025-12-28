import { eventsList } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component"
import { EventEmitter } from "../base/Events";
import { createFocusTrap, FocusTrap } from 'focus-trap';

interface IModalData {
  content: HTMLElement | null;
  isOpen?: boolean;
  textTitle: string;
  contentType: string;
}

function updateMargin(container: HTMLElement) {
  const hasVerticalScroll = container.scrollHeight > container.clientHeight;
      console.log('updateModalMargin выполнен:', hasVerticalScroll);
      const BETWEEN_GAP = parseInt(window.getComputedStyle(container).getPropertyValue('--between-gap'));
      // Устанавливаем margin в зависимости от наличия скролла
      container.style.paddingInlineEnd = hasVerticalScroll ? `${BETWEEN_GAP}px` : '0px';
}


// Функция с debounce для предотвращения частых вызовов
function updateModalMarginDebounced(container: HTMLElement) {
  let timeoutId: any | null = null;
  
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      updateMargin(container);
    }, 150); // Задержка в 150ms
  };
}

// const BETWEEN_GAP = parseInt(window.getComputedStyle(PAGE).getPropertyValue('--between-gap'));

export class ModalView extends Component<IModalData> {
  protected closeButton: HTMLButtonElement;
  protected modalTitle: HTMLElement;
  protected modal: HTMLElement;
  protected modalContainer: HTMLElement;
  protected component: string = '';
  protected focusTrap: FocusTrap;
  protected resizeObserver: ResizeObserver;
  protected debouncedUpdateMargin: () => void;
  protected resizeTimeoutId: any | null = null;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);
    this.modal = ensureElement('.modal__container', this.container);
    this.modalTitle = ensureElement('.modal__heading', this.container);
    this.closeButton = ensureElement('.modal__close', this.container) as HTMLButtonElement;
    this.modalContainer = ensureElement('.modal__content', this.container);

    // Создаем debounced версию функции обновления margin
    this.debouncedUpdateMargin = updateModalMarginDebounced(this.modalContainer);

    // Создаем ResizeObserver с debounce
    this.resizeObserver = new ResizeObserver(() => {
      // Отменяем предыдущий таймаут, если он есть
      if (this.resizeTimeoutId) {
        clearTimeout(this.resizeTimeoutId);
      }
      
      // Устанавливаем новый таймаут для задержки
      this.resizeTimeoutId = setTimeout(() => {
          // Вызываем debounced версию обновления margin
          this.debouncedUpdateMargin();
      }, 200); // Задержка в 200ms для ResizeObserver
    });

    // Начинаем наблюдение
    this.resizeObserver.observe(this.modalContainer);

    this.closeButton.addEventListener('click', () => {
      this.events.emit(eventsList['modal:close']);
    })

    this.focusTrap = createFocusTrap(this.container, {
      preventScroll: true,
      escapeDeactivates: false,
      clickOutsideDeactivates: true,
      returnFocusOnDeactivate: true,
    });

    this.container.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.events.emit(eventsList['modal:close']);
      }
    })
  }

  getModalComponent(): string {
    return this.component;
  }

  set contentType(value: string) {
    this.component = value;
  }

  _handleEscape = (evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      this.isOpen = false;
      this.events.emit(eventsList['modal:close']);
    }
  };

  set isOpen(value: boolean) {
    if (value === true) {
      this.container.classList.add("modal_active");
      this.focusTrap.activate();
      document.addEventListener("keydown", this._handleEscape);
    } else {
      this.container.classList.remove("modal_active");
      this.focusTrap.deactivate();
      document.removeEventListener("keydown", this._handleEscape);
    }
  }

  set textTitle(value: string) {
    this.setText(this.modalTitle, value);
  }

  set content(content: HTMLElement) {
    this.modalContainer.replaceChildren(content);
  }

  modalRender(contentType: string, data?: Partial<IModalData>): HTMLElement {
    switch (contentType) {
      case 'link-form':
        this.modal.classList.remove('modal__container_large');
        this.modal.classList.add('modal__container_small');
        this.modal.classList.add('block-style-1');
        break;
      case 'offers-form':
        this.modal.classList.remove('modal__container_small');
        this.modal.classList.add('modal__container_large');
        this.modal.classList.add('block-style-1');
        break;
    }
    Object.assign(this as object, data ?? {});
    
    // Вызываем обновление margin после рендеринга с задержкой
    updateMargin(this.modalContainer);
    
    return this.container;
  }
}