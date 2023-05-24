import axios from "axios";
import { API } from "../Config";
import { CLEAR_ERRORS, CREATE_NEW_SALOON_FAIL, CREATE_NEW_SALOON_REQUEST, CREATE_NEW_SALOON_SUCCESS, GET_SALOON_NAME_INDIVIDUAL_FAIL, GET_SALOON_NAME_INDIVIDUAL_REQUEST, GET_SALOON_NAME_INDIVIDUAL_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_USER_FAIL, LOGOUT_USER_SUCCESS, PASSWORD_UPDATE_FAIL, PASSWORD_UPDATE_REQUEST, PASSWORD_UPDATE_SUCCESS, PROFILE_UPDATE_FAIL, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS, REGISTER_FAIL, REGISTER_PARTNERS_BOOKING_FAIL, REGISTER_PARTNERS_BOOKING_REQUEST, REGISTER_PARTNERS_BOOKING_SUCCESS, REGISTER_REQUEST, REGISTER_SUCCESS, SALOON_PROFILE_UPDATE_FAIL, SALOON_PROFILE_UPDATE_REQUEST, SALOON_PROFILE_UPDATE_SUCCESS, TEST_FAIL, TEST_REQUEST, TEST_SUCCESS } from "../constants/UserConstants";

// LOGIN ACTION
export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API}/login`, { email, password }, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

// REGISTER ACTION
export const registerUser = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API}/register`, { name, email, password }, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.message
        })
    }
}

// LOAD USER IN STATE ACTION
export const LoadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: LOAD_USER_REQUEST
        })

        const { data } = await axios.get(`${API}/me`)
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// LOGOUT USER ACTION
export const logoutUser = () => async (dispatch) => {
    try {
        await axios.get(`${API}/logout`)
        dispatch({
            type: LOGOUT_USER_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// UPDATE USER PROFILE ACTION
export const userProfileUpdate = (avatar) => async (dispatch) => {
    try {
        dispatch({
            type: PROFILE_UPDATE_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };
        const { data } = await axios.put(`${API}/update-profile`, { avatar }, config)
        dispatch({
            type: PROFILE_UPDATE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: PROFILE_UPDATE_FAIL,
            payload: error.response.data.message
        })
    }
}

// NEW SALOON ACTION
export const createSaloon = (businesshours, day, to, from, shopname, ownername, businessemailid, companytype, address, addresssec, city, state, pincode, map) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_NEW_SALOON_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API}/createsaloon`, { businesshours, day, to, from, shopname, ownername, businessemailid, companytype, address, addresssec, city, state, pincode, map }, config);
        dispatch({
            type: CREATE_NEW_SALOON_SUCCESS,
            payload: data.saloon
        })
    } catch (error) {
        dispatch({
            type: CREATE_NEW_SALOON_FAIL,
            payload: error.response.data.message
        })
    }
}

// UPDATE PASSWORD 
export const passwordUpdate = (oldpassword, newpassword) => async (dispatch) => {
    try {
        dispatch({
            type: PASSWORD_UPDATE_REQUEST
        })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.put(`${API}/update/password`, { oldpassword, newpassword }, config)
        dispatch({
            type: PASSWORD_UPDATE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: PASSWORD_UPDATE_FAIL,
            payload: error.response.data.message
        })
    }
}

// REGISTER ACTION
export const registerBookingUser = (name, phone) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_PARTNERS_BOOKING_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API}/partner/user/register`, { name, phone }, config);
        dispatch({
            type: REGISTER_PARTNERS_BOOKING_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: REGISTER_PARTNERS_BOOKING_FAIL,
            payload: error.response.data.message
        })
    }
}


// GET SALOON NAME
export const saloonNameIndivi = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_SALOON_NAME_INDIVIDUAL_REQUEST
        })

        const { data } = await axios.get(`${API}/saloon/name/user`);
        dispatch({
            type: GET_SALOON_NAME_INDIVIDUAL_SUCCESS,
            payload: data.saloon
        })
    } catch (error) {
        dispatch({
            type: GET_SALOON_NAME_INDIVIDUAL_FAIL,
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