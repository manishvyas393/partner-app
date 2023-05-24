import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, newBookings, newSlot, rescheduleddeleteSlots } from '../actions/BookingAction';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { BOOK_NEW_APPOINTMENT_RESET, DELETE_SLOT_RESET } from '../constants/BookingConstants';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Loader from '../components/Loader/Loader';
import { getEmployeesServices, getSingleEmployee } from '../actions/EmployeeAction';
import { useIsFocused } from '@react-navigation/native';
import { deleteSlot } from '../reducers/BookingReducers';

const Reschedule = ({ route, navigation }) => {
    const { isPosted, error, loading } = useSelector((state) => state.createAppointment)
    const { error: slotError } = useSelector((state) => state.slot)
    const dispatch = useDispatch()
    const { getEmployees, loading: employeeLoading } = useSelector((state) => state.employeeDetails)
    const { employees } = useSelector((state) => state.serviceemp)
    const { isDeleted, error: deleteError } = useSelector((state) => state.deleteBooked)

    const { time, outtym, ids, day, bookedTime, customerBooked, employeeTime, name, phone, inti, outi, timestamp, serviceId, serviceid, bookId } = route.params;

    const isFocused = useIsFocused();

    console.log("bookedtime", customerBooked)

    const [intime, setIntime] = useState()
    const [price, setPrice] = useState()
    const [id, setId] = useState('')
    // const [serviceid, setServiceId] = useState('')
    console.log("EMPLOYEEID", id)

    const [outtime, setOutTime] = useState()

    const [result, setResult] = useState()
    console.log("RESULT:", result)

    // useState
    const [category, setCategory] = useState('');
    const [asignee, setAsignee] = useState('');
    const [date, setDate] = useState('')
    const [service, setService] = useState('')
    const [servicetype, setServiceType] = useState('')


    console.log("Dispatch Data", date, category, asignee, service, result, price, intime, outtime, name, phone)

    const [results, setResults] = useState([])
    console.log("RESULTS:", results)
    function intervals(startString, endString) {
        var start = moment(startString, 'hh:mm a');
        var end = moment(endString, 'hh:mm a');

        // round starting minutes up to nearest 15 (12 --> 15, 17 --> 30)
        // note that 59 will round up to 60, and moment.js handles that correctly
        start.minutes(Math.ceil(start.minutes() / 15) * 15);

        var current = moment(start);

        while (current <= end) {
            if (results.includes(current.format('hh:mm a'))) {
                return null
            }
            else {
                results.push(current.format('hh:mm a'));
                current.add(15, 'minutes');
            }
        }


        return results;
    }

    console.log(date, "Date")

    console.log(timestamp, "answer")

    var selectedTime = time;
    var currentTime = new Date();
    console.log("x", currentTime)
    var selectedTimeStamp = (timestamp.getMonth() + 1) + "/" + timestamp.getDate() + "/" + timestamp.getFullYear() + " " + selectedTime;
    var uservalue = new Date(selectedTimeStamp);
    console.log("user Input", uservalue, "Current value", currentTime)



    // dispatching bookings
    const handleBookings = () => {
        if (bookedTime.some(r => result.includes(r)) || customerBooked.some(r => result.includes(r))) {
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Already Booked',
                button: 'close'
            })
        }
        if (uservalue < currentTime) {
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Bookings Not Allowed',
                button: 'close'
            })
        }
        if (result.every(x => results.includes(x))) {
            console.log(id, "serviceid")
            dispatch(newBookings(date, category, asignee, service, result, price, intime, outtime, name, phone, servicetype, serviceid))
            // dispatch(deleteSlot(id))
            // dispatch(newSlot(date, asignee, service, result))
        }
        else {
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Service Time Outside of The Slot',
                button: 'close'
            })
        }
    }

    useEffect(() => {
        if (outtym) {
            setOutTime(outtym)
        }
        if (day) {
            setDate(day)
        }
        if (ids) {
            setAsignee(ids)
        }
        if (time) {
            setIntime(time)
        }
        if (employeeTime) {
            setResult(employeeTime)
        }
        if (slotError) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: slotError,
                button: 'close'
            })
            dispatch(clearErrors)
        }
        if (isPosted) {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: "Booked Successfully",
                button: 'close'
            })
            dispatch({
                type: BOOK_NEW_APPOINTMENT_RESET
            })
            dispatch(rescheduleddeleteSlots(bookId))
            setTimeout(() => {
                navigation.navigate('Home')
            }, 2000);
        }
        if (isDeleted) {
            dispatch({
                type: DELETE_SLOT_RESET
            })
        }
        if (error) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: error,
                button: 'close'
            })
            dispatch(clearErrors())
        }
        intervals(inti, outi)
        if (serviceId) {
            setId(serviceId)
            // setServiceId(serviceId)
        }
        if (employees) {
            setCategory(employees.category)
            setService(employees.servicename)
            setServiceType(employees.servicetype)
            setPrice(employees.price)
        }
        else {
            dispatch(getEmployeesServices(id))
            dispatch(getSingleEmployee(id))
        }
    }, [dispatch, intervals, slotError, error, isPosted, serviceId, id, isDeleted])


    useEffect(() => {
        if (isFocused || id) {
            dispatch(getSingleEmployee(id))
        }
    }, [dispatch, isFocused, id])

    console.log("EMPLOYEES:", getEmployees)
    return (
        <>
            {
                loading ? <Loader /> :
                    <>
                        <ScrollView style={{ flex: 1, backgroundColor: 'white', }}>
                            <View style={{ alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center', backgroundColor: '#EBEBEB', paddingHorizontal: 20, paddingVertical: 8, marginBottom: 10, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}>
                                <FontAwesome name='calendar' size={18} />
                                <Text style={{ marginRight: 10, marginLeft: 10, fontFamily: 'Montserrat_700Bold', color: '#5B5B5B' }}>Booking Date: {date}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginHorizontal: 20 }}>
                                <MaterialIcons size={19} name='category' style={{ marginRight: 6 }} />
                                <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 14 }}>Category:</Text>
                                <Text style={{ fontFamily: 'Montserrat_700Bold', fontSize: 14, marginLeft: 8 }}>{servicetype} / {category.length > 22 ? category.slice(0, 22) + '...' : category}</Text>
                            </View>
                            <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                                <View style={{ marginVertical: 0, backgroundColor: '#F8F8F8', alignItems: 'center', borderWidth: 1, borderColor: '#EBEBEB', borderRadius: 16, padding: 0 }}>
                                    <View style={{ flexDirection: 'row', borderWidth: 4, borderColor: '#FFFF', borderRadius: 16 }}>
                                        <View style={{ flex: 0.7 }}>
                                            {
                                                !getEmployees || !getEmployees.avatar ? null : <Image style={{ width: 82, height: 82, resizeMode: 'contain', borderRadius: 15 }} source={{ uri: getEmployees.avatar.url }} />
                                            }
                                        </View>
                                        <View style={{ flex: 1.8, marginTop: 6 }}>
                                            {
                                                !getEmployees ? null : <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 14, marginBottom: 3, color: '#2B2B2B' }}>{getEmployees.firstname} {getEmployees.lastname}</Text>
                                            }
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Entypo name='clock' style={{ marginRight: 6 }} size={11} />
                                                <Text style={{ fontSize: 11, color: '#5B5B5B', fontFamily: 'Montserrat_700Bold' }}>{time} - {outtime}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text style={{ borderWidth: 1, borderColor: '#7A7A7A', alignSelf: 'flex-start', paddingVertical: 3, paddingHorizontal: 10, marginTop: 8, color: '#7A7A7A', fontFamily: 'Montserrat_500Medium', fontSize: 12, borderRadius: 5, textTransform: 'capitalize' }}>{service}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 12 }}>Total</Text>
                                                    <Text style={{ marginLeft: 6, marginRight: 10, fontFamily: 'Montserrat_700Bold', color: '#5B5B5B', fontSize: 15, paddingVertical: 3 }}>₹{price}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ paddingVertical: 0, paddingHorizontal: 0, marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 16 }}>Customer Details</Text>
                                    <View style={{ marginTop: 20 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <FontAwesome style={{ marginRight: 10, flex: 0.3 }} name='user' size={18} />
                                            <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 14, flex: 5 }}>{name}</Text>
                                        </View>
                                        <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
                                            <IonIcons style={{ marginRight: 10, flex: 0.3 }} name='call' size={18} />
                                            <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 14, flex: 5 }}>{phone}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                        <TouchableOpacity style={{ backgroundColor: '#232323', paddingHorizontal: 20, paddingVertical: 18 }} onPress={() => handleBookings()}>
                            <Text style={{ color: 'white', fontFamily: 'Montserrat_700Bold', fontSize: 20, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>Book Now</Text>
                        </TouchableOpacity>
                    </>
            }
        </>
    )
}
export default Reschedule