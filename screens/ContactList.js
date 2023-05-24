import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loggedUserBookings } from '../actions/BookingAction';
import { useIsFocused } from '@react-navigation/native';
import { Divider } from 'react-native-paper';
import call from 'react-native-phone-call'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useState } from 'react';
import Loader from '../components/Loader/Loader'
import CustomerDetailsNFound from '../components/404/CustomerDetailsNFound';

const ContactList = () => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused()
    const { bookings, error, loading } = useSelector((state) => state.getbookings);

    console.log("Length", bookings.length);
    const [contact, setContact] = useState("")
    console.log(contact)

    const args = {
        number: contact.toString(),
        prompt: true,
    };
    // Make a call
    if (contact) {
        call(args).catch(console.error);
    }

    useEffect(() => {
        if (isFocused) {
            dispatch(loggedUserBookings())
        }
    }, [dispatch, isFocused])


    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white', flex: 1 }}>
            {
                loading ? <Loader /> : <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
                    {
                        bookings && bookings.length > 0 ? bookings.map((x) => {
                            return (
                                <View style={{ marginBottom: 6 }} key={x._id}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View>
                                            <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat_600SemiBold', fontSize: 14, marginBottom: 6 }}>{x.clientname}</Text>
                                            <Text style={{ color: '#2B2B2B', fontFamily: 'Montserrat_500Medium', fontSize: 12, marginBottom: 10 }}>{x.contact}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => setContact(x.contact)}>
                                            <AntDesign name='phone' size={28} />
                                        </TouchableOpacity>
                                    </View>
                                    <Divider />
                                </View>
                            )
                        }) : <CustomerDetailsNFound />
                    }
                </View>
            }
        </ScrollView>
    )
}

export default ContactList