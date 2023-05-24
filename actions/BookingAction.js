import axios from "axios"
import { API } from "../Config"
import { BOOK_CANCELLED_SLOT_FAIL, BOOK_CANCELLED_SLOT_REQUEST, BOOK_CANCELLED_SLOT_SUCCESS, BOOK_NEW_APPOINTMENT_FAIL, BOOK_NEW_APPOINTMENT_REQUEST, BOOK_NEW_APPOINTMENT_SUCCESS, BOOK_NEW_SLOT_FAIL, BOOK_NEW_SLOT_REQUEST, BOOK_NEW_SLOT_SUCCESS, CANCELLED_SLOT_FAIL, CANCELLED_SLOT_REQUEST, CANCELLED_SLOT_SUCCESS, CLEAR_ERRORS, DELETE_SLOT_FAIL, DELETE_SLOT_REQUEST, DELETE_SLOT_SUCCESS, GET_ACCURATE_SERVICE_DURATION_FAIL, GET_ACCURATE_SERVICE_DURATION_REQUEST, GET_ACCURATE_SERVICE_DURATION_SUCCESS, GET_COMING_UP_BOOKINGS_FAIL, GET_COMING_UP_BOOKINGS_REQUEST, GET_COMING_UP_BOOKINGS_SUCCESS, GET_CUSTOMER_BOOKING_NOTIFY_FAIL, GET_CUSTOMER_BOOKING_NOTIFY_REQUEST, GET_CUSTOMER_BOOKING_NOTIFY_SUCCESS, GET_CUSTOMER_IN_PARTNER_BOOKING_FAIL, GET_CUSTOMER_IN_PARTNER_BOOKING_REQUEST, GET_CUSTOMER_IN_PARTNER_BOOKING_SUCCESS, GET_CUSTOMER_SLOT_FAIL, GET_CUSTOMER_SLOT_REQUEST, GET_CUSTOMER_SLOT_SUCCESS, GET_CUSTOMER_TODAY_BOOKING_FAIL, GET_CUSTOMER_TODAY_BOOKING_REQUEST, GET_CUSTOMER_TODAY_BOOKING_SUCCESS, GET_LOGGED_APPOINTMENT_FAIL, GET_LOGGED_APPOINTMENT_REQUEST, GET_LOGGED_APPOINTMENT_SUCCESS, GET_PARTICULAR_SERVICE_EMPLOYEES_FAIL, GET_PARTICULAR_SERVICE_EMPLOYEES_REQUEST, GET_PARTICULAR_SERVICE_EMPLOYEES_SUCCESS, GET_PARTNERS_BOOKING_FAIL, GET_PARTNERS_BOOKING_REQUEST, GET_PARTNERS_BOOKING_SUCCESS, GET_PARTNERS_UNEMPLOYEED_BOOKING_FAIL, GET_PARTNERS_UNEMPLOYEED_BOOKING_REQUEST, GET_PARTNERS_UNEMPLOYEED_BOOKING_SUCCESS, GET_SERVICENAME_FAIL, GET_SERVICENAME_REQUEST, GET_SERVICENAME_SUCCESS, GET_SERVICE_DURATION_FAIL, GET_SERVICE_DURATION_REQUEST, GET_SERVICE_DURATION_SUCCESS, GET_SINGLE_BOOKING_FAIL, GET_SINGLE_BOOKING_REQUEST, GET_SINGLE_BOOKING_SUCCESS, GET_SLOT_FAIL, GET_SLOT_REQUEST, GET_SLOT_SUCCESS, UPDATE_BOOKED_SLOT_FAIL, UPDATE_BOOKED_SLOT_REQUEST, UPDATE_BOOKED_SLOT_SUCCESS, UPDATE_EMPLOYEE_STATUS_FAIL, UPDATE_EMPLOYEE_STATUS_REQUEST, UPDATE_EMPLOYEE_STATUS_SUCCESS, UPDATE_MOBILENO_FAIL, UPDATE_MOBILENO_REQUEST, UPDATE_MOBILENO_SUCCESS } from "../constants/BookingConstants"


