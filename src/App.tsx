import React, {useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {Router, Scene} from 'react-native-router-flux';
import {observer} from 'mobx-react-lite';
import store from './store/store';

import {CurrentWeather} from './components/CurrentWeather';
import {WeatherForWeek} from './components/WeatherForWeek';

const App = observer(() => {
  let watchID: any = null;

  useEffect(() => {
    store.requestLocationPermission(watchID);

    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  return (
    <Router>
      <Scene key="root">
        <Scene
          key="current"
          component={CurrentWeather}
          title="Current weather"
          initial
        />

        <Scene
          key="week"
          component={WeatherForWeek}
          title="Forecast for a week"
        />
      </Scene>
    </Router>
  );
});

export default App;
