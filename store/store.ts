import {makeAutoObservable} from 'mobx';

class Store {
  weatherData = [];
  latitude: string = '';
  longitude: string = '';
  loadingState: boolean = false;

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

  setLoadingState(state: boolean) {
    this.loadingState = state;
  }
}

export default new Store();