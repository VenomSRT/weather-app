import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  PermissionsAndroid,
  Platform,
  ScrollView,
  View,
  Text
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {observer} from 'mobx-react-lite';
import store from './store/store';
import { getData } from './api/api.js';
import {Router, Scene} from 'react-native-router-flux';

import {CurrentWeather} from './components/CurrentWeather';
import {WeatherForWeek} from './components/WeatherForWeek';
import {LoadingScreen} from './components/LoadingScreen';


const App = observer(() => {
  let watchID: any = null;
  const [coordsLoading, setCoordsLoading] = useState(true);
  const [accessToLocationDenied, setAccessToLocationDenied] = useState(false);
  const [coordsLoadingError, setCoordsLoadingError] = useState('');

  useEffect(() => {
    setCoordsLoading(false);
  }, [store.weatherData]);

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
    setCoordsLoading(true);
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);

        store.setCoords(currentLatitude, currentLongitude);
        getData(store.latitude, store.longitude)
          .then(data => {
            store.setWeatherData(data.dataseries);
          })
      },
      (error) => {
        setCoordsLoading(false);
        setCoordsLoadingError(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 100000
      },
    );
  };

  return (
    <View style={styles.body}>
      {coordsLoading && <LoadingScreen />}

      {store.weatherData.length > 0 && <CurrentWeather />}
    </View>
  );
});

const styles = StyleSheet.create({
  body: {
    flex: 1
  }
});

export default App;
