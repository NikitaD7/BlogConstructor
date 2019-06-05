//Action types
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ARTICLE_SELECT = 'ARTICLE_SELECT';
export const ARTICLE_EDIT = 'ARTICLE_EDIT';
export const ARTICLE_CREATE = 'ARTICLE_CREATE';
export const ARTICLE_CANCEL = 'ARTICLE_CANCEL';
export const ARTICLE_TITLE_CHANGE = 'ARTICLE_TITLE_CHANGE';
export const ARTICLE_BODY_CHANGE = 'ARTICLE_BODY_CHANGE';
export const ARTICLE_PUBLISHED_CHANGE = 'ARTICLE_PUBLISHED_CHANGE';
export const ARTICLES_LIST_LOAD = 'ARTICLES_LIST_LOAD';

//Action creator
export function login(newLogin) {
    return {
        type: LOGIN,
        login: newLogin
    };
}

export function logout() {
    return {type: LOGOUT};
}

export function articleCreate(articleAuthor) {
    return {
        type: ARTICLE_CREATE,
        articleAuthor: articleAuthor
    };
}

export function articleCancel() {
    return {
        type: ARTICLE_CANCEL
    };
}

export function articleTitleChange(newTitle) {
    return {
        type: ARTICLE_TITLE_CHANGE,
        articleNewTitle: newTitle
    };
}

export function articleBodyChange(newBody) {
    return {
        type: ARTICLE_BODY_CHANGE,
        articleNewBody: newBody
    };
}

export function articlesListLoad(articlesList) {
    return {
        type: ARTICLES_LIST_LOAD,
        articlesList: articlesList
    };
}

export function articleSelect(articleUid,
                              articleTitle,
                              articleBody,
                              articleAuthor,
                              articlePublished,
                              articlePublishedDate,
                              articleCreateDate,
                              articleLastEditDate) {
    return {
        type: ARTICLE_SELECT,
        articleUid: articleUid,
        articleTitle: articleTitle,
        articleBody: articleBody,
        articleAuthor: articleAuthor,
        articlePublished: articlePublished,
        articlePublishedDate: articlePublishedDate,
        articleCreateDate: articleCreateDate,
        articleLastEditDate: articleLastEditDate,
    };
}

export function articleEdit() {
    return {
        type: ARTICLE_EDIT
    };
}

export function articlePublishedChange(articlePublished) {
    return {
        type: ARTICLE_PUBLISHED_CHANGE,
        articlePublished: articlePublished
    };
}