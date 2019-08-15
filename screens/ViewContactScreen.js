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

  static navigationOptions = {
    title: "View Contact"
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("WillFocus", () => {
      let key = this.props.navigation.getParam("key", "");
      //TODO: call a method to use key
      this.getContact(key)
    })
  }

  getContact = async key => {
    await AsyncStorage.getItem(key)
      .then(contactJSONString => {
        let contact = JSON.parse(contactJSONString);
        contact[key] = key;
        this.setState({contact});
      })
      .catch(err => console.log(err))
  }


  callAction = phone => {
    let phoneNumber = phone;
    if(Platform.OS != "android") {
      phoneNumber = `telpromt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if(!supported) {
          Alert.alert("Phone number is not available")
        } else {
          return Linking.openURL(phoneNumber)
        }
      })
      .catch(err => console.log(err))
  }

  getSMSAction = phone => {
    let phoneNumber = phone;
    phoneNumber = `sms:${phone}`;
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if(!supported) {
          Alert.alert("Phone number is not available")
        } else {
          return Linking.openURL(phoneNumber)
        }
      })
      .catch(err => console.log(err))
  }

  editContact = key => {
    this.props.navigation.navigate("Edit", {key: key});
  }


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
    backgroundColor: "#fff"
  },
  contactIconContainer: {
    height: 200,
    backgroundColor: "#B83227",
    alignItems: "center",
    justifyContent: "center"
  },
  contactIcon: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#fff"
  },
  nameContainer: {
    width: "100%",
    height: 70,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0
  },
  name: {
    fontSize: 24,
    color: "#000",
    fontWeight: "900"
  },
  infoText: {
    fontSize: 18,
    fontWeight: "300"
  },
  actionContainer: {
    flexDirection: "row"
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  actionText: {
    color: "#B83227",
    fontWeight: "900"
  }
});