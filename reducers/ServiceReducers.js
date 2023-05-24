import { ADD_NEW_SERVICES_FAIL, ADD_NEW_SERVICES_REQUEST, ADD_NEW_SERVICES_RESET, ADD_NEW_SERVICES_SUCCESS, CLEAR_ERRORS, GET_LOGGED_SALOON_FAIL, GET_LOGGED_SALOON_REQUEST, GET_LOGGED_SALOON_SUCCESS, GET_LOGGED_SERVICES_FAIL, GET_LOGGED_SERVICES_REQUEST, GET_LOGGED_SERVICES_SUCCESS, GET_SERVICESNAME_DURATIONS_FAIL, GET_SERVICESNAME_DURATIONS_REQUEST, GET_SERVICESNAME_DURATIONS_SUCCESS, GET_SERVICESNAME_SUBCATE_FAIL, GET_SERVICESNAME_SUBCATE_REQUEST, GET_SERVICESNAME_SUBCATE_SUCCESS, GET_SERVICES_BY_SUBCATEGORY_FAIL, GET_SERVICES_BY_SUBCATEGORY_REQUEST, GET_SERVICES_BY_SUBCATEGORY_SUCCESS, GET_SINGLE_SERVICE_FAIL, GET_SINGLE_SERVICE_REQUEST, GET_SINGLE_SERVICE_SUCCESS, UPDATE_SALOON_DESCRIPTION_FAIL, UPDATE_SALOON_DESCRIPTION_REQUEST, UPDATE_SALOON_DESCRIPTION_RESET, UPDATE_SALOON_DESCRIPTION_SUCCESS, UPDATE_SALOON_IMAGES_FAIL, UPDATE_SALOON_IMAGES_REQUEST, UPDATE_SALOON_IMAGES_RESET, UPDATE_SALOON_IMAGES_SUCCESS, UPDATE_SERVICE_FAIL, UPDATE_SERVICE_REQUEST, UPDATE_SERVICE_RESET, UPDATE_SERVICE_SUCCESS } from "../constants/ServiceConstants";

// NEW EMPLOYEE CREATION
export const newServiceReducer = (state = { services: {} }, action) => {
    switch (action.type) {
        case ADD_NEW_SERVICES_REQUEST:
            return {
                ...state,
                loading: true,
                isPosted: false,
            };
        case ADD_NEW_SERVICES_SUCCESS:
            return {
                ...state,
                loading: false,
                services: action.payload,
                isPosted: true
            };
        case ADD_NEW_SERVICES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isPosted: false
            };
        case ADD_NEW_SERVICES_RESET:
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

// GET LOGGED IN USER SERVICES
export const getLoggedInUserService = (state = { services: [] }, action) => {
    switch (action.type) {
        case GET_LOGGED_SERVICES_REQUEST:
            return {
                ...state,
                loading: true,
                services: []
            };
        case GET_LOGGED_SERVICES_SUCCESS:
            return {
                ...state,
                loading: false,
                services: action.payload.services,
            };
        case GET_LOGGED_SERVICES_FAIL:
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

// GET SINGLE SERVICE DETAILS
export const getSingleService = (state = { getService: {} }, action) => {
    switch (action.type) {
        case GET_SINGLE_SERVICE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_SINGLE_SERVICE_SUCCESS:
            return {
                loading: false,
                getService: action.payload
            };
        case GET_SINGLE_SERVICE_FAIL:
            return {
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

// UPDATE & DELETE SERVICES REDUCER
export const updateService = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_SERVICE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_SERVICE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case UPDATE_SERVICE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_SERVICE_RESET:
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


// GET SERVICE BY SUBCATEGORY NAILS REDUCER
export const getServiceNameNails = (state = { servicesubcategory: [] }, action) => {
    switch (action.type) {
        case GET_SERVICES_BY_SUBCATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_SERVICES_BY_SUBCATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                servicesubcategory: action.payload
            };
        case GET_SERVICES_BY_SUBCATEGORY_FAIL:
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

// GET SERVICE BY SUBCATEGORY NAILS REDUCER
export const getServiceNamesNails = (state = { servicename: [] }, action) => {
    switch (action.type) {
        case GET_SERVICESNAME_SUBCATE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_SERVICESNAME_SUBCATE_SUCCESS:
            return {
                ...state,
                loading: false,
                servicename: action.payload.servicename
            };
        case GET_SERVICESNAME_SUBCATE_FAIL:
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

// GET SERVICE BY SUBCATEGORY NAILS REDUCER
export const getServiceDataDuration = (state = { serviceData: {} }, action) => {
    switch (action.type) {
        case GET_SERVICESNAME_DURATIONS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_SERVICESNAME_DURATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                serviceData: action.payload.serviceData
            };
        case GET_SERVICESNAME_DURATIONS_FAIL:
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


// UPDATE SALOON IMAGES REDUCER
export const updateImagesReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_SALOON_IMAGES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_SALOON_IMAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case UPDATE_SALOON_IMAGES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_SALOON_IMAGES_RESET:
            return {
                ...state,
                isUpdated: false,
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


// GET SINGLE SERVICE DETAILS
export const getLoggedUserSaloon = (state = { saloon: {} }, action) => {
    switch (action.type) {
        case GET_LOGGED_SALOON_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_LOGGED_SALOON_SUCCESS:
            return {
                loading: false,
                saloon: action.payload
            };
        case GET_LOGGED_SALOON_FAIL:
            return {
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

// UPDATE SALOON DESCRIPTION REDUCER
export const updateSaloonDescReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_SALOON_DESCRIPTION_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_SALOON_DESCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case UPDATE_SALOON_DESCRIPTION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_SALOON_DESCRIPTION_RESET:
            return {
                ...state,
                isUpdated: false,
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

