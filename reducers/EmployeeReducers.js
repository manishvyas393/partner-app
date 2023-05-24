import { ADD_NEW_EMPLOYEE_FAIL, ADD_NEW_EMPLOYEE_REQUEST, ADD_NEW_EMPLOYEE_RESET, ADD_NEW_EMPLOYEE_SUCCESS, CLEAR_ERRORS, DELETE_EMPLOYEE_FAIL, DELETE_EMPLOYEE_REQUEST, DELETE_EMPLOYEE_RESET, DELETE_EMPLOYEE_SUCCESS, GET_ALL_EMPLOYEE_SERVICE_FAIL, GET_ALL_EMPLOYEE_SERVICE_REQUEST, GET_ALL_EMPLOYEE_SERVICE_SUCCESS, GET_LOGGED_EMPLOYEE_FAIL, GET_LOGGED_EMPLOYEE_REQUEST, GET_LOGGED_EMPLOYEE_SUCCESS, GET_SINGLE_EMPLOYEE_FAIL, GET_SINGLE_EMPLOYEE_REQUEST, GET_SINGLE_EMPLOYEE_SUCCESS, UPDATE_EMPLOYEE_FAIL, UPDATE_EMPLOYEE_REQUEST, UPDATE_EMPLOYEE_RESET, UPDATE_EMPLOYEE_SLOT_FAIL, UPDATE_EMPLOYEE_SLOT_REQUEST, UPDATE_EMPLOYEE_SLOT_RESET, UPDATE_EMPLOYEE_SLOT_SUCCESS, UPDATE_EMPLOYEE_SUCCESS } from "../constants/EmployeeConstants";

// NEW EMPLOYEE CREATION
export const newEmployeeReducer = (state = { employee: {} }, action) => {
    switch (action.type) {
        case ADD_NEW_EMPLOYEE_REQUEST:
            return {
                ...state,
                loading: true,
                isPosted: false,
            };
        case ADD_NEW_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                employee: action.payload,
                isPosted: true
            };
        case ADD_NEW_EMPLOYEE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isPosted: false
            };
        case ADD_NEW_EMPLOYEE_RESET:
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

// GET LOGGED IN USER EMPLOYEES
export const getLoggedInUserEmployees = (state = { employee: [] }, action) => {
    switch (action.type) {
        case GET_LOGGED_EMPLOYEE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_LOGGED_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                employee: action.payload
            };
        case GET_LOGGED_EMPLOYEE_FAIL:
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

// UPDATE & DELETE EMPLOYEES REDUCER
export const updateEmployee = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_EMPLOYEE_REQUEST:
        case DELETE_EMPLOYEE_REQUEST:
        case UPDATE_EMPLOYEE_SLOT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            };
        case UPDATE_EMPLOYEE_SUCCESS:
        case UPDATE_EMPLOYEE_SLOT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case UPDATE_EMPLOYEE_FAIL:
        case DELETE_EMPLOYEE_FAIL:
        case UPDATE_EMPLOYEE_SLOT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_EMPLOYEE_RESET:
        case UPDATE_EMPLOYEE_SLOT_RESET:
            return {
                ...state,
                isUpdated: false
            };
        case DELETE_EMPLOYEE_RESET:
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

// GET SINGLE EMPLOYEE DETAILS
export const getSingleEmployee = (state = { getEmployees: {} }, action) => {
    switch (action.type) {
        case GET_SINGLE_EMPLOYEE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_SINGLE_EMPLOYEE_SUCCESS:
            return {
                loading: false,
                getEmployees: action.payload
            };
        case GET_SINGLE_EMPLOYEE_FAIL:
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


// GET ALL EMPLOYEES OF A PARTICULAR SERVICE
export const getEmployeesService = (state = { emp: [], employees: {} }, action) => {
    switch (action.type) {
        case GET_ALL_EMPLOYEE_SERVICE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_EMPLOYEE_SERVICE_SUCCESS:
            return {
                loading: false,
                emp: action.payload.emp,
                employees: action.payload.employees
            };
        case GET_ALL_EMPLOYEE_SERVICE_FAIL:
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