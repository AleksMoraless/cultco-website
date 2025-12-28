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
  private selectedFiles: File[] = []; // Хранилище выбранных файлов
  // private fileInput: HTMLInputElement; // Ссылка на input элемент

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

    // Получаем ссылку на input элемент
    // this.fileInput = this.file as HTMLInputElement;

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
      const target = e.target as HTMLInputElement;
      const newFiles = Array.from(target.files || []);

      // Если пользователь отменил выбор (пустой файл), не делаем ничего
      if (newFiles.length === 0) {
        return;
      }

      // Проверяем максимальное количество файлов
      const totalFiles = this.selectedFiles.length + newFiles.length;
      if (totalFiles > 6) {
        target.value = '';
        console.log('Максимальное количество файлов - 6');
        return;
      }

      // Добавляем новые файлы к существующим
      // Исключаем дубликаты по имени и размеру
      for (const newFile of newFiles) {
        const isDuplicate = this.selectedFiles.some(
          existingFile => 
            existingFile.name === newFile.name && 
            existingFile.size === newFile.size
        );
        
        if (!isDuplicate) {
          this.selectedFiles.push(newFile);
        }
      }

      // Обновляем отображение
      this.updateFileDisplay();

      // Сбрасываем значение input, чтобы можно было выбрать тот же файл снова
      target.value = '';
    });
  }

  // Метод для обновления отображения файлов
  private updateFileDisplay(): void {
    // Очищаем содержимое
    this.fileTitles.innerHTML = '';
    
    if (this.selectedFiles.length === 0) {
      this.fileTitles.classList.add('form-input_file-empty');
      this.fileTitles.textContent = 'Выберите файл...';
      return;
    }

    this.fileTitles.classList.remove('form-input_file-empty');
    
    const fileList = document.createElement('ul');
    fileList.classList.add('form-input_file__list');

    this.selectedFiles.forEach((file, index) => {
      const li = document.createElement('li');
      li.classList.add('form__file-item');

      // Кнопка удаления
      const removeBtn = document.createElement('button');
      removeBtn.classList.add('form__file-remove');
      removeBtn.type = 'button';
      removeBtn.addEventListener('click', () => this.removeFile(index));

      // Информация о файле
      const span = document.createElement('span');
      span.textContent = `${file.name} (${convertBytes(file.size)})`;
      
      li.append(removeBtn);
      li.append(span);
      fileList.append(li);
    });

    this.fileTitles.append(fileList);
  }

  // Метод для удаления файла по индексу
  private removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.updateFileDisplay();
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

  getFormData(): { name: string; phone: string; email: string; files: File[] } {
    return {
      name: this.name.value.trim(),
      phone: this.phone.value,
      email: this.email.value.trim(),
      files: this.selectedFiles // Добавляем файлы в возвращаемые данные
    };
  }

  resetForm(): void {
    this.form.reset();
    this.selectedFiles = []; // Очищаем файлы при сбросе формы
    this.updateFileDisplay(); // Обновляем отображение
    this.isNameValid = false;
    this.isPhoneValid = false;
    this.isEmailValid = false;

    this.name.classList.remove('error');
    this.phone.classList.remove('error');
    this.email.classList.remove('error');
  }

  // Метод для получения текущих файлов (если нужен извне)
  getSelectedFiles(): File[] {
    return [...this.selectedFiles];
  }

  // Метод для добавления файлов программно
  addFiles(files: File[]): void {
    for (const file of files) {
      if (this.selectedFiles.length < 6) {
        const isDuplicate = this.selectedFiles.some(
          existingFile => 
            existingFile.name === file.name && 
            existingFile.size === file.size
        );
        
        if (!isDuplicate) {
          this.selectedFiles.push(file);
        }
      }
    }
    this.updateFileDisplay();
  }
}