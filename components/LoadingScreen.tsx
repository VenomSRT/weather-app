import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

export const LoadingScreen = () => {

  return (
    <View style={styles.body}>
      <ActivityIndicator size="large" color="#008cff" />
      <Text style={styles.title}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    fontSize: 20,
  }
})