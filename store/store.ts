import {makeAutoObservable} from 'mobx';

class Store {
  weatherData: any = [];
  timeStamp: string = '';
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

  setWeatherData(data: []): void {
    this.weatherData = data;
  }

  setDataTimeStamp(date: string): void {
    this.timeStamp = date;
  }

  setLoadingState(state: boolean): void {
    this.loadingState = state;
  }
}

export default new Store();