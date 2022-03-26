import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ForecastService } from './services/forecast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private forecastService: ForecastService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      if (this.platform.is("android"))
        this.statusBar.backgroundColorByHexString("#33000000");
      this.splashScreen.hide();
    });

    this.forecastService.changeStatusBarColor.subscribe(
      (color: string) => {
        this.statusBar.backgroundColorByHexString(color);
      }
    )
  }
}
