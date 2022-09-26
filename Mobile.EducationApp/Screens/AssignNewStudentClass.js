import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import Dropdown from '../Component/dropdown';
const AssignClassTeacher = () => {
    const [Categoryid, setCategoryid] = useState(null);
    const [Subjectid, setSubjectid] = useState(null);
    const data = [
        { id: 'No', FirstName: 'First Name', LastName: 'Last Name',Image:'Image', ClassSection: 'Class Section', AdmissionNumber: 'Admission Number',RollNumber:'RollNumber' },
        
    ];
    const [Category, setCategory] = useState(function () {
        let api_data = [
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
        ];
        return api_data;
    });
    const [Subject, setSubject] = useState(function () {
        let api_data = [
            { label: 'A', value: 'A' },
            { label: 'B', value: 'B' },
            { label: 'C', value: 'C' },
            { label: 'D', value: 'D' },
        ];
        return api_data;
    });
    const item = ({ item }) => (
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: 'lightgray', padding: 20 }}>
            <View style={{ width: 40 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.id}</Text>
            </View>
            <View style={{ width: 130 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.FirstName}</Text>
            </View>
            <View style={{ width: 130 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.LastName}</Text>
            </View>
            <View style={{ width: 130 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.Image}</Text>
            </View>
            <View style={{ width: 130 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.ClassSection}</Text>
            </View>
            <View style={{ width: 130 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.AdmissionNumber}</Text>
            </View>
            <View style={{ width: 130 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.RollNumber}</Text>
            </View>
        </View >);
    return (
        <>
            <ScrollView>
                <View style={{ marginHorizontal: 15, marginBottom: 30 }}>
                    <View>
                        <View style={{ marginHorizontal: 0, marginVertical: 20 }}>
                            <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Assign New Student Class</Text>
                        </View>
                        <View>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Class<Text style={{ color: "red" }}> *</Text></Text>
                            <View style={{ marginTop: 0 }}>
                                <Dropdown bindDataAwardCategory={Category} my_value={Categoryid} my_onChangeText={setCategoryid} />
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: '400' }}>Class Section<Text style={{ color: "red" }}> *</Text></Text>
                            <View style={{ marginTop: 0 }}>
                                <Dropdown bindDataAwardCategory={Subject} my_value={Subjectid} my_onChangeText={setSubjectid} />
                            </View>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} horizontal={true} style={{ flexDirection: 'row', maxWidth: "auto",marginTop:20 }}>
                            <View style={{ borderWidth: 2, backgroundColor: '#FFFFFF' }}>
                                <FlatList data={data} renderItem={item} keyExtractor={item => item.id.toString()} />
                                <Text style={{textAlign:'center',fontWeight:'500',fontSize:19,marginVertical:10}}>No Record Found</Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default AssignClassTeacher;