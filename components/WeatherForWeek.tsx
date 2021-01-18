import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import store from '../store/store';
import {imagesLinks} from '../images/imagesLinks';
import {cloudCover, precipitation, windSpeed} from '../store/valuesDefinition';

export const WeatherForWeek = observer(() => {
  const nextMidday: number = 12 - +store.timeStamp.substring(8);
  const weekData = findSevenDays();
  
  function findSevenDays() {
    let sorted = [];

    for(let i = 0; i < 7; i++) {
      sorted.push(store.weatherData.find((elem: any) => elem.timepoint === nextMidday + i * 24));
    }

    return sorted;
  } 

  return (
    <View>
      <FlatList
        data={weekData}
        keyExtractor={item => item.timepoint}
        renderItem={({item}) => (
          <View style={styles.main_container}>
            <View style={styles.data_container}>
              <View style={styles.image_container}>
                <Image source={imagesLinks[item.weather]}/>
  
                {item.wind10m.speed > 5 && (
                  <Image source={imagesLinks.wind} />
                )}
              </View>
              <View style={styles.descriptions_container}>
                <View style={styles.description_block}>
                  <Text style={styles.weather_info}>Temperature:</Text>
                  <Text style={styles.weather_info}>{item.temp2m}C</Text>
                </View>
  
                <View style={styles.description_block}>
                  <Text style={styles.weather_info}>Cloud cover:</Text>
                  <Text style={styles.weather_info}>{cloudCover[item.cloudcover]}</Text>              
                </View>
  
                <View style={styles.description_block}>
                  <Text style={styles.weather_info}>Humidity:</Text>
                  <Text style={styles.weather_info}>{item.rh2m}</Text>
                </View>
  
                <View style={styles.description_block}>
                  <Text style={styles.weather_info}>Precipitation:</Text>
                  <Text style={styles.weather_info}>{precipitation[item.prec_amount]}</Text>              
                </View>
  
                <View style={styles.description_block}>
                  <Text style={styles.weather_info}>Wind: </Text>
                  <Text style={styles.weather_info}>{windSpeed[item.wind10m.speed]} {item.wind10m.direction}</Text>              
                </View>  
              </View>
            </View>
          </View>
        )}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  main_container: {
    paddingHorizontal: 40,
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
  image_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
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
  },
})