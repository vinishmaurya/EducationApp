import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RoleMaster from '../../../Screens/Admin/Setup/RoleRights/RoleMaster';
import RoleRights from '../../../Screens/Admin/Setup/RoleRights/RoleRights';
import { colors } from '../../../Component/colors';
const Tab = createMaterialTopTabNavigator();
import config from '../../../config';

function NavAdminRole({ route }) {
    config.CurrentEditId = route.params ? route.params.edit_id : 0;
    //console.log(config.CurrentEditId);
    //console.log(route.params?.edit_id);
  return (
    <Tab.Navigator screenOptions={{
      tabBarInactiveTintColor:'#351401',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarItemStyle: { width: 186.5},
        tabBarStyle:{marginHorizontal:10,marginVertical:20},
        // tabBarStyle: { backgroundColor: colors.colors.buttonColor },
          tabBarActiveTintColor: colors.colors.buttonColor,
          tabBarInactiveTintColor:'black',
      }}
          
      >
          <Tab.Screen options={{ tabBarLabel: 'Role Master' }} name="RoleMaster" component={RoleMaster} initialParams={{ edit: 0 }} />
      <Tab.Screen  options={{ tabBarLabel: 'Role Right' }} name="RoleRights" component={RoleRights} />

    </Tab.Navigator>
  );
}
export default NavAdminRole;