import { userConstants } from '../_constants'
import { userService } from '../_services'
import { alertActions } from './'
import { history } from '../_helpers'

export const userActions = {
    login,
    register,
    logout,
    profile,
    update,
    updatePassword,
    resetPassword,
    resetPasswordConfirm
}

function login({ username, password }) {
    return dispatch => {
        dispatch(request({ username }))

        userService.login(username, password)
            .then(
                data => {
                    if (data && data.auth_token) {
                        dispatch(success(data))
                        localStorage.setItem('user', JSON.stringify(data))
                        history.push('/admin')
                    } else if (data && data.errors) {
                        dispatch(failure(data.errors))
                        dispatch(alertActions.errors(data.errors))
                    }
                    else {
                        dispatch(failure([{ message: data.message }]))
                        dispatch(alertActions.errors([{ message: data.message }]))
                    }
                },
                error => {
                    console.log('error', error)
                }
            )
            .catch(error => console.log(error))
    }

    function request(data) { return { type: userConstants.LOGIN_REQUEST, data } }
    function success(data) { return { type: userConstants.LOGIN_SUCCESS, data } }
    function failure(errors) { return { type: userConstants.LOGIN_FAILURE, errors } }
}

function register({ username, email, password }) {
    return dispatch => {
        dispatch(request({ username, email }))

        userService.register(username, email, password)
            .then(
                data => {
                    if (data && data.auth_token) {
                        dispatch(success(data))
                        localStorage.setItem('user', JSON.stringify(data))
                        history.push('/admin')
                    } else if (data && data.errors) {
                        dispatch(failure(data.errors))
                        dispatch(alertActions.errors(data.errors))
                    }
                    else {
                        dispatch(failure([{ message: data.message }]))
                        dispatch(alertActions.errors([{ message: data.message }]))
                    }
                },
                error => {
                    console.log('error', error)
                }
            )
            .catch(error => console.log(error))
    }

    function request(data) { return { type: userConstants.LOGIN_REQUEST, data } }
    function success(data) { return { type: userConstants.LOGIN_SUCCESS, data } }
    function failure(errors) { return { type: userConstants.LOGIN_FAILURE, errors } }
}

function profile() {
    return dispatch => {
        dispatch(request())

        userService.profile()
            .then(
                data => {
                    if (data && data && data.errors) {
                        dispatch(failure(data.errors))
                        dispatch(alertActions.error(data.errors))
                    } else if (data) {
                        dispatch(success(data))
                    } else {
                        dispatch(failure([{ message: data.message }]))
                        dispatch(alertActions.error([{ message: data.message }]))
                    }
                },
                error => {
                    console.error('error', error)
                }
            )
            .catch(error => console.error(error))
    }

    function request() { return { type: userConstants.PROFILE_REQUEST } }
    function success(data) { return { type: userConstants.PROFILE_SUCCESS, data } }
    function failure(error) { return { type: userConstants.PROFILE_FAILURE, error } }
}

function update(payload) {
    return dispatch => {
        dispatch(request(payload))

        userService.update(payload)
            .then(
                data => {
                    if (data && data.errors) {
                        dispatch(failure(data.errors))
                        dispatch(alertActions.errors(data.errors))
                    } else if (data) {
                        dispatch(success(data))
                        dispatch(alertActions.updated([{message: `User <b>${data.username}</b> has been successfully updated.`}]))
                    } else {
                        dispatch(failure([{ message: data.message }]))
                        dispatch(alertActions.errors([{ message: data.message }]))
                    }
                },
                error => {
                    console.error('error', error)
                }
            )
            .catch(error => console.error(error))
    }

    function request(data) { return { type: userConstants.UPDATE_REQUEST, data } }
    function success(data) { return { type: userConstants.UPDATE_SUCCESS, data } }
    function failure(errors) { return { type: userConstants.UPDATE_FAILURE, errors } }
}

function updatePassword(payload) {
    return dispatch => {
        dispatch(request(payload))

        userService.updatePassword(payload)
            .then(
                data => {
                    if (data && data.errors) {
                        dispatch(failure(data.errors))
                        dispatch(alertActions.errors(data.errors))
                    } else if (data) {
                        dispatch(success(data))
                        dispatch(alertActions.updated([{message: `Password successfully updated.`}]))
                    } else {
                        dispatch(failure({ message: data.message }))
                        dispatch(alertActions.errors({ message: data.message }))
                    }
                },
                error => {
                    console.error('error', error)
                }
            )
            .catch(error => console.error(error))
    }

    function request(data) { return { type: userConstants.UPDATE_PASSWORD_REQUEST, data } }
    function success(data) { return { type: userConstants.UPDATE_PASSWORD_SUCCESS, data } }
    function failure(errors) { return { type: userConstants.UPDATE_PASSWORD_FAILURE, errors } }
}

function logout() {
    return dispatch => {
        dispatch(request())

        userService.logout()
            .then(
                data => {
                    if (data && data.errors) {
                        dispatch(failure(data.errors))
                        dispatch(alertActions.errors(data.errors))
                    } else {
                        dispatch(success())
                        localStorage.removeItem('user')
                        history.push('/')
                    }
                },
                error => {
                    console.error('error', error)
                }
            )
            .catch(error => console.error(error))
    }


    function request() { return { type: userConstants.LOGOUT_REQUEST } }
    function success() { return { type: userConstants.LOGOUT_SUCCESS } }
    function failure(errors) { return { type: userConstants.LOGOUT_FAILURE, errors } }
}

function resetPassword(payload) {
    return dispatch => {
        dispatch(request(payload))

        userService.resetPassword(payload)
            .then(
                data => {
                    if (data && data.errors) {
                        dispatch(failure(data.errors))
                        dispatch(alertActions.errors(data.errors))
                    } else if (data && data.message) {
                        dispatch(success(data))
                        dispatch(alertActions.updated([data]))
                    }
                },
                error => {
                    console.error('error', error)
                }
            )
            .catch(error => console.error(error))
    }


    function request(data) { return { type: userConstants.RESET_PASSWORD_REQUEST, data } }
    function success(data) { return { type: userConstants.RESET_PASSWORD_SUCCESS, data } }
    function failure(errors) { return { type: userConstants.RESET_PASSWORD_FAILURE, errors } }
}

function resetPasswordConfirm(payload) {
    return dispatch => {
        dispatch(request())

        userService.resetPasswordConfirm(payload)
            .then(
                data => {
                    console.log(data);
                    
                    if (data && data.errors) {
                        dispatch(failure(data.errors))
                        dispatch(alertActions.errors(data.errors))
                    } else if (data && data.success) {
                        dispatch(success(data))
                        dispatch(alertActions.updated([{message: `Password successfully reseted.`}]))
                        console.log(data);
                    }
                },
                error => {
                    console.error('error', error)
                }
            )
            .catch(error => console.error(error))
    }


    function request(data) { return { type: userConstants.RESET_PASSWORD_CONFIRM_REQUEST, data } }
    function success(data) { return { type: userConstants.RESET_PASSWORD_CONFIRM_SUCCESS, data } }
    function failure(errors) { return { type: userConstants.RESET_PASSWORD_CONFIRM_FAILURE, errors } }
}
