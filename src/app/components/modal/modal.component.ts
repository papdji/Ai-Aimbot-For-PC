import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ForecastService } from 'src/app/services/forecast.service';
import { City } from 'src/app/models/city.model';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  search: string;
  cities: City[];
  page: number;
  isLoading: boolean;
  disableVirtualScroll: boolean;
  hasDataToDisplay: boolean;

  constructor(private modalCtr: ModalController, private service: ForecastService, public toastController: ToastController) { }

  ngOnInit() {
    this.search = "";
    this.cities = [];
    this.page = 1;
    this.getCities();
  }

  async dismiss() {
    await this.modalCtr.dismiss();
  }

  searchChanged() {
    this.page = 1;
    this.cities = [];
    this.getCities();
  }

  getCities(event?) {
    if (this.cities.length < 1)
      this.isLoading = true;

    this.service.getCities(this.search, this.page).subscribe(
      (res: City[]) => {
        if (event)
          event.target.complete();
        this.disableVirtualScroll = false;
        this.isLoading = false;
        this.hasDataToDisplay = true;
        this.cities = this.cities.concat(res);
      },
      (err) => {
        if (event)
          event.target.complete();
        console.log(err);
        this.isLoading = false;
        this.disableVirtualScroll = true;
        this.hasDataToDisplay = false;
        this.presentToast();
      }
    )
  }

  loadData($event) {
    this.page++;
    this.getCities($event);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'No more results...',
      duration: 2000
    });
    toast.present();
  }

  addCityToActiveCities(item: City) {
    this.service.onAddCity(item.id);
    this.dismiss();
  }
}
