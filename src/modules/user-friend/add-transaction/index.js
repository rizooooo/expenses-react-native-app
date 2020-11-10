import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Color, Font } from '../../../core/constants';
import { Button } from '../../../shared';
import Input from '../../../shared/input/input.component';
import { useForm, Controller } from "react-hook-form";
import { useRoute } from '@react-navigation/native';
import CoreService from '../../../core/core-service';
import { Tables } from '../../../core/table-list.core';

const AddTransaction = () => {

    const { container, formGroup, formLabel } = styles;
    const { control, handleSubmit, errors } = useForm();
    const { params } = useRoute()

    const onSubmit = async (data) => {
        const request = {
            ...data,
            friend: params.friend,
            amount: +data.amount
        }
        const res = await CoreService.CREATE(Tables.TRANSACTION, request, { relation: 'friend' });
        console.log(res)
    }

    return (
        <View style={container}>
            <View style={formGroup}>
                <Text style={formLabel}>Title</Text>

                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <Input
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            placeholder={'Load, GcashHH, etc'}
                        />
                    )}
                    name="title"
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errors.title && <Text style={{ color: Color.Warning, fontFamily: Font.Bold, marginVertical: 5 }}>This is required.</Text>}
            </View>
            <View style={formGroup}>
                <Text style={formLabel}>Amount</Text>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <Input
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            placeholder={'20.00'}
                            number
                            style={{ textAlign: 'right' }}
                        />
                    )}
                    name="amount"
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errors.amount && <Text style={{ color: Color.Warning, fontFamily: Font.Bold, marginVertical: 5 }}>This is required.</Text>}
            </View>
            <Button color={Color.Green} title={'Create Transaction'} onPress={handleSubmit(onSubmit)} />
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
        marginVertical: 8,
        marginHorizontal: 5,
    },
    header: {
        fontFamily: Font.Bold,
        fontSize: 20,
        color: Color.White,
        marginVertical: 10
    },
    container: {
        paddingHorizontal: 10,
        display: 'flex',
        flex: 1,
        backgroundColor: Color.Secondary
    },
})

export default AddTransaction
