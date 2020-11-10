import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { Color, Font } from '../../core/constants';

const Input = ({ placeholder = 'Placeholder', style = null, onChangeText = null, onBlur = null, value, number }) => {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            style={{ ...styles.input, ...style }}
            placeholder={placeholder}
            keyboardType={number ? 'number-pad' : 'default'}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        alignSelf: 'stretch',
        borderWidth: 2,
        borderColor: Color.Gray,
        backgroundColor: Color.Gray,
        fontFamily: Font.Regular,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
});

export default Input
