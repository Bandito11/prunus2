import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  goToWindow(url) {
    const ionRouterElement = document.querySelector('ion-router');
    const ionMenuElement = document.querySelector('ion-menu');
    ionRouterElement.push(url);
    ionMenuElement.close();
  }

  render() {
    return [
      <ion-app>
        <ion-router useHash={false} >
          <ion-route url="/" component="app-home" />
          <ion-route url="/stats" component="app-stats" />
        </ion-router>
        <ion-menu side="start" contentId="menu-content">
          <ion-header>
            <ion-toolbar color="primary">
              <ion-title>Menu</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content>
            <ion-list>
              <ion-item onClick={_ => this.goToWindow('/')}>
                Home
              </ion-item>
              <ion-item onClick={_ => this.goToWindow('/stats')}>
                Stats
              </ion-item>
            </ion-list>
          </ion-content>
        </ion-menu>
        <ion-nav id="menu-content" />
      </ion-app>
    ];
  }
}
