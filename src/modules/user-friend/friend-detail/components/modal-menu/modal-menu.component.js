import React from 'react'
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Color, Font } from '../../../../../core/constants';
import { Button } from '../../../../../shared';

import Icon from 'react-native-vector-icons/FontAwesome5';
const ModalMenu = ({ modalHandler }) => {
    const [modalVisible, setModalVisible] = modalHandler;
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}><Icon name='user' /> Edit Transaction</Text>
                        <Text style={styles.modalText}><Icon name='trash'/> Delete Transaction</Text>

                        <Button onPress={() => setModalVisible(!modalVisible)} title={'Cancel'} color={Color.Red} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: '80%',
        margin: 0,
        backgroundColor: Color.White,
        borderRadius: 20,
        paddingVertical: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        // marginBottom: 15,
        // textAlign: "center",
        fontFamily: Font.Bold,
        borderColor: Color.Gray,
        //borderRadius: 5,
        borderLeftWidth: 0,
        borderRightWidth: 0, 
        borderWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        width: '100%',
        color: Color.Primary
    }
});

export default ModalMenu
