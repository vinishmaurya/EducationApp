import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../Component/colors'
import FontAwesome from 'react-native-vector-icons/SimpleLineIcons';
import Spinner from 'react-native-loading-spinner-overlay';

const BackendApproval = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    function next() {
        setIsLoading(true);
        navigation.navigate('Drawer')

    };
    return (
        <View>
            <Spinner visible={isLoading} textContent={'Please Wait ..'}
                textStyle={{ color: colors.colors.white, fontWeight: '400' }} />
            <View style={{ marginVertical: 20 }}>
                {/* <Text style={{ marginHorizontal: 30, fontWeight: '600', fontSize: 18 }}>Backend Approval Status</Text> */}
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                <View style={{ backgroundColor: colors.colors.primary400, width: 200, height: 200, justifyContent: 'center', borderRadius: 8, alignItems: 'center' }}>
                    <FontAwesome name='emotsmile' color={'white'} size={90} style={{ marginTop: 4, marginRight: 5 }} />
                    <Text style={{ color: '#ffffff', fontSize: 20, marginTop: 10 }}>Completed</Text>

                </View>
                <View style={{ backgroundColor: '#F9F9F9', width: 280, height: 150, justifyContent: 'center', marginVertical: 20, borderRadius: 8, alignItems: 'center' }}>
                    <Text style={{ color: colors.colors.primary400, fontSize: 20, marginTop: 10 }}>Congratulation</Text>
                    <Text style={{ fontSize: 16, marginTop: 10, padding: 10 }}>We appreciate your interest.
                        We will do our best to notify you about [interesting and useful resources].</Text>

                </View>
                <View style={{ justifyContent: 'center', marginTop: 20, width: '100%' }}>
                    <View style={{ paddingHorizontal: 0, paddingVertical: 5, marginHorizontal: 30, }}>
                        <Pressable style={{ backgroundColor: colors.colors.headColor, padding: 6, borderRadius: 4, width: "auto" }} onPress={next} ><Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Finsh</Text></Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default BackendApproval