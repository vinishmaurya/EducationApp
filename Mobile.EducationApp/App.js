import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './Navigation/StackNavigation'
// import DrawerNavigatior from './Navigation/DrawerNavigatior'
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <StackNavigation/>
      {/* <DrawerNavigatior/> */}
    </NavigationContainer>
  )
}
//Commit By Ashwani
//New Test
export default App;