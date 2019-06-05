import {ARTICLE_CREATE, ARTICLE_CANCEL, ARTICLE_TITLE_CHANGE, ARTICLE_SELECT} from "../actions";

export function articleTitle(oldEditedArticleTitle = "", action) {
    switch (action.type) {
        case ARTICLE_CREATE:
        case ARTICLE_CANCEL:
            return "";
        case ARTICLE_TITLE_CHANGE:
            return action.articleNewTitle;
        case ARTICLE_SELECT:
            return action.articleTitle;
        default:
            return oldEditedArticleTitle;
    }
}