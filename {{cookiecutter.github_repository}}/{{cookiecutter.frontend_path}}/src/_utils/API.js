import axios from 'axios'

import { history } from '../_helpers'
import Settings from '../settings.json'

export const BACKEND_URL = `${Settings.SITE_SCHEME}://${Settings.DOMAIN}`

export const API_URL = `${BACKEND_URL}${Settings.API_PATH}`



export const API = axios.create({
    baseURL: API_URL,
    responseType: 'json',
    headers: { 'Content-Type': 'application/json' }
});

API.interceptors.request.use(function (config) {
    const user = JSON.parse(localStorage.getItem('user')),
        token = user ? user.auth_token : false

    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config;
})

API.interceptors.response.use(
    response => {
        switch (response.status) {
            case 204:
                return {
                    'errors': false,
                    'success': true
                }
            default:
                return response.data
        }

    },
    error => {
        if (error.response) {
            const response = error.response

            switch (response.status) {
                case 401:
                    localStorage.removeItem('user')
                    history.push('/login')
                    break
                case 400:
                    return response.data
                default:
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    return error.response
            }


        } else if (error.request) {
            console.log(error.request);
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request)
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
        }
        return error

    })
