import React, {useEffect} from 'react';
import {STATE_ARTICLES_LIST} from "../states";

function publishedDate(article) {
    const style = {
        textAlign: "right",
    };
    if (article.published) {
        return (
            <div style={style}>Published date: {article.publishedDate}</div>
        )
    } else {
        return (
            <div style={style}>Not published yet</div>
        )
    }
}

function ArticlesListForm({state, articles, onArticlesLoad, onArticleSelect}) {
    if (state === STATE_ARTICLES_LIST) {
        useEffect(() => {
            fetch("/articles")
                .then(response => {
                    if (response.ok) {
                        response.json().then(data => {
                            if (data) {
                                onArticlesLoad(data);
                            }
                        });
                    }
                });
        });
        return (
            <div>
                {
                    articles.map((article) => {
                        return (<div key={article.uuid} style={{
                            margin: "2%"
                        }}>
                            {publishedDate(article)}
                            <button onClick={() => onArticleSelect(article.uuid)}>
                                {<h1>{article.title}</h1>}
                            </button>
                        </div>)
                    })
                }
            </div>
        )
    }
    return null;
}

export default ArticlesListForm;