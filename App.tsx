import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Button,
  FlatList,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import {observer} from 'mobx-react-lite';
import store from './store/store';

declare const global: {HermesInternal: null | {}};

const App = observer(() => {
  let watchID: any = null;
  const [coordsLoading, setCoordsLoading] = useState(false);
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
        store.setWeatherData();
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
    <SafeAreaView>
      <View>
        <Text>Latitude: {store.latitude}</Text>
        <Text>Longitude: {store.longitude}</Text>
      </View>
      <FlatList
        data={store.weatherData}
        keyExtractor={item => item.timepoint}
        renderItem={({item}) => (
          <View>
            <Text>Timepoint: {item.timepoint}</Text>
            <Text>Temperature: {item.temp2m}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({

});

export default App;
