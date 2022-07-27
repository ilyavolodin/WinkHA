import React from 'react';
import {View, Text} from 'react-native';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    // log error through MQTT
  }

  render() {
    if (this.state.hasError) {
      return (
        <View>
          <Text>Some error occured!</Text>
        </View>
      );
    }

    return this.props.children;
  }
}
