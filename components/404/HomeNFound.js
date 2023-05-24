import { View, Text, Image } from 'react-native'
import React from 'react'

const HomeNFound = () => {
    return (
        <View style={{ alignItems: 'center', marginHorizontal: 20 }}>
            <Image style={{ width: 300, height: 300, resizeMode: 'contain' }} source={require('../../assets/HomeScreen.png')} />
            <View style={{ alignItems: 'center',position: 'relative', top: -30 }}>
                <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 24, marginBottom: 10, }}>Welcome</Text>
                <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_400Regular', fontSize: 14 }}>Select the service to check available slots.</Text>
            </View>
        </View>
    )
}

export default HomeNFound