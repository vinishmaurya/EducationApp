import { View, Text, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Dropdown from '../Component/dropdown';
import Imagepick from '../Component/imagepick';
import { colors } from '../Component/colors'
import axios from "axios";
import config from '../config';
import Spinner from 'react-native-loading-spinner-overlay';

// import { RNCamera } from 'react-native-camera'
const DocumentsDetails = ({ navigation }) => {
    const [image1, setimage1] = useState("");
    const [image2, setimage2] = useState("");
    const [IsNextDisabled, setIsNextDisabled] = useState(false);
    const idProof =
        [
            { label: 'Adhar Card', value: 'Adhar Card' },
            { label: 'Pan Card', value: 'Pan Card' },
            { label: 'Driving Licence', value: 'Driving Licence' },
        ];
    const [dataAwardCategorySelectionId, setdataAwardCategorySelectionId] = useState("")
    //const [isLoading, setIsLoading] = useState(false);
    function submitform() {
        //setIsLoading(true);
        if (IsNextDisabled) {
            Alert.alert("Warning", "Please wait while document is uploding...");
            return;
        }
        // console.log(dataAwardCategorySelectionId.value);
        //console.log(image1.uri);
        // console.log(image2);
        try {

            if (!String(dataAwardCategorySelectionId.value)) {
                Alert.alert("", "Id Type selection is required!");
                return;
            }
            if (!image1) {
                Alert.alert("", "Id Type image selection is required!");
                return;
            }
            if (!image2) {
                Alert.alert("", "Profile selection is required!");
                return;
            }

            const bodyFormData = new FormData();
            var currentdata = String(Math.random()).replace('0.', "");//String(new Date());
            bodyFormData.append('UserDoc_IdType', {
                uri: image1.uri,
                name: currentdata + '_IdType.jpg',
                type: 'image/jpeg',
            });
            bodyFormData.append('UserDoc_SelectProfile', {
                uri: image2.uri,
                name: currentdata + '_SelectProfile.jpg',
                type: 'image/jpeg',
            });
            bodyFormData.append('IdType', String(dataAwardCategorySelectionId.value));

            setIsNextDisabled(true);


            axios.post(`${config.BASE_URL}/post-document`, bodyFormData, {

                headers: { "Content-Type": "multipart/form-data" },
                Accept: "application/json",

            })

                .then(function (response) {
                    setIsNextDisabled(false);
                    //handle success
                    Alert.alert("Document Upload Status", response.data.Message);
                    navigation.navigate('PackageSelection')
                })
                .catch(function (error) {
                    // setNext(false);
                    //handle error
                    Alert.alert("Error from react native api call catch", JSON.stringify(error));
                    console.log("Error from react native api call catch : " + JSON.stringify(error));
                });
        }
        catch (error) {
            // console.log(`${BASE_URL}/post-document`);
            console.log("kjhgfdsakhygfgvcfgcxzsdfrgvcfg");
            Alert.alert("Error from react native api call catch", JSON.stringify(error));
        }


    }
    return (
        <ScrollView>
            {/*<Spinner visible={isLoading} textContent={'Please Wait ..'}*/}
            {/*    textStyle={{ color: colors.colors.white, fontWeight: '400' }} />*/}
                        <View style={{ backgroundColor: '#351401', marginHorizontal: 10, marginTop: 10, borderRadius: 5 }}>
                <Text style={{ fontWeight: '400', fontSize: 17, marginTop: 0, padding: 10, textAlign: 'center', color: 'white' }}>Proof Details</Text>
            </View>
            <Text style={{ marginHorizontal: 20, marginTop: 15, borderRadius: 5, fontSize: 18 }}>Select Id Type</Text>
            <Dropdown bindDataAwardCategory={idProof} my_onChangeText={setdataAwardCategorySelectionId} my_value={dataAwardCategorySelectionId} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Imagepick onSetImage={setimage1} />
            </View>
            <Text style={{ textAlign: 'center', marginVertical: 10, fontWeight: '400', fontSize: 18 }}>{dataAwardCategorySelectionId.value}</Text>
            {/* <Dropdown bindDataAwardCategory={dataAwardCategory} /> */}
            <Text style={{ marginHorizontal: 20, marginTop: 15, borderRadius: 5, fontSize: 18 }}>Select Profile</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 20 }}>
                <Imagepick onSetImage={setimage2} />
            </View>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 20, marginVertical: 20 }}>
                <View style={{ marginHorizontal: 30, justifyContent: 'center', marginTop: 0, width: '30%' }}>
                    <Pressable onPress={() => navigation.navigate('OperationDetails')} style={{ backgroundColor: colors.colors.headColor, padding: 6, marginVertical: 5, borderRadius: 4, textAlign: 'center' }}  ><Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Previous </Text></Pressable>
                </View>
                <View style={{ marginHorizontal: 30, justifyContent: 'center', marginTop: 0, width: '30%' }}>
                    <Pressable onPress={submitform} style={{ backgroundColor: colors.colors.headColor, padding: 6, marginVertical: 5, borderRadius: 4, textAlign: 'center' }}  >
                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
                            <ActivityIndicator animating={IsNextDisabled} color='white' />
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, paddingHorizontal: 5 }}>
                                {IsNextDisabled ? " Wait..." : "Next      "}
                            </Text>
                        </View>
                    </Pressable>

                </View>

            </View>

        </ScrollView>
    )
}


export default DocumentsDetails;

