import { BOOK_NEW_APPOINTMENT_FAIL, BOOK_NEW_APPOINTMENT_REQUEST, BOOK_NEW_APPOINTMENT_RESET, BOOK_NEW_APPOINTMENT_SUCCESS, BOOK_NEW_SLOT_FAIL, BOOK_NEW_SLOT_REQUEST, BOOK_NEW_SLOT_RESET, BOOK_NEW_SLOT_SUCCESS, CLEAR_ERRORS, DELETE_SLOT_FAIL, DELETE_SLOT_REQUEST, DELETE_SLOT_RESET, DELETE_SLOT_SUCCESS, GET_ACCURATE_SERVICE_DURATION_FAIL, GET_ACCURATE_SERVICE_DURATION_REQUEST, GET_ACCURATE_SERVICE_DURATION_SUCCESS, GET_COMING_UP_BOOKINGS_FAIL, GET_COMING_UP_BOOKINGS_REQUEST, GET_COMING_UP_BOOKINGS_SUCCESS, GET_CUSTOMER_BOOKING_NOTIFY_FAIL, GET_CUSTOMER_BOOKING_NOTIFY_REQUEST, GET_CUSTOMER_BOOKING_NOTIFY_SUCCESS, GET_CUSTOMER_IN_PARTNER_BOOKING_FAIL, GET_CUSTOMER_IN_PARTNER_BOOKING_REQUEST, GET_CUSTOMER_IN_PARTNER_BOOKING_SUCCESS, GET_CUSTOMER_SLOT_FAIL, GET_CUSTOMER_SLOT_REQUEST, GET_CUSTOMER_SLOT_SUCCESS, GET_CUSTOMER_TODAY_BOOKING_FAIL, GET_CUSTOMER_TODAY_BOOKING_REQUEST, GET_CUSTOMER_TODAY_BOOKING_SUCCESS, GET_LOGGED_APPOINTMENT_FAIL, GET_LOGGED_APPOINTMENT_REQUEST, GET_LOGGED_APPOINTMENT_SUCCESS, GET_PARTICULAR_SERVICE_EMPLOYEES_FAIL, GET_PARTICULAR_SERVICE_EMPLOYEES_REQUEST, GET_PARTICULAR_SERVICE_EMPLOYEES_SUCCESS, GET_PARTNERS_BOOKING_FAIL, GET_PARTNERS_BOOKING_REQUEST, GET_PARTNERS_BOOKING_SUCCESS, GET_PARTNERS_UNEMPLOYEED_BOOKING_FAIL, GET_PARTNERS_UNEMPLOYEED_BOOKING_REQUEST, GET_PARTNERS_UNEMPLOYEED_BOOKING_SUCCESS, GET_SERVICENAME_FAIL, GET_SERVICENAME_REQUEST, GET_SERVICENAME_SUCCESS, GET_SERVICE_DURATION_FAIL, GET_SERVICE_DURATION_REQUEST, GET_SERVICE_DURATION_SUCCESS, GET_SINGLE_BOOKING_FAIL, GET_SINGLE_BOOKING_REQUEST, GET_SINGLE_BOOKING_SUCCESS, GET_SLOT_FAIL, GET_SLOT_REQUEST, GET_SLOT_SUCCESS, UPDATE_BOOKED_SLOT_FAIL, UPDATE_BOOKED_SLOT_REQUEST, UPDATE_BOOKED_SLOT_RESET, UPDATE_BOOKED_SLOT_SUCCESS, UPDATE_EMPLOYEE_STATUS_FAIL, UPDATE_EMPLOYEE_STATUS_REQUEST, UPDATE_EMPLOYEE_STATUS_RESET, UPDATE_EMPLOYEE_STATUS_SUCCESS, UPDATE_MOBILENO_FAIL, UPDATE_MOBILENO_REQUEST, UPDATE_MOBILENO_RESET, UPDATE_MOBILENO_SUCCESS } from "../constants/BookingConstants";

