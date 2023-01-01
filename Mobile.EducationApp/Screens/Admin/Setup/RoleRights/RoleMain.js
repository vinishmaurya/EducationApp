import { View, Text, Pressable, Alert, ScrollView, FlatList, TextInput, TouchableOpacity, Platform, StatusBar, StyleSheet } from 'react-native'
//import { Picker } from '@react-native-picker/picker';
import Tooltip from "react-native-walkthrough-tooltip";
import React, { useState, useEffect } from 'react'
import Checkbok from '../../..//../Component/whiteCheckbok'
import Checkbok2 from '../../../../Component/checkbok'
import Icon from 'react-native-vector-icons/EvilIcons';
import Delete from 'react-native-vector-icons/MaterialIcons';
import Pluscircleo from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import NumericInput from 'react-native-numeric-input';
import { FloatingAction } from "react-native-floating-action";
import { colors } from '../../../../Component/colors';
import axios from "axios";
import BaseURL from '../../../../config';
import Paging from '../../../../Component/paging';
import paging from '../../../../Component/paging';

const Role = ({ navigation }) => {

    const [SearchValue, setSearchValue] = useState();
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [showTip, setTip] = useState(false);
    function alert() {
        Alert.alert('remove ' + BodyList.id)
    }
    function search(sv) {
        Alert.alert('RoleName : ' + sv)
        loadPageData(RowParPage, PagingList.CurrentPage, 'RoleName', SearchValue);
    }
    function edit() {
        Alert.alert('Manage Category', 'Do you want to edit')

    }

    function next() {
        Alert.alert('next')
    }
    function previous() {
        Alert.alert('previous')
    }
    const action = <Delete name={'delete'} size={25} color={'#E64848'} onPress={alert} />
    const action1 = <Icon name={'pencil'} size={25} color={'#7FB77E'} onPress={edit} />
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
                <Pressable onPress={alert}><Text style={{ marginTop: 5 }}><Icon name={'pencil'} size={25} color={'#7FB77E'} onPress={edit} /></Text></Pressable>
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
    const [RowParPage, setRowParPage] = useState(1);
    const [PagingList, setPagingList] = useState({
        CurrentPage: 1,
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
        //console.log(HeaderList);
        loadPageData(RowParPage, PagingList.CurrentPage);
        //console.log(HaveDBData);
      
    }, []);
    function loadPageData(r,c,sb,sv) {
        sb = "%20";
        sv = "%20";
        try {
            axios.get(`${BaseURL.BASE_URL}/admin/Role/GetRoleDetails/0/${r}/${c}/${sb}/${sv}`, {
                headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjcyNTY5NjcyLCJleHAiOjE2NzI1NzMyNzJ9.5yvS8eh--z7zUv0WPcgSF5wSP6ld4STqFIi0BsH00V8" }
            })
                .then(res => {
                    setTableHeader(res.data.Data.dataHeader);
                    setTableBody(res.data.Data.dataList);
                    setHaveDBData(true);
                    let TotalItem = res.data.Data.dataCount[0].TotalItem;
                    setPagingList({
                        CurrentPage: 1,
                        TotalItems: TotalItem,
                        RowParPage: RowParPage,
                        TotalPage: parseInt(TotalItem % RowParPage == 0 ? TotalItem / RowParPage : TotalItem / RowParPage + 1)
                    });
                    console.log(PagingList);
                    //console.log(TotalItem);
                })
                .catch(e => {
                    console.log(`/admin/Role/GetRoleDetails/0/10/1/%20/%20 error ${e}`);
                });
        }
        catch (e) {
            console.log(`/admin/Role/GetRoleDetails/0/10/1/%20/%20 error ${e}`);
        }
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
                <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', textAlign: 'center' }}>{item.ColumnName}</Text>
            </View>
        );


    });


    const HeaderItem = ({ item, index }) => (
        <View style={{ flexDirection: 'row', borderWidth: 1, flexWrap: 'wrap' }}>

            <View style={{ width: 40, backgroundColor: colors.colors.buttonColor, borderWidth: 1, borderColor: 'white' }}>
                <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', textAlign: 'center', color: '#ffffff' }}>{item}</Text>
            </View>



        </View >);

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

                            <View style={{ width: '15%', marginTop: -8, marginLeft: -10 }}>
                                {
                                    //<Picker
                                    //    selectedValue={selectedLanguage}
                                    //    onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}>
                                    //    <Picker.Item label="Role name" value="java" />
                                    //    <Picker.Item label="Role id" value="js" />
                                    //</Picker>
                                }
                            </View>
                            <View style={{ width: '75%', }}>
                                <TextInput placeholder='Role Name' style={{ marginTop: 4 }} onChange={setSearchValue} value={SearchValue} />

                            </View>
                            <Pressable style={{ width: '10%', backgroundColor: '#f2f2f2', borderLeftWidth: 2, borderColor: 'gray', borderTopRightRadius: 3, borderBottomRightRadius: 3 }}>
                                <Text style={{ marginTop: 6, marginLeft: 3 }} onChange={setSearchValue} value={SearchValue}>
                                    <Icon color={'#000000'} name={'search'} size={25} onPress={() => search(SearchValue)} />
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
                                        onPress={ onPressRowPerPage}
                                    />
                                </View></View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ marginTop: 8, marginRight: 10 }}>Entries</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: 80, }}>
                                    <Tooltip
                                        isVisible={showTip}
                                        content={
                                            <>
                                                <View style={{ width: 80, marginTop: 10, marginLeft: 15, marginBottom: 5 }}>
                                                    <View style={{ flexDirection: 'row', }}><MaterialCommunityIcons name={'microsoft-excel'} size={16} color={'#351401'} onPress={edit} /><Text style={{ marginLeft: 6 }}>EXCEL</Text></View>
                                                </View>
                                                <View style={{ width: 80, marginTop: 10, marginLeft: 15, marginBottom: 5 }}>
                                                    <View style={{ flexDirection: 'row', }}><Pluscircleo name={'pdffile1'} size={16} color={'#351401'} onPress={edit} /><Text style={{ marginLeft: 6 }}>PDF</Text></View>
                                                </View>
                                                <View style={{ width: 80, marginTop: 10, marginLeft: 15, marginBottom: 4 }}>
                                                    <View style={{ flexDirection: 'row', }}><Foundation name={'page-export-csv'} size={16} color={'#351401'} onPress={edit} /><Text style={{ marginLeft: 6 }}>PDF</Text></View>
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
                                                <Text style={{ fontSize: 15, marginTop: 10, fontWeight: 'bold', textAlign: 'center', color:'red' }}>
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
                                pressCurrentPage={ onPressNextPage}
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

export default Role;
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