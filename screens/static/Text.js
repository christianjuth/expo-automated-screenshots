import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function StaticScreen() {
  return (
    <View style={styles.container}>
      <Text>static text!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StaticScreen;
