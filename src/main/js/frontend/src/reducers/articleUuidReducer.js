import {ARTICLE_CREATE, ARTICLE_CANCEL, ARTICLE_SELECT} from "../actions";
import uuidV4generator from 'uuid/v4';

export function articleUuid(oldEditedArticleUuid = null, action) {
    switch (action.type) {
        case ARTICLE_CREATE:
            return uuidV4generator();
        case ARTICLE_CANCEL:
            return null;
        case ARTICLE_SELECT:
            return action.articleUid;
        default:
            return oldEditedArticleUuid;
    }
}