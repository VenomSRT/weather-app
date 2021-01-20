import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {observer} from 'mobx-react-lite';
import {Actions} from 'react-native-router-flux';
import {LoadingScreen} from './LoadingScreen';
import store from '../store/store';
import {DayForecastCard} from './DayForecastCard';

export const CurrentWeather = observer(() => {
  const currentWeather: any =
    store.weatherData.length > 0 ? store.weatherData[0] : null;

  return (
    <View style={styles.body}>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => Actions.week()}>
          <Text style={styles.button_text}>
            Watch forecast for a next 7 days
          </Text>
        </TouchableOpacity>
      </View>

      {store.loadingState && <LoadingScreen />}

      {store.errorStatus && (
        <View style={styles.error_container}>
          <Text>
            {store.errorMessage || 'Allow location access to this app'}
          </Text>
        </View>
      )}

      {currentWeather && !store.loadingState && (
        <View style={styles.data_container}>
          <DayForecastCard dailyWeather={currentWeather} />
        </View>
      )}

      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => store.setWeatherData()}>
          <Text style={styles.button_text}>Update data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    backgroundColor: '#0092d6',
  },
  button_text: {
    fontSize: 25,
    textAlign: 'center',
    color: '#ffffff',
  },
  data_container: {
    alignItems: 'center',
  },
  error_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
