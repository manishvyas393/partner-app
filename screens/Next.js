import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { registerBookingUser } from '../actions/UserAction';
import { REGISTER_PARTNERS_BOOKING_RESET } from '../constants/UserConstants';


const Next = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const { isPosted, error, loading } = useSelector((state) => state.customerUserRegister)
    const { time, expectedTime, date, id, bookedTime, inti, outi, timestamp, customerBooked, serviceId, cameFrom, bookingId } = route.params;

    console.log("RECEIVING PROPS:", time, expectedTime, date, id, bookedTime, inti, outi, timestamp, customerBooked, serviceId)

    const [outtime, setOutTime] = useState('')
    console.log("Outtime", outtime)
    const [outminus, setOutMinus] = useState('')
    console.log(outminus)


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
    console.log("RESULT", result)

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('')
    console.log(name, phone)

    const registerUser = () => {
        dispatch(registerBookingUser(name, phone))
    }

    useEffect(() => {
        if (expectedTime) {
            var travelTime = moment(time, ["hh:mm A"]).add(expectedTime, 'minutes').format('hh:mm A');// it will add 11 mins in the current time and will give time in 03:35 PM format; can use m or minutes 
            console.log('Expected Time', travelTime)
            setOutTime(travelTime)
        }
        if (outtime) {
            var minusTime = moment(outtime, ["hh:mm A"]).subtract(15, 'minutes').format('hh:mm A');// it will add 11 mins in the current time and will give time in 03:35 PM format; can use m or minutes 
            console.log('MinusTime', minusTime)
            setOutMinus(minusTime)
        }
        intervals(time, outminus);
        if (isPosted) {
            dispatch({
                type: REGISTER_PARTNERS_BOOKING_RESET
            })
            navigation.navigate('Booking', {
                time: time,
                outtym: outminus,
                ids: id,
                bookedTime: bookedTime,
                customerBooked: customerBooked,
                name: name,
                phone: phone,
                employeeTime: result,
                inti: inti,
                outi: outi,
                timestamp: timestamp,
                serviceId: id,
                day: date,
                serviceid: serviceId
            })
        }
    }, [expectedTime, intervals, isPosted, dispatch])


    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 20 }}>
                {/* TEXT INPUT  */}
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 15, marginBottom: 14 }}>Customer Details</Text>
                    <TextInput theme={{
                        roundness: 5,
                        colors: {
                            primary: "#BABABA",
                        },
                        fonts: {
                            regular: {
                                fontFamily: 'Montserrat_400Regular'
                            }
                        }
                    }}
                        outlineColor='#BABABA'
                        style={styles.Input}
                        autoCapitalize='words'
                        mode="outlined"
                        value={name}
                        onChangeText={text => setName(text)}
                        label="Name" />
                    <TextInput theme={{
                        roundness: 5,
                        colors: {
                            primary: "#BABABA",
                        },
                        fonts: {
                            regular: {
                                fontFamily: 'Montserrat_400Regular'
                            }
                        }
                    }}
                        outlineColor='#BABABA'
                        style={styles.Input}
                        keyboardType='numeric'
                        autoCapitalize='words'
                        mode="outlined"
                        value={phone}
                        onChangeText={text => setPhone(text)}
                        label="Phone Number" />
                </View>
                {/* TEXT INPUT */}
            </ScrollView>
            <View>
                {
                    cameFrom === 'OrderDetails' ? <View>
                        {
                            !name || !phone ? null : <TouchableOpacity onPress={() => navigation.navigate('Reschedule', {
                                time: time,
                                outtym: outminus,
                                ids: id,
                                bookedTime: bookedTime,
                                customerBooked: customerBooked,
                                name: name,
                                phone: phone,
                                employeeTime: result,
                                inti: inti,
                                outi: outi,
                                timestamp: timestamp,
                                serviceId: id,
                                day: date,
                                serviceid: serviceId,
                                bookId: bookingId
                            })} style={{ marginVertical: 0, backgroundColor: '#232323', paddingHorizontal: 40, paddingVertical: 20 }}>
                                <Text style={{ color: 'white', fontFamily: "Montserrat_700Bold", alignSelf: 'center', fontSize: 16 }}>CONTINUE</Text>
                            </TouchableOpacity>
                        }
                    </View> : <View>
                        {
                            !name || !phone ? null : <TouchableOpacity onPress={() => registerUser()} style={{ marginVertical: 0, backgroundColor: '#232323', paddingHorizontal: 40, paddingVertical: 20 }}>
                                <Text style={{ color: 'white', fontFamily: "Montserrat_700Bold", alignSelf: 'center', fontSize: 16 }}>{loading ? "PLEASE WAIT..." : "CONTINUE"}</Text>
                            </TouchableOpacity>
                        }
                    </View>
                }
            </View>
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
})

export default Next