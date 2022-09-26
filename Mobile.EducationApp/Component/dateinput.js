import React, { useState, useRef, useEffect } from "react";
import { Text, View, TextInput } from 'react-native'
function Otpinput({ heading, isRequired, setFinalOTP }) {
    // const [mytext, setMytext] = useState("");



    const pin1Ref = useRef(null)
    const pin2Ref = useRef(null)
    const pin3Ref = useRef(null)
    const pin4Ref = useRef(null)

    const [pin1, setPin1] = useState("");
    const [pin2, setPin2] = useState("");
    const [pin3, setPin3] = useState("");
    const [pin4, setPin4] = useState("");

    return (<View style={{ margin: 1, flexDirection: "row" }}>
        <Text style={{ marginTop: 10 }}>{heading}</Text>
        <TextInput ref={pin1Ref} style={{ marginTop: 10, width: 50, borderWidth: 2, padding: 10, margin: 5, borderColor: "lightgray", borderRadius: 4, fontSize: 20 }}
            onChangeText={(value) => { setPin1(value); }}
            maxLength={2} keyboardType={"number-pad"} onChange={(pin1) => {

                // if (pin1 != "") {
                //     pin2Ref.current.focus();
                // }
            }}
        />
        <TextInput ref={pin2Ref} style={{ marginTop: 10, width: 50, borderWidth: 2, padding: 10, margin: 5, borderColor: "lightgray", borderRadius: 4, fontSize: 20 }}
            onChangeText={(value) => { setPin2(value); }}
            maxLength={2} keyboardType={"number-pad"}
            onChange={(pin2) => {
                //setPin2(pin2);
                // if (pin2 != "") {
                //     pin3Ref.current.focus();
                // }
            }}
        />
        <TextInput ref={pin3Ref} style={{ marginTop: 10, width: 80, borderWidth: 2, padding: 5, margin: 5, borderColor: "lightgray", borderRadius: 4, fontSize: 20 }}
            onChangeText={(value) => { setPin3(value); }}
            maxLength={4} keyboardType={"number-pad"} onChange={(pin3) => {
                //setPin3(pin3);
                // if (pin3 != "") {
                //     pin4Ref.current.focus();
                // }
            }}
        />
        {/* <TextInput ref={pin4Ref} style={{ marginTop: 10, width: 50, borderWidth: 2, padding: 10, margin: 5, borderColor: "lightgray", borderRadius: 4, fontSize: 20 }}
            onChangeText={(value) => { setPin4(value); }}
            maxLength={1} keyboardType={"number-pad"} onChange={(pin4) => {
                //setPin4(pin4);
            }}
        /> */}
        {isRequired == true ? <Text style={{ color: "red" }}>Required Field</Text> : <></>}
    </View>);
}
export default Otpinput;
