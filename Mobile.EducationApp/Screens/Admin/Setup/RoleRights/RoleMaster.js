import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Dropdown from '../../../../Component/dropdown';
import { Picker } from '@react-native-picker/picker';
import SubmitButton from '../../../../Component/SubmitButton';
import { colors } from '../../../../Component/colors';
import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import { RadioButton } from 'react-native-paper';
import config from '../../../../config';
import axios from "axios";
const RoleMaster = ({ route, props, navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [checked, setChecked] = React.useState('first');
    let edit_id = route.params ? route.params.edit_id : null;
    const [dataRoleFor, setdataRoleFor] = useState(function () {
        let api_data = [
            { label: 'Istitute', value: 'Istitute' },
            { label: 'School', value: 'School' },
        ];
        return api_data;
    });
    const [dataRoleForSelectionId, setdataRoleForSelectionId] = useState(null);

    const [dataAccountNo, setdataAccountNo] = useState(function () {
        let api_data = [
            { label: 'Istitute', value: 'Istitute' },
            { label: 'School', value: 'School' },
        ];
        return api_data;
    });
    const [dataAccountNoSelectionId, setdataAccountNoSelectionId] = useState(null);


    const [dataLandingPage, setdataLandingPage] = useState(function () {
        let api_data = [
            { label: 'Istitute', value: 'Istitute' },
            { label: 'School', value: 'School' },
        ];
        return api_data;
    });
    const [dataLandingPageSelectionId, setdataLandingPageSelectionId] = useState(null);

    

    useEffect(() => {
        //Load Data In case of edit
        if (edit_id) {
            try {
                //get  Data by api
                axios.get(`${config.BASE_URL}/getById-form1Data/` + edit_id, {
                })
                    .then(res => {
                        // debugger;
                        // console.log(res.data);
                        if (res.data) {
                            //setNameApplicant(res.data.NameApplicant);
                            //setCertificateNumber(res.data.CertificateNumber);
                            //setdataAwardCategorySelectionId(res.data.dataAwardCategorySelectionId);
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
        //Load Category List
        try {
            //get  Data by api
            console.log(`${config.BASE_URL}/admin/common/getAllCategoryList`);
            axios.get(`${config.BASE_URL}/admin/common/getAllCategoryList`, {
            })
                .then(res => {
                    console.log(res.data);
                    //setdataRoleFor(res.data);
                })
                .catch(e => {
                    console.log(`post error ${e}`);
                });
        }
        catch (error) {
            console.log(error.message);
        }

        //Load Category List
        try {
            //get  Data by api
            axios.get(`${config.BASE_URL}/admin/common/getAllAccountList`, {
            })
                .then(res => {
                    console.log(res.data);
                    //setdataAccountNo(res.data);
                })
                .catch(e => {
                    console.log(`post error ${e}`);
                });
        }
        catch (error) {
            console.log(error.message);
        }

        //Load Category List
        try {
            //get  Data by api
            axios.get(`${config.BASE_URL}/admin/common/GetParentFormsList`, {
            })
                .then(res => {
                    console.log(res.data);
                    //setdataLandingPage(res.data);
                })
                .catch(e => {
                    console.log(`post error ${e}`);
                });
        }
        catch (error) {
            console.log(error.message);
        }

    }, [edit_id]);

    return (
        <View
            style={{
                backgroundColor: 'white',
                borderRadius: 8,
                paddingVertical: 20,
                shadowColor: '#000',
                shadowOffset: { width: -2, height: 4 },
                shadowRadius: 3,
                elevation: 5,
                // marginVertical: 20,
                marginHorizontal: 20,
                paddingHorizontal: 10
            }}
        >

            <View>
                <Text style={{ fontWeight: '400', marginTop: 10, }}>Role For<Text style={{ color: "red" }}> *</Text></Text>
                <View style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, borderRadius: 4, height: 40, borderColor: 'gray' }}>
                    <Dropdown bindData={dataRoleFor} my_value={dataRoleForSelectionId} my_onChangeText={setdataRoleForSelectionId} />
                </View>
            </View>

            <View>
                <Text style={{ fontWeight: '400', marginTop: 10, }}>Account No.<Text style={{ color: "red" }}> *</Text></Text>
                <View style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, borderRadius: 4, height: 40, borderColor: 'gray' }}>
                    
                    <Dropdown bindData={dataAccountNo} my_value={dataAccountNoSelectionId} my_onChangeText={setdataAccountNoSelectionId} />
                </View>
            </View>

            <View>

                <Text style={{ fontWeight: '400', marginTop: 10, }}>Role Name<Text style={{ color: "red" }}> *</Text></Text>
                <TextInput placeholder='Role Name' style={{ borderWidth: 1, borderColor: 'gray', marginVertical: 10, borderRadius: 5, height: 40, paddingLeft: 8 }} />
                <View>
                    <Text style={{ fontWeight: '400', marginTop: 10, }}>Landing Page<Text style={{ color: "red" }}> *</Text></Text>
                    <View style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, borderRadius: 4, height: 40, borderColor: 'gray' }}>
                        {
                            //<Picker
                            //    style={{ marginTop: -10 }}
                            //    selectedValue={selectedLanguage}
                            //    onValueChange={(itemValue, itemIndex) =>
                            //        setSelectedLanguage(itemValue)
                            //    }>
                            //    <Picker.Item label="Account Management" value="Account Management" />
                            //    <Picker.Item label="Account Management" value="Account Management" />
                            //</Picker>

                            <Dropdown bindData={dataLandingPage} my_value={dataLandingPageSelectionId} my_onChangeText={setdataLandingPageSelectionId} />
                        }
                    </View>
                </View>

            </View>


            <View>
                <Text style={{ fontWeight: '400', marginTop: 10, }}>Status<Text style={{ color: "red" }}> *</Text></Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Pressable onPress={() => setChecked('first')} style={{ flexDirection: 'row', marginHorizontal: 8 }}>
                        <RadioButton
                            value="first"
                            status={checked === 'first' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('first')}
                        /><Text style={{ marginTop: 8 }}>Active</Text>
                    </Pressable>
                    <Pressable onPress={() => setChecked('second')} style={{ flexDirection: 'row', marginHorizontal: 8 }}>
                        <RadioButton
                            value="second"
                            onPress={() => setChecked('second')}
                            status={checked === 'second' ? 'checked' : 'unchecked'}
                        />
                        <Text style={{ marginTop: 8 }}>Inactive</Text>
                    </Pressable>
                </View>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <Pressable style={{
                    backgroundColor: colors.colors.buttonColor, padding: 8, width: 100, borderRadius: 20, marginRight: 5, shadowColor: '#000000',
                    shadowOffset: { width: 20, height: 9 },
                    shadowRadius: 8,
                    elevation: 15,
                }}>
                    <Text style={{ color: '#ffffff', textAlign: 'center' }}>Submit</Text>
                </Pressable>
                <Pressable style={{
                    backgroundColor: colors.colors.buttonColor, padding: 8, width: 100, borderRadius: 20, marginLeft: 5, shadowColor: '#000000',
                    shadowOffset: { width: 20, height: 9 },
                    shadowRadius: 8,
                    elevation: 15,
                }}>
                    <Text style={{ color: '#ffffff', textAlign: 'center' }}>Cancel</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default RoleMaster