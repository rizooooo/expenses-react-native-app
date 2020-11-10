import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Color } from '../../../../core/constants';
import { Button } from '../../../../shared';

const Header = () => {
    const { navigate } = useNavigation();
    const { headerText, container } = styles;
    return (
        <View style={container}>
            <Text style={headerText}>
                My Friends
            </Text>
            <Button onPress={() => navigate('UserFriendAdd')} title={'Add a Friend'} />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        fontFamily: 'Lato-Black',
        fontSize: 15,
        color: Color.White
    }
})

export default Header;
