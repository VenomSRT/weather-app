import {makeAutoObservable} from 'mobx';
import { getData } from './api/api.js';

class Store {
  weatherData = [];
  latitude = 123;
  longitude = 456;

  constructor() {
    makeAutoObservable(this)
  }

  makeChange() {
    this.latitude = this.latitude + 1;
  }

  setWeatherData(longitude: string, latitude: string) {
    getData().then((data: any) => {
      this.weatherData = data;
    })
  }
}

export default new Store();