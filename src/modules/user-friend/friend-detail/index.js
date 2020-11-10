import { Q } from '@nozbe/watermelondb';
import withObservables from '@nozbe/with-observables';
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, FlatList, Modal, Keyboard } from 'react-native';
import { database } from '../../../..';
import { Avatars, Color, Font } from '../../../core/constants';
import CoreService from '../../../core/core-service';
import { Tables } from '../../../core/table-list.core';
import { Button } from '../../../shared';
import Input from '../../../shared/input/input.component';
import { TransactionItem, TransactionList } from './components';

const FriendDetail = (props) => {

    const { navigation, friend, transactions } = props;

    const { setOptions, navigate } = useNavigation();
    const { container, avatarContainer, avatarImage, summaryContainer, summaryItem, formGroup, formLabel, amountText, modalHeader, labelText, modalContainer, transactionContainer, transactionHeaderText } = styles;

    const [search, setSearch] = useState('');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        setOptions({ headerTitle: friend.name })

        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, [setOptions, friend]);



    const ListItem = withObservables(['transaction'], ({ transaction }) => ({
        transaction: transaction.observe(),
    }))(TransactionItem)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button title='Add Transaction' onPress={() => navigate('UserAddTransaction', { friend })} />
            ),
        });
    }, [navigation]);

    const getAvatar = name => {
        return Avatars.find(a => a.name === name).avatar
    }

    const getTotal = () => {
        let sum = 0;
        transactions.forEach(e => {
            sum += +e.amount;
        });
        return sum.toLocaleString();
    }

    const getPaid = () => {
        let sum = 0;
        transactions.forEach(e => {
            if (e.paid) {
                sum += +e.amount;
            }
        });
        return sum.toLocaleString();
    }

    const getBalance = () => {
        let sum = 0;
        transactions.forEach(e => {
            if (!e.paid) {
                sum += +e.amount;
            }
        });
        return sum.toLocaleString();
    }

    return (
        <View style={container}>

            {!isKeyboardVisible && <>
                <View style={avatarContainer}>
                    <Image style={avatarImage} source={getAvatar(friend.avatar)} />
                </View>
                <View style={summaryContainer}>
                    <View style={summaryItem}>
                        <Text style={amountText}>₱ {getPaid()}</Text>
                        <Text style={labelText}>Paid</Text>
                    </View>
                    <View style={summaryItem}>
                        <Text style={amountText}>₱ {getTotal()}</Text>
                        <Text style={labelText}>Total</Text>
                    </View>
                    <View style={summaryItem}>
                        <Text style={amountText}>₱ {getBalance()}</Text>
                        <Text style={labelText}>Balance</Text>
                    </View>
                </View>
            </>
            }

            {/* <Text>{JSON.stringify(friend.transactions.)}</Text> */}
            <View style={transactionContainer}>
                <Text style={transactionHeaderText}>Transactions</Text>
                <Input onChangeText={e => setSearch(e)} style={{ marginVertical: 5 }} placeholder={'Search Transactions'} />
                <TransactionList search={search} friend={friend} />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    formLabel: {
        color: Color.White,
        fontFamily: Font.Bold,
        marginBottom: 5
    },
    formGroup: {
        marginVertical: 8
    },
    modalHeader: {
        fontFamily: Font.Bold,
        fontSize: 20,
        color: Color.White,
        marginVertical: 10
    },
    modalContainer: {
        padding: 20,
        display: 'flex',
        flex: 1,
        backgroundColor: Color.Secondary
    },
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: Color.Primary
    },
    avatarContainer: {
        display: 'flex',
        backgroundColor: Color.Secondary,
        alignItems: 'center',
        paddingVertical: 10
    },
    avatarImage: {
        width: 120,
        height: 120,
        borderRadius: 10
    },
    summaryContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Color.Secondary,
        paddingVertical: 10
    },
    summaryItem: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    amountText: {
        fontFamily: Font.Bold,
        color: Color.White,
        fontSize: 15
    },
    labelText: {
        fontFamily: Font.Bold,
        color: Color.White,
        fontSize: 12
    },
    transactionHeaderText: {
        fontFamily: Font.Bold,
        color: Color.White,
        fontSize: 16
    },
    transactionContainer: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 10
    }
})

const enhance = withObservables(['friend'], ({ route: { params: { friend } } }) => ({
    friend: friend.observe(),
    transactions: friend.transactions.observeWithColumns(['paid'])
}))

export default enhance(FriendDetail);
