import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import FooterTabs from '../components/Nav/FooterTabs'
import { useDispatch, useSelector } from 'react-redux'
import { ALERT_TYPE, Dialog } from "react-native-alert-notification"
import { clearErrors, saloonNameIndivi } from '../actions/UserAction'
import { loggedUserEmployees } from '../actions/EmployeeAction'
import { getLoggedService, loggedUserSaloon } from '../actions/ServicesAction'
import { customerBooked, GetComingUpBookings, getLoggedServiceEmployee, getServiceName, loggedUserBookings, partnerBooked } from '../actions/BookingAction'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeNFound from '../components/404/HomeNFound'
import { Divider, RadioButton } from 'react-native-paper';
import Loader from '../components/Loader/Loader'
import { useIsFocused } from '@react-navigation/native'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Home = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { bookings } = useSelector((state) => state.getbookings)
    const { saloon } = useSelector((state) => state.saloonname)
    const { servicename: subCategories, loading: subLoading } = useSelector((state) => state.serviceNaam)
    console.log("XYZ", subCategories.length)
    const focused = useIsFocused()
    console.log(bookings.length)
    const { employee } = useSelector((state) => state.getLoggedEmp)
    const { arr, serviceEmployee, loading } = useSelector((state) => state.employeeservice)
    const { error: serviceError, services, loading: LoadingCategory } = useSelector((state) => state.getLoggedServ)

    const { booking: partnerBooking, error: partnerError, loading: partnerLoading } = useSelector((state) => state.partnerBooking)
    const { bookings: customerBooking, error: customerError, loading: customerLoading } = useSelector((state) => state.customerBooking)

    const { upcoming } = useSelector((state) => state.comingUp)

    const [serviceId, setServiceId] = useState('')

    // BOOKED FILTER useState
    const [booked, setBooked] = useState("Booked")
    const [cancelled, setCancelled] = useState("Cancelled")

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    const [currentDate, setCurrentDate] = useState(today)
    console.log("selected Date", currentDate)
    const dispatch = useDispatch();
    const { error, user } = useSelector((state) => state.auth)

    if (!user) {
        navigation.navigate('Login')
    }

    const [maincategory, setMainCategory] = useState([])
    console.log(maincategory)


    // CATEGORIES
    const [servicetype, setServiceType] = useState('')
    console.log("category", servicetype)
    if (services.length > 0) {
        services && services.map((item) => {
            if (maincategory.includes(item.servicetype)) {
                return null;
            }
            else {
                maincategory.push(item.servicetype)
            }
        })
    }


    let othIndex;
    if (maincategory.length > 0) {
        othIndex = maincategory[0]
    }

    // console.log("INDEX VALUE", othIndex)

    const onchange = (value) => {
        // console.log("VALUE", value)
        if (!value) {
            // console.log("NOTHING HAPPENS!")
            setServiceType(othIndex)
        }
        else {
            setServiceType(value)
        }
        setAccordion(-1)
        setServiceId()
    }

    const [refresh, setRefresh] = useState(false)
    const [load, setLoad] = useState(true)

    const filterData = () => {
        setRefresh(true);
        dispatch(getLoggedServiceEmployee(servicetype))
        setTimeout(() => {
            setRefresh(false)
        }, 2000);
    }


    // ACCORDION CODE
    let servicenames = []
    if (serviceEmployee.length > 0) {
        serviceEmployee && serviceEmployee.map((items) => {
            if (servicenames.includes(items.category)) {
                return null
            }
            else {
                servicenames.push(items.category)
            }
        })
    }
    const [accordion, setAccordion] = useState(-1)

    const toggleAccordion = (index, category) => {
        console.log("RETURNING THROUGH A FUNCTION:", category, servicetype)
        if (index === accordion) {
            setAccordion(-1)
            return
        }
        setAccordion(index)
        if (servicetype || category) {
            dispatch(getServiceName(servicetype, category))
        }
        setServiceId()
    }
    // ACCORDION CODE ENDS HERE

    let cancelledorder = []
    let BookedOrder = []
    // console.log(BookedOrder.length)

    bookings && bookings.map(x => {
        if (x.status === 'Cancelled') {
            cancelledorder.push(x.status)
        }
    })

    bookings && bookings.map(y => {
        if (y.status === 'Booked') {
            BookedOrder.push(y.status)
        }
    })


    useEffect(() => {
        if (servicetype) {
            dispatch(getLoggedServiceEmployee(servicetype))
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
        if (focused) {
            dispatch(getLoggedService())
            dispatch(loggedUserEmployees())
            dispatch(loggedUserBookings())
            dispatch(loggedUserSaloon())
        }
    }, [dispatch, error, servicetype, focused])

    useEffect(() => {
        if (othIndex || maincategory) {
            onchange()
        }
    }, [othIndex, maincategory])

    console.log("CUSTOMER BOOKING", partnerBooking.length)
    console.log("PARTNER BOOKING", customerBooking.length)

    let totalBooking;

    if (partnerBooking || customerBooking) {
        totalBooking = partnerBooking.length + customerBooking.length
    }

    // console.log("TOTAL BOOKING", saloon[0].shopname)

    useEffect(() => {
        dispatch(partnerBooked())
        dispatch(customerBooked())
        dispatch(GetComingUpBookings())
        dispatch(saloonNameIndivi())
    }, [dispatch])


    // console.log("SERVICES ID:", serviceId)

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => filterData()} />} showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white', marginTop: insets.top, flex: 1 }}>
                <View>
                    <View style={{ marginHorizontal: 20, marginTop: 25 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            {
                                saloon && saloon.length > 0 ? saloon.map((i) => {
                                    return (
                                        <View key={i._id}>
                                            <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 20 }}>Hey, {i.shopname.length > 20 ? i.shopname.slice(0, 20) + "..." : i.shopname}</Text>
                                        </View>
                                    )
                                }) : <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 20 }}>Hey,</Text>
                            }
                            <TouchableOpacity onPress={() => navigation.navigate('BookingNotification')}>
                                <Ionicons name='notifications' size={28} />
                                <View style={{ backgroundColor: '#EB1D36', width: 20, height: 20, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', borderRadius: 50, position: 'absolute', right: 0, top: -10 }}>
                                    <Text style={{ fontSize: 12, fontFamily: 'Montserrat_600SemiBold', color: 'white' }}>{totalBooking}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Orders', {
                                    booked: booked
                                })} style={styles.OrdersBox}>
                                    {
                                        bookings && <>
                                            <Text style={styles.headerText}>{BookedOrder.length}</Text>
                                            <Text style={styles.paraText}>Bookings</Text>
                                        </>
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('comingup')} style={styles.OrdersBox}>
                                    <Text style={styles.headerText}>{upcoming && upcoming.length}</Text>
                                    <Text style={styles.paraText}>Coming Up</Text>
                                </TouchableOpacity>
                                <View style={styles.OrdersBox}>
                                    {
                                        bookings && <>
                                            <Text style={styles.headerText}>{cancelledorder.length}</Text>
                                            <Text style={styles.paraText}>Cancelled</Text>
                                        </>
                                    }
                                </View>
                                <View style={styles.OrdersBox}>
                                    <Text style={styles.headerText}>0</Text>
                                    <Text style={styles.paraText}>In Progress</Text>
                                </View>
                                <View style={styles.OrdersBox}>
                                    <Text style={styles.headerText}>0</Text>
                                    <Text style={styles.paraText}>Completed</Text>
                                </View>
                                <View style={styles.OrdersBox}>
                                    {
                                        services && <>
                                            <Text style={styles.headerText}>{services.length}</Text>
                                            <Text style={styles.paraText}>Total Service</Text>
                                        </>
                                    }
                                </View>
                            </View>
                        </ScrollView>
                        {/* CHANGE IN CODE */}
                        <View style={{ marginVertical: 10 }}>
                            <RadioButton.Group onValueChange={(value) => onchange(value)} value={servicetype}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }}>
                                    {
                                        maincategory && maincategory.length > 0 ?
                                            maincategory.map((x, i) => {
                                                return (
                                                    <View style={{ marginRight: 20 }} key={i}>
                                                        <RadioButton.Item status={
                                                            x === servicetype ? 'checked' : 'unchecked'
                                                        } label={x} labelStyle={{ fontFamily: 'Montserrat_500Medium', fontSize: 13, color: '#2B2B2B' }} color='#CFCFCF' style={{ padding: 0, margin: 0, backgroundColor: '#F1F1F1', borderRadius: 50, paddingHorizontal: 20, height: 43 }} uncheckedColor='white' value={x} />
                                                    </View>
                                                )
                                            })
                                            : <Text style={{ color: 'white', fontFamily: 'Montserrat_500Medium', fontSize: 13, marginHorizontal: 20 }}>No Category To Show...</Text>
                                    }
                                </ScrollView>
                            </RadioButton.Group>
                        </View>
                        {
                            loading ? null : <View style={styles.accordionContainer}>
                                {
                                    !servicetype ? <HomeNFound /> : <View style={styles.accordionFaq}>
                                        {
                                            servicenames && servicenames.length > 0 ? servicenames.map((item, index) => {
                                                return (
                                                    <TouchableOpacity onPress={() => toggleAccordion(index, item)} key={index} style={{ backgroundColor: '#F3F3F3', marginTop: 15, paddingHorizontal: 15, paddingVertical: 8, borderRadius: 10 }}>
                                                        {/* <View > */}
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, }}>
                                                            <View style={styles.accordionFaqHeading}>
                                                                <Text style={accordion === index ? styles.active : styles.noActive}>{item}</Text>
                                                            </View>
                                                            <View>
                                                                {
                                                                    accordion === index ? <View>
                                                                        <Entypo name='chevron-up' size={20} color='#2B2B2B' style={styles.verticle} />
                                                                    </View> : accordion !== index ? <View>
                                                                        <Entypo name='chevron-down' size={20} color='#2B2B2B' style={styles.verticle} />
                                                                    </View> : null
                                                                }
                                                            </View>
                                                        </View>
                                                        {/* </View> */}
                                                        <View>
                                                            <View style={accordion === index ? styles.active : styles.InActive}>
                                                                {
                                                                    subLoading ? <ActivityIndicator size="large" style={{ marginVertical: 10 }} color="#000" /> : <View>
                                                                        {
                                                                            subCategories && subCategories.length > 0 ? subCategories.map((service) => {
                                                                                return (
                                                                                    <View key={service._id}>
                                                                                        <RadioButton.Group onValueChange={newValue => {
                                                                                            setServiceId(newValue)
                                                                                        }} value={serviceId}>
                                                                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                                                    <RadioButton value={service._id} color='#2B2B2B' />
                                                                                                    <Text style={{ color: '#2B2B2B', fontSize: 14, fontFamily: 'Montserrat_500Medium', textTransform: 'capitalize' }}>{service.servicename}</Text>
                                                                                                </View>
                                                                                            </View>
                                                                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                                                <Text style={{ color: '#858585', fontFamily: 'Montserrat_500Medium', fontSize: 12, marginBottom: 10, marginLeft: 35 }}>{service.hour} min</Text>
                                                                                                <Text style={{ color: '#858585', fontFamily: 'Montserrat_500Medium', fontSize: 12, marginBottom: 10 }}>{service.about ? service.about.split(",")[1] : null}</Text>
                                                                                                <Text style={{ color: '#4D4D4D', fontFamily: 'Montserrat_600SemiBold', fontSize: 13, marginBottom: 10 }}>{service.price === "0" ? "Custom" : service.price + "₹"}</Text>
                                                                                            </View>
                                                                                        </RadioButton.Group>
                                                                                    </View>
                                                                                )
                                                                            }) : null
                                                                        }
                                                                    </View>
                                                                }
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            }) : null
                                        }
                                    </View>
                                }
                            </View>
                        }
                    </View>
                </View>
            </ScrollView>
            <View style={{ marginVertical: 25 }}>
                {
                    !serviceId ? null : <TouchableOpacity onPress={() => navigation.navigate('stylist', {
                        id: serviceId
                    })} style={{ backgroundColor: '#2B2B2B', paddingVertical: 12, paddingHorizontal: 30, alignSelf: 'center', borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontFamily: 'Montserrat_500Medium', fontSize: 13 }}>CONTINUE</Text>
                        <Ionicons name='arrow-forward' style={{ marginLeft: 5 }} size={18} color='white' />
                    </TouchableOpacity>
                }
            </View>
            {
                LoadingCategory ? <ActivityIndicator size="large" style={{ marginVertical: 10 }} color="#000" /> : <FooterTabs />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    OrdersBox: {
        backgroundColor: '#F2F2F2',
        width: 120,
        marginRight: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingTop: 20,
        paddingBottom: 20
    },
    headerText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 18,
        marginBottom: 5,
        color: '#5C5C5C'
    },
    paraText: {
        fontFamily: 'Montserrat_500Medium',
        fontSize: 12,
        color: '#000000'
    },
    Input: {
        backgroundColor: 'white',
        fontFamily: 'Montserrat_400Regular',
        marginVertical: 10,
        fontSize: 16
    },
    dropdown1RowStyle: { backgroundColor: '#FFFFF', borderBottomColor: '#F7F7F7' },
    dropdown1DropdownStyle: { backgroundColor: '#FFFF', borderRadius: 5, width: "60%" },
    dropdown1RowTxtStyle: { color: '#444', fontSize: 14, fontFamily: 'Montserrat_500Medium' },
    noActive: {
        color: '#2B2B2B'
    },
    verticle: {
        color: '#2B2B2B'
    },
    active: {
        color: '#2B2B2B',
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 13
    },
    InActive: {
        display: 'none',
    },
    noActive: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 13
    }
})
export default Home


