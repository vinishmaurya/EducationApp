import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Alert } from 'react-native'
import { colors } from '../Component/colors';
import axios from "axios";
import BaseURL from '../config';
import Spinner from 'react-native-loading-spinner-overlay';
const PersonalInformation = ({ navigation }) => {
    const [Email, setEmail] = useState("");
    const [AltEmail, SetAltEmail] = useState("");
    const [Mobile, setMobile] = useState("");
    const [IsEmail, setISEmail] = useState("");
    const [IsAltEmail, SetIsAltEmail] = useState("");
    const [IsMobile, setIsMobile] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // const [] = useState();
    function funcSubmitData() {
        //Validation.....
        //#region This Code is used for validation perpose only
        if (!Email || Email.value == "") {
            setISEmail("false");
            return;
        }
        else {
            setISEmail("");
        }

        if (AltEmail == "") {
            SetIsAltEmail("false");
            return;
        }
        else {
            SetIsAltEmail("");
        }
        if (Mobile == "") {
            setIsMobile("false");
            return;
        }
        else {
            setIsMobile("");
        }
        if (Mobile.length < 10) {
            Alert.alert("", 'Enter a Valid Mobile Number', [
                { text: "OK" },
            ]
            );
            return;
        }

        setIsLoading(true);
        try {
            //Save Data by api
            axios.post(`${BaseURL.BASE_URL}/post-form1-data`, {
                Email: Email,
                AltEmail: AltEmail,
                Mobile: Mobile
            })
                .then(res => {
                    debugger;
                    let userInfo = res.data;
                    Alert.alert(
                        "Personal Information",
                        userInfo.Message,
                        [

                            { text: "OK", }
                        ]
                    );
                    navigation.navigate('AddressDetails')

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
            <View style={{ flexDirection: 'row', marginHorizontal: 15, marginVertical: 20 }}>
                <View style={style.ViewBok}>
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={{ fontWeight: '400', fontSize: 20 }}>Email</Text>
                        <TextInput placeholder='Email' autoFocus={true} keyboardType={'email-address'} value={Email} onChangeText={setEmail} style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, padding: 10, borderRadius: 4 }} />
                        <Text style={{ fontWeight: '400', fontSize: 15, color: 'red' }}>
                            {
                                IsEmail == "false"
                                    ? "Email is Required !"
                                    : ''
                            }
                        </Text>
                        <Text style={{ fontWeight: '400', fontSize: 20, marginTop: 5 }}>Alter Email No</Text>
                        <TextInput placeholder='Alter Email No' value={AltEmail} onChangeText={SetAltEmail} style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, padding: 10, borderRadius: 4 }} />
                        <Text style={{ fontWeight: '400', fontSize: 15, color: 'red' }}>
                            {
                                IsAltEmail == "false"
                                    ? "Alter Email is Required !"
                                    : ''
                            }
                        </Text>
                        <Text style={{ fontWeight: '400', fontSize: 20, marginTop: 5 }}>Mobile No</Text>
                        <TextInput placeholder='Mobile No' maxLength={10} keyboardType='number-pad' value={Mobile} onChangeText={setMobile} style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, padding: 10, borderRadius: 4 }} />
                        <Text style={{ fontWeight: '400', fontSize: 15, color: 'red' }}>
                            {
                                IsMobile == "false"
                                    ? "Mobile No is Required !"
                                    : ''
                            }
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <View style={{ marginHorizontal: 30, justifyContent: 'center', marginTop: 0, width: '30%' }}>
                    <Pressable onPress={() => navigation.navigate('EducationRegistration',
                        {
                            edit_id: val
                        }
                    )} style={{ backgroundColor: colors.colors.headColor, padding: 6, marginVertical: 5, borderRadius: 4, textAlign: 'center' }}  ><Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Previous </Text></Pressable>
                </View>
                <View style={{ marginHorizontal: 30, justifyContent: 'center', marginTop: 0, width: '30%' }}>
                    <Pressable onPress={funcSubmitData} style={{ backgroundColor: colors.colors.headColor, padding: 6, marginVertical: 5, borderRadius: 4, textAlign: 'center' }}  ><Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Next </Text></Pressable>
                </View>
            </View>
        </ScrollView>
    )
}

export default PersonalInformation
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