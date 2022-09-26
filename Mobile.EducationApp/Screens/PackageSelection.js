import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Card from '../Component/cards';
import { colors } from '../Component/colors'

const PackageSelection = ({ navigation }) => {
    return (
        <View>
            <View style={{ marginVertical: 20 }} >
                <Card />
            </View>
            {/* <View>
        <Text style={{marginHorizontal:30,fontWeight:'600',fontSize:18}}>Payment Terms</Text>
      </View> */}
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <View style={{ marginHorizontal: 30, justifyContent: 'center', marginTop: 0, width: '30%' }}>
                    <Pressable onPress={() => navigation.navigate('AddressDetails')} style={{ backgroundColor: colors.colors.headColor, padding: 6, marginVertical: 5, borderRadius: 4, textAlign: 'center' }}  ><Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Previous </Text></Pressable>
                </View>
                <View style={{ marginHorizontal: 30, justifyContent: 'center', marginTop: 0, width: '30%' }}>
                    <Pressable onPress={() => navigation.navigate('credential')} style={{ backgroundColor: colors.colors.headColor, padding: 6, marginVertical: 5, borderRadius: 4, textAlign: 'center' }}  ><Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Next </Text></Pressable>
                </View>
            </View>
        </View>
    )
}

export default PackageSelection