import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, Platform, Alert, AsyncStorage } from 'react-native';
import { Card, CardItem } from 'native-base';
import { Entypo } from '@expo/vector-icons';

export default class ViewContactScreen extends React.Component {

  constructor(props) {
    super(props);
    // press alt and click on lines to edit mulitple lines
    this.state = {
      firstName: "DummyText",
      lastName: "DummyText",
      phoneNumber: "DummyText",
      email: "DummyText",
      address: "DummyText",
      key: "DummyText"
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("WillFocus", () => {
      let key = this.props.navigation.getParam("key", "");
      //TODO: call a method to use key
    })
  }

  static navigationOptions = {
    title: "View Contact"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>View</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
