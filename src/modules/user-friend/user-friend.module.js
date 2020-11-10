import React from 'react'
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import FriendList from './friend-list';
import AddFriend from './add-friend';
import FriendDetail from './friend-detail';

import { FriendListOptions } from './friend-list/constants';
import { AddFriendOptions } from './add-friend/constants';
import { FriendDetailOptions } from './friend-detail/constants';
import AddTransaction from './add-transaction';
import { Color, Font } from '../../core/constants';
import { TransitionPresets } from '@react-navigation/stack';


const Stack = createStackNavigator();



const UserFriendModule = () => {
    return (
        <Stack.Navigator screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
        }}>
            <Stack.Screen
                name="UserFriendList"
                component={FriendList}
                options={FriendListOptions}
            />
            <Stack.Screen
                name="UserFriendAdd"
                component={AddFriend}
                options={AddFriendOptions}
            />
            <Stack.Screen
                name="UserFriendDetail"
                component={FriendDetail}
                options={FriendDetailOptions}
            />
            <Stack.Screen
                name="UserAddTransaction"
                component={AddTransaction}
                options={{
                    headerTitle: 'Add Transaction',
                    headerStyle: {
                        height: 55,
                        backgroundColor: Color.Primary,
                    },
                    headerTitleStyle: {
                        fontFamily: Font.Bold,
                    },
                    headerTintColor: Color.White
                }}
            />
        </Stack.Navigator>
    )
}

export default UserFriendModule;
