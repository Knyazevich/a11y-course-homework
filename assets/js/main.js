import './polyfill';
import { qs, qsAll } from './dom-helpers';

// import 'focus-visible/dist/focus-visible.min';

import Tabs from './classes/Tabs';
import Video from './classes/Video';
import SubscriptionForm from './classes/SubscriptionForm';
import LoginModal from './classes/LoginModal';
import Carousel from './classes/Carousel';

class Main {
  constructor() {
    this._run();
  }

  _run() {
    window.qs = qs;
    window.qsAll = qsAll;

    new Carousel();

    new Tabs({
      tabsContainer: '.museum .tabs',
    });

    new Video();
    new SubscriptionForm();
    new LoginModal();
  }
}

document.addEventListener('DOMContentLoaded', () => new Main());
