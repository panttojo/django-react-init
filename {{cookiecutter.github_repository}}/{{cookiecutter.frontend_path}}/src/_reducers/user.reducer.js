import { userConstants } from '../_constants'

const localStorageUser = localStorage.getItem('user')
const userData = localStorageUser ? localStorageUser : false

const default_data = {
    id: '',
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    auth_token: ''
}

const initialState = {
    data: userData && userData.auth_token ? userData : default_data,
    loading: false
}

export function user(state = initialState, action) {
    const data = { data: action.data }
    const errors = { errors: action.errors }

    switch (action.type) {

        /*** LOGIN ***/
        case userConstants.LOGIN_REQUEST:
            return { ...state, ...data, loading: true }
        case userConstants.LOGIN_SUCCESS:
            return { ...state, ...data, loading: false }
        case userConstants.LOGIN_FAILURE:
            return { ...state, ...errors, loading: false }

        /*** LGOUT ***/
        case userConstants.LOGOUT_REQUEST:
            return { ...state, loading: true }
        case userConstants.LOGOUT_SUCCESS:
            return { data: default_data, loading: false }
        case userConstants.LOGOUT_FAILURE:
            return { loading: false }

        /*** REGISTER ***/
        case userConstants.REGISTER_REQUEST:
            return { ...state, ...data, loading: true }
        case userConstants.REGISTER_SUCCESS:
            return { ...state, ...data, loading: false }
        case userConstants.REGISTER_FAILURE:
            return { ...state, ...errors, loading: false }

        /*** GET PROFILE ***/
        case userConstants.PROFILE_REQUEST:
            return { ...state, loading: true }
        case userConstants.PROFILE_SUCCESS:
            return { ...state, ...data, loading: false }
        case userConstants.PROFILE_FAILURE:
            return { ...state, ...errors, loading: false }

        /*** UPDATE PROFILE ***/
        case userConstants.UPDATE_REQUEST:
            return { ...state, ...data, loading: true }
        case userConstants.UPDATE_SUCCESS:
            return { ...state, ...data, loading: false }
        case userConstants.UPDATE_FAILURE:
            return { ...state, ...errors, loading: false }

        /*** CHANGE PASSWORD ***/
        case userConstants.UPDATE_PASSWORD_REQUEST:
            return { ...state, loading: true }
        case userConstants.UPDATE_PASSWORD_SUCCESS:
            return { ...state, loading: false }
        case userConstants.UPDATE_PASSWORD_FAILURE:
            return { ...state, ...errors, loading: false }

        /*** RESET PASSWORD ***/
        case userConstants.RESET_PASSWORD_REQUEST:
            return { ...state, loading: true }
        case userConstants.RESET_PASSWORD_SUCCESS:
            return { ...state, loading: false }
        case userConstants.RESET_PASSWORD_FAILURE:
            return { ...state, ...errors, loading: false }

        /*** RESET PASSWORD CONFIRM ***/
        case userConstants.RESET_PASSWORD_CONFIRM_REQUEST:
            return { ...state, loading: true }
        case userConstants.RESET_PASSWORD_CONFIRM_SUCCESS:
            return { ...state, loading: false }
        case userConstants.RESET_PASSWORD_CONFIRM_FAILURE:
            return { ...state, ...errors, loading: false }

        default:
            return state
    }
}