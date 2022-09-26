import { View, Text,TextInput } from 'react-native'
import React from 'react'

const SingalinputForm = ({formName,Placeholder,labe,value,onChangeText,style}) => {
    return (
        <View style={style}>
            <View style={{ width: 'auto', height: 160 }}>
                <View style={{ marginHorizontal:10,marginVertical:10 }}>
                    <Text style={{ fontWeight: '600', fontSize: 20, color: '#000000' }}>{formName}</Text>
                </View>
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>{labe}<Text style={{color:"red"}}> *</Text></Text>
                    <TextInput style={{ marginTop: 18, borderWidth: 1, padding: 8 }} placeholder={Placeholder} value={value} onChangeText={{onChangeText}} />
                </View>
            </View>
        </View>
    )
}

export default SingalinputForm;