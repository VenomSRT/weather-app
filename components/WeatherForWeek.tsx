import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
} from 'react-native';
import store from '../store/store';

export const WeatherForWeek = () => {
  const weekData = store.weatherData;

  return (
    <View style={{backgroundColor: '#a00'}}>
      <Text>WeatherForWeek</Text>
    </View>

    /*<FlatList
      data={weekData}
      keyExtractor={item => item.timepoint}
      renderItem={({item}) => (
        <View>
          <Text>Timepoint: {item.timepoint}</Text>
          <Text>Temperature: {item.temp2m}</Text>
        </View>
      )}
    />*/
  );
}