// GET LOGGED USER BOOKINGS
export const loggedUserBookings = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_LOGGED_APPOINTMENT_REQUEST
        })

        const { data } = await axios.get(`${API}/bookings/me`)
        dispatch({
            type: GET_LOGGED_APPOINTMENT_SUCCESS,
            payload: data.bookings
        })
    } catch (error) {
        dispatch({
            type: GET_LOGGED_APPOINTMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

// NEW BOOKINGS
export const newBookings = (date, category, asignee, service, result, price, intime, outtime, name, phone, servicetype, serviceid, nail) => async (dispatch) => {
    try {
        dispatch({
            type: BOOK_NEW_APPOINTMENT_REQUEST
        })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post(`${API}/createbooking`, { date, category, asignee, service, result, price, intime, outtime, name, phone, servicetype, serviceid, nail }, config);
        dispatch({
            type: BOOK_NEW_APPOINTMENT_SUCCESS,
            payload: data.bookings
        })
    } catch (error) {
        dispatch({
            type: BOOK_NEW_APPOINTMENT_FAIL,
            payload: error.response.data.message
        })
    }
}


// GET LOGGED IN USER SERVICES WITH EMPLOYEES FOR THAT PARTICULAR SERVICES
export const getLoggedServiceEmployee = (servicetype) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PARTICULAR_SERVICE_EMPLOYEES_REQUEST
        })

        const { data } = await axios.post(`${API}/service/employees`, { servicetype });
        dispatch({
            type: GET_PARTICULAR_SERVICE_EMPLOYEES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_PARTICULAR_SERVICE_EMPLOYEES_FAIL,
            payload: error.response.data.message
        })
    }
}

// GET SERVICE DURATION
export const getServiceDuration = (servicetype) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SERVICE_DURATION_REQUEST
        })

        const { data } = await axios.post(`${API}/service/duration`, { servicetype });
        dispatch({
            type: GET_SERVICE_DURATION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_SERVICE_DURATION_FAIL,
            payload: error.response.data.message
        })
    }
}

// UPDATE STATUS OF EMPLOYEES
export const updateEmployeeStatus = (id, status) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_EMPLOYEE_STATUS_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.put(`${API}/employee/status/${id}`, { status }, config);
        dispatch({
            type: UPDATE_EMPLOYEE_STATUS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_EMPLOYEE_STATUS_FAIL,
            payload: error.response.data.message
        })
    }
}

// SLOT ACTION
export const newSlot = (date, asignee, servicename, result, time) => async (dispatch) => {
    try {
        dispatch({
            type: BOOK_NEW_SLOT_REQUEST
        })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post(`${API}/createBookingSlot`, { date, asignee, servicename, result, time }, config);
        dispatch({
            type: BOOK_NEW_SLOT_SUCCESS,
            payload: data.bookings
        })
    } catch (error) {
        dispatch({
            type: BOOK_NEW_SLOT_FAIL,
            payload: error.response.data.message
        })
    }
}

// GET SINGLE BOOKING DETAILS
export const getBookingDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SINGLE_BOOKING_REQUEST
        })

        const { data } = await axios.get(`${API}/booking-details/${id}`);
        dispatch({
            type: GET_SINGLE_BOOKING_SUCCESS,
            payload: data.booking
        })
    } catch (error) {
        dispatch({
            type: GET_SINGLE_BOOKING_FAIL,
            payload: error.response.data.message
        })
    }
}

// GET SLOT
export const getAllSlot = (id, date) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SLOT_REQUEST
        })

        const { data } = await axios.post(`${API}/bookings`, { id, date });
        dispatch({
            type: GET_SLOT_SUCCESS,
            payload: data.bookedTime
        })
    } catch (error) {
        dispatch({
            type: GET_SLOT_FAIL,
            payload: error.response.data.message
        })
    }
}

