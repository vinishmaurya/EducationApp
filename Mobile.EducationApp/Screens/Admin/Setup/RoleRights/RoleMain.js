import { View, Text, Pressable, Alert, ScrollView, FlatList, TextInput, TouchableOpacity, Platform, StatusBar, StyleSheet } from 'react-native'
//import { Picker } from '@react-native-picker/picker';
import Tooltip from "react-native-walkthrough-tooltip";
import React, { useState, useEffect } from 'react'
import Checkbok from '../../../../Component/checkbok'
import Checkbok2 from '../../../../Component/checkbok'
import Icon from 'react-native-vector-icons/EvilIcons';
import Delete from 'react-native-vector-icons/MaterialIcons';
import Pluscircleo from 'react-native-vector-icons/AntDesign';
import Controllerplay from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import NumericInput from 'react-native-numeric-input';
import { FloatingAction } from "react-native-floating-action";
import { colors } from '../../../../Component/colors';
import axios from "axios";
import Config from '../../../../config';
import Paging from '../../../../Component/paging';
import Spinner from 'react-native-loading-spinner-overlay';

const RoleMain = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    let [SearchValue, setSearchValue] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [showTip, setTip] = useState(false);
    const [showTipSB, setTipSB] = useState(false);
    function alert() {
        Alert.alert('remove ' + BodyList.id)
    }
    const onChangeTextSearchValue = value => {
        setSearchValue(value);
    }
    function search(sv) {
        console.log(SearchValue)
        loadPageData(RowParPage, PagingList.CurrentPage, 'RoleName', SearchValue);
    }
    function onEditPress(PK_Roleid) {
        navigation.navigate(
            'NavAdminRole',
            {
                edit_id: PK_Roleid
            });
    }

    function next() {
        Alert.alert('next')
    }
    function previous() {
        Alert.alert('previous')
    }
    const whiteCheckbok = <Checkbok2 />
    //const BodyList = [
    //    { "PK_Roleid": "3", "RoleName": "Test Node", "FormName": "Dashboard", "CreatedDateTime": "23/09/2022", "Status": "Active", Action: action, action1: action1 }
    //];


    const BodyItem = ({ item, index }) => (
        <View style={{ flexDirection: 'row', borderColor: 'lightgray', paddingVertical: 0, backgroundColor: item.PK_Roleid % 2 == 0 ? '#f2f2f2' : '#F9F9F9' }}>
            <View style={{ width: 40 }}>
                <Text style={{ fontSize: 11, fontWeight: 'bold', textAlign: 'center' }}>{whiteCheckbok}</Text>
            </View>
            {/*
            <View style={{ width: 40, }}>
                <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', textAlign: 'center' }}>{item.PK_Roleid}</Text>
            </View>
            */}
            <View style={{ width: 80 }}>
                <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', textAlign: 'center' }}>{item.RoleName}</Text>
            </View>
            <View style={{ width: 80, }}>
                <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', textAlign: 'center' }}>{item.FormName}</Text>
            </View>
            <View style={{ width: 80, }}>
                <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', textAlign: 'center' }}>{item.CreatedDateTime}</Text>
            </View>
            <View style={{ width: 80, }}>
                <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', textAlign: 'center', color: item.IsActive == true ? '#7FB77E' : '#E64848' }} >{item.Status}</Text>
            </View>
            <View style={{ width: 100, flexDirection: 'row', justifyContent: 'space-evenly', }}>
                <Pressable onPress={alert}><Text style={{ marginTop: 5 }}><Icon name={'pencil'} size={25} color={'#7FB77E'} onPress={() => onEditPress(item.PK_Roleid)} /></Text></Pressable>
                <Pressable onPress={alert}><Text style={{ marginTop: 5 }}><Delete name={'delete'} size={25} color={'#E64848'} onPress={alert} /></Text></Pressable>
            </View>
        </View >);

    //const HeaderList = [
    //    { id: "ID", FName: 'First Name 1231', LName: 'Last Name 1', Gender: 'Gender', Email: 'Email@gmail.com', Dob: 'DD/MM/YYYY', Image: 'Image', Action: action, action1: action1 }
    //];

    //New Development Start...

    const [HaveDBData, setHaveDBData] = useState(false);
    const [HeaderList, setTableHeader] = useState();
    const [BodyList, setTableBody] = useState();
    const [SearchBy, setSearchBy] = useState("");
    const [RowParPage, setRowParPage] = useState(Config.RowPerPage);
    const [PagingList, setPagingList] = useState({
        CurrentPage: Config.CurrentPage,
        TotalItems: 0,
        RowParPage: RowParPage,
        TotalPage: 0
    });

    //const [HeaderList, setTableHeader] = useState([
    //    {
    //        "ColumnName": "Select",
    //        "ID": 0
    //    },
    //    {
    //        "ColumnName": "Role Name",
    //        "ID": 1
    //    },
    //    {
    //        "ColumnName": "Landing Page",
    //        "ID": 2
    //    },
    //    {
    //        "ColumnName": "Created Date",
    //        "ID": 3
    //    },
    //    {
    //        "ColumnName": "Status",
    //        "ID": 4
    //    },
    //    {
    //        "ColumnName": "Action",
    //        "ID": 5
    //    }
    //]);
    //const [BodyList, setTableBody] = useState([
    //    { "PK_Roleid": "3", "RoleName": "Test Node", "FormName": "Dashboard", "CreatedDateTime": "23/09/2022", "Status": "Active", Action: action, action1: action1 }
    //]);
    useEffect(() => {
        setIsLoading(false);
        setHaveDBData(false);
        setTableHeader(false);
        setTableBody(false);
        //setTableHeader([
        //    {
        //        "ColumnName": "Select",
        //        "ID": 0
        //    },
        //    {
        //        "ColumnName": "Role Name",
        //        "ID": 1
        //    },
        //    {
        //        "ColumnName": "Landing Page",
        //        "ID": 2
        //    },
        //    {
        //        "ColumnName": "Created Date",
        //        "ID": 3
        //    },
        //    {
        //        "ColumnName": "Status",
        //        "ID": 4
        //    },
        //    {
        //        "ColumnName": "Action",
        //        "ID": 5
        //    }
        //]);

        loadPageData(RowParPage, PagingList.CurrentPage);
        //BindData(undefined);
        //console.log(HaveDBData);

    }, []);
    function loadPageData(r, c, sb, sv) {
        sb = !sb ? "%20" : sb;
        sv = !sv ? "%20" : sv;
        //console.log("Config.BASE_URL"+Config.BASE_URL);

        try {
            setIsLoading(true);
            axios.get(`${Config.BASE_URL}/admin/Role/GetRoleDetails/0/${r}/${c}/${sb}/${sv}`, {
                headers: { Authorization: "Bearer " + Config.AccessToken }
            })
                .then(res => {
                    console.log(res.data);
                    BindData(res.data);
                    setIsLoading(false);
                })
                .catch(e => {
                    setIsLoading(false);
                    console.log(`/admin/Role/GetRoleDetails/0/10/1/%20/%20 error ${e}`);
                });
        }
        catch (e) {
            setIsLoading(false);
            console.log(`/admin/Role/GetRoleDetails/0/10/1/%20/%20 error ${e}`);
        }
    }

    function BindData(Data) {
        const res_data = Data;
        //console.log(Data);
        //#region hard-coded value...
        //const res_data = !Data ? {
        //    "Message": "Success",
        //    "Description": "",
        //    "Result": true,
        //    "Data": {
        //        "dataHeader": [
        //            {
        //                "ColumnName": "--Select--",
        //                "ID": 0
        //            },
        //            {
        //                "ColumnName": "Role Name",
        //                "ID": 1
        //            },
        //            {
        //                "ColumnName": "Landing Page",
        //                "ID": 2
        //            },
        //            {
        //                "ColumnName": "Created Date",
        //                "ID": 3
        //            },
        //            {
        //                "ColumnName": "Status",
        //                "ID": 4
        //            },
        //            {
        //                "ColumnName": "Action",
        //                "ID": 5
        //            }
        //        ],
        //        "dataList": [
        //            {
        //                "PK_Roleid": "3",
        //                "RoleName": "Test Node",
        //                "RoleFor": "",
        //                "CustomerName": "",
        //                "CompanyName": "",
        //                "FK_CustomerId": "0",
        //                "FK_CompanyId": "0",
        //                "FK_CategoryId": "0",
        //                "CategoryName": "",
        //                "FK_AccountId": "0",
        //                "AccountName": "",
        //                "FormName": "Dashboard",
        //                "IsActive": true,
        //                "Status": "Active",
        //                "CreatedDateTime": "23/09/2022 10:41:59",
        //                "HomePage": "1",
        //                "AccountCategoryId": "0"
        //            },
        //            {
        //                "PK_Roleid": "2",
        //                "RoleName": "Admin",
        //                "RoleFor": "",
        //                "CustomerName": "",
        //                "CompanyName": "",
        //                "FK_CustomerId": "0",
        //                "FK_CompanyId": "0",
        //                "FK_CategoryId": "2",
        //                "CategoryName": "",
        //                "FK_AccountId": "2",
        //                "AccountName": "Gyanmitras Admin",
        //                "FormName": "Admin Dashboard",
        //                "IsActive": true,
        //                "Status": "Active",
        //                "CreatedDateTime": "01/05/2020 04:55:41",
        //                "HomePage": "8",
        //                "AccountCategoryId": "2"
        //            },
        //            {
        //                "PK_Roleid": "1",
        //                "RoleName": "Super Admin",
        //                "RoleFor": "",
        //                "CustomerName": "",
        //                "CompanyName": "",
        //                "FK_CustomerId": "0",
        //                "FK_CompanyId": "0",
        //                "FK_CategoryId": "1",
        //                "CategoryName": "",
        //                "FK_AccountId": "1",
        //                "AccountName": "Gyanmitras",
        //                "FormName": "Accounts",
        //                "IsActive": true,
        //                "Status": "Active",
        //                "CreatedDateTime": "-NA-",
        //                "HomePage": "9",
        //                "AccountCategoryId": "1"
        //            }
        //        ],
        //        "dataCount": [
        //            {
        //                "TotalItem": 3,
        //                "TotalCurrentMonth": 0,
        //                "TotalActive": 3,
        //                "TotalInActive": 0
        //            }
        //        ]
        //    }
        //} : Data;
        //#endregion
        

        setTableHeader(res_data.Data.dataHeader);
        setTableBody(res_data.Data.dataList);
        setHaveDBData(true);
        let TotalItem = res_data.Data.dataCount[0].TotalItem;
        setPagingList({
            CurrentPage: Config.CurrentPage,
            TotalItems: TotalItem,
            RowParPage: RowParPage,
            TotalPage: parseInt(TotalItem % RowParPage == 0 ? TotalItem / RowParPage : TotalItem / RowParPage + 1)
        });
        //console.log(PagingList);
        //console.log(TotalItem);
    }
    const HeaderPopList = !HaveDBData ? "" : HeaderList.map((item, index) => {
        if (index == 0) {
            return (
                <View style={{ width: 40 }} key={item.ID}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold', textAlign: 'center' }}><Checkbok2 /></Text>
                </View>
            );
        }

        return (
            <View style={{ width: 80 }} key={item.ID}>
                <Text style={{ fontSize: 13, marginTop: 10, fontWeight: 'bold', textAlign: 'center' }}>{item.ColumnName}</Text>
            </View>
        );


    });


    function onPressNextPage(CurrentPage) {
        //Alert.alert(String(CurrentPage))
        loadPageData(RowParPage, CurrentPage);
    }

    function onPressRowPerPage() {
        Alert.alert("asd")
    }

    return (
        <>
            <ScrollView style={{ marginHorizontal: 10, marginVertical: 0 }}>
                <Spinner visible={isLoading} textContent={'Please Wait ..'}
                    textStyle={{ color: colors.colors.white, fontWeight: '400' }} />
                {/* <View>
                    <View style={{ marginTop: 10, width: 100 }}>
                        <Pressable style={{ backgroundColor: '#351401', padding: 8, borderWidth: 1, borderRadius: 20 }}><Text style={{ color: '#FFFFFF', marginLeft: 4 }}><Pluscircleo name={'pluscircleo'} size={12} /> Add New</Text></Pressable>
                    </View>
                </View> */}
                <View style={{ marginHorizontal: 3 }} >
                    <View
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 8,
                            paddingVertical: 20,
                            width: '100%',
                            marginVertical: 10,
                            shadowColor: '#000',
                            shadowOffset: { width: -2, height: 4 },
                            shadowRadius: 3,
                            elevation: 5,
                            paddingHorizontal: 10
                        }} >
                        <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: 'gray', marginVertical: 10, borderRadius: 5, justifyContent: 'space-between', height: 40, marginTop: -10 }}>

                            <View style={{ width: '10%', marginTop: 3.5, marginLeft: 3, }}>
                                <Tooltip
                                    isVisible={showTipSB}
                                    content={
                                        <>
                                            <View style={{ width: 120, marginTop: 10, marginLeft: 15, marginBottom: 5 }}>
                                                <View style={{ flexDirection: 'row', }}><MaterialCommunityIcons name={'microsoft-excel'} size={16} color={'#351401'} /><Text style={{ marginLeft: 6 }}>Role Name</Text></View>
                                            </View>
                                        </>
                                    }
                                    onClose={() => setTipSB(false)}
                                    placement="bottom"
                                    // below is for the status bar of react navigation bar
                                    topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
                                >
                                    <Pressable
                                        onPress={() => setTipSB(true)}
                                        style={{ backgroundColor: '#FFF', padding: 8, borderWidth: 0, borderRadius: 5 }}><Text style={{ color: '#000', marginLeft: 5, }}><Pluscircleo name={'caretdown'} size={12} color={'gray'} /></Text></Pressable>
                                </Tooltip>
                            </View>
                            <View style={{ width: '70%', }}>
                                <TextInput placeholder='Role Name' style={{ marginTop: 4 }} onChangeText={(value) => { onChangeTextSearchValue(value) }} value={SearchValue} />

                            </View>
                            <Pressable style={{ width: '10%', backgroundColor: '#f2f2f2', borderLeftWidth: 2, borderColor: 'gray', borderTopRightRadius: 3, borderBottomRightRadius: 3 }}>
                                <Text style={{ marginTop: 6, marginLeft: 3 }} >
                                    <Icon color={'#000000'} name={'search'} size={25} onPress={() => search()} />
                                </Text>
                            </Pressable>
                        </View>
                        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 0, marginBottom: 8 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginTop: 6, marginRight: 10 }}>Show</Text>
                                <View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 9, width: 76 }}><View style={{ marginLeft: 1, marginRight: 1 }}>
                                    <NumericInput rounded totalWidth={70} borderColor={'#FFF'} type='up-down' separatorWidth={1}
                                        totalHeight={32} onChange={setRowParPage} value={RowParPage}
                                        maxValue={PagingList.TotalItems}
                                        minValue={1}
                                        onPress={onPressRowPerPage}
                                    />
                                </View></View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ marginTop: 8, marginRight: 10 }}>Entries</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>

                                {
                                    HaveDBData
                                        ?
                                        <View style={{ width: 80, }}>
                                            <Tooltip
                                                isVisible={showTip}
                                                content={
                                                    <>
                                                        <View style={{ width: 80, marginTop: 10, marginLeft: 15, marginBottom: 5 }}>
                                                            <View style={{ flexDirection: 'row', }}><MaterialCommunityIcons name={'microsoft-excel'} size={16} color={'#351401'}  /><Text style={{ marginLeft: 6 }}>EXCEL</Text></View>
                                                        </View>
                                                        <View style={{ width: 80, marginTop: 10, marginLeft: 15, marginBottom: 5 }}>
                                                            <View style={{ flexDirection: 'row', }}><Pluscircleo name={'pdffile1'} size={16} color={'#351401'}  /><Text style={{ marginLeft: 6 }}>PDF</Text></View>
                                                        </View>
                                                    </>
                                                }
                                                onClose={() => setTip(false)}
                                                placement="bottom"
                                                // below is for the status bar of react navigation bar
                                                topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
                                            >
                                                <Pressable
                                                    onPress={() => setTip(true)}
                                                    style={{ backgroundColor: '#351401', padding: 8, borderWidth: 1, borderRadius: 5 }}><Text style={{ color: '#FFFFFF', marginLeft: 4 }}>Export <Pluscircleo name={'down'} size={12} /></Text></Pressable>
                                            </Tooltip>
                                        </View>
                                        :
                                        <View style={{ width: 80 }}>

                                        </View>
                                }


                            </View>
                        </View>


                        <ScrollView showsVerticalScrollIndicator={false} horizontal={true} >
                            <View>
                                <View style={{ flexDirection: 'row', borderWidth: HaveDBData ? 1 : 0, flexWrap: 'wrap' }}>
                                    {
                                        HaveDBData
                                            ?
                                            HeaderPopList
                                            :
                                            <View style={{ width: 100 }}>
                                                <Text style={{ fontSize: 15, marginTop: 10, fontWeight: 'bold', textAlign: 'center', color: 'red' }}>
                                                    No Record Found!
                                                </Text>
                                            </View>
                                    }

                                </View >
                                <View style={{ marginTop: 10 }}>
                                    <FlatList
                                        data={BodyList}
                                        renderItem={BodyItem}
                                        keyExtractor={item => item.PK_Roleid.toString()}

                                    />
                                </View>
                            </View >
                        </ScrollView>

                        <View style={{ marginBottom: -20 }}>
                            { /*
                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Text style={{ marginTop: 5 }}>Page 1 of 1 (4 Records)</Text>
                                <View style={{ flexDirection: 'row', marginTop: 1 }}>
                                    <Icon name={'chevron-left'} size={30} onPress={previous} />
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 3 }}>1</Text>
                                    <Icon name={'chevron-right'} size={30} onPress={next} />
                                </View>
                            </View>
                             */}


                            <Paging
                                pressCurrentPage={onPressNextPage}
                                CurrentPage={PagingList.CurrentPage}
                                TotalItems={PagingList.TotalItems}
                                RowParPage={PagingList.RowParPage}
                                TotalPage={PagingList.TotalPage} /*TotalItem % RowParPage == 0 ? TotalItem / RowParPage : TotalItem / RowParPage + 1 */
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View>
                <FloatingAction color={'#351401'} onPressMain={() => navigation.navigate('NavAdminRole')} distanceToEdge={{ vertical: 10, horizontal: 25 }} />
            </View>
        </>
    )
}

export default RoleMain;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 40,
    },
    button: {
        padding: 10,
        borderRadius: 4
    }
});