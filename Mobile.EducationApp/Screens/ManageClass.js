import { View, Text, Pressable, TextInput, Alert, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper';
import SubmitButton from '../Component/SubmitButton';
import Checkbok from '../Component/checkbok'

const ManageClass = () => {
    const [checked, setChecked] = React.useState('first');
    const [Type, setType] = React.useState('first');
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
        <ScrollView style={{ marginHorizontal: 10, marginVertical: 10 }}>
            <View style={{ width: 'auto', }}>
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text style={{ fontWeight: '600', fontSize: 20, color: '#000000' }}>Create Class</Text>
                </View>
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>Medium<Text style={{color:"red"}}> *</Text></Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Pressable onPress={() => setChecked('first')} style={{ flexDirection: 'row', marginHorizontal: 8 }}>
                            <RadioButton
                                value="first"
                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('first')}
                            /><Text style={{ marginTop: 8 }}>Hindi</Text>
                        </Pressable>
                        <Pressable onPress={() => setChecked('second')} style={{ flexDirection: 'row', marginHorizontal: 8 }}>
                            <RadioButton
                                value="second"
                                onPress={() => setChecked('second')}
                                status={checked === 'second' ? 'checked' : 'unchecked'}
                            />
                            <Text style={{ marginTop: 8 }}>English</Text>
                        </Pressable>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Name<Text style={{color:"red"}}> *</Text></Text>
                        <TextInput placeholder='Name' style={{ marginTop: 18, borderWidth: 1, padding: 8 }} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Section<Text style={{color:"red"}}> *</Text></Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Checkbok />
                            </View>
                            <View style={{ marginTop: 7 }}>
                                <Text>(A)</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Checkbok />
                            </View>
                            <View style={{ marginTop: 7 }}>
                                <Text>(B)</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Checkbok />
                            </View>
                            <View style={{ marginTop: 7 }}>
                                <Text>(C)</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Checkbok />
                            </View>
                            <View style={{ marginTop: 7 }}>
                                <Text>(D)</Text>
                            </View>
                        </View>



                    </View>
                </View>
                <SubmitButton Title={'Submit'} />
                <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
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

export default ManageClass; 