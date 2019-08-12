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
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
                <ScrollView style={styles.container}>
                    <Form>
                        <Item style={styles.inputItem}>
                            <Label>First Name</Label>
                            <Input 
                                autoCorrect={false} 
                                autoCapitalize="none"
                                keyboardType="default"
                                onChangeText={firstName => this.setState({firstName})} />
                        </Item>
                        <Item style={styles.inputItem}>
                            <Label>Last Name</Label>
                            <Input 
                                autoCorrect={false} 
                                autoCapitalize="none"
                                keyboardType="default"
                                onChangeText={lastName => this.setState({lastName})} />
                        </Item>
                        <Item style={styles.inputItem}>
                            <Label>Phone Number</Label>
                            <Input 
                                autoCorrect={false} 
                                autoCapitalize="none"
                                keyboardType="number-pad"
                                onChangeText={phoneNumber => this.setState({phoneNumber})} />
                        </Item>
                        <Item style={styles.inputItem}>
                            <Label>Address</Label>
                            <Input 
                                autoCorrect={false} 
                                autoCapitalize="none"
                                keyboardType="default"
                                onChangeText={address => this.setState({address})} />
                        </Item>
                        <Item style={styles.inputItem}>
                            <Label>Email</Label>
                            <Input 
                                autoCorrect={false} 
                                autoCapitalize="none"
                                keyboardType="default"
                                onChangeText={email => this.setState({email})} />
                        </Item>
                    </Form>
                    <Button style={styles.button} full onPress={() => this.saveContact()}>
                        <Text style={styles.buttonText}>Save</Text>
                    </Button>
                </ScrollView>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      margin: 10,
      height: 500
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
    },
    empty: {
      height: 500,
      backgroundColor: "#FFF"
    }
  });
