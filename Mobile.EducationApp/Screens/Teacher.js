import { View, Text, Pressable, TextInput, Alert, ScrollView, FlatList,Button } from 'react-native'
import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper';
import Dropdown from '../Component/dropdown';
import SubmitButton from '../Component/SubmitButton';
import Datepicker from '../Component/Datepicker';
import Imagepicker from '../Component/ProfileSelect'
const StudentAdmission = () => {
    const [checked, setChecked] = React.useState('first');
    const [Type, setType] = React.useState('first');
    const [Gender, SetGender] = React.useState('first');
    const [dataAwardCategorySelectionId, setdataAwardCategorySelectionId] = useState(null);
    const [Categoryid, setCategoryid] = useState(null);
    function alert() {
        Alert.alert('remove')
    }
    const data = [
        { id: 'No', name: 'Name', Action: 'Action', },
        { id: 1, name: 'HINDI', Action: 'remove', },
        { id: 2, name: 'ENGLISH', Action: 'remove', },
        { id: 3, name: 'SCINCE', Action: 'remove', },
        { id: 4, name: 'MATH', Action: 'remove', },
    ];
    const [dataAwardCategory, setdataAwardCategory] = useState(function () {
        let api_data = [
            { label: '9(A) English', value: '9(A)English' },
            { label: '9(B) English', value: '9(B)English' },
            { label: '10(A) English', value: '10(A)English' },
        ];
        return api_data;
    });
    const [Category, setCategory] = useState(function () {
        let api_data = [
            { label: 'SC & ST', value: 'SC&ST' },
            { label: 'OBC', value: 'OBC' },
            { label: 'Genral', value: 'Genral' },
        ];
        return api_data;
    });
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
            <View style={{ width: 100 }}>
                <Pressable onPress={alert}><Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.Action}</Text></Pressable>
            </View>
            <View style={{ width: 100 }}>
                <Pressable onPress={alert}><Text>{item.action1}</Text></Pressable>
            </View>
        </View >);
    return (
        <ScrollView style={{ marginHorizontal: 10, marginVertical: 10 }}>
            <View style={{ width: 'auto', }}>
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text style={{ fontWeight: '600', fontSize: 20, color: '#000000' }}>Teacher Create</Text>
                </View>
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>First Name<Text style={{color:"red"}}> *</Text></Text>
                        <TextInput placeholder='First Name ' style={{ marginTop: 18, borderWidth: 1, padding: 8 }} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Last Name<Text style={{color:"red"}}> *</Text> </Text>
                        <TextInput placeholder='Last Name ' style={{ marginTop: 18, borderWidth: 1, padding: 8 }} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400', }}>Date of Birth<Text style={{color:"red"}}> *</Text></Text>
                        <View style={{ flexDirection: 'row', marginTop: 18 }}>
                            <TextInput placeholder='DD' style={{ borderRadius: 4, borderWidth: 1, borderColor: 'black', padding: 10, width: 50 }} maxLength={2} keyboardType={'number-pad'} />
                            <TextInput placeholder='MM' style={{ borderRadius: 4, borderWidth: 1, borderColor: 'black', padding: 10, width: 50, marginHorizontal: 10 }} maxLength={2} keyboardType={'number-pad'} />
                            <TextInput placeholder='YYYY' style={{ borderRadius: 4, borderWidth: 1, borderColor: 'black', padding: 10, width: 90 }} maxLength={4} keyboardType={'number-pad'} />
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Gender<Text style={{color:"red"}}> *</Text></Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Pressable onPress={() => setType('first')} style={{ flexDirection: 'row', marginHorizontal: 8 }}>
                                <RadioButton
                                    value="first"
                                    status={Type === 'first' ? 'checked' : 'unchecked'}
                                    onPress={() => setType('first')}
                                /><Text style={{ marginTop: 8 }}>Male</Text>
                            </Pressable>
                            <Pressable onPress={() => setType('second')} style={{ flexDirection: 'row', marginHorizontal: 8 }}>
                                <RadioButton
                                    value="second"
                                    onPress={() => setType('second')}
                                    status={Type === 'second' ? 'checked' : 'unchecked'}
                                />
                                <Text style={{ marginTop: 8 }}>Female</Text>
                            </Pressable>
                            <Pressable onPress={() => setType('Third')} style={{ flexDirection: 'row', marginHorizontal: 8 }}>
                                <RadioButton
                                    value="Third"
                                    status={Type === 'Third' ? 'checked' : 'unchecked'}
                                    onPress={() => setType('Third')}
                                /><Text style={{ marginTop: 8 }}>Other</Text>
                            </Pressable>
                        </View>
                    </View>
                    {/* <View style={{ marginTop: 18 }}>
            <Text style={{ fontSize: 16, fontWeight: '400' }}>Category</Text>
            <View style={{ marginTop: 0 }}>
              <Dropdown bindDataAwardCategory={Category} my_value={Categoryid} my_onChangeText={setCategoryid} />
            </View>
          </View> */}
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Email<Text style={{color:"red"}}> *</Text></Text>
                        <TextInput placeholder='Email' style={{ marginTop: 18, borderWidth: 1, padding: 8 }} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Qualification<Text style={{color:"red"}}> *</Text></Text>
                        <TextInput placeholder='Qualification' multiline={true} numberOfLines={4} style={{ marginTop: 18, borderWidth: 1, padding: 8 }} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Mobile<Text style={{color:"red"}}> *</Text></Text>
                        <TextInput placeholder='Mobile' style={{ marginTop: 18, borderWidth: 1, padding: 8 }} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Address<Text style={{color:"red"}}> *</Text></Text>
                        <TextInput keyboardType={'default'} placeholder='Address' multiline={true} numberOfLines={4} style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, padding: 10, textAlignVertical: 'top' }} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Photo<Text style={{color:"red"}}> *</Text></Text>
                        <Imagepicker />
                    </View>
                </View>

                <SubmitButton Title={'Submit'} />

                <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                    <View style={{ marginHorizontal: 0, marginVertical: 20 }}>
                        <Text style={{ fontSize: 19, fontWeight: 'bold' }}>List Teacher</Text>
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

export default StudentAdmission; 