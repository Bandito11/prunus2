import { e as registerInstance, i as getContext } from './app-f4f38cb1.js';
import { f as createOverlay, g as dismissOverlay, h as getOverlay } from './chunk-9ba1a082.js';

class PickerController {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.doc = getContext(this, "document");
    }
    /**
     * Create a picker overlay with picker options.
     *
     * @param options The options to use to create the picker.
     */
    create(options) {
        return createOverlay('ion-picker', options);
    }
    /**
     * Dismiss the open picker overlay.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the picker.
     * This can be useful in a button handler for determining which button was
     * clicked to dismiss the picker.
     * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
     * @param id The id of the picker to dismiss. If an id is not provided, it will dismiss the most recently opened picker.
     */
    dismiss(data, role, id) {
        return dismissOverlay(document, data, role, 'ion-picker', id);
    }
    /**
     * Get the most recently opened picker overlay.
     */
    async getTop() {
        return getOverlay(document, 'ion-picker');
    }
}

export { PickerController as ion_picker_controller };
