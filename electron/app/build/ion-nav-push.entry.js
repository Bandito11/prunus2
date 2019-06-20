import { e as registerInstance, j as getElement } from './app-f4f38cb1.js';

class NavPush {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    push() {
        const nav = this.el.closest('ion-nav');
        const toPush = this.component;
        if (nav && toPush !== undefined) {
            nav.push(toPush, this.componentProps, { skipIfBusy: true });
        }
    }
    get el() { return getElement(this); }
}

export { NavPush as ion_nav_push };
