import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Avatars, Color, Font } from '../../../../core/constants';
import CoreService from '../../../../core/core-service';
import { Tables } from '../../../../core/table-list.core';

const ListItem = ({ friend, transactions }) => {
    const { container, avatarContainer, detailsContainer, detailText, totalText, total: totalStyle } = styles;
    const { navigate } = useNavigation();

    const getAvatar = name => {
        return Avatars.find(a => a.name === name).avatar
    }

    const getTotal = () => {
        let sum = 0;
        //console.log(transactions);
        // const d = await CoreService.FINDONE(Tables.TRANSACTION, friend.id);
        // let sum = 0;
        transactions.forEach(e => {
            if (!e.paid) {
                sum += +e.amount;
            }
        });
        return sum.toLocaleString();
    }
    return (
        <Pressable onPress={() => navigate('UserFriendDetail', { friend })} style={container} key={friend.id}>
            <View style={avatarContainer}>
                <Image source={getAvatar(friend.avatar)} style={{ height: 50, width: 50, borderRadius: 100 }} />
            </View>
            <View style={detailsContainer}>
                <View>
                    <Text style={detailText}>{friend.name}</Text>
                </View>
                <View>
                    <Text style={totalStyle}>₱{getTotal()}</Text>
                    <Text style={totalText}>TOTAL</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 5,
        backgroundColor: Color.White,
        padding: 5,
        borderRadius: 5
    },
    avatarContainer: {
        display: 'flex',
    },
    detailsContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    detailText: {
        marginLeft: 5,
        color: Color.Primary,
        fontFamily: Font.Bold
    },
    totalText: {
        fontSize: 10,
        fontFamily: Font.Regular,
        textAlign: 'right',
        color: Color.Primary
    },
    total: {
        fontSize: 12,
        fontFamily: Font.Bold,
        color: Color.Secondary
    }
})

export default ListItem
