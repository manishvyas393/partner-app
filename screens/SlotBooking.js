import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllSlot, getCustomerAllSlot } from '../actions/BookingAction';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import moment from 'moment';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Loader from '../components/Loader/Loader';
import { useIsFocused } from '@react-navigation/native';

const SlotBooking = ({ route, navigation }) => {
    const { intime, outtime, id, serviceId, expectedTime,cameFrom,bookingId } = route.params;
    console.log("First Screen", intime, outtime, id, serviceId, expectedTime)
    console.log('SERVICE ID', serviceId, "ID", id)

    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const { bookedTime, error: asBooked, loading: asBookLoader } = useSelector((state) => state.getSlots)
    const { bookedTime: customerBooked } = useSelector((state) => state.customerslot)

    const [hour, setHour] = useState()


    // DATE PICKER
    var todayDate = moment(new Date()).format("DD/MM/YYYY")

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(todayDate);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    console.log(date, "date")

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    var currentTime = new Date();
    var selectedTimeStamp = (currentTime.getMonth() + 1) + "/" + currentTime.getDate() + "/" + currentTime.getFullYear() + " " + "12:00 pm";
    var uservalue = new Date(selectedTimeStamp);
    console.log(uservalue)

    const [timestamp, setTimeStamp] = useState(uservalue)

    const handleConfirm = (dates) => {
        var d = dates;
        setTimeStamp(d)
        const number = moment(d).format("DD/MM/YYYY");
        setDate(number)
        hideDatePicker();
        dispatch(getAllSlot(id, number))
    };

    console.log("Data", timestamp)


    const [result, setResult] = useState([])

    function intervals(startString, endString) {
        var start = moment(startString, 'hh:mm a');
        var end = moment(endString, 'hh:mm a');

        // round starting minutes up to nearest 15 (12 --> 15, 17 --> 30)
        // note that 59 will round up to 60, and moment.js handles that correctly
        start.minutes(Math.ceil(start.minutes() / 15) * 15);

        var current = moment(start);

        while (current <= end) {
            if (result.includes(current.format('hh:mm a'))) {
                return null
            }
            else {
                result.push(current.format('hh:mm a'));
                current.add(15, 'minutes');
            }
        }


        return result;
    }

    intervals(intime, outtime);


    console.log("CUSTOMER BOOKING", customerBooked)

    useEffect(() => {
        if (isFocused) {
            dispatch(getCustomerAllSlot(id, date))
            dispatch(getAllSlot(id, date))
        }
        if (expectedTime) {
            setHour(expectedTime)
        }
    }, [dispatch, id, date, isFocused, expectedTime])

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: 'white' }}>
                {/* SLOT BOOKING CODE */}
                <View style={{ alignItems: 'center', marginVertical: 20 }}>
                    <View style={{ alignSelf: 'center' }}>
                        {/* DatePicker Goes Here */}
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: '#C8C8C8', borderWidth: 1, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#EBEBEB', borderRadius: 5 }} onPress={showDatePicker}>
                            <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 15 }}>{date}</Text>
                            <FontAwesome5 style={{ marginLeft: 15 }} name='chevron-down' size={18} />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            isDarkModeEnabled={true}
                        />
                    </View>
                </View>
                {
                    asBookLoader ? <Loader /> : <View style={styles.container}>
                        {
                            result.length > 0 && result.map((time, i) => {
                                return (
                                    bookedTime.includes(time) || customerBooked.includes(time) ?
                                        <TouchableOpacity style={styles.items} key={i}>
                                            <Text style={{ paddingVertical: 10, fontFamily: 'Montserrat_600SemiBold', fontSize: 12, color: 'white' }}>{time}</Text>
                                        </TouchableOpacity>
                                        : <TouchableOpacity onPress={() => navigation.navigate('Slots', {
                                            time: time,
                                            id: id,
                                            date: date,
                                            bookedTime: bookedTime,
                                            customerBooked: customerBooked,
                                            inti: intime,
                                            outi: outtime,
                                            timestamp: timestamp,
                                            serviceId: serviceId,
                                            expectedTime: hour,
                                            cameFrom: cameFrom,
                                            bookingId: bookingId
                                        })} style={styles.item} key={i}>
                                            <Text style={{ paddingVertical: 10, fontFamily: 'Montserrat_600SemiBold', fontSize: 12, color: '#757575' }}>{time}</Text>
                                        </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                }
                {/* SLOT BOOKING CODE */}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    Input: {
        backgroundColor: 'white',
        fontFamily: 'Montserrat_400Regular',
        marginVertical: 0,
        fontSize: 16,
        marginBottom: 20
    },
    dropdown1RowStyle: { backgroundColor: '#FFFFF', borderBottomColor: '#F7F7F7' },
    dropdown1DropdownStyle: { backgroundColor: '#FFFF', borderRadius: 5, width: "50%" },
    dropdown1RowTxtStyle: { color: '#444', fontSize: 14, fontFamily: 'Montserrat_500Medium' },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center', // if you want to fill rows left to right,
        justifyContent: 'center',
        marginBottom: 20
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%', // is 50% of container width
        marginVertical: 10,
        backgroundColor: '#EBEBEB',
        marginHorizontal: 5,
        borderRadius: 5
    },
    items: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%', // is 50% of container width
        marginVertical: 10,
        backgroundColor: '#565656',
        marginHorizontal: 5,
        borderRadius: 5
    },
})

export default SlotBooking;