import { ScrollView, Image } from 'react-native'
import React from 'react'

const Loader = () => {
    return (
        <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ width: '100%', resizeMode: 'contain' }}
                source={require('../../assets/loader.gif')}
            />
        </ScrollView>
    )
}

export default Loader