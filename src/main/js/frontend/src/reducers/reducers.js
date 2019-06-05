import {combineReducers} from 'redux';
import {login} from './loginReducer';
import {isLogged} from "./isLoggedReducer";
import {articleUuid} from "./articleUuidReducer";
import {articleTitle} from "./articleTitleReducer";
import {articleBody} from "./articleBodyReducer";
import {state} from "./stateReducer";
import {articles} from "./articlesListReducer";
import {articleAuthor} from "./articleAuthorReducer";
import {articlePublished} from "./articlePublishedReducer";
import {articlePublishedDate} from "./articlePublishedDateReducer";
import {articleCreateDate} from "./articleCreateDateReducer";
import {articleLastEditDate} from "./articleLastEditDateReducer";

const reducers = combineReducers({
    articles,
    state,
    isLogged,
    login,
    articleUuid,
    articleTitle,
    articleBody,
    articleAuthor,
    articlePublished,
    articlePublishedDate,
    articleCreateDate,
    articleLastEditDate,
});

export default reducers