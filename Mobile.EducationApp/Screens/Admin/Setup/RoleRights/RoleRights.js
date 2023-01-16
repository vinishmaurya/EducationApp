import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker';
import SubmitButton from '../../../../Component/SubmitButton';
import { colors } from '../../../../Component/colors';
import CheckBox from '../../../../Component/checkbok';
import Spinner from 'react-native-loading-spinner-overlay';
const RoleRights = ({ route, props, navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [RoleName, setRoleName] = useState("");
    let [IsRoleNameValidated, setIsRoleNameValidated] = useState(null);

    function onCancelClicked() {
        navigation.navigate('RoleMain');
    }

    function onSubmitClicked() {
        navigation.navigate('RoleMain');
    }

    useEffect(() => {
        setIsRoleNameValidated(false);
        setIsLoading(false);
        let edit_id = props ? props.edit_id : 0;
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
                            //setdataRoleForSelectionId(temp.FK_CategoryId)
                            //setdataLandingPageSelectionId(temp.HomePage);
                            //setIsActive(temp.IsActive);
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
    });

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
                <Text style={{ fontWeight: '400', marginTop: 10, }}>Module<Text style={{ color: "red" }}> *</Text></Text>
                <View style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, borderRadius: 4, height: 40, borderColor: 'gray' }}>
                    <Picker
                        style={{ marginTop: -10 }}
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }>
                        <Picker.Item label="Active" value="Active" />
                        <Picker.Item label="Deactive" value="Deactive" />
                    </Picker>
                </View>


                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{ height: 100, width: 50 }} >
                        <View style={styles.menu} ><Text style={[styles.blackText, styles.menuTitle]}>Menu</Text></View>
                        <View style={styles.Roles} ><Text style={styles.RolesText}>Roles</Text></View>
                    </View>
                    <View>
                        <View style={styles.right}><Text style={styles.blackText}>Rights</Text></View>
                        <View style={{ flexDirection: 'row', height: 35 }}>
                            <View style={styles.blackbox}><Text style={styles.blackText}>All</Text></View>
                            <View style={styles.blackbox}><Text style={styles.blackText}>View</Text></View>
                            <View style={styles.blackbox}><Text style={styles.blackText}>Add</Text></View>
                            <View style={styles.blackbox}><Text style={styles.blackText}>Edit</Text></View>
                            <View style={styles.blackbox}><Text style={styles.blackText}>Delete</Text></View>
                            <View style={styles.blackbox}><Text style={styles.blackText}>Export</Text></View>
                        </View>
                        <View style={styles.sethead}>
                            <View style={styles.set2}><View style={styles.checkbox}><CheckBox /></View></View>
                            <View style={styles.set2}><View style={styles.checkbox}><CheckBox /></View></View>
                            <View style={styles.set2}><View style={styles.checkbox}><CheckBox /></View></View>
                            <View style={styles.set2}><View style={styles.checkbox}><CheckBox /></View></View>
                            <View style={styles.set2}><View style={styles.checkbox}><CheckBox /></View></View>
                            <View style={styles.set2}><View style={styles.checkbox}><CheckBox /></View></View>
                        </View>
                    </View>
                </View>


            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <Pressable style={{
                    backgroundColor: colors.colors.buttonColor, padding: 8, width: 100, borderRadius: 20, marginRight: 5, shadowColor: '#000000',
                    shadowOffset: { width: 20, height: 9 },
                    shadowRadius: 8,
                    elevation: 15,
                }} onPress={onSubmitClicked}>
                    <Text style={{ color: '#ffffff', textAlign: 'center' }}>Submit</Text>
                </Pressable>
                <Pressable style={{
                    backgroundColor: colors.colors.buttonColor, padding: 8, width: 100, borderRadius: 20, marginLeft: 5, shadowColor: '#000000',
                    shadowOffset: { width: 20, height: 9 },
                    shadowRadius: 8,
                    elevation: 15,
                }} onPress={onCancelClicked}>
                    <Text style={{ color: '#ffffff', textAlign: 'center' }}>Cancel</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default RoleRights
const styles = StyleSheet.create({
    set2: {
        width: 47,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRightColor: colors.colors.gray,
        borderBottomColor: colors.colors.gray,

    },
    sethead: {
        flexDirection: 'row',
        height: 50,
        borderBottomColor: colors.colors.gray,

    },
    menu: {
        borderWidth: 1,
        height: 70,
        backgroundColor: colors.colors.black,
        borderColor: colors.colors.gray,
    },
    Roles: {
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: colors.colors.gray,
        height: 50
    },
    right: {
        borderWidth: 1,
        height: 35,
        backgroundColor: colors.colors.black,
        borderBottomColor: colors.colors.gray
    },
    centerBlack: {
        textAlign: 'center',
        marginTop: 10
    },
    blackbox:
    {
        width: 47,
        borderWidth: 1,
        borderRightColor: colors.colors.gray,
        backgroundColor: colors.colors.black
    },
    blackText: {
        color: colors.colors.white,
        textAlign: 'center',
        marginTop: 5
    },
    menuTitle: {
        marginTop: 22
    },
    checkbox: {
        marginLeft: 5,
        marginTop: 5

    },
    RolesText: {
        marginTop: 12,
        textAlign: 'center'

    }
})