import React from 'react'
// import { NavigationContainer } from '@react-navigation/native';
import EducationRegistration from '../Screens/EducationCategory';
import Login from '../Screens/Login';
import AdminPanal from '../Screens/AdminPanal';
import PersonalInformation from '../Screens/PersonalInformation';
import AddressDetails from '../Screens/AddressDetails';
import OperationDetails from '../Screens/OperationDetails';
import DocumentsDetails from '../Screens/DocumentsDetails';
import PackageSelection from '../Screens/PackageSelection';
import BackendApproval from '../Screens/BackendApproval';
import credential from '../Screens/credential';
import Drawer from '../Navigation/DrawerNavigatior';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Title } from 'react-native-paper';

const Stack = createNativeStackNavigator();
const StackNavigation = () => {
    return (
        // <NavigationContainer>
        <>
            <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#351401' }, headerTintColor: 'white', }}>
                {/*<Stack.Screen name='Login' component={Login} options={{ title: 'Login' }} />*/}
                {/*<Stack.Screen name='EducationRegistration' component={EducationRegistration} options={{ title: 'Education Registration' }} />*/}

                {/*Testing Start...*/}
                {/*<Stack.Screen name='AdminPanal' component={AdminPanal} options={{ title: 'Admin Panal' }} />*/}
                {/*<Stack.Screen name='PersonalInformation' component={PersonalInformation} options={{ title: 'Personal Information' }} />*/}
                {/*<Stack.Screen name='AddressDetails' component={AddressDetails} options={{ title: 'Address Details' }} />*/}
                {/*<Stack.Screen name='OperationDetails' component={OperationDetails} options={{ title: 'Operation Details' }} />*/}
                {/*<Stack.Screen name='DocumentsDetails' component={DocumentsDetails} options={{ title: 'Documents Details' }} />*/}
                {/*<Stack.Screen name='PackageSelection' component={PackageSelection} options={{ title: 'Package Selection' }} />*/}
                {/*<Stack.Screen name='credential' component={credential} options={{ title: 'Credential' }} />*/}
                {/*<Stack.Screen name='BackendApproval' component={BackendApproval} options={{ title: 'Backend Approval Status' }} />*/}
                {/*Testing End...*/}
                <Stack.Screen name='Drawer' component={Drawer} options={{ headerShown: false }} />
            </Stack.Navigator>
        </>
        // </NavigationContainer>
    )
}

export default StackNavigation;