import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ForecastService } from 'src/app/services/forecast.service';
import { Forecast } from 'src/app/models/forecast.model';
import { DatePipe } from '@angular/common';
import { IonSlides, PopoverController, AlertController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  @ViewChild(IonSlides, { static: false }) slider: IonSlides;
  cityIds: number[];
  forecast: Forecast[] = [];
  lastUpdateDate: string;
  contentBgColor: string;
  toolbarBgColor: string;
  activeSlideCityName: string;
  counter: number;

  constructor(
    private forecastService: ForecastService,
    private datePipe: DatePipe,
    private popoverController: PopoverController,
    public alertController: AlertController,
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
    this.contentBgColor = "clear";
    this.toolbarBgColor = "#51a4da";
    this.counter = 0;
    this.cityIds = [3191281];
    this.activeSlideCityName = "N/A";
    this.lastUpdateDate = "N/A";

    this.forecastService.deleteCity.subscribe(
      () => {
        this.presentAlert(this.activeSlideCityName);
      }
    );

    this.forecastService.addCity.subscribe(
      (cityId: number) => {
        let duplicate = this.cityIds.includes(cityId);
        if (!duplicate) {
          this.cityIds = this.cityIds.concat(cityId);
          this.getForecast(this.cityIds[this.counter], true);
        }
      }
    );

    this.forecastService.autoLocate.subscribe(
      () => {
        this.getCurrentPosition();
      }
    );

    this.getForecast(this.cityIds[this.counter]);
  }

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  getForecast(cityId: number, autoSlideTo: boolean = false, getByCityId: boolean = true, lat: number = 0, lon: number = 0) {
    if (getByCityId) {
      this.forecastService.getForecastByCityId(cityId).subscribe(
        (res: Forecast) => {
          this.forecast = this.forecast.concat(res);
          if (++this.counter < this.cityIds.length)
            this.getForecast(this.cityIds[this.counter]);
          else {
            this.lastUpdateDate = this.datePipe.transform(Date.now(), "d. E, h:mm a")
            if (autoSlideTo) {
              setTimeout(() => {
                this.slider.slideTo(this.counter);
              }, 10)
            }
            this.changeToolbarTitle();
            console.log(this.forecast);
          }
        },
        (err) => {
          console.log(err);
        }
      )
    } else {//autolocate
      this.forecastService.getForecastByLatLon(lat, lon).subscribe(
        (res: Forecast) => {
          let duplicate = this.cityIds.includes(res.id);
          if (!duplicate) {
            this.forecast = this.forecast.concat(res);
            this.cityIds = this.cityIds.concat(res.id);
            if (++this.counter < this.cityIds.length)
              this.getForecast(this.cityIds[this.counter]);
            else {
              this.lastUpdateDate = this.datePipe.transform(Date.now(), "d. E, h:mm a")
              if (autoSlideTo) {
                setTimeout(() => {
                  this.slider.slideTo(this.counter);
                }, 10)
              }
              this.changeToolbarTitle();
              console.log(this.forecast);
            }
          }
        },
        (err) => {
          console.log(err);
        }
      )
    }
  }

  async deleteCityFromSlides() {
    let index = await this.getActiveSlidesIndex();
    this.forecast.splice(index, 1);
    this.changeToolbarTitle();
  }

  async changeToolbarTitle() {
    let index = await this.getActiveSlidesIndex();
    if (index <= (this.forecast.length - 1))
      this.activeSlideCityName = this.forecast[index].name;
    else
      this.activeSlideCityName = this.forecast[--index].name;

    if (this.forecast[index].weather[0].id >= 200 && this.forecast[index].weather[0].id <= 232) {
      this.contentBgColor = "night";
      this.toolbarBgColor = "#4066a4";
    }
    else if (this.forecast[index].weather[0].id >= 300 && this.forecast[index].weather[0].id <= 622) {
      this.contentBgColor = "sleet";
      this.toolbarBgColor = "#787c87";
    }
    else if (this.forecast[index].weather[0].id >= 701 && this.forecast[index].weather[0].id <= 781) {
      this.contentBgColor = "fog";
      this.toolbarBgColor = "#bc8db9";
    }
    else if (this.forecast[index].weather[0].id === 801 || this.forecast[index].weather[0].id === 802 || this.forecast[index].weather[0].id === 803 || this.forecast[index].weather[0].id === 804) {
      this.contentBgColor = "cloud";
      this.toolbarBgColor = "#5594b3";
    }
    else if (this.forecast[index].weather[0].id === 800 && this.forecast[index].weather[0].icon === "01n") {
      this.contentBgColor = "night";
      this.toolbarBgColor = "#122259";
    }
    else {
      this.contentBgColor = "clear";
      this.toolbarBgColor = "#51a4da";
    }

    this.forecastService.onChangeStatusBarColor(this.toolbarBgColor);
  }

  getCurrentPosition() {
    this.geolocation.getCurrentPosition().then((res) => {
      console.log(res.coords.latitude);
      console.log(res.coords.longitude);
      this.getForecast(0, true, false, res.coords.latitude, res.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  async getActiveSlidesIndex() {
    return await this.slider.getActiveIndex();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev
    });
    return await popover.present();
  }

  async presentAlert(cityName: string) {
    const alert = await this.alertController.create({
      header: 'Warning',
      message: 'Are you sure you want to delete ' + cityName + " from active cities?",
      buttons: [
        {
          text: 'OK',
          handler: async () => {
            await this.deleteCityFromSlides();
          }
        },
        {
          text: 'Cancel',
          role: "cancel"
        }
      ]
    });

    return await alert.present();
  }
}
