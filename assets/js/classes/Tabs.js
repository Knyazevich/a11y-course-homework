import { qs, qsAll } from '../dom-helpers';

class Tabs {
  constructor(options) {
    this.tabsContainer = qs(options.tabsContainer) || null;
    this.tabs = qsAll('[role="tab"]', this.tabsContainer);
    this.tabPanels = qsAll('[role="tabpanel"]', this.tabsContainer);
    this.TAB_ACTIVE_CLASS = 'tabs__tab--active';

    this.tabList = null;
    this.tabPanel = null;

    if (!this.tabsContainer) {
      throw new Error('tabsContainer is null');
    }

    this._run();
  }

  _run() {
    if (!this.tabs) {
      console.warn('There are no tabs'); // eslint-disable-line
      return;
    }

    this.tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => this._changeTab(e.target));
    });
  }

  _changeTab(tab) {
    const newActiveTabPanel = qs(`#${tab.getAttribute('aria-controls')}`, this.tabsContainer);

    this.tabs.forEach((t) => {
      t.classList.remove(this.TAB_ACTIVE_CLASS);
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('aria-expanded', 'false');
    });

    this.tabPanels.forEach((tabPanel) => {
      tabPanel.classList.add('hidden');
    });

    tab.classList.add(this.TAB_ACTIVE_CLASS);

    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('aria-expanded', 'true');

    newActiveTabPanel.classList.remove('hidden');
  }
}

export default Tabs;
