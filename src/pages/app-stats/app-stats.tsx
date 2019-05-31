import { Component, h, State } from '@stencil/core';
import { dateToString, toISOFormat } from '../../common/formatted';
import { getLogs } from '../../services/prunusdb.service';
import { IResponse } from '../../common/models';

@Component({
  tag: 'app-stats',
  styleUrl: 'app-stats.css'
})
export class AppStats {
  todayLogs: number;
  @State() chosenDateLogs: number;
  @State() day: string;
  today = new Date();
  timer: number;

  componentWillLoad() {
    this.timer = 0;
    let month;
    let day;
    const interval = setInterval(_ => {
      this.getTodayLogs();
      this.day = dateToString(this.today, 'stats');
      if (this.today.getMonth() < 10){
        month = `0${this.today.getMonth() + 1}`
      }else{
        month = this.today.getMonth() + 1;
      }
      if (this.today.getDate() < 10){
        day = `0${this.today.getDate()}`
      }else{
        day = this.today.getDate();
      }
      this.getDateLogs(`${this.today.getFullYear()}-${month}-${day}`);
      if (this.todayLogs > -1) {
        clearInterval(interval);
      }
    }, 1000);
  }

  getDateLogs(opts) {
    let date: any = {};
      date = {
        ...date,
        getFullYear: () => parseInt(opts.substring(0, 4)),
        getMonth: () => parseInt(opts.substring(5, 7)) - 1,
        getDate: () => parseInt(opts.substring(8, opts.length))
      };
    this.day = toISOFormat(opts);
    const response = getLogs(dateToString(date));
    if (response.success) {
      this.chosenDateLogs = response.data;
    } else {
      console.error(response.error);
    }
  }

  getTodayLogs() {
    let todayResponse: IResponse<number> = {
      success: false,
      error: null,
      data: undefined,
      dateStamp: this.today.toString()
    };
    try {
      todayResponse = {
        ...getLogs(dateToString(this.today))
      };
    } catch (error) {
      console.error(error);
    }
    if (todayResponse.success) {
      this.todayLogs = todayResponse.data;
    } else if (todayResponse.error) {
      console.error(todayResponse.error);
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Stats</ion-title>
        <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-list lines="none">
          <ion-item>
            <h4>Amount of logs today: {this.todayLogs}</h4>
          </ion-item>
          <ion-item detail={true} detailIcon="arrow-dropdown">
            <ion-label>Logs from</ion-label>
            <ion-datetime onIonChange={(event: any) => this.getDateLogs(event.target.value)} placeholder={this.day} display-format="MMM DD, YYYY"></ion-datetime>
          </ion-item>
          <ion-item>
            <h4>Amount of logs on {this.day}: {this.chosenDateLogs}</h4>
          </ion-item>
        </ion-list>

      </ion-content >
    ];
  }
}
