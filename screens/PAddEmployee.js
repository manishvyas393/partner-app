import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, newEmployee } from '../actions/EmployeeAction';
import { ALERT_TYPE, Dialog } from "react-native-alert-notification"
import { useNavigation } from '@react-navigation/native';
import { ADD_NEW_EMPLOYEE_RESET } from '../constants/EmployeeConstants';


const PAddEmployee = () => {
    // const [intym, setInTym] = useState("In Time")
    // const [outtym, setOutTym] = useState("Out Time")
    const dispatch = useDispatch();
    const { error, loading, isPosted } = useSelector((state) => state.employee)
    const navigation = useNavigation()
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [avatar, setAvatar] = useState();

    // From
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [intime, setInTime] = useState("In Time");
    console.log(intime)

    const handleConfirm = (time) => {
        var d = time;
        var timestamp = new Date(d).valueOf()
        var time = new Date(timestamp).toLocaleTimeString();
        const number = moment(time, ["HH.mm"]).format("hh:mm a");
        setInTime(number)
        console.log(number)
        hideDatePicker();
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    // To
    const [isToVisible, setToVisible] = useState(false);
    const [outtime, setOutTime] = useState("Out Time");
    const showToPicker = () => {
        setToVisible(true)
    }
    const hideToPicker = () => {
        setToVisible(false)
    }

    const handleTo = (times) => {
        var ds = times;
        var timestamps = new Date(ds).valueOf()
        var timev = new Date(timestamps).toLocaleTimeString();
        const numbers = moment(timev, ["HH.mm"]).format("hh:mm a");
        setOutTime(numbers)
        console.log(numbers)
        hideToPicker();

        // send This Data In Database
        // const format2 = "hh:mm a"
        // var date2 = new Date(ds);
        // var format3 = moment(date2).format(format2)
        // setOutTime(format3)
    };

    const handleUpload = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        // TODO
        if (permissionResult.granted === false) {
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Allow Camera Access in Permission!',
                button: 'close'
            })
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            base64: true,
            quality: 0.5
        })
        if (pickerResult.cancelled === true) {
            return
        }
        let base64Img = `data:image/jpg;base64,${pickerResult.base64}`
        // console.log(base64Img)
        setAvatar(base64Img)
    }

    const previewImg = avatar;

    let avatars = 'https://github.com/yadavashishdhirendra/MLG-Newsletter-1.github.io/blob/main/istockphoto-1298261537-612x612.jpg?raw=true'
    console.log(avatars)

    const handleEmployee = () => {
        if (!avatar) {
            dispatch(newEmployee(firstname, lastname, intime, outtime, avatars))
        }
        else {
            dispatch(newEmployee(firstname, lastname, intime, outtime, avatar))
        }
    }

    useEffect(() => {
        if (error) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: error,
                button: 'close',
            })
            dispatch(clearErrors())
        }
        if (isPosted) {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: 'Employee Added Success',
                button: 'close',
            })
            setFirstName("");
            setLastName("");
            setAvatar("")
            setInTime("In Time")
            setOutTime("Out Time")
            dispatch({
                type: ADD_NEW_EMPLOYEE_RESET
            })
            navigation.navigate('PEmployee')
        }
    }, [dispatch, error, isPosted])

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ marginHorizontal: 20, marginTop: 20, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, position: 'relative' }}>
                            {
                                avatar ? <Image style={{ width: 100, height: 100, resizeMode: 'cover' }} source={{ uri: previewImg }} /> :
                                    <Image style={{ width: 100, height: 100, resizeMode: 'contain' }} source={require('../assets/profile-boy.png')} />
                            }
                            <TouchableOpacity onPress={handleUpload} style={{ position: 'absolute', bottom: 10, left: 40 }}>
                                <FontAwesome5 color={'#D52976'} name='camera' size={25} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 2 }}>
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
                                value={firstname}
                                style={styles.Input}
                                autoCapitalize='words'
                                mode="outlined"
                                label="First Name"
                                onChangeText={(text) => setFirstName(text)}
                            />
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
                                value={lastname}
                                style={styles.Input}
                                autoCapitalize='words'
                                mode="outlined"
                                label="Last Name"
                                onChangeText={(text) => setLastName(text)}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Text style={{ alignSelf: 'center', fontFamily: 'Montserrat_700Bold', fontSize: 15 }}>Working Time</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                            <View style={{ flex: 1, alignSelf: 'center' }}>
                                {/* DatePicker Goes Here */}
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#BABABA', borderBottomWidth: 1, paddingHorizontal: 10, paddingVertical: 10 }} onPress={showDatePicker}>
                                    <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 15 }}>{intime}</Text>
                                    <FontAwesome5 name='chevron-down' size={20} />
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="time"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                    is24Hour={false}
                                />
                            </View>
                            <View style={{ flex: 1, alignSelf: 'center', marginLeft: 30 }}>
                                {/* DatePicker Goes Here */}
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#BABABA', borderBottomWidth: 1, paddingHorizontal: 10, paddingVertical: 10 }} onPress={showToPicker}>
                                    <Text style={{ fontFamily: "Montserrat_500Medium", fontSize: 15, }}>{outtime}</Text>
                                    <FontAwesome5 name='chevron-down' size={20} />
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={isToVisible}
                                    mode="time"
                                    onConfirm={handleTo}
                                    onCancel={hideToPicker}
                                    is24Hour={false}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View>
                {
                    loading ? <TouchableOpacity style={{ marginVertical: 0, backgroundColor: '#232323', paddingHorizontal: 40, paddingVertical: 20 }}>
                        <Text style={{ color: 'white', fontFamily: "Montserrat_700Bold", alignSelf: 'center', fontSize: 16 }}>Please Wait...</Text>
                    </TouchableOpacity> :
                        <TouchableOpacity onPress={handleEmployee} style={{ marginVertical: 0, backgroundColor: '#232323', paddingHorizontal: 40, paddingVertical: 20 }}>
                            <Text style={{ color: 'white', fontFamily: "Montserrat_700Bold", alignSelf: 'center', fontSize: 16 }}>ADD EMPLOYEE</Text>
                        </TouchableOpacity>
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    Input: {
        backgroundColor: 'white',
        fontFamily: 'Montserrat_400Regular',
        marginBottom: 10,
        fontSize: 16,
    },
})

export default PAddEmployee