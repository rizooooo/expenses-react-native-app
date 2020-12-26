import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Switch } from 'react-native'
import { Color, Font } from '../../../core/constants';
import { Button } from '../../../shared';
import Input from '../../../shared/input/input.component';
import { useForm, Controller } from "react-hook-form";
import { useRoute, useNavigation } from '@react-navigation/native';
import CoreService from '../../../core/core-service';
import { Tables } from '../../../core/table-list.core';

const AddTransaction = () => {

    const { container, formGroup, formLabel } = styles;

    const { params } = useRoute();
    const { goBack, setOptions } = useNavigation();

    const RECORD = params && params.transaction || null;


    const { control, handleSubmit, errors } = useForm({ defaultValues: RECORD ? { title: RECORD.title, amount: RECORD.amount.toString(), paid: RECORD.paid } : {} });


    useEffect(() => {
        if (RECORD) {
            setOptions({ headerTitle: RECORD.title })
        }
    }, [RECORD]);

    const onSubmit = async (data) => {
        console.log(data, '@DATA');
        let request = {
            ...data,
            friend: params.friend,
            amount: +data.amount
        }

        if (params && !params.transaction) {
            if (request.paid) {
                request = { ...request, date_paid: Date.now() }
            }
            await CoreService.CREATE(Tables.TRANSACTION, request, { relation: 'friend' });
        } else {
            if (data.paid) {
                data = { ...data, amount: +data.amount, date_paid: Date.now() }
            } else {
                data = { ...data, amount: +data.amount }
            }
            await CoreService.UPDATE(params.transaction, data)
        }

        goBack();
    }

    return (
        <View style={container}>
            <View style={formGroup}>
                <Text style={formLabel}>Description</Text>

                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <Input
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            placeholder={'Load, Shopee, etc'}
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
                    rules={{
                        required: true,
                        pattern: {
                            value: /^[0-9]+(\.[0-9]{1,2})?$/,
                            message: 'Invalid Amount'
                        }
                    }}
                    defaultValue={''}
                />
                {errors.amount && errors.amount.type && errors.amount.type === 'pattern' && <Text style={{ color: Color.Warning, fontFamily: Font.Bold, marginVertical: 5 }}>{errors && errors.amount.message}</Text>}
                {errors.amount && errors.amount.type && errors.amount.type === 'required' && <Text style={{ color: Color.Warning, fontFamily: Font.Bold, marginVertical: 5 }}>This is required.</Text>}
            </View>

            <View style={formGroup}>

                <Controller
                    control={control}
                    render={({ onChange, value }) => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 }}>
                            <Text style={formLabel}>Already Paid</Text>
                            <Switch
                                trackColor={{ false: Color.Gray, true: Color.Green }}
                                thumbColor={value ? Color.White : Color.White}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={onChange}
                                value={value}
                            />
                        </View>

                    )}
                    name="paid"
                    defaultValue={false}
                />
            </View>
            <Button color={RECORD ? Color.Orange : Color.Green} title={`${RECORD ? 'Update' : 'Create'} Transaction`} onPress={handleSubmit(onSubmit)} />
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
