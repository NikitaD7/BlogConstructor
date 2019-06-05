import React from 'react';

function MenuForm({isLogged, login, onArticleCreate, onAllArticle}) {
    const createButton = () => {
        if (isLogged) {
            return (
                <button onClick={() => {
                    onArticleCreate(login);
                }}>
                    Create article
                </button>
            );
        }
    }
    return (
        <div>
            <button onClick={() => {
                onAllArticle();
            }}>
                All articles
            </button>
            {createButton()}
        </div>
    );
}

export default MenuForm;