// {
//     loading ? <Loader /> : !servicetype ? <HomeNFound /> :
//         <View>
//             {
//                 arr.length > 0 ? arr.map((item) => {
//                     return (
//                         item.status === 'Active' && <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', marginVertical: 15, borderColor: '#C7C7C7', borderWidth: 1, borderRadius: 16 }} key={item._id}>
//                             <View style={{ flex: 1 }}>
//                                 <Image style={{ width: 93, height: 93, resizeMode: 'contain', borderRadius: 15 }} source={{ uri: item.avatar.url }} />
//                             </View>
//                             <View style={{ flex: 2 }}>
//                                 <View style={{ flexDirection: 'row' }}>
//                                     <Text style={{ fontFamily: 'Montserrat_600SemiBold', marginBottom: 5 }}>{item.firstname} {item.lastname}</Text>
//                                     <View>
//                                         {
//                                             item.status === "Active" && <Text style={{ backgroundColor: '#5FD068', alignSelf: 'flex-start', width: 8, height: 8, borderRadius: 50, marginLeft: 3 }}></Text>
//                                         }
//                                     </View>
//                                 </View>
//                                 {
//                                     !servicetype ? null : <TouchableOpacity style={{ backgroundColor: '#505050', paddingHorizontal: 19, paddingVertical: 8, alignSelf: 'flex-start', borderRadius: 24, marginTop: 5 }} onPress={() => navigation.navigate('Slot', {
//                                         intime: item.intime,
//                                         outtime: item.outtime,
//                                         id: item._id,
//                                         servicetype: servicetype
//                                     })}>
//                                         <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 10, color: 'white' }}>Available Slots</Text>
//                                     </TouchableOpacity>
//                                 }
//                             </View>
//                         </View>
//                     )
//                 }) : <HomeNFound />
//             }
//         </View>
// }