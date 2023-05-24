import { View, Text, Image } from 'react-native'
import React from 'react'

const ServiceHNFound = () => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 70 }}>
            <Image style={{ width: 300, height: 300, resizeMode: 'contain' }} source={require('../../assets/BSH.png')} />
            <View style={{ alignItems: 'center', position: 'relative', top: -20 }}>
                <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 24, marginBottom: 10, }}>List Your Services </Text>
                <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_400Regular', fontSize: 14 }}>Add your services.</Text>
            </View>
        </View>
    )
}

export default ServiceHNFound