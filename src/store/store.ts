import {makeAutoObservable, action} from 'mobx';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
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

  constructor() {
    makeAutoObservable(this);
  }

  async requestLocationPermission(watchID: any) {
    if (Platform.OS === 'ios') {
      this.getOneTimeLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.getOneTimeLocation();
          this.subscribeLocation(watchID);
        } else {
          this.setError(undefined, true);
        }
      } catch (error) {
        this.setError(error, true);
      }
    }
  }

  getOneTimeLocation() {
    this.loadingState = true;

    Geolocation.getCurrentPosition(
      (position) => {
        this.longitude = JSON.stringify(position.coords.longitude);
        this.latitude = JSON.stringify(position.coords.latitude);

        this.setWeatherData();
      },
      (error) => {
        this.setError(error, true);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  }

  subscribeLocation(watchID: any) {
    watchID = Geolocation.watchPosition(
      (position) => {
        this.longitude = JSON.stringify(position.coords.longitude);
        this.latitude = JSON.stringify(position.coords.latitude);
      },
      (error) => {
        this.setError(error, true);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
      },
    );
  }

  setError(error: any = {message: ''}, status: boolean) {
    this.loadingState = false;
    this.errorStatus = status;
    this.errorMessage = error.message;
  }

  setWeatherData(): void {
    this.setError(undefined, false);
    this.loadingState = true;

    getData(this.latitude, this.longitude).then(
      action('OK', (data: any) => {
        this.weatherData = data.dataseries;
        this.timeStamp = data.init;
        this.currentDate = dateConverter(this.timeStamp);
        this.loadingState = false;
      }),
      action('FAIL', (error: any) => {
        this.setError(error, true);
        this.loadingState = false;
      }),
    );
  }

  setDataTimeStamp(date: string): void {
    this.timeStamp = date;
  }

  setWeatherForSevenDays(): void {
    let sortedData: sortedWeather[] = [];
    const nextDay: number = 36 - +this.timeStamp.substring(8);

    for (let i = 0; i < 7; i++) {
      const findedDay = this.weatherData.find(
        (elem) => elem.timepoint === nextDay + i * 24,
      );

      if (findedDay) {
        sortedData.push({
          ...findedDay,
          weatherDate: dateConverter(this.timeStamp, findedDay.timepoint),
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
