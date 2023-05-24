import { View, Text, ScrollView, StatusBar, TouchableOpacity, RefreshControl, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import FooterTabs from '../components/Nav/FooterTabs'
import Entypo from 'react-native-vector-icons/Entypo'
import { useDispatch, useSelector } from 'react-redux'
import { loggedUserEmployees } from '../actions/EmployeeAction'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EmployeeNFound from '../components/404/EmployeeNFound'

const ProfileEmployee = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const focused = useIsFocused();
    const dispatch = useDispatch();
    const { employee, error } = useSelector((state) => state.getLoggedEmp)
    const [refresh, setRefresh] = useState(false);
    const [load, setLoad] = useState(true)

    const pullMe = () => {
        setRefresh(true);
        dispatch(loggedUserEmployees())
        setTimeout(() => {
            setRefresh(false)
        }, 2000);
    }

    useEffect(() => {
        if (error) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: error,
                button: 'close'
            })
        }
        if (focused) {
            dispatch(loggedUserEmployees())
        }
    }, [dispatch, error, focused])

    return (
        <View style={{ flex: 1, backgroundColor: 'white', marginTop: insets.top, }}>
            <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 24 }}>Manage Staff</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('PAddEmpl')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Entypo name='circle-with-plus' style={{ marginHorizontal: 10 }} size={25} />
                        <Text style={{ fontFamily: 'Montserrat_700Bold', fontSize: 14 }}>ADD</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />} style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                    {
                        employee.length > 0 ? employee.map((item) => {
                            return (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#F4F4F4', borderColor: '#C7C7C7', borderWidth: 1, borderRadius: 16, marginVertical: 10 }} key={item._id}>
                                    <View style={{ flex: 1 }}>
                                        {
                                            item.avatar.url && <Image style={{ width: 93, height: 93, resizeMode: 'contain', borderRadius: 15 }} source={{ uri: item.avatar.url }} />
                                        }
                                    </View>
                                    <View style={{ flex: 2, paddingTop: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 16, marginBottom: 5 }}>{item.firstname} {item.lastname}</Text>
                                                <View style={{ marginLeft: 3 }}>
                                                    {
                                                        item.status === "Active" ? <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 12, backgroundColor: '#5FD068', width: 8, height: 8, borderRadius: 50 }}></Text> : <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 12, backgroundColor: 'red', width: 8, height: 8, borderRadius: 50 }}></Text>
                                                    }
                                                </View>
                                            </View>
                                            <TouchableOpacity onPress={() => navigation.navigate('employeeupdate', {
                                                id: item._id
                                            })}>
                                                <FontAwesome5Icon style={{ marginRight: 10 }} name='pen' size={15} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 12 }}>Time:</Text>
                                            <Text style={{ color: '#5B5B5B', fontFamily: 'Montserrat_500Medium', marginLeft: 4, fontSize: 12 }}>{item.intime} - {item.outtime}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        }) : <EmployeeNFound />
                    }
                </View>
            </ScrollView>
            <FooterTabs />
        </View>
    )
}

export default ProfileEmployee