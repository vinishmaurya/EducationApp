import { View, Text, ScrollView, FlatList,TextInput } from 'react-native';
import Dropdown from '../Component/dropdown';
import React, { useState } from 'react'
const AssignSubjectTeacher = () => {
    const [Categoryid, setCategoryid] = useState(null);
    const [Subjectid, setSubjectid] = useState(null);
    const [Category, setCategory] = useState(function () {
        let api_data = [
            { label: 'A', value: 'A' },
            { label: 'B', value: 'B' },
            { label: 'C', value: 'C' },
            { label: 'D', value: 'D' },
        ];
        return api_data;
    });
    const [Subject, setSubject] = useState(function () {
        let api_data = [
            { label: 'Hindi', value: 'Hindi' },
            { label: 'English', value: 'English' },
            { label: 'Science', value: 'Science' },
            { label: 'Math', value: 'Math' },
        ];
        return api_data;
    });
    const data = [
        { id: 'No', ClassSectionNAme: 'Class Section NAme', SubjectName: 'Subject Name', TeacherName: 'TeacherName', Action: 'Action' },

    ];

    const item = ({ item }) => (
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: 'lightgray', padding: 20 }}>
            <View style={{ width: 40 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.id}</Text>
            </View>
            <View style={{ width: 130 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.ClassSectionNAme}</Text>
            </View>
            <View style={{ width: 130 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.SubjectName}</Text>
            </View>
            <View style={{ width: 100 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.TeacherName}</Text>
            </View>
            <View style={{ width: 100 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.Action}</Text>
            </View>
        </View >);
    return (
        <>
            <ScrollView>
                <View style={{ marginHorizontal: 15, marginBottom: 30 }}>
                    <View>
                        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                            <Text style={{ fontWeight: '600', fontSize: 20, color: '#000000' }}>Assign Subject Teacher</Text>
                        </View>
                        <View style={{ marginTop: 18 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Class Section<Text style={{ color: "red" }}> *</Text></Text>
                            <View style={{ marginTop: 0 }}>
                                <Dropdown bindDataAwardCategory={Category} my_value={Categoryid} my_onChangeText={setCategoryid} />
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: '400' }}>Subject<Text style={{ color: "red" }}> *</Text></Text>
                            <View style={{ marginTop: 0 }}>
                                <Dropdown bindDataAwardCategory={Subject} my_value={Subjectid} my_onChangeText={setSubjectid} />
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontSize: 16, fontWeight: '400' }}>Teacher<Text style={{ color: "red" }}> *</Text></Text>
                                <TextInput placeholder='Teacher Name ' style={{ marginTop: 18, borderWidth: 1, padding: 8 }} />
                            </View>
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                            <Text style={{ fontSize: 19, fontWeight: 'bold' }}>List Subject Teacher</Text>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} horizontal={true} style={{ flexDirection: 'row', maxWidth: "auto" }}>
                            <View style={{ borderWidth: 2, backgroundColor: '#FFFFFF' }}>
                                <FlatList data={data} renderItem={item} keyExtractor={item => item.id.toString()} />
                                <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 19, marginVertical: 10 }}>No Record Found</Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default AssignSubjectTeacher;