import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import store from '../store/store';

export const CurrentWeather = () => {
  const currentWeather: any = store.weatherData[0];

  return (
    <View>
      <View>
        <TouchableOpacity>
          <Text>
            Temperature: {currentWeather.temp2m}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}