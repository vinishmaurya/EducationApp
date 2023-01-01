/**
 * Project level stylesheet for common styles
 */

import { colors } from '../Component/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    textBox: {
        borderWidth: 1,
        borderColor: 'gray',
        marginVertical: 10,
        borderRadius: 5,
        height: 40,
        paddingLeft: 8
    },
    inputParentView: {
        fontWeight: '400',
        fontSize: 20,
        marginTop: 10 
    },
    btnPressable: {
        backgroundColor: colors.colors.headColor,
        padding: 6,
        marginVertical: 5,
        borderRadius: 4,
        textAlign: 'center'
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18 
    },
    btnLinkText: {
        color: 'blue',
        textAlign: 'center',
        fontSize: 16
    },
    btnLinkTextPressable: {
        color: 'blue',
        textAlign: 'center',
        fontSize: 16
    }
});