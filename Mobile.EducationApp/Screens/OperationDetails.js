import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
// import Checkbox from '../Component/checkbok';
import { colors } from '../Component/colors';
import TimeingDropdown from '../Component/TimeingDropdown';
import { Checkbox } from 'react-native-paper';
import axios from "axios";
import BaseURL from '../config';
import Spinner from 'react-native-loading-spinner-overlay';
const OperationDetails = ({ navigation, }) => {
    const [isLoading, setIsLoading] = useState(false);
    function submitform() {
        setIsLoading(true);
        try {
            //Save Data by api
            axios.post(`${BaseURL.BASE_URL}/post-operation-data`, {
                online: online,
                Monday: Monday,
                Tuesday: Tuesday,
                Wednesday: Wednesday,
                Thursday: Thursday,
                Friday: Friday,
                Saturday: Saturday,
                Sunday: Sunday,
                halfMonday: halfMonday,
                halfTuesday: halfTuesday,
                halfWednesday: halfWednesday,
                halfThursday: halfThursday,
                halfFriday: halfFriday,
                halfSaturday: halfSaturday,
                halfSunday: halfSunday,
                open: opening.value,
                close: closing.value,
            })
                .then(res => {
                    debugger;
                    let userInfo = res.data;
                    Alert.alert(
                        "Operation Details",
                        userInfo.Message,
                        [

                            { text: "OK", }
                        ]
                    );
                    navigation.navigate('DocumentsDetails')

                })
                .catch(e => {
                    console.log(`post error ${e}`);
                });
        }
        catch (error) {
            console.log(error.message);
        }

        // console.log("online" + " " + online)
        // console.log("Monday" + " " + Monday)
        // console.log("Tuesday" + " " + Tuesday)
        // console.log("Wednesday" + " " + Wednesday)
        // console.log("Thursday" + " " + Thursday)
        // console.log("Friday" + " " + Friday)
        // console.log("Saturday" + " " + Saturday)
        // console.log("Sunday" + " " + Sunday)
        // console.log("halfday Monday" + " " + halfMonday)
        // console.log("halfday Tuesday" + " " + halfTuesday)
        // console.log("halfday Wednesday" + " " + halfWednesday)
        // console.log("halfday Thursday" + " " + halfThursday)
        // console.log("halfday Friday" + " " + halfFriday)
        // console.log("halfday Saturday" + " " + halfSaturday)
        // console.log("halfday Sunday" + " " + halfSunday)
        console.log(opening.value);
        console.log(closing.value);
    }
    const OpenTime =
        [
            { label: '09:30 AM', value: '09:30 AM' },
            { label: '10:00 AM', value: '10:00 AM' },
            { label: '10:30 AM', value: '10:30 AM' },
            { label: '11:00 AM', value: '11:00 AM' },
            { label: '11:30 AM', value: '11:30 AM' },
            { label: '12:00 PM', value: '12:00 PM' },
            { label: '12:30 PM', value: '12:30 PM' },
            { label: '01:00 PM', value: '01:00 PM' },
            { label: '01:30 PM', value: '01:30 PM' },
            { label: '02:00 PM', value: '02:00 PM' },
            { label: '02:30 PM', value: '02:30 PM' },
            { label: '03:00 PM', value: '03:00 PM' },
            { label: '03:30 PM', value: '03:30 PM' },
            { label: '04:00 PM', value: '04:00 PM' },
            { label: '04:30 PM', value: '04:30 PM' },
            { label: '05:00 PM', value: '05:00 PM' },
            { label: '05:30 PM', value: '05:30 PM' },
            { label: '06:00 PM', value: '06:00 PM' },
            { label: '06:30 PM', value: '06:30 PM' },
            { label: '07:00 PM', value: '07:00 PM' },
        ];
    const CloseTime =
        [
            { label: '09:30 AM', value: '09:30 AM' },
            { label: '10:00 AM', value: '10:00 AM' },
            { label: '10:30 AM', value: '10:30 AM' },
            { label: '11:00 AM', value: '11:00 AM' },
            { label: '11:30 AM', value: '11:30 AM' },
            { label: '12:00 PM', value: '12:00 PM' },
            { label: '12:30 PM', value: '12:30 PM' },
            { label: '01:00 PM', value: '01:00 PM' },
            { label: '01:30 PM', value: '01:30 PM' },
            { label: '02:00 PM', value: '02:00 PM' },
            { label: '02:30 PM', value: '02:30 PM' },
            { label: '03:00 PM', value: '03:00 PM' },
            { label: '03:30 PM', value: '03:30 PM' },
            { label: '04:00 PM', value: '04:00 PM' },
            { label: '04:30 PM', value: '04:30 PM' },
            { label: '05:00 PM', value: '05:00 PM' },
            { label: '05:30 PM', value: '05:30 PM' },
            { label: '06:00 PM', value: '06:00 PM' },
            { label: '06:30 PM', value: '06:30 PM' },
            { label: '07:00 PM', value: '07:00 PM' },
        ];
    const [opening, setopening] = useState("")
    const [closing, setclosing] = useState("")
    const [online, setonlinechecked] = useState(false);
    const [Monday, setMonday] = useState(false);
    const [Tuesday, setTuesday] = useState(false);
    const [Wednesday, setWednesday] = useState(false);
    const [Thursday, setThursday] = useState(false);
    const [Friday, setFriday] = useState(false);
    const [Saturday, setSaturday] = useState(false);
    const [Sunday, setSunday] = useState(false);
    const [halfMonday, sethalfMonday] = useState(false);
    const [halfTuesday, sethalfTuesday] = useState(false);
    const [halfWednesday, sethalfWednesday] = useState(false);
    const [halfThursday, sethalfThursday] = useState(false);
    const [halfFriday, sethalfFriday] = useState(false);
    const [halfSaturday, sethalfSaturday] = useState(false);
    const [halfSunday, sethalfSunday] = useState(false);
    // const [rinkuchecked, setChecked] = useState(false);

    function boxcheck() {
        setonlinechecked(!online)
    }
    function clickMonday() {
        setMonday(!Monday)
    }
    function clickTuesday() {
        setTuesday(!Tuesday)
    }
    function clickWednesday() {
        setWednesday(!Wednesday)
    }
    function clickThursday() {
        setThursday(!Thursday)
    }
    function clickFriday() {
        setFriday(!Friday)
    }
    function clickSaturday() {
        setSaturday(!Saturday)
    }
    function clickSunday() {
        setSunday(!Sunday)
    }
    function clickhalfdayMonday() {
        sethalfMonday(!halfMonday)
    }
    function clickhalfdayTuesday() {
        sethalfTuesday(!halfTuesday)
    }
    function clickhalfdayWednesday() {
        sethalfWednesday(!halfWednesday)
    }
    function clickhalfdayThursday() {
        sethalfThursday(!halfThursday)
    }
    function clickhalfdayFriday() {
        sethalfFriday(!halfFriday)
    }
    function clickhalfdaySaturday() {
        sethalfSaturday(!halfSaturday)
    }
    function clickhalfdaySunday() {
        sethalfSunday(!halfSunday)
    }
    return (
        <View>
            <Spinner visible={isLoading} textContent={'Please Wait ..'}
                textStyle={{ color: colors.colors.white, fontWeight: '400' }} />

            <View style={{ backgroundColor: '#351401', marginHorizontal: 10, marginTop: 10, borderRadius: 5 }}>
                <Text style={{ fontWeight: '400', fontSize: 17, marginTop: 0, padding: 10, textAlign: 'center', color: 'white' }}>Timeing</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '50%' }}>
                    <Text style={{ textAlign: 'center', marginTop: 20, fontWeight: '600', fontSize: 19 }} >Open</Text>
                    <TimeingDropdown bindDataAwardCategory={OpenTime} my_onChangeText={setopening} my_value={opening} />
                </View>
                <View style={{ width: '50%' }}>
                    <Text style={{ textAlign: 'center', marginTop: 20, fontWeight: '600', fontSize: 19 }} >Close</Text>
                    <TimeingDropdown bindDataAwardCategory={CloseTime} my_onChangeText={setclosing} my_value={closing} />
                </View>
            </View>
            <View style={{ backgroundColor: '#351401', marginHorizontal: 10, marginTop: 10, borderRadius: 5 }}>
                <Text style={{ fontWeight: '400', fontSize: 17, marginTop: 0, padding: 10, textAlign: 'center', color: 'white' }}>Holiday</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1, marginHorizontal: 10 }}>
                <View style={{ backgroundColor: '#351401', marginHorizontal: 0, marginTop: 10, borderRadius: 5, width: '45%' }}>
                    <Text style={{ fontWeight: '300', fontSize: 14, marginTop: 0, padding: 10, textAlign: 'center', color: 'white' }}>Full day (close)</Text>
                </View>
                {/* <View style={{ borderRightWidth: 1, }}></View> */}
                <View style={{ backgroundColor: '#351401', marginHorizontal: 0, marginTop: 10, borderRadius: 5, width: '45%' }}>
                    <Text style={{ fontWeight: '300', fontSize: 14, marginTop: 0, padding: 10, textAlign: 'center', color: 'white' }}>Half day (close)</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 0, marginVertical: 20 }}>
                <View style={styles.fulldayclose}>
                    <View style={{ flexDirection: 'row' }}>
                        <Checkbox status={Monday ? 'checked' : 'unchecked'}
                            onPress={clickMonday}
                            color={'green'} />
                        <Text style={{ marginTop: 8 }}>Monday</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Checkbox status={Tuesday ? 'checked' : 'unchecked'}
                            onPress={clickTuesday}
                            color={'green'} />
                        <Text style={{ marginTop: 8 }}>Tuesday</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Checkbox status={Wednesday ? 'checked' : 'unchecked'}
                            onPress={clickWednesday}
                            color={'green'} />
                        <Text style={{ marginTop: 8 }}>Wednesday</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Checkbox status={Thursday ? 'checked' : 'unchecked'}
                            onPress={clickThursday}
                            color={'green'} />
                        <Text style={{ marginTop: 8 }}>Thursday</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Checkbox status={Friday ? 'checked' : 'unchecked'}
                            onPress={clickFriday}
                            color={'green'} />
                        <Text style={{ marginTop: 8 }}>Friday</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Checkbox status={Saturday ? 'checked' : 'unchecked'}
                            onPress={clickSaturday}
                            color={'green'} />
                        <Text style={{ marginTop: 8 }}>Saturday</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Checkbox status={Sunday ? 'checked' : 'unchecked'}
                            onPress={clickSunday}
                            color={'green'} />
                        <Text style={{ marginTop: 8 }}>Sunday</Text>
                    </View>
                </View>
                <View style={{ borderRightWidth: 1, }}></View>

                {/* halfday start */}

                <View style={styles.halfdayclose}>
                    <View style={{ flexDirection: 'row' }}>
                        <Checkbox status={halfMonday ? 'checked' : 'unchecked'}
                            onPress={clickhalfdayMonday}
                            color={'green'} />
                        <Text style={{ marginTop: 8 }}>Monday</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Checkbox status={halfTuesday ? 'checked' : 'unchecked'}
                            onPress={clickhalfdayTuesday}
                            color={'green'} />
                        <Text style={{ marginTop: 8 }}>Tuesday</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Checkbox status={halfWednesday ? 'checked' : 'unchecked'}
                            onPress={clickhalfdayWednesday}
                            color={'green'} />
                        <Text style={{ marginTop: 8 }}>Wednesday</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Checkbox status={halfThursday ? 'checked' : 'unchecked'}
                            onPress={clickhalfdayThursday}
                            color={'green'} />
                        <Text style={{ marginTop: 8 }}>Thursday</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Checkbox status={halfFriday ? 'checked' : 'unchecked'}
                            onPress={clickhalfdayFriday}
                            color={'green'} />
                        <Text style={{ marginTop: 8 }}>Friday</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Checkbox status={halfSaturday ? 'checked' : 'unchecked'}
                            onPress={clickhalfdaySaturday}
                            color={'green'} />
                        <Text style={{ marginTop: 8 }}>Saturday</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Checkbox status={halfSunday ? 'checked' : 'unchecked'}
                            onPress={clickhalfdaySunday}
                            color={'green'} />
                        <Text style={{ marginTop: 8 }}>Sunday</Text>
                    </View>
                </View>
            </View>
            <View style={{ backgroundColor: '#351401', marginHorizontal: 10, marginTop: 10, borderRadius: 5 }}>
                <Text style={{ fontWeight: '400', fontSize: 17, marginTop: 0, padding: 10, textAlign: 'center', color: 'white' }}>Operationg Modes</Text>
            </View>
            <View style={{ marginHorizontal: 30, marginVertical: 5, flexDirection: 'row' }}>
                <Checkbox status={online ? 'checked' : 'unchecked'}
                    onPress={boxcheck}
                    color={'green'} />
                <Text style={{ marginTop: 8 }}>Online</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginVertical: 15 }}>
                <View style={{ marginHorizontal: 30, justifyContent: 'center', marginTop: 0, width: '30%' }}>
                    <Pressable onPress={() => navigation.navigate('AddressDetails')} style={{ backgroundColor: colors.colors.headColor, padding: 6, marginVertical: 5, borderRadius: 4, textAlign: 'center' }}  ><Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Previous </Text></Pressable>
                </View>
                <View style={{ marginHorizontal: 30, justifyContent: 'center', marginTop: 0, width: '30%' }}>
                    <Pressable onPress={submitform
                        // () => navigation.navigate('DocumentsDetails')
                    } style={{ backgroundColor: colors.colors.headColor, padding: 6, marginVertical: 5, borderRadius: 4, textAlign: 'center' }}  ><Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Next </Text></Pressable>
                </View>
            </View>
        </View>


    )
}

export default OperationDetails;
const styles = StyleSheet.create({
    fulldayclose: {
        // borderRightWidth:1,
        // borderWidth:1

    },
    halfdayclose: {
        // borderWidth:1
    }
})
