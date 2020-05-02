import { API } from '../_utils'


const login = (username, password) => {
    const params = {
        username: username,
        password: password
    }

    return API.post(`/auth/login`, params)
        .then(response => response)
}

const register = (username, email, password) => {
    const params = {
        username: username,
        email: email,
        password: password
    }

    return API.post(`/auth/register`, params)
        .then(response => response)
}

const profile = () => {
    return API.get('/me')
        .then(response => response)
}

const logout = () => {
    return API.post('/auth/logout')
}

const update = payload => {
    return API.patch(`/me`, payload)
        .then(response => response)
}

const updatePassword = payload => {
    return API.post(`/auth/password_change`, payload)
        .then(response => response)
}

const resetPassword = payload => {
    return API.post(`/auth/password_reset`, payload)
        .then(response => response)
}

const resetPasswordConfirm = payload => {
    return API.post(`/auth/password_reset_confirm`, payload)
        .then(response => response)
}

export const userService = {
    login,
    register,
    logout,
    update,
    profile,
    updatePassword,
    resetPassword,
    resetPasswordConfirm,
}