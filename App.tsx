import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  PermissionsAndroid,
  Platform,
  ScrollView,
  View,
  Text,
  SafeAreaView
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {Router, Scene} from 'react-native-router-flux';
import {observer} from 'mobx-react-lite';
import store from './store/store';
import { getData } from './api/api.js';

import {CurrentWeather} from './components/CurrentWeather';
import {WeatherForWeek} from './components/WeatherForWeek';


const App = observer(() => {
  let watchID: any = null;
  const [accessToLocationDenied, setAccessToLocationDenied] = useState(false);
  const [coordsLoadingError, setCoordsLoadingError] = useState('');

  useEffect(() => {
    store.setLoadingState(false);
  }, [store.weatherData])

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setAccessToLocationDenied(true);
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestLocationPermission();

    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);

        store.setCoords(currentLatitude, currentLongitude);
        store.setLoadingState(true);
        getData(currentLatitude, currentLongitude)
          .then(data => {
            store.setWeatherData(data.dataseries);
            store.setDataTimeStamp(data.init);
          })
      },
      (error) => {
        setCoordsLoadingError(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 1000
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);

        store.setCoords(currentLatitude, currentLongitude);
      },
      (error) => {
        setCoordsLoadingError(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
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

const styles = StyleSheet.create({
  body: {
    flex: 1
  }
});

export default App;
