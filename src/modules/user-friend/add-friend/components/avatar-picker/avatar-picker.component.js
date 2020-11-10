import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native'
import { Color, Font } from '../../../../../core/constants'
import Input from '../../../../../shared/input/input.component';

import avatars from './constants/avatar.mock';

const AvatarPickerComponent = ({ avatarHandler }) => {
    const { textLabel, columnStyle, flatListStyle } = styles;

    const [avatar, setAvatar] = avatarHandler;

    const AvatarItem = ({ item }) => {
        return (
            <Pressable onPress={() => setAvatar(item)}>
                <Image style={{ width: 70, height: 70, borderRadius: 5, marginRight: 10, ...{ borderColor: avatar && item.name ===  avatar.name ? Color.Orange : undefined, borderWidth: avatar &&  item.name ===  avatar.name ? 5 : 0 } }} source={item.avatar} />
            </Pressable>
        )
    }

    return (
        <View>
            <Text style={textLabel}>
                Select a Avatar Image
            </Text>
            <FlatList
                data={avatars}
                horizontal={true}
                keyExtractor={(data, index) => data.name}
                contentContainerStyle={flatListStyle}
                showsHorizontalScrollIndicator={false}
                renderItem={(data) => <AvatarItem item={data.item} />}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    textLabel: {
        fontFamily: Font.Regular,
        color: Color.White
    },
    flatListStyle: {
        marginVertical: 5
    },
})

export default AvatarPickerComponent
