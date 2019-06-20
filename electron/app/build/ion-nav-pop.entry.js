import { e as registerInstance, j as getElement } from './app-f4f38cb1.js';

class NavPop {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    pop() {
        const nav = this.el.closest('ion-nav');
        if (nav) {
            nav.pop({ skipIfBusy: true });
        }
    }
    get el() { return getElement(this); }
}

export { NavPop as ion_nav_pop };
