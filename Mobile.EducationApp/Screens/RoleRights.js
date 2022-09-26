import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import SubmitButton from '../Component/SubmitButton';
import { colors } from '../Component/colors';
import CheckBox from '../Component/checkbok';
const RoleRights = () => {
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
        <View>
          <Text style={{ fontWeight: '400', marginTop: 10, }}>Roll Number<Text style={{ color: "red" }}> *</Text></Text>
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
        <Text style={{ fontWeight: '400', marginTop: 10, }}>Module<Text style={{ color: "red" }}> *</Text></Text>
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


        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ height: 100, width: 50 }} >
            <View style={styles.menu} ><Text style={[styles.blackText, styles.menuTitle]}>Menu</Text></View>
            <View style={styles.Roles} ><Text style={styles.RolesText}>Roles</Text></View>
          </View>
          <View>
            <View style={styles.right}><Text style={styles.blackText}>Rights</Text></View>
            <View style={{ flexDirection: 'row', height: 35 }}>
              <View style={styles.blackbox}><Text style={styles.blackText}>All</Text></View>
              <View style={styles.blackbox}><Text style={styles.blackText}>View</Text></View>
              <View style={styles.blackbox}><Text style={styles.blackText}>Add</Text></View>
              <View style={styles.blackbox}><Text style={styles.blackText}>Edit</Text></View>
              <View style={styles.blackbox}><Text style={styles.blackText}>Delete</Text></View>
              <View style={styles.blackbox}><Text style={styles.blackText}>Export</Text></View>
            </View>
            <View style={styles.sethead}>
              <View style={ styles.set2}><View style={ styles.checkbox}><CheckBox /></View></View>
              <View style={ styles.set2}><View style={ styles.checkbox}><CheckBox /></View></View>
              <View style={ styles.set2}><View style={ styles.checkbox}><CheckBox /></View></View>
              <View style={ styles.set2}><View style={ styles.checkbox}><CheckBox /></View></View>
              <View style={ styles.set2}><View style={ styles.checkbox}><CheckBox /></View></View>
              <View style={ styles.set2}><View style={ styles.checkbox}><CheckBox /></View></View>
            </View>
          </View>
        </View>


      </View>
      <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
        <Pressable style={{ backgroundColor: colors.colors.buttonColor,padding:8,width:100,borderRadius:20,marginRight:5, shadowColor: '#000000',
                            shadowOffset: { width: 20, height: 9 },
                            shadowRadius: 8,
                            elevation: 15, }}>
          <Text style={{color:'#ffffff',textAlign:'center'}}>Submit</Text>
        </Pressable>
        <Pressable style={{ backgroundColor: colors.colors.buttonColor,padding:8,width:100,borderRadius:20,marginLeft:5,shadowColor: '#000000',
                            shadowOffset: { width: 20, height: 9 },
                            shadowRadius: 8,
                            elevation: 15,  }}>
          <Text style={{color:'#ffffff',textAlign:'center'}}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default RoleRights
const styles = StyleSheet.create({
  set2: {
    width: 47,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRightColor: colors.colors.gray,
    borderBottomColor: colors.colors.gray,

  },
  sethead: {
    flexDirection: 'row',
    height: 50,
    borderBottomColor: colors.colors.gray,

  },
  menu: {
    borderWidth: 1,
    height: 70,
    backgroundColor: colors.colors.black,
    borderColor: colors.colors.gray,
  },
  Roles: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: colors.colors.gray,
    height: 50
  },
  right: {
    borderWidth: 1,
    height: 35,
    backgroundColor: colors.colors.black,
    borderBottomColor: colors.colors.gray
  },
  centerBlack: {
    textAlign: 'center',
    marginTop: 10
  },
  blackbox:
  {
    width: 47,
    borderWidth: 1,
    borderRightColor: colors.colors.gray,
    backgroundColor: colors.colors.black
  },
  blackText: {
    color: colors.colors.white,
    textAlign: 'center',
    marginTop: 5
  },
  menuTitle: {
    marginTop: 22
  },
  checkbox: {
    marginLeft: 5,
    marginTop:5

  },
  RolesText: {
    marginTop: 12,
    textAlign: 'center'

  }
})