import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import screenshot from '../../screenshot-client';

class DynamicScreen extends React.PureComponent{

  state = {
    title: "you shouldn't see this in the screenshot"
  }

  componentDidMount() {
    this.setState({
      title: 'dynamic text!'
    }, () => {
      screenshot.capture();
    });
  }

  render() {
    let { title } = this.state;
    return (
      <View style={styles.container}>
        <Text>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default DynamicScreen;
