import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer, getSaloonIndividual, passwordUpdateReducer, profileUpdateReducer, registerNewUser, saloonReducer } from './reducers/UserReducers';
import { getEmployeesService, getLoggedInUserEmployees, getSingleEmployee, newEmployeeReducer, updateEmployee } from './reducers/EmployeeReducers';
import { getLoggedInUserService, getLoggedUserSaloon, getServiceDataDuration, getServiceNameNails, getServiceNamesNails, getSingleService, newServiceReducer, updateImagesReducer, updateSaloonDescReducer, updateService } from './reducers/ServiceReducers';
import { comingUpBookings, deleteSlot, getAccurateServiceDuration, getAllBooking, getCustomerAllBookingIndividualSaloon, getCustomerBookedSlot, getCustomerBooking, getCustomerBookingInPartners, getLoggedInUserServiceEmployee, getPartnersBooking, getPartnersBookingUnEmployeed, getServiceName, getSingleBooking, getSlot, newAppointment, newSlot, serviceDuration, updateBookingStatus, updateEmployeeStatus, updateMobileNo } from './reducers/BookingReducers';

const reducer = combineReducers({
    auth: authReducer,
    saloon: saloonReducer,
    employee: newEmployeeReducer,
    getLoggedEmp: getLoggedInUserEmployees,
    service: newServiceReducer,
    getLoggedServ: getLoggedInUserService,
    profile: profileUpdateReducer,
    getbookings: getAllBooking,
    employeeservice: getLoggedInUserServiceEmployee,
    updateEmployee: updateEmployee,
    employeeDetails: getSingleEmployee,
    serviceDetails: getSingleService,
    serviceUpDel: updateService,
    createAppointment: newAppointment,
    statusEmp: updateEmployeeStatus,
    duration: serviceDuration,
    slot: newSlot,
    getSlots: getSlot,
    bookingDetails: getSingleBooking,
    cancellation: updateBookingStatus,
    deleteBooked: deleteSlot,
    serviceNaam: getServiceName,
    servDuration: getAccurateServiceDuration,
    updatepassword: passwordUpdateReducer,
    serviceNails: getServiceNameNails,
    names: getServiceNamesNails,
    duration: getServiceDataDuration,
    saloonimages: updateImagesReducer,
    loggedSaloon: getLoggedUserSaloon,
    customerslot: getCustomerBookedSlot,
    serviceemp: getEmployeesService,
    notify: getCustomerAllBookingIndividualSaloon,
    updateMobile: updateMobileNo,
    partnerBooking: getPartnersBooking,
    customerBooking: getCustomerBooking,
    updateDes: updateSaloonDescReducer,
    comingUp: comingUpBookings,
    customerUserRegister: registerNewUser,
    saloonname: getSaloonIndividual,
    unemployeedBooking: getPartnersBookingUnEmployeed,
    userBookings: getCustomerBookingInPartners
})

let initialState = {};
const middleware = [thunk];

const store = createStore(
    reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))
)

export default store;