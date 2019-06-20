import { e as registerInstance, h as createEvent, i as getContext, g as getIonMode, j as getElement, f as h, k as Host } from './app-f4f38cb1.js';
import { h as isEndSide } from './chunk-f3597f81.js';

class ItemOptions {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * The side the option button should be on. Possible values: `"start"` and `"end"`. If you have multiple `ion-item-options`, a side must be provided for each.
         *
         */
        this.side = 'end';
        this.ionSwipe = createEvent(this, "ionSwipe", 7);
        this.win = getContext(this, "window");
    }
    /** @internal */
    async fireSwipeEvent() {
        this.ionSwipe.emit({
            side: this.side
        });
    }
    hostData() {
        const mode = getIonMode(this);
        const isEnd = isEndSide(this.win, this.side);
        return {
            class: {
                [`${mode}`]: true,
                // Used internally for styling
                [`item-options-${mode}`]: true,
                'item-options-start': !isEnd,
                'item-options-end': isEnd
            }
        };
    }
    get el() { return getElement(this); }
    render() { return h(Host, this.hostData()); }
    static get style() { return "ion-item-options {\n  /* stylelint-disable property-blacklist */\n  top: 0;\n  right: 0;\n  /* stylelint-enable property-blacklist */\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n  display: none;\n  position: absolute;\n  height: 100%;\n  font-size: 14px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  z-index: 1;\n}\n[dir=rtl] ion-item-options, :host-context([dir=rtl]) ion-item-options {\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n}\n[dir=rtl] ion-item-options:not(.item-options-end), :host-context([dir=rtl]) ion-item-options:not(.item-options-end) {\n  /* stylelint-disable property-blacklist */\n  right: auto;\n  left: 0;\n  /* stylelint-enable property-blacklist */\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n}\n\n.item-options-start {\n  /* stylelint-disable property-blacklist */\n  right: auto;\n  left: 0;\n  /* stylelint-enable property-blacklist */\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n}\n[dir=rtl] .item-options-start, :host-context([dir=rtl]) .item-options-start {\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n}\n\n.item-options-start ion-item-option:first-child {\n  padding-right: var(--ion-safe-area-left);\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .item-options-start ion-item-option:first-child {\n    padding-right: unset;\n    -webkit-padding-end: var(--ion-safe-area-left);\n    padding-inline-end: var(--ion-safe-area-left);\n  }\n}\n\n.item-options-end ion-item-option:last-child {\n  padding-right: var(--ion-safe-area-right);\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .item-options-end ion-item-option:last-child {\n    padding-right: unset;\n    -webkit-padding-end: var(--ion-safe-area-right);\n    padding-inline-end: var(--ion-safe-area-right);\n  }\n}\n\n[dir=rtl] .item-sliding-active-slide.item-sliding-active-options-start ion-item-options:not(.item-options-end), :host-context([dir=rtl]) .item-sliding-active-slide.item-sliding-active-options-start ion-item-options:not(.item-options-end) {\n  width: 100%;\n  visibility: visible;\n}\n\n.item-sliding-active-slide ion-item-options {\n  display: -ms-flexbox;\n  display: flex;\n  visibility: hidden;\n}\n.item-sliding-active-slide.item-sliding-active-options-start .item-options-start, .item-sliding-active-slide.item-sliding-active-options-end ion-item-options:not(.item-options-start) {\n  width: 100%;\n  visibility: visible;\n}\n\n.item-options-ios {\n  border-bottom-width: 0;\n  border-bottom-style: solid;\n  border-bottom-color: var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, #c8c7cc)));\n}\n.item-options-ios.item-options-end {\n  border-bottom-width: 0.55px;\n}\n\n.list-ios-lines-none .item-options-ios {\n  border-bottom-width: 0;\n}\n\n.list-ios-lines-full .item-options-ios,\n.list-ios-lines-inset .item-options-ios.item-options-end {\n  border-bottom-width: 0.55px;\n}"; }
}

export { ItemOptions as ion_item_options };