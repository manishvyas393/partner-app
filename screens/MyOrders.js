import { View, Text, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetCustomerInPartner, loggedUserBookings } from '../actions/BookingAction';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import OrdersHNFound from '../components/404/OrdersHNFound';
import Loader from '../components/Loader/Loader';
import { useIsFocused } from '@react-navigation/native';
import { Divider } from 'react-native-elements';


const MyOrders = ({ navigation, route }) => {
    const { bookings, error, loading } = useSelector((state) => state.getbookings);
    const { bookings: customerBooking, error: customerError, loading: customerLoading } = useSelector((state) => state.userBookings);
    // const { booked, cancelled } = route.params;
    // console.log("Booked Statement", booked)
    // console.log("Cancelled Statement", cancelled)
    const dispatch = useDispatch();
    const focused = useIsFocused();

    const [refresh, setRefresh] = useState(false)

    const pullMe = () => {
        setRefresh(true);
        dispatch(loggedUserBookings())
        setTimeout(() => {
            setRefresh(false)
        }, 1000);
    }

    let unEmployeedBooking = []
    let EmployeedBooking = []

    customerBooking && customerBooking.forEach((i) => {
        if (i.asignee.length === 0) {
            unEmployeedBooking.push(i)
        }
        else if (i.asignee.length > 0) {
            EmployeedBooking.push(i)
        }
        else {
            return null
        }
    })

    console.log(unEmployeedBooking.length, EmployeedBooking.length)

    useEffect(() => {
        if (focused) {
            dispatch(loggedUserBookings())
            dispatch(GetCustomerInPartner())
        }
    }, [dispatch, focused])

    // console.log(customerBooking)

    return (
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />} style={{ flex: 1, backgroundColor: 'white' }}>
            {
                loading ? <Loader /> : <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                    {
                        bookings.length > 0 ? bookings.map((ix) => {
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
                    <Divider />
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#5B5B5B', fontSize: 14, fontFamily: 'Montserrat_700Bold', marginVertical: 15, alignSelf: 'center' }}>Customer Booking With Asignee</Text>
                            <View style={{ backgroundColor: '#F7F7F7', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', display: 'flex', borderRadius: 50 }}>
                                <Text style={{ fontSize: 14, fontFamily: 'Montserrat_700Bold' }}>{EmployeedBooking && EmployeedBooking.length}</Text>
                            </View>
                        </View>
                        {
                            EmployeedBooking.length > 0 ? EmployeedBooking.map((ix) => {
                                return (
                                    <View key={ix._id}>
                                        <View style={{ backgroundColor: '#F4F4F4', marginBottom: 25, borderRadius: 16, padding: 1 }}>
                                            {
                                                ix.asignee && ix.asignee.map((iy) => {
                                                    return (
                                                        <View style={{ borderWidth: 4, borderColor: '#FFFFFF', borderRadius: 16 }} key={iy._id}>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <View style={{ flex: 1.07, justifyContent: 'center', marginRight: 2, position: 'relative' }}>
                                                                    <Image style={{ width: 100, height: 100, resizeMode: 'contain', borderRadius: 14 }} source={{ uri: iy.avatar.url }} />
                                                                    <Text style={{ position: 'absolute', bottom: 0, fontSize: 9, backgroundColor: '#FFFF', paddingVertical: 5, paddingHorizontal: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, fontFamily: 'Montserrat_700Bold' }}>{ix.intime} - {ix.outtime}</Text>
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
                                                                        <Text style={{ flex: 2.5, color: '#393939', fontSize: 12, fontFamily: 'Montserrat_500Medium' }}>{ix.servicename}</Text>
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
                    <Divider />
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#5B5B5B', fontSize: 14, fontFamily: 'Montserrat_700Bold', marginVertical: 15, alignSelf: 'center' }}>Customer Booking Without Asignee</Text>
                            <View style={{ backgroundColor: '#F7F7F7', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', display: 'flex', borderRadius: 50 }}>
                                <Text style={{ fontSize: 14, fontFamily: 'Montserrat_700Bold' }}>{unEmployeedBooking && unEmployeedBooking.length}</Text>
                            </View>
                        </View>
                        {
                            unEmployeedBooking.length > 0 ? unEmployeedBooking.map((ix) => {
                                return (
                                    <View key={ix._id}>
                                        <View style={{ backgroundColor: '#F4F4F4', marginBottom: 25, borderRadius: 16, padding: 1 }}>
                                            <View style={{ borderWidth: 4, borderColor: '#FFFFFF', borderRadius: 16 }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flex: 1.07, justifyContent: 'center', marginRight: 2, position: 'relative' }}>
                                                        <Image style={{ width: 100, height: 100, resizeMode: 'contain', borderRadius: 14 }} source={require('../assets/Preview.jpg')} />
                                                        <Text style={{ position: 'absolute', bottom: 0, fontSize: 9, backgroundColor: '#FFFF', paddingVertical: 5, paddingHorizontal: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, fontFamily: 'Montserrat_700Bold' }}>{ix.intime} - {ix.outtime}</Text>
                                                    </View>
                                                    <View style={{ flex: 2, paddingVertical: 10 }}>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 14, marginBottom: 0, flex: 2 }}>No Reference</Text>
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
                                        </View>
                                    </View>
                                )
                            }) : null
                        }
                    </View>
                </View>
            }
        </ScrollView>
    )
}

export default MyOrders