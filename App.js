import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert, TextInput } from "react-native";
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as MailComposer from 'expo-mail-composer'

const Stack = createNativeStackNavigator();



export default function App() { 
     [emailAddress, setEmailAddress] = useState();
     [message, setMessage] = useState();

    onChangeEmailHandler = (value) => {
        setEmailAddress(value);
    }

    onChangeMessageHandler = (value) => {
        setMessage(value);
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Email" component={EmailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );

    function HomeScreen({ navigation }) {
        return (
            <View style={styles.title}>
                <Text>EMAIL COMPOSER</Text>
                <Text style={styles.buttonText}> CLICK THE BUTTON BELOW TO GO TO EMAIL SCREEN</Text>
                <Button title="COMPOSE EMAIL" color='#000' onPress={() => navigation.navigate("Email")}></Button>
            </View>
        );
    }

   
}

function EmailScreen() {


    sendEmail = async () => {
        const isAvailable = await MailComposer.isAvailableAsync();

        if (isAvailable) {
            var options = {
                recipients: [emailAddress],
                subject: 'Hello',
                body: message
            };
            Alert.alert("Your email has been sent")
            MailComposer.composeAsync(options).then((result) => { console.log(result.status) })
        } else {
            Alert.alert("email is not avalable");
        }
    }

    return (
        <View style={styles.form}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
                value={emailAddress}
                style={styles.textInput}
                onChangeText={onChangeEmailHandler}
            />
            <Text style={styles.label}>MESSAGE</Text>
            <TextInput
                value={message}
                style={styles.textInput}
                multiline
                numberOfLines={10}
                onChangeText={onChangeMessageHandler}
            />
            <Button
                title="Send Email" color='#000'
                onPress={sendEmail}
            />
        </View>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        flex: 1,
        backgroundColor: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonText: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 60,

            },
    form: {
        margin: 30,
        marginTop:60
    },
    textInput: {
        borderColor: '#000',
        borderWidth: 3,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2,
        textAlignVertical: 'top'
    }
});


