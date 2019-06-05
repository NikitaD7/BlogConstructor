import {LOGIN, LOGOUT} from "../actions";

export function isLogged(oldState = false, action) {
    switch (action.type) {
        case LOGIN:
            return true;
        case LOGOUT:
            return false;
        default:
            return oldState;
    }
}