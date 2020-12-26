import { Q } from '@nozbe/watermelondb'
import withObservables from '@nozbe/with-observables'
import React from 'react'
import { FlatList } from 'react-native'
import { TransactionItem } from '..'
import { database } from '../../../../../..'
import { Tables } from '../../../../../core/table-list.core'

const TransactionList = ({ transactions, search }) => {
    const ListItem = withObservables(['transaction'], ({ transaction }) => ({
        transaction: transaction.observe(),
    }))(TransactionItem)

    return (
        <FlatList
            data={transactions.reverse()}
            keyExtractor={(item, index) => item.id}
            renderItem={data => <ListItem transaction={data.item} />}
        />
    )
}

const enhance = withObservables(['search'], ({ search, friend }) => ({
    // friend: friend.observe(),
    // transactions: friend.transactions.observeWithColumns(['paid'])
    transactions: database.collections.get(Tables.TRANSACTION)
        .query(
            Q.where('friend_id', friend.id),
            Q.where('title', Q.like(`%${Q.sanitizeLikeString(search)}%`))
        ).observeWithColumns(['paid'])
}))

export default enhance(TransactionList)
