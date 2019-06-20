import { e as registerInstance, f as h } from './app-f4f38cb1.js';
import { d as dateToString, h as toISOFormat, i as getLogs } from './chunk-4dbbe503.js';

class AppStats {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.today = new Date();
    }
    componentWillLoad() {
        this.timer = 0;
        let month;
        let day;
        const interval = setInterval(_ => {
            this.getTodayLogs();
            this.day = dateToString(this.today, 'stats');
            if (this.today.getMonth() < 10) {
                month = `0${this.today.getMonth() + 1}`;
            }
            else {
                month = this.today.getMonth() + 1;
            }
            if (this.today.getDate() < 10) {
                day = `0${this.today.getDate()}`;
            }
            else {
                day = this.today.getDate();
            }
            this.getDateLogs(`${this.today.getFullYear()}-${month}-${day}`);
            if (this.todayLogs > -1) {
                clearInterval(interval);
            }
        }, 1000);
    }
    getDateLogs(opts) {
        let date = {};
        date = Object.assign({}, date, { getFullYear: () => parseInt(opts.substring(0, 4)), getMonth: () => parseInt(opts.substring(5, 7)) - 1, getDate: () => parseInt(opts.substring(8, opts.length)) });
        this.day = toISOFormat(opts);
        const response = getLogs(dateToString(date));
        if (response.success) {
            this.chosenDateLogs = response.data;
        }
        else {
            console.error(response.error);
        }
    }
    getTodayLogs() {
        let todayResponse = {
            success: false,
            error: null,
            data: undefined,
            dateStamp: this.today.toString()
        };
        try {
            todayResponse = Object.assign({}, getLogs(dateToString(this.today)));
        }
        catch (error) {
            console.error(error);
        }
        if (todayResponse.success) {
            this.todayLogs = todayResponse.data;
        }
        else if (todayResponse.error) {
            console.error(todayResponse.error);
        }
    }
    render() {
        return [
            h("ion-header", null, h("ion-toolbar", { color: "primary" }, h("ion-title", null, "Stats"), h("ion-buttons", { slot: "start" }, h("ion-menu-button", null)))),
            h("ion-content", null, h("ion-list", { lines: "none" }, h("ion-item", null, h("h4", null, "Amount of logs today: ", this.todayLogs)), h("ion-item", { detail: true, detailIcon: "arrow-dropdown" }, h("ion-label", null, "Logs from"), h("ion-datetime", { onIonChange: (event) => this.getDateLogs(event.target.value), placeholder: this.day, "display-format": "MMM DD, YYYY" })), h("ion-item", null, h("h4", null, "Amount of logs on ", this.day, ": ", this.chosenDateLogs))))
        ];
    }
    static get style() { return ""; }
}

export { AppStats as app_stats };
