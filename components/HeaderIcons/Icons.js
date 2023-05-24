import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'

const Icons = () => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={()=> navigation.navigate('AddService')} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Entypo name='circle-with-plus' style={{ marginHorizontal: 10 }} size={25} />
            <Text style={{ fontFamily: 'Montserrat_700Bold', fontSize: 14 }}>ADD</Text>
        </TouchableOpacity>
    )
}

export default Icons