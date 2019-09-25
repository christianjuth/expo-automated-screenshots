import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function StaticList() {

  const list = [
    'LIGHT SPEED',
    'RIDICULOUS SPEED',
    'LUDICROUS SPEED',
    'PLAD'
  ];

  return (
    <View style={styles.container}>
      {list.map((text, i) => (
        <Text key={i} style={styles.text}>{text}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    borderWidth: 1,
    padding: 10,
    width: 300,
    textAlign: 'center'
  }
});

export default StaticList;
