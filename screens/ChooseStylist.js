import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getEmployeesServices } from '../actions/EmployeeAction';
import { ALERT_TYPE, Dialog } from "react-native-alert-notification"
import { useIsFocused } from '@react-navigation/native';
import Loader from '../components/Loader/Loader'
import Entypo from 'react-native-vector-icons/Entypo'
import { Divider } from 'react-native-elements/dist/divider/Divider';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const ChooseStylist = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const { id, cameFrom,bookingId } = route.params;
    const { emp, employees, error, loading } = useSelector((state) => state.serviceemp)

    console.log("DATA", employees.hour)


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
        if (isFocused || id) {
            dispatch(getEmployeesServices(id))
        }
    }, [dispatch, isFocused, id, error])
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            {
                loading || !employees.hour ? <Loader /> : <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: 'white' }}>
                    {
                        emp && emp.length > 0 ? emp.map((x) => {
                            return (
                                <View key={x._id} style={{ marginHorizontal: 20 }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Slot', {
                                        id: x._id,
                                        serviceId: id,
                                        intime: x.intime,
                                        outtime: x.outtime,
                                        expectedTime: employees && employees.hour,
                                        cameFrom: cameFrom,
                                        bookingId: bookingId
                                    })} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 15 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View>
                                                <Image style={{ width: 70, height: 70, resizeMode: 'contain', borderRadius: 5 }} source={{ uri: x.avatar.url }} />
                                            </View>
                                            <View style={{ marginLeft: 15 }}>
                                                <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat_600SemiBold', fontSize: 14 }}>{x.firstname}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                                    <MaterialCommunityIcon name='camera-timer' style={{ marginRight: 2 }} size={12} />
                                                    <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 12 }}>Time:</Text>
                                                    <Text style={{ color: '#5B5B5B', fontFamily: 'Montserrat_500Medium', marginLeft: 4, fontSize: 12 }}>{x.intime} - {x.outtime}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View>
                                            <Entypo name='chevron-right' color='#2B2B2B' size={22} />
                                        </View>
                                    </TouchableOpacity>
                                    <Divider />
                                </View>
                            )
                        }) : null
                    }
                </ScrollView>
            }
        </View>
    )
}

export default ChooseStylist