import sanitize from 'light-sanitize-html';
import { qs, qsAll } from '../dom-helpers';
import Popup from './Popup';

class Filter {
  constructor(options) {
    if (!qs(options.tabsContainer)) {
      throw new Error('tabsContainer is empty');
    }

    this.container = qs(options.tabsContainer) || null;
    this.tabs = qsAll('.exhibitions-filter__tab', this.container);
    this.items = qsAll('.exhibitions-filter__item', this.container);

    this.TAB_ACTIVE_CLASS = 'tabs__tab--active';

    this._run();
  }

  _run() {
    if (!this.tabs) {
      console.warn('There are no tabs'); // eslint-disable-line
      return;
    }

    this.tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        this.filter(e.target.dataset.filter);
        this._changeTab(e.target);

        new Popup({
          message: `События отфильтрованы по ключу: <b>${sanitize(e.target.innerText)}</b>`,
          duration: 5000,
        });
      });
    });
  }

  filter(rule) {
    this.items.forEach((item) => {
      if (rule === '*') {
        item.classList.remove('hidden');
        return;
      }

      if (item.dataset.filter !== rule) {
        item.classList.add('hidden');
      } else {
        item.classList.remove('hidden');
      }
    });
  }

  _changeTab(tab) {
    this.tabs.forEach((t) => {
      t.classList.remove(this.TAB_ACTIVE_CLASS);
      t.setAttribute('aria-selected', 'false');
    });

    tab.classList.add(this.TAB_ACTIVE_CLASS);

    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('aria-expanded', 'true');
  }
}

export default Filter;
