import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, passwordUpdate } from '../actions/UserAction'
import { useEffect } from 'react'
import { ALERT_TYPE, Dialog } from "react-native-alert-notification"
import { PASSWORD_UPDATE_RESET } from '../constants/UserConstants'

const UpdatePassword = ({ navigation }) => {
    const dispatch = useDispatch();
    const { isUpdated, error, loading } = useSelector((state) => state.updatepassword)
    const [oldpassword, setOldPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");

    const handlePasswordUpadte = () => {
        dispatch(passwordUpdate(oldpassword, newpassword))
        console.log(oldpassword, newpassword)
    }

    const [isVisible, setIsVisible] = useState(true)
    const [isNewVisible, setIsNewVisible] = useState(true)

    const handleVisible = () => {
        setIsVisible(!isVisible)
    }

    const handlenewVisible = () => {
        setIsNewVisible(!isNewVisible)
    }

    useEffect(() => {
        if (error) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: error,
                button: 'close'
            })
            dispatch(clearErrors())
        }
        if (isUpdated) {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: "Password Updated Successfully",
                button: 'close'
            })
            dispatch({
                type: PASSWORD_UPDATE_RESET
            })
            navigation.navigate('Profile')
        }
    }, [dispatch, error, isUpdated])


    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ marginHorizontal: 20, marginVertical: 15 }}>
                <TextInput theme={{
                    roundness: 5,
                    colors: {
                        primary: "#BABABA",
                    },
                    fonts: {
                        regular: {
                            fontFamily: 'Montserrat_400Regular'
                        }
                    }
                }}
                    outlineColor='#BABABA'
                    style={styles.Input}
                    autoCapitalize='none'
                    mode="outlined"
                    value={oldpassword}
                    onChangeText={text => setOldPassword(text)}
                    label="Old Password"
                    secureTextEntry={isVisible}
                    right={<TextInput.Icon onPress={() => handleVisible()} name="eye" />}
                />
                <TextInput theme={{
                    roundness: 5,
                    colors: {
                        primary: "#BABABA",
                    },
                    fonts: {
                        regular: {
                            fontFamily: 'Montserrat_400Regular'
                        }
                    }
                }}
                    outlineColor='#BABABA'
                    style={styles.Input}
                    autoCapitalize='none'
                    mode="outlined"
                    value={newpassword}
                    secureTextEntry={isNewVisible}
                    right={<TextInput.Icon onPress={() => handlenewVisible()} name="eye" />}
                    onChangeText={text => setNewPassword(text)}
                    label="New Password" />
                <TouchableOpacity onPress={() => handlePasswordUpadte()} style={styles.ButtonContainer}>
                    {
                        loading ? <Text style={styles.ButtonText}>Loading...</Text> : <Text style={styles.ButtonText}>UPDATE PASSWORD</Text>
                    }
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    Input: {
        backgroundColor: 'white',
        fontFamily: 'Montserrat_400Regular',
        marginVertical: 10,
        fontSize: 16
    },
    ButtonContainer: {
        backgroundColor: '#232323',
        marginHorizontal: 50,
        marginVertical: 15,
        borderRadius: 5
    },
    ButtonText: {
        color: 'white',
        textAlign: 'center',
        paddingVertical: 15,
        fontFamily: 'Montserrat_700Bold',
        fontSize: 14
    },
})

export default UpdatePassword