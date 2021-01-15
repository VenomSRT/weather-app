import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Geolocation from '@react-native-community/geolocation';
import {observer} from 'mobx-react-lite';
import store from './store/store';

declare const global: {HermesInternal: null | {}};

const App = observer(() => {
  const [initialPosition, setInitialPosition]: any = useState('');
  const [lastPosition, setLastPosition]: any = useState('');

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        alert('You can use the location');
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    requestLocationPermission();
  }, []);

  function makeRequestLocation() {
    Geolocation.getCurrentPosition((position) => {
      const initialPosition = JSON.stringify(position);
      setInitialPosition(initialPosition);
    });
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>See Your Changes</Text>
          <Text style={styles.sectionDescription}>
            {store.latitude} {store.longitude}
          </Text>
          <TouchableOpacity
            style={styles.testButton}
            onPress={() => store.makeChange()}>
            <Text>Make a change</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.testButton}
            onPress={() => makeRequestLocation()}>
            <Text>Make request</Text>
          </TouchableOpacity>
          <Text>Position is: {initialPosition}</Text>
        </View>
      </SafeAreaView>
    </>
  );
});

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  testButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
    maxWidth: 150,
    marginVertical: 10,
  }
});

export default App;
