import React, { useState,useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DropdownComponent = (props) => {
  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={props.bindDataAwardCategory}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Export"
      value={props.my_value}
      onChange={props.my_onChangeText}
      renderRightIcon={() => (
        <AntDesign style={styles.icon} color="#FFFFFF" name="down" size={16} />
      )}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#351401', padding: 1, borderWidth: 1, borderRadius: 4
  },
  icon: {
    marginRight: 20,
  },
  placeholderStyle: {
    fontSize: 15,
    color:'#FFFFFF',marginLeft:6
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 10,
    fontSize: 16,
  },
});