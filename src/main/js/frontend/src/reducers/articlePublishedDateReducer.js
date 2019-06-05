import {ARTICLE_CANCEL, ARTICLE_CREATE, ARTICLE_SELECT} from "../actions";

export function articlePublishedDate(oldArticlePublishedDate = null, action) {
    switch (action.type) {
        case ARTICLE_CREATE:
        case ARTICLE_CANCEL:
            return null;
        case ARTICLE_SELECT:
            return action.articlePublishedDate;
        default:
            return oldArticlePublishedDate;
    }
}