import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { customerBooked, partnerBooked, partnerBookedUnEmployeed } from '../actions/BookingAction';
import OrdersHNFound from '../components/404/OrdersHNFound';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Loader from '../components/Loader/Loader';
import { Divider } from 'react-native-elements';

const BookingNotification = () => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused()

    const { booking: partnerBooking, error: partnerError, loading: partnerLoading } = useSelector((state) => state.partnerBooking)
    const { unEmployeedBooking } = useSelector((state) => state.unemployeedBooking)
    const { bookings: customerBooking, error: customerError, loading: customerLoading } = useSelector((state) => state.customerBooking)

    useEffect(() => {
        if (isFocused) {
            dispatch(partnerBooked())
            dispatch(customerBooked())
            dispatch(partnerBookedUnEmployeed())
        }
        dispatch(partnerBooked())
        dispatch(customerBooked())
        dispatch(partnerBookedUnEmployeed())
    }, [dispatch, isFocused])

    console.log("CUSTOMER BOOKING", partnerBooking.length)
    console.log("PARTNER BOOKING", customerBooking.length)
    console.log(unEmployeedBooking, "unemployed")


    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white', flex: 1 }}>
            {
                customerLoading || partnerLoading ? <Loader /> : <View style={{ marginHorizontal: 20 }}>
                    <View style={{ marginVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 14 }}>Customer App Booking Total</Text>
                        <View style={{ backgroundColor: '#F7F7F7', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                            <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 14 }}>{partnerBooking && partnerBooking.length}</Text>
                        </View>
                    </View>
                    {
                        partnerBooking.length > 0 ? partnerBooking.map((ix) => {
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
                                                                    <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 14, marginBottom: 0, flex: 2 }}>{iy.firstname} {ix.status === 'Booked' ? <Text style={{ color: '#82CD47' }}>●</Text> : <Text style={{ color: '#FF6464' }}>●</Text>}</Text>
                                                                    <Text style={{ color: '#7A7A7A', fontFamily: 'Montserrat_500Medium', fontSize: 12, marginRight: 15 }}>{ix.date}</Text>
                                                                </View>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                                                                    <MaterialIcons size={12} name='category' style={{ marginRight: 5 }} />
                                                                    <Text style={{ alignSelf: 'flex-start', color: '#393939', fontFamily: 'Montserrat_500Medium', fontSize: 12, marginBottom: 3 }}>{ix.category.length > 23 ? ix.category.slice(0, 23) + '...' : ix.category}</Text>
                                                                </View>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                    <SimpleIcon size={12} name='settings' style={{ marginRight: 6 }} />
                                                                    <Text style={{ flex: 2.5, color: '#393939', fontSize: 12, fontFamily: 'Montserrat_500Medium' }}>{ix.servicename}</Text>
                                                                </View>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                        <Text style={{ fontSize: 12, fontFamily: 'Montserrat_600SemiBold' }}>Total</Text>
                                                                        <Text style={{ color: '#5B5B5B', fontSize: 15, fontFamily: 'Montserrat_700Bold', marginLeft: 8 }}>₹{ix.price}</Text>
                                                                    </View>
                                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                        <Entypo name='back-in-time' style={{ marginRight: 5 }} size={14} />
                                                                        <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 12, marginRight: 8 }}>{ix.intime}</Text>
                                                                    </View>
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
                        }) : null
                    }
                    <Divider />
                    <View style={{ paddingVertical: 20 }}>
                        <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 14, marginBottom: 15 }}>Maximum Availability Booking (Users App)</Text>
                        {
                            unEmployeedBooking.length > 0 ? unEmployeedBooking.map((ix) => {
                                return (
                                    <View key={ix._id}>
                                        <View style={{ backgroundColor: '#F4F4F4', marginBottom: 25, borderRadius: 16, padding: 1 }}>
                                            <View style={{ borderWidth: 4, borderColor: '#FFFFFF', borderRadius: 16 }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flex: 1.07, justifyContent: 'center', marginRight: 2 }}>
                                                        <Image style={{ width: 100, height: 100, resizeMode: 'contain', borderRadius: 14 }} source={require('../assets/Preview.jpg')} />
                                                    </View>
                                                    <View style={{ flex: 2, paddingVertical: 10 }}>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 14, marginBottom: 0, flex: 2 }}>No Reference {ix.status === 'Booked' ? <Text style={{ color: '#82CD47' }}>●</Text> : <Text style={{ color: '#FF6464' }}>●</Text>}</Text>
                                                            <Text style={{ color: '#7A7A7A', fontFamily: 'Montserrat_500Medium', fontSize: 12, marginRight: 15 }}>{ix.date}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                                                            <MaterialIcons size={12} name='category' style={{ marginRight: 5 }} />
                                                            <Text style={{ alignSelf: 'flex-start', color: '#393939', fontFamily: 'Montserrat_500Medium', fontSize: 12, marginBottom: 3 }}>{ix.category.length > 23 ? ix.category.slice(0, 23) + '...' : ix.category}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <SimpleIcon size={12} name='settings' style={{ marginRight: 6 }} />
                                                            <Text style={{ flex: 2.5, color: '#393939', fontSize: 12, fontFamily: 'Montserrat_500Medium' }}>{ix.servicename}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Text style={{ fontSize: 12, fontFamily: 'Montserrat_600SemiBold' }}>Total</Text>
                                                                <Text style={{ color: '#5B5B5B', fontSize: 15, fontFamily: 'Montserrat_700Bold', marginLeft: 8 }}>₹{ix.price}</Text>
                                                            </View>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Entypo name='back-in-time' style={{ marginRight: 5 }} size={14} />
                                                                <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 12, marginRight: 8 }}>{ix.intime}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }) : null
                        }
                    </View>
                    <Divider />
                    {/* PARTNERS BOOKINGS */}
                    <View style={{ marginVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 14 }}>Partner App Booking Total</Text>
                        <View style={{ backgroundColor: '#F7F7F7', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                            <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 14 }}>{customerBooking && customerBooking.length}</Text>
                        </View>
                    </View>
                    {
                        customerBooking.length > 0 ? customerBooking.map((ix) => {
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
                        }) : null
                    }
                </View>
            }
        </ScrollView>
    )
}

export default BookingNotification