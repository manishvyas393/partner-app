import { useIsFocused } from '@react-navigation/native';
import React from 'react'
import { useEffect } from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { GetComingUpBookings } from '../actions/BookingAction';
import Loader from '../components/Loader/Loader';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import OrdersHNFound from '../components/404/OrdersHNFound';

const ComingUp = ({navigation}) => {
    const dispatch = useDispatch();
    const { upcoming, error, loading } = useSelector((state) => state.comingUp)
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            dispatch(GetComingUpBookings())
        }
        dispatch(GetComingUpBookings())
    }, [dispatch, isFocused])


    console.log(upcoming, "UPCOMING")

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            {
                loading ? <Loader /> : <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                    {
                        upcoming.length > 0 ? upcoming.map((ix) => {
                            return (
                                <View key={ix._id}>
                                    <View style={{ backgroundColor: '#F4F4F4', marginBottom: 25, borderRadius: 16, padding: 1 }}>
                                        {
                                            ix.asignee && ix.asignee.map((iy) => {
                                                return (
                                                    <View style={{ borderWidth: 4, borderColor: '#FFFFFF', borderRadius: 16 }} key={iy._id}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <View style={{ flex: 1.07, justifyContent: 'center', marginRight: 2 }}>
                                                                <Image style={{ width: 100, height: 100, resizeMode: 'contain', borderRadius: 14 }} source={{ uri: iy.avatar.url }} />
                                                            </View>
                                                            <View style={{ flex: 2, paddingVertical: 10 }}>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 14, marginBottom: 0, flex: 2 }}>{iy.firstname}</Text>
                                                                    <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('OrderDetails', {
                                                                        id: ix._id
                                                                    })}>
                                                                        <FontAwesome5Icon style={{ marginRight: 12 }} name='eye' size={15} />
                                                                    </TouchableOpacity>
                                                                    <Text style={{ color: '#7A7A7A', fontFamily: 'Montserrat_500Medium', fontSize: 12, marginRight: 15 }}>{ix.date}</Text>
                                                                </View>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                                                                    <MaterialIcons size={12} name='category' style={{ marginRight: 5 }} />
                                                                    <Text style={{ alignSelf: 'flex-start', color: '#393939', fontFamily: 'Montserrat_500Medium', fontSize: 12, marginBottom: 3 }}>{ix.category.length > 23 ? ix.category.slice(0, 23) + '...' : ix.category}</Text>
                                                                </View>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                    <SimpleIcon size={12} name='settings' style={{ marginRight: 6 }} />
                                                                    <Text style={{ flex: 2.5, color: '#393939', fontSize: 12, fontFamily: 'Montserrat_500Medium' }}>{ix.service}</Text>
                                                                </View>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                                                                    <Text style={{ fontSize: 12, fontFamily: 'Montserrat_600SemiBold', flex: 1 }}>Total</Text>
                                                                    <Text style={{ flex: 2.8, color: '#5B5B5B', fontSize: 15, fontFamily: 'Montserrat_700Bold', }}>₹{ix.price}</Text>
                                                                    {
                                                                        ix.status === 'Booked' || ix.status === 'Completed' ? <Text style={{ backgroundColor: '#FFFF', color: '#5FD068', alignSelf: 'center', fontFamily: 'Montserrat_600SemiBold', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, fontSize: 12, marginRight: 8, shadowColor: 'rgba(0, 0, 0, 0.20)', shadowOffset: { width: 7, height: 10 }, shadowOpacity: 0.85, elevation: 10, shadowRadius: 2 }}>{ix.status}</Text> :
                                                                            ix.status === 'Cancelled' || ix.status === 'Inprogress' ? <Text style={{ backgroundColor: '#FFFF', color: '#FF5D5D', alignSelf: 'center', fontFamily: 'Montserrat_600SemiBold', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, fontSize: 12, marginRight: 8, shadowColor: 'rgba(0, 0, 0, 0.20)', shadowOffset: { width: 7, height: 10 }, shadowOpacity: 0.85, elevation: 10, shadowRadius: 2 }}>{ix.status}</Text> : null
                                                                    }
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            )
                        }) : <OrdersHNFound />
                    }
                </View>
            }
        </ScrollView>
    )
}

export default ComingUp