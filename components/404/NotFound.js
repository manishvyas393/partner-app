import { View, Text, Image } from 'react-native'
import React from 'react'

const NotFound = () => {
    return (
        <View style={{ alignItems: 'center',marginHorizontal: 20 }}>
            <Image style={{ width: 220, height: 220, resizeMode: 'contain' }} source={require('../../assets/Glowup.png')} />
            <Image style={{ width: 300, height: 300, resizeMode: 'contain', position: 'relative', top: -120 }} source={require('../../assets/image54.png')} />
            <View style={{ position: 'relative', top: -150, alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 24, marginBottom: 10 }}>No Data Found</Text>
                <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_400Regular', fontSize: 16 }}>There seems to be no data available to show.</Text>
            </View>
        </View>
    )
}

export default NotFound