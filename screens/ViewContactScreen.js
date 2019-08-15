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
    navigation.addListener("willFocus", () => {
      let key = this.props.navigation.getParam("key", "");
      this.getContact(key)
    })
  }

  getContact = async key => {
    await AsyncStorage.getItem(key)
      .then(contactJSONString => {
        let contact = JSON.parse(contactJSONString); // turns into JSON
        contact["key"] = key;
        this.setState(contact); // no need for {} since contact is a JSON
      })
      .catch(err => console.log(err))
  }


  callAction = phone => {
    let phoneNumber = phone;
    if(Platform.OS !== "android") {
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
      <ScrollView style={styles.container}>
        <View style={styles.contactIconContainer}>
          <Text style={styles.contactIcon}>
            {this.state.firstName[0].toUpperCase()}
          </Text>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{this.state.firstName} {this.state.lastName}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Card>
            <CardItem bordered>
              <Text style={styles.infoText}>Phone</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.phoneNumber}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem bordered>
              <Text style={styles.infoText}>Email</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.email}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem bordered>
              <Text style={styles.infoText}>Address</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.address}</Text>
            </CardItem>
          </Card>
        </View>
      </ScrollView>
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
  infoContainer: {
    flexDirection: "column"
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