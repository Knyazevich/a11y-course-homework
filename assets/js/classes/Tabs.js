import { qs, qsAll } from '../dom-helpers';

class Tabs {
  constructor(options) {
    this.tabsContainer = qs(options.tabsContainer) || null;
    this.tabs = qsAll('[role="tab"]', this.tabsContainer);
    this.tabPanels = qsAll('[role="tabpanel"]', this.tabsContainer);
    this.TAB_ACTIVE_CLASS = 'tabs__tab--active';

    this.currentTab = null;
    this.tabList = null;
    this.tabPanel = null;

    if (!this.tabsContainer) {
      throw new Error('tabsContainer is null');
    }

    this._run();
  }

  _run() {
    const tabs = qsAll('[role="tab"]', this.tabsContainer);

    if (!tabs) {
      console.warn('There are no tabs'); // eslint-disable-line
      return;
    }

    this.currentTab = tabs[0];

    tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        this._changeTab(e.target);
      });
    });
  }

  _changeTab(tab) {
    this._makeTabActive(tab);
  }

  isActiveTab(tab) {
    console.log(tab.getAttribute('aria-selected'));
    return !!tab.getAttribute('aria-selected');
  }

  _makeTabActive(tab) {
    const newActiveTabPanel = qs(`#${tab.getAttribute('aria-controls')}`, this.tabsContainer);

    this.tabs.forEach((t) => {
      t.classList.remove(this.TAB_ACTIVE_CLASS);
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('aria-expanded', 'false');
    });

    this.tabPanels.forEach((tabPanel) => {
      tabPanel.classList.add('hidden');
    });

    tab.classList.add('tabs__tab--active');

    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('aria-expanded', 'true');

    newActiveTabPanel.classList.remove('hidden');
  }
}

export default Tabs;
