import { e as registerInstance, i as getContext, g as getIonMode, j as getElement, f as h, k as Host, l as isPlatform } from './app-f4f38cb1.js';
import { a as rIC } from './chunk-f3597f81.js';

class App {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.win = getContext(this, "window");
        this.config = getContext(this, "config");
    }
    componentDidLoad() {
        rIC(() => {
            const { win, config } = this;
            if (!config.getBoolean('_testing')) {
                importTapClick(win, config);
            }
            importInputShims(win, config);
            importStatusTap(win, config);
            importHardwareBackButton(win, config);
            importFocusVisible(win);
        });
    }
    hostData() {
        const mode = getIonMode(this);
        return {
            class: {
                [`${mode}`]: true,
                'ion-page': true,
                'force-statusbar-padding': this.config.getBoolean('_forceStatusbarPadding')
            }
        };
    }
    get el() { return getElement(this); }
    render() { return h(Host, this.hostData()); }
    static get style() { return "html.plt-mobile ion-app {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\nion-app.force-statusbar-padding {\n  --ion-safe-area-top: 20px;\n}"; }
}
function importHardwareBackButton(win, config) {
    const hardwareBackConfig = config.getBoolean('hardwareBackButton', isPlatform(win, 'hybrid'));
    if (hardwareBackConfig) {
        __sc_import_app('./hardware-back-button-a5b5b799.js').then(module => module.startHardwareBackButton(win));
    }
}
function importStatusTap(win, config) {
    const statusTap = config.getBoolean('statusTap', isPlatform(win, 'hybrid'));
    if (statusTap) {
        __sc_import_app('./status-tap-be488a58.js').then(module => module.startStatusTap(win));
    }
}
function importFocusVisible(win) {
    __sc_import_app('./focus-visible-847abe33.js').then(module => module.startFocusVisible(win.document));
}
function importTapClick(win, config) {
    __sc_import_app('./tap-click-71412226.js').then(module => module.startTapClick(win.document, config));
}
function importInputShims(win, config) {
    const inputShims = config.getBoolean('inputShims', needInputShims(win));
    if (inputShims) {
        __sc_import_app('./input-shims-b4f3cb1a.js').then(module => module.startInputShims(win.document, config));
    }
}
function needInputShims(win) {
    return isPlatform(win, 'ios') && isPlatform(win, 'mobile');
}

export { App as ion_app };
