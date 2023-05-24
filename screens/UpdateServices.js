import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getSingleService, updateService } from '../actions/ServicesAction';
import { ALERT_TYPE, Dialog } from "react-native-alert-notification"
import { useNavigation } from '@react-navigation/native';
import { loggedUserEmployees } from '../actions/EmployeeAction';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Loader from '../components/Loader/Loader';
import { UPDATE_SERVICE_RESET } from '../constants/ServiceConstants';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const UpdateServices = ({ route }) => {
    const { id } = route.params;
    console.log(id)
    const { getService, loading: serviceLoading } = useSelector((state) => state.serviceDetails)
    const { isUpdated, error, loading } = useSelector((state) => state.serviceUpDel)
    const hours = ['15', '30', '45', '60', '75', '90', '120']
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { employee } = useSelector((state) => state.getLoggedEmp)
    const type = ['Men', 'Women', 'Treatments', 'Makeup', 'Skin', 'Nails', 'Men/Women']
    const MenCatagories = ['Cut and Wash', "Men's Cut & Shave", 'Beard Trim', 'Beard Shave', 'Hair Cut', 'Hair Styling', 'Hair Wash', 'Beard Colour', 'Hair Colour', 'Hair Colour w/oA', 'Hi lites', 'Eye Brows', 'EyeBrows & lashes', 'Threading', 'Waxing', "Relaxing Ritual Men's", 'Trim', 'Wax']
    const WomenCategories = ['Hair Cut', 'Hair Wash', 'Hair Styling', 'Hair Colour', 'Hi lites', 'Eye Brows', 'Eye Lashes', 'Eye Brows/Eyes Lashes', 'EyeBrows & lashes', 'Threading', 'Waxing', 'Waxing (REGULAR)', 'Waxing (LIPO)', 'Waxing (STRIPLESS)', 'Womens Cut and Dry', 'Treatments N Ritual', "Women's Color Play", "Texture N Turn", "Just A Mask", 'Spa']
    const Treatments = ['Treatements', 'Olaplex Ritual', 'Hair Textures', 'Keratese Experience Ritual', 'Keratese Express Ritual', 'K - Scalp Rituals', 'Nanoplast']
    const Makeups = ['Make Up']
    const Skin = ['Threading', 'Waxing', 'Bleach', 'Facials', 'Face Masks', 'Eye Mask', 'Black Black Mud Mask', 'Manicure', 'Pedicure', "Clean Up / Face Massage", "Just A Mask", "Take Down Tan (BLEACH)", "Take Down Tan (D-TAN)", "Facial Rituals"]
    const Nails = ['Manicure & Padicure', 'Manicure & Padicure (Classic)', 'Manicure & Padicure (Advance)', 'Manicure & Padicure (Luxury)', 'Manicure & Padicure (Extra)', 'Extensions', 'Refills, Tips, Gelpolished & Nails']
    const manicure = ['Advance', 'Luxury', 'Extra'];
    const extension = ['Acrylic Extensions', 'Natural Gel-Extensions', 'Polygon gum gel natural']
    const both = ['Eye Brows', 'EyeBrows & lashes', 'Threading', 'Waxing']
    const [servicetype, setServiceType] = useState('')
    const [category, setCategory] = useState('');
    const [subcategory, setSubCategory] = useState('')
    const [servicename, setServiceName] = useState('')
    const [hour, setHour] = useState('');
    const [price, setPrice] = useState('')
    const [about, setAbout] = useState('')

    const [myemployees, setMyEmployees] = useState([])

    console.log(servicetype)
    console.log(category)

    // let id;

    const handleServiceUpdate = () => {
        dispatch(updateService(id, servicetype, category, servicename, hour, price, about, myemployees))
    }


    const deleteTodo = (idx) => {
        const deleteModule = myemployees.filter(item => item != idx);
        setMyEmployees(deleteModule)
    }

    console.log(myemployees)
    useEffect(() => {
        if (getService && getService._id !== id) {
            dispatch(getSingleService(id))
        }
        else {
            setServiceType(getService.servicetype)
            setCategory(getService.category)
            setSubCategory(getService.subcategory)
            setServiceName(getService.servicename)
            setHour(getService.hour)
            setPrice(getService.price)
            setAbout(getService.about)
            setMyEmployees(getService.myemployees)
        }
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
                textBody: "Service Updated Success",
                button: 'close'
            })
            dispatch({
                type: UPDATE_SERVICE_RESET
            })
            navigation.navigate('PService')
        }
        dispatch(loggedUserEmployees())
    }, [dispatch, error, getService, isUpdated])

    return (
        <>
            {
                serviceLoading ? <Loader /> : <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: 'white' }}>
                    <Text style={{ alignSelf: 'center', fontFamily: 'Montserrat_700Bold', fontSize: 14, marginVertical: 15 }}>Add Service Details</Text>
                    <View style={{ marginHorizontal: 20 }}>
                        <SelectDropdown
                            data={type}
                            buttonStyle={{ backgroundColor: '#ffff', borderColor: '#BABABA', borderWidth: 1, width: "100%", marginVertical: 10, borderRadius: 5, height: 58 }}
                            buttonTextStyle={{ fontFamily: 'Montserrat_500Medium', color: '#000', fontSize: 15, textAlign: 'left' }}
                            onSelect={(selectedItem, index) => {
                                setServiceType(selectedItem)
                            }}
                            renderDropdownIcon={isOpened => {
                                return <FontAwesome5Icon style={{ marginRight: 8 }} name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={18} />;
                            }}
                            rowTextStyle={styles.dropdown1RowTxtStyle}
                            rowStyle={styles.dropdown1RowStyle}
                            dropdownStyle={styles.dropdown1DropdownStyle}
                            dropdownIconPosition={'right'}
                            defaultButtonText={servicetype}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                        />
                        {/* Category */}
                        {
                            servicetype === 'Men' ? <SelectDropdown
                                data={MenCatagories}
                                buttonStyle={{ backgroundColor: '#ffff', borderColor: '#BABABA', borderWidth: 1, width: "100%", marginVertical: 10, borderRadius: 5, height: 58 }}
                                buttonTextStyle={{ fontFamily: 'Montserrat_500Medium', color: '#000', fontSize: 15, textAlign: 'left' }}
                                onSelect={(selectedItem, index) => {
                                    setCategory(selectedItem)
                                }}
                                renderDropdownIcon={isOpened => {
                                    return <FontAwesome5Icon style={{ marginRight: 8 }} name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={18} />;
                                }}
                                rowTextStyle={styles.dropdown1RowTxtStyle}
                                rowStyle={styles.dropdown1RowStyle}
                                dropdownStyle={styles.dropdown1DropdownStyle}
                                dropdownIconPosition={'right'}
                                defaultButtonText={category}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            /> : servicetype === 'Men/Women' ? <SelectDropdown
                                data={both}
                                buttonStyle={{ backgroundColor: '#ffff', borderColor: '#BABABA', borderWidth: 1, width: "100%", marginVertical: 10, borderRadius: 5, height: 58 }}
                                buttonTextStyle={{ fontFamily: 'Montserrat_500Medium', color: '#000', fontSize: 15, textAlign: 'left' }}
                                onSelect={(selectedItem, index) => {
                                    setCategory(selectedItem)
                                }}
                                renderDropdownIcon={isOpened => {
                                    return <FontAwesome5Icon style={{ marginRight: 8 }} name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={18} />;
                                }}
                                rowTextStyle={styles.dropdown1RowTxtStyle}
                                rowStyle={styles.dropdown1RowStyle}
                                dropdownStyle={styles.dropdown1DropdownStyle}
                                dropdownIconPosition={'right'}
                                defaultButtonText={category}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            /> : servicetype === 'Women' ? <SelectDropdown
                                data={WomenCategories}
                                buttonStyle={{ backgroundColor: '#ffff', borderColor: '#BABABA', borderWidth: 1, width: "100%", marginVertical: 10, borderRadius: 5, height: 58 }}
                                buttonTextStyle={{ fontFamily: 'Montserrat_500Medium', color: '#000', fontSize: 15, textAlign: 'left' }}
                                onSelect={(selectedItem, index) => {
                                    setCategory(selectedItem)
                                }}
                                renderDropdownIcon={isOpened => {
                                    return <FontAwesome5Icon style={{ marginRight: 8 }} name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={18} />;
                                }}
                                rowTextStyle={styles.dropdown1RowTxtStyle}
                                rowStyle={styles.dropdown1RowStyle}
                                dropdownStyle={styles.dropdown1DropdownStyle}
                                dropdownIconPosition={'right'}
                                defaultButtonText={category}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            /> : servicetype === 'Treatments' ? <SelectDropdown
                                data={Treatments}
                                buttonStyle={{ backgroundColor: '#ffff', borderColor: '#BABABA', borderWidth: 1, width: "100%", marginVertical: 10, borderRadius: 5, height: 58 }}
                                buttonTextStyle={{ fontFamily: 'Montserrat_500Medium', color: '#000', fontSize: 15, textAlign: 'left' }}
                                onSelect={(selectedItem, index) => {
                                    setCategory(selectedItem)
                                }}
                                renderDropdownIcon={isOpened => {
                                    return <FontAwesome5Icon style={{ marginRight: 8 }} name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={18} />;
                                }}
                                rowTextStyle={styles.dropdown1RowTxtStyle}
                                rowStyle={styles.dropdown1RowStyle}
                                dropdownStyle={styles.dropdown1DropdownStyle}
                                dropdownIconPosition={'right'}
                                defaultButtonText={category}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            /> : servicetype === 'Makeup' ? <SelectDropdown
                                data={Makeups}
                                buttonStyle={{ backgroundColor: '#ffff', borderColor: '#BABABA', borderWidth: 1, width: "100%", marginVertical: 10, borderRadius: 5, height: 58 }}
                                buttonTextStyle={{ fontFamily: 'Montserrat_500Medium', color: '#000', fontSize: 15, textAlign: 'left' }}
                                onSelect={(selectedItem, index) => {
                                    setCategory(selectedItem)
                                }}
                                renderDropdownIcon={isOpened => {
                                    return <FontAwesome5Icon style={{ marginRight: 8 }} name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={18} />;
                                }}
                                rowTextStyle={styles.dropdown1RowTxtStyle}
                                rowStyle={styles.dropdown1RowStyle}
                                dropdownStyle={styles.dropdown1DropdownStyle}
                                dropdownIconPosition={'right'}
                                defaultButtonText={category}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            /> : servicetype === 'Skin' ? <SelectDropdown
                                data={Skin}
                                buttonStyle={{ backgroundColor: '#ffff', borderColor: '#BABABA', borderWidth: 1, width: "100%", marginVertical: 10, borderRadius: 5, height: 58 }}
                                buttonTextStyle={{ fontFamily: 'Montserrat_500Medium', color: '#000', fontSize: 15, textAlign: 'left' }}
                                onSelect={(selectedItem, index) => {
                                    setCategory(selectedItem)
                                }}
                                renderDropdownIcon={isOpened => {
                                    return <FontAwesome5Icon style={{ marginRight: 8 }} name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={18} />;
                                }}
                                rowTextStyle={styles.dropdown1RowTxtStyle}
                                rowStyle={styles.dropdown1RowStyle}
                                dropdownStyle={styles.dropdown1DropdownStyle}
                                dropdownIconPosition={'right'}
                                defaultButtonText={category}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            /> : servicetype === 'Nails' ? <SelectDropdown
                                data={Nails}
                                buttonStyle={{ backgroundColor: '#ffff', borderColor: '#BABABA', borderWidth: 1, width: "100%", marginVertical: 10, borderRadius: 5, height: 58 }}
                                buttonTextStyle={{ fontFamily: 'Montserrat_500Medium', color: '#000', fontSize: 15, textAlign: 'left' }}
                                onSelect={(selectedItem, index) => {
                                    setCategory(selectedItem)
                                }}
                                renderDropdownIcon={isOpened => {
                                    return <FontAwesome5Icon style={{ marginRight: 8 }} name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={18} />;
                                }}
                                rowTextStyle={styles.dropdown1RowTxtStyle}
                                rowStyle={styles.dropdown1RowStyle}
                                dropdownStyle={styles.dropdown1DropdownStyle}
                                dropdownIconPosition={'right'}
                                defaultButtonText={category}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            /> : <Text style={{ color: '#D52976', fontFamily: 'Montserrat_500Medium' }}>Please Select Type*</Text>
                        }
                        {/* {
                            servicetype === 'Nails' && category === 'Manicure & Padicure' ? <SelectDropdown
                                data={manicure}
                                buttonStyle={{ backgroundColor: '#ffff', borderColor: '#BABABA', borderWidth: 1, width: "100%", marginVertical: 10, borderRadius: 5, height: 58 }}
                                buttonTextStyle={{ fontFamily: 'Montserrat_500Medium', color: '#000', fontSize: 15, textAlign: 'left' }}
                                onSelect={(selectedItem, index) => {
                                    setSubCategory(selectedItem)
                                }}
                                renderDropdownIcon={isOpened => {
                                    return <FontAwesome5Icon style={{ marginRight: 8 }} name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={18} />;
                                }}
                                rowTextStyle={styles.dropdown1RowTxtStyle}
                                rowStyle={styles.dropdown1RowStyle}
                                dropdownStyle={styles.dropdown1DropdownStyle}
                                dropdownIconPosition={'right'}
                                defaultButtonText={subcategory}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            /> : servicetype === 'Nails' && category === 'Extensions' ? <SelectDropdown
                                data={extension}
                                buttonStyle={{ backgroundColor: '#ffff', borderColor: '#BABABA', borderWidth: 1, width: "100%", marginVertical: 10, borderRadius: 5, height: 58 }}
                                buttonTextStyle={{ fontFamily: 'Montserrat_500Medium', color: '#000', fontSize: 15, textAlign: 'left' }}
                                onSelect={(selectedItem, index) => {
                                    setSubCategory(selectedItem)
                                }}
                                renderDropdownIcon={isOpened => {
                                    return <FontAwesome5Icon style={{ marginRight: 8 }} name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={18} />;
                                }}
                                rowTextStyle={styles.dropdown1RowTxtStyle}
                                rowStyle={styles.dropdown1RowStyle}
                                dropdownStyle={styles.dropdown1DropdownStyle}
                                dropdownIconPosition={'right'}
                                defaultButtonText={subcategory}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            /> : null
                        } */}
                        {/* Category */}
                        <View style={{ marginTop: 5 }}>
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
                                value={servicename}
                                onChangeText={text => setServiceName(text)}
                                label="Enter Service Name" />
                        </View>
                        <View style={{ marginVertical: 15 }}>
                            <Text style={{ alignSelf: 'center', fontFamily: 'Montserrat_700Bold', fontSize: 14 }}>Edit Service Details</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <SelectDropdown
                                        data={hours}
                                        buttonStyle={{ backgroundColor: '#ffff', borderColor: '#BABABA', borderWidth: 1, width: "100%", marginVertical: 10, borderRadius: 5, height: 58 }}
                                        buttonTextStyle={{ fontFamily: 'Montserrat_500Medium', color: '#000', fontSize: 15, textAlign: 'left' }}
                                        onSelect={(selectedItem, index) => {
                                            setHour(selectedItem)
                                        }}
                                        renderDropdownIcon={isOpened => {
                                            return <FontAwesome5Icon style={{ marginRight: 8 }} name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={18} />;
                                        }}
                                        rowTextStyle={styles.dropdown1RowTxtStyle}
                                        rowStyle={styles.dropdown1RowStyle}
                                        dropdownStyle={styles.dropdown1DropdownStyle}
                                        dropdownIconPosition={'right'}
                                        defaultButtonText={hour}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            return item
                                        }}
                                    />
                                </View>
                            </View>
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
                                keyboardType='number-pad'
                                mode="outlined"
                                value={price}
                                onChangeText={text => setPrice(text)}
                                label="Price" />
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
                                outlineColor="#BABABA"
                                multiline
                                numberOfLines={4}
                                style={styles.Input}
                                autoCapitalize='words'
                                mode="outlined"
                                value={about}
                                onChangeText={text => setAbout(text)}
                                label="About Services" />
                        </View>
                        <Text style={{ alignSelf: 'center', fontFamily: 'Montserrat_700Bold', fontSize: 14, marginBottom: 15 }}>Add Employee</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 25 }}>
                            {
                                employee.length > 0 && employee.map((emp) => {
                                    return (
                                        <TouchableOpacity style={{ marginRight: 20, alignItems: 'center', justifyContent: 'center' }} onPress={() => { myemployees.includes(emp._id) ? <>return</> : setMyEmployees([...myemployees, emp._id]) }} key={emp._id}>
                                            <View style={{ borderRadius: 50, borderColor: '#D52976', borderWidth: 2, padding: 4 }}>
                                                {
                                                    myemployees.includes(emp._id) ? null : <Image style={{ width: 63, height: 63, resizeMode: 'contain', borderRadius: 50, }} source={{ uri: emp.avatar.url && emp.avatar.url }} />
                                                }
                                            </View>
                                            <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 14 }}>{myemployees.includes(emp._id) ? null : emp.firstname + '...'}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                        {
                            myemployees.length > 0 && <Text style={{ alignSelf: 'center', fontFamily: 'Montserrat_700Bold', fontSize: 14, marginVertical: 15 }}>Assignee</Text>
                        }
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 25 }}>
                            {
                                myemployees && myemployees.map((ix) => {
                                    return (
                                        <TouchableOpacity style={{ marginRight: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderColor: '#D7D7D7', borderWidth: 1, paddingVertical: 5, paddingHorizontal: 8 }} onPress={() => deleteTodo(ix)} key={ix}>
                                            <FontAwesome5 name='trash' style={{ marginRight: 5, fontFamily: 'Montserrat_500Medium', fontSize: 12 }} size={10} />
                                            <Text style={{ fontFamily: 'Montserrat_500Medium' }}>{ix}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </ScrollView>
            }
            <View>
                {
                    loading ? <TouchableOpacity style={{ marginVertical: 0, backgroundColor: '#232323', paddingHorizontal: 40, paddingVertical: 20 }}>
                        <Text style={{ color: 'white', fontFamily: "Montserrat_700Bold", alignSelf: 'center', fontSize: 16 }}>Please Wait...</Text>
                    </TouchableOpacity> :
                        <TouchableOpacity onPress={handleServiceUpdate} style={{ marginVertical: 0, backgroundColor: '#232323', paddingHorizontal: 40, paddingVertical: 20 }}>
                            <Text style={{ color: 'white', fontFamily: "Montserrat_700Bold", alignSelf: 'center', fontSize: 16 }}>UPDATE SERVICE</Text>
                        </TouchableOpacity>
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    Input: {
        backgroundColor: 'white',
        fontFamily: 'Montserrat_400Regular',
        marginVertical: 10,
        fontSize: 16,
    },
    dropdown1RowStyle: { backgroundColor: '#FFFFF', borderBottomColor: '#F7F7F7' },
    dropdown1DropdownStyle: { backgroundColor: '#FFFF', borderRadius: 5, width: "50%" },
    dropdown1RowTxtStyle: { color: '#444', fontSize: 14, fontFamily: 'Montserrat_500Medium' },
})

export default UpdateServices