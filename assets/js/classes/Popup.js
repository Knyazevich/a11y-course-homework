import sanitize from 'light-sanitize-html';
import { qs, qsAll } from '../dom-helpers';

class Popup {
  constructor(options) {
    this.POPUP_CLASS = 'popup';

    this.message = options.message || '';
    this.duration = options.duration || 5000;
    this.popupsCount = qsAll(`.${this.POPUP_CLASS}`).length;

    this._run();
  }

  _run() {
    const popup = this.create();
    this.push(popup);

    setTimeout(() => this.destroy(popup), this.duration);
  }

  create() {
    const element = document.createElement('div');

    element.setAttribute('role', 'alert');
    element.setAttribute('aria-live', 'assertive');
    element.classList.add(this.POPUP_CLASS);

    element.innerHTML = sanitize(this.message, {
      allowedTags: ['b', 'i', 'em', 'strong', 'a'],
    });

    return element;
  }

  push(popup) {
    const container = qs('.popups');

    if (!container) {
      const element = document.createElement('div');
      element.classList.add('popups');
      document.body.appendChild(element);
    }

    qs('.popups').appendChild(popup);
  }

  destroy(popup) {
    popup.remove();
  }
}

export default Popup;
