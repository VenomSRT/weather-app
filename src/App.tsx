import React, {useState, useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {Router, Scene} from 'react-native-router-flux';
import {observer} from 'mobx-react-lite';
import store from './store/store';

import {CurrentWeather} from './components/CurrentWeather';
import {WeatherForWeek} from './components/WeatherForWeek';

const App = observer(() => {
  let watchID: any = null;

  useEffect(() => {
    store.setLoadingState(false);
  }, [store.weatherData]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation();
            subscribeLocation();
          } else {
            store.setPermissionDenied(true);
          }
        } catch (error) {
          store.setError(error);
        }
      }
    };

    requestLocationPermission();

    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    store.setLoadingState(true);

    Geolocation.getCurrentPosition(
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);

        store.setCoords(currentLatitude, currentLongitude);

        store.setWeatherData();
      },
      (error) => {
        store.setError(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);

        store.setCoords(currentLatitude, currentLongitude);
      },
      (error) => {
        store.setError(error);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  return (
    <Router>
      <Scene key="root">
        <Scene
          key="current"
          component={CurrentWeather}
          title="Current weather"
          initial
        />

        <Scene
          key="week"
          component={WeatherForWeek}
          title="Forecast for a week"
        />
      </Scene>
    </Router>
  );
});

export default App;
