import { View, Text, TextInput, ScrollView, FlatList, Pressable, Alert,Button } from 'react-native'
import React from 'react'
import SingalinputForm from '../Component/SingalinputForm';
import SubmitButton from '../Component/SubmitButton';

const ManageCategory = () => {
    function alert() {
        Alert.alert('remove')
    }
    function edit() {
        Alert.alert('Manage Category','Do you want to edit')
    }
    const action =<Button color={'red'} title='remove'/>
    const action1 =<Button title='Edit' onPress={edit}/>
    const data = [
        { id: 'No', name: 'Name', Action: 'Action', },
        { id: 1, name: 'OBC', Action: action,action1: action1 },
        { id: 2, name: 'SC&ST', Action: action,action1: action1  },
        { id: 3, name: 'General', Action: action,action1: action1  },
    ];
    const item = ({ item }) => (
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: 'lightgray', padding: 20 }}>
            <View style={{ width: 43 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.id}</Text>
            </View>
            <View style={{ width: 133 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.name}</Text>
            </View>
            <View style={{ width: 100 }}>
                <Pressable onPress={alert}><Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.Action}</Text></Pressable>
            </View>
            <View style={{ width: 100 }}>
                <Pressable onPress={alert}><Text>{item.action1}</Text></Pressable>
            </View>
        </View >);
    return (
        <ScrollView>
            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                <SingalinputForm formName={'Manage Category'} Placeholder={'Name'} labe={'Name'} />
                <SubmitButton Title={'Submit'} />
                <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                    <View style={{ marginHorizontal: 0, marginVertical: 20 }}>
                        <Text style={{ fontSize: 19, fontWeight: 'bold' }}>List Category</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} horizontal={true} style={{ flexDirection: 'row', maxWidth: "auto" }}>
                        <View style={{ borderWidth: 2, backgroundColor: '#D6EEEE' }}>
                            <FlatList data={data} renderItem={item} keyExtractor={item => item.id.toString()} />
                        </View>
                    </ScrollView>
                </View>
            </View>

        </ScrollView>
    )
}

export default ManageCategory;