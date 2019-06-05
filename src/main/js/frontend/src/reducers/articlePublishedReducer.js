import {ARTICLE_CANCEL, ARTICLE_CREATE, ARTICLE_PUBLISHED_CHANGE, ARTICLE_SELECT} from "../actions";

export function articlePublished(oldArticlePublished = false, action) {
    switch (action.type) {
        case ARTICLE_CREATE:
        case ARTICLE_CANCEL:
            return false;
        case ARTICLE_SELECT:
        case ARTICLE_PUBLISHED_CHANGE:
            return action.articlePublished;
        default:
            return oldArticlePublished;
    }
}