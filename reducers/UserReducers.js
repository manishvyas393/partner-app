import { CLEAR_ERRORS, CREATE_NEW_SALOON_FAIL, CREATE_NEW_SALOON_REQUEST, CREATE_NEW_SALOON_SUCCESS, GET_SALOON_NAME_INDIVIDUAL_FAIL, GET_SALOON_NAME_INDIVIDUAL_REQUEST, GET_SALOON_NAME_INDIVIDUAL_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_USER_FAIL, LOGOUT_USER_SUCCESS, PASSWORD_UPDATE_FAIL, PASSWORD_UPDATE_REQUEST, PASSWORD_UPDATE_RESET, PASSWORD_UPDATE_SUCCESS, PROFILE_UPDATE_FAIL, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_RESET, PROFILE_UPDATE_SUCCESS, REGISTER_FAIL, REGISTER_PARTNERS_BOOKING_FAIL, REGISTER_PARTNERS_BOOKING_REQUEST, REGISTER_PARTNERS_BOOKING_RESET, REGISTER_PARTNERS_BOOKING_SUCCESS, REGISTER_REQUEST, REGISTER_SUCCESS } from "../constants/UserConstants";

// LOGIN REGISTER REDUCER
export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGOUT_USER_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOAD_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case LOGOUT_USER_FAIL:
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


// PROFILE UPDATE REDUCER
export const profileUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case PROFILE_UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case PROFILE_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case PROFILE_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case PROFILE_UPDATE_RESET:
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

// CREATE NEW SALOON REDUCER
export const saloonReducer = (state = { saloon: {} }, action) => {
    switch (action.type) {
        case CREATE_NEW_SALOON_REQUEST:
            return {
                ...state,
                loading: true,
                saloonPosted: false
            };
        case CREATE_NEW_SALOON_SUCCESS:
            return {
                ...state,
                loading: false,
                saloon: action.payload,
                saloonPosted: true
            };
        case CREATE_NEW_SALOON_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                saloonPosted: false
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

// PASSWORD UPDATE REDUCER
export const passwordUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case PASSWORD_UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case PASSWORD_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case PASSWORD_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case PASSWORD_UPDATE_RESET:
            return {
                ...state,
                isUpdated: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}


// Registering a user in users app via partners app
export const registerNewUser = (state = { user: {} }, action) => {
    switch (action.type) {
        case REGISTER_PARTNERS_BOOKING_REQUEST:
            return {
                ...state,
                loading: true,
                isPosted: false
            };
        case REGISTER_PARTNERS_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                isPosted: true
            };
        case REGISTER_PARTNERS_BOOKING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isPosted: false
            };
        case REGISTER_PARTNERS_BOOKING_RESET:
            return {
                ...state,
                loading: false,
                user: null,
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


// GET SALOON NAME
export const getSaloonIndividual = (state = { saloon: [] }, action) => {
    switch (action.type) {
        case GET_SALOON_NAME_INDIVIDUAL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_SALOON_NAME_INDIVIDUAL_SUCCESS:
            return {
                ...state,
                loading: false,
                saloon: action.payload,
            };
        case GET_SALOON_NAME_INDIVIDUAL_FAIL:
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