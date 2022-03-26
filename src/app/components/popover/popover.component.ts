import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';
import { ForecastService } from 'src/app/services/forecast.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(private modalCtr: ModalController, private popoverCtr: PopoverController, private forecastService: ForecastService) { }

  ngOnInit() { }

  async presentModal() {
    this.popoverCtr.dismiss();
    const modal = await this.modalCtr.create({
      component: ModalComponent
    });
    return await modal.present();
  }

  removeElement() {
    this.popoverCtr.dismiss();
    this.forecastService.onDeleteCity();
  }

  autoLocate() {
    this.popoverCtr.dismiss();
    this.forecastService.onAutoLocate();
  }
}
