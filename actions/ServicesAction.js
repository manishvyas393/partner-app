import axios from "axios";
import { API } from "../Config";
import { ADD_NEW_SERVICES_FAIL, ADD_NEW_SERVICES_REQUEST, ADD_NEW_SERVICES_SUCCESS, CLEAR_ERRORS, GET_LOGGED_SALOON_FAIL, GET_LOGGED_SALOON_REQUEST, GET_LOGGED_SALOON_SUCCESS, GET_LOGGED_SERVICES_FAIL, GET_LOGGED_SERVICES_REQUEST, GET_LOGGED_SERVICES_SUCCESS, GET_SERVICESNAME_DURATIONS_FAIL, GET_SERVICESNAME_DURATIONS_REQUEST, GET_SERVICESNAME_DURATIONS_SUCCESS, GET_SERVICESNAME_SUBCATE_FAIL, GET_SERVICESNAME_SUBCATE_REQUEST, GET_SERVICESNAME_SUBCATE_SUCCESS, GET_SERVICES_BY_SUBCATEGORY_FAIL, GET_SERVICES_BY_SUBCATEGORY_REQUEST, GET_SERVICES_BY_SUBCATEGORY_SUCCESS, GET_SINGLE_SERVICE_FAIL, GET_SINGLE_SERVICE_REQUEST, GET_SINGLE_SERVICE_SUCCESS, UPDATE_SALOON_DESCRIPTION_FAIL, UPDATE_SALOON_DESCRIPTION_REQUEST, UPDATE_SALOON_DESCRIPTION_SUCCESS, UPDATE_SALOON_IMAGES_FAIL, UPDATE_SALOON_IMAGES_REQUEST, UPDATE_SALOON_IMAGES_SUCCESS, UPDATE_SERVICE_FAIL, UPDATE_SERVICE_REQUEST, UPDATE_SERVICE_SUCCESS } from "../constants/ServiceConstants";

// NEW SERVICE CREATION ACTION
export const newService = (servicetype, category, servicename, hour, price, about, myemployees) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_NEW_SERVICES_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API}/create-service`, { servicetype, category, servicename, hour, price, about, myemployees }, config);
        dispatch({
            type: ADD_NEW_SERVICES_SUCCESS,
            payload: data.services
        })
    } catch (error) {
        dispatch({
            type: ADD_NEW_SERVICES_FAIL,
            payload: error.response.data.message
        })
    }
}

// GET LOGGED IN USER SERVICES
export const getLoggedService = (servicetype) => async (dispatch) => {
    try {
        dispatch({
            type: GET_LOGGED_SERVICES_REQUEST
        })

        const { data } = await axios.post(`${API}/service/me`, { servicetype });
        dispatch({
            type: GET_LOGGED_SERVICES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_LOGGED_SERVICES_FAIL,
            payload: error.response.data.message
        })
    }
}

// GET SINGLE SERVICE DETAILS
export const getSingleService = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SINGLE_SERVICE_REQUEST
        })

        const { data } = await axios.get(`${API}/service/${id}`);
        dispatch({
            type: GET_SINGLE_SERVICE_SUCCESS,
            payload: data.getService
        })
    } catch (error) {
        dispatch({
            type: GET_SINGLE_SERVICE_FAIL,
            payload: error.response.data.message
        })
    }
}

// UPDATE SERVICE ACTION
export const updateService = (id, servicetype, category, servicename, hour, price, about, myemployees) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_SERVICE_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.put(`${API}/service/update/${id}`, { servicetype, category, servicename, hour, price, about, myemployees }, config);
        dispatch({
            type: UPDATE_SERVICE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_SERVICE_FAIL,
            payload: error.response.data.message
        })
    }
}

// UPDATE SALOON DESCRIPTION ACTION
export const updateDescription = (description) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_SALOON_DESCRIPTION_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.put(`${API}/update/saloon/description`, { description}, config);
        dispatch({
            type: UPDATE_SALOON_DESCRIPTION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_SALOON_DESCRIPTION_FAIL,
            payload: error.response.data.message
        })
    }
}

// GET NAILS SUBCATEGORY
export const getNailsSubcategory = (servicetype, category, subcategory) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SERVICESNAME_SUBCATE_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API}/get/service/servicename`, { servicetype, category, subcategory }, config);
        dispatch({
            type: GET_SERVICESNAME_SUBCATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_SERVICESNAME_SUBCATE_FAIL,
            payload: error.response.data.message
        })
    }
}

// GET NAILS SUBCATEGORY
export const NailServiceName = (servicetype, category) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SERVICES_BY_SUBCATEGORY_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API}/get/service/subcategory`, { servicetype, category }, config);
        dispatch({
            type: GET_SERVICES_BY_SUBCATEGORY_SUCCESS,
            payload: data.servicesubcategory
        })
    } catch (error) {
        dispatch({
            type: GET_SERVICES_BY_SUBCATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
}

// GET NAILS SERVICENAME DURATION
export const getNailDuration = (servicetype, category, subcategory, servicename) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SERVICESNAME_DURATIONS_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API}/get/services/data`, { servicetype, category, subcategory, servicename }, config);
        dispatch({
            type: GET_SERVICESNAME_DURATIONS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_SERVICESNAME_DURATIONS_FAIL,
            payload: error.response.data.message
        })
    }
}

// UPDATE SALOON IMAGES
export const updateSaloonImages = (images) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_SALOON_IMAGES_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.put(`${API}/upload/banner`, { images }, config);
        dispatch({
            type: UPDATE_SALOON_IMAGES_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_SALOON_IMAGES_FAIL,
            payload: error.response.data.message,
        });
    }
};


// GET LOGGED USER SALOON 
export const loggedUserSaloon = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_LOGGED_SALOON_REQUEST
        })

        const { data } = await axios.get(`${API}/get/user/saloon`);
        dispatch({
            type: GET_LOGGED_SALOON_SUCCESS,
            payload: data.saloon
        })
    } catch (error) {
        dispatch({
            type: GET_LOGGED_SALOON_FAIL,
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