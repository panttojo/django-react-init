import { combineReducers } from 'redux'

import { alert } from './alert.reducer'
import { theme } from './theme.reducer'
import { user } from './user.reducer'


const rootReducer = combineReducers({
    alert,
    theme,
    user,
})

export default rootReducer
