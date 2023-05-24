import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Divider } from 'react-native-elements'

const FooterTabs = () => {
    const navigation = useNavigation();
    const route = useRoute();
    return (
        <>
            <Divider />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 10,backgroundColor: 'white' }}>
                <IconsTabs routeName={route.name} title="Home" style={{ alignSelf: 'center', marginBottom: 5 }} screenName='Home' name='settings' size={14} handlePress={() => navigation.navigate('Home')} />
                <IconsTabs routeName={route.name} title="Stylist" style={{ alignSelf: 'center', marginBottom: 5 }} screenName='PEmployee' name='users' size={14} handlePress={() => navigation.navigate('PEmployee')} />
                <IconsTabs routeName={route.name} title="Services" style={{ alignSelf: 'center', marginBottom: 5 }} screenName='PService' name='shopping-bag' size={14} handlePress={() => navigation.navigate('PService')} />
                <IconsTabs routeName={route.name} title="Profile" style={{ alignSelf: 'center', marginBottom: 5 }} screenName='Profile' name='user' size={14} handlePress={() => navigation.navigate('Profile')} />
            </View >
        </>
    )
}

export const IconsTabs = (props) => {
    const activeColor = props.screenName === props.routeName && '#D52976'
    return (
        <TouchableOpacity onPress={props.handlePress}>
            <Feather name={props.name} color={activeColor} size={22} style={{ alignSelf: 'center', marginBottom: 2 }} />
            <Text style={{ color: activeColor, fontFamily: 'Montserrat_500Medium' }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default FooterTabs