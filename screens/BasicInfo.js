import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ALERT_TYPE, Dialog } from "react-native-alert-notification"
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const BasicInfo = () => {
    const type = ["Sole Proprietorship", "Private Limited", "Partnership", "Other"]
    const navigation = useNavigation();
    const [shopname, setShopName] = useState("");
    const [ownername, setOwnerName] = useState("");
    const [businessemailid, setBusinessEmailId] = useState("");
    const [companytype, setCompanyType] = useState("");

    const detectFilled = () => {
        Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: "Please fill all the required fields",
            button: 'close'
        })
    }

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                    <Text style={styles.HeadPara}>Let’s make it easier for you</Text>
                    <View style={{ marginTop: 10 }}>
                        <TextInput theme={{
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
                            style={styles.Input}
                            autoCapitalize='words'
                            mode="outlined"
                            value={shopname}
                            onChangeText={text => setShopName(text)}
                            label="Salon Name" />
                        <TextInput theme={{
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
                            style={styles.Input}
                            autoCapitalize='words'
                            mode="outlined"
                            value={ownername}
                            onChangeText={text => setOwnerName(text)}
                            label="Owner Name" />
                        <TextInput theme={{
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
                            style={styles.Input}
                            autoCapitalize='none'
                            mode="outlined"
                            value={businessemailid}
                            onChangeText={text => setBusinessEmailId(text)}
                            label="Owner Email ID" />
                        <SelectDropdown
                            data={type}
                            buttonStyle={{ backgroundColor: '#ffff', borderColor: '#BABABA', borderWidth: 1, width: "100%", marginVertical: 18, borderRadius: 5, height: 60 }}
                            buttonTextStyle={{ fontFamily: 'Montserrat_500Medium', color: '#000', fontSize: 15, textAlign: 'left' }}
                            onSelect={(selectedItem, index) => {
                                setCompanyType(selectedItem)
                            }}
                            renderDropdownIcon={isOpened => {
                                return <FontAwesome5Icon style={{ marginRight: 8 }} name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={18} />;
                            }}
                            rowStyle={styles.dropdown1RowStyle}
                            dropdownStyle={styles.dropdown1DropdownStyle}
                            rowTextStyle={styles.dropdown1RowTxtStyle}
                            dropdownIconPosition={'right'}
                            defaultButtonText='Company Type'
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                        />
                    </View>
                </View>
            </ScrollView >
            <View>
                {
                    !shopname || !businessemailid || !ownername ? <TouchableOpacity onPress={() => detectFilled()} style={{ marginVertical: 0, backgroundColor: '#232323', paddingHorizontal: 40, paddingVertical: 20 }}>
                        <Text style={{ color: 'white', fontFamily: "Montserrat_700Bold", alignSelf: 'center', fontSize: 16 }}>CONTINUE</Text>
                    </TouchableOpacity> : <TouchableOpacity onPress={() => {
                        navigation.navigate('Address', {
                            name: ownername,
                            saloonname: shopname,
                            email: businessemailid,
                            company: companytype
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
    dropdown1DropdownStyle: { backgroundColor: '#FFFF', borderRadius: 5, width: "80%" },
    dropdown1RowTxtStyle: { color: '#444', fontSize: 14, fontFamily: 'Montserrat_500Medium' },
})

export default BasicInfo