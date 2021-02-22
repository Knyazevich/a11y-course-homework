import FormValidator from './FormValidator';
import { qs } from '../dom-helpers';

class SubscriptionForm {
  constructor() {
    if (!qs('.subscription__form')) return;

    this.form = qs('.subscription__form');
    this.submitButton = qs('button[type="submit"]');

    this._run();
  }

  _run() {
    try {
      this._handleSubmit();
    } catch (e) {
      console.error(e); // eslint-disable-line
    }
  }

  _handleSubmit() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!this._isFormValid()) return;

      this.form.reset();

      alert('Вы успешно подписались! Ждите письма от нас');
    });
  }

  _isFormValid() {
    return new FormValidator().isValid(this.form, {
      email: {
        presence: {
          message: '^Укажите ваш email',
        },
        email: {
          message: '^Убедитесь, что email указан в формате user@example.com',
        },
      },
      agreed: {
        presence: {
          message: '^Необходимо согласиться с условиями обработки персональных данных',
        },
        inclusion: {
          within: [true],
          message: '^Необходимо согласиться с условиями обработки персональных данных',
        },
      },
    });
  }
}

export default SubscriptionForm;
