import { View, Text, TextInput, ScrollView, FlatList, Pressable, Alert } from 'react-native'
import React from 'react'
import SingalinputForm from '../Component/SingalinputForm';
import SubmitButton from '../Component/SubmitButton';

const Section = () => {
    function alert() {
        Alert.alert('remove')
    }
    const data = [
        { id: 'No', name: 'Name', Action: 'Action', },
        { id: 1, name: '(A)', Action: 'remove', },
        { id: 2, name: '(B)', Action: 'remove', },
        { id: 3, name: '(C)', Action: 'remove', },
        { id: 4, name: '(D)', Action: 'remove', },
    ];
    const item = ({ item }) => (
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: 'lightgray', padding: 20 }}>
            <View style={{ width: 43 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.id}</Text>
            </View>
            <View style={{ width: 133 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.name}</Text>
            </View>
            <View style={{ width: 133 }}>
                <Pressable onPress={alert}><Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.Action}</Text></Pressable>
            </View>
        </View >);
    return (
        <ScrollView>
            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                <SingalinputForm formName={'Create Section'} Placeholder={'Name'} labe={'Name'} />
                <SubmitButton Title={'Submit'} />
                <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                    <View style={{ marginHorizontal: 0, marginVertical: 20 }}>
                        <Text style={{ fontSize: 19, fontWeight: 'bold' }}>List Medium</Text>
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

export default Section;