import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../Component/colors'
import axios from "axios";
import Spinner from 'react-native-loading-spinner-overlay';
import BaseURL from '../config';
const AddressDetails = ({ navigation }) => {
    const [City, setCity] = useState();
    const [State, setState] = useState();
    const [Address, setAddress] = useState();
    const [Landmark, setLandmark] = useState();
    const [Code, setCode] = useState();
    const [isCity, issetCity] = useState();
    const [isState, issetState] = useState();
    const [isAddress, issetAddress] = useState();
    const [isLandmark, issetLandmark] = useState();
    const [isCode, issetCode] = useState();
    const [isLoading, setIsLoading] = useState(false);
    function submitform() {
        try {
            setIsLoading(true);
            //Save Data by api
            axios.post(`${BaseURL.BASE_URL}/post-AddressDetails-data`, {
                City: City,
                State: State,
                Address: Address,
                Landmark: Landmark,
                Code: Code,
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
                    navigation.navigate('OperationDetails')

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
            <View style={{ flexDirection: 'row', marginHorizontal: 15, marginVertical: 10 }}>
                <View style={style.ViewBok}>
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={{ fontWeight: '400', fontSize: 20, marginTop: 5 }}>City</Text>
                        <TextInput keyboardType={'default'} placeholder='City' value={City} onChangeText={setCity} style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, padding: 10, borderRadius: 4 }} />
                        <Text style={{ fontWeight: '400', fontSize: 20, marginTop: 5 }}>State</Text>
                        <TextInput keyboardType={'default'} placeholder='State' value={State} onChangeText={setState} style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, padding: 10, borderRadius: 4 }} />
                        <Text style={{ fontWeight: '400', fontSize: 20, marginTop: 5 }}>Address</Text>
                        <TextInput keyboardType={'default'} placeholder='Address' value={Address} onChangeText={setAddress} multiline={true} numberOfLines={4} style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, padding: 10, borderRadius: 4, textAlignVertical: 'top' }} />
                        <Text style={{ fontWeight: '400', fontSize: 20, marginTop: 5 }}>Landmark</Text>
                        <TextInput keyboardType={'default'} placeholder='Landmark' value={Landmark} onChangeText={setLandmark} style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, padding: 10, borderRadius: 4 }} />
                        <Text style={{ fontWeight: '400', fontSize: 20, marginTop: 5 }}>Postal Code</Text>
                        <TextInput keyboardType={'phone-pad'} maxLength={6} placeholder='Postal Code' value={Code} onChangeText={setCode} style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, padding: 10, borderRadius: 4 }} />
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <View style={{ marginHorizontal: 30, justifyContent: 'center', marginTop: 10, width: '30%' }}>
                    <Pressable onPress={() => navigation.navigate('PersonalInformation')} style={{ backgroundColor: colors.colors.headColor, padding: 6, marginVertical: 5, borderRadius: 4, textAlign: 'center' }}  ><Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Previous </Text></Pressable>
                </View>
                <View style={{ marginHorizontal: 30, justifyContent: 'center', marginTop: 10, width: '30%' }}>
                    <Pressable onPress={submitform} style={{ backgroundColor: colors.colors.headColor, padding: 6, marginVertical: 5, borderRadius: 4, textAlign: 'center' }}  ><Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Next </Text></Pressable>
                </View>
            </View>
        </ScrollView>
    )
}

export default AddressDetails;
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