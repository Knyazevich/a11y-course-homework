import './polyfill';

import 'focus-visible/dist/focus-visible.min';
import smoothAnchors from './smooth-anchors';

import ContactForm from './classes/class.ContactForm';

class Main {
  constructor() {
    this._run();
  }

  _run() {
    smoothAnchors();

    new ContactForm();
  }
}

document.addEventListener('DOMContentLoaded', () => new Main());
