import { e as registerInstance, f as h } from './app-f4f38cb1.js';

class AppRoot {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    goToWindow(url) {
        const ionRouterElement = document.querySelector('ion-router');
        const ionMenuElement = document.querySelector('ion-menu');
        ionRouterElement.push(url);
        ionMenuElement.close();
    }
    render() {
        return [
            h("ion-app", null, h("ion-router", { useHash: false }, h("ion-route", { url: "/", component: "app-home" }), h("ion-route", { url: "/stats", component: "app-stats" })), h("ion-menu", { side: "start", contentId: "menu-content" }, h("ion-header", null, h("ion-toolbar", { color: "primary" }, h("ion-title", null, "Menu"))), h("ion-content", null, h("ion-list", null, h("ion-item", { onClick: _ => this.goToWindow('/') }, "Home"), h("ion-item", { onClick: _ => this.goToWindow('/stats') }, "Stats")))), h("ion-nav", { id: "menu-content" }))
        ];
    }
    static get style() { return "ion-item {\n    cursor: pointer;\n}"; }
}

export { AppRoot as app_root };
