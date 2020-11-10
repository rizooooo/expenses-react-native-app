import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Color, Font } from '../../../core/constants'
import { Button } from '../../../shared';
import Input from '../../../shared/input/input.component';
import { AvatarPicker } from './components';
import { useForm, Controller } from "react-hook-form";
import CoreService from '../../../core/core-service';
import { Tables } from '../../../core/table-list.core';
import { useNavigation } from '@react-navigation/native';

const AddFriend = () => {
    const { container, label } = styles;
    const [avatar, setAvatar] = useState(null);
    const { navigate } = useNavigation()
    const { control, handleSubmit, errors } = useForm();

    const onSubmit = async (data) => {
        if (!avatar) {
            Alert.alert('Required', 'Avatar is Required, please select one');
            return
        }

        const res = await CoreService.CREATE(Tables.FRIEND, {...data, avatar: avatar.name});
        console.log('NAVIGATE!!!')
        navigate('UserFriendList')
    }

    return (
        <View style={container}>
            <AvatarPicker avatarHandler={[avatar, setAvatar]} />
            <View>
                <Text style={label}>Name: </Text>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <Input
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            placeholder={'e.g. Joy Rizo'}
                        />
                    )}
                    name="name"
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errors.name && <Text style={{ color: Color.Warning, fontFamily: Font.Bold, marginVertical: 5 }}>This is required.</Text>}

                <Button color={Color.Green} onPress={handleSubmit(onSubmit)} title={'Add!'} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: Color.Secondary,
        flex: 1,
        padding: 10
    },
    label: {
        color: Color.White,
        fontFamily: Font.Bold,
        marginVertical: 5
    }
})

export default AddFriend;
