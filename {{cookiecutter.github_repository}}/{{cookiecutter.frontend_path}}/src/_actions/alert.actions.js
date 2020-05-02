import { alertConstants } from '../_constants'

export const alertActions = {
    success,
    updated,
    errors,
    clear
}

function success(message) {
    return { type: alertConstants.SUCCESS, message }
}

function updated(message) {
    return { type: alertConstants.UPDATED, message }
}

function errors(message) {
    return { type: alertConstants.ERROR, message }
}

function clear() {
    return { type: alertConstants.CLEAR }
}