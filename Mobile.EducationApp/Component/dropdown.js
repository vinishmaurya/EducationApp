import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../Component/colors';
const DropdownComponent = (props) => {
    const [isFocus, setIsFocus] = useState(false);

    return (

        <Dropdown

            style={styles.dropdown, isFocus && { borderColor: 'blue' }}
            placeholderStyle={styles.placeholderStyle, isFocus && { color: 'blue' }}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={props.bindData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select"
            value={props.my_value}
            onChange={props.my_onChangeText}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            searchPlaceholder="Search..."
            renderLeftIcon={() => (
                <AntDesign
                    style={styles.icon}
                    color={isFocus ? 'blue' : 'black'}
                    name="Safety"
                    size={16} />
            )}
            
        />
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    
    dropdown: {
        marginTop: -5,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginBottom:100
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16
    },
});