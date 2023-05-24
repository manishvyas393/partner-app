import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginUser } from '../actions/UserAction';
import { ALERT_TYPE, Dialog } from "react-native-alert-notification"

const Login = () => {
    const { error, loading, isAuthenticated } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isVisible, setIsVisible] = useState(true)

    const handleVisible = () => {
        setIsVisible(!isVisible)
    }

    const handleLogin = () => {
        dispatch(loginUser(email, password))
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
            navigation.navigate('Home')
        }
    }, [dispatch, error, isAuthenticated])

    return (
        <View style={{ backgroundColor: 'white', flex: 1, }}>
            <ScrollView showsVerticalScrollIndicator={false}>
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
                            label="Password"
                            secureTextEntry={isVisible}
                            right={<TextInput.Icon onPress={() => handleVisible()} name="eye" />}
                            onChangeText={text => setPassword(text)}
                        />
                        <TouchableOpacity onPress={() => handleLogin()} style={styles.ButtonContainer}>
                            {
                                loading ? <Text style={styles.ButtonText}>Please wait...</Text> : <Text style={styles.ButtonText}>Sign In</Text>
                            }
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center', marginVertical: 15 }}>
                            <TouchableOpacity><Text style={styles.Ftpass}>Forgot Password?</Text></TouchableOpacity>
                            <TouchableOpacity><Text style={styles.Condition}>Terms and conditions</Text></TouchableOpacity>
                        </View>
                        <View style={{ marginVertical: 20 }}>
                            <Text style={styles.HeadParas}>Don't Have an account?</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => {
                                    if (isAuthenticated) {
                                        return Dialog.show({
                                            type: ALERT_TYPE.WARNING,
                                            title: 'Warning',
                                            textBody: "You're already Register",
                                            button: 'close'
                                        })
                                    }
                                    else {
                                        navigation.navigate('Signup')
                                    }
                                }}>
                                    <Text style={{ fontFamily: 'Montserrat_700Bold', fontSize: 15, borderBottomColor: '#000', borderBottomWidth: 1 }}>SIGN UP</Text>
                                </TouchableOpacity>
                                <View>
                                    <Text style={{ marginHorizontal: 10, fontFamily: 'Montserrat_400Regular', fontSize: 15 }}>here</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
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
export default Login