import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import NotFound from '../components/404/NotFound'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { loggedUserEmployees } from '../actions/EmployeeAction'
import EmployeeNFound from '../components/404/EmployeeNFound'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const ShowEmployee = () => {
    const { employee } = useSelector((state) => state.getLoggedEmp)
    const focused = useIsFocused()
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [refresh, setRefresh] = useState(false);

    const pullMe = () => {
        setRefresh(true);
        dispatch(loggedUserEmployees())
        setTimeout(() => {
            setRefresh(false)
        }, 2000);
    }

    useEffect(() => {
        if (focused) {
            dispatch(loggedUserEmployees())
        }
    }, [dispatch, focused])


    return (
        <>
            <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />} showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                    {
                        employee.length > 0 ? employee.map((item) => {
                            return (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#F8F8F8', borderColor: '#EBEBEB', borderWidth: 1, borderRadius: 16, marginVertical: 10 }} key={item._id}>
                                    <View style={{ flex: 1 }}>
                                        {
                                            item.avatar.url && <Image style={{ width: 93, height: 93, resizeMode: 'contain', borderRadius: 14 }} source={{ uri: item.avatar.url }} />
                                        }
                                    </View>
                                    <View style={{ flex: 2, paddingTop: 10 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 16, marginBottom: 5 }}>{item.firstname} {item.lastname}</Text>
                                            {
                                                item.status === "Active" ? <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 12, backgroundColor: '#5FD068', width: 8, height: 8, borderRadius: 50, marginLeft: 5 }}></Text> : <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 12, backgroundColor: 'red', width: 8, height: 8, borderRadius: 50, marginLeft: 8 }}></Text>
                                            }
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <MaterialCommunityIcon name='camera-timer' style={{ marginRight: 2 }} size={12} />
                                            <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 12 }}>Time:</Text>
                                            <Text style={{ color: '#5B5B5B', fontFamily: 'Montserrat_500Medium', marginLeft: 4, fontSize: 12 }}>{item.intime} - {item.outtime}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        }) : <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <EmployeeNFound />
                        </View>
                    }
                    <TouchableOpacity onPress={() => navigation.navigate('AddEmp')} style={{ marginTop: 0, alignSelf: 'center', backgroundColor: '#232323', paddingHorizontal: 40, paddingVertical: 12, borderRadius: 5 }}>
                        <Text style={{ color: 'white', fontFamily: "Montserrat_700Bold", }}>Add</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Services')} style={{ marginVertical: 0, backgroundColor: '#232323', paddingHorizontal: 40, paddingVertical: 20 }}>
                    <Text style={{ color: 'white', fontFamily: "Montserrat_700Bold", alignSelf: 'center', fontSize: 16 }}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default ShowEmployee