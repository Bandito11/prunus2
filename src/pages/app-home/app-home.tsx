import { Component, h, State } from '@stencil/core';
import { ILog } from '../../common/models';
import { formatTime, dateToString } from '../../common/formatted';
import { Element } from '@stencil/core';
import { getAllLogs, update, insert } from '../../prunusdb.service';


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
    const interval = setInterval(() => {
      this.logs = this.getLogs();
      if (this.logs) {
        clearInterval(interval);
      }
    }, 1000);
  }


  getLogs() {
    try {
      const logs = this.addElapsedTime(getAllLogs());
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
      description: opts.description.target.value
    };
    update(log);
    this.updateNotes(opts);
  }

  updateNotes(opts: { id: number, description }) {
    this.logs[opts.id].description = opts.description.target.value;
  }

  logTime() {
    const date = new Date();
    const time = formatTime(date);
    const currentDate = dateToString(date);
    // this.logs.push({ date: currentDate, time: time, description: '', dateObj: new Date().toString() });
    try {
      insert({ date: currentDate, time: time, description: '', dateObj: '' });
    } catch (error) {
      console.error(error);
    }
    const logs = [{
      date: currentDate,
      time: time,
      description: '',
      dateObj: new Date().toString()
    },
    ...this.logs
    ];
    this.logs = [...this.addElapsedTime(logs)];
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
              </ion-button >
              {this.toggle === log.time
                ? <textarea onKeyDown={(event: UIEvent) => this.addNotes({ id: i, log: log, description: event })} > {log.description}</textarea>
                : <div></div>
              }
            </ion-item >
          )}
        </ion-list >
      </ion-content >
    ];
  }
}
