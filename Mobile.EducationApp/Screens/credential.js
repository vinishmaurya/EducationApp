import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native'
import BaseURL from '../config';
import { colors } from '../Component/colors'
import React, { useState } from 'react'
import axios from "axios";
import Spinner from 'react-native-loading-spinner-overlay';
const Credential = ({ navigation }) => {
    const [Email, setEmail] = useState("");
    const [isEmail, setisEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [isPassword, setisPassword] = useState("");
    const [RePassword, setRePassword] = useState("");
    const [isRePassword, setisRePassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    function formSubmit() {
        if (!Email || Email.value == "") {
            setisEmail("false");
            return;
        }
        else {
            setisEmail("");
        }

        if (Password == "") {
            setisPassword("false");
            return;
        }
        else {
            setisPassword("");
        }
        if (RePassword == "") {
            setisRePassword("false");
            return;
        }
        else {
            setisRePassword("");
        }
        setIsLoading(true);
        if (Password === RePassword) {
            
            try {
                
                //Save Data by api
                axios.post(`${BaseURL.BASE_URL}/post-credential-data`, {
                    Email: Email,
                    Password: Password,
                    RePassword: RePassword
                })
                    .then(res => {
                        let userInfo = res.data;
                        Alert.alert(
                            "Credential Data",
                            userInfo.Message,
                            [

                                { text: "OK", }
                            ]
                        );
                        navigation.navigate('BackendApproval')

                    })
                    .catch(e => {
                        console.log(`post error ${e}`);
                    });
            }
            catch (error) {
                console.log(error.message);
            }
        } else {
            Alert.alert("Credential", "Entered Password did not matched !")
        }

    }
    return (
        <View>
            <Spinner visible={isLoading} textContent={'Please Wait ..'}
                textStyle={{ color: colors.colors.white, fontWeight: '400' }} />
            <View style={{ flexDirection: 'row', marginHorizontal: 15, marginVertical: 0 }}>
                <View style={style.ViewBok}>
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={{ fontWeight: '400', fontSize: 20, marginTop: 10 }}>User Id</Text>
                        <TextInput placeholder='User ID' style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, padding: 10, borderRadius: 4 }} onChangeText={setEmail} autoFocus={true} maxLength={12} />
                        <Text style={{ fontWeight: '400', fontSize: 15, color: 'red' }}>
                            {
                                isEmail == "false"
                                    ? "email is Required*"
                                    : ''
                            }
                        </Text>
                        <Text style={{ fontWeight: '400', fontSize: 20, marginTop: 5 }}>Password</Text>
                        <TextInput secureTextEntry={true} placeholder='Password' style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, padding: 10, borderRadius: 4 }} onChangeText={setPassword} autoFocus={true} maxLength={12} />
                        <Text style={{ fontWeight: '400', fontSize: 15, color: 'red' }}>
                            {
                                isPassword == "false"
                                    ? "Password is Required*"
                                    : ""
                            }
                        </Text>
                        <Text style={{ fontWeight: '400', fontSize: 20, marginTop: 5 }}>Re-Enter Password</Text>
                        <TextInput placeholder='Re-Enter Password' style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, padding: 10, borderRadius: 4 }} onChangeText={setRePassword} secureTextEntry={true}  maxLength={12} />
                        <Text style={{ fontWeight: '400', fontSize: 15, color: 'red' }}>
                            {
                                isRePassword == "false"
                                    ? "Re-Enter Password is Required*"
                                    : ""
                            }
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginVertical: 20 }}>
                <View style={{ marginHorizontal: 30, justifyContent: 'center', marginTop: 0, width: '30%' }}>
                    <Pressable onPress={() => navigation.navigate('AddressDetails')} style={{ backgroundColor: colors.colors.headColor, padding: 6, marginVertical: 5, borderRadius: 4, textAlign: 'center' }}  ><Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Previous </Text></Pressable>
                </View>
                <View style={{ marginHorizontal: 30, justifyContent: 'center', marginTop: 0, width: '30%' }}>
                    <Pressable onPress={
                        // () => navigation.navigate('BackendApproval')
                        formSubmit
                    } style={{ backgroundColor: colors.colors.headColor, padding: 6, marginVertical: 5, borderRadius: 4, textAlign: 'center' }}  ><Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Next </Text></Pressable>
                </View>
            </View>
        </View>
    )
}

export default Credential
const style = StyleSheet.create({
    inputBok: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        marginTop: 10
    },
    ViewBok: {
        width: '100%',
    }
});