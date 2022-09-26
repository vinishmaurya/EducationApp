import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import SubmitButton from '../Component/SubmitButton';
import { colors } from '../Component/colors';
import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
const RoleMaster = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 20,
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 4 },
        shadowRadius: 3,
        elevation: 5,
        // marginVertical: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10
      }}
    >
      <View>
        <Text style={{ fontWeight: '400', marginTop: 10, }}>Role Name<Text style={{ color: "red" }}> *</Text></Text>
        <TextInput placeholder='Email' style={{ borderWidth: 1,borderColor: 'gray', marginVertical: 10, borderRadius: 5,height: 40,paddingLeft:8 }} />
        <View>
          <Text style={{ fontWeight: '400', marginTop: 10, }}>Landing Page<Text style={{ color: "red" }}> *</Text></Text>
          <View style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, borderRadius: 4,height:40,borderColor:'gray' }}>
            <Picker
            style={{marginTop:-10}}
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }>
              <Picker.Item label="Account Management" value="Account Management" />
              <Picker.Item label="Account Management" value="Account Management" />
            </Picker>
          </View>
        </View>

      </View>
      <View>
        <Text style={{ fontWeight: '400', marginTop: 10, }}>Status</Text>
        <View style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, borderRadius: 4,height:40,borderColor:'gray' }}>
          <Picker
          style={{marginTop:-10}}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }>
            <Picker.Item label="Active" value="Active" />
            <Picker.Item label="Deactive" value="Deactive" />
          </Picker>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        <Pressable style={{
          backgroundColor: colors.colors.buttonColor, padding: 8, width: 100, borderRadius: 20, marginRight: 5, shadowColor: '#000000',
          shadowOffset: { width: 20, height: 9 },
          shadowRadius: 8,
          elevation: 15,
        }}>
          <Text style={{ color: '#ffffff', textAlign: 'center' }}>Submit</Text>
        </Pressable>
        <Pressable style={{
          backgroundColor: colors.colors.buttonColor, padding: 8, width: 100, borderRadius: 20, marginLeft: 5, shadowColor: '#000000',
          shadowOffset: { width: 20, height: 9 },
          shadowRadius: 8,
          elevation: 15,
        }}>
          <Text style={{ color: '#ffffff', textAlign: 'center' }}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default RoleMaster