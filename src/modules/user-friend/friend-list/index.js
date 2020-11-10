import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { Color } from '../../../core/constants';
import { Button } from '../../../shared';
import Input from '../../../shared/input/input.component';
import { List, ListItem } from './components';
import { FriendsMock } from './constants';
import { database } from './../../../../'
import { Tables } from '../../../core/table-list.core';
import withObservables from '@nozbe/with-observables';
import { Q } from '@nozbe/watermelondb';

const FriendList = ({ navigation, friends }) => {
    console.log(friends, '@friends')
    const { container, inputStyle } = styles;
    const { navigate } = useNavigation();

    const [search, setSearch] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button title='Add Friend' onPress={() => navigate('UserFriendAdd')} />
            ),
        });
    }, [navigation]);

    return (
        <View style={container}>
            <Input onChangeText={e => setSearch(e)} style={{ marginVertical: 5 }} placeholder={'Search a friend'} />
            <List search={search} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.Secondary,
        display: 'flex',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    inputStyle: {
        marginHorizontal: 5
    }
})

const enhance = withObservables([], () => ({
    friends: database.collections.get(Tables.FRIEND).query(Q.where('name', Q.like(`%${Q.sanitizeLikeString('mik')}%`))).observe()
}))
export default enhance(FriendList);
