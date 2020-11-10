import { Q } from '@nozbe/watermelondb';
import withObservables from '@nozbe/with-observables'
import React from 'react'
import { FlatList, Text } from 'react-native';
import { ListItem } from '.';
import { database } from '../../../../../';
import { Tables } from '../../../../core/table-list.core';
const List = ({ friends }) => {

    const FriendItem = withObservables(['friend'], ({ friend }) => ({
        friend: friend.observe(),
        transactions: friend.transactions.observeWithColumns(['paid'])
    }))(ListItem)


    return (
        <FlatList
            keyExtractor={(item, index) => item.name}
            data={friends}
            renderItem={(data) => <FriendItem friend={data.item} />}
            showsVerticalScrollIndicator={false}
        />
    )
}

const enhance = withObservables(['search'], ({ search }) => ({
    friends: database.collections
        .get(Tables.FRIEND)
        .query(Q.where('name', Q.like(`%${Q.sanitizeLikeString(search)}%`))),
}))

export default enhance(List)
