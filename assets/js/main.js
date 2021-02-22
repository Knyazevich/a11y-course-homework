import './polyfill';
import sanitize from 'light-sanitize-html';
import { qs, qsAll } from './dom-helpers';

import Tabs from './classes/Tabs';
import Video from './classes/Video';
import SubscriptionForm from './classes/SubscriptionForm';
import LoginModal from './classes/LoginModal';
import Carousel from './classes/Carousel';
import Filter from './classes/Filter';
import Popup from './classes/Popup';

class Main {
  constructor() {
    this._run();
  }

  _run() {
    try {
      window.qs = qs;
      window.qsAll = qsAll;
      window.Popup = Popup;

      new Carousel();

      new Tabs({
        tabsContainer: '.museum .tabs',
      });

      new Filter({
        tabsContainer: '.exhibitions-filter',
      });

      new Video();
      new SubscriptionForm();
      new LoginModal();
    } catch (e) {
      new Popup({
        message: `<b>Error</b>: ${sanitize(e)}`,
        duration: 5000,
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => new Main());
