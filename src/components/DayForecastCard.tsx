import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {observer} from 'mobx-react-lite';
import {imagesLinks} from '../images/imagesLinks';
import {cloudCover, precipitation, windSpeed} from '../store/valuesDefinition';

interface CardProps {
  dailyWeather: IdailyWeather;
  fontStyles: {fontSize: number; paddingVertical: number};
}

interface IdailyWeather {
  timepoint: number;
  cloudcover: number;
  lifted_index: number;
  prec_type: string;
  prec_amount: number;
  temp2m: number;
  rh2m: string;
  wind10m: Wind10m;
  weather: string;
  weatherDate: string;
}

interface Wind10m {
  direction: string;
  speed: number;
}

export const DayForecastCard = observer(
  ({dailyWeather, fontStyles}: CardProps) => {
    return (
      <>
        <View>
          <Text style={fontStyles}>{dailyWeather.weatherDate}</Text>
        </View>
        <View style={styles.image_container}>
          <Image
            style={styles.image}
            source={imagesLinks[dailyWeather.weather]}
          />

          {dailyWeather.wind10m.speed > 5 && (
            <Image source={imagesLinks.wind} />
          )}
        </View>
        <View style={styles.descriptions_container}>
          <View style={styles.description_block}>
            <Text style={fontStyles}>Temperature:</Text>
            <Text style={fontStyles}>{dailyWeather.temp2m}C</Text>
          </View>

          <View style={styles.description_block}>
            <Text style={fontStyles}>Cloud cover:</Text>
            <Text style={fontStyles}>
              {cloudCover[dailyWeather.cloudcover]}
            </Text>
          </View>

          <View style={styles.description_block}>
            <Text style={fontStyles}>Humidity:</Text>
            <Text style={fontStyles}>{dailyWeather.rh2m}</Text>
          </View>

          <View style={styles.description_block}>
            <Text style={fontStyles}>Precipitation:</Text>
            <Text style={fontStyles}>
              {precipitation[dailyWeather.prec_amount]}
            </Text>
          </View>

          <View style={styles.description_block}>
            <Text style={fontStyles}>Wind: </Text>
            <Text style={fontStyles}>
              {windSpeed[dailyWeather.wind10m.speed]}{' '}
              {dailyWeather.wind10m.direction}
            </Text>
          </View>
        </View>
      </>
    );
  },
);

const styles = StyleSheet.create({
  data_container: {
    alignItems: 'center',
  },
  image_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  image: {
    width: 110,
    height: 110,
  },
  descriptions_container: {
    width: '100%',
  },
  description_block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  error_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
