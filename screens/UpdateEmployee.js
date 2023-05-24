import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, deleteEmployee, getSingleEmployee, updateEmployee } from '../actions/EmployeeAction';
import { ALERT_TYPE, Dialog } from "react-native-alert-notification"
import { useNavigation } from '@react-navigation/native';
import Loader from '../components/Loader/Loader';
import { DELETE_EMPLOYEE_RESET, UPDATE_EMPLOYEE_RESET } from '../constants/EmployeeConstants';
import { Divider } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown';
import { updateEmployeeStatus } from '../actions/BookingAction';
import { UPDATE_EMPLOYEE_STATUS_RESET } from '../constants/BookingConstants';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const UpdateEmployee = ({ route }) => {
    const statusData = ['Offline', 'Active']
    const { id } = route.params;
    console.log(id)
    const { getEmployees, loading } = useSelector((state) => state.employeeDetails)
    const { isUpdated, error, loading: updateLoading } = useSelector((state) => state.updateEmployee)
    const { isUpdated: statusUpdate, error: statusError, loading: statusLoading } = useSelector((state) => state.statusEmp)
    const { isDeleted, error: deleteError, loading: DeleteLoading } = useSelector((state) => state.updateEmployee)
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [avatar, setAvatar] = useState();
    const [status, setStatus] = useState('')
    console.log(status)

    // From
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [intime, setInTime] = useState("In Time");
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (time) => {
        var d = time;
        var timestamp = new Date(d).valueOf()
        var time = new Date(timestamp).toLocaleTimeString();
        const number = moment(time, ["HH.mm"]).format("hh:mm a");
        setInTime(number)
        // console.log(number)
        hideDatePicker();
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
        // console.log(numbers)
        hideToPicker();
    };

    const handleStatusUpdate = () => {
        dispatch(updateEmployeeStatus(id, status))
    }

    console.log(firstname + lastname + intime + outtime)

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
        setAvatar(base64Img)
    }

    console.log(avatar)

    const previewImg = avatar;

    const handleEmployeeUpdate = () => {
        dispatch(updateEmployee(id, firstname, lastname, intime, outtime, avatar))
    }

    const handleDelete = () => {
        dispatch(deleteEmployee(id))
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
        if (deleteError) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: deleteError,
                button: 'close'
            })
            dispatch(clearErrors())
        }
        if (statusError) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: statusError,
                button: 'close'
            })
        }
        if (isDeleted) {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: "Employee Deleted Success",
                button: 'close'
            })
            dispatch({
                type: DELETE_EMPLOYEE_RESET
            })
            navigation.navigate('PEmployee')
        }
        if (getEmployees && getEmployees._id !== id) {
            dispatch(getSingleEmployee(id))
        }
        else {
            setFirstName(getEmployees.firstname)
            setLastName(getEmployees.lastname)
            setInTime(getEmployees.intime)
            setOutTime(getEmployees.outtime)
            setAvatar(getEmployees.avatar.url)
            setStatus(getEmployees.status)
        }
        if (isUpdated) {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: "Employee Updated Success",
                button: 'close'
            })
            dispatch({
                type: UPDATE_EMPLOYEE_RESET
            })
            navigation.navigate('PEmployee')
        }
        if (statusUpdate) {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: 'Status Updated',
                button: 'close'
            })
            dispatch({
                type: UPDATE_EMPLOYEE_STATUS_RESET
            })
            navigation.navigate('PEmployee')
        }
    }, [dispatch, getEmployees, isUpdated, error, isDeleted, deleteError, statusUpdate, statusError])

    return (
        <>
            {
                loading ? <Loader /> :
                    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: 'white' }}>
                        <View style={{ marginHorizontal: 20, marginTop: 20, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flex: 1, position: 'relative' }}>
                                    {
                                        avatar ? <Image style={{ width: 100, height: 100, resizeMode: 'contain', borderRadius: 10 }} source={{ uri: previewImg }} /> :
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
                        <View style={{ marginVertical: 30 }}>
                            <Divider />
                        </View>
                        <Text style={{ alignSelf: 'center', fontFamily: 'Montserrat_700Bold', fontSize: 15 }}>Update Your Status</Text>
                        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                            <SelectDropdown
                                data={statusData}
                                buttonStyle={{ backgroundColor: '#ffff', borderColor: '#BABABA', borderWidth: 1, width: "100%", marginVertical: 15, borderRadius: 5, height: 50 }}
                                buttonTextStyle={{ fontFamily: 'Montserrat_500Medium', color: '#000', fontSize: 15, textAlign: 'left' }}
                                onSelect={(selectedItem, index) => {
                                    setStatus(selectedItem)
                                    console.log(selectedItem)
                                }}
                                renderDropdownIcon={isOpened => {
                                    return <FontAwesome5Icon style={{ marginRight: 8 }} name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={18} />;
                                }}
                                rowStyle={styles.dropdown1RowStyle}
                                dropdownStyle={styles.dropdown1DropdownStyle}
                                dropdownIconPosition={'right'}
                                defaultButtonText={status}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            />
                            {
                                status.length > 0 && <TouchableOpacity onPress={() => handleStatusUpdate()} style={{ marginVertical: 0, backgroundColor: '#232323', paddingHorizontal: 12, paddingVertical: 10, alignSelf: 'center', borderRadius: 5 }}>
                                    <Text style={{ color: 'white', fontFamily: "Montserrat_700Bold", alignSelf: 'center', fontSize: 14 }}>{statusLoading ? "PLEASE WAIT..." : "UPDATE"}</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </ScrollView>
            }
            <View style={{ backgroundColor: 'white' }}>
                <TouchableOpacity onPress={() => handleDelete()}>
                    <Text style={{ color: '#D52976', alignSelf: 'center', marginVertical: 15, fontFamily: 'Montserrat_600SemiBold', fontSize: 16 }}>Delete Employee</Text>
                </TouchableOpacity>
                {
                    updateLoading ? <TouchableOpacity style={{ marginVertical: 0, backgroundColor: '#232323', paddingHorizontal: 40, paddingVertical: 20 }}>
                        <Text style={{ color: 'white', fontFamily: "Montserrat_700Bold", alignSelf: 'center', fontSize: 16 }}>Please Wait...</Text>
                    </TouchableOpacity> :
                        <TouchableOpacity onPress={handleEmployeeUpdate} style={{ marginVertical: 0, backgroundColor: '#232323', paddingHorizontal: 40, paddingVertical: 20 }}>
                            <Text style={{ color: 'white', fontFamily: "Montserrat_700Bold", alignSelf: 'center', fontSize: 16 }}>UPDATE EMPLOYEE</Text>
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
    dropdown1RowStyle: { backgroundColor: '#FFFFF', borderBottomColor: '#F7F7F7' },
    dropdown1DropdownStyle: { backgroundColor: '#FFFF', borderRadius: 5, width: "40%" },
    dropdown1RowTxtStyle: { color: '#444', fontSize: 14, fontFamily: 'Montserrat_500Medium' },
})

export default UpdateEmployee