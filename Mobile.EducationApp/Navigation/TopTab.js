import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RoleMaster from '../Screens/RoleMaster';
import RoleRights from '../Screens/RoleRights';
import { colors } from '../Component/colors';
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarInactiveTintColor:'#351401',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarItemStyle: { width: 186.5,backgroundColor:'white' },
        tabBarStyle:{marginHorizontal:10,marginVertical:20},
        // tabBarStyle: { backgroundColor: colors.colors.buttonColor },
        
      }}>
      <Tab.Screen  options={{ tabBarLabel: 'Role Master' }} name="RoleMaster" component={RoleMaster}/>
      <Tab.Screen  options={{ tabBarLabel: 'Role Right' }} name="RoleRights" component={RoleRights} />
    </Tab.Navigator>
  );
}
export default MyTabs;