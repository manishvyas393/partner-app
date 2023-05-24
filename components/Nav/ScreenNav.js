import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Login from '../../screens/Login';
import Signup from '../../screens/Signup';
import WorkingHours from '../../screens/WorkingHours';
import { useSelector } from 'react-redux';
import BasicInfo from '../../screens/BasicInfo';
import { useEffect } from 'react';
import { ALERT_TYPE, Dialog } from "react-native-alert-notification"
import store from '../../store';
import { LoadUser } from '../../actions/UserAction';
import Profile from '../../screens/Profile';
import ShowEmployee from '../../screens/ShowEmployee';
import AddEmployee from '../../screens/AddEmployee';
import Address from '../../screens/Address';
import ShowServices from '../../screens/ShowServices';
import Icons from '../HeaderIcons/Icons';
import AddServices from '../../screens/AddServices';
import ProfileServices from '../../screens/ProfileServices';
import ProfileEmployee from '../../screens/ProfileEmployee';
import Home from '../../screens/Home';
import SlotBooking from '../../screens/SlotBooking';
import UpdateEmployee from '../../screens/UpdateEmployee';
import UpdateServices from '../../screens/UpdateServices';
import Next from '../../screens/Next';
import BookingPage from '../../screens/BookingPage';
import MyOrders from '../../screens/MyOrders';
import OrderDetails from '../../screens/OrderDetails';
import PAddEmployee from '../../screens/PAddEmployee';
import PAddServices from '../../screens/PAddServices';
import ContactList from '../../screens/ContactList';
import UpdatePassword from '../../screens/UpdatePassword';
import BannerUpload from '../../screens/BannerUpload';
import ChooseStylist from '../../screens/ChooseStylist';
import WhatsappNo from '../../screens/WhatsappNo';
import BookingNotification from '../../screens/BookingNotification';
import ComingUp from '../../screens/ComingUp';
import Reschedule from '../../screens/Reschedule';

const Stack = createNativeStackNavigator();
const ScreenNav = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth)
    useEffect(() => {
        store.dispatch(LoadUser())
        if (isAuthenticated) {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: "Login Success",
                button: 'close',
            })
        }
    }, [])
    return (
        <>
            {
                user ? <NavigationContainer>
                    <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShadowVisible: false }}>
                        <Stack.Screen name='Home' component={Home}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen name='BasicInfo' component={BasicInfo}
                            options={{
                                title: "Basic Info",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                        <Stack.Screen name='Working' component={WorkingHours}
                            options={{
                                headerBackVisible: false,
                                title: "Business Hours",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                        <Stack.Screen name='ShowEmp' component={ShowEmployee}
                            options={{
                                headerBackVisible: false,
                                title: "Manage Staff ",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                        <Stack.Screen name='AddEmp' component={AddEmployee}
                            options={{
                                title: "Add Employee",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                        <Stack.Screen name='Profile' component={Profile}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen name='Address' component={Address}
                            options={{
                                headerBackVisible: false,
                                title: "Your Address",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                        <Stack.Screen name='Services' component={ShowServices}
                            options={{
                                headerRight: () => {
                                    return (
                                        <Icons />
                                    )
                                },
                                headerBackVisible: false,
                                title: "Services Setup",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                        <Stack.Screen name='AddService' component={AddServices}
                            options={{
                                title: "Add Service",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                        <Stack.Screen name='PService' component={ProfileServices}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen name='PEmployee' component={ProfileEmployee}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen name='Login' component={Login} options={{
                            title: "Sign In",
                            headerTitleStyle: {
                                fontFamily: 'Montserrat_600SemiBold'
                            }
                        }} />
                        <Stack.Screen name='Signup' component={Signup}
                            options={{
                                headerBackVisible: false,
                                title: "Create Account",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                        <Stack.Screen name='Slot' component={SlotBooking}
                            options={{
                                title: "Select Slot",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                            initialParams={{ cameFrom: "" }}
                        />
                        <Stack.Screen name='employeeupdate' component={UpdateEmployee}
                            options={{
                                title: "Update Employee",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                        <Stack.Screen name='serviceupdate' component={UpdateServices}
                            options={{
                                title: "Update Service",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                        <Stack.Screen name='Slots' component={Next}
                            options={{
                                title: "Customer Details",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                            initialParams={{ cameFrom: "" }}
                        />
                        <Stack.Screen name='Reschedule' component={Reschedule}
                            options={{
                                title: "Reschedule Bookings",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                        <Stack.Screen name='Booking' component={BookingPage}
                            options={{
                                title: "Booking",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                        <Stack.Screen name='Orders' component={MyOrders}
                            options={{
                                title: "My Orders",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                        <Stack.Screen name='comingup' component={ComingUp}
                            options={{
                                title: "Coming Up Bookings",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                        <Stack.Screen name='OrderDetails' component={OrderDetails}
                            initialParams={{ id: "0" }}
                            options={{
                                title: "Order Details",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                        <Stack.Screen name='PAddEmpl' component={PAddEmployee}
                            options={{
                                title: "Add Employee",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                        <Stack.Screen name='PAddServ' component={PAddServices}
                            options={{
                                title: "Add Service",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                        <Stack.Screen name='Customer' component={ContactList}
                            options={{
                                title: "Customer Details",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                        <Stack.Screen name='Password' component={UpdatePassword}
                            options={{
                                title: "Update Password",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                        <Stack.Screen name='Banner' component={BannerUpload}
                            options={{
                                title: "Upload Cover Photos",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                        <Stack.Screen name='stylist' component={ChooseStylist}
                            options={{
                                title: "Select Stylist",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                            initialParams={{ cameFrom: "" }}
                        />
                        <Stack.Screen name='Mobile' component={WhatsappNo}
                            options={{
                                title: "Add Your Whatsapp No",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                        <Stack.Screen name='BookingNotification' component={BookingNotification}
                            options={{
                                title: "Today's Booking",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                    </Stack.Navigator>

                </NavigationContainer> : !user && <NavigationContainer>
                    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShadowVisible: false }}>
                        <Stack.Screen name='Login' component={Login} options={{
                            title: "Sign In",
                            headerTitleStyle: {
                                fontFamily: 'Montserrat_600SemiBold'
                            }
                        }} />
                        <Stack.Screen name='Signup' component={Signup}
                            options={{
                                headerBackVisible: false,
                                title: "Create Account",
                                headerTitleStyle: {
                                    fontFamily: 'Montserrat_600SemiBold'
                                }
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            }
            {/* xxxxxxxxxxxxxxxxxxx */}
        </>
    )
}

export default ScreenNav