import { Component, h, State } from '@stencil/core';
import { ILog } from '../../common/models';
import { formatTime, dateToString } from '../../common/formatted';
import { update, insert, getLogsView, remove, clear } from '../../services/prunusdb.service';


@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {
  @State() logs: (ILog & Partial<LokiObj>)[];
  @State() toggle;
  currentDate = '';

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
    } catch (error) {
      return error;
    }
  }

  addElapsedTime(logs: ILog[]) {
    return logs.map((log, index) => {
      if (index === 0) {
        return {
          ...log,
          elapsedTime: ''
        };
      } else {
        const logDate = new Date(`${log.date} ${log.time}`);
        const prevLogDate = new Date(`${logs[index - 1].date} ${logs[index - 1].time}`);
        const timeDifference = prevLogDate.valueOf() - logDate.valueOf();
        let seconds: number | string = (timeDifference / 1000) % 60;
        let minutes: number | string = ((timeDifference / (1000 * 60)) % 60);
        const hours = ((timeDifference / (1000 * 60 * 60)) % 24).toFixed(0);
        minutes = (minutes < 10) ? '0' + minutes.toFixed(0) : minutes.toFixed(0);
        seconds = (seconds < 10) ? '0' + seconds.toFixed(0) : seconds.toFixed(0);
        return {
          ...log,
          elapsedTime: `${hours}:${minutes}:${seconds}`
        };
      }
    });
  }

  showNotes(id) {
    if (this.toggle) {
      this.toggle = '';
    } else {
      this.toggle = id;
      setTimeout(() => {
        document.querySelector('textarea').focus();
      }, 50);
    }
  }

  addNotes(opts: { id: number; log: ILog, description }) {
    const log = {
      ...opts.log,
      description: opts.description.target.value.trim()
    };
    const response = update(log);
    if (response.success) {
      this.updateNotes(opts);
    } else {
      console.error(response.error);
    }
  }

  updateNotes(opts: { id: number, description }) {
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
    } else {
      console.error(response.error);
    }
  }


  removeLog(log): void {
    const response = remove(log);
    if (response.success) {
      this.logs = [...response.data.data()];
    } else {
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
            } else {
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
      <ion-header >
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-alert-controller></ion-alert-controller>
            <ion-button onClick={() => this.clearLogs()}>Clear</ion-button>
          </ion-buttons>
          <ion-title>
            Home
          </ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <ion-button onClick={() => this.logTime()} fill="outline" expand="block">Log Time</ion-button>
        <ion-list lines="none">
          {this.logs.map((log, i) =>
            <ion-item-sliding>
              <ion-item>
                <ion-label>
                  <h1>{log.date}</h1>
                  <h3>{log.time}</h3>
                  {log.elapsedTime
                    ? <h6>Elapsed time from last log: {log.elapsedTime}</h6>
                    : ''
                  }
                  {log.description
                    ? <p>{log.description}</p>
                    : ''
                  }
                </ion-label>
                <ion-button fill="clear" onClick={() => this.showNotes(log.time)} >
                  <ion-icon name="paper"></ion-icon>
                </ion-button>
                {this.toggle === log.time
                  ? <textarea onKeyUp={(event: UIEvent) => this.addNotes({ id: i, log: log, description: event })} > {log.description}</textarea>
                  : ''
                }
              </ion-item>
              <ion-item-options side="end">
                <ion-item-option color="Danger" expandable onClick={() => this.removeLog(log)}>
                  Remove
                </ion-item-option>
              </ion-item-options>
            </ion-item-sliding>
          )}
        </ion-list>
      </ion-content>
    ];
  }
}
