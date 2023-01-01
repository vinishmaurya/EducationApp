import { View, Text, TextInput, StyleSheet, Button, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from "axios";
import BaseURL from '../config';
import { colors } from '../Component/colors'
import AppStyle, { newTextBox } from '../Constants/AppStyle';
const LoginPage = ({ navigation }) => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    let [isEmail, setIsEmail] = useState(null);
    let [isPassword, setIsPassword] = useState(null);
    function reset() {
        setEmail("");
        setPassword("");
    }
    function submit() {

        // debugger;
        if (Email == "") {
            setIsEmail('false');
            return;
        }
        else {
            setIsEmail("")
        }
        // debugger;
        if (Password == "") {
            setIsPassword("false");
            return;
        }
        else {
            setIsPassword("")
        }
        setIsLoading(true);
        try {
            console.log(`${BaseURL.BASE_URL}/get-UserData`);
            // debugger;
            //get data by api
            axios.post(`${BaseURL.BASE_URL}/get-UserData`, {
                Email: Email,
                Password: Password
            })
                .then(res => {
                    setIsLoading(false);
                    // debugger;
                    let userInfo = res.data;
                    // console.log(userInfo);
                    if (userInfo.getUserData.length) {

                        // console.log(userInfo.getUserData[0].Password);
                        navigation.navigate('Drawer', { screen: 'Dashboard' });
                        // navigation.navigate('Dashboard',
                        // {
                        //     UserId:userInfo.getUserData[0].Email,
                        //     UserId:userInfo.getUserData[0].Password
                        // }
                        // );   

                    }
                    else {
                        window.alert('Invalid Credentials!');
                    }

                })
                .catch(e => {
                    console.log(`post error ${e}`);
                });
        }
        catch (error) {
            console.log(error.message);
        }
    };
    return (
        <ScrollView>
            <Spinner visible={isLoading} textContent={'Please Wait ..'}
                textStyle={{ color: colors.colors.white, fontWeight: '400' }} />
            <Text style={{ fontWeight: '600', fontSize: 20, marginTop: 10, padding: 10 }}>Admin Login</Text>
            <View style={{ flexDirection: 'row', marginHorizontal: 15, marginVertical: 0 }}>
                <View style={style.ViewBok}>
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={[AppStyle.inputParentView]}>Email</Text>
                        <TextInput placeholder='Email' keyboardType={'default'} style={[AppStyle.textBox]} value={Email} onChangeText={setEmail} />
                        <Text style={{ fontWeight: '400', fontSize: 15, color: 'red', display: (isEmail == 'false' ? 'flex' : 'none') }}>
                            {
                                isEmail == "false"
                                    ? "Email is required*"
                                    : ''
                            }
                        </Text>
                        <Text style={{ fontWeight: '400', fontSize: 20, marginTop: 5 }}>Password</Text>
                        <TextInput keyboardType={'phone-pad'} placeholder='Password' style={[AppStyle.textBox]} value={Password} onChangeText={setPassword} />
                        <Text style={{ fontWeight: '400', fontSize: 15, color: 'red', display: (isPassword == 'false' ? 'flex' : 'none') }}>
                            {
                                isPassword == "false"
                                    ? "Password is required*"
                                    : ""
                            }
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ marginHorizontal: 30, justifyContent: 'center', marginTop: 0 }}>
                <Pressable style={[AppStyle.btnPressable]} onPress={submit} >
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Submit</Text>
                </Pressable>
                <Pressable style={[AppStyle.btnPressable]} onPress={reset} >
                    <Text style={[AppStyle.btnText]}>Reset</Text>
                </Pressable>
                <Pressable style={[AppStyle.btnLinkTextPressable]} onPress={() => navigation.navigate('EducationRegistration')} >
                    <Text style={[ AppStyle.btnLinkText ]}>New Registration</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default LoginPage;
const style = StyleSheet.create({
    ViewBok: {
        width: '100%',
    }
});