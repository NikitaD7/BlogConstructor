import {ARTICLE_CANCEL, ARTICLE_CREATE, ARTICLE_SELECT} from "../actions";

export function articleCreateDate(oldArticleCreateDate = null, action) {
    switch (action.type) {
        case ARTICLE_CREATE:
        case ARTICLE_CANCEL:
            return null;
        case ARTICLE_SELECT:
            return action.articleCreateDate;
        default:
            return oldArticleCreateDate;
    }
}