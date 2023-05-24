import { ScrollView, TouchableOpacity, View, Text, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RadioButton } from 'react-native-paper'
import NotFound from '../components/404/NotFound'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getLoggedService } from '../actions/ServicesAction'
import ServiceHNFound from '../components/404/ServiceHNFound'
import { useIsFocused } from '@react-navigation/native'

const ShowServices = ({ navigation }) => {
    const { error, services } = useSelector((state) => state.getLoggedServ)
    const dispatch = useDispatch();
    const focused = useIsFocused()
    const [servicetype, setServiceType] = useState('');
    const [refresh, setRefresh] = useState(false);
    // console.log(servicetype)

    // console.log(services)

    const filterData = (selected) => {
        setServiceType(selected)
        dispatch(getLoggedService(selected))
        setRefresh(true);
        dispatch(getLoggedService(selected))
        setTimeout(() => {
            setRefresh(false)
        }, 2000);
    }

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors())
        }
        if (focused) {
            dispatch(getLoggedService())
        }
    }, [dispatch, clearErrors, focused])


    return (
        <>
            <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => filterData()} />} showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', marginTop: 10 }} horizontal>
                    <RadioButton.Group onValueChange={newValue => filterData(newValue)} value={servicetype}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ backgroundColor: `${servicetype === 'Men' ? '#EBEBEB' : 'white'}`, borderColor: '#7A7A7A', borderRadius: 5, borderWidth: 1, marginHorizontal: 10 }}>
                                <RadioButton.Item labelStyle={{ fontFamily: 'Montserrat_500Medium', fontSize: 14, color: '#7A7A7A' }} color='#848484' label="Men" value="Men" />
                            </View>
                            <View style={{ backgroundColor: `${servicetype === 'Women' ? '#EBEBEB' : 'white'}`, borderColor: '#7A7A7A', borderRadius: 5, borderWidth: 1, marginHorizontal: 10 }}>
                                <RadioButton.Item labelStyle={{ fontFamily: 'Montserrat_500Medium', fontSize: 14, color: '#7A7A7A' }} color='#848484' label="Women" value="Women" />
                            </View>
                            <View style={{ backgroundColor: `${servicetype === 'Treatments' ? '#EBEBEB' : 'white'}`, borderColor: '#7A7A7A', borderRadius: 5, borderWidth: 1, marginHorizontal: 10 }}>
                                <RadioButton.Item labelStyle={{ fontFamily: 'Montserrat_500Medium', fontSize: 14, color: '#7A7A7A' }} color='#848484' label="Treatments" value="Treatments" />
                            </View>
                            <View style={{ backgroundColor: `${servicetype === 'Makeup' ? '#EBEBEB' : 'white'}`, borderColor: '#7A7A7A', borderRadius: 5, borderWidth: 1, marginHorizontal: 10 }}>
                                <RadioButton.Item labelStyle={{ fontFamily: 'Montserrat_500Medium', fontSize: 14, color: '#7A7A7A' }} color='#848484' label="Make Up" value="Makeup" />
                            </View>
                            <View style={{ backgroundColor: `${servicetype === 'Skin' ? '#EBEBEB' : 'white'}`, borderColor: '#7A7A7A', borderRadius: 5, borderWidth: 1, marginHorizontal: 10 }}>
                                <RadioButton.Item labelStyle={{ fontFamily: 'Montserrat_500Medium', fontSize: 14, color: '#7A7A7A' }} color='#848484' label="Skin" value="Skin" />
                            </View>
                            <View style={{ backgroundColor: `${servicetype === 'Nails' ? '#EBEBEB' : 'white'}`, borderColor: '#7A7A7A', borderRadius: 5, borderWidth: 1, marginHorizontal: 10 }}>
                                <RadioButton.Item labelStyle={{ fontFamily: 'Montserrat_500Medium', fontSize: 14, color: '#7A7A7A' }} color='#848484' label="Nails" value="Nails" />
                            </View>
                        </View>
                    </RadioButton.Group>
                </ScrollView>
                <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                    {
                        services.length > 0 ? services.map((item) => {
                            return (
                                <View key={item._id} style={{ borderBottomColor: '#F2F2F2', paddingVertical: 10, borderBottomWidth: 1 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 5 }}>
                                            <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 16, marginBottom: 5, color: '#2B2B2B', textTransform: 'capitalize' }}>{item.servicename}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flex: 1 }}>
                                                    {
                                                        item.hour && <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 14, color: '#5B5B5B' }}>{item.hour} Min</Text>
                                                    }
                                                </View>
                                                <View style={{ flex: 2.5 }}>
                                                    <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 14, color: '#5B5B5B', marginLeft: 35 }}>{
                                                        item.category.length > 8 ? item.category.slice(0, 8) + '...' : item.category
                                                    }</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontFamily: 'Montserrat_700Bold', color: '#2B2B2B', fontSize: 14 }}>₹{item.price}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        }) : <ServiceHNFound />
                    }
                </View>
            </ScrollView>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginVertical: 0, backgroundColor: '#232323', paddingHorizontal: 40, paddingVertical: 20 }}>
                    <Text style={{ color: 'white', fontFamily: "Montserrat_700Bold", alignSelf: 'center', fontSize: 16 }}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default ShowServices