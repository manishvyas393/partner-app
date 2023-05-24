import { View, Text, ScrollView, StatusBar, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import FooterTabs from '../components/Nav/FooterTabs'
import Entypo from 'react-native-vector-icons/Entypo'
import { clearErrors, getLoggedService } from '../actions/ServicesAction'
import { useDispatch, useSelector } from 'react-redux'
import { RadioButton } from 'react-native-paper'
import NotFound from '../components/404/NotFound'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ServiceHNFound from '../components/404/ServiceHNFound'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import Loader from '../components/Loader/Loader'

const ProfileServices = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation()
    const { error, services } = useSelector((state) => state.getLoggedServ)
    const dispatch = useDispatch();
    const [servicetype, setServiceType] = useState('');
    const [refresh, setRefresh] = useState(false);
    const isFocused = useIsFocused()

    const filterData = (selected) => {
        setServiceType(selected)
        // dispatch(getLoggedService(selected))
        setRefresh(true);
        dispatch(getLoggedService(selected))
        setTimeout(() => {
            setRefresh(false)
        }, 2000);
    }

    useEffect(() => {
        if (error) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: "Error",
                textBody: error,
                button: 'close'
            })
            dispatch(clearErrors())
        }
        if (isFocused) {
            dispatch(getLoggedService())
        }
    }, [dispatch, error, isFocused])

    return (
        <View style={{ flex: 1, backgroundColor: 'white', marginTop: insets.top }}>
            <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 24 }}>Manage Services</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('PAddServ')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Entypo name='circle-with-plus' style={{ marginHorizontal: 10 }} size={25} />
                        <Text style={{ fontFamily: 'Montserrat_700Bold', fontSize: 14 }}>ADD</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => filterData()} />} showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', marginTop: 10 }} horizontal>
                    <RadioButton.Group onValueChange={newValue => filterData(newValue)} value={servicetype}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ backgroundColor: `${servicetype === 'Men' ? '#EBEBEB' : 'white'}`, borderColor: '#7A7A7A', borderWidth: 1, marginHorizontal: 10, borderRadius: 5 }}>
                                <RadioButton.Item labelStyle={{ fontFamily: 'Montserrat_500Medium', fontSize: 14 }} color='#7A7A7A' label="Men" value="Men" />
                            </View>
                            <View style={{ backgroundColor: `${servicetype === 'Women' ? '#EBEBEB' : 'white'}`, borderColor: '#7A7A7A', borderWidth: 1, marginHorizontal: 10, borderRadius: 5 }}>
                                <RadioButton.Item labelStyle={{ fontFamily: 'Montserrat_500Medium', fontSize: 14 }} color='#7A7A7A' label="Women" value="Women" />
                            </View>
                            <View style={{ backgroundColor: `${servicetype === 'Treatments' ? '#EBEBEB' : 'white'}`, borderColor: '#7A7A7A', borderWidth: 1, marginHorizontal: 10, borderRadius: 5 }}>
                                <RadioButton.Item labelStyle={{ fontFamily: 'Montserrat_500Medium', fontSize: 14 }} color='#7A7A7A' label="Treatments" value="Treatments" />
                            </View>
                            <View style={{ backgroundColor: `${servicetype === 'Makeup' ? '#EBEBEB' : 'white'}`, borderColor: '#7A7A7A', borderWidth: 1, marginHorizontal: 10, borderRadius: 5 }}>
                                <RadioButton.Item labelStyle={{ fontFamily: 'Montserrat_500Medium', fontSize: 14 }} color='#7A7A7A' label="Make Up" value="Makeup" />
                            </View>
                            <View style={{ backgroundColor: `${servicetype === 'Skin' ? '#EBEBEB' : 'white'}`, borderColor: '#7A7A7A', borderWidth: 1, marginHorizontal: 10, borderRadius: 5 }}>
                                <RadioButton.Item labelStyle={{ fontFamily: 'Montserrat_500Medium', fontSize: 14 }} color='#7A7A7A' label="Skin" value="Skin" />
                            </View>
                            <View style={{ backgroundColor: `${servicetype === 'Nails' ? '#EBEBEB' : 'white'}`, borderColor: '#7A7A7A', borderWidth: 1, marginHorizontal: 10, borderRadius: 5 }}>
                                <RadioButton.Item labelStyle={{ fontFamily: 'Montserrat_500Medium', fontSize: 14 }} color='#7A7A7A' label="Nails" value="Nails" />
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
                                                    <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 14, color: '#5B5B5B', marginLeft: 35 }}>
                                                        {
                                                            item.category.length > 12 ? item.category.slice(0, 12) + '...' : item.category
                                                        }
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontFamily: 'Montserrat_700Bold', color: '#2B2B2B', fontSize: 14 }}>₹{item.price}</Text>
                                            <TouchableOpacity style={{ marginTop: 5 }} onPress={() => navigation.navigate('serviceupdate', {
                                                id: item._id
                                            })}>
                                                <FontAwesome5Icon name='pen' size={12} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )
                        }) : <ServiceHNFound />
                    }
                </View>
            </ScrollView>
            <FooterTabs />
        </View>
    )
}

export default ProfileServices