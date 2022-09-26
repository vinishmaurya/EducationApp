import * as React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Checkbox } from 'react-native-paper';
const MyComponent = ({ title}) => {
   const [checked, setChecked] = React.useState(false);
   function boxcheck({}) {
      setChecked(!checked)
     let data =(checked?false:true);
     console.log(data)
     event => handleClick(100)
     
   }

   // value
   return (
      <SafeAreaView style={styles.container}>
         <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={boxcheck}
            color={'green'}
         />

         <Text style={{marginTop:8}}>{title}</Text>
      </SafeAreaView>
   );
};
const styles = StyleSheet.create({
   container: {
      // flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
      flexDirection: 'row'
   },
});
export default MyComponent;