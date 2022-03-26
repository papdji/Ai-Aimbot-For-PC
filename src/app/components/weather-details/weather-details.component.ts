import { Component, OnInit, Input } from '@angular/core';
import { Forecast } from 'src/app/models/forecast.model';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
})
export class WeatherDetailsComponent implements OnInit {

  @Input() forecast: Forecast;
  icon: string;
  constructor() { }

  ngOnInit() {
    if (this.forecast.weather[0].id >= 200 && this.forecast.weather[0].id <= 232)
      this.icon = "../assets/condition/storm-64.png";
    else if (this.forecast.weather[0].id >= 300 && this.forecast.weather[0].id <= 321)
      this.icon = "../assets/condition/sleet-64.png";
    else if (this.forecast.weather[0].id >= 500 && this.forecast.weather[0].id <= 531)
      this.icon = "../assets/condition/rain-64.png";
    else if (this.forecast.weather[0].id >= 600 && this.forecast.weather[0].id <= 622)
      this.icon = "../assets/condition/snow-64.png";
    else if (this.forecast.weather[0].id >= 701 && this.forecast.weather[0].id <= 781)
      this.icon = "../assets/condition/fog.png";
    else if (this.forecast.weather[0].id === 801 || this.forecast.weather[0].id === 802)
      this.icon = "../assets/condition/partly-cloudy-day-64.png";
    else if (this.forecast.weather[0].id === 803 || this.forecast.weather[0].id === 804)
      this.icon = "../assets/condition/clouds-64.png";
    else if (this.forecast.weather[0].id === 800 && this.forecast.weather[0].icon === "01n")
      this.icon = "../assets/condition/moon-4-64.png";
    else
      this.icon = "../assets/condition/sun-4-64.png";
  }
}
