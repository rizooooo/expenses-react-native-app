import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { Color, Font } from '../../../../../core/constants'

import { format, formatDistance, formatRelative, subDays } from 'date-fns'

import Icon from 'react-native-vector-icons/FontAwesome5';
import CoreService from '../../../../../core/core-service';
import withObservables from '@nozbe/with-observables';
import { ModalMenu } from '..';
import { useNavigation } from '@react-navigation/native';

const TransactionItemComponent = ({ transaction }) => {


    const { container, titleText, timeLabel, paidLabel } = styles;
    const [modalVisible, setModalVisible] = useState(false);
    const { navigate } = useNavigation();


    return (
        <>
            <ModalMenu modalHandler={[modalVisible, setModalVisible]} />
            <Pressable onPress={() => navigate('UserAddTransaction', { transaction })} style={{ ...container, backgroundColor: transaction.paid ? Color.Green : Color.Red }} key={transaction.id}>
                <View>
                    <Text style={titleText}>
                        {transaction.paid && <Icon name={'check'} color={Color.White} />}
                        {''}{transaction.title}</Text>
                    {transaction.paid && <Text style={paidLabel}>PAID {formatDistance(transaction.date_paid, Date.now())}</Text>}
                    <Text style={timeLabel}>Created {formatDistance(transaction.createdAt, new Date())}</Text>
                    <Text style={timeLabel}>Updated {formatDistance(transaction.updatedAt, new Date())}</Text>
                </View>
                <Text style={{ ...titleText, ...{ textDecorationLine: `${transaction.paid ? 'line-through' : 'none'}` } }}>₱{(transaction.amount).toLocaleString()}</Text>
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: Color.Orange,
        marginVertical: 5,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleText: {
        fontFamily: Font.Bold,
        color: Color.White,
    },
    timeLabel: {
        marginTop: 5,
        fontFamily: Font.Regular,
        fontSize: 10,
        color: Color.Gray
    },
    paidLabel: {
        marginTop: 5,
        fontFamily: Font.Bold,
        fontSize: 10,
        color: Color.White,
    }
})

const enhance = withObservables(['comment'], ({ comment }) => ({
    comment // shortcut syntax for `comment: comment.observe()`
}))

export default TransactionItemComponent