// BOOK AN APPOINTMENT
export const newAppointment = (state = { bookings: {} }, action) => {
    switch (action.type) {
        case BOOK_NEW_APPOINTMENT_REQUEST:
            return {
                ...state,
                loading: true,
                isPosted: false
            };
        case BOOK_NEW_APPOINTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                bookings: action.payload,
                isPosted: true
            };
        case BOOK_NEW_APPOINTMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isPosted: false
            };
        case BOOK_NEW_APPOINTMENT_RESET:
            return {
                ...state,
                loading: false,
                isPosted: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

// UPDATE EMPLOYEE STATUS REDUCERS
export const updateEmployeeStatus = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_EMPLOYEE_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_EMPLOYEE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case UPDATE_EMPLOYEE_STATUS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_EMPLOYEE_STATUS_RESET:
            return {
                ...state,
                isUpdated: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

// NEW BOOKING CREATION
export const getAllBooking = (state = { bookings: [] }, action) => {
    switch (action.type) {
        case GET_LOGGED_APPOINTMENT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_LOGGED_APPOINTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                bookings: action.payload,
            };
        case GET_LOGGED_APPOINTMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

// GET SINGLE BOOKING DETAILS
export const getSingleBooking = (state = { booking: {} }, action) => {
    switch (action.type) {
        case GET_SINGLE_BOOKING_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_SINGLE_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                booking: action.payload,
            };
        case GET_SINGLE_BOOKING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

// GET LOGGED SERVICES WITH THAT SERVICES EMPLOYEES
export const getLoggedInUserServiceEmployee = (state = { arr: [], serviceEmployee: [] }, action) => {
    switch (action.type) {
        case GET_PARTICULAR_SERVICE_EMPLOYEES_REQUEST:
            return {
                ...state,
                loading: true,
                arr: [],
                serviceEmployee: []
            };
        case GET_PARTICULAR_SERVICE_EMPLOYEES_SUCCESS:
            return {
                ...state,
                loading: false,
                arr: action.payload.arr,
                serviceEmployee: action.payload.serviceEmployee
            };
        case GET_PARTICULAR_SERVICE_EMPLOYEES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

// GET SERVICE DURATION REDUCERS
export const serviceDuration = (state = { duration: {} }, action) => {
    switch (action.type) {
        case GET_SERVICE_DURATION_REQUEST:
            return {
                ...state,
                loading: true,
                duration: [],
            };
        case GET_SERVICE_DURATION_SUCCESS:
            return {
                ...state,
                loading: false,
                duration: action.payload.duration,
            };
        case GET_SERVICE_DURATION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

// SLOT REDUCER
export const newSlot = (state = { bookings: {} }, action) => {
    switch (action.type) {
        case BOOK_NEW_SLOT_REQUEST:
            return {
                ...state,
                loading: true,
                isPosted: false
            };
        case BOOK_NEW_SLOT_SUCCESS:
            return {
                ...state,
                loading: false,
                bookings: action.payload,
                isPosted: true
            };
        case BOOK_NEW_SLOT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isPosted: false
            };
        case BOOK_NEW_SLOT_RESET:
            return {
                ...state,
                loading: false,
                isPosted: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

// GET BOOKING SLOT
export const getSlot = (state = { bookedTime: [] }, action) => {
    switch (action.type) {
        case GET_SLOT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_SLOT_SUCCESS:
            return {
                ...state,
                loading: false,
                bookedTime: action.payload,
            };
        case GET_SLOT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

// GET CUSTOMER BOOKING SLOT
export const getCustomerBookedSlot = (state = { bookedTime: [] }, action) => {
    switch (action.type) {
        case GET_CUSTOMER_SLOT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_CUSTOMER_SLOT_SUCCESS:
            return {
                ...state,
                loading: false,
                bookedTime: action.payload,
            };
        case GET_CUSTOMER_SLOT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

// UPDATE BOOKING STATUS
export const updateBookingStatus = (state = { bookings: {} }, action) => {
    switch (action.type) {
        case UPDATE_BOOKED_SLOT_REQUEST:
            return {
                ...state,
                loading: true,
                isPosted: false
            };
        case UPDATE_BOOKED_SLOT_SUCCESS:
            return {
                ...state,
                loading: false,
                bookings: action.payload,
                isPosted: true
            };
        case UPDATE_BOOKED_SLOT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isPosted: false
            };
        case UPDATE_BOOKED_SLOT_RESET:
            return {
                ...state,
                loading: false,
                isPosted: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

// DELETE SLOT REDUCERS
export const deleteSlot = (state = {}, action) => {
    switch (action.type) {
        case DELETE_SLOT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_SLOT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            };
        case DELETE_SLOT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case DELETE_SLOT_RESET:
            return {
                ...state,
                isDeleted: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

// GET SERVICE NAME REDUCERS
export const getServiceName = (state = { servicename: {} }, action) => {
    switch (action.type) {
        case GET_SERVICENAME_REQUEST:
            return {
                ...state,
                loading: true,
                servicename: [],
            };
        case GET_SERVICENAME_SUCCESS:
            return {
                ...state,
                loading: false,
                servicename: action.payload.servicename,
            };
        case GET_SERVICENAME_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

// GET ACCURATE SERVICE DURATION  REDUCERS
export const getAccurateServiceDuration = (state = { servicenames: {} }, action) => {
    switch (action.type) {
        case GET_ACCURATE_SERVICE_DURATION_REQUEST:
            return {
                ...state,
                loading: true,
                // servicenames: {},
            };
        case GET_ACCURATE_SERVICE_DURATION_SUCCESS:
            return {
                ...state,
                loading: false,
                servicenames: action.payload.servicenames,
            };
        case GET_ACCURATE_SERVICE_DURATION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

// NEW BOOKING CREATION
export const getCustomerAllBookingIndividualSaloon = (state = { booking: [] }, action) => {
    switch (action.type) {
        case GET_CUSTOMER_BOOKING_NOTIFY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_CUSTOMER_BOOKING_NOTIFY_SUCCESS:
            return {
                ...state,
                loading: false,
                booking: action.payload,
            };
        case GET_CUSTOMER_BOOKING_NOTIFY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}


// UPDATE MOBILE NO
export const updateMobileNo = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_MOBILENO_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_MOBILENO_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };

        case UPDATE_MOBILENO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_MOBILENO_RESET:
            return {
                ...state,
                isUpdated: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}


export const getPartnersBooking = (state = { booking: [], unEmployeedBooking: [] }, action) => {
    switch (action.type) {
        case GET_PARTNERS_BOOKING_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_PARTNERS_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                booking: action.payload,
                unEmployeedBooking: action.payload
            };
        case GET_PARTNERS_BOOKING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

export const getPartnersBookingUnEmployeed = (state = { unEmployeedBooking: [] }, action) => {
    switch (action.type) {
        case GET_PARTNERS_UNEMPLOYEED_BOOKING_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_PARTNERS_UNEMPLOYEED_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                unEmployeedBooking: action.payload
            };
        case GET_PARTNERS_UNEMPLOYEED_BOOKING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

export const getCustomerBooking = (state = { bookings: [] }, action) => {
    switch (action.type) {
        case GET_CUSTOMER_TODAY_BOOKING_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_CUSTOMER_TODAY_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                bookings: action.payload,
            };
        case GET_CUSTOMER_TODAY_BOOKING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

// COMING UP BOOKINGS REDUCERS
export const comingUpBookings = (state = { upcoming: [] }, action) => {
    switch (action.type) {
        case GET_COMING_UP_BOOKINGS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_COMING_UP_BOOKINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                upcoming: action.payload,
            };
        case GET_COMING_UP_BOOKINGS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const getCustomerBookingInPartners = (state = { bookings: [] }, action) => {
    switch (action.type) {
        case GET_CUSTOMER_IN_PARTNER_BOOKING_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_CUSTOMER_IN_PARTNER_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                bookings: action.payload,
            };
        case GET_CUSTOMER_IN_PARTNER_BOOKING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}