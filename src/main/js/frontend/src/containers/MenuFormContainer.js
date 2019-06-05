import {connect} from 'react-redux'
import MenuForm from '../components/MenuForm'
import {articleCancel, articleCreate} from "../actions";

const mapStateToProps = (state, ownProps) => {
    return {
        isLogged: state.isLogged,
        login: state.login,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onArticleCreate: (login) => {
            dispatch(articleCreate(login))
        },
        onAllArticle: () => {
            dispatch(articleCancel())
        }
    }
};

const MenuFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuForm);

export default MenuFormContainer;