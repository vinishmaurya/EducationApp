import { View, Text,Pressable } from 'react-native'
import { colors } from './colors'
import React from 'react'

const SubmitButton = ({Title,onPress}) => {
  return (
    <View style={{ marginHorizontal:10,marginVertical:10,width:150 }}>
      <Pressable style={{backgroundColor: colors.colors.buttonColor, padding:15,borderWidth:1,borderRadius:5}} onPress={onPress}>
        <Text style={{textAlign:'center',color:'#ffffff',fontSize:18}}>{Title}</Text>
      </Pressable>
    </View>
  )
}

export default SubmitButton