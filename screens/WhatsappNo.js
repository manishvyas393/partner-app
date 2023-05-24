import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import { useEffect } from 'react'
import { updateMobileno } from '../actions/BookingAction'
import { useIsFocused } from '@react-navigation/native'
import { UPDATE_MOBILENO_RESET } from '../constants/BookingConstants'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { LoadUser } from '../actions/UserAction'

const WhatsappNo = () => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { isUpdated, error, loading } = useSelector((state) => state.updateMobile)
    const { user } = useSelector((state) => state.auth)
    const [mobileno, setMobileNo] = useState('')


    const updateMobileNo = async () => {
        await dispatch(updateMobileno(mobileno))
        dispatch(LoadUser())
    }

    useEffect(() => {
        if (isUpdated) {
            setMobileNo()
            dispatch({
                type: UPDATE_MOBILENO_RESET
            })
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: 'Whatsapp No Updated Success',
                button: 'close',
            })
        }
    }, [dispatch, mobileno, isFocused, isUpdated])


    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                <Text style={{ fontSize: 15, fontFamily: 'Montserrat_600SemiBold' }}>Get notifications on Booking!</Text>
                <Text style={{ fontSize: 13, fontFamily: 'Montserrat_500Medium' }}>Add your mobile no. In the below input box without +91.</Text>
                <View>
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
                        keyboardType='number-pad'
                        style={styles.Input}
                        autoCapitalize='none'
                        mode="outlined"
                        value={mobileno}
                        onChangeText={text => setMobileNo(text)}
                        label="Whatsapp No" />
                    {
                        !mobileno ? null : <TouchableOpacity onPress={updateMobileNo} style={{ backgroundColor: '#2B2B2B', alignSelf: 'center', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5 }}>
                            <Text style={{ color: 'white', fontFamily: 'Montserrat_500Medium', fontSize: 13 }}>{loading ? "LOADING..." : "UPDATE"}</Text>
                        </TouchableOpacity>
                    }
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <Text style={{ fontSize: 14, fontFamily: 'Montserrat_500Medium' }}>Your whatsapp No is</Text>
                        <Text style={{ marginLeft: 8, fontSize: 14, fontFamily: 'Montserrat_500Medium' }}>{user.mobileno}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    Input: {
        backgroundColor: 'white',
        fontFamily: 'Montserrat_400Regular',
        marginVertical: 20,
        fontSize: 16
    },
})

export default WhatsappNo