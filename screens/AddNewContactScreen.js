import React from 'react';
import { StyleSheet, Text, View, Keyboard, 
    AsyncStorage, Alert, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base';

export default class AddNewContactScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            email: ""

        }
    };

    static navigationOptions = {
        title: "Contact App"
    };

    saveContact = async () => {
        if(
            this.state.firstName != "" &&
            this.state.lastName != "" &&
            this.state.phoneNumber != "" &&
            this.state.address != "" &&
            this.state.email != ""
        ) {
            let contact = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
                email: this.state.email
            }
            await AsyncStorage.setItem(Date.now().toString(), JSON.stringify(contact))
                .then(() => {
                    this.props.navigation.goBack(); // the previous info on the screen was saved
                })
                .catch(err => {
                    console.log(err)
                });
        } else {
            Alert.alert("All fields are required!");
        }
    };

    render() {
        return (
        <View style={styles.container}>
            <Text>Add</Text>
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
