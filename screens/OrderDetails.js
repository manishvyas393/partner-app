import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, deleteSlots, getBookingDetails, updateBookingStatus } from '../actions/BookingAction';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import Loader from '../components/Loader/Loader';
import { Divider } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { DELETE_SLOT_RESET } from '../constants/BookingConstants';
import moment from 'moment';

const OrderDetails = ({ route, navigation }) => {
    const { booking, error, loading } = useSelector((state) => state.bookingDetails)
    const { isPosted, error: updateError, loading: updateLoading } = useSelector((state) => state.cancellation)
    const { isDeleted, error: deleteError } = useSelector((state) => state.deleteBooked)

    console.log(booking.serviceid, 'bbooked');

    let time;
    let endTime;

    booking.asignee && booking.asignee.forEach((i) => {
        time = i.intime;
        endTime = i.outtime
    })

    console.log(booking._id, "BOOKINGID")

    console.log(time, endTime)

    let asign = booking.asignee;
    // USESTATE CANCELLED REQUEST
    const [employee, setEmployee] = useState([])
    console.log(employee)
    const [date, setDate] = useState()
    const [category, setCategory] = useState()
    const [asignee, setAsignee] = useState()
    const [service, setService] = useState()
    const [price, setPrice] = useState()
    const [intime, setInTime] = useState()
    const [outtime, setOutTime] = useState()
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [servicetype, setServiceType] = useState()
    const [serviceid, setServiceId] = useState()
    const [nail, setNail] = useState()


    let ids;

    console.log(date, category, asignee, service, price, intime, outtime, name, phone)

    const dispatch = useDispatch()
    const { id } = route.params;
    console.log(id)

    const handleCancel = () => {
        // dispatch(updateBookingStatus())
        dispatch(deleteSlots(id))
    }


    // let inTiming = booking && booking.outtime;
    // console.log(inTiming, 'Inner Time')
    // let newDate = bookings && bookings.selectedDate;

    // let n = new Date(newDate)

    // let now = new Date();
    // console.log(now, 'new Timestamp')
    // let dt = (n.getMonth() + 1) + "/" + n.getDate() + "/" + n.getFullYear() + " " + intime;
    // let enddate = new Date(dt)

    // if (enddate > now) {
    //     console.log('TRUE')
    // }
    // else {
    //     console.log('FALSE')
    // }

    useEffect(() => {
        if (error) {
            // Dialog.show({
            //     type: ALERT_TYPE.DANGER,
            //     title: 'Error',
            //     textBody: error,
            //     button: 'close'
            // })
            dispatch(clearErrors)
        }
        if (updateError) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: updateError,
                button: 'close'
            })
            dispatch(clearErrors)
        }
        if (deleteError) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: deleteError,
                button: 'close'
            })
            dispatch(clearErrors)
        }
        if (isDeleted) {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: "Order Cancelled Successfull",
                button: 'close'
            })
            dispatch(updateBookingStatus(date, category, asignee, service, price, intime, outtime, name, phone, servicetype, serviceid, nail))
            dispatch({
                type: DELETE_SLOT_RESET
            })
            navigation.navigate('Orders')
        }
        if (asign) {
            setEmployee(asign)
        }
        if (employee) {
            employee.forEach((ix) => {
                ids = ix._id
            })
        }
        if (booking && booking._id !== id) {
            dispatch(getBookingDetails(id))
        }
        else {
            setDate(booking.date)
            setCategory(booking.category)
            setAsignee(ids)
            setService(booking.service)
            setPrice(booking.price)
            setInTime(booking.intime)
            setOutTime(booking.outtime)
            setName(booking.name)
            setPhone(booking.phone)
            setServiceType(booking.servicetype)
            setNail(booking.nail)
            setServiceId(booking.serviceid)
        }
    }, [booking, dispatch, id, error, employee, updateError, deleteError, isDeleted])

    let dateDifference;

    useEffect(() => {
        if (intime || outtime) {
            var travelTime = moment(outtime, ["hh:mm A"]).add(15, 'minutes').format('hh:mm A');
            dateDifference = moment.utc(moment(travelTime, "HH:mm:ss").diff(moment(intime, "HH:mm:ss"))).format("mm")
            console.log(dateDifference, intime, outtime, "mmmm")
        }
    }, [intime, outtime])


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {
                loading ? <Loader /> : <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center', backgroundColor: '#EBEBEB', paddingHorizontal: 20, paddingVertical: 8, marginBottom: 10, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}>
                        <FontAwesome name='calendar' size={18} />
                        <Text style={{ marginRight: 10, marginLeft: 10, fontFamily: 'Montserrat_700Bold', color: '#5B5B5B' }}>Booking Date: {booking.date}</Text>
                    </View>
                    {
                        booking.nail ? <Text style={{ marginHorizontal: 20, backgroundColor: '#EDE7F2', alignSelf: 'flex-start', paddingHorizontal: 20, paddingVertical: 3, borderRadius: 50, fontFamily: 'Montserrat_700Bold', fontSize: 14, color: '#725593' }}>{booking.nail}</Text> : null
                    }
                    <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                        <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
                            <Text style={{ alignSelf: 'center', borderColor: '#EBEBEB', borderWidth: 1, fontSize: 12, fontFamily: 'Montserrat_600SemiBold', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 5 }}>{booking.servicetype}</Text>
                        </View>
                        {
                            booking.asignee && booking.asignee.map((emp) => {
                                return (
                                    <View style={{ flexDirection: 'row' }} key={emp._id}>
                                        <View style={{ flex: 1 }}>
                                            <Image style={{ width: 98, height: 98, resizeMode: 'contain', borderRadius: 50 }} source={{ uri: emp.avatar.url }} />
                                        </View>
                                        <View style={{ flex: 2 }}>
                                            <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 18, marginBottom: 5 }}>{emp.firstname} {emp.lastname}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                                                <MaterialIcons size={12} name='category' style={{ marginRight: 6 }} />
                                                <Text style={{ fontFamily: 'Montserrat_500Medium' }}>{booking.category.length > 23 ? booking.category.slice(0, 23) + '...' : booking.category}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                                                <SimpleIcon size={12} name='settings' style={{ marginRight: 6 }} />
                                                <Text style={{ fontFamily: 'Montserrat_500Medium' }}>{booking.service}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                                                <MaterialCommunityIcon name='camera-timer' style={{ marginRight: 6 }} size={12} />
                                                <Text style={{ fontFamily: 'Montserrat_500Medium' }}>{booking.intime} - {booking.outtime}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <Divider />
                    <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
                        <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 16 }}>Customer Details</Text>
                        <View style={{ marginTop: 14, flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome style={{ flex: 0.4 }} name='user' size={18} />
                            <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 14, flex: 5 }}>{booking.name}</Text>
                        </View>
                        <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
                            <IonIcons style={{ flex: 0.4 }} name='call' size={18} />
                            <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 14, flex: 5 }}>{booking.phone}</Text>
                        </View>
                    </View>
                    <Divider />
                    <View style={{ marginHorizontal: 20, marginVertical: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 16 }}>Total</Text>
                        <Text style={{ fontFamily: 'Montserrat_700Bold', color: '#5B5B5B', fontSize: 16 }}>₹{booking.price}</Text>
                    </View>
                    <Divider />
                    {
                        booking.status === 'Cancelled' ? null :
                            <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('stylist', {
                                    // intime: time,
                                    // outtime: endTime,
                                    // id: asignee,
                                    // expectedTime: dateDifference,
                                    cameFrom: 'OrderDetails',
                                    id: booking && booking.serviceid,
                                    bookingId: booking && booking._id
                                })} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialIcons name='schedule' size={20} />
                                    <Text style={{ marginLeft: 5, color: '#2B2B2B', fontFamily: 'Montserrat_600SemiBold', fontSize: 16 }}>ReSchedule</Text>
                                </TouchableOpacity>
                            </View>
                    }
                    <Divider />
                    {
                        booking.price === "0" ? <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat_600SemiBold', fontSize: 14, marginLeft: 15, marginTop: 15 }}>Note: Price will be Discussed at the Salon.</Text> : null
                    }
                </ScrollView>
            }
            {
                booking.status === 'Cancelled' ? null : <TouchableOpacity onPress={() => handleCancel()} style={{ marginHorizontal: 20, marginVertical: 30, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <MaterialCommunityIcon style={{ marginRight: 8 }} name='cancel' size={18} />
                    <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat_600SemiBold', fontSize: 16 }}>Cancel Order</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default OrderDetails