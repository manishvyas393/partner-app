import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Image } from 'react-native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loggedUserSaloon, updateDescription, updateSaloonImages } from '../actions/ServicesAction';
import { useEffect } from 'react';
import Loader from '../components/Loader/Loader';
import { UPDATE_SALOON_DESCRIPTION_RESET, UPDATE_SALOON_IMAGES_RESET } from '../constants/ServiceConstants';
import { useIsFocused } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';

const BannerUpload = ({ navigation }) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { isUpdated, error, loading } = useSelector((state) => state.saloonimages)
    const { saloon, loading: SaloonLoading } = useSelector((state) => state.loggedSaloon)
    const { isUpdated: saloonDesc, error: DescriptionError, loading: DescriptionLoading } = useSelector((state) => state.updateDes)

    const [description, setDescription] = useState('')

    const [images, setImages] = useState([])
    const handleProfile = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Allow Camera Access in Permission!',
                button: 'close'
            })
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            base64: true,
            quality: 0.3,
            allowsMultipleSelection: true
        })
        if (pickerResult.cancelled === true) {
            return
        }
        let base64Img = `data:image/jpg;base64,${pickerResult.base64}`
        setImages([...images, base64Img])
    }

    const handleImages = () => {
        dispatch(updateSaloonImages(images))
    }

    const handleSalonDesc = () => {
        dispatch(updateDescription(description))
    }

    useEffect(() => {
        if (error) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: error,
                button: 'close'
            })
            dispatch(clearErrors())
        }
        if (isUpdated) {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: "Image Upload Successfully",
                button: 'close'
            })
            dispatch({
                type: UPDATE_SALOON_IMAGES_RESET
            })
            navigation.navigate('Profile')
        }
        if (saloonDesc) {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: "Description Added Successfully",
                button: 'close'
            })
            setDescription("")
            dispatch({
                type: UPDATE_SALOON_DESCRIPTION_RESET
            })
        }
        if (DescriptionError) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: error,
                button: 'close'
            })
            dispatch(clearErrors())
        }
        if (isFocused) {
            dispatch(loggedUserSaloon())
        }
    }, [dispatch, error, isUpdated, isFocused, saloonDesc, DescriptionError])


    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            {
                loading ? <Loader /> : <View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ marginHorizontal: 20, marginVertical: 15 }}>
                            <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 15, marginVertical: 10 }}>Hey, Click the best photo and post</Text>
                            <TouchableOpacity style={{ backgroundColor: '#2B2B2B', alignSelf: 'center', borderRadius: 5, marginTop: 15 }} onPress={() => handleProfile()}>
                                <Text style={{ color: 'white', paddingHorizontal: 20, paddingVertical: 8, fontFamily: 'Montserrat_600SemiBold', fontSize: 14 }}>Choose Images</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {
                                images.length > 0 ? images.map((x, i) => {
                                    return (
                                        <View style={{ marginHorizontal: 20, marginVertical: 10 }} key={i}>
                                            <TouchableOpacity>
                                                <Image style={{ width: 100, height: 100, resizeMode: 'cover' }} source={{ uri: x }} />
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }) : null
                            }
                        </ScrollView>
                        <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                            <Text style={{ fontFamily: 'Montserrat_600SemiBold', marginBottom: 10, fontSize: 16 }}>Rules & Instructions:</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 5 }}>
                                <Text style={{ marginRight: 10 }}>•</Text>
                                <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 14 }}>Image should be clear visible about your brand.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 5 }}>
                                <Text style={{ marginRight: 10 }}>•</Text>
                                <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 14 }}>Minimum 3 Images should be uploaded.</Text>
                            </View>
                        </View>
                        {
                            saloon.images.length > 0 ? <Text style={{ fontFamily: 'Montserrat_600SemiBold', marginBottom: 10, fontSize: 16, marginHorizontal: 20 }}>Uploaded Images:</Text> : null
                        }
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {
                                saloon && saloon.images.length > 0 ? saloon.images.map((img) => {
                                    return (
                                        <View style={{ marginHorizontal: 20, marginVertical: 10 }} key={img._id}>
                                            <TouchableOpacity>
                                                <Image style={{ width: 100, height: 100, resizeMode: 'cover' }} source={{ uri: img.url }} />
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }) : null
                            }
                        </ScrollView>
                    </ScrollView>
                    {
                        images.length >= 3 ? <TouchableOpacity onPress={() => handleImages()} style={{ backgroundColor: '#232323', paddingHorizontal: 20, paddingVertical: 12, alignSelf: 'center', borderRadius: 5 }}>
                            <Text style={{ color: 'white', fontFamily: 'Montserrat_700Bold', fontSize: 14, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>Upload</Text>
                        </TouchableOpacity> : null
                    }
                    <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
                        <TextInput
                            multiline
                            mode="outlined"
                            numberOfLines={4}
                            theme={{
                                roundness: 5,
                                colors: {
                                    primary: "#BABABA",
                                },
                                fonts: {
                                    regular: {
                                        fontFamily: 'Montserrat_400Regular'
                                    }
                                }
                            }}
                            outlineColor='#BABABA'
                            keyboardType='default'
                            style={styles.Input}
                            autoCapitalize='none'
                            value={description}
                            onChangeText={text => setDescription(text)}
                            label="Saloon Description"
                        />
                        {
                            description.length > 0 ? <TouchableOpacity onPress={() => handleSalonDesc()} style={{ backgroundColor: '#232323', paddingHorizontal: 20, paddingVertical: 15, alignSelf: 'center', borderRadius: 5 }}>
                                <Text style={{ color: 'white', fontFamily: 'Montserrat_700Bold', fontSize: 14, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{DescriptionLoading ? "Please Wait..." : "Submit"}</Text>
                            </TouchableOpacity> : null
                        }
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    Input: {
        backgroundColor: 'white',
        fontFamily: 'Montserrat_400Regular',
        marginVertical: 10,
        fontSize: 16
    },
})

export default BannerUpload