// UPDATE STATUS OF BOOKING
export const updateBookingStatus = (date, category, asignee, service, price, intime, outtime, name, phone, servicetype, serviceid, nail) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_BOOKED_SLOT_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API}/cancel`, { date, category, asignee, service, price, intime, outtime, name, phone, servicetype, serviceid, nail }, config);
        dispatch({
            type: UPDATE_BOOKED_SLOT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_BOOKED_SLOT_FAIL,
            payload: error.response.data.message
        })
    }
}

// DELETE BOOKED SLOTS
export const deleteSlots = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_SLOT_REQUEST
        })

        const { data } = await axios.delete(`${API}/bookingdelete/${id}`);
        dispatch({
            type: DELETE_SLOT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_SLOT_FAIL,
            payload: error.response.data.message
        })
    }
}

// RESCHEDULED DELETE BOOKED SLOTS
export const rescheduleddeleteSlots = (bookId) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_SLOT_REQUEST
        })

        const { data } = await axios.delete(`${API}/bookingdelete/rescheduled/${bookId}`);
        dispatch({
            type: DELETE_SLOT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_SLOT_FAIL,
            payload: error.response.data.message
        })
    }
}


// GET SERVICE DURATION
export const getServiceName = (servicetype, category) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SERVICENAME_REQUEST
        })

        const { data } = await axios.post(`${API}/servicename`, { servicetype, category });
        dispatch({
            type: GET_SERVICENAME_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_SERVICENAME_FAIL,
            payload: error.response.data.message
        })
    }
}


// GET ACCURATE SERVICE DURATION
export const getServDuration = (servicetype, category, servicename) => async (dispatch) => {
    try {
        dispatch({
            type: GET_ACCURATE_SERVICE_DURATION_REQUEST
        })

        const { data } = await axios.post(`${API}/service/accurate-duration`, { servicetype, category, servicename });
        dispatch({
            type: GET_ACCURATE_SERVICE_DURATION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ACCURATE_SERVICE_DURATION_FAIL,
            payload: error.response.data.message
        })
    }
}


// GET SLOT
export const getCustomerAllSlot = (id, date) => async (dispatch) => {
    try {
        dispatch({
            type: GET_CUSTOMER_SLOT_REQUEST
        })

        const { data } = await axios.post(`${API}/customer/get/booking`, { id, date });
        dispatch({
            type: GET_CUSTOMER_SLOT_SUCCESS,
            payload: data.bookedTime
        })
    } catch (error) {
        dispatch({
            type: GET_CUSTOMER_SLOT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const notifyCustomer = (intime) => async (dispatch) => {
    try {
        dispatch({
            type: GET_CUSTOMER_BOOKING_NOTIFY_REQUEST
        })

        const { data } = await axios.post(`${API}/filter/bookings`, { intime })
        dispatch({
            type: GET_CUSTOMER_BOOKING_NOTIFY_SUCCESS,
            payload: data.booking
        })
    } catch (error) {
        dispatch({
            type: GET_CUSTOMER_BOOKING_NOTIFY_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateMobileno = (mobileno) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_MOBILENO_REQUEST
        })

        const { data } = await axios.put(`${API}/update/whatsapp`, { mobileno });
        dispatch({
            type: UPDATE_MOBILENO_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_MOBILENO_FAIL,
            payload: error.response.data.message
        })
    }
}


export const partnerBooked = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_PARTNERS_BOOKING_REQUEST
        })

        const { data } = await axios.get(`${API}/filter/bookings`);
        dispatch({
            type: GET_PARTNERS_BOOKING_SUCCESS,
            payload: data.booking
        })
    } catch (error) {
        dispatch({
            type: GET_PARTNERS_BOOKING_FAIL,
            payload: error.response.data.message
        })
    }
}

export const partnerBookedUnEmployeed = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_PARTNERS_UNEMPLOYEED_BOOKING_REQUEST
        })

        const { data } = await axios.get(`${API}/filter/bookings`);
        dispatch({
            type: GET_PARTNERS_UNEMPLOYEED_BOOKING_SUCCESS,
            payload: data.unEmployeedBooking
        })
    } catch (error) {
        dispatch({
            type: GET_PARTNERS_UNEMPLOYEED_BOOKING_FAIL,
            payload: error.response.data.message
        })
    }
}


export const customerBooked = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_CUSTOMER_TODAY_BOOKING_REQUEST
        })

        const { data } = await axios.get(`${API}/filter/partner/bookings`);
        dispatch({
            type: GET_CUSTOMER_TODAY_BOOKING_SUCCESS,
            payload: data.bookings
        })
    } catch (error) {
        dispatch({
            type: GET_CUSTOMER_TODAY_BOOKING_FAIL,
            payload: error.response.data.message
        })
    }
}


export const GetComingUpBookings = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_COMING_UP_BOOKINGS_REQUEST
        })

        const { data } = await axios.get(`${API}/upcoming/bookings`);
        dispatch({
            type: GET_COMING_UP_BOOKINGS_SUCCESS,
            payload: data.upcoming
        })
    } catch (error) {
        dispatch({
            type: GET_COMING_UP_BOOKINGS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const GetCustomerInPartner = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_CUSTOMER_IN_PARTNER_BOOKING_REQUEST
        })

        const { data } = await axios.get(`${API}/customer/user/shopname/bookings`);
        dispatch({
            type: GET_CUSTOMER_IN_PARTNER_BOOKING_SUCCESS,
            payload: data.bookings
        })
    } catch (error) {
        dispatch({
            type: GET_CUSTOMER_IN_PARTNER_BOOKING_FAIL,
            payload: error.response.data.message
        })
    }
}


// CLEARING ERRORS
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}