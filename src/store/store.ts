import {makeAutoObservable, action} from 'mobx';
import {getData} from '../api/api';

interface weatherData {
  timepoint: number;
  cloudcover: number;
  lifted_index: number;
  prec_type: string;
  prec_amount: number;
  temp2m: number;
  rh2m: string;
  wind10m: Wind10m;
  weather: string;
}

interface Wind10m {
  direction: string;
  speed: number;
}

interface sortedWeather extends weatherData {
  weatherDate: string;
}

class Store {
  weatherData: weatherData[] = [];
  weatherForWeek: sortedWeather[] = [];
  timeStamp: string = '';
  currentDate: string = '';
  latitude: string = '';
  longitude: string = '';
  loadingState: boolean = false;
  errorStatus: boolean = false;
  errorMessage: string = '';
  permissionDenied: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setPermissionDenied(state: boolean) {
    this.permissionDenied = state;
  }

  setError(error: any) {
    this.errorStatus = true;
    this.errorMessage = error.message;
  }

  setCoords(currentLatitude: string, currentLongitude: string): void {
    this.latitude = currentLatitude;
    this.longitude = currentLongitude;
  }

  setWeatherData(): void {
    getData(this.latitude, this.longitude).then(
      action('OK', (data: any) => {
        this.weatherData = data.dataseries;
        this.timeStamp = data.init;
        this.currentDate = dateConverter(this.timeStamp);
        this.loadingState = false;
      }),
      action('FAIL', (error: any) => {
        this.setError(error);
        this.loadingState = false;
      }),
    );
  }

  setDataTimeStamp(date: string): void {
    this.timeStamp = date;
  }

  setLoadingState(state: boolean): void {
    this.loadingState = state;
  }

  setWeatherForSevenDays(): void {
    let sortedData: sortedWeather[] = [];
    const nextDay: number = 36 - +this.timeStamp.substring(8);

    for (let i = 0; i < 7; i++) {
      const foundedDay = this.weatherData.find(
        (elem) => elem.timepoint === nextDay + i * 24,
      );

      if (foundedDay) {
        sortedData.push({
          ...foundedDay,
          weatherDate: dateConverter(this.timeStamp, foundedDay.timepoint),
        });
      }
    }

    this.weatherForWeek = sortedData;
  }
}

function dateConverter(timeStamp: string, timepoint: number = 0) {
  return new Date(
    +timeStamp.substring(0, 4),
    +timeStamp.substring(4, 6) > 0 ? +timeStamp.substring(4, 6) - 1 : 0,
    +timeStamp.substring(6, 8),
    +timeStamp.substring(8) + timepoint,
  )
    .toDateString()
    .slice(0, -5);
}

export default new Store();
