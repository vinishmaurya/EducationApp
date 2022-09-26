import * as React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Checkbox } from 'react-native-paper';
const MyComponent = ({ title, props }) => {
    const [checked, setChecked] = React.useState(true);
    // const [value ,setValue]=React.useState('');
    function boxcheck() {
        setChecked(!checked)
        let data = (checked ? false : true);
        console.log(data)

    }
    return (
        <SafeAreaView style={styles.container}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={boxcheck}
                    color={'#ffffff'}
                    uncheckedColor={'white'}
                />
            <Text style={{ marginTop: 8 }}>{title}</Text>
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