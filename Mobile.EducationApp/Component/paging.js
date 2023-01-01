import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
function paging(props) {
    const [CurrentPage, setCurrentPage] = useState(props.CurrentPage);

    
    function onPreviousPage(c) {
        setCurrentPage(c);
        //Alert.alert(String(c))
        props.pressCurrentPage(c);
    }
    function onNextPage(c) {
        setCurrentPage(c);
        //Alert.alert(String(c))
        props.pressCurrentPage(c);
    }
    return (


        <View >
            {<View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <Text style={{ marginTop: 5 }}>Page {CurrentPage} of {props.TotalPage} ({props.TotalItems} Records)</Text>
                <View style={{ flexDirection: 'row', marginTop: 1 }}>
                    <Icon name={'chevron-left'} size={25} onPress={() => onPreviousPage((CurrentPage - 1) <= 0 ? 1 : (CurrentPage - 1))} />
                    <Text style={{ marginTop: 1 }}>{CurrentPage}</Text>
                    <Icon name={'chevron-right'} size={25} onPress={() => onNextPage((CurrentPage + 1) > props.TotalPage ? props.TotalPage : (CurrentPage + 1))} />
                </View>
            </View>}

            {/*
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <Text style={{ marginTop: 5 }}>Page 1 of 1 (4 Records)</Text>
                <View style={{ flexDirection: 'row', marginTop: 1 }}>
                    <Icon name={'chevron-left'} size={30} onPress={onPreviousPage} />
                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 3 }}>1</Text>
                    <Icon name={'chevron-right'} size={30} onPress={onNextPage} />
                </View>
            </View>
           */}
        </View>
    )

}
export default paging;