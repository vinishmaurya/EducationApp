import { View, Text, TextInput, Pressable, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Dropdown from '../../../../Component/dropdown';
import { Picker } from '@react-native-picker/picker';
import SubmitButton from '../../../../Component/SubmitButton';
import { colors } from '../../../../Component/colors';
import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import { RadioButton, Title } from 'react-native-paper';
import config from '../../../../config';
import axios from "axios";
import { block } from 'react-native-reanimated';
import Spinner from 'react-native-loading-spinner-overlay';
const RoleMaster = ({ route, props, navigation }) => {
    const [RoleName, setRoleName] = useState("");
    let [IsRoleNameValidated, setIsRoleNameValidated] = useState(null);
    let [IsRoleForValidated, setIsRoleForValidated] = useState(null);
    let [IsLandingPageValidated, setIsLandingPageValidated] = useState(null);
    let [IsActiveValidated, setIsActiveValidated] = useState(null);

    const [selectedLanguage, setSelectedLanguage] = useState();
    const [IsActive, setIsActive] = useState(null);
    let edit_id = route.params ? route.params.edit_id : 0;
    const [isLoading, setIsLoading] = useState(false);


    const [dataRoleFor, setdataRoleFor] = useState(function () {
        //let api_data = 
        //[
        //    { label: 'Istitute', value: 'Istitute' },
        //    { label: 'School', value: 'School' },
        //];
        //return api_data;
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
        setIsLoading(false);
        setRoleName("");
        setIsRoleNameValidated(false);
        setdataRoleForSelectionId(null)
        setIsRoleForValidated(false);
        setdataLandingPageSelectionId(null);
        setIsLandingPageValidated(false);
        setIsActive(null);
        setIsActiveValidated(false);


        //edit_id = 2;
        //Load Data In case of edit
        if (edit_id != 0) {
            try {
                //get  Data by api
                axios.get(`${config.BASE_URL}/admin/role/GetRoleDetails/` + edit_id + `/1/1/%20/%20`, {
                    headers: { Authorization: "Bearer " + config.AccessToken }
                })
                    .then(res => {
                        // debugger;

                        //console.log(res.data.Data);
                        if (res.data.Message == "Success") {
                            let temp = res.data.Data.dataList[0];
                            setRoleName(temp.RoleName);
                            setdataRoleForSelectionId(temp.FK_CategoryId)
                            setdataLandingPageSelectionId(temp.HomePage);
                            setIsActive(temp.IsActive);
                            //console.log(temp.HomePage);
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
            //console.log(`${config.BASE_URL}/admin/common/getAllCategoryList`);
            axios.get(`${config.BASE_URL}/admin/common/getAllCategoryList`, {
                headers: { Authorization: "Bearer " + config.AccessToken }
            })
                .then(res => {
                    //console.log(res.data);
                    if (res.data.Message == 'Success') {
                        var dataArray = new Array();
                        for (var i = 0; i < res.data.Data.dataList.length; i++) {
                            var temp = res.data.Data.dataList[i];
                            dataArray.push({ label: temp.CategoryName, value: temp.PK_CategoryId });
                        }
                        //console.log(dataArray);
                        setdataRoleFor(dataArray);
                    }
                })
                .catch(e => {
                    console.log(`post error ${e}`);
                });
        }
        catch (error) {
            console.log(error.message);
        }

        //Load Landing Page List
        try {
            //get Data by api
            axios.get(`${config.BASE_URL}/admin/form/GetAllParentFormsList`, {
                headers: { Authorization: "Bearer " + config.AccessToken }
            })
                .then(res => {
                    //console.log(res.data.Data.dataList);
                    if (res.data.Message == 'Success') {
                        var dataArray = new Array();
                        for (var i = 0; i < res.data.Data.dataList.length; i++) {
                            var temp = res.data.Data.dataList[i];
                            dataArray.push({ label: temp.FormName, value: temp.Pk_FormId });
                        }
                        //console.log(dataArray);
                        setdataLandingPage(dataArray);
                    }
                })
                .catch(e => {
                    console.log(`post error ${e}`);
                });
        }
        catch (error) {
            console.log(error.message);
        }

    }, [edit_id]);

    function onSubmitClicked() {
        try {
            console.log({
                PK_RoleId: edit_id,
                RoleName: RoleName,
                FK_CategoryId: dataRoleForSelectionId.value,
                HomePage: dataLandingPageSelectionId.value,
                IsActive: IsActive,
                CreatedBy: config.CreatedBy,
                headers: { Authorization: "Bearer " + config.AccessToken }
            });
            if (onFormValidation()) {
                //return false;
                setIsLoading(true);
                //Save Data by api
                axios.post(`${config.BASE_URL}/admin/Role/AddEditRoleDetails`, {
                    PK_RoleId: edit_id,
                    RoleName: RoleName,
                    FK_CategoryId: dataRoleForSelectionId.value,
                    HomePage: dataLandingPageSelectionId.value,
                    IsActive: IsActive,
                    CreatedBy: config.CreatedBy
                }, {
                    headers: { Authorization: "Bearer " + config.AccessToken }
                })
                    .then(res => {
                        console.log(res.data);
                        Alert.alert("Success", res.data.Message);
                        if (res.data.Result) {
                            navigation.navigate(
                                'RoleRights',
                                {
                                    edit_id: res.data.Data
                                });
                        }
                        setIsLoading(false);
                    })
                    .catch(e => {
                        console.log(`post error ${e}`);
                    });
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }

    function onFormValidation() {
        var flag = true;
        //#region This Code is used for validation perpose only

        if (!RoleName || RoleName.value == "") {
            setIsRoleNameValidated("false");
            flag = false;
        }
        else {
            setIsRoleNameValidated(null);
        }

        if (!dataRoleForSelectionId || dataRoleForSelectionId.value == "") {
            setIsRoleForValidated("false");
            flag = false;
        }
        else {
            setIsRoleForValidated(null);
        }

        if (!dataLandingPageSelectionId || dataLandingPageSelectionId.value == "") {
            setIsLandingPageValidated("false");
            flag = false;
        }
        else {
            setIsLandingPageValidated(null);
        }

        if (!IsActive || IsActive.value == "") {
            setIsActiveValidated("false");
            flag = false;
        }
        else {
            setIsActiveValidated(null);
        }
        //#endregion
        return flag;
    }

    function onCancelClicked() {
        navigation.navigate('RoleMain');
    }

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
            <Spinner visible={isLoading} textContent={'Please Wait ..'}
                textStyle={{ color: colors.colors.white, fontWeight: '400' }} />
            <View>

                <Text style={{ fontWeight: '400', marginTop: 10, }}>Role Name<Text style={{ color: "red" }}> *</Text></Text>
                <TextInput placeholder='Role Name' style={{ borderWidth: 1, borderColor: 'gray', marginVertical: 10, borderRadius: 5, height: 40, paddingLeft: 8 }} value={RoleName} onChangeText={setRoleName} maxLength={20} />
                <View>
                    <Text style={{
                        fontWeight: '300', fontSize: 15, color: "red", display: !IsRoleNameValidated ? "none" : "flex"
                    }}>
                        {
                            IsRoleNameValidated == "false"
                                ? "Name is required*"
                                : ""
                        }
                    </Text>
                </View>
            </View>

            <View>
                <Text style={{ fontWeight: '400', marginTop: 10, }}>Role For<Text style={{ color: "red" }}> *</Text></Text>
                <View style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, borderRadius: 4, height: 40, borderColor: 'gray' }}>
                    <Dropdown bindData={dataRoleFor} my_value={dataRoleForSelectionId} my_onChangeText={setdataRoleForSelectionId} />
                </View>
                <View>
                    <Text style={{
                        fontWeight: '300', fontSize: 15, color: "red", display: !IsRoleForValidated ? "none" : "flex"
                    }}>
                        {
                            IsRoleForValidated == "false"
                                ? "Role for selection is required*"
                                : ""
                        }
                    </Text>
                </View>
            </View>

            <View>
                <Text style={{ fontWeight: '400', marginTop: 10, }}>Landing Page<Text style={{ color: "red" }}> *</Text></Text>
                <View style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, borderRadius: 4, height: 40, borderColor: 'gray' }}>
                    <Dropdown bindData={dataLandingPage} my_value={dataLandingPageSelectionId} my_onChangeText={setdataLandingPageSelectionId} />
                </View>
                <View>
                    <Text style={{
                        fontWeight: '300', fontSize: 15, color: "red", display: !IsLandingPageValidated ? "none" : "flex"
                    }}>
                        {
                            IsLandingPageValidated == "false"
                                ? "Landing page selection required*"
                                : ""
                        }
                    </Text>
                </View>
            </View>

            <View>
                <Text style={{ fontWeight: '400', marginTop: 10, }}>Status<Text style={{ color: "red" }}> *</Text></Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Pressable onPress={() => setIsActive(true)} style={{ flexDirection: 'row', marginHorizontal: 8 }}>
                        <RadioButton
                            value="true"
                            status={IsActive === true ? 'checked' : 'unchecked'}
                            onPress={() => setIsActive(true)}
                        /><Text style={{ marginTop: 8 }}>Active</Text>
                    </Pressable>
                    <Pressable onPress={() => setIsActive('inactive')} style={{ flexDirection: 'row', marginHorizontal: 8 }}>
                        <RadioButton
                            value="false"
                            onPress={() => setIsActive(false)}
                            status={IsActive === false ? 'checked' : 'unchecked'}
                        />
                        <Text style={{ marginTop: 8 }}>Inactive</Text>
                    </Pressable>
                </View>
                <View>
                    <Text style={{
                        fontWeight: '300', fontSize: 15, color: "red", display: !IsActiveValidated ? "none" : "flex"
                    }}>
                        {
                            IsActiveValidated == "false"
                                ? "Status selection is required*"
                                : ""
                        }
                    </Text>
                </View>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <Pressable style={{
                    backgroundColor: colors.colors.buttonColor, padding: 8, width: 100, borderRadius: 20, marginRight: 5, shadowColor: '#000000',
                    shadowOffset: { width: 20, height: 9 },
                    shadowRadius: 8,
                    elevation: 15,
                }} onPress={onSubmitClicked} >
                    <Text style={{ color: '#ffffff', textAlign: 'center' }}>Submit</Text>
                </Pressable>
                <Pressable style={{
                    backgroundColor: colors.colors.buttonColor, padding: 8, width: 100, borderRadius: 20, marginLeft: 5, shadowColor: '#000000',
                    shadowOffset: { width: 20, height: 9 },
                    shadowRadius: 8,
                    elevation: 15,
                }} onPress={onCancelClicked} >
                    <Text style={{ color: '#ffffff', textAlign: 'center' }}>Cancel</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default RoleMaster