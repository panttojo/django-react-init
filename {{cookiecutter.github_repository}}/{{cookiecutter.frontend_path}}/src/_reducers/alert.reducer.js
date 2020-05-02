import uuid from 'react-uuid'

import { alertConstants } from '../_constants'

export function alert(state = {}, action) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                id: uuid(),
                type: 'success',
                messages: action.message
            }
        case alertConstants.UPDATED:
            return {
                id: uuid(),
                type: 'info',
                messages: action.message
            }
        case alertConstants.ERROR:
            return {
                id: uuid(),
                type: 'danger',
                messages: action.message
            }
        case alertConstants.CLEAR:
            return {}
        default:
            return state
    }
}