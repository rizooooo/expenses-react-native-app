import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { Color, Font } from '../../core/constants';

const Button = ({ title, onPress, color = null }) => {
    const { container, buttonText,  } = styles;
    return (
        <Pressable onPress={onPress} style={{...container, backgroundColor: color ? color : Color.Orange}}>
            <Text style={buttonText}>{title}</Text>
        </Pressable>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 5,
        marginVertical: 5
    },
    buttonText: {
        fontFamily: Font.Bold,
        fontSize: 15,
        textAlign: 'center',
        color: Color.White
    }
})

export default Button
