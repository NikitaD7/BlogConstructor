import React, {Component} from 'react';
import './App.css';
import MenuFormContainer from "./containers/MenuFormContainer";
import LoginFormContainer from "./containers/LoginFormContainer";
import ArticleEditFormContainer from "./containers/ArticleEditFormContainer";
import ArticlesListFormContainer from "./containers/ArticlesListFormContainer";
import ArticleViewFormContainer from "./containers/ArticleViewFormContainer";
import FooterView from "./components/FooterView";

class App extends Component {
    render() {
        return (
            <div className="App">
                <LoginFormContainer/>
                <img
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100px',
                    }}
                    src='headImage.jpg'
                    alt=""/>
                <MenuFormContainer/>
                <ArticleEditFormContainer/>
                <ArticlesListFormContainer/>
                <ArticleViewFormContainer/>
                <FooterView/>
            </div>
        );
    }
}

export default App;