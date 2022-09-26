import { View, Text } from 'react-native'
import FontAwesome from 'react-native-vector-icons/Feather';
import Checkbox from '../Component/whiteCheckbok'
import { colors } from '../Component/colors'
import React from 'react'

const cards = () => {
    return (
        <View>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>

                <View style={{ backgroundColor: '#1C6758', width: 250, padding: 10, borderTopRightRadius: 8, borderTopLeftRadius: 8 }}>
                    <Text style={{ fontSize: 20, fontWeight: '400', textAlign: 'center', color: '#ffffff' }}>Free </Text>
                </View>
                <View style={{ backgroundColor: '#3D8361', width: 300, padding: 30, borderTopRightRadius: 8, borderTopLeftRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: '400', textAlign: 'center', color: '#ffffff', marginTop: 6, marginRight: 2 }}>₹</Text><Text style={{ fontSize: 28, fontWeight: '400', textAlign: 'center', color: '#ffffff' }}>0 </Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', width: 300, height: 400, padding: 30, borderRadius: 8, position: 'relative', marginTop: -8 }}>
                    <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                        <FontAwesome name='check' color={'green'} size={17} style={{ marginTop: 4, marginRight: 5 }} /><Text style={{ fontSize: 17, fontWeight: '400', color: '#000000', marginLeft: 0 }}>Whatsapp Request Update</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                        <FontAwesome name='x' color={'red'} size={17} style={{ marginTop: 4, marginRight: 5 }} /><Text style={{ fontSize: 17, fontWeight: '400', color: '#000000', marginLeft: 0 }}>Update SLA - 6 Hours</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                        <FontAwesome name='check' color={'green'} size={17} style={{ marginTop: 4, marginRight: 5 }} /><Text style={{ fontSize: 17, fontWeight: '400', color: '#000000', marginLeft: 0 }}>Update SLA - 3 Hours</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                        <FontAwesome name='x' color={'red'} size={17} style={{ marginTop: 4, marginRight: 5 }} /><Text style={{ fontSize: 17, fontWeight: '400', color: '#000000', marginLeft: 0 }}>Review Management</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                        <FontAwesome name='check' color={'green'} size={17} style={{ marginTop: 4, marginRight: 5 }} /><Text style={{ fontSize: 17, fontWeight: '400', color: '#000000', marginLeft: 0 }}>Promo Creation</Text>
                    </View>
                </View>
                <View style={{ backgroundColor:colors.colors.headColor, width: 120, borderRadius: 30, position: 'relative', marginTop:-19, flexDirection: 'row',justifyContent:'center',paddingHorizontal:10 }}>
                    <View style={{flexDirection:'row'}}>
                        <Checkbox/>
                        <Text style={{ color: 'white',marginTop:6,fontSize:15 }}>Select</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default cards