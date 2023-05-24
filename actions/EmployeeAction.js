import axios from "axios";
import { API } from "../Config";
import { ADD_NEW_EMPLOYEE_FAIL, ADD_NEW_EMPLOYEE_REQUEST, ADD_NEW_EMPLOYEE_SUCCESS, CLEAR_ERRORS, DELETE_EMPLOYEE_FAIL, DELETE_EMPLOYEE_REQUEST, DELETE_EMPLOYEE_SUCCESS, GET_ALL_EMPLOYEE_SERVICE_FAIL, GET_ALL_EMPLOYEE_SERVICE_REQUEST, GET_ALL_EMPLOYEE_SERVICE_SUCCESS, GET_LOGGED_EMPLOYEE_FAIL, GET_LOGGED_EMPLOYEE_REQUEST, GET_LOGGED_EMPLOYEE_SUCCESS, GET_SINGLE_EMPLOYEE_FAIL, GET_SINGLE_EMPLOYEE_REQUEST, GET_SINGLE_EMPLOYEE_SUCCESS, UPDATE_EMPLOYEE_FAIL, UPDATE_EMPLOYEE_REQUEST, UPDATE_EMPLOYEE_SLOT_FAIL, UPDATE_EMPLOYEE_SLOT_REQUEST, UPDATE_EMPLOYEE_SLOT_SUCCESS, UPDATE_EMPLOYEE_SUCCESS } from "../constants/EmployeeConstants";

// NEW EMPLOYEE CREATION ACTION
export const newEmployee = (firstname, lastname, intime, outtime, avatars) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_NEW_EMPLOYEE_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };

        const { data } = await axios.post(`${API}/createemployee`, { firstname, lastname, intime, outtime, avatar: avatars }, config);
        dispatch({
            type: ADD_NEW_EMPLOYEE_SUCCESS,
            payload: data.employee
        })
    } catch (error) {
        dispatch({
            type: ADD_NEW_EMPLOYEE_FAIL,
            payload: error.response.data.message
        })
    }
}

// GET LOGGED USER EMPLOYEES
export const loggedUserEmployees = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_LOGGED_EMPLOYEE_REQUEST
        })

        const { data } = await axios.get(`${API}/employee/me`)
        dispatch({
            type: GET_LOGGED_EMPLOYEE_SUCCESS,
            payload: data.employee
        })
    } catch (error) {
        dispatch({
            type: GET_LOGGED_EMPLOYEE_FAIL,
            payload: error.response.data.message
        })
    }
}

// UPDATE EMPLOYEE ACTION
export const updateEmployee = (id, firstname, lastname, intime, outtime, avatar) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_EMPLOYEE_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };

        const { data } = await axios.put(`${API}/employee/update/${id}`, { firstname, lastname, intime, outtime, avatar }, config);
        dispatch({
            type: UPDATE_EMPLOYEE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_EMPLOYEE_FAIL,
            payload: error.response.data.message
        })
    }
}

// GET SINGLE EMPLOYEE DETAILS
export const getSingleEmployee = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SINGLE_EMPLOYEE_REQUEST
        })

        const { data } = await axios.get(`${API}/employee/${id}`);
        dispatch({
            type: GET_SINGLE_EMPLOYEE_SUCCESS,
            payload: data.getEmployees
        })
    } catch (error) {
        dispatch({
            type: GET_SINGLE_EMPLOYEE_FAIL,
            payload: error.response.data.message
        })
    }
}

// DELETE EMPLOYEE
export const deleteEmployee = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_EMPLOYEE_REQUEST
        })

        const { data } = await axios.delete(`${API}/employeedelete/${id}`);
        dispatch({
            type: DELETE_EMPLOYEE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_EMPLOYEE_FAIL,
            payload: error.response.data.message
        })
    }
}


// DELETE EMPLOYEE
export const getEmployeesServices = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_ALL_EMPLOYEE_SERVICE_REQUEST
        })

        const { data } = await axios.get(`${API}/employee/services/${id}`);
        dispatch({
            type: GET_ALL_EMPLOYEE_SERVICE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_EMPLOYEE_SERVICE_FAIL,
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