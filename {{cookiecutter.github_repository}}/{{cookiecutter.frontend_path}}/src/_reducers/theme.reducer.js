import { themeConstants } from '../_constants'

const initialState = {
    header: true,
    sidebar: true,
    footer: true,
    loginpage: false,
}

export function theme(state = initialState, action) {
    switch (action.type) {
        case themeConstants.HEADER:
            return {
                ...state,
                header: !state.header
            };
        case themeConstants.SIDEBAR:
            return {
                ...state,
                sidebar: !state.sidebar
            };
        case themeConstants.FOOTER:
            return {
                ...state,
                footer: !state.footer
            };
        case themeConstants.LOGINPAGE:
            return {
                ...state,
                loginpage: !state.loginpage
            };
        default:
            return state;
    }
}
