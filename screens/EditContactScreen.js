import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, AsyncStorage, Alert } from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base';

export default class EditNewContactScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      email: "",
      key: ""
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      let key = this.props.navigation.getParam("key", "");
      this.getContact();
    })
  };
  
  getContact = async key => {
    await AsyncStorage.getItem(key)
      .then(contactJSONString => {
        let contact = JSON.parse(contactJSONString);
        contact["key"] = key; // set key in this object
        this.setState(contact);
      })
      .catch(err => console.log(err))
  };

  updateContact = async key => {
    if(
      this.state.firstName !== "" && 
      this.state.lastName !== "" &&
      this.state.phoneNumber !== "" &&
      this.state.address !== "" &&
      this.state.email !== "" &&
      this.state.key !== ""
      ) {
        let contact = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber,
          address: this.state.address,
          email: this.state.email,
          key: this.state.key
        }
        await AsyncStorage.mergeItem(key, JSON.stringify(contact))
          .then(() => {
            this.props.navigation.goBack()
          })
          .catch(err => console.log(err))
      }
  }

  static navigationOptions = {
    title: "Edit Contact"
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Edit</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "#B83227",
    marginTop: 40
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});