import { e as registerInstance, i as getContext } from './app-f4f38cb1.js';
import { f as createOverlay, g as dismissOverlay, h as getOverlay } from './chunk-9ba1a082.js';

class AlertController {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.doc = getContext(this, "document");
    }
    /**
     * Create an alert overlay with alert options.
     *
     * @param options The options to use to create the alert.
     */
    create(options) {
        return createOverlay('ion-alert', options);
    }
    /**
     * Dismiss the open alert overlay.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the alert.
     * This can be useful in a button handler for determining which button was
     * clicked to dismiss the alert.
     * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
     * @param id The id of the alert to dismiss. If an id is not provided, it will dismiss the most recently opened alert.
     */
    dismiss(data, role, id) {
        return dismissOverlay(document, data, role, 'ion-alert', id);
    }
    /**
     * Get the most recently opened alert overlay.
     */
    async getTop() {
        return getOverlay(document, 'ion-alert');
    }
}

export { AlertController as ion_alert_controller };