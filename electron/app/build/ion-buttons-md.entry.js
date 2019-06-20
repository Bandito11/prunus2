import { e as registerInstance, g as getIonMode, f as h, k as Host } from './app-f4f38cb1.js';

class Buttons {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    hostData() {
        const mode = getIonMode(this);
        return {
            class: {
                [`${mode}`]: true
            }
        };
    }
    render() { return h(Host, this.hostData()); }
    static get style() { return ".sc-ion-buttons-md-h {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  z-index: 99;\n}\n\n.sc-ion-buttons-md-s  ion-button  {\n  --padding-top: 0;\n  --padding-bottom: 0;\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n\n.sc-ion-buttons-md-s  ion-button  {\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --padding-start: 8px;\n  --padding-end: 8px;\n  --box-shadow: none;\n  margin-left: 2px;\n  margin-right: 2px;\n  height: 32px;\n  font-size: 14px;\n  font-weight: 500;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .sc-ion-buttons-md-s  ion-button  {\n    margin-left: unset;\n    margin-right: unset;\n    -webkit-margin-start: 2px;\n    margin-inline-start: 2px;\n    -webkit-margin-end: 2px;\n    margin-inline-end: 2px;\n  }\n}\n\n.sc-ion-buttons-md-s  ion-button:not(.button-round)  {\n  --border-radius: 2px;\n}\n\n.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s  .button , .ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s  .button  {\n  --color: initial;\n  --color-activated: initial;\n  --color-focused: initial;\n  --background-hover: rgba(var(--ion-color-contrast-rgb), 0.08);\n  --background-focused: rgba(var(--ion-color-contrast-rgb), 0.24);\n}\n\n.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s  .button-solid , .ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s  .button-solid  {\n  --background: var(--ion-color-contrast);\n  --background-activated: var(--ion-color-contrast);\n  --background-focused: rgba(var(--ion-color-contrast-rgb), 0.9);\n  --color: var(--ion-color-base);\n  --color-focused: var(--ion-color-base);\n}\n\n.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s  .button-outline , .ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s  .button-outline  {\n  --border-color: var(--ion-color-contrast);\n}\n\n.sc-ion-buttons-md-s  .button  {\n  --color-focused: var(--ion-toolbar-color, var(--ion-text-color, #424242));\n  --background-focused: rgba(66, 66, 66, 0.1);\n}\n\n.sc-ion-buttons-md-s  .button-has-icon-only.button-clear  {\n  --padding-top: 12px;\n  --padding-end: 12px;\n  --padding-bottom: 12px;\n  --padding-start: 12px;\n  --border-radius: 50%;\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  width: 48px;\n  height: 48px;\n}\n\n.sc-ion-buttons-md-s  .button-solid  {\n  --color: var(--ion-toolbar-background, var(--ion-background-color, #fff));\n  --color-activated: var(--ion-toolbar-background, var(--ion-background-color, #fff));\n  --color-focused: var(--ion-toolbar-background, var(--ion-background-color, #fff));\n  --background: var(--ion-toolbar-color, var(--ion-text-color, #424242));\n  --background-activated: var(--ion-toolbar-color, var(--ion-text-color, #424242));\n  --background-focused: var(--ion-toolbar-color-activated, #4a4a4a);\n}\n\n.sc-ion-buttons-md-s  .button-outline  {\n  --color: initial;\n  --color-activated: currentColor;\n  --color-focused: var(--ion-toolbar-color, var(--ion-text-color, #424242));\n  --background: transparent;\n  --background-activated: transparent;\n  --border-color: var(--ion-toolbar-color, var(--ion-text-color, #424242));\n  --background-focused: rgba(66, 66, 66, 0.1);\n}\n\n.sc-ion-buttons-md-s  .button-clear  {\n  --color: initial;\n  --color-activated: currentColor;\n  --background: transparent;\n}\n\n.sc-ion-buttons-md-s  ion-icon[slot=start]  {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  margin-right: 0.3em;\n  font-size: 1.4em;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .sc-ion-buttons-md-s  ion-icon[slot=start]  {\n    margin-right: unset;\n    -webkit-margin-end: 0.3em;\n    margin-inline-end: 0.3em;\n  }\n}\n\n.sc-ion-buttons-md-s  ion-icon[slot=end]  {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  margin-left: 0.4em;\n  font-size: 1.4em;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .sc-ion-buttons-md-s  ion-icon[slot=end]  {\n    margin-left: unset;\n    -webkit-margin-start: 0.4em;\n    margin-inline-start: 0.4em;\n  }\n}\n\n.sc-ion-buttons-md-s  ion-icon[slot=icon-only]  {\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  font-size: 1.8em;\n}"; }
}

export { Buttons as ion_buttons };
