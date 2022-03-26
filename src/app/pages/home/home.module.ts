import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { WeatherDetailsComponent } from 'src/app/components/weather-details/weather-details.component';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, WeatherDetailsComponent, PopoverComponent, ModalComponent],
  entryComponents:[PopoverComponent, ModalComponent]
})
export class HomePageModule {}
