import { View, Text, Pressable, Alert, ScrollView, FlatList, TextInput, TouchableOpacity, Platform, StatusBar, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import Tooltip from "react-native-walkthrough-tooltip";
import React, { useState } from 'react'
import Checkbok from '../Component/whiteCheckbok'
import Checkbok2 from '../Component/checkbok'
import Icon from 'react-native-vector-icons/EvilIcons';
import Delete from 'react-native-vector-icons/MaterialIcons';
import Pluscircleo from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import NumericInput from 'react-native-numeric-input';
import { FloatingAction } from "react-native-floating-action";
import { colors } from '../Component/colors';
const Role = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [showTip, setTip] = useState(false);
    function alert() {
        Alert.alert('remove ' + List.id)
    }
    function search() {
        Alert.alert('search ')
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
    const List = [
        { id: 1, FName: 'First Name 1', LName: 'Last Name 1', Gender: 'Gender', Email: 'Email@gmail.com', Dob: 'DD/MM/YYYY', Image: 'Image', Action: action, action1: action1 },
        { id: 2, FName: 'First Name 2', LName: 'Last Name 2', Gender: 'Gender', Email: 'Email@gmail.com', Dob: 'DD/MM/YYYY', Image: 'Image', Action: action, action1: action1 },
        { id: 3, FName: 'First Name 3', LName: 'Last Name 3', Gender: 'Gender', Email: 'Email@gmail.com', Dob: 'DD/MM/YYYY', Image: 'Image', Action: action, action1: action1 },
        { id: 4, FName: 'First Name 3', LName: 'Last Name 3', Gender: 'Gender', Email: 'Email@gmail.com', Dob: 'DD/MM/YYYY', Image: 'Image', Action: action, action1: action1 },
        { id: 5, FName: 'First Name 3', LName: 'Last Name 3', Gender: 'Gender', Email: 'Email@gmail.com', Dob: 'DD/MM/YYYY', Image: 'Image', Action: action, action1: action1 },
        { id: 6, FName: 'First Name 3', LName: 'Last Name 3', Gender: 'Gender', Email: 'Email@gmail.com', Dob: 'DD/MM/YYYY', Image: 'Image', Action: action, action1: action1 },
        { id: 7, FName: 'First Name 3', LName: 'Last Name 3', Gender: 'Gender', Email: 'Email@gmail.com', Dob: 'DD/MM/YYYY', Image: 'Image', Action: action, action1: action1 },
        { id: 8, FName: 'First Name 3', LName: 'Last Name 3', Gender: 'Gender', Email: 'Email@gmail.com', Dob: 'DD/MM/YYYY', Image: 'Image', Action: action, action1: action1 },
        { id: 9, FName: 'First Name 3', LName: 'Last Name 3', Gender: 'Gender', Email: 'Email@gmail.com', Dob: 'DD/MM/YYYY', Image: 'Image', Action: action, action1: action1 },
        { id: 10, FName: 'First Name 3', LName: 'Last Name 3', Gender: 'Gender', Email: 'Email@gmail.com', Dob: 'DD/MM/YYYY', Image: 'Image', Action: action, action1: action1 },
        { id: 11, FName: 'First Name 3', LName: 'Last Name 3', Gender: 'Gender', Email: 'Email@gmail.com', Dob: 'DD/MM/YYYY', Image: 'Image', Action: action, action1: action1 },
        { id: 12, FName: 'First Name 3', LName: 'Last Name 3', Gender: 'Gender', Email: 'Email@gmail.com', Dob: 'DD/MM/YYYY', Image: 'Image', Action: action, action1: action1 },
    ];
    const item = ({ item }) => (
        <View style={{ flexDirection: 'row', borderColor: 'lightgray', paddingVertical: 0, backgroundColor: item.id % 2 == 0 ? '#f2f2f2' : '#F9F9F9' }}>
            <View style={{ width: 40 }}>
                <Text style={{ fontSize: 11, fontWeight: 'bold', textAlign: 'center' }}>{whiteCheckbok}</Text>
            </View>
            <View style={{ width: 40, }}>
                <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', textAlign: 'center' }}>{item.id}</Text>
            </View>
            <View style={{ width: 80 }}>
                <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', textAlign: 'center' }}>{item.FName}</Text>
            </View>
            <View style={{ width: 80, }}>
                <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', textAlign: 'center' }}>{item.LName}</Text>
            </View>
            <View style={{ width: 80, }}>
                <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', textAlign: 'center' }}>{item.Gender}</Text>
            </View>
            <View style={{ width: 80, }}>
                <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', textAlign: 'center' }}>{item.Email}</Text>
            </View>
            <View style={{ width: 80 }}>
                <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', textAlign: 'center' }}>{item.Dob}</Text>
            </View>
            <View style={{ width: 80 }}>
                <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', textAlign: 'center' }}>{item.Image}</Text>
            </View>
            <View style={{ width: 100, flexDirection: 'row', justifyContent: 'space-evenly', }}>
                <Pressable onPress={alert}><Text style={{ marginTop: 5 }}>{item.action1}</Text></Pressable>
                <Pressable onPress={alert}><Text style={{ marginTop: 5 }}>{item.Action}</Text></Pressable>
            </View>
        </View >);
    // const actions = [
    //     {
    //         // text: "Role Right",
    //         icon: <Delete name={'delete'} size={25} color={'#FFFFFF'} onPress={() => navigation.navigate('TopTab')} />,
    //     },

    // ];
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
                            <View style={{ width: '15%', marginTop: -8, marginLeft: -10 }}><Picker
                                selectedValue={selectedLanguage}
                                onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}>
                                <Picker.Item label="Role name" value="java" />
                                <Picker.Item label="Role id" value="js" />
                            </Picker></View>
                            <View style={{ width: '75%', }}><TextInput placeholder='Role Name' style={{ marginTop: 4 }} /></View>
                            <Pressable style={{ width: '10%', backgroundColor: '#f2f2f2', borderLeftWidth: 2, borderColor: 'gray', borderTopRightRadius: 3, borderBottomRightRadius: 3 }}><Text style={{ marginTop: 6, marginLeft: 3 }}><Icon color={'#000000'} name={'search'} size={25} onPress={search} /></Text></Pressable>
                        </View>
                        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 0, marginBottom: 8 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginTop: 6, marginRight: 10 }}>Show</Text>
                                <View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 9, width: 76 }}><View style={{ marginLeft: 1, marginRight: 1 }}>
                                    <NumericInput rounded totalWidth={70} borderColor={'#FFF'} type='up-down' separatorWidth={1}
                                        totalHeight={32} onChange={value => console.log(value)} />
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
                                <View>
                                    <View style={{ flexDirection: 'row', borderWidth: 1 }}>
                                        <View style={{ width: 40, backgroundColor: colors.colors.buttonColor, borderWidth: 1, borderColor: 'white' }}>
                                            <Text style={{ fontSize: 11, fontWeight: 'bold', textAlign: 'center', color: '#ffffff' }}><Checkbok /></Text>
                                        </View>
                                        <View style={{ width: 40, backgroundColor: colors.colors.buttonColor, borderWidth: 1, borderColor: 'white' }}>
                                            <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', textAlign: 'center', color: '#ffffff' }}>id</Text>
                                        </View>
                                        <View style={{ width: 80, backgroundColor: colors.colors.buttonColor, borderWidth: 1, borderColor: 'white' }}>
                                            <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', textAlign: 'center', color: '#ffffff' }}>First Name</Text>
                                        </View>
                                        <View style={{ width: 80, backgroundColor: colors.colors.buttonColor, borderWidth: 1, borderColor: 'white' }}>
                                            <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', textAlign: 'center', color: '#ffffff' }}>Last name</Text>
                                        </View>
                                        <View style={{ width: 80, backgroundColor: colors.colors.buttonColor, borderWidth: 1, borderColor: 'white' }}>
                                            <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', textAlign: 'center', color: '#ffffff' }}>Gender</Text>
                                        </View>
                                        <View style={{ width: 80, backgroundColor: colors.colors.buttonColor, borderWidth: 1, borderColor: 'white' }}>
                                            <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', textAlign: 'center', color: '#ffffff' }}>Email</Text>
                                        </View>
                                        <View style={{ width: 80, backgroundColor: colors.colors.buttonColor, borderWidth: 1, borderColor: 'white' }}>
                                            <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', textAlign: 'center', color: '#ffffff' }}>Dob</Text>
                                        </View>
                                        <View style={{ width: 80, backgroundColor: colors.colors.buttonColor, borderWidth: 1, borderColor: 'white' }}>
                                            <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', textAlign: 'center', color: '#ffffff' }}>Image</Text>
                                        </View>
                                        <View style={{ width: 100, backgroundColor: colors.colors.buttonColor, borderWidth: 1, borderColor: 'white' }}>
                                            <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', textAlign: 'center', color: '#ffffff' }}>Action</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <FlatList data={List} renderItem={item} keyExtractor={item => item.id.toString()} />
                                    </View>
                                </View>
                            </View >
                        </ScrollView>
                        <View style={{ marginBottom: -20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Text style={{ marginTop: 5 }}>Page 1 of 1 (4 Records)</Text>
                                <View style={{ flexDirection: 'row', marginTop: 1 }}>
                                    <Icon name={'chevron-left'} size={30} onPress={previous} />
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 5 }}>1</Text>
                                    <Icon name={'chevron-right'} size={30} onPress={next} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View>
                        <FloatingAction color={'#351401'} onPressMain={() => navigation.navigate('TopTab')}   distanceToEdge={{ vertical:10, horizontal: 25 }}/>
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