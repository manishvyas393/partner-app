import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, registerUser } from '../actions/UserAction';
import { ALERT_TYPE, Dialog } from "react-native-alert-notification"

const Signup = () => {
    const { error, loading, isAuthenticated } = useSelector((state) => state.auth)
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSignup = () => {
        dispatch(registerUser(name, email, password))
    }

    const [isVisible, setIsVisible] = useState(true)

    const handleVisible = () => {
        setIsVisible(!isVisible)
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
        if (isAuthenticated) {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: "Signup Success",
                button: 'close'
            })
            if (isFocused) {
                navigation.navigate('BasicInfo')
            }
        }
    }, [dispatch, error, alert, isAuthenticated, isFocused])

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.container}>
                <Text style={styles.HeadPara}>Let's make it easier for you</Text>
                <View style={styles.InputContainer}>
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
                        autoCapitalize='words'
                        mode="outlined"
                        value={name}
                        onChangeText={text => setName(text)}
                        label="Name" />
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
                        keyboardType='email-address'
                        style={styles.Input}
                        autoCapitalize='none'
                        mode="outlined"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        label="Email" />

                    <TextInput theme={{
                        roundness: 5,
                        colors: {
                            primary: "#BABABA",
                        },
                        fonts: {
                            regular: {
                                fontFamily: 'Montserrat_400Regular',
                            }
                        }
                    }}
                        outlineColor='#BABABA'
                        value={password}
                        style={styles.Input}
                        autoCapitalize='none'
                        mode="outlined"
                        secureTextEntry={isVisible}
                        right={<TextInput.Icon onPress={() => handleVisible()} name="eye" />}
                        label="Password"
                        onChangeText={text => setPassword(text)}
                    />
                    <TouchableOpacity onPress={() => handleSignup()} style={styles.ButtonContainer}>
                        {
                            loading ? <Text style={styles.ButtonText}>Please wait...</Text> : <Text style={styles.ButtonText}>Sign Up</Text>
                        }
                    </TouchableOpacity>
                    <View style={{ marginVertical: 20 }}>
                        <Text style={styles.HeadParas}>Already Have an account?</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={{ fontFamily: 'Montserrat_700Bold', fontSize: 15, borderBottomColor: '#000', borderBottomWidth: 1 }}>SIGN IN</Text>
                            </TouchableOpacity>
                            <View>
                                <Text style={{ marginHorizontal: 10, fontFamily: 'Montserrat_400Regular', fontSize: 15 }}>here</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 20
    },
    InputContainer: {
        marginVertical: 20
    },
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
        fontSize: 16
    },
    Ftpass: {
        color: '#9B7ABF',
        fontFamily: "Montserrat_500Medium",
        fontSize: 15,
        marginBottom: 5
    },
    Condition: {
        fontFamily: "Montserrat_500Medium",
        fontSize: 15,
        borderBottomColor: '#000',
        borderBottomWidth: 1
    },
    HeadPara: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 18
    },
    HeadParas: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 15,
        marginBottom: 5
    },
})

export default Signup