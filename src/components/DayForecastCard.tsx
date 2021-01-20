import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {observer} from 'mobx-react-lite';
import {imagesLinks} from '../images/imagesLinks';
import {cloudCover, precipitation, windSpeed} from '../store/valuesDefinition';

export const DayForecastCard = observer(({dailyWeather}) => {
  return (
    <>
      <View>
        <Text style={styles.weather_info}>{dailyWeather.weatherDate}</Text>
      </View>
      <View style={styles.image_container}>
        <Image
          style={styles.image}
          source={imagesLinks[dailyWeather.weather]}
        />

        {dailyWeather.wind10m.speed > 5 && <Image source={imagesLinks.wind} />}
      </View>
      <View style={styles.descriptions_container}>
        <View style={styles.description_block}>
          <Text style={styles.weather_info}>Temperature:</Text>
          <Text style={styles.weather_info}>{dailyWeather.temp2m}C</Text>
        </View>

        <View style={styles.description_block}>
          <Text style={styles.weather_info}>Cloud cover:</Text>
          <Text style={styles.weather_info}>
            {cloudCover[dailyWeather.cloudcover]}
          </Text>
        </View>

        <View style={styles.description_block}>
          <Text style={styles.weather_info}>Humidity:</Text>
          <Text style={styles.weather_info}>{dailyWeather.rh2m}</Text>
        </View>

        <View style={styles.description_block}>
          <Text style={styles.weather_info}>Precipitation:</Text>
          <Text style={styles.weather_info}>
            {precipitation[dailyWeather.prec_amount]}
          </Text>
        </View>

        <View style={styles.description_block}>
          <Text style={styles.weather_info}>Wind: </Text>
          <Text style={styles.weather_info}>
            {windSpeed[dailyWeather.wind10m.speed]}{' '}
            {dailyWeather.wind10m.direction}
          </Text>
        </View>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  data_container: {
    alignItems: 'center',
  },
  date: {
    fontSize: 20,
  },
  image_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  image: {
    width: 130,
    height: 130,
  },
  descriptions_container: {
    width: '100%',
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
  error_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
