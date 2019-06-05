import {ARTICLE_CREATE, ARTICLE_SELECT} from "../actions";

export function articleAuthor(oldAuthor = null, action) {
    switch (action.type) {
        case ARTICLE_CREATE:
        case ARTICLE_SELECT:
            return action.articleAuthor;
        default:
            return oldAuthor;
    }
}