import {connect} from 'react-redux';
import ArticleViewForm from '../components/ArticleViewForm';
import {articleEdit} from '../actions'

const mapStateToProps = (state, ownProps) => {
    return {
        state: state.state,
        login: state.login,
        articleUuid: state.articleUuid,
        articleTitle: state.articleTitle,
        articleBody: state.articleBody,
        articleAuthor: state.articleAuthor,
        articlePublished: state.articlePublished,
        articlePublishedDate: state.articlePublishedDate,
        articleLastEditDate: state.articleLastEditDate,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onArticleEdit: () => {
            dispatch(articleEdit());
        }
    }
};

const ArticleViewFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleViewForm);

export default ArticleViewFormContainer;