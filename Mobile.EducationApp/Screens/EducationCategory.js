import { View, Text, TextInput, StyleSheet, Alert, Pressable, ScrollView, Button } from 'react-native'
import React, { useEffect, useState, useFocusEffect } from 'react'
import Dropdown from '../Component/dropdown';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from "axios";
import BaseURL from '../config';
import { colors } from '../Component/colors'
const EducationCategory = ({ route, props, navigation }) => {
    const [NameApplicant, setNameApplicant] = useState("");
    const [CertificateNumber, setCertificateNumber] = useState("");
    const [dataAwardCategorySelectionId, setdataAwardCategorySelectionId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    let [isValidAwardCategory, setIsValidAwardCategory] = useState(null);
    let [isNameisValidate, setIsNameisValidate] = useState(null);
    let [IsCertificatenumber, setIsCertificatenumber] = useState(null);
    let edit_id = route.params ? route.params.edit_id : null;
    const [dataAwardCategory, setdataAwardCategory] = useState(function () {
        let api_data = [
            { label: 'Istitute', value: 'Istitute' },
            { label: 'School', value: 'School' },
        ];
        return api_data;
    });
    const [date, setDate] = useState('');
    let dateInput = null;

    const handleChange = (date) => {
        setDate(date);
    };

    const focus = () => {
        if (!dateInput) {
            return;
        }

        dateInput.focus();
    };
    // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    // // const [Date,setDate]=useState('')
    // const showDatePicker = () => {
    //     setDatePickerVisibility(true);
    // };

    // const hideDatePicker = () => {
    //     setDatePickerVisibility(false);
    // };

    // const handleConfirm = date => {
    //     setDate(date)
    //     hideDatePicker();
    // };
    useEffect(() => {
        if (edit_id) {

            try {
                //get  Data by api
                axios.get(`${BaseURL.BASE_URL}/getById-form1Data/` + edit_id, {
                })
                    .then(res => {
                        // debugger;
                        // console.log(res.data);
                        if (res.data) {
                            setNameApplicant(res.data.NameApplicant);
                            setCertificateNumber(res.data.CertificateNumber);
                            setdataAwardCategorySelectionId(res.data.dataAwardCategorySelectionId);
                        }

                    })
                    .catch(e => {
                        console.log(`post error ${e}`);
                    });
            }
            catch (error) {
                console.log(error.message);
            }
        }
        try {
            //get  Data by api
            axios.get(`${BaseURL.BASE_URL}/getAll-AwardCategory`, {
            })
                .then(res => {
                    debugger;
                    // console.log(res.data);
                    // console.log(res.data[0].name);
                    setdataAwardCategory(res.data);
                })
                .catch(e => {
                    console.log(`post error ${e}`);
                });
        }
        catch (error) {
            console.log(error.message);
        }
        //Call API

    }, [edit_id]);
    // console.log(Awardcategory)
    // window.alert(edit_id);
    // Declare a new state variable, which we'll call "count"

    function funcClearData() {
        setNameApplicant("");
        setCertificateNumber("");
        setdataAwardCategorySelectionId("");
    };
    function funcUpdateData() {
        if (!dataAwardCategorySelectionId || dataAwardCategorySelectionId.value == "") {
            setIsValidAwardCategory("false");
            return;
        }
        else {
            setIsValidAwardCategory("");
        }

        if (NameApplicant == "") {
            setIsNameisValidate("false");
            return;
        }
        else {
            setIsNameisValidate("");
        }
        if (CertificateNumber == "") {
            setIsCertificatenumber("false");
            return;
        }
        else {
            setIsCertificatenumber("");
        }

        // window.alert("This is Update Data alert");
        //  console.log(edit_id._id);
        //  window.alert(edit_id);
        // navigation.navigate('AdminPanal');
        //Save Data by api
        // debugger;
        axios.patch(`${BaseURL.BASE_URL}/post-form1UpdateData/`, {
            _id: edit_id,
            dataAwardCategorySelectionId: dataAwardCategorySelectionId.label,
            NameApplicant: NameApplicant,
            CertificateNumber: CertificateNumber
        })
            .then(res => {
                console.log(res.data);
                window.alert(res.data.Message);
                navigation.navigate('AdminPanal'

                    // ,{ editReload: true } delete it if you no use !

                );
            })
            .catch(e => {
                console.log(`post error ${e}`);
            });
    }
    function funcSubmitData() {
        setIsLoading(true);
        //Validation.....
        //#region This Code is used for validation perpose only
        if (!dataAwardCategorySelectionId || dataAwardCategorySelectionId.value == "") {
            setIsValidAwardCategory("false");
            return;
        }
        else {
            setIsValidAwardCategory("");
        }

        if (NameApplicant == "") {
            setIsNameisValidate("false");
            return;
        }
        else {
            setIsNameisValidate("");
        }
        if (CertificateNumber == "") {
            setIsCertificatenumber("false");
            return;
        }
        else {
            setIsCertificatenumber("");
        }
        //#endregion
        //End Validation
        //debugger;
        try {
            //Save Data by api
            axios.post(`${BaseURL.BASE_URL}/post-form1-data`, {
                dataAwardCategorySelectionId: dataAwardCategorySelectionId.label,
                NameApplicant: NameApplicant,
                CertificateNumber: CertificateNumber
            })
                .then(res => {
                    //debugger;
                    let userInfo = res.data;
                    Alert.alert(
                        "Form (1)",
                        userInfo.Message,
                        [

                            { text: "OK", onPress: () => funcClearData() }
                        ]
                    );
                    navigation.navigate('PersonalInformation')

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
        <View style={{ flex: 1 }}>
            <ScrollView style={{ marginBottom: 10 }}>
                <Spinner visible={isLoading} textContent={'Please Wait ..'}
                    textStyle={{ color: colors.colors.white, fontWeight: '400' }} />
                <View style={{ flexDirection: 'row', marginHorizontal: 15, marginVertical: 5 }}>
                    <View style={style.ViewBok}>
                        <Text style={{ fontWeight: '600', fontSize: 20, marginTop: 10 }}>Education Category</Text>
                        <Dropdown bindData={dataAwardCategory} my_value={dataAwardCategorySelectionId} my_onChangeText={setdataAwardCategorySelectionId} />
                        <Text style={{ fontWeight: '300', fontSize: 15, color: "red" }}>
                            {
                                isValidAwardCategory == "false"
                                    ? "Award Category selection is required!"
                                    : ""
                            }
                        </Text>
                        <Text style={{ fontWeight: '500', fontSize: 20, marginTop: 5 }}>Education 's Details</Text>
                        <Text style={{ fontWeight: '300', margin: 16 }}>a.) Name of the education to be considered for app review</Text>
                        <TextInput placeholder='Name of the Architect (applicant) to be considered for Award' style={{ borderRadius: 4, borderWidth: 1, borderColor: 'black', padding: 10 }} value={NameApplicant} onChangeText={setNameApplicant} maxLength={20} />
                        <View>
                            <Text style={{ fontWeight: '300', fontSize: 15, color: "red" }}>
                                {
                                    isNameisValidate == "false"
                                        ? "Name is Required*"
                                        : ""
                                }
                            </Text>
                        </View>
                        <Text style={{ fontWeight: '300', margin: 16 }}>b.) Short name of the education</Text>
                        <TextInput placeholder='Council of architechture or equivalent body Certificate number' style={{ borderRadius: 4, borderWidth: 1, borderColor: 'black', padding: 10 }} onChangeText={setCertificateNumber} value={CertificateNumber} maxLength={20} />
                        <Text style={{ fontWeight: '300', fontSize: 15, color: "red" }}>
                            {
                                IsCertificatenumber == "false"
                                    ? "Certificate number is Required*"
                                    : ""
                            }
                        </Text>
                        <Text style={{ fontWeight: '300', margin: 16 }}>c.) Stablish Year</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput placeholder='DD' style={{ borderRadius: 4, borderWidth: 1, borderColor: 'black', padding: 10, width: 50 }} maxLength={2} keyboardType={'number-pad'} />
                            <TextInput placeholder='MM' style={{ borderRadius: 4, borderWidth: 1, borderColor: 'black', padding: 10, width: 50, marginHorizontal: 10 }} maxLength={2} keyboardType={'number-pad'} />
                            <TextInput placeholder='YYYY' style={{ borderRadius: 4, borderWidth: 1, borderColor: 'black', padding: 10, width: 90 }} maxLength={4} keyboardType={'number-pad'} />
                        </View>



                        {/* validation date */}
                        {/* <Text style={{ fontWeight: '300', fontSize: 15, color: "red" }}>
                            {
                                IsCertificatenumber == "false"
                                    ? "Certificate number is Required*"
                                    : ""
                            }
                        </Text> */}
                    </View>
                </View>
                {/* <View style={{ marginHorizontal: 30, justifyContent: 'center', marginTop: 20 }}>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                        <Pressable style={{ backgroundColor: '#351431', padding: 6, borderRadius: 4, width: "auto", textAlign: 'center' }} onPress={edit_id ? funcUpdateData : funcSubmitData}><Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>{edit_id ? 'Update' : 'Submit'}</Text></Pressable>
                    </View>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                        <Pressable style={{ backgroundColor: '#351431', padding: 6, borderRadius: 4, width: "auto", textAlign: 'center' }} onPress={funcClearData}><Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>Clear</Text></Pressable>
                    </View>
                </View>
                <View style={{ marginHorizontal: 30, justifyContent: 'center', marginTop: 20 }}>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                        <Pressable style={{ backgroundColor: '#351431', padding: 6, borderRadius: 4, width: "auto" }} onPress={() => navigation.navigate('LoginPage')} ><Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>login</Text></Pressable>
                    </View>
                </View> */}
                <View style={{ marginHorizontal: 30, justifyContent: 'center', marginTop: 20 }}>
                    <View style={{ paddingHorizontal: 0, paddingVertical: 5 }}>
                        <Pressable style={{ backgroundColor: colors.colors.headColor, padding: 6, borderRadius: 4, width: "auto" }} onPress={funcSubmitData} ><Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Next</Text></Pressable>
                    </View>
                </View>

            </ScrollView>

        </View>
    )
}

export default EducationCategory;
const style = StyleSheet.create({
    inputBok: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        marginTop: 10
    },
    ViewBok: {
        // flexDirection: 'row',
        width: '100%',
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
    },
});