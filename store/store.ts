import {makeAutoObservable, runInAction} from 'mobx';

class Store {
  weatherData = [];
  latitude: string = '';
  longitude: string = '';

  constructor(){
    makeAutoObservable(this)
  }

  setCoords(currentLatitude: string, currentLongitude: string): void {
    this.latitude = currentLatitude;
    this.longitude = currentLongitude;
  }

  setWeatherData(data: []) {
    this.weatherData = data;
  }
}

export default new Store();