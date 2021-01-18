import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {observer} from 'mobx-react-lite';
import {Actions} from 'react-native-router-flux';
import {getData} from '../api/api';
import {LoadingScreen} from './LoadingScreen';
import store from '../store/store';
import {imagesLinks} from '../images/imagesLinks';
import {cloudCover, precipitation, windSpeed} from '../store/valuesDefinition';

export const CurrentWeather = observer(() => {
  const currentWeather: any = store.weatherData[0];
  
  return (
    <View style={styles.body}>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Actions.week()}>
          <Text style={styles.button_text}>
            Watch forecast for a next 7 days
          </Text>
        </TouchableOpacity>
      </View>

      {store.loadingState && <LoadingScreen />}

      {store.weatherData.length > 0 && !store.loadingState && (
        <View style={styles.data_container}>
          <View style={styles.image_container}>
            <Image
              style={styles.weather_image}
              source={imagesLinks[currentWeather.weather]}
            />

            {currentWeather.wind10m.speed > 5 && (
              <Image style={styles.weather_image} source={imagesLinks.wind} />
            )}
          </View>
          <View>
            <View style={styles.description_block}>
              <Text style={styles.weather_info}>Temperature:</Text>
              <Text style={styles.weather_info}>{currentWeather.temp2m}C</Text>
            </View>

            <View style={styles.description_block}>
              <Text style={styles.weather_info}>Cloud cover:</Text>
              <Text style={styles.weather_info}>{cloudCover[currentWeather.cloudcover]}</Text>              
            </View>

            <View style={styles.description_block}>
              <Text style={styles.weather_info}>Humidity:</Text>
              <Text style={styles.weather_info}>{currentWeather.rh2m}</Text>
            </View>

            <View style={styles.description_block}>
              <Text style={styles.weather_info}>Precipitation:</Text>
              <Text style={styles.weather_info}>{precipitation[currentWeather.prec_amount]}</Text>              
            </View>

            <View style={styles.description_block}>
              <Text style={styles.weather_info}>Wind: </Text>
              <Text style={styles.weather_info}>{windSpeed[currentWeather.wind10m.speed]} {currentWeather.wind10m.direction}</Text>              
            </View>  
          </View>
        </View>
      )}

      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            store.setLoadingState(true);
            getData(store.latitude, store.longitude).then((data) => {
              store.setWeatherData(data.dataseries);
              store.setDataTimeStamp(data.init);
            });
          }}>
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
  image_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  description_block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weather_info: {
    paddingVertical: 5,
    fontSize: 25,
  },
  weather_image: {
    width: 130,
    height: 130,
  },
});
