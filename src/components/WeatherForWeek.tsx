import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {observer} from 'mobx-react-lite';
import store from '../store/store';
import {DayForecastCard} from './DayForecastCard';

export const WeatherForWeek = observer(() => {
  useEffect(() => {
    store.setWeatherForSevenDays();
  }, []);

  const weekData = store.weatherForWeek;

  return (
    <View>
      <FlatList
        style={styles.list}
        data={weekData}
        keyExtractor={(item) => String(item.timepoint)}
        renderItem={({item}) => (
          <View style={styles.main_container}>
            <View style={styles.data_container}>
              <DayForecastCard
                dailyWeather={item}
                fontStyles={styles.weather_info}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  main_container: {
    paddingHorizontal: 40,
  },
  list: {
    paddingTop: 20,
  },
  data_container: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0092d6',
    borderRadius: 10,
  },
  weather_info: {
    fontSize: 17,
    paddingVertical: 5,
  },
});
