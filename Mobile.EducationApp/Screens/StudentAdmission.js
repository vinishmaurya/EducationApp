import { View, Text, Pressable, TextInput, Alert, ScrollView, FlatList } from 'react-native'
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
    const [Bloodgroupid, setBloodgroupid] = useState(null);
    function alert() {
        Alert.alert('remove')
    }
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
    const [Bloodgroup, setBloodgroup] = useState(function () {
        let api_data = [
            { label: 'O', value: 'O' },
            { label: 'C', value: 'C' },
            { label: 'B', value: 'B' },
            { label: 'A', value: 'A' },
        ];
        return api_data;
    });
    function dateshow() {
        // Alert.alert('h');

    }
    return (
        <ScrollView style={{ marginHorizontal: 10, marginVertical: 10 }}>
            <View style={{ width: 'auto', }}>
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text style={{ fontWeight: '600', fontSize: 20, color: '#000000' }}>New Admission</Text>
                </View>
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>First Name<Text style={{color:"red"}}> *</Text></Text>
                        <TextInput placeholder='First Name ' style={{ marginTop: 18, borderWidth: 1, padding: 8 }} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Last Name<Text style={{color:"red"}}> *</Text></Text>
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
                    <View style={{ marginTop: 18 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Category<Text style={{color:"red"}}> *</Text></Text>
                        <View style={{ marginTop: 0 }}>
                            <Dropdown bindDataAwardCategory={Category} my_value={Categoryid} my_onChangeText={setCategoryid} />
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Religion<Text style={{color:"red"}}> *</Text></Text>
                        <TextInput placeholder='Religion' style={{ marginTop: 18, borderWidth: 1, padding: 8 }} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Height<Text style={{color:"red"}}> *</Text></Text>
                        <TextInput placeholder='Height' style={{ marginTop: 18, borderWidth: 1, padding: 8 }} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Weight<Text style={{color:"red"}}> *</Text></Text>
                        <TextInput placeholder='Weight' style={{ marginTop: 18, borderWidth: 1, padding: 8 }} />
                    </View>
                    <View style={{ marginTop: 18 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Blood group</Text>
                        <View style={{ marginTop: 0 }}>
                            <Dropdown bindDataAwardCategory={Bloodgroup} my_value={Bloodgroupid} my_onChangeText={setBloodgroupid} />
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Father First Name<Text style={{color:"red"}}> *</Text></Text>
                        <TextInput placeholder='Father First Name' style={{ marginTop: 18, borderWidth: 1, padding: 8 }} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Father Last Name<Text style={{color:"red"}}> *</Text></Text>
                        <TextInput placeholder='Father Last Name' style={{ marginTop: 18, borderWidth: 1, padding: 8 }} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Mother First Name<Text style={{color:"red"}}> *</Text></Text>
                        <TextInput placeholder='Father Last Name' style={{ marginTop: 18, borderWidth: 1, padding: 8 }} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Mother Last Name<Text style={{color:"red"}}> *</Text></Text>
                        <TextInput placeholder='Father Last Name' style={{ marginTop: 18, borderWidth: 1, padding: 8 }} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Mobile<Text style={{color:"red"}}> *</Text></Text>
                        <TextInput placeholder='Mobile' style={{ marginTop: 18, borderWidth: 1, padding: 8 }} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Email<Text style={{color:"red"}}> *</Text></Text>
                        <TextInput placeholder='Email' style={{ marginTop: 18, borderWidth: 1, padding: 8 }} />
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
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>

                    <View style={{ marginTop: 10 }}>

                        <View style={{ marginTop: 18 }}>
                            <Text style={{ fontSize: 16, fontWeight: '400' }}>Class Section<Text style={{color:"red"}}> *</Text></Text>
                            <View style={{ marginTop: 0 }}>
                                <Dropdown bindDataAwardCategory={dataAwardCategory} my_value={dataAwardCategorySelectionId} my_onChangeText={setdataAwardCategorySelectionId} />
                            </View>
                        </View>
                    </View>
                </View>
                <SubmitButton Title={'Submit'} onPress={dateshow} />
            </View>
        </ScrollView>
    )
}

export default StudentAdmission; 