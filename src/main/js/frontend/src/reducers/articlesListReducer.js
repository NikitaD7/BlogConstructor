import {ARTICLES_LIST_LOAD} from '../actions'

export function articles(oldArticles = [], action) {
    switch (action.type) {
        case ARTICLES_LIST_LOAD:
            const newArticles = action.articlesList;

            //is article list change?
            const reducer = (accumulator, currentValue) => accumulator + currentValue.title + currentValue.body + currentValue.uuid;

            const oldArticlesAsString = oldArticles.reduce(reducer, "");
            const newArticlesAsString = newArticles.reduce(reducer, "");

            if (oldArticlesAsString === newArticlesAsString) {
                return oldArticles;
            }

            return newArticles;
        default:
            return oldArticles;
    }
}