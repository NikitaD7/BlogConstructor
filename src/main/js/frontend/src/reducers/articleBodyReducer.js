import {ARTICLE_CREATE, ARTICLE_CANCEL, ARTICLE_BODY_CHANGE, ARTICLE_SELECT} from "../actions";

export function articleBody(oldEditedArticleBody = "", action) {
    switch (action.type) {
        case ARTICLE_CREATE:
        case ARTICLE_CANCEL:
            return "";
        case ARTICLE_BODY_CHANGE:
            return action.articleNewBody;
        case ARTICLE_SELECT:
            return action.articleBody;
        default:
            return oldEditedArticleBody;
    }
}