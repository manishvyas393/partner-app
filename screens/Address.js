import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import { ALERT_TYPE, Dialog } from "react-native-alert-notification"
import { useNavigation } from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const Address = ({ route }) => {
    const navigation = useNavigation();
    const states = ['Maharastra']
    const { name, saloonname, email, company } = route.params;
    const [shopname, setShopName] = useState("");
    const [ownername, setOwnerName] = useState("");
    const [businessemailid, setBusinessEmailId] = useState("");
    const [companytype, setCompanyType] = useState("");
    // console.log(shopname + " " + ownername + " " + businessemailid + " " + companytype)

    const [address, setAddress] = useState("");
    const [addresssec, setAddressSec] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("")
    const [pincode, setPincode] = useState("");
    const [map, setMap] = useState("");

    const detectFilled = () => {
        Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: "Please fill all the required fields",
            button: 'close'
        })
    }

    useEffect(() => {
        if (name || saloonname || email || company) {
            setShopName(saloonname)
            setOwnerName(name)
            setBusinessEmailId(email)
            setCompanyType(company)
        }
    }, [])

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                    <Text style={styles.HeadPara}>Add your business location</Text>
                    <View style={{ marginTop: 10 }}>
                        <TextInput theme={{
                            roundness: 5,
                            colors: {
                                primary: "#BABABA",
                            },
                            fonts: {
                                regular: {
                                    fontFamily: 'Montserrat_400Regular',
                                }
                            }
                        }}
                            outlineColor='#BABABA'
                            value={address}
                            style={styles.Input}
                            autoCapitalize='none'
                            mode="outlined"
                            label="Address Line 1"
                            onChangeText={(text) => setAddress(text)}
                        />
                        <TextInput theme={{
                            roundness: 5,
                            colors: {
                                primary: "#BABABA",
                            },
                            fonts: {
                                regular: {
                                    fontFamily: 'Montserrat_400Regular',
                                }
                            }
                        }}
                            outlineColor='#BABABA'
                            value={addresssec}
                            style={styles.Input}
                            autoCapitalize='none'
                            mode="outlined"
                            label="Address Line 2"
                            onChangeText={(text) => setAddressSec(text)}
                        />
                        <TextInput theme={{
                            roundness: 5,
                            colors: {
                                primary: "#BABABA",
                            },
                            fonts: {
                                regular: {
                                    fontFamily: 'Montserrat_400Regular',
                                }
                            }
                        }}
                            outlineColor='#BABABA'
                            value={city}
                            style={styles.Input}
                            autoCapitalize='none'
                            mode="outlined"
                            label="City"
                            onChangeText={(text) => setCity(text)}
                        />
                        <SelectDropdown
                            data={states}
                            buttonStyle={{ backgroundColor: '#ffff', borderColor: '#BABABA', borderWidth: 1, width: "100%", marginVertical: 10, borderRadius: 5, height: 58 }}
                            buttonTextStyle={{ fontFamily: 'Montserrat_500Medium', color: '#000', fontSize: 15, textAlign: 'left' }}
                            onSelect={(selectedItem, index) => {
                                setState(selectedItem)
                            }}
                            rowTextStyle={styles.dropdown1RowTxtStyle}
                            renderDropdownIcon={isOpened => {
                                return <FontAwesome5Icon style={{ marginRight: 8 }} name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={18} />;
                            }}
                            rowStyle={styles.dropdown1RowStyle}
                            dropdownStyle={styles.dropdown1DropdownStyle}
                            dropdownIconPosition={'right'}
                            defaultButtonText='Choose State'
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                        />
                        <TextInput theme={{
                            roundness: 5,
                            colors: {
                                primary: "#BABABA",
                            },
                            fonts: {
                                regular: {
                                    fontFamily: 'Montserrat_400Regular',
                                }
                            }
                        }}
                            outlineColor='#BABABA'
                            value={pincode}
                            keyboardType='numeric'
                            style={styles.Input}
                            autoCapitalize='none'
                            mode="outlined"
                            label="Pincode"
                            onChangeText={(text) => setPincode(text)}
                        />
                        <TextInput theme={{
                            roundness: 5,
                            colors: {
                                primary: "#BABABA",
                            },
                            fonts: {
                                regular: {
                                    fontFamily: 'Montserrat_400Regular',
                                }
                            }
                        }}
                            outlineColor='#BABABA'
                            keyboardType='url'
                            value={map}
                            style={styles.Input}
                            autoCapitalize='none'
                            mode="outlined"
                            label="Google Map Link"
                            onChangeText={(text) => setMap(text)}
                        />
                    </View>
                </View>
            </ScrollView>
            <View>
                {
                    !address || !addresssec || !city || !state || !pincode || !map ? <TouchableOpacity onPress={() => detectFilled()} style={{ marginVertical: 0, backgroundColor: '#232323', paddingHorizontal: 40, paddingVertical: 20 }}>
                        <Text style={{ color: 'white', fontFamily: "Montserrat_700Bold", alignSelf: 'center', fontSize: 16 }}>CONTINUE</Text>
                    </TouchableOpacity> : <TouchableOpacity onPress={() => {
                        navigation.navigate('Working', {
                            name: ownername,
                            saloonname: shopname,
                            email: businessemailid,
                            company: companytype,
                            add: address,
                            addsec: addresssec,
                            citi: city,
                            stat: state,
                            pincod: pincode,
                            maps: map
                        })
                    }} style={{ marginVertical: 0, backgroundColor: '#232323', paddingHorizontal: 40, paddingVertical: 20 }}>
                        <Text style={{ color: 'white', fontFamily: "Montserrat_700Bold", alignSelf: 'center', fontSize: 16 }}>CONTINUE</Text>
                    </TouchableOpacity>
                }
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    HeadPara: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 18
    },
    Input: {
        backgroundColor: 'white',
        fontFamily: 'Montserrat_400Regular',
        marginVertical: 10,
        fontSize: 16
    },
    dropdown1RowStyle: { backgroundColor: '#FFFFF', borderBottomColor: '#F7F7F7' },
    dropdown1DropdownStyle: { backgroundColor: '#FFFF', borderRadius: 5, width: "40%" },
    dropdown1RowTxtStyle: { color: '#444', fontSize: 14, fontFamily: 'Montserrat_500Medium' },
})

export default Address