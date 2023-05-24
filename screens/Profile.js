import { View, Text, Image, StatusBar, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import FooterTabs from '../components/Nav/FooterTabs'
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { LoadUser, logoutUser, userProfileUpdate } from '../actions/UserAction';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import * as ImagePicker from 'expo-image-picker';
import { PROFILE_UPDATE_RESET } from '../constants/UserConstants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useIsFocused } from '@react-navigation/native';
import { loggedUserSaloon } from '../actions/ServicesAction';
import Loader from '../components/Loader/Loader';



const Profile = ({ navigation }) => {
    const isFocused = useIsFocused()
    const insets = useSafeAreaInsets();
    // const { isUpdated, error, loading } = useSelector((state) => state.profile)
    const { loading: SaloonLoading } = useSelector((state) => state.loggedSaloon)
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    // const [avatar, setAvatar] = useState('')

    const [refresh, setRefresh] = useState(false);

    const pullMe = () => {
        setRefresh(true);
        // navigation.navigate('Profile')
        setTimeout(() => {
            setRefresh(false)
        }, 2000);
    }


    // const handleProfile = async () => {
    //     let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //     TODO
    //     if (permissionResult.granted === false) {
    //         return Dialog.show({
    //             type: ALERT_TYPE.WARNING,
    //             title: 'Warning',
    //             textBody: 'Allow Camera Access in Permission!',
    //             button: 'close'
    //         })
    //     }
    //     let pickerResult = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: false,
    //         base64: true,
    //         quality: 0.3,
    //         aspect: [4,3]
    //     })
    //     if (pickerResult.cancelled === true) {
    //         return
    //     }
    //     let base64Img = `data:image/jpg;base64,${pickerResult.base64}`
    //     console.log(base64Img)
    //     setAvatar(base64Img)
    // }

    const HandleLogout = () => {
        dispatch(logoutUser())
        navigation.navigate('Login')
        Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: "Logout Success",
            button: 'close',
        })
    }

    // const handleAvatar = () => {
    //     dispatch(userProfileUpdate(avatar))
    // }

    useEffect(() => {
        // if (error) {
        //     alert(error)
        // }
        // if (isUpdated) {
        //     dispatch({
        //         type: PROFILE_UPDATE_RESET
        //     })
        //     Dialog.show({
        //         type: ALERT_TYPE.SUCCESS,
        //         title: 'Success',
        //         textBody: 'Avatar Updated Success',
        //         button: 'close',
        //     })
        //     dispatch(LoadUser())
        //     navigation.navigate('Home')
        // }
        if (isFocused) {
            dispatch(loggedUserSaloon())
        }
    }, [dispatch, isFocused])


    // const userImg = user.avatar && user.avatar.url;
    return (
        <View style={{ flex: 1, backgroundColor: 'white', marginTop: insets.top }}>
            <View style={{ paddingHorizontal: 0, alignItems: 'center' }}>
                <View style={{ backgroundColor: '#353535', height: 200, width: '100%', position: 'relative', top: 0, alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#D9D9D9', width: "80%", position: 'absolute', bottom: 0 }}>
                        <View style={{ position: 'relative', top: -40, alignItems: 'center' }}>
                            <TouchableOpacity style={{ backgroundColor: '#F7F7F7', width: 83, height: 83, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                                <Text style={{ fontSize: 32, fontFamily: 'Montserrat_600SemiBold' }}>{user && user.name.length > 2 ? user.name.slice(0, 1) : user.name}</Text>
                            </TouchableOpacity>
                            <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 20, color: '#211F1F', marginTop: 10 }}>{user.name}</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/* {
                avatar ? <View style={{ backgroundColor: 'white', alignItems: 'center', marginTop: 10 }}>
                    <TouchableOpacity onPress={() => handleAvatar()} style={{ alignItems: 'center', backgroundColor: '#232323', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 5 }}>
                        {
                            loading ? <Text style={{ color: 'white', fontFamily: 'Montserrat_600SemiBold' }}>Please Wait...</Text> : <Text style={{ color: 'white', fontFamily: 'Montserrat_600SemiBold' }}>Save</Text>
                        }
                    </TouchableOpacity>
                </View> : null
            } */}
            {
                SaloonLoading ? <Loader /> : <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />} showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ marginHorizontal: 20, marginTop: 30 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Mobile')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 18, borderBottomColor: '#F7F7F7', borderBottomWidth: 1 }}>
                            <IonIcons name='notifications' style={{ flex: 0.7 }} size={28} />
                            <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 16, flex: 5 }}>Notification (Whatsapp)</Text>
                            <FontAwesome5Icon name='chevron-right' size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Banner')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 18, borderBottomColor: '#F7F7F7', borderBottomWidth: 1 }}>
                            <Entypo name='image' style={{ flex: 0.7 }} size={28} />
                            <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 16, flex: 5 }}>Salon Images</Text>
                            <FontAwesome5Icon name='chevron-right' size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Customer')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 18, borderBottomColor: '#F7F7F7', borderBottomWidth: 1 }}>
                            <Entypo name='database' style={{ flex: 0.7 }} size={28} />
                            <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 16, flex: 5 }}>Customer Data</Text>
                            <FontAwesome5Icon name='chevron-right' size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Orders')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 18, borderBottomColor: '#F7F7F7', borderBottomWidth: 1 }}>
                            <Entypo name='shopping-bag' style={{ flex: 0.7 }} size={28} />
                            <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 16, flex: 5 }}>My Orders</Text>
                            <FontAwesome5Icon name='chevron-right' size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Password')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 18, borderBottomColor: '#F7F7F7', borderBottomWidth: 1 }}>
                            <Fontisto name='player-settings' style={{ flex: 0.7 }} size={28} />
                            <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 16, flex: 5 }}>Change Password</Text>
                            <FontAwesome5Icon name='chevron-right' size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => HandleLogout()} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 18, borderBottomColor: '#F7F7F7', borderBottomWidth: 1 }}>
                            <MaterialCommunityIcons name='logout' style={{ flex: 0.7 }} size={30} />
                            <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 16, flex: 5 }}>Logout</Text>
                            <FontAwesome5Icon name='chevron-right' size={24} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            }
            <FooterTabs />
        </View>
    )
}

export default Profile
