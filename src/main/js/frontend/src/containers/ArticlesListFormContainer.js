import {connect} from 'react-redux';
import ArticlesListForm from '../components/ArticlesListForm';
import {articleSelect, articlesListLoad} from "../actions";

const mapStateToProps = (state, ownProps) => {
    return {
        state: state.state,
        articles: state.articles,
        login: state.login, //for update component on login/logout, not used as props
    };
};

function decodeArticle(article) {
    article.title = decodeURIComponent(article.title)
    article.body = decodeURIComponent(article.body)
    article.uuid = decodeURIComponent(article.uuid)
    article.author = decodeURIComponent(article.author)
    article.published = (decodeURIComponent(article.published) === "true")
    article.publishedDate = decodeURIComponent(article.publishedDate)
    article.createDate = decodeURIComponent(article.createDate)
    article.lastEditDate = decodeURIComponent(article.lastEditDate)
    return article;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onArticlesLoad(articles) {
            articles.forEach((article) => decodeArticle(article))
            dispatch(articlesListLoad(articles));
        },
        onArticleSelect(articleUuid) {
            fetch("/articles/" + articleUuid)
                .then(response => {
                        if (response.ok) {
                            response.json().then(data => {
                                if (data) {
                                    const decodedArticle = decodeArticle(data);
                                    dispatch(
                                        articleSelect(
                                            decodedArticle.uuid,
                                            decodedArticle.title,
                                            decodedArticle.body,
                                            decodedArticle.author,
                                            decodedArticle.published,
                                            decodedArticle.publishedDate,
                                            decodedArticle.createDate,
                                            decodedArticle.lastEditDate
                                        )
                                    );
                                }
                            });
                        }
                    }
                );
        }
    };
};

const ArticlesListFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticlesListForm);

export default ArticlesListFormContainer;