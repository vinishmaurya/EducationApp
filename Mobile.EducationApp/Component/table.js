import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text, TouchableOpacity } from 'react-native';
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';
function table(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const element = (data, index) => (
    <>
      <View style={{ marginVertical: 10, alignSelf: "center" }}>
        <TouchableOpacity onPress={() => clickeditFormData(data)} >
          <View style={styles.btn}>
            <Text style={styles.btnText}>Edit</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clickDeleteData(data)}>
          <View style={styles.deletebtn}>
            <Text style={styles.btnText}>Delete</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>

  );
  function clickDeleteData(val) {
    // window.alert(`ID : ${val}`);
    props.deleteFormData(val);
  }

  function clickeditFormData(val) {
    // window.alert(`ID : ${val}`);
    props.editFormData(val);
  }

  function chrckcell(rowData) {
    props.chrckcell(rowData);
    // console.log(rowData)
    // window.alert('lajksgdjhgsad');
  }

  return (
    <View style={styles.container}>

      <Pressable onPress={() => setModalVisible(false)}>
      <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>

        <Row data={props.tableHead} style={styles.head} textStyle={styles.headtext} />
        {
          props.tableData.map((rowData, index) => (

            <TableWrapper key={index} style={styles.row}>
              {
                rowData.map((cellData, cellIndex) => (
                    <Cell onPress={() => chrckcell(rowData)} key={cellIndex} data={cellIndex + 1 === rowData.length ? element(cellData, index) : cellData} textStyle={styles.text} />
                ))
              }
            </TableWrapper>
          ))
        }
      </Table>
      </Pressable>
    </View>
  )

}
export default table;
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30 },
  head: { height: 50, backgroundColor: '#351401' },
  headtext: { margin: 6, color: 'white', textAlign: 'center' },
  text: { margin: 6, color: 'black', textAlign: 'center' },
  datatext: { margin: 6, color: 'black' },
  row: { flexDirection: 'row', backgroundColor: '#FFFFFF' },
  btn: { marginVertical: 2, width: 40, height: 'auto', backgroundColor: 'green', padding: 5, borderRadius: 2 },
  deletebtn: { marginVertical: 2, width: 40, height: 'auto', backgroundColor: '#FF4500', padding: 5, borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff', fontSize: 10 }
});