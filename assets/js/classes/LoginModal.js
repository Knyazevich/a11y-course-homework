import { qs, qsAll } from '../dom-helpers';
import FormValidator from './FormValidator';

class LoginModal {
  constructor() {
    if (!qs('.modal-overlay')) return;

    this.overlay = qs('.modal-overlay');
    this.modal = qs('.login-modal');
    this.loginButton = qs('.user-controls__login-button');
    this.closeButton = qs('.login-modal__close');
    this.form = qs('.login-modal__form');

    this.focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    this.isOpened = false;

    this._run();
  }

  _run() {
    this.loginButton.addEventListener('click', () => this.open());
    this.closeButton.addEventListener('click', () => this.close());

    this.overlay.addEventListener('click', (e) => {
      if (!e.target.classList.contains('modal-overlay')) {
        return;
      }

      this.close();
    });

    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });

    this._enableFocusTrap();
    this._handleSubmit();
  }

  open() {
    this.overlay.classList.remove('hidden');
    this.modal.focus();
  }

  close() {
    this.overlay.classList.add('hidden');
    this.loginButton.focus();
  }

  _enableFocusTrap() {
    const firstFocusableElement = qsAll(this.focusableElements, this.overlay)[0];
    const focusableContent = qsAll(this.focusableElements, this.overlay);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', (e) => {
      const isTabPressed = e.key === 'Tab';

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    });

    firstFocusableElement.focus();
  }

  _handleSubmit() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!this._isFormValid()) return;

      this.form.reset();
      this.close();

      alert('Вы успешно вошли! Тут должна выполняться переадресация.');
    });
  }

  _isFormValid() {
    return new FormValidator().isValid(this.form, {
      login: {
        presence: {
          message: '^Укажите ваш логин',
        },
      },
      password: {
        presence: {
          message: '^Укажите ваш пароль',
        },
      },
    });
  }
}

export default LoginModal;
