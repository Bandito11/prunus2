import { Component, h, State } from '@stencil/core';
import { ILog } from '../../common/models';
import { formatTime, dateToString } from '../../common/formatted';
import { Element } from '@stencil/core';
import { update, insert, getLogsView } from '../../services/prunusdb.service';


@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {
  @State() logs: any[];
  timer: number;
  @State() toggle;
  currentDate = '';

  @Element() notesElement: HTMLElement;

  componentWillLoad() {
    this.timer = 0;
    this.logs = [];
    let temp;
    const interval = setInterval(() => {
      temp = this.getLogs();
      if (temp) {
        this.logs = temp;
        clearInterval(interval);
      }
    }, 1000);
  }


  getLogs() {
    try {
      const view = getLogsView();
      view.applySort((rec1, rec2) => {
        if (rec1.$loki > rec2.$loki) {
          return -1;
        }
      });
      let logs;
      if (navigator.userAgent.match('Firefox') || !navigator.userAgent.match('Pixel 3')) {
        logs = this.addElapsedTime(view.data().reverse());
      } else {
        logs = this.addElapsedTime(view.data());
      }
      return logs;
    } catch (error) {
      return;
    }
  }

  addElapsedTime(logs: ILog[]) {
    const res = logs.map((log, index) => {
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
    return res;
  }

  showNotes(id) {
    if (this.toggle) {
      this.toggle = '';
    } else {
      this.toggle = id;
      setTimeout(() => {
        this.notesElement.focus();
      }, 1000);
    }
  }

  addNotes(opts: { id: number; log: ILog, description }) {
    clearTimeout(this.timer);
    const log = {
      ...opts.log,
      description: opts.description.target.value.trim()
    };
    update(log);
    this.updateNotes(opts);
  }

  updateNotes(opts: { id: number, description }) {
    this.logs[opts.id].description = opts.description.target.value;
    this.logs = [...this.logs];
  }

  logTime() {
    const date = new Date();
    const time = formatTime(date);
    const currentDate = dateToString(date);
    try {
      insert({ date: currentDate, time: time, description: '', dateObj: '' });
    } catch (error) {
      console.error(error);
    }
    this.logs.unshift({ date: currentDate, time: time, description: '', dateObj: new Date().toString() });
    this.logs = [...this.addElapsedTime(this.logs)];
  }

  render() {
    return [
      <ion-header >
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
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
            </ion-item >
          )}
        </ion-list>
      </ion-content>
    ];
  }
}
