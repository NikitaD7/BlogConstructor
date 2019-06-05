import {ARTICLE_CREATE, ARTICLE_CANCEL, ARTICLE_SELECT, ARTICLE_EDIT} from "../actions";
import {STATE_ARTICLES_LIST, STATE_ARTICLE_VIEW, STATE_ARTICLE_EDIT} from "../states";

export function state(oldState = STATE_ARTICLES_LIST, action) {
    switch (action.type) {
        case ARTICLE_EDIT:
        case ARTICLE_CREATE:
            return STATE_ARTICLE_EDIT;
        case ARTICLE_CANCEL:
            return STATE_ARTICLES_LIST;
        case ARTICLE_SELECT:
            return STATE_ARTICLE_VIEW;
        default:
            return oldState;
    }
}