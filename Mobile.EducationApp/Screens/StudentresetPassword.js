import { View, Text,TextInput,ScrollView } from 'react-native'
import React from 'react'
import SubmitButton from '../Component/SubmitButton';
const StudentresetPassword = () => {
    return (
        <ScrollView style={{ marginHorizontal: 10, marginVertical: 10 }}>
            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text style={{ fontWeight: '600', fontSize: 20, color: '#000000' }}>Reset Password</Text>
                </View>
            <View style={{ marginTop: 10,marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: '400' }}>Email<Text style={{color:"red"}}> *</Text></Text>
                <TextInput placeholder='Email' style={{ marginTop: 18, borderWidth: 1, padding: 8 }} />
            </View>
            <View style={{ marginTop: 10,marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: '400' }}>Roll Number<Text style={{color:"red"}}> *</Text></Text>
                <TextInput placeholder='Roll Number' style={{ marginTop: 18, borderWidth: 1, padding: 8 }} />
            </View>
            <View style={{ marginTop: 10,marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: '400' }}>Name<Text style={{color:"red"}}> *</Text></Text>
                <TextInput placeholder='Name' style={{ marginTop: 18, borderWidth: 1, padding: 8 }} />
            </View>
            <SubmitButton Title={'Submit'} />
        </ScrollView>
    )
}

export default StudentresetPassword