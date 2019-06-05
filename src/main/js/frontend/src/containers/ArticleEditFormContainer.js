import {connect} from 'react-redux';
import ArticleEditForm from '../components/ArticleEditForm';
import {articleBodyChange, articlePublishedChange, articleCancel, articleTitleChange} from "../actions";

const mapStateToProps = (state, ownProps) => {
    return {
        state: state.state,
        articleUuid: state.articleUuid,
        articleTitle: state.articleTitle,
        articleBody: state.articleBody,
        articleAuthor: state.articleAuthor,
        articlePublished: state.articlePublished,
        articlePublishedDate: state.articlePublishedDate,
        articleCreateDate: state.articleCreateDate,
        articleLastEditDate: state.articleLastEditDate,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onArticleCancel: () => {
            dispatch(articleCancel())
        },
        onArticleSave: (articleUuid,
                        articleTitle,
                        articleBody,
                        articleAuthor,
                        articlePublished
        ) => {
            fetch("/articles/" + articleUuid, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify({
                    title: encodeURIComponent(articleTitle),
                    body: encodeURIComponent(articleBody),
                    author: encodeURIComponent(articleAuthor),
                    published: encodeURIComponent(articlePublished),
                })
            })
                .then(response => {
                    if (!response.ok) {
                        window.alert("Cannot save article!");
                        console.log(response);
                    }
                });
        },
        onArticleTitleChange: (newTitle) => {
            dispatch(articleTitleChange(newTitle))
        },
        onArticleBodyChange: (newBody) => {
            dispatch(articleBodyChange(newBody))
        },
        onArticlePublishedChange: (articlePublished) => {
            dispatch(articlePublishedChange(articlePublished))
        }

    }
};

const ArticleEditFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleEditForm);

export default ArticleEditFormContainer;