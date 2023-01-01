import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../Screens/Dashboard.js';
import Medium from '../Screens/Medium.js';
import Section from '../Screens/Section';
import ManageSubject from '../Screens/ManageSubject';
import StudentAdmission from '../Screens/StudentAdmission';
import ManageClass from '../Screens/ManageClass';
import DrawerContent from './DrawerContent';
import Teacher from '../Screens/Teacher'
import StudentresetPassword from '../Screens/StudentresetPassword'
import AssignClassSubject from '../Screens/AssignClassSubject'
import AssignClassTeacher from '../Screens/AssignClassTeacher'
import AssignSubjectTeacher from '../Screens/AssignSubjectTeacher'
import AssignNewStudentClass from '../Screens/AssignNewStudentClass'
import PromoteStudent from '../Screens/PromotedStudent'
import ManageCategory from '../Screens/ManageCategory'
import Parents from '../Screens/Parents'
import Role from '../Screens/Admin/Setup/RoleRights/RoleMain'
import Ionicons from 'react-native-vector-icons/Entypo'
import NavAdminRole from './Admin/Setup/navAdminRole'
import { colors } from '../Component/colors.js';
import { ScreenStackHeaderRightView } from 'react-native-screens';
import { Pressable, View, Text } from 'react-native'
const Drawer = createDrawerNavigator();

const DrawerNavigatior = ({ navigation }) => {
    return (
        <>
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} screenOptions={{ headerStyle: { backgroundColor: colors.colors.headColor }, headerTintColor: 'white', }}>
                <Drawer.Screen name="Role" component={Role} options={{
                    title: 'Role ', headerRight: () => {
                        return (
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginRight: 20 }}>
                                    {/* <Pressable> */}
                                    <View style={{ flexDirection: 'row', }}>
                                        <Ionicons name="bell" size={22} color={'#FFFFFF'} />
                                        {/* <Text style={{color:'#E64848',fontSize:20,fontWeight:'600',}}>2</Text> */}
                                    </View>
                                    {/* </Pressable> */}
                                </View>

                            </View>

                        )
                    },
                }} />
                <Drawer.Screen name="Dashboard" component={Dashboard} />
                <Drawer.Screen name="Medium" component={Medium} options={{ title: 'Manage Medium' }} />
                <Drawer.Screen name="Section" component={Section} options={{ title: 'Manage Section' }} />
                <Drawer.Screen name="ManageSubject" component={ManageSubject} options={{ title: 'Manage Subject' }} />
                <Drawer.Screen name="ManageClass" component={ManageClass} options={{ title: 'Manage Class' }} />
                <Drawer.Screen name="StudentAdmission" component={StudentAdmission} options={{ title: 'Student Admission' }} />
                <Drawer.Screen name="Teacher" component={Teacher} options={{ title: 'Teachers' }} />
                <Drawer.Screen name="StudentresetPassword" component={StudentresetPassword} options={{ title: 'Student Password' }} />
                <Drawer.Screen name="AssignClassSubject" component={AssignClassSubject} options={{ title: 'Assign Class Subject' }} />
                <Drawer.Screen name="AssignClassTeacher" component={AssignClassTeacher} options={{ title: 'Assign Class Teacher' }} />
                <Drawer.Screen name="AssignSubjectTeacher" component={AssignSubjectTeacher} options={{ title: 'Manage Subject Teacher' }} />
                <Drawer.Screen name="AssignNewStudentClass" component={AssignNewStudentClass} options={{ title: 'Assign New Student Class' }} />
                <Drawer.Screen name="PromoteStudent" component={PromoteStudent} options={{ title: 'Promote Student' }} />
                <Drawer.Screen name="ManageCategory" component={ManageCategory} options={{ title: 'Manage Category' }} />
                <Drawer.Screen name="Parents" component={Parents} options={{ title: 'List Parents' }} />

                <Drawer.Screen name="NavAdminRole" component={NavAdminRole} options={{ title: 'Add/Edit Role & Rights', }} />
            </Drawer.Navigator>
        </>
    );
}
export default DrawerNavigatior;