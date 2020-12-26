import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { UserFriendModule } from './src/modules';
import { Color, Font } from './src/core/constants';
import { TransitionPresets } from '@react-navigation/stack';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.Primary }}>
      <Text style={{
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        color: Color.White
      }}>Friends</Text>
      <Icon name="rocket" size={30} color={Color.White} />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();


const App = () => {


  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Color.Secondary} />
      <Tab.Navigator tabBarOptions={{
        style: {
          backgroundColor: Color.Primary
        },
        activeTintColor: Color.Blue,
        labelStyle: {
          fontFamily: Font.Regular
        },
      }}
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Tab.Screen options={{ tabBarIcon: () => <Icon name="user-friends" size={20} color={Color.Blue} /> }} name="Persons" component={UserFriendModule} />
        {/* <Tab.Screen options={{ tabBarIcon: () => <Icon name="user-circle" size={25} color={Color.Blue} /> }} name="Settings" component={SettingsScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default App;
