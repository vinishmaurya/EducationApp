import { View, Text, Modal, StyleSheet, Pressable, ScrollView, Alert } from 'react-native'
import Table from '../Component/table'
import React, { useState, useEffect } from 'react';
import BaseURL from '../config';
import axios from "axios";
// import Date from './Date'
const AdminPanal = ({ route, navigation }) => {
    //By Vinish
    // const { UserId } = route.params;
    // const { password } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [PopupData, setPopupData] = useState("");

    const [tableData, setTableData] = useState({
        tableHead: [],
        tableData: []

    });
    // const sendDataToParent = (message: string) => {
    //   getMessageFromChild(message);
    // };

    // tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
    // tableData: [
    //   ['1', '2', '3', '4'],
    //   ['a', 'b', 'c', 'd'],
    //   ['1', '2', '3', '4'],
    //   ['a', 'b', 'c', 'd']
    // ]

    // delete by id
    let editReload = route.params ? route.params.editReload : null;
    if (editReload) {
        loadPageData();
    }


    useEffect(() => {
        loadPageData();
    }, []);
    function loadPageData() {
        try {
            axios.get(`${BaseURL.BASE_URL}/getAll-form1Data`, {
            })
                .then(res => {
                    // debugger;
                    setTableData(res.data);
                    console.log(res.data);
                    // console.log(route.params);

                })
                .catch(e => {
                    console.log(`getAll-form1Data error ${e}`);
                });
        }
        catch (e) {
            console.log(`getAll-form1Data error ${e}`);
        }
    }
    function editFormData(val) {
        Alert.alert(
            "Edit !",
            "do you want to edit ",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log(""),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => navigation.navigate('EducationRegistration',
                        {
                            edit_id: val
                        }
                    )
                }
            ]
        );
        //  window.alert(edit_id:);
    }

    function chrckcell(rowData) {
        setModalVisible(true);
        setPopupData(rowData)
        console.log(rowData)
    };

    function deleteFormData(val) {
        // console.log(val);
        Alert.alert(
            "Delete !",
            "Do you want to delete!",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log(""),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => axios.delete(`${BaseURL.baseURL}/delete-Form1Data/` + val, {
                    })
                        .then(res => {
                            // debugger;
                            Alert.alert(
                                val,
                                "Delete Done",
                                [
                                    { text: "OK", onPress: () => console.log("Data Delete") }
                                ]
                            );


                        })
                        .catch(e => {
                            console.log(`delete error ${e}`);
                        })
                }
            ]
        );
        // try {

        // }
        // catch (e) {
        //   console.log(`getAll-form1Data error ${e}`);
        // }
    }
    // function clickPopupOpen(){
    //   window.alert("Click Popup Open")
    // };
    // function clickPopupClose(){
    //   window.alert("click Popup Close")
    // };
    // function windowlog(){
    //   console.log(tableData.tableHead[0])

    // }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <View>
                    <Text style={{ fontWeight: '600', fontSize: 20, marginTop: 30, marginHorizontal: 20 }} >Admin Panal</Text>
                </View>
                <View>
                    {/* <Text style={{ fontWeight: '400', fontSize: 18, marginTop: 30, marginHorizontal: 20 }}>{UserId}</Text> */}
                </View>
            </View>
            <Table
                deleteFormData={deleteFormData}
                chrckcell={chrckcell}
                editFormData={editFormData}
                tableHead={tableData.tableHead} tableData={tableData.tableData} />

            <View style={{ flex: 1 }}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                        <Pressable onPress={() => setModalVisible(!modalVisible)} >
                            <View style={styles.centeredView}>
                                <View style={styles.popup}>
                                    <View style={{ backgroundColor: '#351401', marginBottom: 'auto', width: '100%', height: 50, borderTopRightRadius: 18, borderTopLeftRadius: 18 }}>
                                        <Text style={{ color: 'white', marginVertical: 15, marginLeft: 20, fontSize: 18 }}>View Details</Text>
                                    </View>
                                    <View style={{ marginBottom: 'auto' }}>
                                        <Text style={styles.heading}>{tableData.tableHead[0]}</Text>
                                        <Text style={styles.paragraph}>{PopupData[0]}</Text>
                                        <Text style={styles.heading}>{tableData.tableHead[1]}</Text>
                                        <Text style={styles.paragraph}>{PopupData[1]}</Text>
                                        <Text style={styles.heading}>{tableData.tableHead[2]}</Text>
                                        <Text style={styles.paragraph}>{PopupData[2]}</Text>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    </View>
                </Modal>
            </View>
            {/* <Date /> */}

        </ScrollView >
    )
}

export default AdminPanal;
const styles = StyleSheet.create({
    centeredView: {
        justifyContent: "center",
        alignItems: 'center',
        height: '100%',
    },
    popup: {
        height: '40%', width: '80%', backgroundColor: '#ffffff',
        borderRadius: 20, borderWidth: 1,
    },
    heading: {
        fontWeight: '600', color: '#000', marginVertical: 5, marginLeft: 20, fontSize: 18, textAlign: 'center'
    },
    paragraph: {
        fontWeight: '400', color: '#000', marginVertical: 5, marginLeft: 20, fontSize: 16, textAlign: 'center'
    }


});