import { e as registerInstance, f as h } from './app-f4f38cb1.js';
import { a as getLogsView, b as update, c as formatTime, d as dateToString, e as insert, f as remove, g as clear } from './chunk-4dbbe503.js';

class AppHome {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.currentDate = '';
    }
    async componentWillLoad() {
        this.logs = await this.getLogs();
    }
    async getLogs() {
        try {
            const logs = await getLogsView();
            logs.applySort((rec1, rec2) => {
                if (rec1.$loki > rec2.$loki) {
                    return -1;
                }
                if (rec1.$loki < rec2.$loki) {
                    return 1;
                }
                return 0;
            });
            return this.addElapsedTime(logs.data());
        }
        catch (error) {
            return error;
        }
    }
    addElapsedTime(logs) {
        return logs.map((log, index) => {
            if (index === 0) {
                return Object.assign({}, log, { elapsedTime: '' });
            }
            else {
                const logDate = new Date(`${log.date} ${log.time}`);
                const prevLogDate = new Date(`${logs[index - 1].date} ${logs[index - 1].time}`);
                const timeDifference = prevLogDate.valueOf() - logDate.valueOf();
                let seconds = (timeDifference / 1000) % 60;
                let minutes = ((timeDifference / (1000 * 60)) % 60);
                const hours = ((timeDifference / (1000 * 60 * 60)) % 24).toFixed(0);
                minutes = (minutes < 10) ? '0' + minutes.toFixed(0) : minutes.toFixed(0);
                seconds = (seconds < 10) ? '0' + seconds.toFixed(0) : seconds.toFixed(0);
                return Object.assign({}, log, { elapsedTime: `${hours}:${minutes}:${seconds}` });
            }
        });
    }
    showNotes(id) {
        if (this.toggle) {
            this.toggle = '';
        }
        else {
            this.toggle = id;
            setTimeout(() => {
                document.querySelector('textarea').focus();
            }, 50);
        }
    }
    addNotes(opts) {
        const log = Object.assign({}, opts.log, { description: opts.description.target.value.trim() });
        const response = update(log);
        if (response.success) {
            this.updateNotes(opts);
        }
        else {
            console.error(response.error);
        }
    }
    updateNotes(opts) {
        this.logs[opts.id].description = opts.description.target.value;
        this.logs = [...this.logs];
    }
    logTime() {
        const date = new Date();
        const time = formatTime(date);
        const currentDate = dateToString(date);
        const response = insert({ date: currentDate, time: time, description: '', dateObj: '' });
        if (response.success) {
            this.logs.unshift({ date: currentDate, time: time, description: '', dateObj: new Date().toString() });
            this.logs = [...this.addElapsedTime(this.logs)];
        }
        else {
            console.error(response.error);
        }
    }
    removeLog(log) {
        const response = remove(log);
        if (response.success) {
            this.logs = [...response.data.data()];
        }
        else {
            console.error(response.error);
        }
        document.querySelector('ion-item-sliding').close();
    }
    async clearLogs() {
        const alertController = document.querySelector('ion-alert-controller');
        await alertController.componentOnReady();
        const alert = await alertController.create({
            header: 'Warning!',
            message: 'Are you sure you want to delete all the logs?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Yes',
                    handler: () => {
                        const response = clear();
                        if (response.success) {
                            this.logs = [];
                        }
                        else {
                            console.error(response.error);
                        }
                    }
                }
            ]
        });
        return await alert.present();
    }
    render() {
        return [
            h("ion-header", null, h("ion-toolbar", { color: "primary" }, h("ion-buttons", { slot: "start" }, h("ion-menu-button", null)), h("ion-buttons", { slot: "end" }, h("ion-alert-controller", null), h("ion-button", { onClick: () => this.clearLogs() }, "Clear")), h("ion-title", null, "Home"))),
            h("ion-content", null, h("ion-button", { onClick: () => this.logTime(), fill: "outline", expand: "block" }, "Log Time"), h("ion-list", { lines: "none" }, this.logs.map((log, i) => h("ion-item-sliding", null, h("ion-item", null, h("ion-label", null, h("h1", null, log.date), h("h3", null, log.time), log.elapsedTime
                ? h("h6", null, "Elapsed time from last log: ", log.elapsedTime)
                : '', log.description
                ? h("p", null, log.description)
                : ''), h("ion-button", { fill: "clear", onClick: () => this.showNotes(log.time) }, h("ion-icon", { name: "paper" })), this.toggle === log.time
                ? h("textarea", { onKeyUp: (event) => this.addNotes({ id: i, log: log, description: event }) }, " ", log.description)
                : ''), h("ion-item-options", { side: "end" }, h("ion-item-option", { color: "Danger", expandable: true, onClick: () => this.removeLog(log) }, "Remove"))))))
        ];
    }
    static get style() { return ""; }
}

export { AppHome as app_home };
