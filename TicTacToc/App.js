import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  // punto de partida de la App
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.tile} />
          <View style={styles.tile} />
          <View style={styles.tile} />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.tile} />
          <View style={styles.tile} />
          <View style={styles.tile} />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.tile} />
          <View style={styles.tile} />
          <View style={styles.tile} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  tile: {
    borderWidth: 1,
    width: 100,
    height: 100
  }
});
