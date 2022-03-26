import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Forecast } from '../models/forecast.model';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  private BASE_URL: string = "https://api.openweathermap.org/data/2.5/";

  private deleteCity$ = new Subject<any>();
  private addCity$ = new Subject<number>();
  private changeStatusBarColor$ = new Subject<string>();
  private autoLocate$ = new Subject<any>();

  deleteCity: Observable<any>;
  addCity: Observable<number>;
  changeStatusBarColor: Observable<string>;
  autoLocate: Observable<any>;

  constructor(private httpClient: HttpClient) {
    this.deleteCity = this.deleteCity$.asObservable();
    this.addCity = this.addCity$.asObservable();
    this.changeStatusBarColor = this.changeStatusBarColor$.asObservable();
    this.autoLocate = this.autoLocate$.asObservable();
  }

  getForecastByCityId(cityId: number): Observable<Forecast> {

    let url = this.BASE_URL + "weather";
    const params = new HttpParams()
      .set('id', cityId.toString())
      .set('appid', '2cde987b2111a895c2ae515824ffa1a1') //add your appid
      .set('units', 'metric');

    return this.httpClient.get<Forecast>(url, { params: params });
  }

  getForecastByLatLon(lat: number, lon: number): Observable<Forecast> {

    let url = this.BASE_URL + "weather";
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('appid', '2cde987b2111a895c2ae515824ffa1a1')
      .set('units', 'metric');

    return this.httpClient.get<Forecast>(url, { params: params });
  }

  getCities(name: string, page: number): Observable<City[]> {

    let url = "https://weather-cities.p1714.app.fit.ba/api/values";
    let params;
    if (/\S/.test(name)) {
      params = new HttpParams()
        .set('name', name)
        .set('page', page.toString())
        .set('perPage', '100');
    } else {
      params = new HttpParams()
        .set('page', page.toString())
        .set('perPage', '100');
    }

    return this.httpClient.get<City[]>(url, { params: params });
  }

  onDeleteCity() {
    this.deleteCity$.next();
  }

  onAddCity(cityId: number) {
    this.addCity$.next(cityId);
  }

  onChangeStatusBarColor(color: string) {
    this.changeStatusBarColor$.next(color);
  }

  onAutoLocate() {
    this.autoLocate$.next();
  }
}
