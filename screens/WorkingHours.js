import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, createSaloon } from '../actions/UserAction';
import SelectDropdown from 'react-native-select-dropdown';
import moment from 'moment';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import BusinessHNFound from '../components/404/BusinessHNFound';

const WorkingHours = ({ route, navigation }) => {
    const [shopname, setShopName] = useState("");
    const [ownername, setOwnerName] = useState("");
    const [businessemailid, setBusinessEmailId] = useState("");
    const [companytype, setCompanyType] = useState("");
    const [address, setAddress] = useState("");
    const [addresssec, setAddressSec] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("")
    const [pincode, setPincode] = useState("");
    const [map, setMap] = useState("");

    const { name, saloonname, email, company, add, addsec, citi, stat, pincod, maps } = route.params;

    // console.log(shopname + " " + ownername + " " + businessemailid + " " + companytype + " " + address + " " + addresssec + " " + city + " " + state + " " + pincode + " " + map)
    const weeks = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const { error, loading, saloonPosted } = useSelector((state) => state.saloon)
    const dispatch = useDispatch()
    const [day, setDay] = useState("")
    // From
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [from, setFrom] = useState("From hrs")
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (time) => {
        var d = time;
        var timestamp = new Date(d).valueOf()
        var time = new Date(timestamp).toLocaleTimeString();
        const number = moment(time, ["HH.mm"]).format("hh:mm a");
        setFrom(number)
        hideDatePicker();
    };

    // To
    const [isToVisible, setToVisible] = useState(false);
    const [to, setTo] = useState("To hrs")
    const showToPicker = () => {
        setToVisible(true)
    }
    const hideToPicker = () => {
        setToVisible(false)
    }

    const handleTo = (times) => {
        var ds = times;
        var timestamps = new Date(ds).valueOf()
        var timev = new Date(timestamps).toLocaleTimeString();
        const numbers = moment(timev, ["HH.mm"]).format("hh:mm a");
        setTo(numbers)
        hideToPicker();
    };

    const [businesshours, setBusinessHours] = useState([])


    const ListItem = ({ todo }) => {
        return (
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', shadowColor: 'rgba(0, 0, 0, 0.20)',
                shadowOffset: { width: 7, height: 10 },
                shadowOpacity: 0.85,
                shadowRadius: 2,
                elevation: 10,
                backgroundColor: '#fff',
                paddingVertical: 20,
                paddingHorizontal: 20,
                marginVertical: 10,
                borderLeftColor: '#9B7ABF',
                borderLeftWidth: 4
            }}>
                <View>
                    <Text style={{ fontFamily: 'Montserrat_700Bold', marginBottom: 5 }}>{todo?.day}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'Montserrat_500Medium' }}>From - {todo?.from}</Text>
                        <Text style={{ marginLeft: 20, fontFamily: 'Montserrat_500Medium' }}>To - {todo?.to}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => deleteTodo(todo?.id)}>
                    <FontAwesome5 name='trash' color={'red'} size={20} />
                </TouchableOpacity>
            </View>
        )
    }

    const addTodo = () => {
        const addModule = {
            id: Math.random(),
            day: day,
            from: from,
            to: to
        }
        if (!day || !to || !from) {
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: "Please Fill Required Fields",
                button: 'close'
            })
        }
        else {
            setBusinessHours([...businesshours, addModule])
            setDay()
            setFrom("00:00")
            setTo("00:00")
        }
    }

    const deleteTodo = (todoId) => {
        const deleteModule = businesshours.filter(item => item.id != todoId);
        setBusinessHours(deleteModule)
    }

    // console.log(businesshours)

    const submitHandle = () => {
        dispatch(createSaloon(businesshours, to, day, from, shopname, ownername, businessemailid, companytype, address, addresssec, city, state, pincode, map))
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
        if (saloonPosted) {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: "Added Successfully",
                button: 'close'
            })
            navigation.navigate('ShowEmp')
            setBusinessHours("")
        }
        if (name || saloonname || email || company || add || addsec || citi || stat || pincod || maps) {
            setShopName(saloonname)
            setOwnerName(name)
            setBusinessEmailId(email)
            setCompanyType(company)
            setAddress(add)
            setAddressSec(addsec)
            setCity(citi)
            setState(stat)
            setPincode(pincod)
            setMap(maps)
        }
    }, [dispatch, error, saloonPosted])


    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {/* From TimePicker */}
                <View style={{ marginHorizontal: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <SelectDropdown
                        data={weeks}
                        buttonStyle={{ backgroundColor: '#9B7ABF', }}
                        buttonTextStyle={{ fontFamily: 'Montserrat_500Medium', color: 'white', fontSize: 15 }}
                        onSelect={(selectedItem, index) => {
                            setDay(selectedItem)
                        }}
                        renderDropdownIcon={isOpened => {
                            return <FontAwesome5Icon style={{ marginRight: 8, color: 'white' }} name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={18} />;
                        }}
                        
                        rowStyle={styles.dropdown1RowStyle}
                        dropdownStyle={styles.dropdown1DropdownStyle}
                        dropdownIconPosition={'right'}
                        rowTextStyle={styles.dropdown1RowTxtStyle}
                        defaultButtonText='Select Days'
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={showDatePicker}>
                            <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize: 15 }}>{from}</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="time"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            is24Hour={false}
                            style={{backgroundColor: 'red'}}
                        />
                    </View>
                    {/* To Timepicker */}
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={showToPicker}>
                            <Text style={{ fontFamily: "Montserrat_500Medium", fontSize: 15 }}>{to}</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isToVisible}
                            mode="time"
                            onConfirm={handleTo}
                            onCancel={hideToPicker}
                            is24Hour={false}
                            style={{backgroundColor: 'red'}}
                        />
                    </View>
                    {/* To Timepicker */}
                </View>
                <TouchableOpacity onPress={addTodo} style={{ alignSelf: 'center', marginVertical: 20, backgroundColor: '#232323', paddingHorizontal: 30, paddingVertical: 10 }}>
                    <Text style={{ color: 'white', fontFamily: "Montserrat_500Medium" }}>ADD</Text>
                </TouchableOpacity>
                {
                    businesshours.length > 0 ? <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                        data={businesshours}
                        renderItem={({ item }) => <ListItem todo={item} />}
                    /> : <BusinessHNFound />
                }
                {/* From TimePicker */}
            </View>
            <View>
                <TouchableOpacity onPress={submitHandle} style={{ marginVertical: 0, backgroundColor: '#232323', paddingHorizontal: 40, paddingVertical: 20 }}>
                    {
                        loading ? <Text style={{ color: 'white', fontFamily: "Montserrat_700Bold", alignSelf: 'center', fontSize: 16 }}>Please Wait...</Text> : <Text style={{ color: 'white', fontFamily: "Montserrat_700Bold", alignSelf: 'center', fontSize: 16 }}>CONTINUE</Text>
                    }
                </TouchableOpacity>
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
        flex: 2
    },
    dropdown1RowStyle: { backgroundColor: '#FFFFF', borderBottomColor: '#F7F7F7' },
    dropdown1DropdownStyle: { backgroundColor: '#FFFF', borderRadius: 5 },
    dropdown1RowTxtStyle: { color: '#444', fontSize: 14, fontFamily: 'Montserrat_500Medium' },
})

export default WorkingHours