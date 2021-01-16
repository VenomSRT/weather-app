import {makeAutoObservable} from 'mobx';
import { getData } from './api/api.js';

class Store {
  weatherData = [];
  latitude = '';
  longitude = '';

  constructor() {
    makeAutoObservable(this)
  }

  setCoords(currentLatitude, currentLongitude) {
    this.latitude = currentLatitude;
    this.longitude = currentLongitude;
  }

  setWeatherData() {
    getData(this.latitude, this.longitude).then((data: any) => {
      this.weatherData = data.dataseries;
    })
  }
}

export default new Store();