import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RoleMaster from '../../../Screens/Admin/Setup/RoleRights/RoleMaster';
import RoleRights from '../../../Screens/Admin/Setup/RoleRights/RoleRights';
import { colors } from '../../../Component/colors';
const Tab = createMaterialTopTabNavigator();

function NavAdminRole() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarInactiveTintColor:'#351401',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarItemStyle: { width: 186.5},
        tabBarStyle:{marginHorizontal:10,marginVertical:20},
        // tabBarStyle: { backgroundColor: colors.colors.buttonColor },
          tabBarActiveTintColor: colors.colors.buttonColor,
          tabBarInactiveTintColor:'black',
      }}>
      <Tab.Screen  options={{ tabBarLabel: 'Role Master' }} name="RoleMaster" component={RoleMaster}/>
      <Tab.Screen  options={{ tabBarLabel: 'Role Right' }} name="RoleRights" component={RoleRights} />
    </Tab.Navigator>
  );
}
export default NavAdminRole;