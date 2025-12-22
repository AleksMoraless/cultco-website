import { allowOnlyDigits, convertBytes, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";

export class LinkFormView extends Component<object> {
  protected form: HTMLFormElement;
  protected name: HTMLInputElement;
  protected phone: HTMLInputElement;
  protected email: HTMLInputElement;
  protected fileTitles: HTMLElement;
  protected file: HTMLElement;
  protected textarea: HTMLElement;
  protected _submitButton: HTMLButtonElement;

  private isNameValid: boolean = false;
  private isPhoneValid: boolean = false;
  private isEmailValid: boolean = false;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);
    this.form = ensureElement('.form-link', this.container) as HTMLFormElement;
    this.name = ensureElement('.input_name', this.container) as HTMLInputElement;
    this.phone = ensureElement('.input-phone', this.container) as HTMLInputElement;
    this.email = ensureElement('.input_email', this.container) as HTMLInputElement;
    this.file = ensureElement('#files', this.container);
    this.fileTitles = ensureElement('.form-input_file', this.container);
    this.textarea = ensureElement('.form-area', this.container);
    this._submitButton = ensureElement('button[type="submit"]', this.container) as HTMLButtonElement;

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.events.emit(`${this.container.getAttribute('name')}:submit`);
      this.resetForm();
    });

    // Валидация для поля name
    this.name.addEventListener('input', () => {
      this.validateName();
    });

    this.name.addEventListener('blur', () => {
      this.validateName();
    });

    // Валидация для поля phone
    this.phone.addEventListener('input', (e) => {
      allowOnlyDigits(e);
      this.validatePhone();
    });

    this.phone.addEventListener('blur', () => {
      this.validatePhone();
    });

    // Валидация для поля email
    this.email.addEventListener('input', () => {
      this.validateEmail();
    });

    this.email.addEventListener('blur', () => {
      this.validateEmail();
    });

    this.file.addEventListener('change', (e: Event) => {
      this.fileTitles.classList.add('form-input_file-empty');
      this.fileTitles.textContent = 'Выберите файл...';
      const target = e.target as HTMLInputElement;
      const files = target.files;

      if (files) {
        if (files.length === 0) {
          this.fileTitles.classList.add('form-input_file-empty');
          this.fileTitles.textContent = 'Выберите файл...';
          return;
        }
        if (files.length > 6) {
          target.value = '';
          console.log(files);
          return;
        }
        this.fileTitles.classList.remove('form-input_file-empty');
        this.fileTitles.textContent = '';

        for (let i = 0; i < files.length; i++) {
          const span = document.createElement('span');
          span.classList.add('form__file-item');
          span.textContent = `${i + 1}.${files[i].name} (${convertBytes(files[i].size)})`;
          this.fileTitles.append(span);
        }
        console.log(files);
      }
    });
  }


  // Валидация поля имени
  // Минимальная длина - 2 символа, только буквы и пробелы
  private validateName(): boolean {
    const nameValue = this.name.value.trim();
    const nameRegex = /^[A-Za-zА-Яа-яЁё\s]{2,}$/;

    this.isNameValid = nameRegex.test(nameValue);

    if (!this.isNameValid && nameValue.length > 0) {
      this.name.classList.add('error');
    } else {
      this.name.classList.remove('error');
    }
    return this.isNameValid;
  }

  // Валидация поля телефона
  // Минимальная длина - 10 цифр, только цифры
  private validatePhone(): boolean {
    const phoneValue = this.phone.value.replace(/\D/g, '');

    this.isPhoneValid = phoneValue.length >= 10 && phoneValue.length <= 15;

    if (!this.isPhoneValid && phoneValue.length > 0) {
      this.phone.classList.add('error');
    } else {
      this.phone.classList.remove('error');
    }

    return this.isPhoneValid;
  }

  // Валидация поля email
  // Стандартная проверка email
  private validateEmail(): boolean {
    const emailValue = this.email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    this.isEmailValid = emailRegex.test(emailValue);

    if (!this.isEmailValid && emailValue.length > 0) {
      this.email.classList.add('error');
    } else {
      this.email.classList.remove('error');
    }

    return this.isEmailValid;
  }

  getFormData(): { name: string; phone: string; email: string } {
    return {
      name: this.name.value.trim(),
      phone: this.phone.value,
      email: this.email.value.trim()
    };
  }

  resetForm(): void {
    this.form.reset();
    this.fileTitles.classList.add('form-input_file-empty');
    this.fileTitles.textContent = 'Выберите файл...';
    this.isNameValid = false;
    this.isPhoneValid = false;
    this.isEmailValid = false;

    this.name.classList.remove('error');
    this.phone.classList.remove('error');
    this.email.classList.remove('error')
  }
}