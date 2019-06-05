import {LOGIN, LOGOUT} from "../actions";

export function login(oldLogin = null, action) {
    switch (action.type) {
        case LOGIN:
            return action.login;
        case LOGOUT:
            return null;
        default:
            return oldLogin;
    }
}