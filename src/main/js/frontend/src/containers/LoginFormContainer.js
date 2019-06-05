import {connect} from 'react-redux'
import LoginForm from '../components/LoginForm'
import {login, logout} from '../actions'

const mapStateToProps = (state, ownProps) => {
    return {
        userLogin: state.login,
        isLogged: state.isLogged
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onLogIn: (newLogin) => {
            dispatch(login(newLogin))
        },
        onLogOut: () => {
            dispatch(logout())
        }
    }
};

const LoginFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

export default LoginFormContainer;