import { View, Text, Pressable, Alert, ScrollView, FlatList,Button } from 'react-native'
import React, { useState } from 'react'
const Parents = () => {
    function alert() {
        Alert.alert('remove')
    }
    function edit() {
        Alert.alert('Manage Category','Do you want to edit')
    }
    const action =<Button color={'red'} title='remove'/>
    const action1 =<Button title='Edit' onPress={edit}/>
    const List = [
        { id: 'No', FName: 'First Name',LName: 'Last Name',Gender: 'Gender',Email: 'Email@gmail.com',Dob: 'Date of Birth',Image:'Image', Action: 'Action', },
        { id: 1, FName: 'First Name 1',LName: 'Last Name 1',Gender: 'Gender',Email: 'Email@gmail.com',Dob: 'DD/MM/YYYY',Image:'Image', Action: action,action1: action1 },
        { id: 2, FName: 'First Name 2',LName: 'Last Name 2',Gender: 'Gender',Email: 'Email@gmail.com',Dob: 'DD/MM/YYYY',Image:'Image', Action: action,action1: action1 },
        { id: 3, FName: 'First Name 3',LName: 'Last Name 3',Gender: 'Gender',Email: 'Email@gmail.com',Dob: 'DD/MM/YYYY',Image:'Image', Action: action,action1: action1 },
    ];
    const item = ({ item }) => (
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: 'lightgray', padding: 20 }}>
            <View style={{ width: 43 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.id}</Text>
            </View>
            <View style={{ width: 133 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.FName}</Text>
            </View>
            <View style={{ width: 133 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.LName}</Text>
            </View>
            <View style={{ width: 133 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.Gender}</Text>
            </View>
            <View style={{ width: 143 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.Email}</Text>
            </View>
            <View style={{ width: 143 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.Dob}</Text>
            </View>
            <View style={{ width: 133 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.Image}</Text>
            </View>
            <View style={{ width: 150,flexDirection:'row',justifyContent:'space-between' }}>
                <Pressable onPress={alert}><Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.Action}</Text></Pressable>
                <Pressable onPress={alert}><Text>{item.action1}</Text></Pressable>
            </View>
        </View >);
    return (
        <ScrollView style={{ marginHorizontal: 10, marginVertical: 10 }}>
            <View style={{ width: 'auto', }}>
                <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                    <View style={{ marginHorizontal: 0, marginVertical: 20 }}>
                        <Text style={{ fontSize: 19, fontWeight: 'bold' }}>List Parents</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} horizontal={true} style={{ flexDirection: 'row', maxWidth: "auto" }}>
                        <View style={{ borderWidth: 2, backgroundColor: '#D6EEEE' }}>
                            <FlatList data={List} renderItem={item} keyExtractor={item => item.id.toString()} />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    )
}

export default Parents; 